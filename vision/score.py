"""Score a model's screen description against ground truth (both in truth.mjs's schema).

    python vision/score.py <truth.json> <pred.json>

Matching: same type, boxes overlapping (IoU >= 0.3, or the predicted box's centre inside the true box), greedy by
IoU. If a model's coordinates are in a resized space (its maximum x/y fall well short of or beyond the image),
they are rescaled to the image first; the factor is reported. Text accuracy = similarity of matched texts.
"""
import difflib
import json
import sys


def iou(a, b):
    ix = max(0, min(a[2], b[2]) - max(a[0], b[0]))
    iy = max(0, min(a[3], b[3]) - max(a[1], b[1]))
    inter = ix * iy
    union = (a[2] - a[0]) * (a[3] - a[1]) + (b[2] - b[0]) * (b[3] - b[1]) - inter
    return inter / union if union > 0 else 0.0


def centre_in(p, t):
    cx, cy = (p[0] + p[2]) / 2, (p[1] + p[3]) / 2
    return t[0] <= cx <= t[2] and t[1] <= cy <= t[3]


def rescale(pred, width, height):
    boxes = [e["bbox_2d"] for e in pred if len(e.get("bbox_2d", [])) == 4]
    if not boxes:
        return pred, 1.0, 1.0
    mx, my = max(b[2] for b in boxes), max(b[3] for b in boxes)
    sx = width / mx if mx > width * 1.05 or mx < width * 0.6 else 1.0
    sy = height / my if my > height * 1.05 or my < height * 0.6 else 1.0
    if sx == 1.0 and sy == 1.0:
        return pred, sx, sy
    return [{**e, "bbox_2d": [e["bbox_2d"][0] * sx, e["bbox_2d"][1] * sy, e["bbox_2d"][2] * sx, e["bbox_2d"][3] * sy]}
            for e in pred if len(e.get("bbox_2d", [])) == 4], sx, sy


def score(truth, pred):
    T = truth["elements"]
    P = [e for e in pred["elements"] if len(e.get("bbox_2d", [])) == 4]
    sx = sy = 1.0
    if pred.get("stats", {}).get("model") != "ocr+pixels":     # detect.py measures pixels; only a model's boxes can be off-scale
        P, sx, sy = rescale(P, truth["width"], truth["height"])
    pairs = sorted(((iou(p["bbox_2d"], t["bbox_2d"]), i, j) for i, p in enumerate(P) for j, t in enumerate(T)
                    if p["type"] == t["type"] and (iou(p["bbox_2d"], t["bbox_2d"]) >= 0.3 or centre_in(p["bbox_2d"], t["bbox_2d"]))),
                   reverse=True)
    used_p, used_t, matches = set(), set(), []
    for v, i, j in pairs:
        if i in used_p or j in used_t:
            continue
        used_p.add(i); used_t.add(j)
        matches.append((P[i], T[j], v))
    texts = [difflib.SequenceMatcher(None, p["text"].strip().lower(), t["text"].strip().lower()).ratio()
             for p, t, _ in matches if t["text"]]
    by_type = {}
    for t in T:
        by_type.setdefault(t["type"], [0, 0])[1] += 1
    for _, t, _ in matches:
        by_type[t["type"]][0] += 1
    return {
        "truth": len(T), "predicted": len(P), "matched": len(matches),
        "recall": round(len(matches) / len(T), 2) if T else None,
        "precision": round(len(matches) / len(P), 2) if P else None,
        "mean_iou": round(sum(v for *_, v in matches) / len(matches), 2) if matches else None,
        "text_similarity": round(sum(texts) / len(texts), 2) if texts else None,
        "by_type": {k: f"{a}/{b}" for k, (a, b) in sorted(by_type.items())},
        "missed": [f"{t['type']} '{t['text'][:30]}'" for j, t in enumerate(T) if j not in used_t],
        "extra": [f"{p['type']} '{p['text'][:30]}'" for i, p in enumerate(P) if i not in used_p],
        "coord_scale": [round(sx, 3), round(sy, 3)],
    }


if __name__ == "__main__":
    truth = json.load(open(sys.argv[1], encoding="utf-8"))
    pred = json.load(open(sys.argv[2], encoding="utf-8"))
    print(json.dumps(score(truth, pred), indent=1, ensure_ascii=False))
