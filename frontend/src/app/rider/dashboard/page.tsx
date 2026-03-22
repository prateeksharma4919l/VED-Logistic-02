"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { StatusBadge } from "@/components/StatusBadge";
import {
  checkInAttendance,
  checkOutAttendance,
  createAttendance,
  fetchRiderProfile,
  useAdvancePayments,
  useAttendance,
  useAttendanceSummary,
  useSalary,
  useSalaryPayments,
} from "@/lib/endpoints";
import { formatLocalDate, formatLocalMonth, isSameLocalDate } from "@/lib/dates";
import { riderNavItems } from "@/lib/navigation";

export default function RiderDashboardPage() {
  useRequireAuth("rider", "/rider/login");

  const [month, setMonth] = useState(formatLocalMonth());
  const [attendanceBusy, setAttendanceBusy] = useState<null | "checkin" | "checkout" | "absent">(null);
  const [attendanceFeedback, setAttendanceFeedback] = useState<string | null>(null);
  const [attendanceError, setAttendanceError] = useState<string | null>(null);
  const { data: profile } = useSWR("/riders/me", fetchRiderProfile, { revalidateOnFocus: false });
  const { data: summary, mutate: mutateSummary } = useAttendanceSummary({ type: "rider", month });
  const { data: records, mutate: mutateAttendance } = useAttendance({ type: "rider", month });
  const { data: salary, mutate: mutateSalary } = useSalary({ type: "rider", month });
  const { data: advances } = useAdvancePayments({ type: "rider", month });
  const { data: payments } = useSalaryPayments({ type: "rider", month });
  const salaryCard = salary?.[0];
  const payment = payments?.[0];
  const latestRecords = useMemo(() => (records ?? []).slice(0, 5), [records]);
  const todayRecord = useMemo(() => (records ?? []).find((row) => isSameLocalDate(row.date)), [records]);

  async function handleCheckIn() {
    setAttendanceBusy("checkin");
    setAttendanceFeedback(null);
    setAttendanceError(null);
    try {
      await checkInAttendance({ type: "rider", notes: "Checked in from rider dashboard" });
      await Promise.all([mutateAttendance(), mutateSummary(), mutateSalary()]);
      setAttendanceFeedback("Check-in saved successfully.");
    } catch (err: any) {
      setAttendanceError(err?.message ?? "Unable to save check-in.");
    } finally {
      setAttendanceBusy(null);
    }
  }

  async function handleCheckOut() {
    setAttendanceBusy("checkout");
    setAttendanceFeedback(null);
    setAttendanceError(null);
    try {
      await checkOutAttendance({ type: "rider", notes: "Checked out from rider dashboard" });
      await Promise.all([mutateAttendance(), mutateSummary(), mutateSalary()]);
      setAttendanceFeedback("Check-out saved successfully.");
    } catch (err: any) {
      setAttendanceError(err?.message ?? "Unable to save check-out.");
    } finally {
      setAttendanceBusy(null);
    }
  }

  async function markAbsent() {
    setAttendanceBusy("absent");
    setAttendanceFeedback(null);
    setAttendanceError(null);
    try {
      await createAttendance({
        type: "rider",
        status: "absent",
        date: formatLocalDate(),
        notes: "Marked absent from rider dashboard",
      });
      await Promise.all([mutateAttendance(), mutateSummary(), mutateSalary()]);
      setAttendanceFeedback("Attendance marked absent for today.");
    } catch (err: any) {
      setAttendanceError(err?.message ?? "Unable to mark absent.");
    } finally {
      setAttendanceBusy(null);
    }
  }

  return (
    <DashboardShell title="Rider Dashboard" subtitle="Attendance, salary, and advances built for riders" items={riderNavItems}>
      <div className="glass col-span-full p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="panel-title">{profile?.name ?? "Rider Workspace"}</h2>
            <p className="panel-subtitle">{profile?.bikeNumber ? `${profile.bikeNumber} - ${profile.email}` : "Loading rider profile..."}</p>
          </div>
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="field-input w-full lg:w-56" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={handleCheckIn}
            disabled={attendanceBusy !== null || !!todayRecord}
            className="action-button bg-gradient-to-r from-cyan-500/70 to-sky-300/70 disabled:opacity-60"
          >
            {attendanceBusy === "checkin" ? "Saving..." : "Check In"}
          </button>
          <button
            onClick={handleCheckOut}
            disabled={attendanceBusy !== null || !(todayRecord?.status === "present" && todayRecord.checkIn && !todayRecord.checkOut)}
            className="action-button bg-gradient-to-r from-emerald-500/70 to-emerald-300/70 disabled:opacity-60"
          >
            {attendanceBusy === "checkout" ? "Saving..." : "Check Out"}
          </button>
          <button
            onClick={markAbsent}
            disabled={attendanceBusy !== null || !!todayRecord}
            className="action-button bg-gradient-to-r from-rose-500/70 to-rose-300/70 disabled:opacity-60"
          >
            {attendanceBusy === "absent" ? "Saving..." : "Mark Absent"}
          </button>
        </div>
        {attendanceFeedback ? <div className="mt-4 rounded-xl bg-emerald-500/15 p-4 text-sm text-emerald-100">{attendanceFeedback}</div> : null}
        {attendanceError ? <div className="mt-4 rounded-xl bg-rose-500/20 p-4 text-sm text-rose-100">{attendanceError}</div> : null}
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Today's Attendance</h3>
        <p className="panel-subtitle">Current day rider status and timings.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Status</p>
            <p className="mt-2 text-3xl font-semibold capitalize text-white">{todayRecord?.status ?? "not marked"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Check-in</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {todayRecord?.checkIn ? new Date(todayRecord.checkIn).toLocaleTimeString() : "-"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Check-out</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {todayRecord?.checkOut ? new Date(todayRecord.checkOut).toLocaleTimeString() : "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Salary Breakdown</h3>
        <p className="panel-subtitle">Monthly salary minus approved advances.</p>
        <div className="mt-5 space-y-3 text-sm text-indigo-100/75">
          <div className="flex items-center justify-between"><span>Monthly Salary</span><span>Rs. {salaryCard?.monthlySalary?.toLocaleString() ?? 0}</span></div>
          <div className="flex items-center justify-between"><span>Advance Payment</span><span>Rs. {salaryCard?.advanceDeduction?.toLocaleString() ?? 0}</span></div>
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-white"><span>Final Payable</span><span>Rs. {salaryCard?.finalSalary?.toLocaleString() ?? 0}</span></div>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Monthly Attendance</h3>
        <p className="panel-subtitle">Attendance tracking for {month}.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Present Days</p>
            <p className="mt-2 text-3xl font-semibold text-white">{summary?.presentDays ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Absent Days</p>
            <p className="mt-2 text-3xl font-semibold text-white">{summary?.absentDays ?? 0}</p>
          </div>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Advance History</h3>
        <p className="panel-subtitle">Only approved requests reduce the payable salary automatically.</p>
        <div className="mt-5 space-y-3">
          {(advances ?? []).slice(0, 5).map((item) => (
            <div key={item._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white">Rs. {item.amount.toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  <StatusBadge status={item.status} />
                  <p className="text-xs text-indigo-100/60">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-indigo-100/70">{item.note || "No note"}</p>
            </div>
          ))}
          {!advances?.length && <p className="text-sm text-indigo-100/70">No advances recorded this month.</p>}
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="panel-title">Payment Status</h3>
        <p className="panel-subtitle">Stored payment status for the selected month.</p>
        <div className="mt-5 space-y-3 text-sm text-indigo-100/75">
          <div className="flex items-center justify-between"><span>Status</span><span className="capitalize text-white">{payment?.status ?? salaryCard?.paymentStatus ?? "pending"}</span></div>
          <div className="flex items-center justify-between"><span>Payment Date</span><span>{payment?.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "Pending"}</span></div>
          <div className="flex items-center justify-between"><span>Final Paid Amount</span><span>Rs. {payment?.finalPaidAmount?.toLocaleString() ?? salaryCard?.finalSalary?.toLocaleString() ?? 0}</span></div>
        </div>
      </div>

      <div className="glass col-span-full p-6">
        <h3 className="panel-title">Recent Attendance Records</h3>
        <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm text-indigo-100/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-indigo-100/60">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Check-in</th>
                <th className="px-4 py-3">Check-out</th>
              </tr>
            </thead>
            <tbody>
              {latestRecords.map((row) => (
                <tr key={row._id} className="border-t border-white/10">
                  <td className="px-4 py-3">{new Date(row.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 capitalize">{row.status}</td>
                  <td className="px-4 py-3">{row.checkIn ? new Date(row.checkIn).toLocaleTimeString() : "-"}</td>
                  <td className="px-4 py-3">{row.checkOut ? new Date(row.checkOut).toLocaleTimeString() : "-"}</td>
                </tr>
              ))}
              {!latestRecords.length && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-sm text-indigo-100/70">No attendance records yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
