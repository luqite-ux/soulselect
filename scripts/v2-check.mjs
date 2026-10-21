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
await new Promise((r) => server.listen(4181, r));

const checks = [
  ["/zh/products/", "产品目录"],
  ["/en/products/nakedfeel-high-rise-legging-25/", "NakedFeel"],
  ["/zh/products/vback-scrunch-legging/", "蜜桃臀"],
  ["/es/factory/", "Fábrica"],
  ["/en/services/", "OEM / ODM"],
  ["/zh/about/", "环通甜蜜"],
  ["/en/contact/", "Get a Quote"],
];
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const pg = await b.newPage();

for (const [route, needle] of checks) {
  const f = path.join(DIST, route, "index.html");
  const html = readFileSync(f, "utf8");
  const ok = html.includes(needle);
  const canonical = html.match(/rel="canonical" href="([^"]*)"/)?.[1];
  console.log(`${ok ? "OK " : "MISS"} ${route}  canonical=${canonical}`);
}

// client-side nav: click from home to a product detail
await pg.goto("http://localhost:4181/en/", { waitUntil: "networkidle0" });
await pg.evaluate(() => document.querySelectorAll(".fade-up").forEach((el) => el.classList.add("is-visible")));
await pg.evaluate((sel) => document.querySelector(sel)?.click(), 'a[href="/en/products/"]');
await new Promise((r) => setTimeout(r, 1200));
const url1 = pg.url();
await pg.evaluate((sel) => document.querySelector(sel)?.click(), 'a[href="/en/products/nakedfeel-high-rise-legging-25/"]');
await new Promise((r) => setTimeout(r, 1200));
const url2 = pg.url();
console.log("SPA nav:", url1.endsWith("/en/products/") ? "OK" : "FAIL", url2.includes("/products/nakedfeel") ? "OK" : "FAIL");

// language switch preserves page
await pg.goto("http://localhost:4181/en/products/vback-scrunch-legging/", { waitUntil: "networkidle0" });
await pg.evaluate((sel) => document.querySelector(sel)?.click(), 'a[href="/zh/products/vback-scrunch-legging/"]');
await new Promise((r) => setTimeout(r, 1000));
console.log("lang switch:", pg.url().includes("/zh/products/vback-scrunch-legging/") ? "OK" : "FAIL " + pg.url());

// screenshots
const shot = async (route, file, full = false) => {
  await pg.goto(`http://localhost:4181${route}`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 900));
  await pg.evaluate(() => document.querySelectorAll(".fade-up").forEach((el) => el.classList.add("is-visible")));
  await pg.screenshot({ path: path.join(OUT, file), fullPage: full });
};
await shot("/en/", "v2-home.png", true);
await shot("/en/products/", "v2-products.png");
await shot("/en/products/vback-scrunch-legging/", "v2-detail.png");
await shot("/zh/", "v2-zh-home.png");

await b.close();
server.close();
console.log("screenshots done");
