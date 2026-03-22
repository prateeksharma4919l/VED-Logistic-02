import type { AttendanceType } from "./Attendance.js";

export type AdvancePaymentStatus = "pending" | "approved" | "rejected";

export interface IAdvancePayment {
  id: string;
  userId: string;
  type: AttendanceType;
  amount: number;
  date: string;
  note?: string;
  status: AdvancePaymentStatus;
  createdBy?: string;
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
