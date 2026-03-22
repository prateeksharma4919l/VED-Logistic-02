export type UserRole = "admin" | "employee";

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  monthlySalary: number;
  createdAt: Date;
  updatedAt: Date;
}
