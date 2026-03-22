const TODAY = "2026-03-23";
const CURRENT_MONTH = "2026-03";

const refs = {
  roleSwitcher: document.getElementById("roleSwitcher"),
  moduleNav: document.getElementById("moduleNav"),
  heroEyebrow: document.getElementById("heroEyebrow"),
  heroTitle: document.getElementById("heroTitle"),
  heroDescription: document.getElementById("heroDescription"),
  summaryGrid: document.getElementById("summaryGrid"),
  primaryKicker: document.getElementById("primaryKicker"),
  primaryTitle: document.getElementById("primaryTitle"),
  secondaryKicker: document.getElementById("secondaryKicker"),
  secondaryTitle: document.getElementById("secondaryTitle"),
  detailKicker: document.getElementById("detailKicker"),
  detailTitle: document.getElementById("detailTitle"),
  modulePrimary: document.getElementById("modulePrimary"),
  moduleSecondary: document.getElementById("moduleSecondary"),
  moduleDetail: document.getElementById("moduleDetail"),
  activityFeed: document.getElementById("activityFeed"),
  toastStack: document.getElementById("toastStack"),
  clockValue: document.getElementById("clockValue"),
};

const roleMeta = {
  admin: {
    eyebrow: "Admin Control",
    title: "One cleaner dashboard for payroll, attendance, people, and reports.",
    description:
      "This improved static system pulls the strongest ideas from the older Ved logistics builds and presents them in a sharper, faster control center.",
  },
  employee: {
    eyebrow: "Employee Workspace",
    title: "Attendance, salary, advances, and payment history without the clutter.",
    description:
      "Everything important is clearer here: daily punch flow, monthly salary view, advance tracking, and report access in one personal workspace.",
  },
  rider: {
    eyebrow: "Rider Console",
    title: "Route-focused flow with stronger visibility on payout, attendance, and reports.",
    description:
      "The rider view keeps daily movement simple while still giving a premium panel for payment history, advances, report exports, and live status.",
  },
};

const navConfig = {
  admin: [
    { id: "overview", label: "Overview" },
    { id: "users", label: "User Registration" },
    { id: "employees", label: "Employees" },
    { id: "riders", label: "Riders" },
    { id: "attendance", label: "Attendance" },
    { id: "salary", label: "Salary" },
    { id: "advances", label: "Advance Payments" },
    { id: "payments", label: "Payment History" },
    { id: "reports", label: "Reports" },
  ],
  employee: [
    { id: "overview", label: "Overview" },
    { id: "attendance", label: "Attendance" },
    { id: "salary", label: "Salary" },
    { id: "advances", label: "Advance Payments" },
    { id: "payments", label: "Payment History" },
    { id: "reports", label: "Reports" },
  ],
  rider: [
    { id: "overview", label: "Overview" },
    { id: "attendance", label: "Attendance" },
    { id: "salary", label: "Salary" },
    { id: "advances", label: "Advance Payments" },
    { id: "payments", label: "Payment History" },
    { id: "reports", label: "Reports" },
  ],
};

