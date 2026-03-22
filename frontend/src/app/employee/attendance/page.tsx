"use client";

import { useMemo, useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { checkInAttendance, checkOutAttendance, createAttendance, useAttendance } from "@/lib/endpoints";
import { formatLocalDate, formatLocalMonth, isSameLocalDate } from "@/lib/dates";
import { employeeNavItems } from "@/lib/navigation";

export default function EmployeeAttendancePage() {
  useRequireAuth("employee", "/employee/login");
  const [month, setMonth] = useState(formatLocalMonth());
  const [submitting, setSubmitting] = useState<null | "checkin" | "checkout" | "absent">(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { data: attendance, error, mutate } = useAttendance({ type: "employee", month });
  const todayRecord = useMemo(() => (attendance ?? []).find((entry) => isSameLocalDate(entry.date)), [attendance]);

  const canCheckIn = !todayRecord;
  const canCheckOut = todayRecord?.status === "present" && !!todayRecord.checkIn && !todayRecord.checkOut;
  const canMarkAbsent = !todayRecord;

  async function handleCheckIn() {
    setSubmitting("checkin");
    setFeedback(null);
    setSubmitError(null);
    try {
      await checkInAttendance({ type: "employee", notes: "Checked in from employee attendance page" });
      await mutate();
      setFeedback("Check-in saved successfully.");
    } catch (err: any) {
      setSubmitError(err?.message ?? "Unable to save check-in.");
    } finally {
      setSubmitting(null);
    }
  }

  async function handleCheckOut() {
    setSubmitting("checkout");
    setFeedback(null);
    setSubmitError(null);
    try {
      await checkOutAttendance({ type: "employee", notes: "Checked out from employee attendance page" });
      await mutate();
      setFeedback("Check-out saved successfully.");
    } catch (err: any) {
      setSubmitError(err?.message ?? "Unable to save check-out.");
    } finally {
      setSubmitting(null);
    }
  }

  async function markAbsent() {
    setSubmitting("absent");
    setFeedback(null);
    setSubmitError(null);
    try {
      await createAttendance({
        type: "employee",
        status: "absent",
        date: formatLocalDate(),
        notes: "Marked absent from employee attendance page",
      });
      await mutate();
      setFeedback("Attendance marked absent for today.");
    } catch (err: any) {
      setSubmitError(err?.message ?? "Unable to mark absent.");
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <DashboardShell title="Attendance" subtitle="Check in, check out, and review your attendance month-wise" items={employeeNavItems}>
      <div className="glass p-6">
        <h2 className="panel-title">Today's Status</h2>
        <p className="panel-subtitle">Aaj ka attendance yahan se direct manage karo.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Status</p>
            <p className="mt-2 text-2xl font-semibold capitalize text-white">{todayRecord?.status ?? "not marked"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Check-in</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {todayRecord?.checkIn ? new Date(todayRecord.checkIn).toLocaleTimeString() : "-"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-indigo-100/60">Check-out</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {todayRecord?.checkOut ? new Date(todayRecord.checkOut).toLocaleTimeString() : "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="glass col-span-full p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="panel-title">Attendance History</h2>
            <p className="panel-subtitle">Monthly attendance records with session timings.</p>
          </div>
          <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
            <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="field-input w-full lg:w-56" />
            <button
              onClick={handleCheckIn}
              disabled={submitting !== null || !canCheckIn}
              className="action-button bg-gradient-to-r from-emerald-500/70 to-emerald-300/70 disabled:opacity-60"
            >
              {submitting === "checkin" ? "Saving..." : "Check In"}
            </button>
            <button
              onClick={handleCheckOut}
              disabled={submitting !== null || !canCheckOut}
              className="action-button bg-gradient-to-r from-cyan-500/70 to-sky-300/70 disabled:opacity-60"
            >
              {submitting === "checkout" ? "Saving..." : "Check Out"}
            </button>
            <button
              onClick={markAbsent}
              disabled={submitting !== null || !canMarkAbsent}
              className="action-button bg-gradient-to-r from-rose-500/70 to-rose-300/70 disabled:opacity-60"
            >
              {submitting === "absent" ? "Saving..." : "Mark Absent"}
            </button>
          </div>
        </div>

        {error ? <div className="mt-4 rounded-xl bg-rose-500/20 p-4 text-sm text-rose-100">Failed to load attendance data.</div> : null}
        {feedback ? <div className="mt-4 rounded-xl bg-emerald-500/15 p-4 text-sm text-emerald-100">{feedback}</div> : null}
        {submitError ? <div className="mt-4 rounded-xl bg-rose-500/20 p-4 text-sm text-rose-100">{submitError}</div> : null}

        <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm text-indigo-100/80">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-indigo-100/60">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Check-in</th>
                <th className="px-4 py-3">Check-out</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {attendance?.map((entry) => (
                <tr key={entry._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 capitalize">{entry.status}</td>
                  <td className="px-4 py-3">{entry.checkIn ? new Date(entry.checkIn).toLocaleTimeString() : "-"}</td>
                  <td className="px-4 py-3">{entry.checkOut ? new Date(entry.checkOut).toLocaleTimeString() : "-"}</td>
                  <td className="px-4 py-3">{entry.notes ?? "-"}</td>
                </tr>
              ))}
              {!attendance?.length && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-indigo-100/70">
                    No attendance records yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
