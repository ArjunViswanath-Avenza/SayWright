"""Score a vision model (or the OCR + pixel reader, --model cv) on the held-out set (vision/eval: real AvenzaBank screens, never used for training).

    python vision/eval.py [--model qwen2.5vl:7b] [--only frmLogin-1366,frmProfile-640]

Predictions are cached in vision/eval/pred/<image>.<model>.json, so a run can be stopped and resumed, and the
base and fine-tuned models are compared on exactly the same images. Writes vision/eval/report_<model>.json.
"""
import argparse
import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from describe import describe  # noqa: E402
from detect import detect  # noqa: E402
from score import score  # noqa: E402

ap = argparse.ArgumentParser()
ap.add_argument("--model", default="qwen2.5vl:7b", help='an Ollama vision model, or "cv" for the OCR + pixel reader (detect.py)')
ap.add_argument("--fresh", action="store_true", help="ignore cached predictions (to re-run the reader after a change)")
ap.add_argument("--only")
a = ap.parse_args()
EV = HERE / "eval"
(EV / "pred").mkdir(exist_ok=True)
tag = re.sub(r"[^A-Za-z0-9.]+", "_", a.model)
rows = []
for truth_file in sorted(EV.glob("*.json")):
    if truth_file.name.startswith("report_") or (a.only and truth_file.stem not in a.only.split(",")):
        continue
    truth = json.loads(truth_file.read_text(encoding="utf-8"))
    pred_file = EV / "pred" / f"{truth_file.stem}.{tag}.json"
    if a.fresh or not pred_file.exists():
        pred = detect(EV / truth["image"]) if a.model == "cv" else describe(EV / truth["image"], a.model)
        pred_file.write_text(json.dumps(pred, indent=1, ensure_ascii=False), encoding="utf-8")
    pred = json.loads(pred_file.read_text(encoding="utf-8"))
    s = score(truth, pred)
    rows.append({"image": truth_file.stem, "seconds": pred["stats"]["wall_s"], **{k: s[k] for k in ("truth", "predicted", "matched", "recall", "precision", "mean_iou", "text_similarity", "by_type")}})
    print(f"{truth_file.stem:28} recall {s['recall']}  precision {s['precision']}  text {s['text_similarity']}  {pred['stats']['wall_s']} s", flush=True)


def mean(k):
    vals = [r[k] for r in rows if r[k] is not None]
    return round(sum(vals) / len(vals), 3) if vals else None


report = {"model": a.model, "images": len(rows), "recall": mean("recall"), "precision": mean("precision"),
          "mean_iou": mean("mean_iou"), "text_similarity": mean("text_similarity"), "seconds_per_image": mean("seconds"), "rows": rows}
(EV / f"report_{tag}.json").write_text(json.dumps(report, indent=1), encoding="utf-8")
print(json.dumps({k: v for k, v in report.items() if k != "rows"}, indent=1))
