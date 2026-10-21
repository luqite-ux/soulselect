import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
const OUT = path.resolve(DIST, "..", "..");
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png" };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  let f = path.join(DIST, p);
  if (!existsSync(f)) f = path.join(DIST, "index.html");
  try {
    const data = readFileSync(f);
    res.writeHead(200, { "Content-Type": MIME[path.extname(f)] ?? "application/octet-stream" });
    res.end(data);
  } catch { res.writeHead(404); res.end(); }
});

await new Promise((r) => server.listen(4179, r));
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const pg = await b.newPage();

// SEO verification
for (const [route, checks] of [
  ["/zh/", ["瑜伽裤工厂", "蜜桃臀", 'href="https://soulselect.cn/zh/"', '<html lang="zh"']],
  ["/es/", ["Fabricante de Leggings", 'href="https://soulselect.cn/es/"']],
  ["/en/", ["Yoga Leggings Manufacturer", 'href="https://soulselect.cn/en/"']],
]) {
  await pg.goto(`http://localhost:4179${route}`, { waitUntil: "domcontentloaded" });
  const html = await pg.content();
  for (const c of checks) console.log(route, JSON.stringify(c), "->", html.includes(c) ? "OK" : "MISSING");
}

await pg.setViewport({ width: 1440, height: 2400, deviceScaleFactor: 0.5 });
await pg.goto("http://localhost:4179/en/", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1500));
await pg.evaluate(() => document.querySelectorAll(".fade-up").forEach((el) => el.classList.add("is-visible")));
await pg.screenshot({ path: path.join(OUT, "preview-home.png"), fullPage: true });
await pg.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 0.5 });
await pg.goto("http://localhost:4179/en/#products", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1000));
await pg.screenshot({ path: path.join(OUT, "preview-products.png") });
await pg.goto("http://localhost:4179/zh/", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1200));
await pg.evaluate(() => document.querySelectorAll(".fade-up").forEach((el) => el.classList.add("is-visible")));
await pg.screenshot({ path: path.join(OUT, "preview-zh.png"), fullPage: true });

await b.close();
server.close();
console.log("screenshots done ->", OUT);
