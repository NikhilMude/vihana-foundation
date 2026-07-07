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

export function createReceiptPdf(content: SiteContent, donation: ReceiptDonation) {
  const receiptNumber = donation.receiptNumber || donation.id || "Pending";
  const rows = [
    ["Receipt Number", receiptNumber],
    ["Receipt Status", donation.receiptStatus || "Provisional receipt generated"],
    ["Receipt Date", formatDate(donation.receiptIssuedAt || donation.createdAt)],
    ["Donor Name", donation.name || "Not available"],
    ["Email", donation.email || "Not available"],
    ["Phone", donation.phone || "Not added"],
    ["PAN", donation.pan || "Not added"],
    ["Address", donation.address || "Not added"],
    ["Amount", `INR ${donation.amount || "0"}`],
    ["Purpose", donation.purpose || "General Fund"],
    ["Frequency", donation.frequency || "One Time"],
    ["Payment Method", donation.method || "Not recorded"],
    ["Transaction Reference", donation.transactionId || "Not recorded"],
  ];
  const commands: string[] = [
    "0.96 0.98 0.98 rg 0 0 595 842 re f",
    "0.02 0.48 0.44 rg 0 792 595 50 re f",
    textLine(52, 805, 18, `${content.brandName} ${content.brandTagline}`, "F2"),
    textLine(52, 742, 28, content.receiptTitle || "Donation Receipt", "F2"),
    textLine(52, 718, 12, content.receiptSubtitle || "Provisional acknowledgement"),
    textLine(398, 742, 10, `Receipt`, "F2"),
    textLine(398, 724, 12, receiptNumber, "F2"),
    "1 1 1 rg 44 96 507 590 re f",
    "0.85 0.89 0.92 RG 44 96 507 590 re S",
  ];

  let y = 660;
  rows.forEach(([label, value]) => {
    commands.push(textLine(64, y, 10, label, "F2"));
    wrapText(value, 58).forEach((line, index) => {
      commands.push(textLine(210, y - index * 14, 10, line));
    });
    y -= Math.max(24, wrapText(value, 58).length * 14 + 10);
  });

  y -= 6;
  wrapText(content.receiptLegalNote || "", 90).forEach((line) => {
    commands.push(textLine(64, y, 9, line));
    y -= 12;
  });

  commands.push(textLine(64, 130, 10, content.receiptFooterNote || "Thank you for supporting Vihana Foundation.", "F2"));
  commands.push(textLine(390, 130, 10, content.receiptSignatureName || "Vihana Foundation", "F2"));
  commands.push(textLine(390, 114, 8, "Authorized acknowledgement"));

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
