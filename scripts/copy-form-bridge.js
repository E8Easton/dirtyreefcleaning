const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
fs.copyFileSync(
  path.join(root, "scripts", "form-bridge.source.js"),
  path.join(root, "dist", "form-bridge.js")
);
console.log("Copied form-bridge.js to dist/");
