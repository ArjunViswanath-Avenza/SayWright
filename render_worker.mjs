// Long-running viz2react worker: one JSON request per stdin line, one JSON reply per stdout line.
//   {"id": 1, "project": "...", "outDir": "...", "forms": ["frmX"] | null}  ->  {"id": 1, "ok": true, "ms": 120, "report": {...}}
// Kept warm by server.py so a canvas refresh costs ~120 ms instead of a ~2 s Node start.
import readline from "node:readline";
import { pathToFileURL } from "node:url";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const { convert } = await import(pathToFileURL(path.join(here, "..", "viz2react", "src", "convert.js")).href);

const rl = readline.createInterface({ input: process.stdin });
let queue = Promise.resolve();
rl.on("line", (line) => {
  queue = queue.then(async () => {
    let req;
    try { req = JSON.parse(line); } catch { return; }
    const t = Date.now();
    try {
      const report = await convert({ project: req.project, outDir: req.outDir, forms: req.forms || null, channel: req.channel || "desktop" });
      process.stdout.write(JSON.stringify({ id: req.id, ok: true, ms: Date.now() - t, report }) + "\n");
    } catch (e) {
      process.stdout.write(JSON.stringify({ id: req.id, ok: false, ms: Date.now() - t, error: String(e && e.stack || e) }) + "\n");
    }
  });
});
process.stdout.write(JSON.stringify({ ready: true }) + "\n");