const state = {
  role: "admin",
  section: "overview",
  sequences: {
    employee: 8,
    rider: 15,
    payment: 305,
    advance: 207,
  },
  currentUsers: {
    employee: "EMP-07",
    rider: "RID-14",
  },
  employees: [
    { id: "EMP-01", name: "Aarav Singh", username: "aarav.singh", email: "aarav@vedwork.local", branch: "Noida Hub", shift: "Morning", status: "active", salary: 28000, attendanceRate: 96, paymentStatus: "pending" },
    { id: "EMP-02", name: "Riya Kapoor", username: "riya.kapoor", email: "riya@vedwork.local", branch: "South Delhi", shift: "General", status: "active", salary: 32000, attendanceRate: 98, paymentStatus: "paid" },
    { id: "EMP-03", name: "Kabir Mehta", username: "kabir.mehta", email: "kabir@vedwork.local", branch: "Ghaziabad", shift: "Evening", status: "leave", salary: 26500, attendanceRate: 88, paymentStatus: "pending" },
    { id: "EMP-04", name: "Sana Ali", username: "sana.ali", email: "sana@vedwork.local", branch: "Noida Hub", shift: "Morning", status: "active", salary: 29500, attendanceRate: 93, paymentStatus: "paid" },
    { id: "EMP-07", name: "Yash Verma", username: "yash.verma", email: "yash@vedwork.local", branch: "Noida Hub", shift: "General", status: "active", salary: 26000, attendanceRate: 95, paymentStatus: "pending" },
  ],
  riders: [
    { id: "RID-09", name: "Reyansh Rao", username: "reyansh.rao", email: "reyansh@vedwork.local", zone: "East Loop", bike: "UP16 AF 9921", status: "on route", salary: 22500, deliveries: 31, attendanceRate: 94, paymentStatus: "pending" },
    { id: "RID-10", name: "Imran Khan", username: "imran.khan", email: "imran@vedwork.local", zone: "Central Arc", bike: "DL8S BQ 4412", status: "active", salary: 24000, deliveries: 27, attendanceRate: 92, paymentStatus: "paid" },
    { id: "RID-11", name: "Deepak Saini", username: "deepak.saini", email: "deepak@vedwork.local", zone: "North Ring", bike: "UP14 CZ 1108", status: "maintenance", salary: 21500, deliveries: 18, attendanceRate: 84, paymentStatus: "pending" },
    { id: "RID-12", name: "Amit Solanki", username: "amit.solanki", email: "amit@vedwork.local", zone: "South Express", bike: "DL5S CJ 8744", status: "on route", salary: 23200, deliveries: 29, attendanceRate: 91, paymentStatus: "paid" },
    { id: "RID-14", name: "Mohit Rana", username: "mohit.rana", email: "mohit@vedwork.local", zone: "East Loop", bike: "UP16 AJ 4580", status: "on route", salary: 22100, deliveries: 33, attendanceRate: 97, paymentStatus: "paid" },
  ],
  registrations: [
    { id: "REG-101", name: "Aarav Singh", role: "employee", username: "aarav.singh", branch: "Noida Hub", createdAt: "2026-03-20 09:15" },
    { id: "REG-102", name: "Riya Kapoor", role: "employee", username: "riya.kapoor", branch: "South Delhi", createdAt: "2026-03-20 10:05" },
    { id: "REG-103", name: "Reyansh Rao", role: "rider", username: "reyansh.rao", branch: "East Loop", createdAt: "2026-03-21 08:22" },
    { id: "REG-104", name: "Mohit Rana", role: "rider", username: "mohit.rana", branch: "East Loop", createdAt: "2026-03-22 11:48" },
  ],
  advanceRequests: [
    { id: "ADV-201", userId: "EMP-07", user: "Yash Verma", type: "employee", amount: 2500, date: "2026-03-11", note: "Home repair support", status: "approved" },
    { id: "ADV-202", userId: "RID-14", user: "Mohit Rana", type: "rider", amount: 2000, date: "2026-03-12", note: "Bike servicing", status: "approved" },
    { id: "ADV-203", userId: "EMP-03", user: "Kabir Mehta", type: "employee", amount: 4500, date: "2026-03-18", note: "Medical help", status: "pending" },
    { id: "ADV-204", userId: "RID-09", user: "Reyansh Rao", type: "rider", amount: 3000, date: "2026-03-19", note: "Fuel support", status: "pending" },
    { id: "ADV-205", userId: "EMP-01", user: "Aarav Singh", type: "employee", amount: 1800, date: "2026-03-08", note: "Emergency travel", status: "approved" },
  ],
  payments: [
    { id: "PAY-301", userId: "EMP-02", user: "Riya Kapoor", type: "employee", amount: 32000, month: CURRENT_MONTH, status: "paid", date: "2026-03-21" },
    { id: "PAY-302", userId: "EMP-04", user: "Sana Ali", type: "employee", amount: 29500, month: CURRENT_MONTH, status: "paid", date: "2026-03-21" },
    { id: "PAY-303", userId: "RID-10", user: "Imran Khan", type: "rider", amount: 24000, month: CURRENT_MONTH, status: "paid", date: "2026-03-21" },
    { id: "PAY-304", userId: "RID-14", user: "Mohit Rana", type: "rider", amount: 20100, month: CURRENT_MONTH, status: "paid", date: "2026-03-22" },
  ],
  attendanceLogs: [
    { id: "ATT-101", userId: "EMP-01", user: "Aarav Singh", type: "employee", date: TODAY, status: "present", checkIn: "08:51", checkOut: "18:02" },
    { id: "ATT-102", userId: "EMP-02", user: "Riya Kapoor", type: "employee", date: TODAY, status: "present", checkIn: "09:03", checkOut: "18:14" },
    { id: "ATT-103", userId: "EMP-03", user: "Kabir Mehta", type: "employee", date: TODAY, status: "absent", checkIn: "-", checkOut: "-" },
    { id: "ATT-104", userId: "EMP-07", user: "Yash Verma", type: "employee", date: TODAY, status: "present", checkIn: "09:06", checkOut: "-" },
    { id: "ATT-105", userId: "RID-09", user: "Reyansh Rao", type: "rider", date: TODAY, status: "present", checkIn: "08:02", checkOut: "-" },
    { id: "ATT-106", userId: "RID-10", user: "Imran Khan", type: "rider", date: TODAY, status: "present", checkIn: "08:17", checkOut: "17:40" },
    { id: "ATT-107", userId: "RID-11", user: "Deepak Saini", type: "rider", date: TODAY, status: "absent", checkIn: "-", checkOut: "-" },
    { id: "ATT-108", userId: "RID-14", user: "Mohit Rana", type: "rider", date: TODAY, status: "present", checkIn: "08:14", checkOut: "-" },
    { id: "ATT-109", userId: "EMP-07", user: "Yash Verma", type: "employee", date: "2026-03-22", status: "present", checkIn: "09:01", checkOut: "18:01" },
    { id: "ATT-110", userId: "EMP-07", user: "Yash Verma", type: "employee", date: "2026-03-21", status: "present", checkIn: "09:09", checkOut: "18:19" },
    { id: "ATT-111", userId: "EMP-07", user: "Yash Verma", type: "employee", date: "2026-03-20", status: "absent", checkIn: "-", checkOut: "-" },
    { id: "ATT-112", userId: "RID-14", user: "Mohit Rana", type: "rider", date: "2026-03-22", status: "present", checkIn: "08:04", checkOut: "17:42" },
    { id: "ATT-113", userId: "RID-14", user: "Mohit Rana", type: "rider", date: "2026-03-21", status: "present", checkIn: "08:11", checkOut: "17:58" },
    { id: "ATT-114", userId: "RID-14", user: "Mohit Rana", type: "rider", date: "2026-03-20", status: "present", checkIn: "08:09", checkOut: "18:04" },
  ],
  reports: [
    { id: "REP-401", title: "Daily Attendance Pack", channel: "Excel + Email", status: "ready", owner: "Ops Bot", updatedAt: "06:40" },
    { id: "REP-402", title: "Salary Closure Sheet", channel: "Payroll PDF", status: "queued", owner: "Finance Desk", updatedAt: "10:15" },
    { id: "REP-403", title: "Advance Payment Register", channel: "Admin Panel", status: "ready", owner: "Accounts", updatedAt: "09:12" },
    { id: "REP-404", title: "Rider Route Summary", channel: "WhatsApp + Email", status: "ready", owner: "Dispatch", updatedAt: "08:55" },
  ],
  feed: [
    { title: "Payroll review window opened", body: "March salary review is now ready for admin approval.", time: "09:20" },
    { title: "Yash Verma checked in", body: "Employee attendance updated from dashboard workspace.", time: "09:06" },
    { title: "Mohit Rana route synced", body: "Rider console pushed the latest delivery movement.", time: "08:26" },
    { title: "Report pack prepared", body: "Daily attendance and route summary are ready for export.", time: "06:40" },
  ],
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatCurrency(value) {
  return `Rs. ${Number(value).toLocaleString("en-IN")}`;
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function timeLabel() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusClass(status) {
  const normalized = String(status).toLowerCase();
  if (["approved", "paid", "ready", "active", "present", "on route"].includes(normalized)) {
    return "success";
  }
  if (["pending", "queued", "leave", "maintenance"].includes(normalized)) {
    return "warning";
  }
  if (["rejected", "absent"].includes(normalized)) {
    return "danger";
  }
  return "neutral";
}

function statusPill(status) {
  return `<span class="status-pill ${getStatusClass(status)}">${escapeHtml(status)}</span>`;
}

function metricCard(item) {
  const valueMarkup =
    item.display !== undefined
      ? escapeHtml(item.display)
      : `<span data-target="${item.target}" data-prefix="${item.prefix || ""}" data-suffix="${item.suffix || ""}">0</span>`;

  return `
    <article class="metric-card">
      <span>${escapeHtml(item.label)}</span>
      <strong>${valueMarkup}</strong>
      <p>${escapeHtml(item.note)}</p>
    </article>
  `;
}

function softCard(label, value, note) {
  return `
    <article class="soft-card">
      <p>${escapeHtml(label)}</p>
      <strong>${escapeHtml(value)}</strong>
      <div class="field-note">${escapeHtml(note)}</div>
    </article>
  `;
}

function barCard(label, value, note) {
  return `
    <article class="bar-card">
      <div class="bar-top">
        <span class="bar-label">${escapeHtml(label)}</span>
        <strong>${value}%</strong>
      </div>
      <div class="bar-track"><span class="bar-fill" style="width:${value}%"></span></div>
      <div class="field-note">${escapeHtml(note)}</div>
    </article>
  `;
}

function getUserByRoleAndId(role, id) {
  const source = role === "employee" ? state.employees : state.riders;
  return source.find((item) => item.id === id);
}

function getCurrentUser(role) {
  return getUserByRoleAndId(role, state.currentUsers[role]);
}

function getApprovedAdvanceTotal(userId) {
  return state.advanceRequests
    .filter((item) => item.userId === userId && item.status === "approved")
    .reduce((sum, item) => sum + item.amount, 0);
}

function buildPayrollRows() {
  const people = [
    ...state.employees.map((item) => ({ ...item, type: "employee" })),
    ...state.riders.map((item) => ({ ...item, type: "rider" })),
  ];

  return people.map((person) => {
    const advance = getApprovedAdvanceTotal(person.id);
    return {
      userId: person.id,
      name: person.name,
      username: person.username,
      type: person.type,
      roleLabel: person.type === "employee" ? person.branch : person.zone,
      monthlySalary: person.salary,
      advanceDeduction: advance,
      finalSalary: Math.max(person.salary - advance, 0),
      paymentStatus: person.paymentStatus,
    };
  });
}

function getTodayAttendance(type) {
  return state.attendanceLogs.filter((item) => item.type === type && item.date === TODAY);
}

function getSelfAttendance(role) {
  return state.attendanceLogs
    .filter((item) => item.type === role && item.userId === state.currentUsers[role])
    .sort((left, right) => right.date.localeCompare(left.date));
}

function getSelfSummary(role) {
  const records = getSelfAttendance(role);
  return {
    presentDays: records.filter((item) => item.status === "present").length + (role === "employee" ? 19 : 21),
    absentDays: records.filter((item) => item.status === "absent").length,
    today: records.find((item) => item.date === TODAY),
  };
}

function getNavItems(role) {
  const tags = {
    overview: "Now",
    users: "Access",
    employees: String(state.employees.length),
    riders: String(state.riders.length),
    attendance: String(getTodayAttendance(role === "admin" ? "employee" : role).length || "Today"),
    salary: CURRENT_MONTH.slice(5),
    advances: String(state.advanceRequests.filter((item) => item.status === "pending").length),
    payments: String(state.payments.length),
    reports: String(state.reports.filter((item) => item.status === "ready").length),
  };

  return navConfig[role].map((item) => ({ ...item, tag: tags[item.id] || "Live" }));
}

function pushActivity(title, body) {
  state.feed.unshift({ title, body, time: timeLabel() });
  state.feed = state.feed.slice(0, 8);
}

function showToast(title, body) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<strong>${escapeHtml(title)}</strong><p>${escapeHtml(body)}</p>`;
  refs.toastStack.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3200);
}

function animateCounters(scope) {
  scope.querySelectorAll("[data-target]").forEach((node) => {
    const target = Number(node.dataset.target);
    const prefix = node.dataset.prefix || "";
    const suffix = node.dataset.suffix || "";
    const duration = 900;
    const startTime = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  });
}

function renderSummaryCards() {
  let cards = [];
  if (state.role === "admin") {
    const payrollRows = buildPayrollRows();
    cards = [
      { label: "Employees", target: state.employees.length, note: "Live managed roster" },
      { label: "Riders", target: state.riders.length, note: "Delivery-linked team" },
      { label: "Pending Salaries", target: payrollRows.filter((item) => item.paymentStatus === "pending").length, note: "Awaiting payout action" },
      { label: "Pending Advances", target: state.advanceRequests.filter((item) => item.status === "pending").length, note: "Requires admin review" },
    ];
  } else {
    const user = getCurrentUser(state.role);
    const summary = getSelfSummary(state.role);
    const advance = getApprovedAdvanceTotal(user.id);
    cards = [
      { label: "Present Days", target: summary.presentDays, note: `Tracked for ${CURRENT_MONTH}` },
      { label: "Absent Days", target: summary.absentDays, note: "Auto synced from logs" },
      { label: "Approved Advance", target: advance, prefix: "Rs. ", note: "Deducted from monthly salary" },
      { label: "Payment Status", display: user.paymentStatus.toUpperCase(), note: "Latest salary record" },
    ];
  }

  refs.summaryGrid.innerHTML = cards.map(metricCard).join("");
  animateCounters(refs.summaryGrid);
}

function renderNav() {
  refs.moduleNav.innerHTML = getNavItems(state.role)
    .map(
      (item) => `
        <button class="nav-button ${state.section === item.id ? "is-active" : ""}" type="button" data-section="${item.id}">
          <span>${escapeHtml(item.label)}</span>
          <span>${escapeHtml(item.tag)}</span>
        </button>
      `
    )
    .join("");
}

function renderRoleButtons() {
  refs.roleSwitcher.querySelectorAll("[data-role]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.role === state.role);
  });
}

function renderHero() {
  const meta = roleMeta[state.role];
  refs.heroEyebrow.textContent = meta.eyebrow;
  refs.heroTitle.textContent = meta.title;
  refs.heroDescription.textContent = meta.description;
}

function renderActivity() {
  refs.activityFeed.innerHTML = state.feed
    .slice(0, 6)
    .map(
      (item) => `
        <article class="feed-item">
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.body)}</p>
          <span>${escapeHtml(item.time)}</span>
        </article>
      `
    )
    .join("");
}

function renderTable(headers, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>${headers.map((item) => `<th>${escapeHtml(item)}</th>`).join("")}</tr>
        </thead>
        <tbody>${rows.join("")}</tbody>
      </table>
    </div>
  `;
}

