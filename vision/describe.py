"""Ask a local vision model what is on a screen image. Output: the same schema as truth.mjs.

    python vision/describe.py <image.png> [--model qwen2.5vl:7b] [--out pred.json]

The model only says WHAT is visible (type, text, box). Turning that into Visualizer structure, skins and commands
is code (plan.py): models invent ids and skin names and misjudge sizes, code does not.
"""
import argparse
import base64
import json
import pathlib
import time
import urllib.request

from PIL import Image

TYPES = ["panel", "text", "input", "dropdown", "button", "checkbox", "image"]

PROMPT = """You are reading a screenshot of a banking app screen ({w} x {h} pixels) so it can be rebuilt.
List every visible element as JSON: {{"elements": [{{"type": ..., "text": ..., "bbox_2d": [x1, y1, x2, y2]}}]}}

Types:
- panel: an area you can see as a block (its own background colour or a border): side panels, cards, header bands
- text: any text that is not inside an input or a button (headings, labels, links, paragraphs); one element per line or label
- input: a text box (text = its placeholder or value)
- dropdown: a select box
- button: a filled or outlined button (text = its caption)
- checkbox: a small square box to tick
- image: a picture, logo image or icon

Rules: copy texts exactly as written. bbox_2d is in pixels of this image, x1,y1 = top-left, x2,y2 = bottom-right.
List panels first, then the elements inside them from top to bottom, left to right. Do not skip small texts."""

SCHEMA = {
    "type": "object",
    "properties": {"elements": {"type": "array", "items": {
        "type": "object",
        "properties": {"type": {"type": "string", "enum": TYPES}, "text": {"type": "string"},
                       "bbox_2d": {"type": "array", "items": {"type": "integer"}, "minItems": 4, "maxItems": 4}},
        "required": ["type", "text", "bbox_2d"]}}},
    "required": ["elements"],
}


def describe(image_path, model="qwen2.5vl:7b", host="http://127.0.0.1:11434", timeout=1800):
    image_path = pathlib.Path(image_path)
    w, h = Image.open(image_path).size
    body = {
        "model": model, "stream": False, "format": SCHEMA,
        "options": {"temperature": 0, "num_ctx": 8192, "num_predict": 3000},
        "messages": [{"role": "user", "content": PROMPT.format(w=w, h=h),
                      "images": [base64.b64encode(image_path.read_bytes()).decode()]}],
    }
    req = urllib.request.Request(f"{host}/api/chat", json.dumps(body).encode(), {"Content-Type": "application/json"})
    t0 = time.time()
    reply = json.load(urllib.request.urlopen(req, timeout=timeout))
    wall = time.time() - t0
    try:
        elements = json.loads(reply["message"]["content"]).get("elements", [])
    except json.JSONDecodeError:
        elements = []
    stats = {"model": model, "wall_s": round(wall, 1),
             "prompt_tokens": reply.get("prompt_eval_count"), "output_tokens": reply.get("eval_count"),
             "prompt_s": round((reply.get("prompt_eval_duration") or 0) / 1e9, 1),
             "output_s": round((reply.get("eval_duration") or 0) / 1e9, 1)}
    if stats["output_s"]:
        stats["output_tok_per_s"] = round(stats["output_tokens"] / stats["output_s"], 2)
    return {"image": image_path.name, "width": w, "height": h, "elements": elements, "stats": stats}


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("image")
    ap.add_argument("--model", default="qwen2.5vl:7b")
    ap.add_argument("--out")
    a = ap.parse_args()
    res = describe(a.image, a.model)
    out = pathlib.Path(a.out or pathlib.Path(a.image).with_suffix(".pred.json"))
    out.write_text(json.dumps(res, indent=1, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(res["stats"]), f"{len(res['elements'])} elements ->", out)
