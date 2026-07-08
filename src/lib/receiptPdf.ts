import { SiteContent } from "@/lib/cmsContent";

type ReceiptDonation = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  amount?: string;
  method?: string;
  transactionId?: string;
  frequency?: string;
  purpose?: string;
  pan?: string;
  address?: string;
  receiptNumber?: string;
  receiptStatus?: string;
  receiptIssuedAt?: string;
  createdAt?: string;
};

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

function pdfEscape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(value: string, maxLength = 82) {
  const words = value.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    if (`${line} ${word}`.trim().length > maxLength) {
      if (line) {
        lines.push(line);
      }
      line = word;
      return;
    }

    line = `${line} ${word}`.trim();
  });

  if (line) {
    lines.push(line);
  }

  return lines;
}

function textLine(x: number, y: number, size: number, text: string, font = "F1") {
  return `BT /${font} ${size} Tf ${x} ${y} Td (${pdfEscape(text)}) Tj ET`;
}

function hexToRgb(value: string, fallback: string) {
  const hex = /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
  const bigint = Number.parseInt(hex.slice(1), 16);

  return [((bigint >> 16) & 255) / 255, ((bigint >> 8) & 255) / 255, (bigint & 255) / 255];
}

function fillColor(value: string, fallback = "#0f766e") {
  return `${hexToRgb(value, fallback).map((item) => item.toFixed(3)).join(" ")} rg`;
}

function circlePath(cx: number, cy: number, r: number) {
  const c = r * 0.5522847498;

  return `${cx + r} ${cy} m ${cx + r} ${cy + c} ${cx + c} ${cy + r} ${cx} ${cy + r} c ${cx - c} ${cy + r} ${cx - r} ${cy + c} ${cx - r} ${cy} c ${cx - r} ${cy - c} ${cx - c} ${cy - r} ${cx} ${cy - r} c ${cx + c} ${cy - r} ${cx + r} ${cy - c} ${cx + r} ${cy} c`;
}

