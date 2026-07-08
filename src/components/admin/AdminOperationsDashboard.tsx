"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { BadgeIndianRupee, Download, KeyRound, LayoutDashboard, Loader2, ReceiptText, ShieldCheck, Trash2, Users } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { AdminPermission, AdminSession } from "@/lib/adminAuth";

type DonationRecord = {
  id: string;
  name?: string;
  email?: string;
  amount?: string;
  method?: string;
  receiptNumber?: string;
  createdAt?: string;
};

type DonorRecord = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
};

type AccountingRecord = {
  id: string;
  type?: string;
  title?: string;
  amount?: string;
  date?: string;
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

const permissionLabels: Record<AdminPermission, string> = {
  overview: "CMS dashboard",
  pageStudio: "CMS page studio",
  content: "Website text",
  email: "Email templates",
  media: "Images",
  navigation: "Menu & social",
  order: "Homepage order",
  sections: "Section cards",
  pages: "Website pages",
  gallery: "Gallery",
  messages: "Messages",
  donations: "Donations",
  accounting: "Accounting",
  donors: "Donor accounts",
  users: "Admin users",
  subscribers: "Newsletter",
  visitors: "Visitors",
};

function currencyAmount(value?: string) {
  return Number(String(value || "").replace(/[^\d.]/g, "")) || 0;
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

export default function AdminOperationsDashboard({
  currentAdmin,
  adminUsers: initialAdminUsers,
  donations: initialDonations,
  donors,
  accountingRecords: initialAccountingRecords,
  allPermissions,
}: AdminOperationsDashboardProps) {
  const [adminUsers, setAdminUsers] = useState(initialAdminUsers);
  const [donations, setDonations] = useState(initialDonations);
  const [accountingRecords, setAccountingRecords] = useState(initialAccountingRecords);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [donationPage, setDonationPage] = useState(1);
  const canManageUsers = currentAdmin.owner || currentAdmin.permissions.includes("users");
  const canManageDonations = currentAdmin.owner || currentAdmin.permissions.includes("donations");
  const canManageAccounting = currentAdmin.owner || currentAdmin.permissions.includes("accounting");
  const canOpenCms = currentAdmin.owner || currentAdmin.permissions.some((permission) =>
    ["overview", "pageStudio", "content", "media", "navigation", "order", "sections", "pages", "gallery", "email"].includes(permission)
  );
  const visiblePermissions = allPermissions.filter((permission) => permission !== "overview");
  const totalReceived = useMemo(() => donations.reduce((sum, donation) => sum + currencyAmount(donation.amount), 0), [donations]);
  const totalExpenses = useMemo(
    () =>
      accountingRecords
        .filter((record) => (record.type || "").toLowerCase().includes("expense") || (record.type || "").toLowerCase().includes("bill"))
        .reduce((sum, record) => sum + currencyAmount(record.amount), 0),
    [accountingRecords]
  );
  const donationPageSize = 6;
  const donationPageCount = Math.max(1, Math.ceil(donations.length / donationPageSize));
  const pagedDonations = donations.slice((donationPage - 1) * donationPageSize, donationPage * donationPageSize);

  async function addCashDonation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("Recording donation...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        amount: String(formData.get("amount") || ""),
        method: String(formData.get("method") || "Cash"),
        transactionId: String(formData.get("transactionId") || ""),
        purpose: String(formData.get("purpose") || ""),
        pan: String(formData.get("pan") || ""),
        address: String(formData.get("address") || ""),
        receiptRequired: "Yes",
      }),
    });
    const result = (await response.json()) as { ok: boolean; donation?: DonationRecord; accountingRecord?: AccountingRecord; message?: string };
    setSaving(false);

    if (!response.ok || !result.donation) {
      setStatus(result.message || "Could not record donation.");
      return;
    }

    setDonations((records) => [result.donation as DonationRecord, ...records]);
    if (result.accountingRecord) {
      setAccountingRecords((records) => [result.accountingRecord as AccountingRecord, ...records]);
    }
    setDonationPage(1);
    form.reset();
    setStatus(`Donation recorded. Receipt ${result.donation.receiptNumber || "generated"} is ready.`);
  }

  async function addAdminUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("Creating user...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const permissions = formData.getAll("permissions").map(String);
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || ""),
        role: String(formData.get("role") || ""),
        permissions,
      }),
    });
    const result = (await response.json()) as { ok: boolean; user?: AdminUserRecord; message?: string };
    setSaving(false);

    if (!response.ok || !result.user) {
      setStatus(result.message || "Could not create user.");
      return;
    }

    setAdminUsers((users) => [result.user as AdminUserRecord, ...users]);
    form.reset();
    setStatus("Admin user created.");
  }

  async function deleteAdminUser(id: string) {
    if (!window.confirm("Remove this admin user?")) {
      return;
    }

    const response = await fetch(`/api/admin/users?id=${encodeURIComponent(id)}`, { method: "DELETE" });

    if (response.ok) {
      setAdminUsers((users) => users.filter((user) => user.id !== id));
      setStatus("Admin user removed.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-600">Admin Operations</p>
              <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-bold text-slate-950 sm:text-4xl">
                Welcome, {currentAdmin.name}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Manage received funds, donors, accounting records and internal access separately from the website CMS.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {canOpenCms ? (
                <Button asChild type="button" className="h-11 rounded-full bg-teal-700 px-5 hover:bg-teal-800">
                  <Link href="/admin/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Open Website CMS
                  </Link>
                </Button>
              ) : null}
              <form action="/api/admin/logout" method="post">
                <Button type="submit" variant="outline" className="h-11 rounded-full px-5">
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </header>

        {status ? <div className="mt-4 rounded-[8px] bg-teal-50 px-4 py-3 text-sm font-bold text-teal-900">{status}</div> : null}

        <section className="mt-5 grid gap-4 md:grid-cols-4">
          {([
            ["Received", `INR ${totalReceived.toLocaleString("en-IN")}`, BadgeIndianRupee],
            ["Expenses", `INR ${totalExpenses.toLocaleString("en-IN")}`, ReceiptText],
            ["Donors", donors.length, Users],
            ["Admin users", adminUsers.length + 1, ShieldCheck],
          ] as const).map(([label, value, Icon]) => (
            <div key={String(label)} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="h-5 w-5 text-teal-700" />
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{String(label)}</p>
              <p className="mt-2 text-2xl font-black text-slate-950">{String(value)}</p>
            </div>
          ))}
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">Record donation</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">Capture cash or offline payment and generate a receipt.</p>
            {canManageDonations ? (
              <form onSubmit={addCashDonation} className="mt-4 grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="name" required placeholder="Donor name" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="amount" required inputMode="numeric" placeholder="Amount" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="email" type="email" placeholder="Email optional" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="phone" placeholder="Phone optional" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <select name="method" defaultValue="Cash" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600">
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Bank Transfer</option>
                    <option>Cheque</option>
                  </select>
                  <input name="purpose" placeholder="Purpose" defaultValue="General Fund" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="transactionId" placeholder="Reference optional" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="pan" placeholder="PAN optional" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 uppercase outline-none focus:border-teal-600" />
                  <textarea name="address" rows={2} placeholder="Address for receipt optional" className="rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-600 sm:col-span-2" />
                </div>
                <Button disabled={saving} className="h-11 rounded-full bg-teal-700 hover:bg-teal-800">
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ReceiptText className="mr-2 h-4 w-4" />}
                  Save & Generate Receipt
                </Button>
              </form>
            ) : (
              <div className="mt-4 rounded-[8px] bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
                Your account does not have donation entry access.
              </div>
            )}
          </div>

          <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-black text-slate-950">Donations & receipts</h2>
                <p className="mt-1 text-sm text-slate-600">Showing {pagedDonations.length} of {donations.length} records.</p>
              </div>
              <Button type="button" variant="outline" onClick={() => downloadCsv("vihana-donation-report.csv", donations)} className="h-10 rounded-full" disabled={!donations.length}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            <div className="mt-4 grid gap-3">
              {pagedDonations.length ? (
                pagedDonations.map((donation) => (
                  <div key={donation.id} className="grid gap-2 rounded-[8px] bg-slate-50 px-4 py-3 text-sm md:grid-cols-[1fr_120px_1fr_auto] md:items-center">
                    <div>
                      <p className="font-black text-slate-950">{donation.name || donation.email || "Donor"}</p>
                      <p className="text-xs text-slate-500">{donation.email || donation.createdAt || "No email"}</p>
                    </div>
                    <p className="font-black text-teal-700">INR {donation.amount || "0"}</p>
                    <p className="text-slate-600">{donation.receiptNumber || donation.method || "Recorded"}</p>
                    <Button asChild type="button" variant="outline" className="h-9 rounded-full px-4 text-xs">
                      <a href={`/api/donor/receipt?id=${encodeURIComponent(donation.id)}`}>PDF</a>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="rounded-[8px] border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600">No donation records yet.</div>
              )}
            </div>
            {donationPageCount > 1 ? (
              <div className="mt-4 flex items-center justify-between">
                <Button type="button" variant="outline" className="h-9 rounded-full px-4" disabled={donationPage === 1} onClick={() => setDonationPage((page) => Math.max(1, page - 1))}>
                  Previous
                </Button>
                <p className="text-sm font-bold text-slate-600">Page {donationPage} of {donationPageCount}</p>
                <Button type="button" variant="outline" className="h-9 rounded-full px-4" disabled={donationPage === donationPageCount} onClick={() => setDonationPage((page) => Math.min(donationPageCount, page + 1))}>
                  Next
                </Button>
              </div>
            ) : null}
          </div>
        </section>

        {canManageAccounting ? (
          <section className="mt-5 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-black text-slate-950">Accounting summary</h2>
                <p className="mt-1 text-sm text-slate-600">Receipts and expenses are handled here, outside CMS.</p>
              </div>
              <Button type="button" variant="outline" onClick={() => downloadCsv("vihana-accounting-register.csv", accountingRecords)} className="h-10 rounded-full" disabled={!accountingRecords.length}>
                <Download className="mr-2 h-4 w-4" />
                Export Accounting
              </Button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {accountingRecords.slice(0, 8).map((record) => (
                <div key={record.id} className="rounded-[8px] bg-slate-50 px-4 py-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <p className="font-black text-slate-950">{record.title || record.type || "Record"}</p>
                    <p className="font-black text-teal-700">INR {record.amount || "0"}</p>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{record.type || "Record"} | {record.date || "No date"}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <KeyRound className="mt-1 h-5 w-5 text-teal-700" />
              <div>
                <h2 className="text-xl font-black text-slate-950">Create dashboard user</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Give each person only the modules they need. Keep the owner password private.
                </p>
              </div>
            </div>

            {canManageUsers ? (
              <form onSubmit={addAdminUser} className="mt-5 grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="name" required placeholder="Name" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="role" placeholder="Role, e.g. Accountant" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="email" required type="email" placeholder="Email" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                  <input name="password" required type="password" minLength={8} placeholder="Temporary password" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
                </div>
                <div className="rounded-[8px] bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Module access</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {visiblePermissions.map((permission) => (
                      <label key={permission} className="flex items-center gap-2 rounded-[8px] bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                        <input type="checkbox" name="permissions" value={permission} className="h-4 w-4 accent-teal-700" />
                        {permissionLabels[permission]}
                      </label>
                    ))}
                  </div>
                </div>
                <Button disabled={saving} className="h-11 rounded-full bg-teal-700 hover:bg-teal-800">
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
                  Create User
                </Button>
              </form>
            ) : (
              <div className="mt-5 rounded-[8px] bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
                Your account can view operations, but cannot create or remove dashboard users.
              </div>
            )}
          </div>

          <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-black text-slate-950">Dashboard users</h2>
                <p className="mt-1 text-sm text-slate-600">Owner plus created users with selected modules.</p>
              </div>
              <Button type="button" variant="outline" onClick={() => downloadCsv("vihana-admin-users.csv", adminUsers)} className="h-10 rounded-full">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[8px] border border-teal-100 bg-teal-50 p-4">
                <div className="flex justify-between gap-3">
                  <div>
                    <h3 className="font-black text-teal-950">Owner Admin</h3>
                    <p className="mt-1 text-sm text-teal-800">Master account with all modules.</p>
                  </div>
                  <span className="h-fit rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-teal-700">Owner</span>
                </div>
              </div>
              {adminUsers.map((user) => (
                <div key={user.id} className="rounded-[8px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <h3 className="font-black text-slate-950">{user.name}</h3>
                      <p className="mt-1 text-sm text-slate-600">{user.email} | {user.role || "Admin"}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-teal-700">
                        {String(user.permissions || "")
                          .split(",")
                          .map((permission) => permissionLabels[permission as AdminPermission] || permission)
                          .join(" / ")}
                      </p>
                    </div>
                    {canManageUsers ? (
                      <button type="button" onClick={() => deleteAdminUser(user.id)} className="inline-flex h-10 items-center rounded-full px-4 text-sm font-bold text-rose-700 hover:bg-rose-50">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
