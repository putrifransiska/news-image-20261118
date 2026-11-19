// Draw build/page.html as a 1024x1024 screenshot with headless Chromium, and report layout problems.
// Usage: PW=<folder whose node_modules has playwright-core> node build/render.mjs build/page.html raw.png
import { createRequire } from 'node:module';
import { resolve, join } from 'node:path';

const [html = 'build/page.html', out = 'raw.png'] = process.argv.slice(2);
const { chromium } = createRequire(join(resolve(process.env.PW ?? '.'), 'index.js'))('playwright-core');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
await page.goto('file://' + resolve(html));
await page.waitForFunction(() => window.__ready === true);
await page.evaluate(() => document.fonts.ready);
const report = await page.evaluate(() => {
  const r = (s) => document.querySelector(s).getBoundingClientRect();
  const date = r('#date'), rule = r('.rule');
  const clipped = [...document.querySelectorAll("h1,h2,h3,p,.strip span,.also li")]
    .filter((e) => e.scrollWidth > e.clientWidth + 1).map((e) => e.textContent.slice(0, 30));
  const lastBrief = Math.max(...[...document.querySelectorAll(".brief,.also li")].map((e) => e.getBoundingClientRect().bottom));
  return { dateBottom: date.bottom, ruleTop: rule.top, dateWidth: date.width, lastBrief, footTop: r('.foot').top, clipped };
});
console.log(JSON.stringify(report));
if (report.dateBottom > report.ruleTop) console.log('WARNING: date runs into the rule');
if (report.lastBrief > report.footTop) console.log('WARNING: briefs run into the footer');
await page.screenshot({ path: out });
await browser.close();
