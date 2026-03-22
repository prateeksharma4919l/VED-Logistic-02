import type { AttendanceType } from "./Attendance.js";

export type SalaryPaymentStatus = "paid" | "pending";

export interface ISalaryPayment {
  id: string;
  userId: string;
  type: AttendanceType;
  month: string;
  totalSalary: number;
  advanceDeduction: number;
  finalPaidAmount: number;
  paymentDate?: Date;
  status: SalaryPaymentStatus;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}
