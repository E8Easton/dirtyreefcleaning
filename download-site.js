const fs = require("fs");
const path = require("path");
const https = require("https");

const BASE = "https://dirtyreefcleaning.com";
const OUT = path.join(__dirname, "dist", "assets");
fs.mkdirSync(OUT, { recursive: true });

const files = [
  "index-BsA_WY1o.js",
  "index-pBWu_KKI.css",
  "0_Final_Image_1_1785021547035-Df2FZCVE.png",
  "0_Logo_sobre_asesor_financiero_abstracto_verde_y_negro_(1)_1785021540239-DavXeRxF.png",
  "0_reef_cleaning_car_1785021570011-CyeAf0vk.png",
  "1_Final_Image_2_1785021547035-Dh_6omfn.png",
  "1_reef_cleaning_truck_1785021570012-DQ92KwYj.png",
  "2_Final_Image_3_1785021547035-C2NGTnX-.png",
  "3_Final_Image_4_1785021547036-BEBg72Cg.png",
  "4_Final_Image_5_1785021547036-CQPcEi36.png",
  "5_Final_Image_6_1785021547037-BjFCri60.png",
  "6_Final_Image_7__1785021547037-BIhNvVFl.png",
  "7_Final_Image_8_1785021547038-CuquVZg3.png",
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`${url} -> ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", reject);
  });
}

(async () => {
  for (const f of files) {
    const dest = path.join(OUT, f);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 100) {
      console.log("skip", f);
      continue;
    }
    console.log("get", f);
    await download(`${BASE}/assets/${encodeURI(f)}`, dest);
  }

  await download(`${BASE}/favicon.svg`, path.join(__dirname, "dist", "favicon.svg"));
  console.log("Assets synced from live site. Run: npm run build");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