function renderOverviewSection() {
  if (state.role === "admin") {
    const todayEmployees = getTodayAttendance("employee");
    const todayRiders = getTodayAttendance("rider");
    const openCheckouts = [...todayEmployees, ...todayRiders].filter(
      (item) => item.status === "present" && item.checkIn !== "-" && item.checkOut === "-"
    ).length;
    const payrollRows = buildPayrollRows();

    return {
      primaryKicker: "Overview",
      primaryTitle: "Operations intensity",
      primary: `
        <div class="mini-metric-grid">
          ${softCard("Open Check-outs", String(openCheckouts), "Present users still active in the field or office.")}
          ${softCard("Payroll Due", formatCurrency(payrollRows.filter((item) => item.paymentStatus === "pending").reduce((sum, item) => sum + item.finalSalary, 0)), "Net payable amount across pending salaries.")}
          ${softCard("Report Readiness", `${state.reports.filter((item) => item.status === "ready").length}/${state.reports.length}`, "Exports ready to push to Excel, email, or WhatsApp.")}
          ${softCard("Approval Queue", String(state.advanceRequests.filter((item) => item.status === "pending").length), "Advance requests waiting for a decision.")}
        </div>
        <div class="chart-strip">
          <span class="section-title">Performance rails</span>
          <div class="chart-row">
            ${barCard("Employee attendance health", 94, "Attendance quality across employee records this month.")}
            ${barCard("Rider route completion", 88, "Dispatch confidence from live route activity.")}
            ${barCard("Report delivery readiness", 82, "Report packs prepared for admin and field teams.")}
          </div>
        </div>
      `,
      secondaryKicker: "Watchlist",
      secondaryTitle: "Immediate actions",
      secondary: `
        <div class="log-list">
          <div class="log-item">
            <div>
              <strong>Advance approvals pending</strong>
              <span>${state.advanceRequests.filter((item) => item.status === "pending").length} requests still need review.</span>
            </div>
            ${statusPill("pending")}
          </div>
          <div class="log-item">
            <div>
              <strong>Payroll closure</strong>
              <span>${payrollRows.filter((item) => item.paymentStatus === "pending").length} salary rows are not marked paid yet.</span>
            </div>
            <button class="pill-action is-primary" type="button" data-global-action="run-payroll">Review</button>
          </div>
          <div class="log-item">
            <div>
              <strong>Daily report packet</strong>
              <span>Send attendance, KM, and route summaries through the report module.</span>
            </div>
            <button class="pill-action" type="button" data-global-action="open-report">Open</button>
          </div>
        </div>
      `,
      detailKicker: "Operations Grid",
      detailTitle: "Recent live rows",
      detail: renderTable(
        ["Name", "Role", "Current Status", "Shift or Zone", "Payment", "Action"],
        buildPayrollRows()
          .slice(0, 8)
          .map(
            (item) => `
              <tr>
                <td><strong>${escapeHtml(item.name)}</strong><div class="field-note">${escapeHtml(item.username)}</div></td>
                <td>${escapeHtml(item.type)}</td>
                <td>${statusPill(item.paymentStatus === "paid" ? "active" : "pending")}</td>
                <td>${escapeHtml(item.roleLabel)}</td>
                <td>${formatCurrency(item.finalSalary)}</td>
                <td><button class="table-action" type="button" data-action="view-profile" data-id="${item.userId}" data-type="${item.type}">View</button></td>
              </tr>
            `
          )
      ),
    };
  }

  const user = getCurrentUser(state.role);
  const summary = getSelfSummary(state.role);
  const approvedAdvance = getApprovedAdvanceTotal(user.id);
  const payroll = buildPayrollRows().find((item) => item.userId === user.id);
  const selfHistory = getSelfAttendance(state.role).slice(0, 5);

  return {
    primaryKicker: "Overview",
    primaryTitle: "Personal pulse",
    primary: `
      <div class="mini-metric-grid">
        ${softCard("Today's Status", summary.today ? summary.today.status.toUpperCase() : "NOT MARKED", "Your latest attendance state for today.")}
        ${softCard("Shift or Zone", state.role === "employee" ? user.shift : user.zone, "Primary assignment in the current system.")}
        ${softCard("Final Salary", formatCurrency(payroll.finalSalary), "After approved advances are deducted.")}
        ${softCard("Advance Deduction", formatCurrency(approvedAdvance), "Approved requests currently linked to your payroll.")}
      </div>
      <div class="chart-strip">
        <span class="section-title">This month's rhythm</span>
        <div class="chart-row">
          ${barCard("Attendance consistency", user.attendanceRate, "Personal attendance score from recent logs.")}
          ${barCard("Payment confidence", user.paymentStatus === "paid" ? 100 : 68, "Salary cycle readiness based on the latest status.")}
          ${barCard("Report access readiness", 90, "Daily and monthly report lane availability.")}
        </div>
      </div>
    `,
    secondaryKicker: "Quick Actions",
    secondaryTitle: "Next steps",
    secondary: `
      <div class="log-list">
        <div class="log-item">
          <div>
            <strong>Attendance workflow</strong>
            <span>Check in, check out, or mark absent from the attendance module.</span>
          </div>
          <button class="pill-action is-primary" type="button" data-section-jump="attendance">Open</button>
        </div>
        <div class="log-item">
          <div>
            <strong>Advance tracking</strong>
            <span>Request support or review your recent advance status.</span>
          </div>
          <button class="pill-action" type="button" data-section-jump="advances">Review</button>
        </div>
        <div class="log-item">
          <div>
            <strong>Salary statement</strong>
            <span>Open the payment module to review latest payout history.</span>
          </div>
          <button class="pill-action" type="button" data-section-jump="payments">Open</button>
        </div>
      </div>
    `,
    detailKicker: "Recent Records",
    detailTitle: "Your latest attendance log",
    detail: renderTable(
      ["Date", "Status", "Check In", "Check Out"],
      selfHistory.length
        ? selfHistory.map(
            (item) => `
              <tr>
                <td>${formatDate(item.date)}</td>
                <td>${statusPill(item.status)}</td>
                <td>${escapeHtml(item.checkIn)}</td>
                <td>${escapeHtml(item.checkOut)}</td>
              </tr>
            `
          )
        : [`<tr><td colspan="4" class="empty-state">No attendance records available yet.</td></tr>`]
    ),
  };
}

