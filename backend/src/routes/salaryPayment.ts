import express from "express";
import asyncHandler from "express-async-handler";
import type { AttendanceType } from "../models/Attendance.js";
import { query } from "../config/db.js";
import { AuthRequest, authenticate, requireRole } from "../middleware/auth.js";
import { buildSalarySummary, getMonthBounds, validateUserRef } from "../utils/payroll.js";
import { serializeSalaryPayment } from "../utils/serializers.js";

const router = express.Router();

router.use(authenticate);

const SALARY_PAYMENT_SELECT = `
  SELECT
    sp.id,
    sp.user_id,
    sp.type,
    sp.month,
    sp.total_salary,
    sp.advance_deduction,
    sp.final_paid_amount,
    sp.payment_date,
    sp.status,
    sp.created_at,
    sp.updated_at,
    COALESCE(u.username, r.username) AS user_identifier,
    COALESCE(u.name, r.name) AS user_name,
    COALESCE(u.email, r.email) AS user_email,
    COALESCE(u.monthly_salary, r.monthly_salary) AS monthly_salary
  FROM salary_payments sp
  LEFT JOIN users u ON sp.type = 'employee' AND sp.user_id = u.id
  LEFT JOIN riders r ON sp.type = 'rider' AND sp.user_id = r.id
`;

async function getSalaryPaymentById(id: string) {
  const result = await query(`${SALARY_PAYMENT_SELECT} WHERE sp.id = $1 LIMIT 1`, [id]);
  return result.rows[0] ? serializeSalaryPayment(result.rows[0]) : null;
}

router.get(
  "/",
  asyncHandler(async (req: AuthRequest, res) => {
    const month = req.query.month as string | undefined;
    const queryParts: string[] = [];
    const params: unknown[] = [];

    if (month) {
      params.push(getMonthBounds(month).month);
      queryParts.push(`sp.month = $${params.length}`);
    }

    if (req.user?.role !== "admin") {
      params.push(req.user?._id, req.user?.role === "rider" ? "rider" : "employee");
      queryParts.push(`sp.user_id = $${params.length - 1}`, `sp.type = $${params.length}`);
    } else {
      const userId = req.query.userId as string | undefined;
      const type = req.query.type as AttendanceType | undefined;

      if (userId && type) {
        const actor = await validateUserRef(userId, type);
        params.push(actor.id);
        queryParts.push(`sp.user_id = $${params.length}`);
      } else if (userId) {
        params.push(userId);
        queryParts.push(`sp.user_id = $${params.length}`);
      }

      if (type) {
        params.push(type);
        queryParts.push(`sp.type = $${params.length}`);
      }

      if (req.query.status) {
        params.push(req.query.status as string);
        queryParts.push(`sp.status = $${params.length}`);
      }
    }

    const where = queryParts.length ? `WHERE ${queryParts.join(" AND ")}` : "";
    const result = await query(`${SALARY_PAYMENT_SELECT} ${where} ORDER BY sp.month DESC, sp.created_at DESC LIMIT 500`, params);
    res.json({ success: true, data: result.rows.map(serializeSalaryPayment) });
  })
);

router.post(
  "/",
  requireRole("admin"),
  asyncHandler(async (req: AuthRequest, res) => {
    const { userId, type, month, status = "paid", paymentDate } = req.body as {
      userId: string;
      type: AttendanceType;
      month?: string;
      status?: "paid" | "pending";
      paymentDate?: string;
    };

    const actor = await validateUserRef(userId, type);
    const bounds = getMonthBounds(month);
    const summary = await buildSalarySummary(actor.id, type, bounds.month);

    const upsert = await query<{ id: string }>(
      `
        INSERT INTO salary_payments (
          user_id,
          type,
          month,
          total_salary,
          advance_deduction,
          final_paid_amount,
          status,
          payment_date,
          created_by,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8::timestamptz, $9, NOW())
        ON CONFLICT (user_id, type, month)
        DO UPDATE SET
          total_salary = EXCLUDED.total_salary,
          advance_deduction = EXCLUDED.advance_deduction,
          final_paid_amount = EXCLUDED.final_paid_amount,
          status = EXCLUDED.status,
          payment_date = EXCLUDED.payment_date,
          created_by = EXCLUDED.created_by,
          updated_at = NOW()
        RETURNING id
      `,
      [
        actor.id,
        type,
        bounds.month,
        summary.earnedSalary,
        summary.advanceDeduction,
        summary.finalSalary,
        status,
        paymentDate ? new Date(paymentDate).toISOString() : status === "paid" ? new Date().toISOString() : null,
        req.user?._id ?? null,
      ]
    );

    res.json({ success: true, data: await getSalaryPaymentById(upsert.rows[0].id) });
  })
);

router.put(
  "/:id",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const current = await getSalaryPaymentById(req.params.id);
    if (!current) {
      res.status(404).json({ success: false, errors: ["Salary payment not found"] });
      return;
    }

    const { status, paymentDate } = req.body as { status?: "paid" | "pending"; paymentDate?: string };
    const summary = await buildSalarySummary(current.userId, current.type as AttendanceType, current.month);

    await query(
      `
        UPDATE salary_payments
        SET
          total_salary = $2,
          advance_deduction = $3,
          final_paid_amount = $4,
          status = COALESCE($5, status),
          payment_date = CASE
            WHEN $6::timestamptz IS NOT NULL THEN $6::timestamptz
            WHEN $5 = 'paid' AND payment_date IS NULL THEN NOW()
            WHEN $5 = 'pending' THEN NULL
            ELSE payment_date
          END,
          updated_at = NOW()
        WHERE id = $1
      `,
      [req.params.id, summary.earnedSalary, summary.advanceDeduction, summary.finalSalary, status ?? null, paymentDate ?? null]
    );

    res.json({ success: true, data: await getSalaryPaymentById(req.params.id) });
  })
);

router.delete(
  "/:id",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const deleted = await query(`DELETE FROM salary_payments WHERE id = $1 RETURNING id`, [req.params.id]);
    if (!deleted.rows[0]) {
      res.status(404).json({ success: false, errors: ["Salary payment not found"] });
      return;
    }

    res.json({ success: true, data: { id: req.params.id } });
  })
);

export default router;
