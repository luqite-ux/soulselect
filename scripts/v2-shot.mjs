import puppeteer from "puppeteer-core";
import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
const OUT = path.resolve(DIST, "../..");
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  let f = path.join(DIST, p);
  if (!existsSync(f)) f = path.join(DIST, "index.html");
  try {
    const d = readFileSync(f);
    res.writeHead(200, { "Content-Type": MIME[path.extname(f)] ?? "application/octet-stream" });
    res.end(d);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(4183, r));

const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 0.6 });

async function shot(route, file, full = false) {
  await pg.goto(`http://localhost:4183${route}`, { waitUntil: "networkidle0", timeout: 60000 });
  // scroll through the page so lazy images load
  await pg.evaluate(() => new Promise((res) => { let y = 0; const t = setInterval(() => { y += 600; window.scrollTo(0, y); if (y >= document.body.scrollHeight) { clearInterval(t); res(); } }, 50); }));
  await pg.waitForFunction(() => Array.from(document.images).every((i) => i.complete), { timeout: 45000 }).catch(() => {});
  await pg.evaluate(() => document.querySelectorAll(".fade-up").forEach((el) => el.classList.add("is-visible")));
  await pg.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));
  await pg.screenshot({ path: path.join(OUT, file), fullPage: full });
  const broken = await pg.evaluate(() => Array.from(document.images).filter((i) => i.naturalWidth === 0).map((i) => i.src.split("/").pop()));
  console.log(`${route} broken=[${broken.join(",")}]`);
}

await shot("/en/", "v2-home.png", true);
await shot("/en/products/", "v2-products.png", true);
await shot("/zh/products/", "v2-zh-products.png", true);
await shot("/en/factory/", "v2-factory.png", true);
await shot("/en/services/", "v2-services.png");
await shot("/zh/about/", "v2-about.png");
await shot("/en/contact/", "v2-contact.png");
await shot("/es/products/crossover-flare-pant-31/", "v2-es-detail.png");

await b.close();
server.close();
console.log("done");
