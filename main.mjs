// Saywright desktop shell: starts the local Python backend, opens one window on it, stops it on quit.
// Everything stays on 127.0.0.1; the window may use the microphone only for that origin.
import { app, BrowserWindow, session, shell } from "electron";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.SAYWRIGHT_PORT || "8770";
const ORIGIN = `http://127.0.0.1:${PORT}`;
let backend = null, win = null, quitting = false, restarts = 0;

async function up() {
  try { return (await fetch(`${ORIGIN}/api/status`)).ok; } catch { return false; }
}

async function startBackend() {
  if (await up()) return;                       // already running (e.g. started by hand for debugging)
  backend = spawn(process.env.SAYWRIGHT_PYTHON || "python", [path.join(here, "server.py")], {
    cwd: here, env: { ...process.env, SAYWRIGHT_PORT: PORT, PYTHONUNBUFFERED: "1" }, stdio: ["ignore", "inherit", "inherit"],
    windowsHide: true,
  });
  backend.on("exit", async (code) => {
    backend = null;
    if (quitting || ++restarts > 3) return;     // a backend that cannot start must not respawn forever
    // stopped while the app is open (crash, killed): start it again and reload the window
    console.error(`Saywright backend exited (${code}); restarting`);
    try { await startBackend(); if (win && !win.isDestroyed()) win.reload(); } catch (e) { console.error(e.message); }
  });
  for (let i = 0; i < 240; i++) {               // first start loads Whisper's Python libs and copies the project
    if (await up()) return;
    if (!backend) throw new Error("backend failed to start");
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("backend did not answer within 60 s");
}

function createWindow() {
  win = new BrowserWindow({
    width: 1500, height: 920, minWidth: 1100, minHeight: 680, title: "Saywright", backgroundColor: "#f6f4f1",
    autoHideMenuBar: true, show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
  });
  win.once("ready-to-show", () => win.show());
  // links out of the app (none today) open in the system browser, never inside the shell
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: "deny" }; });
  win.webContents.on("will-navigate", (e, url) => { if (!url.startsWith(ORIGIN)) e.preventDefault(); });
  win.loadURL(ORIGIN);
}

app.whenReady().then(async () => {
  // microphone for our own origin only
  session.defaultSession.setPermissionRequestHandler((wc, permission, cb, details) =>
    cb(permission === "media" && (details.requestingUrl || "").startsWith(ORIGIN)));
  session.defaultSession.setPermissionCheckHandler((wc, permission, origin) => permission === "media" && origin === ORIGIN);
  try {
    await startBackend();
  } catch (e) {
    const { dialog } = await import("electron");
    dialog.showErrorBox("Saywright", `The local backend did not start: ${e.message}\nRun: python server.py in ${here} to see why.`);
    app.quit();
    return;
  }
  createWindow();
});

app.on("window-all-closed", () => app.quit());
app.on("before-quit", () => { quitting = true; });
app.on("will-quit", () => { quitting = true; if (backend) backend.kill(); });
