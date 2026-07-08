"use client";

import { FormEvent, useMemo, useState } from "react";
import { BadgeCheck, Download, HeartHandshake, Info, Loader2, LogIn, LogOut, ReceiptText, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/Button";

type Donor = {
  name: string;
  email: string;
  phone: string;
  donorType: string;
  pan: string;
  address: string;
};

type Donation = {
  id: string;
  amount?: string;
  method?: string;
  transactionId?: string;
  donorType?: string;
  frequency?: string;
  purpose?: string;
  receiptRequired?: string;
  receiptNumber?: string;
  receiptStatus?: string;
  receiptIssuedAt?: string;
  status?: string;
  createdAt?: string;
};

type DonorPortalProps = {
  donor: Donor | null;
  donations: Donation[];
};

function toNumber(value?: string) {
  return Number(String(value || "").replace(/[^\d.]/g, "")) || 0;
}

function formatDate(value?: string) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function downloadCsv(filename: string, rows: Record<string, string | number | undefined>[]) {
  const headers = Object.keys(rows[0] || { empty: "" });
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => `"${String(row[header] ?? "").replace(/"/g, '""')}"`)
        .join(",")
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function DonorPortal({ donor, donations }: DonorPortalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [foreignNotice, setForeignNotice] = useState("");
  const [donationPage, setDonationPage] = useState(1);
  const total = useMemo(() => donations.reduce((sum, item) => sum + toNumber(item.amount), 0), [donations]);
  const receiptsRequested = useMemo(() => donations.filter((item) => item.receiptRequired === "Yes").length, [donations]);
  const donationPageSize = 4;
  const donationPageCount = Math.max(1, Math.ceil(donations.length / donationPageSize));
  const pagedDonations = donations.slice((donationPage - 1) * donationPageSize, donationPage * donationPageSize);

  async function submitAuth(event: FormEvent<HTMLFormElement>, endpoint: string) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    const result = (await response.json()) as { ok: boolean; message?: string; redirectTo?: string };
    setLoading(false);

    if (!response.ok || !result.ok) {
      setStatus(result.message || "Please try again.");
      return;
    }

    window.location.href = result.redirectTo || "/donor";
  }

  async function logout() {
    await fetch("/api/donor/logout", { method: "POST" });
    window.location.href = "/donor";
  }

  async function updateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/donor/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    const result = (await response.json()) as { ok: boolean; message?: string };
    setLoading(false);

    if (!response.ok || !result.ok) {
      setStatus(result.message || "Could not update profile.");
      return;
    }

    setStatus("Profile updated.");
    form.reset();
    window.setTimeout(() => window.location.reload(), 700);
  }

  if (donor) {
    return (
      <div className="grid gap-3 lg:grid-cols-[0.85fr_1.15fr] lg:gap-5">
        <section className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600 sm:text-xs sm:tracking-[0.22em]">Donor Account</p>
              <h1 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl font-bold capitalize leading-tight text-slate-950 sm:mt-2 sm:text-4xl">
                {donor.name}
              </h1>
            </div>
            <Button type="button" variant="outline" onClick={logout} className="h-9 rounded-full px-3 text-xs sm:h-10 sm:text-sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="mt-3 rounded-[8px] bg-[linear-gradient(135deg,#ecfeff,#fff7ed)] p-3 sm:mt-5 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 sm:h-5 sm:w-5" />
              <p className="text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">
                Your donor profile is connected to donation pledges submitted with this email.
              </p>
            </div>
          </div>

          <div className="mt-3 grid gap-2 text-xs leading-5 text-slate-600 sm:mt-5 sm:gap-3 sm:text-sm sm:leading-6">
            {[
              ["Email", donor.email],
              ["Phone", donor.phone || "Not added"],
              ["Type", donor.donorType || "Indian Citizen"],
              ["PAN", donor.pan || "Not added"],
              ["Address", donor.address || "Not added"],
            ].map(([label, value]) => (
              <p key={label} className="rounded-[8px] bg-slate-50 px-3 py-2 sm:px-4 sm:py-3">
                <span className="font-bold text-slate-900">{label}:</span> {value}
              </p>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
            <div className="rounded-[8px] bg-teal-50 p-3 sm:p-4">
              <p className="text-lg font-black text-teal-700 sm:text-2xl">INR {total.toLocaleString("en-IN")}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">Total</p>
            </div>
            <div className="rounded-[8px] bg-amber-50 p-3 sm:p-4">
              <p className="text-lg font-black text-amber-700 sm:text-2xl">{donations.length}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">Gifts</p>
            </div>
            <div className="rounded-[8px] bg-sky-50 p-3 sm:p-4">
              <p className="text-lg font-black text-sky-700 sm:text-2xl">{receiptsRequested}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">Receipts</p>
            </div>
          </div>

          <form onSubmit={updateProfile} className="mt-3 grid gap-2 rounded-[8px] border border-slate-200 bg-slate-50 p-3 sm:mt-5 sm:gap-3 sm:p-4">
            <div>
              <p className="text-sm font-black text-slate-950">Update profile</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Change receipt details or set a new password.</p>
            </div>
            <input name="name" defaultValue={donor.name} required placeholder="Full name" className="h-10 rounded-[8px] border border-slate-200 bg-white px-3 text-sm outline-none focus:border-teal-600" />
            <input name="phone" defaultValue={donor.phone} placeholder="Phone" className="h-10 rounded-[8px] border border-slate-200 bg-white px-3 text-sm outline-none focus:border-teal-600" />
            <input name="pan" defaultValue={donor.pan} placeholder="PAN optional" className="h-10 rounded-[8px] border border-slate-200 bg-white px-3 text-sm uppercase outline-none focus:border-teal-600" />
            <textarea name="address" defaultValue={donor.address} rows={2} placeholder="Address for receipt records" className="rounded-[8px] border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600" />
            <div className="grid gap-2 sm:grid-cols-2">
              <input name="currentPassword" type="password" placeholder="Current password" className="h-10 rounded-[8px] border border-slate-200 bg-white px-3 text-sm outline-none focus:border-teal-600" />
              <input name="newPassword" type="password" minLength={8} placeholder="New password optional" className="h-10 rounded-[8px] border border-slate-200 bg-white px-3 text-sm outline-none focus:border-teal-600" />
            </div>
            {status ? <p className="rounded-[8px] bg-white px-3 py-2 text-xs font-bold text-teal-800">{status}</p> : null}
            <Button disabled={loading} className="h-10 rounded-full bg-teal-700 text-sm hover:bg-teal-800">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save Profile
            </Button>
          </form>
        </section>

        <section className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600 sm:text-xs sm:tracking-[0.22em]">Donation History</p>
              <h2 className="mt-1 text-xl font-bold text-slate-950 sm:mt-2 sm:text-2xl">Donation dashboard</h2>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => downloadCsv("vihana-donor-transactions.csv", donations)}
              className="h-9 rounded-full px-4 text-xs sm:h-10 sm:text-sm"
              disabled={!donations.length}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          <div className="mt-3 grid gap-2 sm:mt-5 sm:gap-3">
            {pagedDonations.length ? (
              pagedDonations.map((donation) => (
                <div key={donation.id} className="rounded-[8px] border border-slate-200 bg-slate-50 p-3 transition hover:border-teal-200 hover:bg-white hover:shadow-sm">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="flex items-center gap-2 font-bold text-slate-950">
                        <ReceiptText className="h-4 w-4 text-teal-700" />
                        INR {Number(toNumber(donation.amount)).toLocaleString("en-IN")}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500 sm:mt-1 sm:text-sm">{donation.purpose || "General Fund"} | {donation.frequency || "One Time"}</p>
                    </div>
                    <Button asChild type="button" className="h-9 rounded-full bg-amber-400 px-4 text-xs font-black text-slate-950 hover:bg-amber-300">
                      <a href={`/api/donor/receipt?id=${encodeURIComponent(donation.id)}`}>
                        <Download className="mr-2 h-4 w-4" />
                        Receipt PDF
                      </a>
                    </Button>
                  </div>
                  <div className="mt-3 grid gap-2 rounded-[8px] bg-white p-3 text-xs text-slate-600 sm:grid-cols-2">
                    <p><span className="font-bold text-slate-800">Receipt:</span> {donation.receiptNumber || "Pending"}</p>
                    <p><span className="font-bold text-slate-800">Status:</span> {donation.status || donation.receiptStatus || "Recorded"}</p>
                    <p><span className="font-bold text-slate-800">Method:</span> {donation.method || "Not recorded"}</p>
                    <p><span className="font-bold text-slate-800">Date:</span> {formatDate(donation.createdAt)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[8px] border border-dashed border-slate-300 p-5 text-center text-sm text-slate-600 sm:p-8">
                No donations are linked to your account yet.
              </div>
            )}
          </div>
          {donationPageCount > 1 ? (
            <div className="mt-4 flex items-center justify-between gap-3">
              <Button type="button" variant="outline" className="h-9 rounded-full px-4 text-xs" disabled={donationPage === 1} onClick={() => setDonationPage((page) => Math.max(1, page - 1))}>
                Previous
              </Button>
              <p className="text-xs font-bold text-slate-500">Page {donationPage} of {donationPageCount}</p>
              <Button type="button" variant="outline" className="h-9 rounded-full px-4 text-xs" disabled={donationPage === donationPageCount} onClick={() => setDonationPage((page) => Math.min(donationPageCount, page + 1))}>
                Next
              </Button>
            </div>
          ) : null}
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-3 lg:grid-cols-[0.8fr_1.2fr] lg:gap-6">
      <section className="rounded-[8px] bg-slate-950 p-4 text-white shadow-xl shadow-slate-900/15 sm:p-8">
        <HeartHandshake className="h-8 w-8 text-amber-300 sm:h-10 sm:w-10" />
        <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold leading-tight sm:mt-5 sm:text-5xl">
          Donor account
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-300 sm:mt-4 sm:text-base sm:leading-7">
          Create an account to keep your donation history, download records and prepare receipt information in one place.
        </p>
      </section>

      <section className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid grid-cols-2 rounded-[8px] bg-slate-100 p-1">
          <button type="button" onClick={() => setMode("login")} className={`h-10 rounded-[8px] text-sm font-bold ${mode === "login" ? "bg-white text-teal-700 shadow-sm" : "text-slate-600"}`}>
            Login
          </button>
          <button type="button" onClick={() => setMode("register")} className={`h-10 rounded-[8px] text-sm font-bold ${mode === "register" ? "bg-white text-teal-700 shadow-sm" : "text-slate-600"}`}>
            Create Account
          </button>
        </div>

        <form onSubmit={(event) => submitAuth(event, mode === "register" ? "/api/donor/register" : "/api/session/login")} className="mt-4 grid gap-2.5 sm:mt-5 sm:gap-3">
          {mode === "register" ? (
            <>
              <input name="name" required placeholder="Full name" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
              <input name="phone" placeholder="Phone" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
              <input type="hidden" name="donorType" value="Indian Citizen" />
              <div className="rounded-[8px] border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-900 sm:px-4 sm:py-3 sm:text-sm">
                Indian citizen donor account
              </div>
              <button
                type="button"
                onClick={() => setForeignNotice("Foreign citizen / OCI donor accounts are currently unavailable while compliance and payment setup is being updated. Please contact Vihana Foundation for volunteering, partnership, or non-financial support.")}
                className="rounded-[8px] border border-amber-200 bg-amber-50 px-3 py-2 text-left text-xs font-bold text-amber-900 transition hover:bg-amber-100 sm:px-4 sm:py-3 sm:text-sm"
              >
                Foreign citizen / OCI supporter?
              </button>
              {foreignNotice ? (
                <div className="flex items-start gap-2 rounded-[8px] bg-rose-50 px-3 py-2 text-xs font-semibold leading-5 text-rose-900 sm:gap-3 sm:px-4 sm:py-3 sm:text-sm sm:leading-6">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                  {foreignNotice}
                </div>
              ) : null}
              <input name="pan" placeholder="PAN (optional)" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
              <textarea name="address" rows={2} placeholder="Address for receipt records" className="rounded-[8px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-teal-600 sm:px-4 sm:py-3 sm:text-base" />
            </>
          ) : null}
          <input name="email" required={mode === "register"} type="text" placeholder="Email" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
          <input name="password" required type="password" minLength={mode === "register" ? 8 : 1} placeholder="Password" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />

          {status ? <p className="rounded-[8px] bg-rose-50 px-4 py-3 text-sm font-bold text-rose-800">{status}</p> : null}

          <Button disabled={loading} className="h-11 rounded-full bg-teal-700 text-sm hover:bg-teal-800 sm:h-12 sm:text-base">
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : mode === "register" ? <UserPlus className="mr-2 h-5 w-5" /> : <LogIn className="mr-2 h-5 w-5" />}
            {mode === "register" ? "Create Donor Account" : "Login"}
          </Button>
        </form>
      </section>
    </div>
  );
}
