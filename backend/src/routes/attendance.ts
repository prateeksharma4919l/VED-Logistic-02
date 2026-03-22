import express from "express";
import asyncHandler from "express-async-handler";
import { query } from "../config/db.js";
import type { AttendanceStatus, AttendanceType } from "../models/Attendance.js";
import { AuthRequest, authenticate, requireRole } from "../middleware/auth.js";
import { sendNotification } from "../utils/email.js";
import { buildSalarySummary, getMonthBounds, normalizeDateOnly, validateUserRef } from "../utils/payroll.js";
import { serializeAttendance } from "../utils/serializers.js";

const router = express.Router();

router.use(authenticate);

const ATTENDANCE_SELECT = `
  SELECT
    a.id,
    a.user_id,
    a.type,
    a.date,
    a.check_in,
    a.check_out,
    a.status,
    a.notes,
    a.created_at,
    a.updated_at,
    COALESCE(u.username, r.username) AS user_identifier,
    COALESCE(u.name, r.name) AS user_name,
    COALESCE(u.email, r.email) AS user_email
  FROM attendance a
  LEFT JOIN users u ON a.type = 'employee' AND a.user_id = u.id
  LEFT JOIN riders r ON a.type = 'rider' AND a.user_id = r.id
`;

function resolveActorTarget(req: AuthRequest, userId?: string, type?: AttendanceType) {
  if (!req.user) {
    throw new Error("Not authenticated");
  }

  if (req.user.role === "admin") {
    if (!userId || !type) {
      throw new Error("userId and type are required");
    }
    return { userId, type };
  }

  return {
    userId: req.user._id,
    type: req.user.role === "rider" ? "rider" : "employee",
  };
}

async function getAttendanceById(id: string) {
  const result = await query(`${ATTENDANCE_SELECT} WHERE a.id = $1 LIMIT 1`, [id]);
  return result.rows[0] ? serializeAttendance(result.rows[0]) : null;
}

async function findAttendanceByDate(userId: string, type: AttendanceType, date?: string | Date) {
  const normalizedDate = normalizeDateOnly(date ?? new Date());
  const result = await query(`${ATTENDANCE_SELECT} WHERE a.user_id = $1 AND a.type = $2 AND a.date = $3::date LIMIT 1`, [
    userId,
    type,
    normalizedDate,
  ]);

  return {
    normalizedDate,
    record: result.rows[0] ? serializeAttendance(result.rows[0]) : null,
  };
}

router.get(
  "/",
  asyncHandler(async (req: AuthRequest, res) => {
    const type = req.query.type as AttendanceType | undefined;
    const month = req.query.month as string | undefined;
    const userId = req.query.userId as string | undefined;
    const clauses: string[] = [];
    const params: unknown[] = [];

    if (req.user?.role !== "admin") {
      params.push(req.user?._id, req.user?.role === "rider" ? "rider" : "employee");
      clauses.push(`a.user_id = $${params.length - 1}`, `a.type = $${params.length}`);
    } else {
      if (userId && type) {
        const actor = await validateUserRef(userId, type);
        params.push(actor.id);
        clauses.push(`a.user_id = $${params.length}`);
      } else if (userId) {
        params.push(userId);
        clauses.push(`a.user_id = $${params.length}`);
      }

      if (type) {
        params.push(type);
        clauses.push(`a.type = $${params.length}`);
      }
    }

    if (month) {
      const bounds = getMonthBounds(month);
      params.push(bounds.start, bounds.end);
      clauses.push(`a.date >= $${params.length - 1}::date`, `a.date < $${params.length}::date`);
    }

    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const result = await query(`${ATTENDANCE_SELECT} ${where} ORDER BY a.date DESC, a.created_at DESC LIMIT 500`, params);
    res.json({ success: true, data: result.rows.map(serializeAttendance) });
  })
);

router.get(
  "/summary",
  asyncHandler(async (req: AuthRequest, res) => {
    const month = req.query.month as string | undefined;
    const { userId, type } = resolveActorTarget(
      req,
      req.query.userId as string | undefined,
      req.query.type as AttendanceType | undefined
    );
    const summary = await buildSalarySummary(userId, type as AttendanceType, month);

    res.json({
      success: true,
      data: {
        month: getMonthBounds(month).month,
        presentDays: summary.presentDays,
        absentDays: summary.absentDays,
      },
    });
  })
);

router.post(
  "/",
  asyncHandler(async (req: AuthRequest, res) => {
    const payload = req.body as {
      userId?: string;
      type?: AttendanceType;
      date?: string;
      checkIn?: string;
      checkOut?: string;
      status?: AttendanceStatus;
      notes?: string;
    };

    const { userId, type } = resolveActorTarget(req, payload.userId, payload.type);
    const status = payload.status ?? "present";
    const date = normalizeDateOnly(payload.date ?? payload.checkIn ?? new Date());
    const actor = await validateUserRef(userId, type as AttendanceType);
    const { record } = await findAttendanceByDate(actor.id, type as AttendanceType, date);

    if (record) {
      if (payload.checkOut && !record.checkOut) {
        await query(
          `
            UPDATE attendance
            SET
              check_out = $2::timestamptz,
              notes = COALESCE($3, notes),
              updated_at = NOW()
            WHERE id = $1
          `,
          [record._id, new Date(payload.checkOut).toISOString(), payload.notes ?? null]
        );

        res.json({ success: true, data: await getAttendanceById(record._id) });
        return;
      }

      if (record.status === status) {
        res.json({ success: true, data: record });
        return;
      }

      res.status(400).json({ success: false, errors: ["Attendance already exists for this date"] });
      return;
    }

    const insert = await query<{ id: string }>(
      `
        INSERT INTO attendance (user_id, type, date, check_in, check_out, status, notes)
        VALUES ($1, $2, $3::date, $4::timestamptz, $5::timestamptz, $6, COALESCE($7, ''))
        RETURNING id
      `,
      [
        actor.id,
        type,
        date,
        payload.checkIn ? new Date(payload.checkIn).toISOString() : status === "present" ? new Date().toISOString() : null,
        payload.checkOut ? new Date(payload.checkOut).toISOString() : null,
        status,
        payload.notes ?? null,
      ]
    );

    await sendNotification(
      "Attendance updated",
      `Attendance marked as ${status} for ${type} ${actor.username} on ${date}.`
    );

    res.json({ success: true, data: await getAttendanceById(insert.rows[0].id) });
  })
);

