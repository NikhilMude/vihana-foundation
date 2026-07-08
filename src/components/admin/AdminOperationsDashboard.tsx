"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  BadgeIndianRupee,
  BarChart3,
  CalendarDays,
  Download,
  KeyRound,
  LayoutDashboard,
  Loader2,
  Plus,
  ReceiptText,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { AdminPermission, AdminSession } from "@/lib/adminAuth";
import { SiteContent } from "@/lib/cmsContent";

type DonationRecord = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  amount?: string;
  method?: string;
  purpose?: string;
  donorCategory?: string;
  receiptNumber?: string;
  status?: string;
  createdAt?: string;
};

type DonorRecord = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  pan?: string;
  address?: string;
  createdAt?: string;
};

type AccountingRecord = {
  id: string;
  type?: string;
  title?: string;
  amount?: string;
  category?: string;
  date?: string;
  party?: string;
  reference?: string;
  status?: string;
  notes?: string;
};

type AdminUserRecord = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  permissions?: string;
  status?: string;
  createdAt?: string;
};

type AdminOperationsDashboardProps = {
  currentAdmin: AdminSession;
  content: SiteContent;
  adminUsers: AdminUserRecord[];
  donations: DonationRecord[];
  donors: DonorRecord[];
  accountingRecords: AccountingRecord[];
  allPermissions: AdminPermission[];
};

type OpsTab = "overview" | "donations" | "accounting" | "donors" | "users";
type ReportGroupBy = "month" | "financialYear" | "purpose" | "method" | "donor";
type ReportChartType = "bar" | "pie" | "table";
type SavedReport = {
  id: string;
  title: string;
  month: string;
  financialYear: string;
  groupBy: ReportGroupBy;
  chartType: ReportChartType;
};
type BulkDonationRow = {
  name: string;
  email: string;
  phone: string;
  amount: string;
  date: string;
  method: string;
  purpose: string;
  transactionId: string;
  pan: string;
  address: string;
  message: string;
};

const permissionGroups: { title: string; description: string; permissions: AdminPermission[] }[] = [
  { title: "CMS", description: "Website content only", permissions: ["cms:view", "cms:edit"] },
  { title: "Donations", description: "Money received and donation records", permissions: ["donations:view", "donations:create", "donations:edit", "donations:delete"] },
  { title: "Receipts", description: "PDF receipt access and issuing", permissions: ["receipts:view", "receipts:create"] },
  { title: "Accounting", description: "Expenses, bills and annual records", permissions: ["accounting:view", "accounting:create", "accounting:edit", "accounting:delete"] },
  { title: "Donors", description: "Donor account creation and profiles", permissions: ["donors:view", "donors:create", "donors:edit", "donors:delete"] },
  { title: "Reports", description: "Dashboard summaries and exports", permissions: ["reports:view", "reports:export"] },
  { title: "Dashboard Users", description: "Create and restrict admin users", permissions: ["users:view", "users:create", "users:edit", "users:delete"] },
  { title: "Community", description: "Messages, newsletter and visitors", permissions: ["messages:view", "newsletter:view", "newsletter:send", "visitors:view"] },
];

const permissionLabels: Record<AdminPermission, string> = {
  "cms:view": "View CMS",
  "cms:edit": "Edit CMS",
  "donations:view": "View donations",
  "donations:create": "Create donations",
  "donations:edit": "Edit donations",
  "donations:delete": "Delete donations",
  "receipts:view": "View receipts",
  "receipts:create": "Create receipts",
  "accounting:view": "View accounting",
  "accounting:create": "Create accounting",
  "accounting:edit": "Edit accounting",
  "accounting:delete": "Delete accounting",
  "donors:view": "View donors",
  "donors:create": "Create donors",
  "donors:edit": "Edit donors",
  "donors:delete": "Delete donors",
  "reports:view": "View reports",
  "reports:export": "Export reports",
  "users:view": "View users",
  "users:create": "Create users",
  "users:edit": "Edit users",
  "users:delete": "Delete users",
  "messages:view": "View messages",
  "newsletter:view": "View newsletter",
  "newsletter:send": "Send newsletter",
  "visitors:view": "View visitors",
};

function currencyAmount(value?: string) {
  return Number(String(value || "").replace(/[^\d.]/g, "")) || 0;
}

function formatCurrency(value: number) {
  return `INR ${value.toLocaleString("en-IN")}`;
}

function getDate(value?: string) {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
}

