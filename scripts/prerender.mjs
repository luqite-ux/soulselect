/**
 * Post-build prerender: serve dist/, render every route with headless Chrome
 * (puppeteer-core), write static HTML to dist/<route>/index.html and generate
 * sitemap.xml — full multi-page SEO for crawlers.
 */
import http from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const CATALOG = JSON.parse(readFileSync(path.join(ROOT, "src/data/catalog.json"), "utf8"));
const LANGS = ["en", "zh", "es"];
const PAGES = ["", "products/", "factory/", "services/", "about/", "contact/"];

const ROUTES = ["/"];
for (const lang of LANGS) {
  for (const p of PAGES) ROUTES.push(`/${lang}/${p}`);
  for (const s of CATALOG.styles) ROUTES.push(`/${lang}/products/${s.slug}/`);
}

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].filter(Boolean);
let CHROME = CHROME_CANDIDATES.find((p) => existsSync(p));
let chromium = null;
if (!CHROME) {
  chromium = (await import("@sparticuz/chromium")).default;
  CHROME = await chromium.executablePath();
}

const PORT = 4177;
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".xml": "text/xml", ".txt": "text/plain", ".json": "application/json", ".svg": "image/svg+xml" };

const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const langPrefixed = urlPath.match(/^\/(en|zh|es)(\/.*)$/);
    if (langPrefixed && existsSync(path.join(DIST, langPrefixed[2]))) urlPath = langPrefixed[2];
    if (urlPath.endsWith("/")) urlPath += "index.html";
    let file = path.join(DIST, urlPath);
    if (!existsSync(file)) file = path.join(DIST, "index.html");
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("nf");
  }
});

await new Promise((r) => server.listen(PORT, r));
console.log(`prerendering ${ROUTES.length} routes, chrome=${path.basename(CHROME)}`);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: chromium
    ? [...chromium.args, "--disable-gpu", "--disable-dev-shm-usage"]
    : ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
});

let done = 0;
for (const route of ROUTES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  try {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForSelector("#root .min-h-screen", { timeout: 15000 }).catch(() => {});
    await page.evaluate(() => document.querySelectorAll(".fade-up").forEach((el) => el.classList.add("is-visible")));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
    let html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);
    const canonical = `https://soulselect.cn${route === "/" ? "/en/" : route}`;
    html = html
      .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`)
      .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`);
    const outDir = route === "/" ? DIST : path.join(DIST, route);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), html);
  } catch (err) {
    console.error(`FAILED ${route}: ${String(err).slice(0, 160)}`);
  }
  await page.close();
  done++;
  if (done % 20 === 0) console.log(`  ${done}/${ROUTES.length}`);
}

await browser.close();

// sitemap.xml with every route
const urls = ROUTES.map((r) => `  <url><loc>https://soulselect.cn${r === "/" ? "/en/" : r}</loc><changefreq>weekly</changefreq></url>`);
await writeFile(
  path.join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
);
console.log(`sitemap: ${ROUTES.length} urls`);

server.close();
console.log("DONE");
