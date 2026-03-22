import express from "express";
import asyncHandler from "express-async-handler";
import type { AdvancePaymentStatus } from "../models/AdvancePayment.js";
import type { AttendanceType } from "../models/Attendance.js";
import { query } from "../config/db.js";
import { AuthRequest, authenticate, requireRole } from "../middleware/auth.js";
import { getMonthBounds, validateUserRef } from "../utils/payroll.js";
import { serializeAdvancePayment } from "../utils/serializers.js";

const router = express.Router();

router.use(authenticate);

const ADVANCE_SELECT = `
  SELECT
    ap.id,
    ap.user_id,
    ap.type,
    ap.amount,
    ap.date,
    ap.note,
    ap.status,
    ap.created_by,
    ap.approved_by,
    ap.approved_at,
    ap.created_at,
    ap.updated_at,
    COALESCE(u.username, r.username) AS user_identifier,
    COALESCE(u.name, r.name) AS user_name,
    COALESCE(u.email, r.email) AS user_email
  FROM advance_payments ap
  LEFT JOIN users u ON ap.type = 'employee' AND ap.user_id = u.id
  LEFT JOIN riders r ON ap.type = 'rider' AND ap.user_id = r.id
`;

function getAccessTarget(req: AuthRequest, userId?: string, type?: AttendanceType) {
  if (!req.user) throw new Error("Not authenticated");

  if (req.user.role === "admin") {
    return { userId, type };
  }

  return {
    userId: req.user._id,
    type: req.user.role === "rider" ? "rider" : "employee",
  };
}

async function getAdvanceById(id: string) {
  const result = await query(`${ADVANCE_SELECT} WHERE ap.id = $1 LIMIT 1`, [id]);
  return result.rows[0] ? serializeAdvancePayment(result.rows[0]) : null;
}

router.get(
  "/",
  asyncHandler(async (req: AuthRequest, res) => {
    const month = req.query.month as string | undefined;
    const status = req.query.status as AdvancePaymentStatus | undefined;
    const access = getAccessTarget(
      req,
      req.query.userId as string | undefined,
      req.query.type as AttendanceType | undefined
    );

    const clauses: string[] = [];
    const params: unknown[] = [];

    if (access.userId && access.type) {
      const actor = await validateUserRef(access.userId, access.type as AttendanceType);
      params.push(actor.id, access.type);
      clauses.push(`ap.user_id = $${params.length - 1}`, `ap.type = $${params.length}`);
    }

    if (status) {
      params.push(status);
      clauses.push(`ap.status = $${params.length}`);
    }

    if (month) {
      const bounds = getMonthBounds(month);
      params.push(bounds.start, bounds.end);
      clauses.push(`ap.date >= $${params.length - 1}::date`, `ap.date < $${params.length}::date`);
    }

    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const result = await query(`${ADVANCE_SELECT} ${where} ORDER BY ap.date DESC, ap.created_at DESC LIMIT 500`, params);
    res.json({ success: true, data: result.rows.map(serializeAdvancePayment) });
  })
);

router.post(
  "/",
  asyncHandler(async (req: AuthRequest, res) => {
    if (!req.user) {
      res.status(401).json({ success: false, errors: ["Not authenticated"] });
      return;
    }

    const payload = req.body as {
      userId?: string;
      type?: AttendanceType;
      amount: number;
      date?: string;
      note?: string;
      status?: AdvancePaymentStatus;
    };

    const isAdmin = req.user.role === "admin";
    const userId = isAdmin ? payload.userId : req.user._id;
    const type = isAdmin ? payload.type : req.user.role === "rider" ? "rider" : "employee";

    if (!userId || !type) {
      res.status(400).json({ success: false, errors: ["userId and type are required"] });
      return;
    }

    const actor = await validateUserRef(userId, type);
    const status = isAdmin ? payload.status ?? "approved" : "pending";

    const insert = await query<{ id: string }>(
      `
        INSERT INTO advance_payments (
          user_id,
          type,
          amount,
          date,
          note,
          status,
          created_by,
          approved_by,
          approved_at
        )
        VALUES ($1, $2, $3, COALESCE($4::date, CURRENT_DATE), COALESCE($5, ''), $6, $7, $8, $9)
        RETURNING id
      `,
      [
        actor.id,
        type,
        payload.amount,
        payload.date ?? null,
        payload.note ?? null,
        status,
        req.user._id,
        status === "approved" ? req.user._id : null,
        status === "approved" ? new Date().toISOString() : null,
      ]
    );

    res.json({ success: true, data: await getAdvanceById(insert.rows[0].id) });
  })
);

router.put(
  "/:id",
  requireRole("admin"),
  asyncHandler(async (req: AuthRequest, res) => {
    const item = await getAdvanceById(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, errors: ["Advance payment not found"] });
      return;
    }

    const { userId, type, amount, date, note, status } = req.body as {
      userId?: string;
      type?: AttendanceType;
      amount?: number;
      date?: string;
      note?: string;
      status?: AdvancePaymentStatus;
    };

    const nextType = type ?? (item.type as AttendanceType);
    const actor = await validateUserRef(userId ?? item.userId, nextType);

    await query(
      `
        UPDATE advance_payments
        SET
          user_id = $2,
          type = $3,
          amount = COALESCE($4, amount),
          date = COALESCE($5::date, date),
          note = COALESCE($6, note),
          status = COALESCE($7, status),
          approved_by = CASE WHEN $7 = 'approved' THEN $8 ELSE NULL END,
          approved_at = CASE WHEN $7 = 'approved' THEN NOW() WHEN $7 IS NOT NULL THEN NULL ELSE approved_at END,
          updated_at = NOW()
        WHERE id = $1
      `,
      [req.params.id, actor.id, nextType, amount ?? null, date ?? null, note ?? null, status ?? null, req.user?._id ?? null]
    );

    res.json({ success: true, data: await getAdvanceById(req.params.id) });
  })
);

router.post(
  "/:id/approve",
  requireRole("admin"),
  asyncHandler(async (req: AuthRequest, res) => {
    const item = await getAdvanceById(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, errors: ["Advance payment not found"] });
      return;
    }

    await query(
      `
        UPDATE advance_payments
        SET
          status = 'approved',
          approved_by = $2,
          approved_at = NOW(),
          updated_at = NOW()
        WHERE id = $1
      `,
      [req.params.id, req.user?._id ?? null]
    );

    res.json({ success: true, data: await getAdvanceById(req.params.id) });
  })
);

router.post(
  "/:id/reject",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const item = await getAdvanceById(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, errors: ["Advance payment not found"] });
      return;
    }

    await query(
      `
        UPDATE advance_payments
        SET
          status = 'rejected',
          approved_by = NULL,
          approved_at = NULL,
          updated_at = NOW()
        WHERE id = $1
      `,
      [req.params.id]
    );

    res.json({ success: true, data: await getAdvanceById(req.params.id) });
  })
);

router.delete(
  "/:id",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const deleted = await query(`DELETE FROM advance_payments WHERE id = $1 RETURNING id`, [req.params.id]);
    if (!deleted.rows[0]) {
      res.status(404).json({ success: false, errors: ["Advance payment not found"] });
      return;
    }

    res.json({ success: true, data: { id: req.params.id } });
  })
);

export default router;
