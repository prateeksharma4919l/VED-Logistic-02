import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { query, withTransaction } from "../config/db.js";
import { authenticate, requireRole } from "../middleware/auth.js";
import { sendNotification } from "../utils/email.js";
import { serializeRider } from "../utils/serializers.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/me",
  requireRole(["admin", "rider"]),
  asyncHandler(async (req: any, res) => {
    if (!req.user) {
      res.status(401).json({ success: false, errors: ["Not authenticated"] });
      return;
    }

    if (req.user.role === "admin") {
      res.json({ success: true, data: req.user });
      return;
    }

    const result = await query(
      `
        SELECT
          id,
          name,
          username,
          email,
          bike_number,
          monthly_salary,
          morning_reading,
          evening_reading,
          distance_km,
          status,
          created_at,
          updated_at
        FROM riders
        WHERE id = $1
        LIMIT 1
      `,
      [req.user._id]
    );

    res.json({ success: true, data: result.rows[0] ? serializeRider(result.rows[0]) : null });
  })
);

router.get(
  "/",
  requireRole("admin"),
  asyncHandler(async (_req, res) => {
    const result = await query(
      `
        SELECT
          id,
          name,
          username,
          email,
          bike_number,
          monthly_salary,
          morning_reading,
          evening_reading,
          distance_km,
          status,
          created_at,
          updated_at
        FROM riders
        ORDER BY name ASC
      `
    );
    res.json({ success: true, data: result.rows.map(serializeRider) });
  })
);

router.post(
  "/",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const {
      name,
      username,
      email,
      password,
      bikeNumber,
      monthlySalary = 0,
      morningReading = 0,
      eveningReading = 0,
    } = req.body as {
      name: string;
      username: string;
      email: string;
      password: string;
      bikeNumber: string;
      monthlySalary?: number;
      morningReading?: number;
      eveningReading?: number;
    };

    const duplicate = await query(
      `
        SELECT id
        FROM riders
        WHERE bike_number = $1 OR username = $2 OR email = $3
        LIMIT 1
      `,
      [bikeNumber, username, email]
    );

    if (duplicate.rows[0]) {
      res.status(400).json({ success: false, errors: ["Bike number, email, or user ID already exists"] });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const distanceKm = Number(eveningReading) - Number(morningReading);

    const insert = await query(
      `
        INSERT INTO riders (
          name,
          username,
          email,
          password,
          bike_number,
          monthly_salary,
          morning_reading,
          evening_reading,
          distance_km,
          status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending')
        RETURNING
          id,
          name,
          username,
          email,
          bike_number,
          monthly_salary,
          morning_reading,
          evening_reading,
          distance_km,
          status,
          created_at,
          updated_at
      `,
      [name, username, email, hashed, bikeNumber, monthlySalary, morningReading, eveningReading, distanceKm]
    );

    await sendNotification(
      "Rider created",
      `New rider ${name} (${bikeNumber}) was added with morning reading ${morningReading}.`
    );

    res.json({ success: true, data: serializeRider(insert.rows[0]) });
  })
);

router.put(
  "/:id",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, username, email, password, bikeNumber, monthlySalary, morningReading, eveningReading, status } = req.body;

    const existing = await query(
      `
        SELECT id, username, email, bike_number, morning_reading, evening_reading
        FROM riders
        WHERE id = $1
        LIMIT 1
      `,
      [id]
    );

    if (!existing.rows[0]) {
      res.status(404).json({ success: false, errors: ["Rider not found"] });
      return;
    }

    if (username && username !== existing.rows[0].username) {
      const duplicateUsername = await query(`SELECT id FROM riders WHERE username = $1 AND id <> $2 LIMIT 1`, [username, id]);
      if (duplicateUsername.rows[0]) {
        res.status(400).json({ success: false, errors: ["User ID already in use"] });
        return;
      }
    }

    if (email && email !== existing.rows[0].email) {
      const duplicateEmail = await query(`SELECT id FROM riders WHERE email = $1 AND id <> $2 LIMIT 1`, [email, id]);
      if (duplicateEmail.rows[0]) {
        res.status(400).json({ success: false, errors: ["Email already in use"] });
        return;
      }
    }

    if (bikeNumber && bikeNumber !== existing.rows[0].bike_number) {
      const duplicateBike = await query(`SELECT id FROM riders WHERE bike_number = $1 AND id <> $2 LIMIT 1`, [bikeNumber, id]);
      if (duplicateBike.rows[0]) {
        res.status(400).json({ success: false, errors: ["Bike number already exists"] });
        return;
      }
    }

    const nextMorning = morningReading ?? Number(existing.rows[0].morning_reading ?? 0);
    const nextEvening = eveningReading ?? Number(existing.rows[0].evening_reading ?? 0);
    const nextPassword = password ? await bcrypt.hash(password, 10) : null;

    const updated = await query(
      `
        UPDATE riders
        SET
          name = COALESCE($2, name),
          username = COALESCE($3, username),
          email = COALESCE($4, email),
          password = COALESCE($5, password),
          bike_number = COALESCE($6, bike_number),
          monthly_salary = COALESCE($7, monthly_salary),
          morning_reading = COALESCE($8, morning_reading),
          evening_reading = COALESCE($9, evening_reading),
          distance_km = COALESCE($9, evening_reading) - COALESCE($8, morning_reading),
          status = COALESCE($10, status),
          updated_at = NOW()
        WHERE id = $1
        RETURNING
          id,
          name,
          username,
          email,
          bike_number,
          monthly_salary,
          morning_reading,
          evening_reading,
          distance_km,
          status,
          created_at,
          updated_at
      `,
      [
        id,
        name ?? null,
        username ?? null,
        email ?? null,
        nextPassword,
        bikeNumber ?? null,
        monthlySalary ?? null,
        nextMorning,
        nextEvening,
        status ?? null,
      ]
    );

    await sendNotification("Rider updated", `Rider ${updated.rows[0].name} (${updated.rows[0].bike_number}) was updated.`);
    res.json({ success: true, data: serializeRider(updated.rows[0]) });
  })
);

router.delete(
  "/:id",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await withTransaction(async (client) => {
      const rider = await client.query(`DELETE FROM riders WHERE id = $1 RETURNING id`, [id]);
      if (!rider.rows[0]) {
        return false;
      }

      await client.query(`DELETE FROM attendance WHERE user_id = $1 AND type = 'rider'`, [id]);
      await client.query(`DELETE FROM advance_payments WHERE user_id = $1 AND type = 'rider'`, [id]);
      await client.query(`DELETE FROM salary_payments WHERE user_id = $1 AND type = 'rider'`, [id]);

      return true;
    });

    if (!result) {
      res.status(404).json({ success: false, errors: ["Rider not found"] });
      return;
    }

    res.json({ success: true, data: { id } });
  })
);

export default router;
