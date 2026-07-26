const fs = require("fs");
const path = require("path");

fs.copyFileSync(
  path.join(__dirname, "perf.source.js"),
  path.join(__dirname, "..", "dist", "perf.js")
);
console.log("Copied perf.js to dist/");
