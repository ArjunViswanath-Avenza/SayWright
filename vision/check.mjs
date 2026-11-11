// Quality check: render a form at each breakpoint and report what a person would call broken.
//   node vision/check.mjs <viz2react app dir> <form> <out dir> [widths=1366,1024,640]
// Prints JSON: {widths: {1366: {overflow, clipped: [...], overlaps: [...], offscreen: [...], spills: [...], visible, height}}}
//   spills      a widget sticking out of the panel it sits on: {id, panel, by, height}, so the panel can be grown
//   overflow    the page scrolls sideways by this many px
//   clipped     text cut off by its own box or by a container
//   overlaps    text, buttons, inputs or images covering each other
//   covered     text, a button, an input or an image under a skinned panel that does not hold it ("lblX under flxCard"):
//               a card picture over the buttons. Covering already there on the widest screen is the design's own.
//   offscreen   widgets past the right edge
// Also writes <out>/<form>-<width>.png, full page. Rendered by the same runtime as the canvas, so a pass here does not prove
// Live Preview: its theme.css can differ (see knowledge/VISUALIZER.md).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const { default: puppeteer } = await import(pathToFileURL(path.join(here, "..", "..", "viz2react", "node_modules", "puppeteer-core", "lib", "esm", "puppeteer", "puppeteer-core.js")).href);

const [appDir, form, outDir, widthsArg = "1366,1024,640"] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();

function lint() {
  const VW = document.documentElement.clientWidth;
  const shown = (el) => { for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const s = getComputedStyle(e); if (s.display === "none" || s.visibility === "hidden" || +s.opacity === 0) return false; } return true; };
  const all = [...document.querySelectorAll("[data-viz]")].filter(shown);
  const leaves = all.filter((el) => !el.querySelector("[data-viz]")).map((el) => {
    const tag = el.tagName.toLowerCase(), r = el.getBoundingClientRect();
    const text = tag === "input" ? (el.value || el.placeholder || "") : (el.innerText || "").trim().replace(/\s+/g, " ");
    return { el, id: el.getAttribute("data-viz"), tag, r, text };
  }).filter((l) => l.r.width >= 2 && l.r.height >= 2);
  const out = { overflow: 0, clipped: [], overlaps: [], offscreen: [], spills: [], visible: leaves.length, height: 0 };
  const seen = (s) => { const b = s.backgroundColor; return (b && b !== "transparent" && !/, 0\)$/.test(b)) || s.backgroundImage !== "none" || parseFloat(s.borderBottomWidth) > 0; };
  for (const l of leaves) {
    for (let p = l.el.parentElement; p && p !== document.body; p = p.parentElement) {
      if (!p.hasAttribute("data-viz")) continue;
      if (!seen(getComputedStyle(p))) continue;
      const b = p.getBoundingClientRect();
      if (b.width < 2 || b.height < 2 || b.height > 0.95 * document.documentElement.scrollHeight) break;
      const by = Math.round(l.r.bottom - b.bottom);
      if (by > 2) out.spills.push({ id: l.id, panel: p.getAttribute("data-viz"), by, height: Math.round(b.height) });
      break;
    }
  }
  let maxB = 0;
  for (const l of leaves) maxB = Math.max(maxB, l.r.bottom);
  out.height = Math.round(maxB);
  for (const l of leaves) {
    if (l.r.right > VW + 1) out.offscreen.push(l.id);
    if (!l.text || l.tag === "input" || l.tag === "select") continue;
    // the rendered text's real extent, not its box
    const range = document.createRange();
    range.selectNodeContents(l.el);
    const t = range.getBoundingClientRect();
    if (l.el.scrollHeight > l.el.clientHeight + 2 && l.el.clientHeight > 0 && getComputedStyle(l.el).overflow !== "visible") out.clipped.push(l.id + ":own");
    for (let p = l.el.parentElement; p && p !== document.body; p = p.parentElement) {
      if (!p.hasAttribute("data-viz")) continue;
      const s = getComputedStyle(p);
      if (s.overflowX === "visible" && s.overflowY === "visible") continue;
      const b = p.getBoundingClientRect();
      if (t.right > b.right + 2 || t.bottom > b.bottom + 2 || t.left < b.left - 2) { out.clipped.push(`${l.id}:in:${p.getAttribute("data-viz")}`); break; }
    }
  }
  // text extents, so a wide label box with short text does not count as covering its neighbour
  const ext = leaves.filter((l) => l.tag !== "div" || l.text).map((l) => {
    if (!l.text || l.tag === "input" || l.tag === "button" || l.tag === "select") return { ...l, b: l.r };
    const range = document.createRange(); range.selectNodeContents(l.el);
    return { ...l, b: range.getBoundingClientRect() };
  });
  const images = leaves.filter((l) => l.tag === "img").map((l) => ({ ...l, b: l.r }));
  const things = ext.some((l) => l.tag === "img") ? ext : [...ext, ...images];
  for (let i = 0; i < things.length; i++) {
    for (let j = i + 1; j < things.length; j++) {
      const a = things[i].b, b = things[j].b;
      const w = Math.min(a.right, b.right) - Math.max(a.left, b.left), h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (w > 2 && h > 2 && w * h > 0.08 * Math.min(a.width * a.height, b.width * b.height)) out.overlaps.push(`${things[i].id}+${things[j].id}`);
    }
  }
  // skinned panels drawn over something that is not inside them (later in the page paints on top)
  out.covered = [];
  for (const p of all) {
    if (!seen(getComputedStyle(p))) continue;
    const pb = p.getBoundingClientRect();
    if (pb.width < 4 || pb.height < 4 || pb.height > 0.95 * document.documentElement.scrollHeight) continue;
    for (const l of leaves) {
      if (p.contains(l.el) || l.el.contains(p)) continue;
      if (!(p.compareDocumentPosition(l.el) & Node.DOCUMENT_POSITION_PRECEDING)) continue;
      const w = Math.min(pb.right, l.r.right) - Math.max(pb.left, l.r.left), h = Math.min(pb.bottom, l.r.bottom) - Math.max(pb.top, l.r.top);
      if (w > 2 && h > 2 && w * h > 0.3 * l.r.width * l.r.height) out.covered.push(`${l.id} under ${p.getAttribute("data-viz")}`);
    }
  }
  out.overflow = Math.max(0, document.documentElement.scrollWidth - VW);
  return out;
}

const report = {};
for (const width of widthsArg.split(",").map(Number)) {
  await page.setViewport({ width, height: 2200 });
  await page.goto("about:blank");
  await page.goto(pathToFileURL(path.join(path.resolve(appDir), "index.html")).href + "#/" + form, { waitUntil: "load" });
  await new Promise((r) => setTimeout(r, 700));
  const result = await page.evaluate(lint);
  await page.setViewport({ width, height: Math.max(600, Math.min(2200, result.height + 24)) });
  await new Promise((r) => setTimeout(r, 150));
  await page.screenshot({ path: path.join(outDir, `${form}-${width}.png`) });
  report[width] = result;
}
await browser.close();
// covering the widest screen already has is the design's own (a chip on a card); only new covering is a problem
const widest = Math.max(...Object.keys(report).map(Number));
const designed = new Set(report[widest] ? report[widest].covered : []);
for (const [w, r] of Object.entries(report)) r.covered = +w === widest ? [] : r.covered.filter((c) => !designed.has(c));
console.log(JSON.stringify({ widths: report }));
