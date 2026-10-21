import puppeteer from "puppeteer-core";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const b = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox"],
});

for (const [route, file] of [["/en/", "live-en-full.png"], ["/zh/", "live-zh-full.png"]]) {
  const pg = await b.newPage();
  await pg.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 0.5 });
  await pg.goto(`https://soulselect.cn${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  // scroll through page to trigger all lazy images
  await pg.evaluate(
    () =>
      new Promise((res) => {
        let y = 0;
        const t = setInterval(() => {
          y += 500;
          window.scrollTo(0, y);
          if (y >= document.body.scrollHeight) {
            clearInterval(t);
            res();
          }
        }, 60);
      })
  );
  // wait until every image is actually complete
  await pg.waitForFunction(() => Array.from(document.images).every((i) => i.complete), { timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));
  const broken = await pg.evaluate(() =>
    Array.from(document.images).filter((i) => i.naturalWidth === 0).map((i) => i.src)
  );
  await pg.evaluate(() => document.querySelectorAll(".fade-up").forEach((el) => el.classList.add("is-visible")));
  await pg.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 400));
  await pg.screenshot({ path: path.join(OUT, file), fullPage: true });
  console.log(`${route}: broken=${broken.length}`, broken.join(","));
  await pg.close();
}
await b.close();
console.log("DONE");
