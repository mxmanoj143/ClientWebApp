// Shared helper: render branded HTML and send via Resend HTTP API.
// Pure fetch — no SDK, keeps the serverless bundle tiny.

const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";
const NOTIFICATION_EMAILS = (process.env.NOTIFICATION_EMAILS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export function buildHtml(title, fields) {
  const rows = Object.entries(fields)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:12px 16px;font-weight:600;background:#F5F7FA;color:#072B61;width:34%;border-bottom:1px solid #B0B7C3;">${esc(
          k
        )}</td><td style="padding:12px 16px;color:#072B61;border-bottom:1px solid #B0B7C3;">${
          esc(v) || "-"
        }</td></tr>`
    )
    .join("");
  const now = new Date().toUTCString();
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;background:#FFFFFF;border:1px solid #B0B7C3;border-radius:14px;overflow:hidden;">
    <div style="background:#072B61;padding:26px 30px;">
      <div style="color:#B0B7C3;font-size:11px;letter-spacing:3px;font-weight:700;text-transform:uppercase;">Revanth Concrete Products</div>
      <div style="color:#FFFFFF;font-size:22px;font-weight:800;margin-top:8px;">${esc(title)}</div>
      <div style="color:#B0B7C3;font-size:12px;margin-top:6px;">New Customer Enquiry Received</div>
    </div>
    <div style="padding:24px 30px;">
      <div style="font-size:13px;color:#475569;margin-bottom:12px;">Customer Details</div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #B0B7C3;border-radius:8px;overflow:hidden;">${rows}</table>
      <div style="margin-top:22px;padding:14px 16px;background:#F5F7FA;border-left:4px solid #072B61;border-radius:6px;font-size:13px;color:#072B61;">
        <strong>Source:</strong> Website Contact / Quote Form<br/>
        <strong>Submitted On:</strong> ${now}
      </div>
      <p style="margin-top:22px;color:#475569;font-size:13px;line-height:1.6;">Please contact the customer at the earliest. This notification was generated automatically by revanthconcrete.com.</p>
    </div>
    <div style="background:#072B61;padding:14px 30px;color:#B0B7C3;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;text-align:center;">
      Shaping Strength · Delivering Trust
    </div>
  </div>`;
}

export async function sendEmail(subject, html) {
  if (!RESEND_API_KEY || NOTIFICATION_EMAILS.length === 0) {
    return { skipped: true, reason: "missing_env" };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: SENDER_EMAIL,
      to: NOTIFICATION_EMAILS,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend error ${res.status}: ${text}`);
  }
  return res.json();
}

export function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === "object") return resolve(req.body);
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

export function badRequest(res, message) {
  res.status(400).json({ error: "validation_error", message });
}
