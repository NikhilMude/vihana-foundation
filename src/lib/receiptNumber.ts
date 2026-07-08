import { SiteContent } from "@/lib/cmsContent";

function financialYearLabel(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const start = month >= 4 ? year : year - 1;
  const end = start + 1;

  return `FY${String(start).slice(-2)}-${String(end).slice(-2)}`;
}

function yearLabel(format: string, date: Date) {
  if (format === "none") {
    return "";
  }

  if (format === "calendar-short") {
    return String(date.getFullYear()).slice(-2);
  }

  if (format === "financial") {
    return financialYearLabel(date);
  }

  return String(date.getFullYear());
}

function numericPart(receiptNumber: string) {
  const match = receiptNumber.match(/(\d+)(?!.*\d)/);
  return match ? Number(match[1]) : 0;
}

export function generateReceiptNumber(content: SiteContent, existingReceiptNumbers: string[] = [], date = new Date()) {
  const prefix = (content.receiptNumberPrefix || "VF").trim().replace(/\s+/g, "").toUpperCase();
  const separator = (content.receiptNumberSeparator || "/").trim().slice(0, 3) || "/";
  const year = yearLabel(content.receiptNumberYearFormat || "financial", date);
  const padding = Math.min(Math.max(Number(content.receiptNumberPadding || 4), 2), 8);
  const start = Math.max(Number(content.receiptNumberStart || 1), 1);
  const matchingPrefix = [prefix, year].filter(Boolean).join(separator);
  const highest = existingReceiptNumbers
    .filter((receiptNumber) => !matchingPrefix || receiptNumber.startsWith(matchingPrefix))
    .reduce((max, receiptNumber) => Math.max(max, numericPart(receiptNumber)), start - 1);
  const next = String(highest + 1).padStart(padding, "0");

  return [prefix, year, next].filter(Boolean).join(separator);
}
