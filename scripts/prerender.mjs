/**
 * Post-build prerender: serve dist/, render each language route with headless
 * Chrome (puppeteer-core), and write static HTML to dist/<route>/index.html
 * so crawlers see fully localized content (SSR-equivalent for SEO).
 */
import http from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].filter(Boolean);
let CHROME = CHROME_CANDIDATES.find((p) => existsSync(p));
let chromium = null;
if (!CHROME) {
  // Vercel / CI: use the lambda-compatible chromium build
  chromium = (await import("@sparticuz/chromium")).default;
  CHROME = await chromium.executablePath();
}
const ROUTES = ["/en/", "/zh/", "/es/", "/"];
const PORT = 4177;
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".xml": "text/xml", ".txt": "text/plain", ".json": "application/json", ".svg": "image/svg+xml" };

const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    // Vite emits relative ./assets paths; when the page is served from /en/ etc.
    // the browser resolves them under the language prefix — strip it for real files.
    const langPrefixed = urlPath.match(/^\/(en|zh|es)(\/.*)$/);
    if (langPrefixed && existsSync(path.join(DIST, langPrefixed[2]))) {
      urlPath = langPrefixed[2];
    }
    if (urlPath.endsWith("/")) urlPath += "index.html";
    let file = path.join(DIST, urlPath);
    if (!existsSync(file) || urlPath === "/index.html") file = path.join(DIST, "index.html");
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404); res.end("nf");
  }
});

await new Promise((r) => server.listen(PORT, r));
console.log(`serving dist on :${PORT}, chrome=${CHROME}`);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: chromium
    ? [...chromium.args, "--disable-gpu", "--disable-dev-shm-usage"]
    : ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
});

for (const route of ROUTES) {
  const page = await browser.newPage();
  page.on("console", (m) => { if (m.type() === "error") console.log(`[console:${route}]`, m.text().slice(0, 300)); });
  page.on("pageerror", (e) => console.log(`[pageerror:${route}]`, String(e).slice(0, 300)));
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
  try {
    await page.waitForSelector("#root .min-h-screen", { timeout: 15000 });
  } catch {
    console.log(`[warn:${route}] app did not mount within 15s`);
  }
  await page.evaluate(() => new Promise((r) => setTimeout(r, 1200))); // let reveal animations settle
  await page.evaluate(() => document.querySelectorAll(".fade-up").forEach((el) => el.classList.add("is-visible")));
  let html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);

  const canonical = `https://soulselect.cn${route === "/" ? "/en/" : route}`;
  html = html
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`);

  const outDir = route === "/" ? DIST : path.join(DIST, route);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html);
  console.log(`prerendered ${route} -> ${path.relative(DIST, outDir)}/index.html (${(html.length / 1024).toFixed(0)}KB)`);
  await page.close();
}

await browser.close();
server.close();
console.log("DONE");
