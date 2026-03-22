import express from "express";
import asyncHandler from "express-async-handler";
import { query } from "../config/db.js";
import type { AttendanceType } from "../models/Attendance.js";
import { AuthRequest, authenticate } from "../middleware/auth.js";
import { buildSalarySummary, validateUserRef } from "../utils/payroll.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/",
  asyncHandler(async (req: AuthRequest, res) => {
    const month = req.query.month as string | undefined;
    const type = req.query.type as AttendanceType | undefined;
    const userId = req.query.userId as string | undefined;

    if (!req.user) {
      res.status(401).json({ success: false, errors: ["Not authenticated"] });
      return;
    }

    if (req.user.role !== "admin") {
      const summary = await buildSalarySummary(
        req.user._id,
        req.user.role === "rider" ? "rider" : "employee",
        month
      );
      res.json({ success: true, data: [summary] });
      return;
    }

    if (userId && type) {
      const actor = await validateUserRef(userId, type);
      const summary = await buildSalarySummary(actor.id, type, month);
      res.json({ success: true, data: [summary] });
      return;
    }

    const employeeRows =
      type === "rider"
        ? []
        : (
            await query<{ id: string }>(
              `
                SELECT id
                FROM users
                WHERE role = 'employee'
                ORDER BY name ASC
              `
            )
          ).rows;
    const riderRows =
      type === "employee"
        ? []
        : (
            await query<{ id: string }>(
              `
                SELECT id
                FROM riders
                ORDER BY name ASC
              `
            )
          ).rows;

    const summaries = await Promise.all([
      ...employeeRows.map((employee: { id: string }) => buildSalarySummary(employee.id, "employee", month)),
      ...riderRows.map((rider: { id: string }) => buildSalarySummary(rider.id, "rider", month)),
    ]);

    res.json({ success: true, data: summaries });
  })
);

export default router;
