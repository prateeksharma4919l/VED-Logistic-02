type Row = Record<string, unknown>;

function toIso(value: unknown) {
  if (!value) return undefined;
  return new Date(value as string | number | Date).toISOString();
}

function toDateOnlyIso(value: unknown) {
  if (!value) return undefined;

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T00:00:00.000Z`).toISOString();
  }

  return new Date(value as string | number | Date).toISOString();
}

function toNumber(value: unknown) {
  return Number(value ?? 0);
}

export function serializeEmployee(row: Row) {
  return {
    _id: String(row.id),
    name: String(row.name ?? ""),
    username: String(row.username ?? ""),
    email: String(row.email ?? ""),
    role: String(row.role ?? "employee"),
    monthlySalary: toNumber(row.monthly_salary),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

export function serializeRider(row: Row) {
  return {
    _id: String(row.id),
    name: String(row.name ?? ""),
    username: String(row.username ?? ""),
    email: String(row.email ?? ""),
    bikeNumber: String(row.bike_number ?? ""),
    monthlySalary: toNumber(row.monthly_salary),
    morningReading: toNumber(row.morning_reading),
    eveningReading: toNumber(row.evening_reading),
    distanceKm: toNumber(row.distance_km),
    status: String(row.status ?? ""),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

export function serializeAttendance(row: Row) {
  return {
    _id: String(row.id),
    userId: String(row.user_id),
    userIdentifier: row.user_identifier ? String(row.user_identifier) : undefined,
    userName: row.user_name ? String(row.user_name) : undefined,
    userEmail: row.user_email ? String(row.user_email) : undefined,
    type: String(row.type),
    date: toDateOnlyIso(row.date),
    checkIn: toIso(row.check_in),
    checkOut: toIso(row.check_out),
    status: String(row.status),
    notes: row.notes ? String(row.notes) : "",
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

export function serializeAdvancePayment(row: Row) {
  return {
    _id: String(row.id),
    userId: String(row.user_id),
    userIdentifier: row.user_identifier ? String(row.user_identifier) : undefined,
    userName: row.user_name ? String(row.user_name) : undefined,
    userEmail: row.user_email ? String(row.user_email) : undefined,
    type: String(row.type),
    amount: toNumber(row.amount),
    date: toDateOnlyIso(row.date),
    note: row.note ? String(row.note) : "",
    status: String(row.status),
    approvedBy: row.approved_by ? String(row.approved_by) : undefined,
    approvedAt: toIso(row.approved_at),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

export function serializeSalaryPayment(row: Row) {
  return {
    _id: String(row.id),
    userId: String(row.user_id),
    userIdentifier: row.user_identifier ? String(row.user_identifier) : undefined,
    userName: row.user_name ? String(row.user_name) : undefined,
    userEmail: row.user_email ? String(row.user_email) : undefined,
    monthlySalary: row.monthly_salary !== undefined ? toNumber(row.monthly_salary) : undefined,
    type: String(row.type),
    month: String(row.month),
    totalSalary: toNumber(row.total_salary),
    advanceDeduction: toNumber(row.advance_deduction),
    finalPaidAmount: toNumber(row.final_paid_amount),
    paymentDate: toIso(row.payment_date),
    status: String(row.status),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

export function serializeReport(row: Row) {
  return {
    _id: String(row.id),
    title: String(row.title ?? ""),
    description: String(row.description ?? ""),
    meta: (row.meta as Record<string, unknown>) ?? {},
    generatedAt: toIso(row.generated_at),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
    generatedBy: row.generated_by ? String(row.generated_by) : undefined,
  };
}
