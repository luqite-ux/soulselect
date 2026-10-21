import puppeteer from "puppeteer-core";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const b = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox"],
});

const problems = [];

for (const [route, name, full] of [
  ["/en/", "live-en", true],
  ["/zh/", "live-zh", false],
]) {
  const pg = await b.newPage();
  pg.on("console", (m) => { if (m.type() === "error") problems.push(`[console:${route}] ${m.text().slice(0, 200)}`); });
  pg.on("pageerror", (e) => problems.push(`[pageerror:${route}] ${String(e).slice(0, 200)}`));
  pg.on("requestfailed", (r) => problems.push(`[reqfail:${route}] ${r.url().slice(0, 120)} ${r.failure()?.errorText}`));
  await pg.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 0.6 });
  await pg.goto(`https://soulselect.cn${route}`, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));
  await pg.evaluate(() => document.querySelectorAll(".fade-up").forEach((el) => el.classList.add("is-visible")));

  // broken image check
  const broken = await pg.evaluate(() =>
    Array.from(document.images).filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src)
  );
  broken.forEach((s) => problems.push(`[broken-img:${route}] ${s}`));
  const imgCount = await pg.evaluate(() => document.images.length);

  if (full) {
    await pg.screenshot({ path: path.join(OUT, `${name}-full.png`), fullPage: true });
  } else {
    await pg.screenshot({ path: path.join(OUT, `${name}-top.png`) });
  }
  console.log(`${route}: ${imgCount} images, broken=${broken.length}`);
  await pg.close();
}

// mobile viewport check
const m = await b.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
await m.goto("https://soulselect.cn/en/", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1200));
await m.screenshot({ path: path.join(OUT, "live-mobile.png") });
const hScroll = await m.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
console.log("mobile horizontal overflow:", hScroll);
await m.close();

await b.close();
console.log(problems.length ? `PROBLEMS:\n${problems.join("\n")}` : "NO PROBLEMS FOUND");
