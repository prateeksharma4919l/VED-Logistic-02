import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";
import jwt from "jsonwebtoken";
import { query } from "../config/db.js";
import type { UserRole } from "../models/User.js";

export type AppRole = UserRole | "rider";
export type ActorKind = "user" | "rider";

export interface AuthUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: AppRole;
  actorKind: ActorKind;
  monthlySalary?: number;
}

export interface AuthRequest extends Request {
  headers: IncomingHttpHeaders;
  user?: AuthUser;
}

type JwtPayload = {
  sub: string;
  role: AppRole;
  email: string;
  actorKind?: ActorKind;
};

export function generateToken(user: { id: string; email: string; role: AppRole; actorKind: ActorKind }) {
  const secret = process.env.JWT_SECRET ?? "change-me";
  return jwt.sign({ sub: user.id, email: user.email, role: user.role, actorKind: user.actorKind }, secret, {
    expiresIn: "7d",
  });
}

async function findActor(payload: JwtPayload) {
  if ((payload.actorKind ?? "user") === "rider") {
    const result = await query<{
      id: string;
      name: string;
      username: string;
      email: string;
      monthly_salary: string | number;
    }>(
      `
        SELECT id, name, username, email, monthly_salary
        FROM riders
        WHERE id = $1
        LIMIT 1
      `,
      [payload.sub]
    );

    if (!result.rows[0]) {
      return null;
    }

    return {
      _id: result.rows[0].id,
      name: result.rows[0].name,
      username: result.rows[0].username,
      email: result.rows[0].email,
      role: "rider" as const,
      actorKind: "rider" as const,
      monthlySalary: Number(result.rows[0].monthly_salary ?? 0),
    };
  }

  const result = await query<{
    id: string;
    name: string;
    username: string;
    email: string;
    role: UserRole;
    monthly_salary: string | number;
  }>(
    `
      SELECT id, name, username, email, role, monthly_salary
      FROM users
      WHERE id = $1
      LIMIT 1
    `,
    [payload.sub]
  );

  if (!result.rows[0]) {
    return null;
  }

  return {
    _id: result.rows[0].id,
    name: result.rows[0].name,
    username: result.rows[0].username,
    email: result.rows[0].email,
    role: result.rows[0].role,
    actorKind: "user" as const,
    monthlySalary: Number(result.rows[0].monthly_salary ?? 0),
  };
}

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  const secret = process.env.JWT_SECRET ?? "change-me";

  if (!token) {
    return res.status(401).json({ success: false, errors: ["Missing auth token"] });
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    const actor = await findActor(payload);

    if (!actor) {
      return res.status(401).json({ success: false, errors: ["User not found"] });
    }

    req.user = actor;
    next();
  } catch {
    return res.status(401).json({ success: false, errors: ["Invalid token"] });
  }
}

export function requireRole(role: AppRole | AppRole[]) {
  const allowed = Array.isArray(role) ? role : [role];
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, errors: ["Not authenticated"] });
    }
    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ success: false, errors: ["Not authorized"] });
    }
    next();
  };
}