function renderUsersSection() {
  return {
    primaryKicker: "User Registration",
    primaryTitle: "Create cleaner onboarding records",
    primary: `
      <div class="form-card">
        <h4>Add a new demo user</h4>
        <p class="field-note">This will append a record to the roster and registration log inside the current static system.</p>
        <form id="registrationForm" class="form-grid">
          <label>
            Full Name
            <input class="field-input" type="text" name="fullName" placeholder="Enter full name" required />
          </label>
          <label>
            Role
            <select class="field-select" name="role">
              <option value="employee">Employee</option>
              <option value="rider">Rider</option>
            </select>
          </label>
          <label>
            Branch or Zone
            <input class="field-input" type="text" name="branch" placeholder="Noida Hub or East Loop" required />
          </label>
          <label>
            Salary
            <input class="field-input" type="number" name="salary" min="10000" step="100" value="24000" required />
          </label>
          <label class="full-width">
            Email
            <input class="field-input" type="email" name="email" placeholder="name@vedwork.local" required />
          </label>
          <button class="form-submit" type="submit">Create Demo User</button>
        </form>
      </div>
    `,
    secondaryKicker: "Access Notes",
    secondaryTitle: "Onboarding system rules",
    secondary: `
      <div class="soft-grid">
        ${softCard("Default Username", "auto from full name", "Spaces become dots and everything converts to lowercase.")}
        ${softCard("Default Password", "admin123", "Matches the older seed account pattern from the reference project.")}
        ${softCard("Role Sync", "auto roster add", "Employees and riders also appear in their matching modules.")}
        ${softCard("Report Visibility", "instant", "New users appear in future exports and logs instantly.")}
      </div>
    `,
    detailKicker: "Recent Users",
    detailTitle: "Registration log",
    detail: renderTable(
      ["Name", "Role", "Username", "Branch or Zone", "Created"],
      state.registrations
        .slice()
        .reverse()
        .map(
          (item) => `
            <tr>
              <td>${escapeHtml(item.name)}</td>
              <td>${statusPill(item.role)}</td>
              <td>${escapeHtml(item.username)}</td>
              <td>${escapeHtml(item.branch)}</td>
              <td>${escapeHtml(item.createdAt)}</td>
            </tr>
          `
        )
    ),
  };
}

function renderEmployeesSection() {
  const avgAttendance = Math.round(
    state.employees.reduce((sum, item) => sum + item.attendanceRate, 0) / state.employees.length
  );

  return {
    primaryKicker: "Employees",
    primaryTitle: "Roster quality and workforce health",
    primary: `
      <div class="mini-metric-grid">
        ${softCard("Total Employees", String(state.employees.length), "Actively tracked in this system build.")}
        ${softCard("Average Attendance", `${avgAttendance}%`, "Overall employee attendance performance.")}
        ${softCard("Monthly Cost", formatCurrency(state.employees.reduce((sum, item) => sum + item.salary, 0)), "Base salary exposure before deductions.")}
        ${softCard("On Shift", String(state.employees.filter((item) => item.status === "active").length), "Currently active employee records.")}
      </div>
      <div class="chart-strip">
        <span class="section-title">Employee attendance lanes</span>
        <div class="chart-row">
          ${state.employees.map((item) => barCard(item.name, item.attendanceRate, `${item.branch} | ${item.shift}`)).join("")}
        </div>
      </div>
    `,
    secondaryKicker: "Top Focus",
    secondaryTitle: "Shift and branch watch",
    secondary: `
      <div class="stack-list">
        ${state.employees
          .slice(0, 4)
          .map(
            (item) => `
              <div class="stack-item">
                <div>
                  <strong>${escapeHtml(item.name)}</strong>
                  <div class="field-note">${escapeHtml(item.branch)} | ${escapeHtml(item.shift)}</div>
                </div>
                ${statusPill(item.status)}
              </div>
            `
          )
          .join("")}
      </div>
    `,
    detailKicker: "Roster Table",
    detailTitle: "Employee records",
    detail: renderTable(
      ["Name", "ID", "Branch", "Shift", "Attendance", "Salary", "Status"],
      state.employees.map(
        (item) => `
          <tr>
            <td><strong>${escapeHtml(item.name)}</strong><div class="field-note">${escapeHtml(item.username)}</div></td>
            <td>${escapeHtml(item.id)}</td>
            <td>${escapeHtml(item.branch)}</td>
            <td>${escapeHtml(item.shift)}</td>
            <td>${item.attendanceRate}%</td>
            <td>${formatCurrency(item.salary)}</td>
            <td>${statusPill(item.status)}</td>
          </tr>
        `
      )
    ),
  };
}

