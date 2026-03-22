export type AttendanceType = "employee" | "rider";
export type AttendanceStatus = "present" | "absent";

export interface IAttendance {
  id: string;
  userId: string;
  type: AttendanceType;
  date: string;
  checkIn?: Date;
  checkOut?: Date;
  status: AttendanceStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
