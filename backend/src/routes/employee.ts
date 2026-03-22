import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { query, withTransaction } from "../config/db.js";
import { authenticate, requireRole } from "../middleware/auth.js";
import { sendNotification } from "../utils/email.js";
import { serializeEmployee } from "../utils/serializers.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/me",
  requireRole(["admin", "employee"]),
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
        SELECT id, name, username, email, role, monthly_salary, created_at, updated_at
        FROM users
        WHERE id = $1
          AND role = 'employee'
        LIMIT 1
      `,
      [req.user._id]
    );

    res.json({ success: true, data: result.rows[0] ? serializeEmployee(result.rows[0]) : null });
  })
);

router.get(
  "/",
  requireRole("admin"),
  asyncHandler(async (_req, res) => {
    const result = await query(
      `
        SELECT id, name, username, email, role, monthly_salary, created_at, updated_at
        FROM users
        WHERE role = 'employee'
        ORDER BY name ASC
      `
    );
    res.json({ success: true, data: result.rows.map(serializeEmployee) });
  })
);

router.post(
  "/",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const { name, username, email, password, monthlySalary = 0 } = req.body as {
      name: string;
      username: string;
      email: string;
      password: string;
      monthlySalary?: number;
    };

    const duplicate = await query(
      `
        SELECT id
        FROM users
        WHERE username = $1 OR email = $2
        LIMIT 1
      `,
      [username, email]
    );

    if (duplicate.rows[0]) {
      res.status(400).json({ success: false, errors: ["Email or user ID already in use"] });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const insert = await query(
      `
        INSERT INTO users (name, username, email, password, role, monthly_salary)
        VALUES ($1, $2, $3, $4, 'employee', $5)
        RETURNING id, name, username, email, role, monthly_salary, created_at, updated_at
      `,
      [name, username, email, hashed, monthlySalary]
    );

    await sendNotification("Employee added", `New employee ${name} (${email}) was created.`);
    res.json({ success: true, data: serializeEmployee(insert.rows[0]) });
  })
);

router.put(
  "/:id",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, username, email, password, monthlySalary } = req.body as {
      name?: string;
      username?: string;
      email?: string;
      password?: string;
      monthlySalary?: number;
    };

    const existing = await query(
      `
        SELECT id, username, email
        FROM users
        WHERE id = $1
          AND role = 'employee'
        LIMIT 1
      `,
      [id]
    );

    if (!existing.rows[0]) {
      res.status(404).json({ success: false, errors: ["Employee not found"] });
      return;
    }

    if (username && username !== existing.rows[0].username) {
      const duplicateUsername = await query(
        `
          SELECT id
          FROM users
          WHERE username = $1
            AND id <> $2
          LIMIT 1
        `,
        [username, id]
      );
      if (duplicateUsername.rows[0]) {
        res.status(400).json({ success: false, errors: ["User ID already in use"] });
        return;
      }
    }

    if (email && email !== existing.rows[0].email) {
      const duplicateEmail = await query(
        `
          SELECT id
          FROM users
          WHERE email = $1
            AND id <> $2
          LIMIT 1
        `,
        [email, id]
      );
      if (duplicateEmail.rows[0]) {
        res.status(400).json({ success: false, errors: ["Email already in use"] });
        return;
      }
    }

    const nextPassword = password ? await bcrypt.hash(password, 10) : null;
    const update = await query(
      `
        UPDATE users
        SET
          name = COALESCE($2, name),
          username = COALESCE($3, username),
          email = COALESCE($4, email),
          password = COALESCE($5, password),
          monthly_salary = COALESCE($6, monthly_salary),
          updated_at = NOW()
        WHERE id = $1
          AND role = 'employee'
        RETURNING id, name, username, email, role, monthly_salary, created_at, updated_at
      `,
      [id, name ?? null, username ?? null, email ?? null, nextPassword, monthlySalary ?? null]
    );

    res.json({ success: true, data: serializeEmployee(update.rows[0]) });
  })
);

router.delete(
  "/:id",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await withTransaction(async (client) => {
      const employee = await client.query(
        `
          DELETE FROM users
          WHERE id = $1
            AND role = 'employee'
          RETURNING id
        `,
        [id]
      );

      if (!employee.rows[0]) {
        return false;
      }

      await client.query(`DELETE FROM attendance WHERE user_id = $1 AND type = 'employee'`, [id]);
      await client.query(`DELETE FROM advance_payments WHERE user_id = $1 AND type = 'employee'`, [id]);
      await client.query(`DELETE FROM salary_payments WHERE user_id = $1 AND type = 'employee'`, [id]);

      return true;
    });

    if (!result) {
      res.status(404).json({ success: false, errors: ["Employee not found"] });
      return;
    }

    res.json({ success: true, data: { id } });
  })
);

export default router;
