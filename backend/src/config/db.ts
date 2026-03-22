import pg from "pg";

const { Pool } = pg;

export type SqlRow = Record<string, unknown>;

let pool: pg.Pool | null = null;
let initialized = false;

function resolveConnectionString(explicit?: string) {
  return explicit ?? process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? process.env.POSTGRES_EXTERNAL_URL;
}

function shouldUseSsl(connectionString: string) {
  if ((process.env.PGSSLMODE ?? "").toLowerCase() === "disable") {
    return false;
  }

  return /render\.com/i.test(connectionString) || /sslmode=require/i.test(connectionString);
}

function getPool() {
  if (!pool) {
    throw new Error("Database is not connected");
  }

  return pool;
}

async function initializeSchema() {
  if (initialized) {
    return;
  }

  const db = getPool();

  await db.query("CREATE EXTENSION IF NOT EXISTS pgcrypto;");
  await db.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'employee');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'attendance_type') THEN
        CREATE TYPE attendance_type AS ENUM ('employee', 'rider');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'attendance_status') THEN
        CREATE TYPE attendance_status AS ENUM ('present', 'absent');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'advance_payment_status') THEN
        CREATE TYPE advance_payment_status AS ENUM ('pending', 'approved', 'rejected');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'salary_payment_status') THEN
        CREATE TYPE salary_payment_status AS ENUM ('paid', 'pending');
      END IF;
    END
    $$;
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role user_role NOT NULL,
      monthly_salary NUMERIC(12,2) NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS riders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      bike_number TEXT NOT NULL UNIQUE,
      monthly_salary NUMERIC(12,2) NOT NULL DEFAULT 0,
      morning_reading NUMERIC(12,2) NOT NULL DEFAULT 0,
      evening_reading NUMERIC(12,2) NOT NULL DEFAULT 0,
      distance_km NUMERIC(12,2) NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS attendance (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL,
      type attendance_type NOT NULL,
      date DATE NOT NULL,
      check_in TIMESTAMPTZ,
      check_out TIMESTAMPTZ,
      status attendance_status NOT NULL DEFAULT 'present',
      notes TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (user_id, type, date)
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS advance_payments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL,
      type attendance_type NOT NULL,
      amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
      date DATE NOT NULL DEFAULT CURRENT_DATE,
      note TEXT NOT NULL DEFAULT '',
      status advance_payment_status NOT NULL DEFAULT 'pending',
      created_by UUID,
      approved_by UUID,
      approved_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS salary_payments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL,
      type attendance_type NOT NULL,
      month TEXT NOT NULL,
      total_salary NUMERIC(12,2) NOT NULL DEFAULT 0,
      advance_deduction NUMERIC(12,2) NOT NULL DEFAULT 0,
      final_paid_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
      payment_date TIMESTAMPTZ,
      status salary_payment_status NOT NULL DEFAULT 'pending',
      created_by UUID,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (user_id, type, month)
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS reports (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      meta JSONB NOT NULL DEFAULT '{}'::jsonb,
      generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      generated_by UUID,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query("CREATE INDEX IF NOT EXISTS idx_attendance_month ON attendance (type, date);");
  await db.query("CREATE INDEX IF NOT EXISTS idx_advance_month ON advance_payments (type, date, status);");
  await db.query("CREATE INDEX IF NOT EXISTS idx_salary_payments_month ON salary_payments (type, month, status);");

  initialized = true;
}

export async function connectDb(connectionString?: string) {
  if (pool) {
    return;
  }

  const resolved = resolveConnectionString(connectionString);
  if (!resolved) {
    throw new Error("DATABASE_URL is required for PostgreSQL");
  }

  pool = new Pool({
    connectionString: resolved,
    ssl: shouldUseSsl(resolved) ? { rejectUnauthorized: false } : false,
    max: Number(process.env.DB_POOL_MAX ?? 10),
  });

  await pool.query("SELECT 1");
  await initializeSchema();

  pool.on("error", (error: Error) => {
    console.error("PostgreSQL connection error", error);
  });

  console.log("PostgreSQL connected");
}

export async function query<T extends SqlRow = SqlRow>(text: string, params: unknown[] = []) {
  return getPool().query<T>(text, params);
}

export async function withTransaction<T>(handler: (client: pg.PoolClient) => Promise<T>) {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const result = await handler(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
