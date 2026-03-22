import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { query } from "../config/db.js";
import { authenticate, generateToken } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { identifier, email, password, role } = req.body as {
      identifier?: string;
      email?: string;
      password: string;
      role: "admin" | "employee" | "rider";
    };

    const loginValue = (identifier ?? email ?? "").trim();
    const table = role === "rider" ? "riders" : "users";
    const extraFilter = role === "rider" ? "" : "AND role = $2";
    const params = role === "rider" ? [loginValue] : [loginValue, role];

    const result = await query<{
      id: string;
      name: string;
      username: string;
      email: string;
      password: string;
      role?: "admin" | "employee";
    }>(
      `
        SELECT id, name, username, email, password, ${role === "rider" ? "'rider'" : "role"} AS role
        FROM ${table}
        WHERE (email = $1 OR username = $1)
          ${extraFilter}
        LIMIT 1
      `,
      params
    );

    const user = result.rows[0];
    if (!user) {
      res.status(401).json({ success: false, errors: ["Invalid user ID or password"] });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    const actualRole = role === "rider" ? "rider" : user.role;
    if (!match || actualRole !== role) {
      res.status(401).json({ success: false, errors: ["Invalid user ID or password"] });
      return;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: actualRole,
      actorKind: role === "rider" ? "rider" : "user",
    });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: actualRole,
        },
      },
    });
  })
);

router.get(
  "/me",
  authenticate,
  asyncHandler(async (req: any, res) => {
    res.json({ success: true, data: req.user });
  })
);

router.post(
  "/seed",
  asyncHandler(async (_req, res) => {
    const password = await bcrypt.hash("admin123", 10);

    await query(
      `
        INSERT INTO users (name, username, email, password, role, monthly_salary, updated_at)
        VALUES ($1, $2, $3, $4, 'admin', $5, NOW())
        ON CONFLICT (email)
        DO UPDATE SET
          name = EXCLUDED.name,
          username = EXCLUDED.username,
          password = EXCLUDED.password,
          role = EXCLUDED.role,
          monthly_salary = EXCLUDED.monthly_salary,
          updated_at = NOW()
      `,
      ["Ved Logistics Admin", "admin", "admin@vedlogistics.com", password, 55000]
    );

    await query(
      `
        INSERT INTO users (name, username, email, password, role, monthly_salary, updated_at)
        VALUES ($1, $2, $3, $4, 'employee', $5, NOW())
        ON CONFLICT (email)
        DO UPDATE SET
          name = EXCLUDED.name,
          username = EXCLUDED.username,
          password = EXCLUDED.password,
          role = EXCLUDED.role,
          monthly_salary = EXCLUDED.monthly_salary,
          updated_at = NOW()
      `,
      ["Test Employee", "employee01", "employee@vedlogistics.com", password, 26000]
    );

    await query(
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
          status,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, 0, 0, 0, 'pending', NOW())
        ON CONFLICT (email)
        DO UPDATE SET
          name = EXCLUDED.name,
          username = EXCLUDED.username,
          password = EXCLUDED.password,
          bike_number = EXCLUDED.bike_number,
          monthly_salary = EXCLUDED.monthly_salary,
          morning_reading = EXCLUDED.morning_reading,
          evening_reading = EXCLUDED.evening_reading,
          distance_km = EXCLUDED.distance_km,
          status = EXCLUDED.status,
          updated_at = NOW()
      `,
      ["Demo Rider", "rider01", "rider@vedlogistics.com", password, "DL-01-R-1001", 22000]
    );

    res.json({ success: true, data: { message: "Seed created" } });
  })
);

export default router;
