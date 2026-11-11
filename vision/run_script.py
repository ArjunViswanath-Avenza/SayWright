"""Run a Saywright command script against a running backend; report failures and model use.
    python vision/run_script.py <script.txt> [--port 8771] [--save]"""
import argparse
import json
import urllib.request

ap = argparse.ArgumentParser()
ap.add_argument("script")
ap.add_argument("--port", default="8771")
ap.add_argument("--save", action="store_true")
a = ap.parse_args()


def post(path, body):
    r = urllib.request.Request(f"http://127.0.0.1:{a.port}{path}", json.dumps(body).encode(), {"Content-Type": "application/json"})
    return json.load(urllib.request.urlopen(r, timeout=600))


paths, fails, j = {}, [], None
steps = [l for l in open(a.script, encoding="utf-8").read().splitlines() if l.strip()]
for n, line in enumerate(steps, 1):
    j = post("/api/command", {"text": line, "refresh": n == len(steps)})     # the canvas only needs the finished form
    paths[str(j.get("path"))] = paths.get(str(j.get("path")), 0) + 1
    if not j["ok"] or j.get("path") == "model":
        fails.append(f"{n}: {line[:70]} -> {j['say'][:120]}")
print(json.dumps({"commands": sum(paths.values()), "paths": paths, "problems": fails, "form": j and j["form"],
                  "canvas": j and j["canvas"]}, indent=1))
if a.save:
    print(post("/api/save", {})["say"])
