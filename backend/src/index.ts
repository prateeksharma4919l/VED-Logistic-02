import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./config/db.js";
import authRouter from "./routes/auth.js";
import employeeRouter from "./routes/employee.js";
import riderRouter from "./routes/rider.js";
import attendanceRouter from "./routes/attendance.js";
import reportRouter from "./routes/report.js";
import advancePaymentRouter from "./routes/advancePayment.js";
import salaryRouter from "./routes/salary.js";
import salaryPaymentRouter from "./routes/salaryPayment.js";
import { startDailySummary } from "./utils/scheduler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(backendRoot, "..");

dotenv.config({ path: path.join(workspaceRoot, ".env") });
dotenv.config({ path: path.join(backendRoot, ".env"), override: true });

const app = express();
const port = Number(process.env.API_INTERNAL_PORT ?? process.env.PORT ?? 4000);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/riders", riderRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/reports", reportRouter);
app.use("/api/advance-payments", advancePaymentRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/salary-payment", salaryPaymentRouter);

app.get("/api/health", (_req, res) => {
  return res.json({ success: true, data: { status: "ok" } });
});

async function main() {
  await connectDb();
  startDailySummary();

  app.listen(port, () => {
    console.log(`Ved Logistics API running on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