export function createReceiptPdf(content: SiteContent, donation: ReceiptDonation) {
  const receiptNumber = donation.receiptNumber || donation.id || "Pending";
  const receiptDate = formatDate(donation.receiptIssuedAt || donation.createdAt);
  const donorRows = [
    ["Donor Name", donation.name || "Not available"],
    ["Email", donation.email || "Not available"],
    ["Phone", donation.phone || "Not added"],
    ["PAN", donation.pan || "Not added"],
    ["Address", donation.address || "Not added"],
  ];
  const donationRows = [
    ["Receipt Number", receiptNumber],
    ["Receipt Status", donation.receiptStatus || "Provisional receipt generated"],
    ["Receipt Date", receiptDate],
    ["Amount", `INR ${donation.amount || "0"}`],
    ["Purpose", donation.purpose || "General Fund"],
    ["Frequency", donation.frequency || "One Time"],
    ["Payment Method", donation.method || "Not recorded"],
    ["Transaction Reference", donation.transactionId || "Not recorded"],
  ];
  const foundationRows = [
    ["Foundation", content.brandName || "Vihana Foundation"],
    ["Tagline", content.brandTagline || "Small Steps. Lifelong Impact."],
    ["Email", content.contactEmail || "contact@vihanafoundation.org"],
    ["Phone", content.contactPhone || "Not added"],
    ["UPI", content.upiId || "Not added"],
    ["Bank", content.bankName || "Not added"],
    ["Account", content.bankAccountNumber || "Not added"],
    ["IFSC", content.bankIfsc || "Not added"],
    ["PAN", content.panNumber || "Not added"],
    ["Legal status", content.legalStatusNote || "Legal details pending verification"],
  ];
  const primaryColor = content.logoMarkColor || content.brandPrimaryColor || "#0f766e";
  const accentColor = content.logoAccentColor || content.brandSecondaryColor || "#fbbf24";
  const commands: string[] = [
    "0.96 0.98 0.98 rg 0 0 595 842 re f",
    "1 1 1 rg 44 748 507 58 re f",
    "0.85 0.89 0.92 RG 44 748 507 58 re S",
    `${fillColor(primaryColor)} 44 748 507 4 re f`,
    "1 1 1 rg",
    `${fillColor(primaryColor)} 60 765 30 30 re f`,
    `${fillColor(accentColor)} ${circlePath(75, 789, 3.2)} f`,
    "1 1 1 rg",
    textLine(67, 774, 10, "VF", "F2"),
    fillColor(content.logoTextColor || content.brandTextColor || "#020617", "#020617"),
    textLine(102, 783, 16, content.brandName || "Vihana Foundation", "F2"),
    fillColor(content.logoTaglineColor || primaryColor, primaryColor),
    textLine(102, 769, 8, content.brandTagline || "Small Steps. Lifelong Impact."),
    fillColor(primaryColor),
    textLine(418, 783, 8, "RECEIPT", "F2"),
    fillColor(content.brandTextColor || "#020617", "#020617"),
    textLine(418, 769, 10, receiptNumber, "F2"),
    fillColor(primaryColor),
    textLine(52, 710, 28, content.receiptTitle || "Donation Receipt", "F2"),
    textLine(52, 686, 12, content.receiptSubtitle || "Acknowledgement for your contribution"),
    "1 1 1 rg 44 54 507 610 re f",
    "0.85 0.89 0.92 RG 44 54 507 610 re S",
    "0.93 0.99 0.97 rg 64 612 467 54 re f",
    "0.70 0.91 0.86 RG 64 612 467 54 re S",
    "0.02 0.48 0.44 rg",
    textLine(82, 646, 9, "AMOUNT RECEIVED", "F2"),
    textLine(82, 624, 20, `INR ${donation.amount || "0"}`, "F2"),
    "0.02 0.04 0.12 rg",
    textLine(310, 646, 9, "FOR", "F2"),
    textLine(310, 624, 13, donation.purpose || "General Fund", "F2"),
    "0.02 0.04 0.12 rg",
    textLine(64, 580, 12, "Donor Details", "F2"),
    textLine(304, 580, 12, "Donation Details", "F2"),
  ];

  let donorY = 552;
  donorRows.forEach(([label, value]) => {
    commands.push("0.38 0.45 0.55 rg");
    commands.push(textLine(64, donorY, 8, label.toUpperCase(), "F2"));
    commands.push("0.02 0.04 0.12 rg");
    wrapText(value, 34).forEach((line, index) => {
      commands.push(textLine(64, donorY - 15 - index * 12, 9, line));
    });
    donorY -= Math.max(34, wrapText(value, 34).length * 12 + 22);
  });

  let donationY = 552;
  donationRows.forEach(([label, value]) => {
    commands.push("0.38 0.45 0.55 rg");
    commands.push(textLine(304, donationY, 8, label.toUpperCase(), "F2"));
    commands.push("0.02 0.04 0.12 rg");
    wrapText(value, 32).forEach((line, index) => {
      commands.push(textLine(304, donationY - 15 - index * 12, 9, line));
    });
    donationY -= Math.max(34, wrapText(value, 32).length * 12 + 22);
  });

  commands.push("0.98 0.96 0.89 rg 64 144 467 142 re f");
  commands.push("0.94 0.72 0.23 RG 64 144 467 142 re S");
  commands.push("0.02 0.04 0.12 rg");
  commands.push(textLine(82, 262, 10, "Foundation Details", "F2"));
  let leftFoundationY = 242;
  foundationRows.slice(0, 5).forEach(([label, value]) => {
    const lines = wrapText(`${label}: ${value}`, 36);
    lines.slice(0, 2).forEach((line, index) => {
      commands.push(textLine(82, leftFoundationY - index * 11, 8, line));
    });
    leftFoundationY -= Math.max(16, lines.slice(0, 2).length * 11 + 5);
  });
  let rightFoundationY = 242;
  foundationRows.slice(5).forEach(([label, value]) => {
    const lines = wrapText(`${label}: ${value}`, 38);
    lines.slice(0, 3).forEach((line, index) => {
      commands.push(textLine(304, rightFoundationY - index * 11, 8, line));
    });
    rightFoundationY -= Math.max(16, lines.slice(0, 3).length * 11 + 5);
  });

  let noteY = 122;
  commands.push("0.38 0.45 0.55 rg");
  wrapText(content.receiptLegalNote || "", 92).slice(0, 3).forEach((line) => {
    commands.push(textLine(64, noteY, 8, line));
    noteY -= 11;
  });

  commands.push("0.02 0.48 0.44 rg");
  commands.push(textLine(64, 78, 10, content.receiptFooterNote || "Thank you for supporting Vihana Foundation.", "F2"));
  commands.push("0.02 0.04 0.12 rg");
  commands.push(textLine(390, 78, 10, content.receiptSignatureName || "Vihana Foundation", "F2"));
  commands.push(textLine(390, 62, 8, "Authorized acknowledgement"));

  const stream = commands.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${offset.toString().padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, "utf8");
}
