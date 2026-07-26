/**
 * Removes render-blocking @import from CSS; fonts loaded once from HTML.
 */
const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "..", "dist", "assets", "index-pBWu_KKI.css");
let css = fs.readFileSync(cssPath, "utf8");
const fontImport =
  /@import"https:\/\/fonts\.googleapis\.com\/css2\?family=Plus\+Jakarta\+Sans[^"]+";?/;

if (fontImport.test(css)) {
  css = css.replace(fontImport, "");
  fs.writeFileSync(cssPath, css, "utf8");
  console.log("Removed blocking @import fonts from CSS");
} else {
  console.log("CSS font @import already removed or not found");
}