function renderRidersSection() {
  const totalDeliveries = state.riders.reduce((sum, item) => sum + item.deliveries, 0);

  return {
    primaryKicker: "Riders",
    primaryTitle: "Route coverage and field movement",
    primary: `
      <div class="mini-metric-grid">
        ${softCard("Total Riders", String(state.riders.length), "Live route-linked rider records.")}
        ${softCard("Deliveries Today", String(totalDeliveries), "Combined active delivery volume.")}
        ${softCard("On Route", String(state.riders.filter((item) => item.status === "on route").length), "Riders currently in active dispatch.")}
        ${softCard("Avg Attendance", `${Math.round(state.riders.reduce((sum, item) => sum + item.attendanceRate, 0) / state.riders.length)}%`, "Rider attendance quality this month.")}
      </div>
      <div class="chart-strip">
        <span class="section-title">Dispatch intensity</span>
        <div class="chart-row">
          ${state.riders.map((item) => barCard(item.name, Math.min(item.deliveries * 2, 100), `${item.zone} | ${item.bike}`)).join("")}
        </div>
      </div>
    `,
    secondaryKicker: "Dispatch Queue",
    secondaryTitle: "Field snapshots",
    secondary: `
      <div class="stack-list">
        ${state.riders
          .slice(0, 4)
          .map(
            (item) => `
              <div class="stack-item">
                <div>
                  <strong>${escapeHtml(item.name)}</strong>
                  <div class="field-note">${escapeHtml(item.zone)} | ${escapeHtml(item.bike)}</div>
                </div>
                ${statusPill(item.status)}
              </div>
            `
          )
          .join("")}
      </div>
    `,
    detailKicker: "Rider Table",
    detailTitle: "Route and payout records",
    detail: renderTable(
      ["Name", "ID", "Zone", "Bike", "Deliveries", "Salary", "Status"],
      state.riders.map(
        (item) => `
          <tr>
            <td><strong>${escapeHtml(item.name)}</strong><div class="field-note">${escapeHtml(item.username)}</div></td>
            <td>${escapeHtml(item.id)}</td>
            <td>${escapeHtml(item.zone)}</td>
            <td>${escapeHtml(item.bike)}</td>
            <td>${item.deliveries}</td>
            <td>${formatCurrency(item.salary)}</td>
            <td>${statusPill(item.status)}</td>
          </tr>
        `
      )
    ),
  };
}

function renderAttendanceSection() {
  if (state.role === "admin") {
    const combined = [...getTodayAttendance("employee"), ...getTodayAttendance("rider")];
    const presentCount = combined.filter((item) => item.status === "present").length;
    const absentCount = combined.filter((item) => item.status === "absent").length;
    const openCheckouts = combined.filter((item) => item.status === "present" && item.checkOut === "-").length;

    return {
      primaryKicker: "Attendance",
      primaryTitle: "Daily team attendance",
      primary: `
        <div class="mini-metric-grid">
          ${softCard("Present Today", String(presentCount), "Across employees and riders.")}
          ${softCard("Absent Today", String(absentCount), "Needs follow-up where required.")}
          ${softCard("Open Check-outs", String(openCheckouts), "Users who have not completed the day yet.")}
          ${softCard("Check-in Window", "08:00 - 09:30", "Current attendance window used in the demo flow.")}
        </div>
      `,
      secondaryKicker: "Actions",
      secondaryTitle: "Attendance controls",
      secondary: `
        <div class="log-list">
          <div class="log-item">
            <div>
              <strong>Reminder broadcast</strong>
              <span>Push a quick nudge to users with open attendance sessions.</span>
            </div>
            <button class="pill-action is-primary" type="button" data-action="send-reminder">Send</button>
          </div>
          <div class="log-item">
            <div>
              <strong>Summary export</strong>
              <span>Daily sheet ready for Excel and email reporting.</span>
            </div>
            <button class="pill-action" type="button" data-global-action="send-summary">Export</button>
          </div>
        </div>
      `,
      detailKicker: "Attendance Table",
      detailTitle: "Today only",
      detail: renderTable(
        ["Name", "Role", "Status", "Check In", "Check Out", "Action"],
        combined.map(
          (item) => `
            <tr>
              <td>${escapeHtml(item.user)}</td>
              <td>${escapeHtml(item.type)}</td>
              <td>${statusPill(item.status)}</td>
              <td>${escapeHtml(item.checkIn)}</td>
              <td>${escapeHtml(item.checkOut)}</td>
              <td><button class="table-action" type="button" data-action="view-profile" data-id="${item.userId}" data-type="${item.type}">Open</button></td>
            </tr>
          `
        )
      ),
    };
  }

  const summary = getSelfSummary(state.role);
  const today = summary.today;

  return {
    primaryKicker: "Attendance",
    primaryTitle: "Personal attendance controls",
    primary: `
      <div class="mini-metric-grid">
        ${softCard("Today's Status", today ? today.status.toUpperCase() : "NOT MARKED", "Live attendance status for today.")}
        ${softCard("Check In", today ? today.checkIn : "-", "Current first punch entry.")}
        ${softCard("Check Out", today ? today.checkOut : "-", "Current final punch entry.")}
        ${softCard("Monthly Split", `${summary.presentDays}P / ${summary.absentDays}A`, "Present and absent split for the selected month.")}
      </div>
      <div class="hero-action-row">
        <button class="hero-action" type="button" data-action="check-in">Check In</button>
        <button class="hero-action hero-action-secondary" type="button" data-action="check-out">Check Out</button>
        <button class="hero-action hero-action-secondary" type="button" data-action="mark-absent">Mark Absent</button>
      </div>
    `,
    secondaryKicker: "Daily Rules",
    secondaryTitle: "How the current flow behaves",
    secondary: `
      <div class="soft-grid">
        ${softCard("Check In", "once per day", "A new present record is created if one does not already exist.")}
        ${softCard("Check Out", "same record update", "Only available after a valid check-in exists.")}
        ${softCard("Mark Absent", "locks day", "Creates an absent record if no attendance entry exists.")}
        ${softCard("Sync", "instant", "Changes also push a new item into the activity feed.")}
      </div>
    `,
    detailKicker: "Attendance History",
    detailTitle: "Recent personal records",
    detail: renderTable(
      ["Date", "Status", "Check In", "Check Out"],
      getSelfAttendance(state.role).map(
        (item) => `
          <tr>
            <td>${formatDate(item.date)}</td>
            <td>${statusPill(item.status)}</td>
            <td>${escapeHtml(item.checkIn)}</td>
            <td>${escapeHtml(item.checkOut)}</td>
          </tr>
        `
      )
    ),
  };
}

