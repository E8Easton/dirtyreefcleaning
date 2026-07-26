export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const {
    location = "general",
    name,
    phone,
    email,
    service,
    address,
    date,
    notes,
  } = body;

  if (!name || !email || !phone) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  const inbox = process.env.QUOTE_INBOX_EMAIL || "lincoln@dirtyreefcleaning.com";
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;

  if (!publicKey || !serviceId || !templateId) {
    return new Response(JSON.stringify({ error: "EmailJS not configured on server" }), { status: 503 });
  }

  const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: inbox,
        from_name: name,
        reply_to: email,
        customer_email: email,
        phone,
        service: service || "",
        address: address || "",
        preferred_date: date || "Not specified",
        notes: notes || "",
        location,
        subject: `New ${location} quote — ${name}`,
      },
    }),
  });

  if (!emailRes.ok) {
    const t = await emailRes.text();
    return new Response(JSON.stringify({ error: "EmailJS failed", detail: t }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
