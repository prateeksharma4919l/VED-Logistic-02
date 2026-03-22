import useSWR from "swr";
import { apiFetch } from "@/lib/api";

export type Rider = {
  _id: string;
  name: string;
  username: string;
  email: string;
  bikeNumber: string;
  monthlySalary: number;
  morningReading: number;
  eveningReading: number;
  distanceKm: number;
  status: string;
  createdAt: string;
};

export type Employee = {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: "employee" | "admin";
  monthlySalary: number;
  createdAt: string;
};

export type AttendanceRecord = {
  _id: string;
  userId: string;
  userIdentifier?: string;
  userName?: string;
  userEmail?: string;
  type: "employee" | "rider";
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: "present" | "absent";
  notes?: string;
  createdAt: string;
};

export type Report = {
  _id: string;
  title: string;
  description: string;
  meta: Record<string, unknown>;
  generatedAt: string;
};

export type AttendanceSummary = {
  month: string;
  presentDays: number;
  absentDays: number;
};

export type AdvancePayment = {
  _id: string;
  userId: string;
  userIdentifier?: string;
  userName?: string;
  userEmail?: string;
  type: "employee" | "rider";
  amount: number;
  date: string;
  note?: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
};

export type SalarySummary = {
  userId: string;
  type: "employee" | "rider";
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

export type SalaryPayment = {
  _id: string;
  userId: string;
  userIdentifier?: string;
  userName?: string;
  userEmail?: string;
  monthlySalary?: number;
  type: "employee" | "rider";
  month: string;
  totalSalary: number;
  advanceDeduction: number;
  finalPaidAmount: number;
  paymentDate?: string;
  status: "paid" | "pending";
  createdAt: string;
};

export async function fetchRiders() {
  return apiFetch<Rider[]>("/riders");
}

export async function fetchRiderProfile() {
  return apiFetch<Rider>("/riders/me");
}

export async function createRider(payload: Partial<Rider> & { password?: string }) {
  return apiFetch<Rider>("/riders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateRider(id: string, payload: Partial<Rider>) {
  return apiFetch<Rider>(`/riders/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteRider(id: string) {
  return apiFetch<{ id: string }>(`/riders/${id}`, {
    method: "DELETE",
  });
}

export async function fetchEmployees() {
  return apiFetch<Employee[]>("/employees");
}

export async function fetchEmployeeProfile() {
  return apiFetch<Employee>("/employees/me");
}

export async function createEmployee(payload: {
  name: string;
  username: string;
  email: string;
  password: string;
  monthlySalary?: number;
}) {
  return apiFetch<Employee>("/employees", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateEmployee(id: string, payload: Partial<Employee> & { password?: string }) {
  return apiFetch<Employee>(`/employees/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteEmployee(id: string) {
  return apiFetch<{ id: string }>(`/employees/${id}`, {
    method: "DELETE",
  });
}

export async function fetchAttendance(params?: {
  type?: "employee" | "rider";
  month?: string;
  userId?: string;
}) {
  const query = new URLSearchParams();
  if (params?.type) query.set("type", params.type);
  if (params?.month) query.set("month", params.month);
  if (params?.userId) query.set("userId", params.userId);
  const suffix = query.size ? `?${query.toString()}` : "";
  return apiFetch<AttendanceRecord[]>(`/attendance${suffix}`);
}

export async function fetchAttendanceSummary(params?: {
  type?: "employee" | "rider";
  month?: string;
  userId?: string;
}) {
  const query = new URLSearchParams();
  if (params?.type) query.set("type", params.type);
  if (params?.month) query.set("month", params.month);
  if (params?.userId) query.set("userId", params.userId);
  const suffix = query.size ? `?${query.toString()}` : "";
  return apiFetch<AttendanceSummary>(`/attendance/summary${suffix}`);
}

export async function createAttendance(payload: Partial<AttendanceRecord>) {
  return apiFetch<AttendanceRecord>("/attendance", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function checkInAttendance(payload?: {
  userId?: string;
  type?: "employee" | "rider";
  date?: string;
  notes?: string;
}) {
  return apiFetch<AttendanceRecord>("/attendance/check-in", {
    method: "POST",
    body: JSON.stringify(payload ?? {}),
  });
}

export async function checkOutAttendance(payload?: {
  userId?: string;
  type?: "employee" | "rider";
  date?: string;
  notes?: string;
}) {
  return apiFetch<AttendanceRecord>("/attendance/check-out", {
    method: "POST",
    body: JSON.stringify(payload ?? {}),
  });
}

export async function updateAttendance(id: string, payload: Partial<AttendanceRecord>) {
  return apiFetch<AttendanceRecord>(`/attendance/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteAttendance(id: string) {
  return apiFetch<{ id: string }>(`/attendance/${id}`, {
    method: "DELETE",
  });
}

export async function fetchReports() {
  return apiFetch<Report[]>("/reports");
}

export async function generateReport(payload: { title: string; description: string; meta: Record<string, unknown> }) {
  return apiFetch<Report>("/reports/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchAdvancePayments(params?: {
  type?: "employee" | "rider";
  month?: string;
  userId?: string;
  status?: "pending" | "approved" | "rejected";
}) {
  const query = new URLSearchParams();
  if (params?.type) query.set("type", params.type);
  if (params?.month) query.set("month", params.month);
  if (params?.userId) query.set("userId", params.userId);
  if (params?.status) query.set("status", params.status);
  const suffix = query.size ? `?${query.toString()}` : "";
  return apiFetch<AdvancePayment[]>(`/advance-payments${suffix}`);
}

export async function createAdvancePayment(payload: Partial<AdvancePayment>) {
  return apiFetch<AdvancePayment>("/advance-payments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAdvancePayment(id: string, payload: Partial<AdvancePayment>) {
  return apiFetch<AdvancePayment>(`/advance-payments/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function approveAdvancePayment(id: string) {
  return apiFetch<AdvancePayment>(`/advance-payments/${id}/approve`, {
    method: "POST",
  });
}

export async function rejectAdvancePayment(id: string) {
  return apiFetch<AdvancePayment>(`/advance-payments/${id}/reject`, {
    method: "POST",
  });
}

export async function deleteAdvancePayment(id: string) {
  return apiFetch<{ id: string }>(`/advance-payments/${id}`, {
    method: "DELETE",
  });
}

export async function fetchSalary(params?: {
  type?: "employee" | "rider";
  month?: string;
  userId?: string;
}) {
  const query = new URLSearchParams();
  if (params?.type) query.set("type", params.type);
  if (params?.month) query.set("month", params.month);
  if (params?.userId) query.set("userId", params.userId);
  const suffix = query.size ? `?${query.toString()}` : "";
  return apiFetch<SalarySummary[]>(`/salary${suffix}`);
}

export async function fetchSalaryPayments(params?: {
  type?: "employee" | "rider";
  month?: string;
  userId?: string;
  status?: "paid" | "pending";
}) {
  const query = new URLSearchParams();
  if (params?.type) query.set("type", params.type);
  if (params?.month) query.set("month", params.month);
  if (params?.userId) query.set("userId", params.userId);
  if (params?.status) query.set("status", params.status);
  const suffix = query.size ? `?${query.toString()}` : "";
  return apiFetch<SalaryPayment[]>(`/salary-payment${suffix}`);
}

export async function createSalaryPayment(payload: {
  userId: string;
  type: "employee" | "rider";
  month?: string;
  status?: "paid" | "pending";
  paymentDate?: string;
}) {
  return apiFetch<SalaryPayment>("/salary-payment", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateSalaryPayment(
  id: string,
  payload: Partial<Pick<SalaryPayment, "status" | "paymentDate">>
) {
  return apiFetch<SalaryPayment>(`/salary-payment/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteSalaryPayment(id: string) {
  return apiFetch<{ id: string }>(`/salary-payment/${id}`, {
    method: "DELETE",
  });
}

export function useRiders() {
  return useSWR("/riders", fetchRiders, { revalidateOnFocus: false });
}

export function useEmployees() {
  return useSWR("/employees", fetchEmployees, { revalidateOnFocus: false });
}

export function useAttendance(params?: { type?: "employee" | "rider"; month?: string; userId?: string }) {
  const key = `/attendance:${params?.type ?? "all"}:${params?.month ?? "current"}:${params?.userId ?? "self"}`;
  return useSWR(key, () => fetchAttendance(params), { revalidateOnFocus: false });
}

export function useAttendanceSummary(params?: {
  type?: "employee" | "rider";
  month?: string;
  userId?: string;
}) {
  const key = `/attendance-summary:${params?.type ?? "all"}:${params?.month ?? "current"}:${params?.userId ?? "self"}`;
  return useSWR(key, () => fetchAttendanceSummary(params), { revalidateOnFocus: false });
}

export function useReports() {
  return useSWR("/reports", fetchReports, { revalidateOnFocus: false });
}

export function useAdvancePayments(params?: {
  type?: "employee" | "rider";
  month?: string;
  userId?: string;
  status?: "pending" | "approved" | "rejected";
}) {
  const key = `/advance-payments:${params?.type ?? "all"}:${params?.month ?? "current"}:${params?.userId ?? "self"}:${params?.status ?? "all"}`;
  return useSWR(key, () => fetchAdvancePayments(params), { revalidateOnFocus: false });
}

export function useSalary(params?: { type?: "employee" | "rider"; month?: string; userId?: string }) {
  const key = `/salary:${params?.type ?? "all"}:${params?.month ?? "current"}:${params?.userId ?? "self"}`;
  return useSWR(key, () => fetchSalary(params), { revalidateOnFocus: false });
}

export function useSalaryPayments(params?: {
  type?: "employee" | "rider";
  month?: string;
  userId?: string;
  status?: "paid" | "pending";
}) {
  const key = `/salary-payments:${params?.type ?? "all"}:${params?.month ?? "current"}:${params?.userId ?? "self"}:${params?.status ?? "all"}`;
  return useSWR(key, () => fetchSalaryPayments(params), { revalidateOnFocus: false });
}
