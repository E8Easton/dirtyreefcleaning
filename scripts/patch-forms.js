/**
 * Patches production bundle: mock form handlers → ReefCleaning.submitQuote
 */
const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "..", "dist", "assets", "index-BsA_WY1o.js");
let js = fs.readFileSync(bundlePath, "utf8");

const patches = [
  [
    'u=async y=>{await new Promise(p=>setTimeout(p,1e3)),console.log("Lincoln form submitted",y),n(!0)}',
    'u=async y=>{await window.ReefCleaning.submitQuote("lincoln",y),n(!0)}',
  ],
  [
    'u=async y=>{await new Promise(p=>setTimeout(p,1e3)),console.log("Kearney form submitted",y),n(!0)}',
    'u=async y=>{await window.ReefCleaning.submitQuote("kearney",y),n(!0)}',
  ],
];

for (const [from, to] of patches) {
  if (!js.includes(from)) {
    if (js.includes(to)) {
      console.log("patch already applied:", to.slice(0, 50));
      continue;
    }
    throw new Error("Form patch failed — bundle changed. Expected: " + from.slice(0, 60));
  }
  js = js.replace(from, to);
}

fs.writeFileSync(bundlePath, js, "utf8");
console.log("Patched quote form handlers in index-BsA_WY1o.js");
