import express from "express";
import asyncHandler from "express-async-handler";
import { query } from "../config/db.js";
import { AuthRequest, authenticate, requireRole } from "../middleware/auth.js";
import { sendDailySummary } from "../utils/email.js";
import { serializeReport } from "../utils/serializers.js";

const router = express.Router();

router.use(authenticate);

function toRequiredDate(value?: string) {
  return new Date(value ?? new Date().toISOString());
}

router.get(
  "/",
  requireRole("admin"),
  asyncHandler(async (_req, res) => {
    const result = await query(
      `
        SELECT id, title, description, meta, generated_at, created_at, updated_at, generated_by
        FROM reports
        ORDER BY generated_at DESC
        LIMIT 50
      `
    );
    res.json({ success: true, data: result.rows.map(serializeReport) });
  })
);

router.post(
  "/generate",
  requireRole("admin"),
  asyncHandler(async (req: AuthRequest, res) => {
    const { title, description, meta } = req.body as {
      title: string;
      description: string;
      meta?: Record<string, unknown>;
    };

    const insert = await query(
      `
        INSERT INTO reports (title, description, meta, generated_by)
        VALUES ($1, COALESCE($2, ''), COALESCE($3::jsonb, '{}'::jsonb), $4)
        RETURNING id, title, description, meta, generated_at, created_at, updated_at, generated_by
      `,
      [title, description ?? "", JSON.stringify(meta ?? {}), req.user?._id ?? null]
    );

    const report = serializeReport(insert.rows[0]);
    await sendDailySummary({
      id: report._id,
      title: report.title,
      description: report.description,
      meta: report.meta,
      generatedAt: toRequiredDate(report.generatedAt),
      createdAt: toRequiredDate(report.createdAt),
      updatedAt: toRequiredDate(report.updatedAt),
      generatedBy: report.generatedBy,
    });

    res.json({ success: true, data: report });
  })
);

export default router;