function renderSalarySection() {
  const payrollRows = buildPayrollRows();
  if (state.role === "admin") {
    const pendingRows = payrollRows.filter((item) => item.paymentStatus === "pending");

    return {
      primaryKicker: "Salary",
      primaryTitle: "Payroll overview",
      primary: `
        <div class="mini-metric-grid">
          ${softCard("Monthly Salary Base", formatCurrency(payrollRows.reduce((sum, item) => sum + item.monthlySalary, 0)), "Combined before deductions.")}
          ${softCard("Approved Advances", formatCurrency(payrollRows.reduce((sum, item) => sum + item.advanceDeduction, 0)), "Already linked into payroll.")}
          ${softCard("Final Payable", formatCurrency(payrollRows.reduce((sum, item) => sum + item.finalSalary, 0)), "Net payroll after deductions.")}
          ${softCard("Pending Payouts", String(pendingRows.length), "Rows still waiting to be marked paid.")}
        </div>
      `,
      secondaryKicker: "Batch Actions",
      secondaryTitle: "Ready to close",
      secondary: `
        <div class="log-list">
          ${pendingRows
            .slice(0, 4)
            .map(
              (item) => `
                <div class="log-item">
                  <div>
                    <strong>${escapeHtml(item.name)}</strong>
                    <span>${escapeHtml(item.type)} | ${formatCurrency(item.finalSalary)}</span>
                  </div>
                  <button class="pill-action is-primary" type="button" data-action="mark-paid" data-id="${item.userId}" data-type="${item.type}">Mark Paid</button>
                </div>
              `
            )
            .join("") || `<div class="empty-state">All visible payroll rows are already marked paid.</div>`}
        </div>
      `,
      detailKicker: "Payroll Table",
      detailTitle: "March payout sheet",
      detail: renderTable(
        ["Name", "Role", "Monthly", "Advance", "Final", "Status", "Action"],
        payrollRows.map(
          (item) => `
            <tr>
              <td><strong>${escapeHtml(item.name)}</strong><div class="field-note">${escapeHtml(item.username)}</div></td>
              <td>${escapeHtml(item.type)}</td>
              <td>${formatCurrency(item.monthlySalary)}</td>
              <td>${formatCurrency(item.advanceDeduction)}</td>
              <td>${formatCurrency(item.finalSalary)}</td>
              <td>${statusPill(item.paymentStatus)}</td>
              <td>${
                item.paymentStatus === "pending"
                  ? `<button class="table-action is-primary" type="button" data-action="mark-paid" data-id="${item.userId}" data-type="${item.type}">Pay</button>`
                  : `<button class="table-action" type="button" data-action="view-profile" data-id="${item.userId}" data-type="${item.type}">View</button>`
              }</td>
            </tr>
          `
        )
      ),
    };
  }

  const user = getCurrentUser(state.role);
  const payroll = payrollRows.find((item) => item.userId === user.id);
  const latestPayment = state.payments.find((item) => item.userId === user.id);

  return {
    primaryKicker: "Salary",
    primaryTitle: "Personal salary breakdown",
    primary: `
      <div class="mini-metric-grid">
        ${softCard("Monthly Salary", formatCurrency(payroll.monthlySalary), "Base salary before any deductions.")}
        ${softCard("Advance Deduction", formatCurrency(payroll.advanceDeduction), "Approved advances linked to this month.")}
        ${softCard("Final Payable", formatCurrency(payroll.finalSalary), "Net amount after deductions.")}
        ${softCard("Status", user.paymentStatus.toUpperCase(), "Latest payout status for the selected month.")}
      </div>
    `,
    secondaryKicker: "Latest Payment",
    secondaryTitle: "Statement quick look",
    secondary: `
      <div class="log-list">
        <div class="log-item">
          <div>
            <strong>Last payment date</strong>
            <span>${latestPayment ? formatDate(latestPayment.date) : "Pending"}</span>
          </div>
          ${statusPill(latestPayment ? latestPayment.status : user.paymentStatus)}
        </div>
        <div class="log-item">
          <div>
            <strong>Slip export</strong>
            <span>Generate a clean payout summary for local review.</span>
          </div>
          <button class="pill-action" type="button" data-action="download-slip">Download</button>
        </div>
      </div>
    `,
    detailKicker: "Statement Lines",
    detailTitle: "Current month summary",
    detail: renderTable(
      ["Item", "Value"],
      [
        `<tr><td>Role</td><td>${escapeHtml(state.role)}</td></tr>`,
        `<tr><td>Monthly Salary</td><td>${formatCurrency(payroll.monthlySalary)}</td></tr>`,
        `<tr><td>Approved Advances</td><td>${formatCurrency(payroll.advanceDeduction)}</td></tr>`,
        `<tr><td>Final Salary</td><td>${formatCurrency(payroll.finalSalary)}</td></tr>`,
        `<tr><td>Payment Status</td><td>${statusPill(user.paymentStatus)}</td></tr>`,
      ]
    ),
  };
}

function renderAdvancesSection() {
  if (state.role === "admin") {
    const pending = state.advanceRequests.filter((item) => item.status === "pending");
    return {
      primaryKicker: "Advance Payments",
      primaryTitle: "Approval flow",
      primary: `
        <div class="stack-list">
          ${
            pending.length
              ? pending
                  .map(
                    (item) => `
                      <div class="stack-item">
                        <div>
                          <strong>${escapeHtml(item.user)}</strong>
                          <div class="field-note">${escapeHtml(item.type)} | ${formatCurrency(item.amount)} | ${formatDate(item.date)}</div>
                          <div class="field-note">${escapeHtml(item.note)}</div>
                        </div>
                        <div class="pill-row">
                          <button class="pill-action is-primary" type="button" data-action="approve-advance" data-id="${item.id}">Approve</button>
                          <button class="pill-action" type="button" data-action="reject-advance" data-id="${item.id}">Reject</button>
                        </div>
                      </div>
                    `
                  )
                  .join("")
              : `<div class="empty-state">No pending advances right now.</div>`
          }
        </div>
      `,
      secondaryKicker: "Advance Metrics",
      secondaryTitle: "Monthly snapshot",
      secondary: `
        <div class="soft-grid">
          ${softCard("Approved Total", formatCurrency(state.advanceRequests.filter((item) => item.status === "approved").reduce((sum, item) => sum + item.amount, 0)), "Amount already deducted into payroll.")}
          ${softCard("Pending Total", formatCurrency(pending.reduce((sum, item) => sum + item.amount, 0)), "Awaiting admin action.")}
          ${softCard("Employee Requests", String(state.advanceRequests.filter((item) => item.type === "employee").length), "Across all employee records.")}
          ${softCard("Rider Requests", String(state.advanceRequests.filter((item) => item.type === "rider").length), "Across all rider records.")}
        </div>
      `,
      detailKicker: "Advance Table",
      detailTitle: "All requests",
      detail: renderTable(
        ["User", "Type", "Amount", "Date", "Status", "Note"],
        state.advanceRequests.map(
          (item) => `
            <tr>
              <td>${escapeHtml(item.user)}</td>
              <td>${escapeHtml(item.type)}</td>
              <td>${formatCurrency(item.amount)}</td>
              <td>${formatDate(item.date)}</td>
              <td>${statusPill(item.status)}</td>
              <td>${escapeHtml(item.note)}</td>
            </tr>
          `
        )
      ),
    };
  }

  const user = getCurrentUser(state.role);
  const ownRequests = state.advanceRequests.filter((item) => item.userId === user.id);

  return {
    primaryKicker: "Advance Payments",
    primaryTitle: "Request a new advance",
    primary: `
      <div class="form-card">
        <h4>Create a demo advance request</h4>
        <p class="field-note">The request will appear instantly in your history and the admin approval queue.</p>
        <form id="advanceRequestForm" class="form-grid">
          <label>
            Amount
            <input class="field-input" type="number" name="amount" min="500" step="100" value="1500" required />
          </label>
          <label>
            Reason
            <input class="field-input" type="text" name="note" placeholder="Fuel, travel, support" required />
          </label>
          <button class="form-submit" type="submit">Submit Request</button>
        </form>
      </div>
    `,
    secondaryKicker: "Current State",
    secondaryTitle: "Advance lane notes",
    secondary: `
      <div class="soft-grid">
        ${softCard("Approved Total", formatCurrency(getApprovedAdvanceTotal(user.id)), "Already included in your monthly deduction.")}
        ${softCard("Pending Requests", String(ownRequests.filter((item) => item.status === "pending").length), "Still waiting for admin review.")}
        ${softCard("Latest Request", ownRequests.length ? formatDate(ownRequests[0].date) : "No request", "Most recent request timestamp.")}
        ${softCard("Tip", "use clear notes", "Short reason notes help the approval flow move faster.")}
      </div>
    `,
    detailKicker: "Advance History",
    detailTitle: "Your request log",
    detail: renderTable(
      ["Date", "Amount", "Status", "Note"],
      ownRequests.length
        ? ownRequests.map(
            (item) => `
              <tr>
                <td>${formatDate(item.date)}</td>
                <td>${formatCurrency(item.amount)}</td>
                <td>${statusPill(item.status)}</td>
                <td>${escapeHtml(item.note)}</td>
              </tr>
            `
          )
        : [`<tr><td colspan="4" class="empty-state">No advance requests created yet.</td></tr>`]
    ),
  };
}

