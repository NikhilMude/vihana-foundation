"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  BadgeIndianRupee,
  BarChart3,
  Download,
  KeyRound,
  LayoutDashboard,
  Loader2,
  Plus,
  ReceiptText,
  Search,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { AdminPermission, AdminSession } from "@/lib/adminAuth";

type DonationRecord = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  amount?: string;
  method?: string;
  purpose?: string;
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
  adminUsers: AdminUserRecord[];
  donations: DonationRecord[];
  donors: DonorRecord[];
  accountingRecords: AccountingRecord[];
  allPermissions: AdminPermission[];
};

type OpsTab = "overview" | "donations" | "accounting" | "donors" | "users";

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

export default function AdminOperationsDashboard({
  currentAdmin,
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
    <main className="min-h-screen bg-[#f6f8f7] px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[8px] bg-slate-950 p-5 text-white shadow-xl shadow-slate-900/10 sm:p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">Admin Operations</p>
              <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-bold sm:text-4xl">Operations dashboard</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                Money, receipts, donors, accounting, reports and user access live here. Website editing stays inside CMS.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {canOpenCms ? (
                <Button asChild type="button" className="h-11 rounded-full bg-white px-5 text-slate-950 hover:bg-amber-100">
                  <Link href="/admin/dashboard" target="_blank" rel="noreferrer"><LayoutDashboard className="mr-2 h-4 w-4" />Open CMS</Link>
                </Button>
              ) : null}
              <form action="/api/admin/logout" method="post">
                <Button type="submit" variant="outline" className="h-11 rounded-full border-white/20 bg-transparent px-5 text-white hover:bg-white/10">Logout</Button>
              </form>
            </div>
          </div>
        </header>

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
                    <p className="text-slate-600">{donation.receiptNumber || donation.method || "Recorded"}</p>
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
