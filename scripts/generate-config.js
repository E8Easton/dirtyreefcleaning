/**
 * Reads .env from project root (simple KEY=VALUE) and writes dist/reef-config.js
 * Set the same keys in Netlify → Environment variables for production builds.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const envPath = path.join(root, ".env");
const outPath = path.join(root, "dist", "reef-config.js");

function loadEnv() {
  const env = { ...process.env };
  if (!fs.existsSync(envPath)) return env;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

const env = loadEnv();

const config = {
  supabaseUrl: env.VITE_SUPABASE_URL || env.SUPABASE_URL || "",
  supabaseAnonKey: env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || "",
  emailjs: {
    publicKey: env.VITE_EMAILJS_PUBLIC_KEY || env.EMAILJS_PUBLIC_KEY || "",
    serviceId: env.VITE_EMAILJS_SERVICE_ID || env.EMAILJS_SERVICE_ID || "",
    templateId: env.VITE_EMAILJS_TEMPLATE_ID || env.EMAILJS_TEMPLATE_ID || "",
  },
  inboxEmail: env.QUOTE_INBOX_EMAIL || "lincoln@dirtyreefcleaning.com",
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(
  outPath,
  `window.__REEF_CONFIG=${JSON.stringify(config)};\n`,
  "utf8"
);
console.log("Generated dist/reef-config.js (Supabase:", config.supabaseUrl ? "yes" : "no", "EmailJS:", config.emailjs.serviceId ? "yes" : "pending setup", ")");