function renderPaymentsSection() {
  if (state.role === "admin") {
    return {
      primaryKicker: "Payment History",
      primaryTitle: "Recorded salary payouts",
      primary: `
        <div class="mini-metric-grid">
          ${softCard("Paid Records", String(state.payments.length), "Saved payment entries for the current month.")}
          ${softCard("Paid Total", formatCurrency(state.payments.reduce((sum, item) => sum + item.amount, 0)), "Current recorded payout value.")}
          ${softCard("Month", CURRENT_MONTH, "Static system demo period.")}
          ${softCard("Export Lane", "ready", "Statement and payout exports can be triggered from here.")}
        </div>
      `,
      secondaryKicker: "Quick Exports",
      secondaryTitle: "Payment actions",
      secondary: `
        <div class="log-list">
          <div class="log-item">
            <div>
              <strong>Download payout pack</strong>
              <span>Generate a clean payment history summary.</span>
            </div>
            <button class="pill-action is-primary" type="button" data-global-action="export-pack">Export</button>
          </div>
          <div class="log-item">
            <div>
              <strong>Open reports</strong>
              <span>Review report status before pushing final files.</span>
            </div>
            <button class="pill-action" type="button" data-global-action="open-report">Open</button>
          </div>
        </div>
      `,
      detailKicker: "Payment Table",
      detailTitle: "Latest recorded payments",
      detail: renderTable(
        ["User", "Role", "Amount", "Month", "Date", "Status"],
        state.payments.map(
          (item) => `
            <tr>
              <td>${escapeHtml(item.user)}</td>
              <td>${escapeHtml(item.type)}</td>
              <td>${formatCurrency(item.amount)}</td>
              <td>${escapeHtml(item.month)}</td>
              <td>${formatDate(item.date)}</td>
              <td>${statusPill(item.status)}</td>
            </tr>
          `
        )
      ),
    };
  }

  const user = getCurrentUser(state.role);
  const rows = state.payments.filter((item) => item.userId === user.id);
  const latest = rows[0];

  return {
    primaryKicker: "Payment History",
    primaryTitle: "Your payout trail",
    primary: `
      <div class="mini-metric-grid">
        ${softCard("Latest Amount", latest ? formatCurrency(latest.amount) : "Pending", "Most recent recorded payout.")}
        ${softCard("Latest Date", latest ? formatDate(latest.date) : "Pending", "Most recent payout timestamp.")}
        ${softCard("Status", latest ? latest.status.toUpperCase() : user.paymentStatus.toUpperCase(), "Latest visible payment state.")}
        ${softCard("Records", String(rows.length), "Payment rows available in this demo.")}
      </div>
    `,
    secondaryKicker: "Statement Actions",
    secondaryTitle: "Quick tools",
    secondary: `
      <div class="log-list">
        <div class="log-item">
          <div>
            <strong>Download personal slip</strong>
            <span>Export your latest payment summary.</span>
          </div>
          <button class="pill-action is-primary" type="button" data-action="download-slip">Download</button>
        </div>
      </div>
    `,
    detailKicker: "History",
    detailTitle: "Available payment records",
    detail: renderTable(
      ["Month", "Amount", "Date", "Status"],
      rows.length
        ? rows.map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.month)}</td>
                <td>${formatCurrency(item.amount)}</td>
                <td>${formatDate(item.date)}</td>
                <td>${statusPill(item.status)}</td>
              </tr>
            `
          )
        : [`<tr><td colspan="4" class="empty-state">No payment records available yet.</td></tr>`]
    ),
  };
}

function renderReportsSection() {
  return {
    primaryKicker: "Reports",
    primaryTitle: "Export-ready report system",
    primary: `
      <div class="stack-list">
        ${state.reports
          .map(
            (item) => `
              <div class="stack-item">
                <div>
                  <strong>${escapeHtml(item.title)}</strong>
                  <div class="field-note">${escapeHtml(item.channel)} | Updated ${escapeHtml(item.updatedAt)}</div>
                  <div class="field-note">Owner: ${escapeHtml(item.owner)}</div>
                </div>
                <div class="pill-row">
                  ${statusPill(item.status)}
                  <button class="pill-action" type="button" data-action="export-report" data-id="${item.id}">Export</button>
                </div>
              </div>
            `
          )
          .join("")}
      </div>
    `,
    secondaryKicker: "Delivery Channels",
    secondaryTitle: "Where reports can go",
    secondary: `
      <div class="soft-grid">
        ${softCard("Excel Log", "enabled", "Matches the older DTDC style daily sheet idea.")}
        ${softCard("Email Dispatch", "enabled", "Ready for daily attendance and payroll summaries.")}
        ${softCard("WhatsApp Summary", "preview", "Useful for rider route updates and daily highlights.")}
        ${softCard("PDF Pack", "ready", "Monthly payroll or payment history exports.")}
      </div>
    `,
    detailKicker: "Run History",
    detailTitle: "Recent report runs",
    detail: renderTable(
      ["Title", "Channel", "Owner", "Updated", "Status"],
      state.reports.map(
        (item) => `
          <tr>
            <td>${escapeHtml(item.title)}</td>
            <td>${escapeHtml(item.channel)}</td>
            <td>${escapeHtml(item.owner)}</td>
            <td>${escapeHtml(item.updatedAt)}</td>
            <td>${statusPill(item.status)}</td>
          </tr>
        `
      )
    ),
  };
}

function getSectionView() {
  switch (state.section) {
    case "users":
      return renderUsersSection();
    case "employees":
      return renderEmployeesSection();
    case "riders":
      return renderRidersSection();
    case "attendance":
      return renderAttendanceSection();
    case "salary":
      return renderSalarySection();
    case "advances":
      return renderAdvancesSection();
    case "payments":
      return renderPaymentsSection();
    case "reports":
      return renderReportsSection();
    default:
      return renderOverviewSection();
  }
}

function renderSection() {
  const view = getSectionView();
  refs.primaryKicker.textContent = view.primaryKicker;
  refs.primaryTitle.textContent = view.primaryTitle;
  refs.secondaryKicker.textContent = view.secondaryKicker;
  refs.secondaryTitle.textContent = view.secondaryTitle;
  refs.detailKicker.textContent = view.detailKicker;
  refs.detailTitle.textContent = view.detailTitle;
  refs.modulePrimary.innerHTML = view.primary;
  refs.moduleSecondary.innerHTML = view.secondary;
  refs.moduleDetail.innerHTML = view.detail;
}

function render() {
  if (!navConfig[state.role].some((item) => item.id === state.section)) {
    state.section = "overview";
  }

  renderRoleButtons();
  renderHero();
  renderNav();
  renderSummaryCards();
  renderSection();
  renderActivity();
}

function updateClock() {
  refs.clockValue.textContent = timeLabel();
}

function markSalaryPaid(userId, type) {
  const source = type === "employee" ? state.employees : state.riders;
  const record = source.find((item) => item.id === userId);
  if (!record || record.paymentStatus === "paid") {
    showToast("Already completed", "That salary row is already marked paid.");
    return;
  }

  const payroll = buildPayrollRows().find((item) => item.userId === userId);
  record.paymentStatus = "paid";
  state.payments.unshift({
    id: `PAY-${state.sequences.payment++}`,
    userId,
    user: record.name,
    type,
    amount: payroll.finalSalary,
    month: CURRENT_MONTH,
    status: "paid",
    date: TODAY,
  });
  pushActivity("Salary marked paid", `${record.name} was moved into paid status for ${CURRENT_MONTH}.`);
  showToast("Payment saved", `${record.name} is now marked paid.`);
  render();
}

function updateAdvanceStatus(id, nextStatus) {
  const request = state.advanceRequests.find((item) => item.id === id);
  if (!request || request.status !== "pending") {
    showToast("No action taken", "That advance request is already processed.");
    return;
  }

  request.status = nextStatus;
  pushActivity(
    `Advance ${nextStatus}`,
    `${request.user} request for ${formatCurrency(request.amount)} is now ${nextStatus}.`
  );
  showToast("Advance updated", `${request.user} request changed to ${nextStatus}.`);
  render();
}

function handleAttendanceAction(action) {
  const role = state.role;
  const user = getCurrentUser(role);
  const today = getSelfSummary(role).today;
  if (action === "check-in") {
    if (today) {
      showToast("Already marked", "Today's attendance already exists for this user.");
      return;
    }
    state.attendanceLogs.unshift({
      id: `ATT-${Date.now()}`,
      userId: user.id,
      user: user.name,
      type: role,
      date: TODAY,
      status: "present",
      checkIn: timeLabel(),
      checkOut: "-",
    });
    pushActivity("Check-in saved", `${user.name} checked in from the ${role} workspace.`);
    showToast("Check-in saved", "Today's attendance was created successfully.");
  }

  if (action === "check-out") {
    if (!today || today.status !== "present" || today.checkIn === "-") {
      showToast("Unavailable", "Check-out needs a valid present check-in first.");
      return;
    }
    if (today.checkOut !== "-") {
      showToast("Already closed", "Today's attendance already has a check-out time.");
      return;
    }
    today.checkOut = timeLabel();
    pushActivity("Check-out saved", `${user.name} completed today's attendance cycle.`);
    showToast("Check-out saved", "Today's attendance was closed successfully.");
  }

  if (action === "mark-absent") {
    if (today) {
      showToast("Already marked", "Today's attendance already exists for this user.");
      return;
    }
    state.attendanceLogs.unshift({
      id: `ATT-${Date.now()}`,
      userId: user.id,
      user: user.name,
      type: role,
      date: TODAY,
      status: "absent",
      checkIn: "-",
      checkOut: "-",
    });
    pushActivity("Absent marked", `${user.name} was marked absent from the ${role} workspace.`);
    showToast("Absent saved", "Today's attendance was marked absent.");
  }

  render();
}

