"""Image (screenshot or Figma export) -> Saywright command script, all local.

    python vision/image2form.py <image.png> "<form name in words>" [--width 1366] [--reader cv|model]
                                [--model qwen2.5vl:7b] [--run 8770] [--description existing.json]

1. read          detect.py (default): OCR + pixel analysis lists what is visible (type, text, box)    ~3-10 s
                 describe.py (--reader model): the local vision model does the same                    ~6 min on CPU
2. plan.py       code turns that into containers, rows, sizes and real project skins        <1 s
3. writes        vision/out/<form>.txt (the script) and <form>.description.json
4. --run PORT    optionally runs the script in a Saywright backend (8770 = the desktop app, 8771 = test copy)
"""
import argparse
import json
import pathlib
import re
import subprocess
import sys

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from describe import describe  # noqa: E402
from detect import detect  # noqa: E402
from plan import Planner  # noqa: E402

ap = argparse.ArgumentParser()
ap.add_argument("image")
ap.add_argument("form", help='e.g. "transfer money"')
ap.add_argument("--width", type=int, default=1366, help="the form width the image shows (1366 desktop, 640 mobile)")
ap.add_argument("--reader", choices=("cv", "model"), default="cv",
                help="cv = OCR + pixels (fast, for screenshots and Figma exports); model = the vision model (photos, sketches)")
ap.add_argument("--model", default="qwen2.5vl:7b")
ap.add_argument("--description", help="reuse a description instead of calling the model")
ap.add_argument("--run", metavar="PORT", help="run the script in the Saywright backend on this port")
a = ap.parse_args()

out = HERE / "out"
out.mkdir(exist_ok=True)
stem = "frm" + "".join(w.capitalize() for w in re.findall(r"[A-Za-z0-9]+", a.form))
if a.description:
    desc = json.load(open(a.description, encoding="utf-8"))
else:
    print(f"Reading {a.image} with {'OCR + pixels' if a.reader == 'cv' else a.model} (local)...", flush=True)
    desc = detect(a.image) if a.reader == "cv" else describe(a.image, a.model)
    print(f"  {len(desc['elements'])} elements in {desc['stats']['wall_s']} s", flush=True)
    (out / f"{stem}.description.json").write_text(json.dumps(desc, indent=1, ensure_ascii=False), encoding="utf-8")
lines = Planner(desc, a.image, a.form, a.width).script()
script = out / f"{stem}.txt"
script.write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"Script: {script} ({len(lines)} commands)")
if a.run:
    subprocess.run([sys.executable, str(HERE / "run_script.py"), str(script), "--port", a.run], check=False)
