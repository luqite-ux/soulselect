import puppeteer from "puppeteer-core";

const b = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox"],
});
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto("https://soulselect.cn/en/", { waitUntil: "networkidle0", timeout: 60000 });
await pg.evaluate(
  () =>
    new Promise((res) => {
      let y = 0;
      const t = setInterval(() => {
        y += 600;
        window.scrollTo(0, y);
        if (y >= document.body.scrollHeight) {
          clearInterval(t);
          res();
        }
      }, 80);
    })
);
await new Promise((r) => setTimeout(r, 2500));
const broken = await pg.evaluate(() =>
  Array.from(document.images).filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src)
);
const total = await pg.evaluate(() => document.images.length);
const probe = await pg.evaluate(async () => {
  const r = await fetch("/images/factory-floor.webp");
  const buf = await r.arrayBuffer();
  return `${r.status} ${r.headers.get("content-type")} ${(buf.byteLength / 1024) | 0}KB`;
});
console.log("total images:", total, "| broken after scroll:", broken.length);
broken.forEach((s) => console.log("  BROKEN:", s));
console.log("fetch probe factory-floor:", probe);
await b.close();
