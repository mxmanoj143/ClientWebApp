// Form validation utilities + WhatsApp helper
import { COMPANY } from "@/data/site";

export const validators = {
  name: (v) => {
    const t = (v || "").trim();
    if (!t) return "Name is required.";
    if (t.length < 3) return "Name must be at least 3 characters.";
    if (!/^[A-Za-z][A-Za-z .'-]*$/.test(t)) return "Use letters only (a-z, A-Z).";
    return "";
  },
  phone: (v) => {
    const t = (v || "").replace(/\D/g, "");
    if (!t) return "Phone is required.";
    if (t.length !== 10) return "Phone must be exactly 10 digits.";
    return "";
  },
  email: (v) => {
    const t = (v || "").trim();
    if (!t) return "Email is required.";
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(t)) return "Enter a valid email address.";
    return "";
  },
  message: (v) => {
    const t = (v || "").trim();
    if (!t) return "Message is required.";
    if (t.length < 10) return "Please write at least 10 characters.";
    return "";
  },
  required: (v, label = "Field") => {
    const t = (v || "").trim();
    if (!t) return `${label} is required.`;
    return "";
  },
};

export const validateAll = (data, schema) => {
  const errors = {};
  for (const key of Object.keys(schema)) {
    const fn = schema[key];
    const msg = fn(data[key]);
    if (msg) errors[key] = msg;
  }
  return errors;
};

export const buildWhatsAppMessage = (kind, data) => {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const title = kind === "quote" ? "New Quote Request" : kind === "career" ? "New Career Application" : "Customer Enquiry";
  const lines = [
    `*${title}*`,
    "",
    `*Name:* ${data.name || "-"}`,
    `*Phone:* ${data.phone || "-"}`,
    `*Email:* ${data.email || "-"}`,
  ];
  if (data.product) lines.push(`*Product:* ${data.product}`);
  if (data.company) lines.push(`*Company / Site:* ${data.company}`);
  if (data.quantity) lines.push(`*Quantity:* ${data.quantity}`);
  if (data.location) lines.push(`*Location:* ${data.location}`);
  if (data.position) lines.push(`*Position:* ${data.position}`);
  if (data.experience) lines.push(`*Experience:* ${data.experience}`);
  if (data.subject) lines.push(`*Subject:* ${data.subject}`);
  if (data.message) lines.push("", `*Message:*`, data.message);
  lines.push("", `*Time:* ${now}`, "*Source:* Website Contact Form");
  return lines.join("\n");
};

export const openWhatsApp = (kind, data) => {
  try {
    const text = encodeURIComponent(buildWhatsAppMessage(kind, data));
    const num = COMPANY.whatsapp[0];
    const url = `https://wa.me/${num}?text=${text}`;
    // Open in a new tab without blocking the success flow
    window.open(url, "_blank", "noopener,noreferrer");
    return true;
  } catch {
    return false;
  }
};
