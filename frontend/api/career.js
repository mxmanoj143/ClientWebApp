import { buildHtml, sendEmail, readJsonBody, badRequest } from "./_email.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }
  try {
    const body = await readJsonBody(req);
    const { name, email, phone, position = "", experience = "", message = "" } = body;
    if (!name || String(name).trim().length < 3) return badRequest(res, "Name required (min 3 chars).");
    if (!phone || String(phone).replace(/\D/g, "").length !== 10) return badRequest(res, "Phone must be 10 digits.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return badRequest(res, "Valid email required.");

    const html = buildHtml("New Career Application", {
      Name: name,
      Email: email,
      Phone: phone,
      Position: position,
      Experience: experience,
      Notes: message,
    });
    await sendEmail(`New Career Application from ${name}`, html);

    return res.status(200).json({ ok: true, name, email, phone, position, experience, message });
  } catch (err) {
    console.error("career error:", err);
    return res.status(500).json({ error: "server_error", message: err.message });
  }
}
