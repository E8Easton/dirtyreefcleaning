/**
 * Generates WebP copies of PNG assets and patches JS/CSS references.
 * Requires: npm install sharp (devDependency)
 */
const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "..", "dist", "assets");
const jsPath = path.join(assetsDir, "index-BsA_WY1o.js");

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.log("skip optimize-images: install sharp for WebP compression (npm i -D sharp)");
    return;
  }

  const pngs = fs.readdirSync(assetsDir).filter((f) => f.endsWith(".png"));
  if (!pngs.length) {
    console.log("optimize-images: no PNG assets (already WebP)");
    return;
  }
  let js = fs.readFileSync(jsPath, "utf8");
  let saved = 0;

  for (const file of pngs) {
    const src = path.join(assetsDir, file);
    const webpName = file.replace(/\.png$/i, ".webp");
    const dest = path.join(assetsDir, webpName);
    const before = fs.statSync(src).size;
    await sharp(src).webp({ quality: 82, effort: 4 }).toFile(dest);
    const after = fs.statSync(dest).size;
    saved += before - after;
    js = js.split(file).join(webpName);
    try {
      fs.unlinkSync(src);
    } catch {
      /* keep png if delete fails */
    }
    console.log("webp", webpName, Math.round(before / 1024) + "KB →", Math.round(after / 1024) + "KB");
  }

  fs.writeFileSync(jsPath, js, "utf8");
  console.log("Total PNG→WebP savings ~", Math.round(saved / 1024 / 1024 * 10) / 10, "MB");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
