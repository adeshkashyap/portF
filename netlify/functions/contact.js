/* Netlify Function: contact
 - Validates payload
 - Honeypot (company) check
 - reCAPTCHA v3 verification (if keys provided)
 - Sends email via Resend API (admin notification + autoresponder)
*/

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  try {
    const env = process.env || {};
    const RESEND_API_KEY = env.RESEND_API_KEY;
    const CONTACT_TO = env.CONTACT_TO || "akkashyap110094@gmail.com";
    const CONTACT_FROM = env.CONTACT_FROM || "no-reply@apnacodex.com";
    const RECAPTCHA_SECRET = env.RECAPTCHA_SECRET_KEY; // optional

    const body = JSON.parse(event.body || "{}");

    // Honeypot: reject if hidden field present
    if (body.company) {
      return { statusCode: 204, body: "" };
    }

    // Basic zod-like checks
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "Contact Form").trim();
    const message = String(body.message || "").trim();
    const recaptchaToken = String(body.recaptchaToken || "").trim();

    if (name.length < 2 || !email.includes("@") || message.length < 10) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid input" }) };
    }

    // reCAPTCHA v3 verify (if configured)
    if (RECAPTCHA_SECRET) {
      if (!recaptchaToken) {
        return { statusCode: 400, body: JSON.stringify({ error: "Missing reCAPTCHA token" }) };
      }
      const verify = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: recaptchaToken }),
      });
      const verifyJson = await verify.json();
      if (!verifyJson.success || (typeof verifyJson.score === "number" && verifyJson.score < 0.3)) {
        return { statusCode: 400, body: JSON.stringify({ error: "reCAPTCHA failed" }) };
      }
    }

    // Build email payloads
    const adminHtml = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,monospace">${escapeHtml(message)}</pre>
    `;

    const userHtml = `
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thanks for reaching out. We received your message and will get back to you within one business day.</p>
      <p>Regards,<br/>Adesh • apnacodex.com</p>
    `;

    // If no API key, just return OK (demo mode)
    if (!RESEND_API_KEY) {
      return { statusCode: 200, body: JSON.stringify({ ok: true, demo: true }) };
    }

    // Send admin notification
    const sendAdmin = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        subject: `[Contact] ${subject}`,
        html: adminHtml,
        reply_to: email,
      }),
    });

    if (!sendAdmin.ok) {
      const text = await sendAdmin.text();
      return { statusCode: 500, body: JSON.stringify({ error: "Email send failed", details: text }) };
    }

    // Send autoresponder to user (best-effort)
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [email],
        subject: "Thanks for reaching out",
        html: userHtml,
      }),
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server error", details: String(err) }) };
  }
};

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
