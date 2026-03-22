import { query } from "../config/db.js";
import type { AttendanceType } from "../models/Attendance.js";

export type MonthBounds = {
  month: string;
  start: string;
  end: string;
  workingDays: number;
};

export type SalarySummary = {
  userId: string;
  type: AttendanceType;
  name: string;
  email: string;
  username: string;
  monthlySalary: number;
  workingDays: number;
  perDaySalary: number;
  presentDays: number;
  absentDays: number;
  earnedSalary: number;
  advanceDeduction: number;
  finalSalary: number;
  paymentStatus: "paid" | "pending";
  paymentDate?: string;
};

export type ActorRef = {
  id: string;
  type: AttendanceType;
  name: string;
  email: string;
  username: string;
  monthlySalary: number;
};

type DbActorRow = {
  id: string;
  name: string;
  email: string;
  username: string;
  monthly_salary: string | number;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatDateOnly(date: Date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

async function findActor(userRef: string, type: AttendanceType) {
  const normalizedRef = userRef.trim();
  const params: string[] = [normalizedRef];
  const conditions = ["username = $1", "email = $1"];

  if (isUuid(normalizedRef)) {
    params.push(normalizedRef);
    conditions.unshift(`id = $${params.length}`);
  }

  if (type === "employee") {
    const result = await query<DbActorRow>(
      `
        SELECT id, name, email, username, monthly_salary
        FROM users
        WHERE role = 'employee'
          AND (${conditions.join(" OR ")})
        LIMIT 1
      `,
      params
    );
    return result.rows[0];
  }

  const result = await query<DbActorRow>(
    `
      SELECT id, name, email, username, monthly_salary
      FROM riders
      WHERE ${conditions.join(" OR ")}
      LIMIT 1
    `,
    params
  );
  return result.rows[0];
}

export function getMonthBounds(month?: string): MonthBounds {
  const now = new Date();
  const monthKey = month ?? `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}`;
  const [year, monthPart] = monthKey.split("-").map(Number);
  const startDate = new Date(Date.UTC(year, monthPart - 1, 1));
  const endDate = new Date(Date.UTC(year, monthPart, 1));

  let workingDays = 0;
  for (let day = new Date(startDate); day < endDate; day = new Date(day.getTime() + 24 * 60 * 60 * 1000)) {
    if (day.getUTCDay() !== 0) {
      workingDays += 1;
    }
  }

  return {
    month: monthKey,
    start: formatDateOnly(startDate),
    end: formatDateOnly(endDate),
    workingDays: Math.max(workingDays, 1),
  };
}

export function normalizeDateOnly(value?: string | Date) {
  const date = value ? new Date(value) : new Date();
  return formatDateOnly(new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())));
}

export async function validateUserRef(userRef: string, type: AttendanceType): Promise<ActorRef> {
  const normalized = userRef?.trim();
  if (!normalized) {
    throw new Error("User reference is required");
  }

  const actor = await findActor(normalized, type);
  if (!actor) {
    throw new Error(type === "employee" ? "Employee not found" : "Rider not found");
  }

  return {
    id: actor.id,
    type,
    name: actor.name,
    email: actor.email,
    username: actor.username,
    monthlySalary: Number(actor.monthly_salary ?? 0),
  };
}

export async function buildSalarySummary(userId: string, type: AttendanceType, month?: string): Promise<SalarySummary> {
  const person = await validateUserRef(userId, type);
  const bounds = getMonthBounds(month);

  const [attendanceResult, advanceResult, paymentResult] = await Promise.all([
    query<{ status: "present" | "absent"; total: string }>(
      `
        SELECT status, COUNT(*)::text AS total
        FROM attendance
        WHERE user_id = $1
          AND type = $2
          AND date >= $3::date
          AND date < $4::date
        GROUP BY status
      `,
      [person.id, type, bounds.start, bounds.end]
    ),
    query<{ total: string }>(
      `
        SELECT COALESCE(SUM(amount), 0)::text AS total
        FROM advance_payments
        WHERE user_id = $1
          AND type = $2
          AND status = 'approved'
          AND date >= $3::date
          AND date < $4::date
      `,
      [person.id, type, bounds.start, bounds.end]
    ),
    query<{ status: "paid" | "pending"; payment_date?: Date }>(
      `
        SELECT status, payment_date
        FROM salary_payments
        WHERE user_id = $1
          AND type = $2
          AND month = $3
        LIMIT 1
      `,
      [person.id, type, bounds.month]
    ),
  ]);

  const attendanceMap = new Map<"present" | "absent", number>(
    attendanceResult.rows.map((row: { status: "present" | "absent"; total: string }) => [row.status, Number(row.total)])
  );
  const presentDays = attendanceMap.get("present") ?? 0;
  const absentDays = attendanceMap.get("absent") ?? 0;
  const monthlySalary = Number(person.monthlySalary ?? 0);
  const perDaySalary = Number((monthlySalary / bounds.workingDays).toFixed(2));
  const earnedSalary = Number(monthlySalary.toFixed(2));
  const advanceTotal = advanceResult.rows[0]?.total ?? "0";
  const advanceDeduction = Number(Number(advanceTotal).toFixed(2));
  const finalSalary = Math.max(0, Number((monthlySalary - advanceDeduction).toFixed(2)));
  const payment = paymentResult.rows[0];

  return {
    userId: person.id,
    type,
    name: person.name,
    email: person.email,
    username: person.username,
    monthlySalary,
    workingDays: bounds.workingDays,
    perDaySalary,
    presentDays,
    absentDays,
    earnedSalary,
    advanceDeduction,
    finalSalary,
    paymentStatus: payment?.status ?? "pending",
    paymentDate: payment?.payment_date ? new Date(payment.payment_date).toISOString() : undefined,
  };
}
