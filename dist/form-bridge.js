/**
 * Quote form bridge: Supabase storage + EmailJS → lincoln@dirtyreefcleaning.com
 * Load after reef-config.js; EmailJS SDK loaded on demand.
 */
(function () {
  var LOADING = null;

  function cfg() {
    return window.__REEF_CONFIG || {};
  }

  function loadEmailJs() {
    if (window.emailjs) return Promise.resolve(window.emailjs);
    if (LOADING) return LOADING;
    LOADING = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      s.onload = function () {
        resolve(window.emailjs);
      };
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return LOADING;
  }

  async function saveToSupabase(location, data) {
    var c = cfg();
    if (!c.supabaseUrl || !c.supabaseAnonKey) {
      console.warn("Supabase not configured — skipping database save");
      return;
    }
    var row = {
      location: location,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.notes || null,
      metadata: {
        service: data.service,
        address: data.address,
        date: data.date || null,
        notes: data.notes || null,
      },
    };
    var res = await fetch(c.supabaseUrl + "/rest/v1/contact_submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: c.supabaseAnonKey,
        Authorization: "Bearer " + c.supabaseAnonKey,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      var errText = await res.text();
      throw new Error("Could not save quote request: " + errText);
    }
  }

  async function sendEmail(location, data) {
    var c = cfg();
    var ej = c.emailjs || {};
    if (!ej.publicKey || !ej.serviceId || !ej.templateId) {
      console.warn("EmailJS not configured — set EMAILJS_* in Netlify env. Trying server fallback.");
      var fn = await fetch("/.netlify/functions/submit-quote-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: location,
          name: data.name,
          phone: data.phone,
          email: data.email,
          service: data.service,
          address: data.address,
          date: data.date,
          notes: data.notes,
        }),
      });
      if (fn.ok) return;
      throw new Error(
        "Email not sent. Add EmailJS keys (see docs/EMAILJS.md) or configure Netlify function env vars."
      );
    }
    var emailjs = await loadEmailJs();
    emailjs.init(ej.publicKey);
    await emailjs.send(ej.serviceId, ej.templateId, {
      to_email: c.inboxEmail || "lincoln@dirtyreefcleaning.com",
      from_name: data.name,
      reply_to: data.email,
      customer_email: data.email,
      phone: data.phone,
      service: data.service,
      address: data.address,
      preferred_date: data.date || "Not specified",
      notes: data.notes || "",
      location: location,
      subject: "New " + location + " quote — " + data.name,
    });
  }

  window.ReefCleaning = {
    submitQuote: async function (location, data) {
      await saveToSupabase(location, data);
      await sendEmail(location, data);
    },
  };
})();
