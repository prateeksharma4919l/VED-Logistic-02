export interface IRider {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  bikeNumber: string;
  monthlySalary: number;
  morningReading: number;
  eveningReading: number;
  distanceKm: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
