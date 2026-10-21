import puppeteer from "puppeteer-core";

const b = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox"],
});
const pg = await b.newPage();
await pg.setViewport({ width: 1440, height: 1000 });
await pg.goto("https://soulselect.cn/en/", { waitUntil: "domcontentloaded", timeout: 60000 });

const result = await pg.evaluate(async () => {
  const test = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(`${src.split("/").pop()}: OK ${img.naturalWidth}x${img.naturalHeight}`);
      img.onerror = (e) => resolve(`${src.split("/").pop()}: ERROR event=${e.type}`);
      img.src = src + "?t=" + Date.now();
    });
  return {
    factory: await test("/images/factory-floor.webp"),
    hero: await test("/images/hero.webp"),
    product: await test("/images/p-jogger.webp"),
    entries: performance
      .getEntriesByType("resource")
      .filter((r) => r.name.includes("factory-floor"))
      .map((r) => `${r.responseStatus} ${r.transferSize}B ${(r.duration | 0)}ms`),
  };
});
console.log(JSON.stringify(result, null, 2));
await b.close();
