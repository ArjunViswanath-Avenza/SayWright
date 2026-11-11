// Ground truth for the image agent: render a converted form (viz2react) and record what is VISIBLE on screen.
//   node vision/truth.mjs <viz2react app dir> <form[,form...]> <out dir> [widths=1366] [height=900]
// Writes <out>/<form>-<width>.png and <out>/<form>-<width>.json:
//   {image, width, height, elements: [{type, text, bbox_2d: [x1, y1, x2, y2], id}]}
// Types are what a person sees, not Visualizer's layout flexes:
//   panel (a container you can see: own background or border), text, input, dropdown, button, checkbox, image.
// The same schema is what the vision model is asked to produce, so these files score it and later train it.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const { default: puppeteer } = await import(pathToFileURL(path.join(here, "..", "..", "viz2react", "node_modules", "puppeteer-core", "lib", "esm", "puppeteer", "puppeteer-core.js")).href);

const [appDir, formsArg, outDir, widthsArg = "1366", heightArg = "900"] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();

function collect() {
  const VW = window.innerWidth, VH = window.innerHeight;
  const rgba = (c) => { const m = /rgba?\(([^)]+)\)/.exec(c || ""); if (!m) return null; const p = m[1].split(",").map(Number); return p.length < 4 || p[3] > 0.02 ? p.slice(0, 3).join(",") : null; };
  const bgOf = (el) => { for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const b = rgba(getComputedStyle(e).backgroundColor); if (b) return b; } return "255,255,255"; };
  const shown = (el) => { for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const s = getComputedStyle(e); if (s.display === "none" || s.visibility === "hidden" || +s.opacity === 0) return false; } return true; };
  const box = (el) => {
    const r = el.getBoundingClientRect();
    const x1 = Math.max(0, Math.round(r.left)), y1 = Math.max(0, Math.round(r.top));
    const x2 = Math.min(VW, Math.round(r.right)), y2 = Math.min(VH, Math.round(r.bottom));
    return x2 - x1 >= 3 && y2 - y1 >= 3 ? [x1, y1, x2, y2] : null;
  };
  const out = [];
  for (const el of document.querySelectorAll("[data-viz]")) {
    if (!shown(el)) continue;
    const b = box(el);
    if (!b) continue;
    const id = el.getAttribute("data-viz"), tag = el.tagName.toLowerCase(), s = getComputedStyle(el);
    const kids = el.querySelectorAll("[data-viz]").length;
    const border = ["Top", "Right", "Bottom", "Left"].some((k) => parseFloat(s[`border${k}Width`]) > 0 && rgba(s[`border${k}Color`]));
    let type = null, text = "";
    if (tag === "input" || tag === "textarea") { type = "input"; text = el.value || el.placeholder || ""; }
    else if (tag === "select") { type = "dropdown"; text = el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : ""; }
    else if (tag === "button") { type = "button"; text = el.innerText.trim(); }
    else if (tag === "img") type = "image";
    else if (!kids && el.innerText && el.innerText.trim()) { type = "text"; text = el.innerText.trim().replace(/\s+/g, " "); }
    else if (!kids && border && b[2] - b[0] <= 34 && b[3] - b[1] <= 34) type = "checkbox";
    else {
      // a container counts only if you can see it: its own background differs from what is behind it, or a border
      const own = rgba(s.backgroundColor), behind = el.parentElement ? bgOf(el.parentElement) : "255,255,255";
      if ((own && own !== behind) || border) type = "panel";
    }
    if (type) out.push({ type, text, bbox_2d: b, id });
  }
  return out;
}

const report = [];
for (const width of widthsArg.split(",").map(Number)) {
  await page.setViewport({ width, height: +heightArg });
  for (const form of formsArg.split(",")) {
    await page.goto("about:blank");
    await page.goto(pathToFileURL(path.join(path.resolve(appDir), "index.html")).href + "#/" + form, { waitUntil: "load" });
    await new Promise((r) => setTimeout(r, 900));
    const elements = await page.evaluate(collect);
    const base = path.join(outDir, `${form}-${width}`);
    await page.screenshot({ path: base + ".png" });
    fs.writeFileSync(base + ".json", JSON.stringify({ image: path.basename(base) + ".png", width, height: +heightArg, elements }, null, 1));
    report.push(`${form}@${width}: ${elements.length} elements (${Object.entries(elements.reduce((m, e) => ((m[e.type] = (m[e.type] || 0) + 1), m), {})).map(([k, v]) => `${v} ${k}`).join(", ")})`);
  }
}
await browser.close();
console.log(report.join("\n"));