router.post(
  "/check-in",
  asyncHandler(async (req: AuthRequest, res) => {
    const payload = req.body as {
      userId?: string;
      type?: AttendanceType;
      date?: string;
      notes?: string;
    };

    const { userId, type } = resolveActorTarget(req, payload.userId, payload.type);
    const actor = await validateUserRef(userId, type as AttendanceType);
    const { normalizedDate, record } = await findAttendanceByDate(actor.id, type as AttendanceType, payload.date);

    if (record) {
      if (record.status === "absent") {
        res.status(400).json({ success: false, errors: ["Attendance is already marked absent for today"] });
        return;
      }

      await query(
        `
          UPDATE attendance
          SET
            check_in = COALESCE(check_in, NOW()),
            status = 'present',
            notes = COALESCE($2, notes),
            updated_at = NOW()
          WHERE id = $1
        `,
        [record._id, payload.notes ?? null]
      );

      res.json({ success: true, data: await getAttendanceById(record._id) });
      return;
    }

    const insert = await query<{ id: string }>(
      `
        INSERT INTO attendance (user_id, type, date, status, check_in, notes)
        VALUES ($1, $2, $3::date, 'present', NOW(), COALESCE($4, 'Checked in'))
        RETURNING id
      `,
      [actor.id, type, normalizedDate, payload.notes ?? null]
    );

    res.json({ success: true, data: await getAttendanceById(insert.rows[0].id) });
  })
);

router.post(
  "/check-out",
  asyncHandler(async (req: AuthRequest, res) => {
    const payload = req.body as {
      userId?: string;
      type?: AttendanceType;
      date?: string;
      notes?: string;
    };

    const { userId, type } = resolveActorTarget(req, payload.userId, payload.type);
    const actor = await validateUserRef(userId, type as AttendanceType);
    const { record } = await findAttendanceByDate(actor.id, type as AttendanceType, payload.date);

    if (!record) {
      res.status(400).json({ success: false, errors: ["Please check in first before check out"] });
      return;
    }

    if (record.status === "absent") {
      res.status(400).json({ success: false, errors: ["Cannot check out when attendance is marked absent"] });
      return;
    }

    await query(
      `
        UPDATE attendance
        SET
          check_in = COALESCE(check_in, NOW()),
          check_out = COALESCE(check_out, NOW()),
          notes = COALESCE($2, notes),
          updated_at = NOW()
        WHERE id = $1
      `,
      [record._id, payload.notes ?? null]
    );

    res.json({ success: true, data: await getAttendanceById(record._id) });
  })
);

router.put(
  "/:id",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const payload = req.body as {
      userId?: string;
      type?: AttendanceType;
      date?: string;
      checkIn?: string;
      checkOut?: string;
      status?: AttendanceStatus;
      notes?: string;
    };

    const current = await query(`${ATTENDANCE_SELECT} WHERE a.id = $1 LIMIT 1`, [id]);
    if (!current.rows[0]) {
      res.status(404).json({ success: false, errors: ["Attendance record not found"] });
      return;
    }

    const currentRecord = serializeAttendance(current.rows[0]);
    const nextType = payload.type ?? (currentRecord.type as AttendanceType);
    const nextDate = normalizeDateOnly(payload.date ?? currentRecord.date);
    const actor = await validateUserRef(payload.userId ?? currentRecord.userId, nextType);

    const duplicate = await query(
      `
        SELECT id
        FROM attendance
        WHERE id <> $1
          AND user_id = $2
          AND type = $3
          AND date = $4::date
        LIMIT 1
      `,
      [id, actor.id, nextType, nextDate]
    );

    if (duplicate.rows[0]) {
      res.status(400).json({ success: false, errors: ["Attendance already exists for this date"] });
      return;
    }

    await query(
      `
        UPDATE attendance
        SET
          user_id = $2,
          type = $3,
          date = $4::date,
          status = COALESCE($5, status),
          check_in = COALESCE($6::timestamptz, check_in),
          check_out = COALESCE($7::timestamptz, check_out),
          notes = COALESCE($8, notes),
          updated_at = NOW()
        WHERE id = $1
      `,
      [
        id,
        actor.id,
        nextType,
        nextDate,
        payload.status ?? null,
        payload.checkIn ? new Date(payload.checkIn).toISOString() : null,
        payload.checkOut ? new Date(payload.checkOut).toISOString() : null,
        payload.notes ?? null,
      ]
    );

    res.json({ success: true, data: await getAttendanceById(id) });
  })
);

router.delete(
  "/:id",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const deleted = await query(`DELETE FROM attendance WHERE id = $1 RETURNING id`, [req.params.id]);
    if (!deleted.rows[0]) {
      res.status(404).json({ success: false, errors: ["Attendance record not found"] });
      return;
    }

    res.json({ success: true, data: { id: req.params.id } });
  })
);

export default router;