function dateKey(value?: string, mode: "day" | "month" = "month") {
  const date = getDate(value);
  if (!date) return "No date";
  if (mode === "day") return date.toISOString().slice(0, 10);
  return date.toLocaleString("en-IN", { month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
}

function financialYearKey(value?: string) {
  const date = getDate(value);
  if (!date) return "No financial year";
  const month = Number(date.toLocaleString("en-IN", { month: "numeric", timeZone: "Asia/Kolkata" }));
  const year = Number(date.toLocaleString("en-IN", { year: "numeric", timeZone: "Asia/Kolkata" }));
  const start = month >= 4 ? year : year - 1;
  const end = String(start + 1).slice(-2);

  return `FY ${start}-${end}`;
}

function monthInputValue(value?: string) {
  const date = getDate(value);
  return date ? date.toISOString().slice(0, 7) : "";
}

function donationDonorKey(donation: DonationRecord) {
  return (donation.email || donation.name || donation.phone || "unknown").trim().toLowerCase();
}

function downloadCsv(filename: string, rows: Record<string, string | number | undefined>[]) {
  const headers = Object.keys(rows[0] || { empty: "" });
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => `"${String(row[header] ?? "").replace(/"/g, '""')}"`).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadTextFile(filename: string, text: string, type = "text/csv;charset=utf-8") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === "\"" && quoted && next === "\"") {
      value += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(value.trim());
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  row.push(value.trim());
  if (row.some(Boolean)) rows.push(row);

  return rows;
}

function normalizeHeader(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function parseExcelHtmlTable(text: string) {
  if (!text.trim().toLowerCase().includes("<table")) {
    return [];
  }

  const document = new DOMParser().parseFromString(text, "text/html");
  const rows = Array.from(document.querySelectorAll("tr"));

  return rows
    .map((row) => Array.from(row.querySelectorAll("th,td")).map((cell) => cell.textContent?.trim() || ""))
    .filter((row) => row.some(Boolean));
}

function bulkRowsFromSheet(text: string): BulkDonationRow[] {
  const parsed = parseExcelHtmlTable(text);
  const rowsToRead = parsed.length ? parsed : parseCsv(text);
  const [headers = [], ...rows] = rowsToRead;
  const headerMap = new Map(headers.map((header, index) => [normalizeHeader(header), index]));
  const get = (row: string[], keys: string[]) => {
    const index = keys.map(normalizeHeader).map((key) => headerMap.get(key)).find((item) => item !== undefined);
    return index === undefined ? "" : row[index] || "";
  };

  return rows
    .map((row) => ({
      name: get(row, ["Donor Name", "Donor full name", "Name"]),
      email: get(row, ["Email"]),
      phone: get(row, ["Phone"]),
      amount: get(row, ["Amount"]),
      date: get(row, ["Date"]),
      method: get(row, ["Payment Method", "Method"]),
      purpose: get(row, ["Purpose"]),
      transactionId: get(row, ["Transaction ID", "Reference", "Reference ID"]),
      pan: get(row, ["PAN"]),
      address: get(row, ["Address"]),
      message: get(row, ["Message", "Note"]),
    }))
    .filter((row) => row.name || row.email || row.amount);
}

function BarList({ rows }: { rows: [string, number][] }) {
  const max = Math.max(...rows.map(([, value]) => value), 1);

  return (
    <div className="grid gap-3">
      {rows.length ? (
        rows.map(([label, value]) => (
          <div key={label}>
            <div className="mb-1 flex justify-between gap-3 text-xs font-bold text-slate-600">
              <span>{label}</span>
              <span>{formatCurrency(value)}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-teal-600" style={{ width: `${Math.max(8, (value / max) * 100)}%` }} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-slate-500">No data yet.</p>
      )}
    </div>
  );
}

function PieList({ rows }: { rows: [string, number][] }) {
  const total = rows.reduce((sum, [, value]) => sum + value, 0) || 1;
  const colors = ["#0f766e", "#fbbf24", "#0ea5e9", "#fb7185", "#334155", "#14b8a6"];
  let start = 0;
  const gradient = rows.length
    ? rows.map(([, value], index) => {
        const end = start + (value / total) * 100;
        const segment = `${colors[index % colors.length]} ${start}% ${end}%`;
        start = end;
        return segment;
      }).join(", ")
    : "#e2e8f0 0% 100%";

  return (
    <div className="grid gap-4 lg:grid-cols-[180px_1fr] lg:items-center">
      <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full shadow-inner" style={{ background: `conic-gradient(${gradient})` }}>
        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white text-center shadow-sm">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Total</span>
          <span className="mt-1 text-lg font-black text-teal-700">{formatCurrency(total).replace("INR ", "₹")}</span>
        </div>
      </div>
      <div className="grid gap-2">
      {rows.length ? rows.map(([label, value], index) => {
        return (
          <div key={label} className="flex items-center justify-between gap-3 rounded-[8px] bg-slate-50 px-3 py-2 text-sm">
            <span className="flex min-w-0 items-center gap-2 font-bold text-slate-700">
              <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
              <span className="truncate">{label}</span>
            </span>
            <span className="shrink-0 font-black text-teal-700">{Math.round((value / total) * 100)}%</span>
          </div>
        );
      }) : <p className="text-sm text-slate-500">No data yet.</p>}
      </div>
    </div>
  );
}

function reportRowsFor(
  donations: DonationRecord[],
  month: string,
  financialYear: string,
  groupBy: ReportGroupBy
) {
  const records = donations.filter((donation) => {
    const monthMatches = month === "All" || monthInputValue(donation.createdAt) === month;
    const fyMatches = financialYear === "All" || financialYearKey(donation.createdAt) === financialYear;
    return monthMatches && fyMatches;
  });
  const grouped = records.reduce<Record<string, number>>((acc, donation) => {
    const key =
      groupBy === "month" ? dateKey(donation.createdAt) :
      groupBy === "financialYear" ? financialYearKey(donation.createdAt) :
      groupBy === "purpose" ? donation.purpose || "General Fund" :
      groupBy === "method" ? donation.method || "Unknown" :
      donation.name || donation.email || donation.phone || "Unknown donor";
    acc[key] = (acc[key] || 0) + currencyAmount(donation.amount);
    return acc;
  }, {});

  return Object.entries(grouped).sort(([, a], [, b]) => b - a).slice(0, 12);
}

export default function AdminOperationsDashboard({
  currentAdmin,
  content,
  adminUsers: initialAdminUsers,
  donations: initialDonations,
  donors: initialDonors,
  accountingRecords: initialAccountingRecords,
}: AdminOperationsDashboardProps) {
  const [tab, setTab] = useState<OpsTab>("overview");
  const [adminUsers, setAdminUsers] = useState(initialAdminUsers);
  const [donations, setDonations] = useState(initialDonations);
  const [donors, setDonors] = useState(initialDonors);
  const [accountingRecords, setAccountingRecords] = useState(initialAccountingRecords);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState("All");
  const [donorFilter, setDonorFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [donationPage, setDonationPage] = useState(1);
  const [accountingPage, setAccountingPage] = useState(1);
  const [donorPage, setDonorPage] = useState(1);
  const [adminUserPage, setAdminUserPage] = useState(1);
  const [reportMonth, setReportMonth] = useState("All");
  const [reportFinancialYear, setReportFinancialYear] = useState("All");
  const [reportGroupBy, setReportGroupBy] = useState<ReportGroupBy>("month");
  const [reportChartType, setReportChartType] = useState<ReportChartType>("bar");
  const [reportTitle, setReportTitle] = useState("My Donation Report");
  const [savedReports, setSavedReports] = useState<SavedReport[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem("vihanaSavedReports") || "[]") as SavedReport[];
    } catch {
      return [];
    }
  });
  const [bulkRows, setBulkRows] = useState<BulkDonationRow[]>([]);
  const [bulkUploading, setBulkUploading] = useState(false);
  const pageSize = 6;

  const can = (permission: AdminPermission) => currentAdmin.owner || currentAdmin.permissions.includes(permission);
  const canOpenCms = can("cms:view") || can("cms:edit");
  const canExport = can("reports:export");

  const filteredDonations = useMemo(() => {
    const search = query.trim().toLowerCase();
    return donations.filter((donation) => {
      const donationDate = getDate(donation.createdAt);
      const afterFrom = !fromDate || (donationDate && donationDate >= new Date(`${fromDate}T00:00:00`));
      const beforeTo = !toDate || (donationDate && donationDate <= new Date(`${toDate}T23:59:59`));
      const methodMatches = methodFilter === "All" || donation.method === methodFilter;
      const donorMatches = donorFilter === "All" || donationDonorKey(donation) === donorFilter;
      const textMatches =
        !search ||
        [donation.name, donation.email, donation.phone, donation.amount, donation.method, donation.purpose, donation.receiptNumber, donation.status]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(search);

      return afterFrom && beforeTo && methodMatches && donorMatches && textMatches;
    });
  }, [donations, donorFilter, fromDate, methodFilter, query, toDate]);

  const donationPageCount = Math.max(1, Math.ceil(filteredDonations.length / pageSize));
  const pagedDonations = filteredDonations.slice((donationPage - 1) * pageSize, donationPage * pageSize);
  const accountingPageCount = Math.max(1, Math.ceil(accountingRecords.length / pageSize));
  const pagedAccounting = accountingRecords.slice((accountingPage - 1) * pageSize, accountingPage * pageSize);
  const donorPageCount = Math.max(1, Math.ceil(donors.length / pageSize));
  const pagedDonors = donors.slice((donorPage - 1) * pageSize, donorPage * pageSize);
  const adminUserPageCount = Math.max(1, Math.ceil(adminUsers.length / pageSize));
  const pagedAdminUsers = adminUsers.slice((adminUserPage - 1) * pageSize, adminUserPage * pageSize);

  const metrics = useMemo(() => {
    const totalReceived = donations.reduce((sum, donation) => sum + currencyAmount(donation.amount), 0);
    const expenses = accountingRecords
      .filter((record) => (record.type || "").toLowerCase().includes("expense") || (record.type || "").toLowerCase().includes("bill"))
      .reduce((sum, record) => sum + currencyAmount(record.amount), 0);
    const thisMonth = new Date().toLocaleString("en-IN", { month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
    const monthReceived = donations
      .filter((donation) => dateKey(donation.createdAt) === thisMonth)
      .reduce((sum, donation) => sum + currencyAmount(donation.amount), 0);
    const byMonth = donations.reduce<Record<string, number>>((acc, donation) => {
      const key = dateKey(donation.createdAt);
      acc[key] = (acc[key] || 0) + currencyAmount(donation.amount);
      return acc;
    }, {});
    const byPurpose = donations.reduce<Record<string, number>>((acc, donation) => {
      const key = donation.purpose || "General Fund";
      acc[key] = (acc[key] || 0) + currencyAmount(donation.amount);
      return acc;
    }, {});

    return {
      totalReceived,
      expenses,
      net: totalReceived - expenses,
      monthReceived,
      byMonth: Object.entries(byMonth).slice(-6),
      byPurpose: Object.entries(byPurpose).sort(([, a], [, b]) => b - a).slice(0, 5),
    };
  }, [accountingRecords, donations]);

  const methods = useMemo(() => ["All", ...Array.from(new Set(donations.map((donation) => donation.method || "Unknown")))], [donations]);
  const monthOptions = useMemo(() => ["All", ...Array.from(new Set(donations.map((donation) => monthInputValue(donation.createdAt)).filter(Boolean))).sort().reverse()], [donations]);
  const financialYearOptions = useMemo(() => ["All", ...Array.from(new Set(donations.map((donation) => financialYearKey(donation.createdAt)).filter((value) => value !== "No financial year"))).sort().reverse()], [donations]);
  const donorOptions = useMemo(() => {
    const options = new Map<string, string>();

    donations.forEach((donation) => {
      const key = donationDonorKey(donation);
      const label = donation.name || donation.email || donation.phone || "Unknown donor";
      if (!options.has(key)) {
        options.set(key, label);
      }
    });

    return Array.from(options.entries()).sort(([, a], [, b]) => a.localeCompare(b));
  }, [donations]);
  const donorInsights = useMemo(() => {
    const source = donorFilter === "All" ? filteredDonations : donations.filter((donation) => donationDonorKey(donation) === donorFilter);
    const total = source.reduce((sum, donation) => sum + currencyAmount(donation.amount), 0);
    const byMonth = source.reduce<Record<string, number>>((acc, donation) => {
      const key = dateKey(donation.createdAt);
      acc[key] = (acc[key] || 0) + currencyAmount(donation.amount);
      return acc;
    }, {});
    const byFinancialYear = source.reduce<Record<string, number>>((acc, donation) => {
      const key = financialYearKey(donation.createdAt);
      acc[key] = (acc[key] || 0) + currencyAmount(donation.amount);
      return acc;
    }, {});

    return {
      label: donorFilter === "All" ? "All donors" : donorOptions.find(([key]) => key === donorFilter)?.[1] || "Selected donor",
      total,
      count: source.length,
      byMonth: Object.entries(byMonth).slice(-8).reverse(),
      byFinancialYear: Object.entries(byFinancialYear).sort(([a], [b]) => b.localeCompare(a)),
    };
  }, [donations, donorFilter, donorOptions, filteredDonations]);
  const reportRows = useMemo(() => reportRowsFor(donations, reportMonth, reportFinancialYear, reportGroupBy), [donations, reportFinancialYear, reportGroupBy, reportMonth]);
  const reportTotal = reportRows.reduce((sum, [, value]) => sum + value, 0);

  function persistSavedReports(nextReports: SavedReport[]) {
    setSavedReports(nextReports);
    window.localStorage.setItem("vihanaSavedReports", JSON.stringify(nextReports));
  }

  function saveReportWidget() {
    const title = reportTitle.trim() || "Saved Donation Report";
    persistSavedReports([
      {
        id: crypto.randomUUID(),
        title,
        month: reportMonth,
        financialYear: reportFinancialYear,
        groupBy: reportGroupBy,
        chartType: reportChartType,
      },
      ...savedReports,
    ]);
    setStatus(`Report "${title}" saved to this dashboard.`);
  }

  function removeReportWidget(id: string) {
    persistSavedReports(savedReports.filter((report) => report.id !== id));
  }

  function downloadBulkSample() {
    const headers = ["Donor full name", "email", "phone", "Amount", "Date", "Payment Method", "Purpose", "PAN", "Address"];
    const rows = [
      ["Example Donor", "donor@example.com", "9876543210", "1000", "2026-07-09", "Cash", "General Fund", "", "Pune, Maharashtra"],
      ["Existing Donor", "existing@example.com", "9876500000", "2500", "2026-07-10", "UPI", "Health Support", "ABCDE1234F", "Mumbai, Maharashtra"],
    ];
    const tableRows = [headers, ...rows]
      .map((row, rowIndex) => `<tr>${row.map((cell) => `<${rowIndex ? "td" : "th"}>${cell}</${rowIndex ? "td" : "th"}>`).join("")}</tr>`)
      .join("");

    downloadTextFile(
      "vihana-bulk-donation-sample.xls",
      `<!doctype html><html><head><meta charset="utf-8" /></head><body><table>${tableRows}</table></body></html>`,
      "application/vnd.ms-excel;charset=utf-8"
    );
  }

  async function handleBulkFile(file?: File) {
    if (!file) return;
    const text = await file.text();
    const rows = bulkRowsFromSheet(text);
    setBulkRows(rows);
    setStatus(`${rows.length} donation rows ready. Review and click Import Donations.`);
  }

  async function importBulkDonations() {
    if (!bulkRows.length || !can("donations:create")) return;
    setBulkUploading(true);
    setStatus("Importing donations and generating receipts...");

    const response = await fetch("/api/admin/donations/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows: bulkRows, createMissingDonors: true }),
    });
    const result = (await response.json()) as {
      ok: boolean;
      donations?: DonationRecord[];
      accountingRecords?: AccountingRecord[];
      message?: string;
      summary?: string;
      createdDonorCount?: number;
    };
    setBulkUploading(false);

    if (!response.ok || !result.ok) {
      setStatus(result.message || "Could not import donations.");
      return;
    }

    if (result.donations?.length) setDonations((records) => [...result.donations as DonationRecord[], ...records]);
    if (result.accountingRecords?.length) setAccountingRecords((records) => [...result.accountingRecords as AccountingRecord[], ...records]);
    setBulkRows([]);
    setDonationPage(1);
    setStatus(`${result.summary || "Bulk donation import complete."}${result.createdDonorCount ? ` Created ${result.createdDonorCount} donor accounts.` : ""}`);
  }

  async function seedTestDonations() {
    if (!can("donations:create") || !window.confirm("Create dashboard test donors, donations, receipts and accounting records? Existing test records will be updated.")) return;
    setSaving(true);
    setStatus("Creating test donation data...");

    const response = await fetch("/api/admin/donations/seed-test", { method: "POST" });
    const result = (await response.json()) as { ok: boolean; message?: string };
    setSaving(false);

    if (!response.ok || !result.ok) {
      setStatus(result.message || "Could not create test donation data.");
      return;
    }

    setStatus(`${result.message || "Test donation data created."} Refreshing dashboard...`);
    window.setTimeout(() => window.location.reload(), 900);
  }

  async function addCashDonation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!can("donations:create")) return;
    setSaving(true);
    setStatus("Recording donation...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    const result = (await response.json()) as { ok: boolean; donation?: DonationRecord; accountingRecord?: AccountingRecord; message?: string };
    setSaving(false);

    if (!response.ok || !result.donation) {
      setStatus(result.message || "Could not record donation.");
      return;
    }

    setDonations((records) => [result.donation as DonationRecord, ...records]);
    if (result.accountingRecord) setAccountingRecords((records) => [result.accountingRecord as AccountingRecord, ...records]);
    setDonationPage(1);
    form.reset();
    setStatus(`Donation recorded. Receipt ${result.donation.receiptNumber || "generated"} is ready.`);
  }

  async function addAccountingRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!can("accounting:create")) return;
    setSaving(true);
    setStatus("Saving accounting record...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/accounting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    const result = (await response.json()) as { ok: boolean; item?: AccountingRecord; message?: string };
    setSaving(false);

    if (!response.ok || !result.item) {
      setStatus(result.message || "Could not save accounting record.");
      return;
    }

    setAccountingRecords((records) => [result.item as AccountingRecord, ...records]);
    setAccountingPage(1);
    form.reset();
    setStatus("Accounting record saved.");
  }

  async function addDonorUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!can("donors:create")) return;
    setSaving(true);
    setStatus("Creating donor account...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/donors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    const result = (await response.json()) as { ok: boolean; donor?: DonorRecord; message?: string };
    setSaving(false);

    if (!response.ok || !result.donor) {
      setStatus(result.message || "Could not create donor account.");
      return;
    }

    setDonors((records) => [result.donor as DonorRecord, ...records]);
    setDonorPage(1);
    form.reset();
    setStatus("Donor account created.");
  }

  async function updateDonorUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!can("donors:edit")) return;
    setSaving(true);
    setStatus("Updating donor account...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/donors", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    const result = (await response.json()) as { ok: boolean; donor?: DonorRecord; message?: string };
    setSaving(false);

    if (!response.ok || !result.donor) {
      setStatus(result.message || "Could not update donor account.");
      return;
    }

    setDonors((records) => records.map((record) => (record.id === result.donor?.id ? result.donor as DonorRecord : record)));
    form.reset();
    setStatus("Donor account updated.");
  }

  async function addAdminUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!can("users:create")) return;
    setSaving(true);
    setStatus("Creating dashboard user...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || ""),
        role: String(formData.get("role") || ""),
        permissions: formData.getAll("permissions").map(String),
      }),
    });
    const result = (await response.json()) as { ok: boolean; user?: AdminUserRecord; message?: string };
    setSaving(false);

    if (!response.ok || !result.user) {
      setStatus(result.message || "Could not create dashboard user.");
      return;
    }

    setAdminUsers((users) => [result.user as AdminUserRecord, ...users]);
    setAdminUserPage(1);
    form.reset();
    setStatus("Dashboard user created.");
  }

  async function updateAdminUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!can("users:edit")) return;
    setSaving(true);
    setStatus("Updating dashboard user...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: String(formData.get("id") || ""),
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        role: String(formData.get("role") || ""),
        password: String(formData.get("password") || ""),
        permissions: formData.getAll("permissions").map(String),
      }),
    });
    const result = (await response.json()) as { ok: boolean; user?: AdminUserRecord; message?: string };
    setSaving(false);

    if (!response.ok || !result.user) {
      setStatus(result.message || "Could not update dashboard user.");
      return;
    }

    setAdminUsers((users) => users.map((user) => (user.id === result.user?.id ? result.user as AdminUserRecord : user)));
    form.reset();
    setStatus("Dashboard user updated.");
  }

  async function deleteAdminUser(id: string) {
    if (!can("users:delete") || !window.confirm("Remove this dashboard user?")) return;
    const response = await fetch(`/api/admin/users?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (response.ok) {
      setAdminUsers((users) => users.filter((user) => user.id !== id));
      setAdminUserPage(1);
      setStatus("Dashboard user removed.");
    }
  }

  async function deleteAccountingRecord(id: string) {
    if (!can("accounting:delete") || !window.confirm("Delete this accounting record?")) return;
    const response = await fetch(`/api/admin/accounting?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (response.ok) {
      setAccountingRecords((records) => records.filter((record) => record.id !== id));
      setStatus("Accounting record deleted.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f8f7]">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur sm:px-5">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div className="flex min-w-0 items-center gap-5">
              <Logo
                brandName={content.brandName}
                brandTagline={content.brandTagline}
                logoImageUrl={content.logoImageUrl}
                logoMarkColor={content.logoMarkColor}
                logoAccentColor={content.logoAccentColor}
                logoTextColor={content.logoTextColor}
                logoTaglineColor={content.logoTaglineColor}
              />
              <div className="hidden h-10 w-px bg-slate-200 sm:block" />
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">Admin Operations</p>
                <h1 className="truncate text-xl font-black text-slate-950 sm:text-2xl">Dashboard</h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {canOpenCms ? (
                <Button asChild type="button" className="h-10 rounded-full bg-amber-400 px-5 font-black text-slate-950 shadow-sm hover:bg-amber-300">
                  <Link href="/admin/dashboard" target="_blank" rel="noreferrer"><LayoutDashboard className="mr-2 h-4 w-4" />Open CMS</Link>
                </Button>
              ) : null}
              <form action="/api/admin/logout" method="post">
                <Button type="submit" variant="outline" className="h-10 rounded-full px-5">Logout</Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {status ? <div className="mt-4 rounded-[8px] bg-teal-50 px-4 py-3 text-sm font-bold text-teal-900 shadow-sm">{status}</div> : null}

        <section className="mt-4 grid gap-3 md:grid-cols-4">
          {[
            ["Total received", formatCurrency(metrics.totalReceived), BadgeIndianRupee, "bg-teal-700"],
            ["This month", formatCurrency(metrics.monthReceived), BarChart3, "bg-sky-700"],
            ["Expenses", formatCurrency(metrics.expenses), ReceiptText, "bg-amber-600"],
            ["Net balance", formatCurrency(metrics.net), ShieldCheck, "bg-slate-900"],
          ].map(([label, value, Icon, color]) => (
            <div key={String(label)} className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className={`flex h-10 w-10 items-center justify-center rounded-[8px] ${color} text-white`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{String(label)}</p>
              <p className="mt-1 text-2xl font-black text-slate-950">{String(value)}</p>
            </div>
          ))}
        </section>

        <nav className="mt-4 rounded-[8px] border border-slate-200 bg-white p-2 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {[
              ["overview", "Dashboard", LayoutDashboard],
              ["donations", "Donations", BadgeIndianRupee],
              ["accounting", "Accounting", ReceiptText],
              ["donors", "Donors", Users],
              ["users", "Users & Roles", KeyRound],
            ].map(([id, label, Icon]) => (
              <button
                key={String(id)}
                type="button"
                onClick={() => setTab(id as OpsTab)}
                className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-bold transition ${tab === id ? "bg-teal-700 text-white" : "bg-slate-50 text-slate-700 hover:bg-teal-50"}`}
              >
                <Icon className="h-4 w-4" />
                {String(label)}
              </button>
            ))}
          </div>
        </nav>

        {tab === "overview" ? (
          <section className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">Giving trend</h2>
              <p className="mt-1 text-sm text-slate-600">Last donation months from available records.</p>
              <div className="mt-5"><BarList rows={metrics.byMonth} /></div>
            </div>
            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">Purpose split</h2>
              <p className="mt-1 text-sm text-slate-600">Top giving purposes.</p>
              <div className="mt-5"><BarList rows={metrics.byPurpose} /></div>
            </div>
            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">Custom Report Builder</p>
                  <h2 className="mt-2 text-xl font-black text-slate-950">Build your own dashboard view</h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                    Choose month, financial year, grouping and chart style. This works like a lightweight dashboard widget builder for donation reporting.
                  </p>
                </div>
                <Button type="button" onClick={() => downloadCsv("vihana-custom-report.csv", reportRows.map(([label, amount]) => ({ label, amount })))} className="h-10 rounded-full bg-amber-400 px-5 font-black text-slate-950 shadow-sm hover:bg-amber-300" disabled={!canExport || !reportRows.length}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>

              <div className="mt-4 grid gap-2 md:grid-cols-4">
                <label className="grid gap-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  Month
                  <select value={reportMonth} onChange={(event) => setReportMonth(event.target.value)} className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm normal-case tracking-normal text-slate-900 outline-none focus:border-teal-600">
                    {monthOptions.map((month) => <option key={month} value={month}>{month === "All" ? "All months" : month}</option>)}
                  </select>
                </label>
                <label className="grid gap-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  Financial year
                  <select value={reportFinancialYear} onChange={(event) => setReportFinancialYear(event.target.value)} className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm normal-case tracking-normal text-slate-900 outline-none focus:border-teal-600">
                    {financialYearOptions.map((year) => <option key={year} value={year}>{year === "All" ? "All financial years" : year}</option>)}
                  </select>
                </label>
                <label className="grid gap-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  Group by
                  <select value={reportGroupBy} onChange={(event) => setReportGroupBy(event.target.value as ReportGroupBy)} className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm normal-case tracking-normal text-slate-900 outline-none focus:border-teal-600">
                    <option value="month">Month</option>
                    <option value="financialYear">Financial year</option>
                    <option value="purpose">Purpose</option>
                    <option value="method">Payment method</option>
                    <option value="donor">Donor</option>
                  </select>
                </label>
                <label className="grid gap-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  View
                  <select value={reportChartType} onChange={(event) => setReportChartType(event.target.value as ReportChartType)} className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm normal-case tracking-normal text-slate-900 outline-none focus:border-teal-600">
                    <option value="bar">Bar chart</option>
                    <option value="pie">Pie split</option>
                    <option value="table">Table</option>
                  </select>
                </label>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-[1fr_auto] md:items-center">
                <input
                  value={reportTitle}
                  onChange={(event) => setReportTitle(event.target.value)}
                  placeholder="Report name, e.g. FY donation by purpose"
                  className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600"
                />
                <Button type="button" onClick={saveReportWidget} className="h-10 rounded-full bg-teal-700 px-5 font-black text-white shadow-sm hover:bg-teal-800">
                  <Save className="mr-2 h-4 w-4" />
                  Save Report Widget
                </Button>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[220px_1fr]">
                <div className="rounded-[8px] bg-teal-50 p-4">
                  <CalendarDays className="h-6 w-6 text-teal-700" />
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-teal-700">Filtered total</p>
                  <p className="mt-1 text-2xl font-black text-slate-950">{formatCurrency(reportTotal)}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{reportRows.length} report rows</p>
                </div>
                <div className="rounded-[8px] border border-slate-200 bg-slate-50 p-4">
                  {reportChartType === "bar" ? <BarList rows={reportRows} /> : null}
                  {reportChartType === "pie" ? <PieList rows={reportRows} /> : null}
                  {reportChartType === "table" ? (
                    <div className="grid gap-2">
                      {reportRows.length ? reportRows.map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-3 rounded-[8px] bg-white px-3 py-2 text-sm">
                          <span className="font-bold text-slate-700">{label}</span>
                          <span className="font-black text-teal-700">{formatCurrency(value)}</span>
                        </div>
                      )) : <p className="text-sm text-slate-500">No data for this report.</p>}
                    </div>
                  ) : null}
                </div>
              </div>
              {savedReports.length ? (
                <div className="mt-5 border-t border-slate-200 pt-5">
                  <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">Saved dashboard widgets</h3>
                  <div className="mt-3 grid gap-3 lg:grid-cols-2">
                    {savedReports.map((report) => {
                      const rows = reportRowsFor(donations, report.month, report.financialYear, report.groupBy);
                      const total = rows.reduce((sum, [, value]) => sum + value, 0);

                      return (
                        <article key={report.id} className="rounded-[8px] border border-slate-200 bg-slate-50 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="font-black text-slate-950">{report.title}</h4>
                              <p className="mt-1 text-xs font-semibold text-slate-500">
                                {report.month === "All" ? "All months" : report.month} | {report.financialYear === "All" ? "All FY" : report.financialYear} | {report.groupBy}
                              </p>
                            </div>
                            <button type="button" onClick={() => removeReportWidget(report.id)} className="rounded-full px-3 py-1 text-xs font-black text-rose-700 hover:bg-rose-50">
                              Remove
                            </button>
                          </div>
                          <p className="mt-3 text-xl font-black text-teal-700">{formatCurrency(total)}</p>
                          <div className="mt-3 rounded-[8px] bg-white p-3">
                            {report.chartType === "bar" ? <BarList rows={rows} /> : null}
                            {report.chartType === "pie" ? <PieList rows={rows} /> : null}
                            {report.chartType === "table" ? (
                              <div className="grid gap-2">
                                {rows.length ? rows.map(([label, value]) => (
                                  <div key={label} className="flex justify-between gap-3 rounded-[8px] bg-slate-50 px-3 py-2 text-xs">
                                    <span className="font-bold text-slate-700">{label}</span>
                                    <span className="font-black text-teal-700">{formatCurrency(value)}</span>
                                  </div>
                                )) : <p className="text-sm text-slate-500">No data.</p>}
                              </div>
                            ) : null}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <h2 className="text-xl font-black text-slate-950">Quick actions</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-4">
                {[
                  ["Record donation", "donations", "donations:create"],
                  ["Add expense", "accounting", "accounting:create"],
                  ["Create donor", "donors", "donors:create"],
                  ["Create dashboard user", "users", "users:create"],
                ].map(([label, nextTab, permission]) => (
                  <button
                    key={label}
                    type="button"
                    disabled={!can(permission as AdminPermission)}
                    onClick={() => setTab(nextTab as OpsTab)}
                    className="rounded-[8px] border border-slate-200 bg-slate-50 p-4 text-left text-sm font-black text-slate-900 transition hover:border-teal-200 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <Plus className="mb-3 h-5 w-5 text-teal-700" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {tab === "donations" ? (
          <section className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">Record donation</h2>
              <p className="mt-1 text-sm text-slate-600">Cash, UPI, bank transfer or cheque received offline.</p>
              {can("donations:create") ? (
                <form onSubmit={addCashDonation} className="mt-4 grid gap-3">
                  <input name="name" required placeholder="Donor name" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input name="amount" required inputMode="numeric" placeholder="Amount" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                    <select name="method" defaultValue="Cash" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600">
                      <option>Cash</option><option>UPI</option><option>Bank Transfer</option><option>Cheque</option>
                    </select>
                  </div>
                  <input name="email" type="email" placeholder="Email optional" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="phone" placeholder="Phone optional" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="purpose" placeholder="Purpose" defaultValue="General Fund" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="transactionId" placeholder="Reference optional" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <Button disabled={saving} className="h-11 rounded-full bg-teal-700 hover:bg-teal-800">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ReceiptText className="mr-2 h-4 w-4" />}Save & Generate Receipt
                  </Button>
                </form>
              ) : <p className="mt-4 rounded-[8px] bg-amber-50 p-3 text-sm font-semibold text-amber-900">No create access.</p>}
              <div className="mt-5 border-t border-slate-200 pt-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">Bulk upload</p>
                <h3 className="mt-2 text-lg font-black text-slate-950">Upload office cash donation sheet</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Download the sample, fill it in Excel, upload it here and donor accounts, donations and receipts will be created for every valid row.
                </p>
                <div className="mt-3 grid gap-2">
                  <Button type="button" variant="outline" onClick={downloadBulkSample} className="h-10 rounded-full px-4">
                    <Download className="mr-2 h-4 w-4" />
                    Download Sample Excel
                  </Button>
                  <label className="grid gap-2 rounded-[8px] border border-dashed border-slate-300 bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                    Upload completed Excel or CSV
                    <input
                      type="file"
                      accept=".xls,.csv,application/vnd.ms-excel,text/csv"
                      onChange={(event) => void handleBulkFile(event.target.files?.[0])}
                      className="text-sm"
                    />
                  </label>
                  {bulkRows.length ? (
                    <div className="rounded-[8px] bg-teal-50 p-3 text-sm text-teal-950">
                      <p className="font-black">{bulkRows.length} rows ready for import</p>
                      <p className="mt-1 text-xs font-semibold">Required columns: Donor full name, email, phone, Amount, Date, Payment Method, Purpose, PAN, Address.</p>
                      <p className="mt-1 text-xs font-semibold">Rows with valid email will create donor accounts if they do not already exist. Temporary password: Vihana@123.</p>
                      <Button type="button" onClick={importBulkDonations} disabled={bulkUploading} className="mt-3 h-10 rounded-full bg-teal-700 px-5 font-black text-white hover:bg-teal-800">
                        {bulkUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                        Import Donations & Generate Receipts
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-5 rounded-[8px] border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">Dashboard testing</p>
                <h3 className="mt-2 font-black text-slate-950">Create sample test data</h3>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  Creates 6 donor accounts, 52 donation records, matching receipts and accounting records from your Excel test data.
                </p>
                <Button type="button" onClick={seedTestDonations} disabled={saving} className="mt-3 h-10 rounded-full bg-slate-950 px-5 font-black text-white hover:bg-slate-800">
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                  Create Test Donation Data
                </Button>
              </div>
            </div>

            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-xl font-black text-slate-950">Donations & receipts</h2>
                    <p className="mt-1 text-sm text-slate-600">{filteredDonations.length} matching records</p>
                  </div>
                  <Button type="button" onClick={() => downloadCsv("vihana-donation-report.csv", filteredDonations)} className="h-10 rounded-full bg-amber-400 px-5 font-black text-slate-950 shadow-sm hover:bg-amber-300" disabled={!canExport || !filteredDonations.length}>
                    <Download className="mr-2 h-4 w-4" />Export
                  </Button>
                </div>
                <div className="grid gap-2 md:grid-cols-[1fr_150px_140px_120px_120px]">
                  <label className="flex h-10 items-center gap-2 rounded-[8px] border border-slate-200 bg-slate-50 px-3">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input value={query} onChange={(event) => { setQuery(event.target.value); setDonationPage(1); }} placeholder="Search donor, receipt, purpose..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
                  </label>
                  <select value={donorFilter} onChange={(event) => { setDonorFilter(event.target.value); setDonationPage(1); }} className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none">
                    <option value="All">All donors</option>
                    {donorOptions.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                  </select>
                  <select value={methodFilter} onChange={(event) => { setMethodFilter(event.target.value); setDonationPage(1); }} className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none">
                    {methods.map((method) => <option key={method}>{method}</option>)}
                  </select>
                  <input type="date" value={fromDate} onChange={(event) => { setFromDate(event.target.value); setDonationPage(1); }} className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none" />
                  <input type="date" value={toDate} onChange={(event) => { setToDate(event.target.value); setDonationPage(1); }} className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none" />
                </div>
              </div>

              <div className="mt-4 grid gap-3 rounded-[8px] border border-teal-100 bg-teal-50 p-4 lg:grid-cols-[220px_1fr_1fr]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">Donor summary</p>
                  <h3 className="mt-1 text-lg font-black text-slate-950">{donorInsights.label}</h3>
                  <p className="mt-2 text-2xl font-black text-teal-700">{formatCurrency(donorInsights.total)}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{donorInsights.count} donation records</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Month-wise</p>
                  <div className="mt-2 grid gap-1.5">
                    {donorInsights.byMonth.length ? donorInsights.byMonth.slice(0, 5).map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-3 rounded-[8px] bg-white px-3 py-2 text-xs font-bold">
                        <span className="text-slate-600">{label}</span>
                        <span className="text-teal-700">{formatCurrency(value)}</span>
                      </div>
                    )) : <p className="text-sm text-slate-500">No month-wise data.</p>}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Financial year</p>
                  <div className="mt-2 grid gap-1.5">
                    {donorInsights.byFinancialYear.length ? donorInsights.byFinancialYear.map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-3 rounded-[8px] bg-white px-3 py-2 text-xs font-bold">
                        <span className="text-slate-600">{label}</span>
                        <span className="text-teal-700">{formatCurrency(value)}</span>
                      </div>
                    )) : <p className="text-sm text-slate-500">No financial-year data.</p>}
                  </div>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-[8px] border border-slate-200">
                {pagedDonations.map((donation) => (
                  <div key={donation.id} className="grid gap-2 border-b border-slate-200 bg-white px-4 py-3 text-sm last:border-b-0 md:grid-cols-[1.2fr_120px_1fr_auto] md:items-center">
                    <div><p className="font-black text-slate-950">{donation.name || "Donor"}</p><p className="text-xs text-slate-500">{donation.email || donation.createdAt || "No email"}</p></div>
                    <p className="font-black text-teal-700">{formatCurrency(currencyAmount(donation.amount))}</p>
                    <p className="text-slate-600">{donation.receiptNumber || donation.method || "Recorded"}{donation.donorCategory ? ` | ${donation.donorCategory}` : ""}</p>
                    <Button asChild type="button" className="h-10 rounded-full bg-amber-400 px-4 text-xs font-black text-slate-950 shadow-sm hover:bg-amber-300" disabled={!can("receipts:view")}>
                      <a href={`/api/donor/receipt?id=${encodeURIComponent(donation.id)}`}>
                        <Download className="mr-2 h-4 w-4" />
                        Receipt PDF
                      </a>
                    </Button>
                  </div>
                ))}
                {!pagedDonations.length ? <div className="p-8 text-center text-sm text-slate-600">No matching donations.</div> : null}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Button type="button" variant="outline" className="h-9 rounded-full px-4" disabled={donationPage === 1} onClick={() => setDonationPage((page) => Math.max(1, page - 1))}>Previous</Button>
                <p className="text-sm font-bold text-slate-600">Page {donationPage} of {donationPageCount}</p>
                <Button type="button" variant="outline" className="h-9 rounded-full px-4" disabled={donationPage === donationPageCount} onClick={() => setDonationPage((page) => Math.min(donationPageCount, page + 1))}>Next</Button>
              </div>
            </div>
          </section>
        ) : null}

        {tab === "accounting" ? (
          <section className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">Add accounting record</h2>
              {can("accounting:create") ? (
                <form onSubmit={addAccountingRecord} className="mt-4 grid gap-3">
                  <select name="type" defaultValue="Expense" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600"><option>Expense</option><option>Bill</option><option>Receipt</option><option>Annual Statement</option></select>
                  <input name="title" required placeholder="Title" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="amount" required inputMode="numeric" placeholder="Amount" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="date" type="date" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="category" placeholder="Category" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="reference" placeholder="Bill / receipt no." className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <Button disabled={saving} className="h-11 rounded-full bg-teal-700 hover:bg-teal-800">Save Accounting Record</Button>
                </form>
              ) : <p className="mt-4 rounded-[8px] bg-amber-50 p-3 text-sm font-semibold text-amber-900">No create access.</p>}
            </div>
            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex justify-between gap-3"><h2 className="text-xl font-black text-slate-950">Accounting records</h2><Button type="button" onClick={() => downloadCsv("vihana-accounting-register.csv", accountingRecords)} disabled={!canExport || !accountingRecords.length} className="h-10 rounded-full bg-amber-400 px-5 font-black text-slate-950 shadow-sm hover:bg-amber-300"><Download className="mr-2 h-4 w-4" />Export</Button></div>
              <div className="mt-4 grid gap-3">
                {pagedAccounting.map((record) => (
                  <div key={record.id} className="flex flex-col justify-between gap-3 rounded-[8px] bg-slate-50 p-4 sm:flex-row sm:items-center">
                    <div><p className="font-black text-slate-950">{record.title || record.type}</p><p className="text-xs text-slate-500">{record.type} | {record.date || "No date"}</p></div>
                    <p className="font-black text-teal-700">{formatCurrency(currencyAmount(record.amount))}</p>
                    {can("accounting:delete") ? <button type="button" onClick={() => deleteAccountingRecord(record.id)} className="inline-flex h-9 items-center rounded-full px-3 text-sm font-bold text-rose-700 hover:bg-rose-50"><Trash2 className="mr-2 h-4 w-4" />Delete</button> : null}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button type="button" variant="outline" className="h-9 rounded-full px-4" disabled={accountingPage === 1} onClick={() => setAccountingPage((page) => Math.max(1, page - 1))}>Previous</Button>
                <p className="text-sm font-bold text-slate-600">Page {accountingPage} of {accountingPageCount}</p>
                <Button type="button" variant="outline" className="h-9 rounded-full px-4" disabled={accountingPage === accountingPageCount} onClick={() => setAccountingPage((page) => Math.min(accountingPageCount, page + 1))}>Next</Button>
              </div>
            </div>
          </section>
        ) : null}

        {tab === "donors" ? (
          <section className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">Create donor user</h2>
              <p className="mt-1 text-sm text-slate-600">This user can only login as donor and view their donor dashboard.</p>
              {can("donors:create") ? (
                <form onSubmit={addDonorUser} className="mt-4 grid gap-3">
                  <input name="name" required placeholder="Full name" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="email" required type="email" placeholder="Email" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="password" required type="password" minLength={8} placeholder="Temporary password" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="phone" placeholder="Phone" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="pan" placeholder="PAN optional" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 uppercase outline-none focus:border-teal-600" />
                  <textarea name="address" rows={2} placeholder="Address optional" className="rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-600" />
                  <Button disabled={saving} className="h-11 rounded-full bg-teal-700 hover:bg-teal-800"><UserPlus className="mr-2 h-4 w-4" />Create Donor User</Button>
                </form>
              ) : <p className="mt-4 rounded-[8px] bg-amber-50 p-3 text-sm font-semibold text-amber-900">No donor creation access.</p>}
            </div>
            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">Donor profiles</h2>
              <div className="mt-4 grid gap-3">
                {pagedDonors.map((donor) => (
                  <div key={donor.id} className="rounded-[8px] bg-slate-50 p-4">
                    <p className="font-black text-slate-950">{donor.name || donor.email}</p>
                    <p className="mt-1 text-sm text-slate-600">{donor.email} {donor.phone ? `| ${donor.phone}` : ""}</p>
                    {can("donors:edit") ? (
                      <details className="mt-3 rounded-[8px] bg-white p-3">
                        <summary className="cursor-pointer text-sm font-black text-teal-700">Update profile / reset password</summary>
                        <form onSubmit={updateDonorUser} className="mt-3 grid gap-2">
                          <input type="hidden" name="id" value={donor.id} />
                          <input name="name" defaultValue={donor.name} required placeholder="Full name" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600" />
                          <input name="email" defaultValue={donor.email} required type="email" placeholder="Email" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600" />
                          <div className="grid gap-2 sm:grid-cols-2">
                            <input name="phone" defaultValue={donor.phone} placeholder="Phone" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600" />
                            <input name="pan" defaultValue={donor.pan} placeholder="PAN" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm uppercase outline-none focus:border-teal-600" />
                          </div>
                          <textarea name="address" defaultValue={donor.address} rows={2} placeholder="Address" className="rounded-[8px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-teal-600" />
                          <input name="password" type="password" minLength={8} placeholder="New temporary password optional" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600" />
                          <Button disabled={saving} className="h-10 rounded-full bg-teal-700 text-sm hover:bg-teal-800">Save Donor</Button>
                        </form>
                      </details>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button type="button" variant="outline" className="h-9 rounded-full px-4" disabled={donorPage === 1} onClick={() => setDonorPage((page) => Math.max(1, page - 1))}>Previous</Button>
                <p className="text-sm font-bold text-slate-600">Page {donorPage} of {donorPageCount}</p>
                <Button type="button" variant="outline" className="h-9 rounded-full px-4" disabled={donorPage === donorPageCount} onClick={() => setDonorPage((page) => Math.min(donorPageCount, page + 1))}>Next</Button>
              </div>
            </div>
          </section>
        ) : null}

        {tab === "users" ? (
          <section className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">Create dashboard user</h2>
              <p className="mt-1 text-sm text-slate-600">This is for internal users, not donors.</p>
              {can("users:create") ? (
                <form onSubmit={addAdminUser} className="mt-4 grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input name="name" required placeholder="Name" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                    <input name="role" placeholder="Role, e.g. Accountant" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                    <input name="email" required type="email" placeholder="Email" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                    <input name="password" required type="password" minLength={8} placeholder="Temporary password" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  </div>
                  <div className="max-h-[420px] overflow-auto rounded-[8px] bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Action-level access</p>
                    <div className="mt-3 grid gap-3">
                      {permissionGroups.map((group) => (
                        <div key={group.title} className="rounded-[8px] bg-white p-3">
                          <p className="font-black text-slate-950">{group.title}</p>
                          <p className="text-xs text-slate-500">{group.description}</p>
                          <div className="mt-2 grid gap-2 sm:grid-cols-2">
                            {group.permissions.map((permission) => (
                              <label key={permission} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <input type="checkbox" name="permissions" value={permission} className="h-4 w-4 accent-teal-700" />
                                {permissionLabels[permission]}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button disabled={saving} className="h-11 rounded-full bg-teal-700 hover:bg-teal-800"><ShieldCheck className="mr-2 h-4 w-4" />Create Dashboard User</Button>
                </form>
              ) : <p className="mt-4 rounded-[8px] bg-amber-50 p-3 text-sm font-semibold text-amber-900">No dashboard user creation access.</p>}
            </div>
            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex justify-between gap-3"><h2 className="text-xl font-black text-slate-950">Dashboard users</h2>{canExport ? <Button type="button" onClick={() => downloadCsv("vihana-admin-users.csv", adminUsers)} className="h-10 rounded-full bg-amber-400 px-5 font-black text-slate-950 shadow-sm hover:bg-amber-300"><Download className="mr-2 h-4 w-4" />Export</Button> : null}</div>
              <div className="mt-4 grid gap-3">
                <div className="rounded-[8px] border border-teal-100 bg-teal-50 p-4"><p className="font-black text-teal-950">Owner Admin</p><p className="text-sm text-teal-800">Master account with all access.</p></div>
                {pagedAdminUsers.map((user) => (
                  <div key={user.id} className="rounded-[8px] bg-slate-50 p-4">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                      <div><p className="font-black text-slate-950">{user.name}</p><p className="text-sm text-slate-600">{user.email} | {user.role || "Dashboard user"}</p><p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-teal-700">{String(user.permissions || "").split(",").map((permission) => permissionLabels[permission as AdminPermission] || permission).join(" / ")}</p></div>
                      {can("users:delete") ? <button type="button" onClick={() => deleteAdminUser(user.id)} className="inline-flex h-9 items-center rounded-full px-3 text-sm font-bold text-rose-700 hover:bg-rose-50"><Trash2 className="mr-2 h-4 w-4" />Remove</button> : null}
                    </div>
                    {can("users:edit") ? (
                      <details className="mt-3 rounded-[8px] bg-white p-3">
                        <summary className="cursor-pointer text-sm font-black text-teal-700">Update user / reset password / permissions</summary>
                        <form onSubmit={updateAdminUser} className="mt-3 grid gap-3">
                          <input type="hidden" name="id" value={user.id} />
                          <div className="grid gap-2 sm:grid-cols-2">
                            <input name="name" defaultValue={user.name} required placeholder="Name" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600" />
                            <input name="role" defaultValue={user.role} placeholder="Role" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600" />
                            <input name="email" defaultValue={user.email} required type="email" placeholder="Email" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600" />
                            <input name="password" type="password" minLength={8} placeholder="New password optional" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600" />
                          </div>
                          <div className="max-h-64 overflow-auto rounded-[8px] bg-slate-50 p-3">
                            {permissionGroups.map((group) => (
                              <div key={group.title} className="mb-3 last:mb-0">
                                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{group.title}</p>
                                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                                  {group.permissions.map((permission) => (
                                    <label key={permission} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                      <input
                                        type="checkbox"
                                        name="permissions"
                                        value={permission}
                                        defaultChecked={String(user.permissions || "").split(",").includes(permission)}
                                        className="h-4 w-4 accent-teal-700"
                                      />
                                      {permissionLabels[permission]}
                                    </label>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button disabled={saving} className="h-10 rounded-full bg-teal-700 text-sm hover:bg-teal-800">Save Dashboard User</Button>
                        </form>
                      </details>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button type="button" variant="outline" className="h-9 rounded-full px-4" disabled={adminUserPage === 1} onClick={() => setAdminUserPage((page) => Math.max(1, page - 1))}>Previous</Button>
                <p className="text-sm font-bold text-slate-600">Page {adminUserPage} of {adminUserPageCount}</p>
                <Button type="button" variant="outline" className="h-9 rounded-full px-4" disabled={adminUserPage === adminUserPageCount} onClick={() => setAdminUserPage((page) => Math.min(adminUserPageCount, page + 1))}>Next</Button>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