function handleGlobalAction(action) {
  const messages = {
    "send-summary": ["Summary queued", "Daily summary is ready for email or Excel export."],
    "export-pack": ["Export ready", "The current data pack has been prepared for download."],
    "run-payroll": ["Payroll review opened", "Pending salary rows are ready for batch review."],
    "open-report": ["Reports focused", "Jump into the reports module for exports and schedules."],
    "refresh-view": ["View refreshed", "Dashboard visuals were re-rendered with the latest local state."],
  };

  if (action === "open-report") {
    state.section = "reports";
    render();
  }

  if (action === "refresh-view") {
    render();
  }

  const message = messages[action];
  if (message) {
    pushActivity(message[0], message[1]);
    showToast(message[0], message[1]);
  }
}

function handleRegistrationSubmit(form) {
  const formData = new FormData(form);
  const fullName = String(formData.get("fullName") || "").trim();
  const role = String(formData.get("role") || "employee");
  const branch = String(formData.get("branch") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const salary = Number(formData.get("salary") || 0);
  const username = fullName.toLowerCase().replace(/\s+/g, ".");

  if (!fullName || !branch || !email || salary <= 0) {
    showToast("Missing details", "Please fill out all registration fields.");
    return;
  }

  if (role === "employee") {
    const id = `EMP-${String(state.sequences.employee++).padStart(2, "0")}`;
    state.employees.push({
      id,
      name: fullName,
      username,
      email,
      branch,
      shift: "General",
      status: "active",
      salary,
      attendanceRate: 92,
      paymentStatus: "pending",
    });
  } else {
    const id = `RID-${String(state.sequences.rider++).padStart(2, "0")}`;
    state.riders.push({
      id,
      name: fullName,
      username,
      email,
      zone: branch,
      bike: "Pending bike",
      status: "active",
      salary,
      deliveries: 0,
      attendanceRate: 90,
      paymentStatus: "pending",
    });
  }

  state.registrations.push({
    id: `REG-${100 + state.registrations.length + 1}`,
    name: fullName,
    role,
    username,
    branch,
    createdAt: `${TODAY} ${timeLabel()}`,
  });

  pushActivity("New user created", `${fullName} was added as a ${role} record in the system.`);
  showToast("User added", `${fullName} is now part of the demo system.`);
  form.reset();
  render();
}

function handleAdvanceSubmit(form) {
  const user = getCurrentUser(state.role);
  const formData = new FormData(form);
  const amount = Number(formData.get("amount") || 0);
  const note = String(formData.get("note") || "").trim();

  if (!amount || !note) {
    showToast("Missing details", "Amount and reason are both required.");
    return;
  }

  state.advanceRequests.unshift({
    id: `ADV-${state.sequences.advance++}`,
    userId: user.id,
    user: user.name,
    type: state.role,
    amount,
    date: TODAY,
    note,
    status: "pending",
  });

  pushActivity("Advance requested", `${user.name} requested ${formatCurrency(amount)} with note "${note}".`);
  showToast("Request submitted", "Your advance request was added to the review queue.");
  form.reset();
  render();
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const roleButton = target.closest("[data-role]");
  if (roleButton) {
    state.role = roleButton.dataset.role;
    if (!navConfig[state.role].some((item) => item.id === state.section)) {
      state.section = "overview";
    }
    render();
    return;
  }

  const navButton = target.closest("[data-section]");
  if (navButton) {
    state.section = navButton.dataset.section;
    render();
    return;
  }

  const jumpButton = target.closest("[data-section-jump]");
  if (jumpButton) {
    state.section = jumpButton.dataset.sectionJump;
    render();
    return;
  }

  const globalButton = target.closest("[data-global-action]");
  if (globalButton) {
    handleGlobalAction(globalButton.dataset.globalAction);
    return;
  }

  const actionButton = target.closest("[data-action]");
  if (!actionButton) {
    return;
  }

  const action = actionButton.dataset.action;
  if (action === "approve-advance") {
    updateAdvanceStatus(actionButton.dataset.id, "approved");
    return;
  }

  if (action === "reject-advance") {
    updateAdvanceStatus(actionButton.dataset.id, "rejected");
    return;
  }

  if (action === "mark-paid") {
    markSalaryPaid(actionButton.dataset.id, actionButton.dataset.type);
    return;
  }

  if (["check-in", "check-out", "mark-absent"].includes(action)) {
    handleAttendanceAction(action);
    return;
  }

  if (action === "send-reminder") {
    pushActivity("Attendance reminder sent", "A reminder was sent to users with open sessions.");
    showToast("Reminder sent", "Open attendance sessions were nudged.");
    return;
  }

  if (action === "download-slip") {
    pushActivity("Slip prepared", "A personal statement export was prepared for review.");
    showToast("Statement ready", "A clean salary statement export is ready.");
    return;
  }

  if (action === "export-report") {
    const report = state.reports.find((item) => item.id === actionButton.dataset.id);
    if (report) {
      pushActivity("Report exported", `${report.title} was exported from the reports module.`);
      showToast("Report exported", `${report.title} is ready.`);
    }
    return;
  }

  if (action === "view-profile") {
    const type = actionButton.dataset.type;
    const user = getUserByRoleAndId(type, actionButton.dataset.id);
    if (user) {
      showToast("Profile preview", `${user.name} | ${type} | ${type === "employee" ? user.branch : user.zone}`);
    }
  }
});

document.addEventListener("submit", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLFormElement)) {
    return;
  }

  event.preventDefault();
  if (target.id === "registrationForm") {
    handleRegistrationSubmit(target);
  }
  if (target.id === "advanceRequestForm") {
    handleAdvanceSubmit(target);
  }
});

updateClock();
window.setInterval(updateClock, 1000);
render();
