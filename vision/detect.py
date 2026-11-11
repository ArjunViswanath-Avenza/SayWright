"""Read a screen image without a language model: OCR for the text, pixel analysis for everything else.
Output: the same schema as truth.mjs / describe.py, so plan.py and score.py work on it unchanged.

    python vision/detect.py <image.png> [--out pred.json]

Made for clean screens (screenshots, Figma exports): flat fills, sharp edges, rendered text. Seconds on a CPU.
  text      RapidOCR (local, Apache-2.0) finds and reads each line; a line whose words change colour is split
            ("Avenza" + "Bank", "New to Avenza Bank?" + "Open an account") and each part read again; lines of one
            paragraph (same left or centre, colour and size, tight spacing) are joined
  blocks    every region of one flat colour whose outline is (nearly) a rectangle: cards, panels, input fills and
            borders, button fills, checkbox outlines. Glyph-sized regions inside text lines are dropped; an outline
            ring and the fill just inside it become one block with a border
  types     a block with one line of centred text on a contrasting fill is a button; with left-aligned text (or
            none) and a border or its own fill it is an input, a dropdown when there is a mark at the right end;
            a small bordered square is a checkbox; a round or patterned block without text is an image (icon);
            everything else that holds things is a panel
"""
import argparse
import json
import pathlib
import re
import time

import cv2
import numpy as np
from PIL import Image

_OCR = None


def ocr():
    global _OCR
    if _OCR is None:
        from rapidocr_onnxruntime import RapidOCR
        _OCR = RapidOCR()
    return _OCR


def dist(a, b):
    return float(np.sqrt(((np.asarray(a, float) - np.asarray(b, float)) ** 2).sum()))


def mode_colour(pixels):
    """The most common colour among Nx3 pixels (quantised to find it, then averaged within the bucket)."""
    pixels = pixels.reshape(-1, 3)
    q = (pixels // 4).astype(np.int32)
    k = q[:, 0] * 4096 + q[:, 1] * 64 + q[:, 2]
    vals, cnt = np.unique(k, return_counts=True)
    return tuple(int(c) for c in pixels[k == vals[cnt.argmax()]].mean(0))


def same_ink(c1, c2, bg):
    """Two glyph colours are the same ink if they lie in the same direction from the background (a thin glyph is
    only a paler version of the same colour) and are not far apart."""
    if c1 is None or c2 is None:
        return True
    v1, v2 = np.asarray(c1, float) - bg, np.asarray(c2, float) - bg
    n1, n2 = np.linalg.norm(v1), np.linalg.norm(v2)
    if n1 < 1 or n2 < 1:
        return True
    cos = float(v1 @ v2 / (n1 * n2))
    # a short word's anti-aliasing tints it a little (#4a5568 read as 74,85,140 on "Move"): near in both direction and
    # value is the same ink. A real second colour ("Avenza" #11..32 / "Bank" #15..82) is about 0.98 and 80 apart.
    return cos > 0.995 or (cos > 0.985 and float(np.linalg.norm(v1 - v2)) < 45)


def split_text(text, cuts):
    """Fallback when a part cannot be read again: cut the line's text at the parts' relative positions, moved to the
    nearest word or case boundary ("AvenzaBank" -> "Avenza", "Bank")."""
    out, start = [], 0
    for f in cuts:
        i = round(f * len(text))
        best = min((j for j in range(start + 1, len(text)) if text[j - 1] == " " or (text[j - 1].islower() and text[j].isupper())),
                   key=lambda j: abs(j - i), default=i)
        best = best if abs(best - i) <= 3 else i
        out.append(text[start:best].strip())
        start = best
    return out + [text[start:].strip()]


def line_box(line):
    """A label's box as laid out, from its ink: the font size follows from the ink height (x0.93 with descenders
    g j p q y, x0.72 without, as in plan.py); the line box starts ~0.2 font above the ink and is ~1.15 font tall.
    Ink-tight boxes would make every rebuilt label a few px taller than its gap allows, and the drift adds up."""
    x1, y1, x2, y2 = line["box"]
    font = (y2 - y1) / (0.93 if re.search(r"[gjpqy]", line["text"]) else 0.72)
    top = int(round(y1 - 0.2 * font))
    return [x1, max(0, top), x2, int(round(top + 1.15 * font))]


def area(b):
    return max(0, b[2] - b[0]) * max(0, b[3] - b[1])


def inter(a, b):
    return area([max(a[0], b[0]), max(a[1], b[1]), min(a[2], b[2]), min(a[3], b[3])])


def inside(outer, inner, slack=2):
    return outer[0] - slack <= inner[0] and outer[1] - slack <= inner[1] and inner[2] <= outer[2] + slack and inner[3] <= outer[3] + slack


def centre_in(outer, inner):
    cx, cy = (inner[0] + inner[2]) / 2, (inner[1] + inner[3]) / 2
    return outer[0] <= cx <= outer[2] and outer[1] <= cy <= outer[3]


class Reader:
    def __init__(self, path):
        self.rgb = np.array(Image.open(path).convert("RGB"))
        self.H, self.W = self.rgb.shape[:2]
        self.bgr = np.ascontiguousarray(self.rgb[:, :, ::-1])
        self.page = mode_colour(self.rgb[::4, ::4])

    # ---------- text ----------
    def ink(self, box, bg, thr=60):
        """Ink mask of a box against its background: (tight box, mask, distance map) or None."""
        x1, y1, x2, y2 = box
        crop = self.rgb[y1:y2, x1:x2].astype(np.int16)
        d = np.sqrt(((crop - np.array(bg)) ** 2).sum(-1))
        m = d > thr
        if not m.any():
            return None
        ys, xs = np.where(m)
        return [x1 + int(xs.min()), y1 + int(ys.min()), x1 + int(xs.max()) + 1, y1 + int(ys.max()) + 1], m, d

    def read(self, box, bg):
        x1, y1, x2, y2 = box
        pad = 4
        crop = self.bgr[max(0, y1 - pad):min(self.H, y2 + pad), x1:x2]
        crop = cv2.copyMakeBorder(np.ascontiguousarray(crop), 0, 0, 8, 8, cv2.BORDER_CONSTANT, value=tuple(int(v) for v in bg[::-1]))
        res, _ = ocr()(crop, use_det=False, use_cls=False)
        return (res[0][1] if res else "").strip()

    def ink_colour(self, box, bg):
        got = self.ink(box, bg)
        if not got:
            return None
        _, m, d = got
        x1, y1, x2, y2 = box
        crop = self.rgb[y1:y2, x1:x2]
        strong = d >= 0.7 * d[m].max()
        return tuple(int(v) for v in np.median(crop[strong], 0))

    def split_colours(self, line):
        """A line whose glyphs change colour is two labels: return the parts (box, colour) left to right."""
        x1, y1, x2, y2 = line["box"]
        got = self.ink(line["box"], line["bg"])
        _, m, d = got
        crop = self.rgb[y1:y2, x1:x2]
        bg = np.array(line["bg"], float)
        h = y2 - y1
        # glyphs: runs of ink columns. Glyphs that touch ("Bank?Open") form one wide run: cut it into glyph-sized pieces
        cols = list(m.any(0)) + [False]
        pieces, start = [], None
        for i, v in enumerate(cols):
            if v and start is None:
                start = i
            elif not v and start is not None:
                step = max(3, int(0.45 * h))
                pieces += [(a, min(i, a + step)) for a in range(start, i, step)]
                start = None
        groups = []
        for a, b in pieces:
            # a glyph's own colour: its pixels farthest from the background (anti-aliased edges lie between ink and
            # background). A thin piece (l, i, 1, an edge) is all edge with sub-pixel colour fringes: no colour of
            # its own, it joins whatever is around it
            sd, sm = d[:, a:b], m[:, a:b]
            c = np.median(crop[:, a:b][sd >= np.percentile(sd[sm], 90)], 0) if b - a >= 0.3 * h and sm.sum() >= 6 else None
            if groups and (c is None or groups[-1]["c"] is None or same_ink(groups[-1]["c"], c, bg)):
                g = groups[-1]
                g["b"] = b
                if c is not None:
                    g["cs"].append(c)
                    g["c"] = np.median(g["cs"], 0)
            else:
                groups.append({"a": a, "b": b, "c": c, "cs": [] if c is None else [c]})

        def small(g):      # shorter than a word: noise, not a label of its own
            return len(g["cs"]) < 3 or g["b"] - g["a"] < 1.5 * h

        changed = True
        while changed and len(groups) > 1:
            changed = False
            for i in range(len(groups) - 1):
                g, k = groups[i], groups[i + 1]
                if small(g) or small(k) or same_ink(g["c"], k["c"], bg):
                    g["b"], g["cs"] = k["b"], g["cs"] + k["cs"]
                    g["c"] = np.median(g["cs"], 0) if g["cs"] else None
                    del groups[i + 1]
                    changed = True
                    break
        if len(groups) < 2:
            return None
        return [([x1 + g["a"], y1, x1 + g["b"], y2], tuple(int(v) for v in g["c"])) for g in groups]

    def text_lines(self):
        res, _ = ocr()(self.bgr)
        lines = []
        for pts, text, conf in res or []:
            xs, ys = [p[0] for p in pts], [p[1] for p in pts]
            box = [max(0, int(min(xs))), max(0, int(min(ys))), min(self.W, int(max(xs)) + 1), min(self.H, int(max(ys)) + 1)]
            bg = mode_colour(self.rgb[box[1]:box[3], box[0]:box[2]])
            got = self.ink(box, bg)
            if not got or not text.strip():
                continue
            line = {"text": text.strip(), "box": got[0], "bg": bg, "conf": float(conf)}
            parts = self.split_colours(line)
            if parts:
                guesses = split_text(text.strip(), [(pb[0] - got[0][0]) / max(1, got[0][2] - got[0][0]) for pb, _ in parts[1:]])
                for (pbox, colour), guess in zip(parts, guesses):
                    lines.append({"text": self.read(pbox, bg) or guess, "box": pbox, "bg": bg, "colour": colour, "conf": float(conf)})
            else:
                line["colour"] = self.ink_colour(line["box"], bg)
                lines.append(line)
        return lines

    # ---------- blocks ----------
    def blocks(self):
        img = self.rgb
        q = (img // 8).astype(np.int32)
        key = q[..., 0] * 1024 + q[..., 1] * 32 + q[..., 2]
        vals, counts = np.unique(key, return_counts=True)
        found = []
        for v in vals[counts >= 60]:
            mask = (key == v).astype(np.uint8)
            n, lab, stats, _ = cv2.connectedComponentsWithStats(mask, connectivity=4)
            w_, h_ = stats[:, 2], stats[:, 3]
            bar = (np.minimum(w_, h_) >= 5) & (np.maximum(w_, h_) >= 30) & (np.maximum(w_, h_) >= 4 * np.minimum(w_, h_))
            for i in np.nonzero(((w_ >= 12) & (h_ >= 12)) | bar)[0]:
                if i == 0:
                    continue
                x, y, w, h, a = (int(s) for s in stats[i])
                comp = (lab[y:y + h, x:x + w] == i).astype(np.uint8)
                cnts, _ = cv2.findContours(comp, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                outline = max(cv2.contourArea(c) for c in cnts)
                ratio = outline / max(1, (w - 1) * (h - 1))
                # a region that runs along its whole bounding box is a rectangle even when a child touching one side
                # cuts a notch into its outline (a side panel whose card starts 1 px below the top)
                edge = np.concatenate([comp[0], comp[-1], comp[:, 0], comp[:, -1]]).mean()
                if ratio < 0.74 and edge < 0.9:
                    continue
                colour = tuple(int(c) for c in img[y:y + h, x:x + w][comp.astype(bool)].mean(0))
                found.append({"box": [x, y, x + w, y + h], "colour": colour, "own": a / (w * h), "ratio": ratio})
        return found

    def soft_panels(self, known):
        """Panels with a gradient fill have no flat colour for blocks() to find, so they are found from their outline:
        a closed, nearly rectangular edge whose opposite corners differ in colour, with little detail inside. Flat
        panels never pass the corner test; photos fail the detail test."""
        gray = cv2.cvtColor(self.bgr, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 25, 70)
        cnts, _ = cv2.findContours(cv2.dilate(edges, np.ones((3, 3), np.uint8)), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
        found = []
        for c in sorted(cnts, key=cv2.contourArea, reverse=True):
            x, y, w, h = cv2.boundingRect(c)
            box = [x, y, x + w, y + h]
            if w < 100 or h < 60 or w * h > 0.6 * self.W * self.H or cv2.contourArea(c) < 0.7 * w * h:
                continue
            if any(inter(box, k["box"]) > 0.6 * max(area(box), area(k["box"])) for k in known + found):
                continue
            r, pw, ph = max(4, min(w, h) // 12), max(10, w // 7), max(10, h // 7)
            corner = lambda cx, cy: mode_colour(self.rgb[cy:cy + ph, cx:cx + pw].reshape(-1, 3))  # noqa: E731
            tl, tr = corner(x + r, y + r), corner(x + w - r - pw, y + r)
            bl, br = corner(x + r, y + h - r - ph), corner(x + w - r - pw, y + h - r - ph)
            if max(dist(tl, br), dist(tr, bl), dist(tl, bl), dist(tl, tr)) <= 45:
                continue
            if edges[y + 4:y + h - 4, x + 4:x + w - 4].mean() / 255 > 0.08:
                continue
            found.append({"box": box, "colour": tuple(int(v) for v in self.rgb[y:y + h, x:x + w].reshape(-1, 3).mean(0)), "own": 1.0, "ratio": 1.0})
        return found

    # ---------- putting it together ----------
    def run(self):
        t0 = time.time()
        lines = self.text_lines()
        t_ocr = time.time() - t0
        raw = self.blocks()
        raw += self.soft_panels(raw)
        page_area = self.W * self.H
        blocks = []
        for b in raw:
            box = b["box"]
            b["ring"] = b["own"] < 0.5
            if area(box) > 0.97 * page_area and not b["ring"]:      # the page background (a framed page is kept)
                continue
            # glyphs and pieces of glyphs inside a text line
            if any(inter(box, l["box"]) > 0.6 * area(box) and (box[3] - box[1]) < 1.6 * (l["box"][3] - l["box"][1]) for l in lines):
                continue
            blocks.append(b)
        # an outline ring and the fill right inside it are one block with a border
        for r in [b for b in blocks if b["ring"]]:
            for f in blocks:
                if f is r or f.get("gone") or f["ring"]:
                    continue
                fb, rb = f["box"], r["box"]
                if inside(rb, fb, 0) and max(fb[0] - rb[0], fb[1] - rb[1], rb[2] - fb[2], rb[3] - fb[3]) <= 4:
                    r["fill"], r["border"] = f["colour"], r["colour"]
                    f["gone"] = True
                    break
        blocks = [b for b in blocks if not b.get("gone")]
        for b in blocks:
            if b["ring"] and "fill" not in b:
                b["border"] = b["colour"]
                b["fill"] = None
            elif not b["ring"]:
                b["fill"], b["border"] = b["colour"], None
                self.outline(b)
        # near-identical boxes (a fill and its anti-aliased edge): keep one
        blocks.sort(key=lambda b: -area(b["box"]))
        kept = []
        for b in blocks:
            twin = next((k for k in kept if max(abs(p - q) for p, q in zip(k["box"], b["box"])) <= 3), None)
            if twin:
                twin["border"] = twin["border"] or (b["colour"] if b["ring"] else None)
                continue
            kept.append(b)
        blocks = kept
        # containment: smallest block around each block / line
        by_size = sorted(blocks, key=lambda b: area(b["box"]))
        for b in blocks:
            b["parent"] = next((p for p in by_size if p is not b and area(p["box"]) > area(b["box"]) and inside(p["box"], b["box"])), None)
            b["kids"], b["texts"] = [], []
        for b in blocks:
            if b["parent"]:
                b["parent"]["kids"].append(b)
        for l in lines:
            l["parent"] = next((p for p in by_size if centre_in(p["box"], l["box"]) and inter(p["box"], l["box"]) > 0.7 * area(l["box"])), None)
            if l["parent"]:
                l["parent"]["texts"].append(l)
        elements = []
        for b in blocks:
            t = self.classify(b)
            b["type"] = t
            text = ""
            if t in ("button", "input", "dropdown") and b["texts"]:
                text = " ".join(l["text"] for l in sorted(b["texts"], key=lambda l: l["box"][0]))
                for l in b["texts"]:
                    l["used"] = True
            if t == "image" and b["fill"] and dist(b["fill"], self.behind(b)) > 6:
                elements.append({"type": "panel", "text": "", "bbox_2d": b["box"]})       # an icon on a tinted tile
            elements.append({"type": t, "text": text, "bbox_2d": b["box"]})
        for m in self.marks(blocks, lines):
            elements.append(m)
        for para in self.paragraphs([l for l in lines if not l.get("used")]):
            boxes = [line_box(l) for l in para]
            elements.append({"type": "text", "text": " ".join(l["text"] for l in para),
                             "bbox_2d": [min(b[0] for b in boxes), boxes[0][1], max(b[2] for b in boxes), boxes[-1][3]]})
        return elements, {"ocr_s": round(t_ocr, 1), "wall_s": round(time.time() - t0, 1), "lines": len(lines), "blocks": len(blocks)}

    def marks(self, blocks, lines):
        """Small things that are neither text nor flat blocks: radio circles, ticks, icons (anti-aliased curves break
        them into many colours, so they never form one flat region). Everything that differs from the background it
        sits on, minus text, blocks and their edges."""
        bgimg = np.empty_like(self.rgb)
        bgimg[:] = self.page
        for b in sorted(blocks, key=lambda b: -area(b["box"])):
            if b["fill"]:
                x1, y1, x2, y2 = b["box"]
                bgimg[y1:y2, x1:x2] = b["fill"]
        diff = np.sqrt(((self.rgb.astype(np.int32) - bgimg) ** 2).sum(-1)) > 50
        for l in lines:
            x1, y1, x2, y2 = l["box"]
            diff[max(0, y1 - 3):y2 + 3, max(0, x1 - 3):x2 + 3] = False
        for b in blocks:
            x1, y1, x2, y2 = b["box"]
            if b["type"] != "panel" or b["ratio"] < 0.95:     # whole (a round block's corners are not marks)
                diff[max(0, y1 - 2):y2 + 2, max(0, x1 - 2):x2 + 2] = False
            else:       # its edge (border, anti-aliased corners)
                for ya, yb, xa, xb in ((y1 - 3, y1 + 4, x1 - 3, x2 + 3), (y2 - 4, y2 + 3, x1 - 3, x2 + 3),
                                       (y1 - 3, y2 + 3, x1 - 3, x1 + 4), (y1 - 3, y2 + 3, x2 - 4, x2 + 3)):
                    diff[max(0, ya):max(0, yb), max(0, xa):max(0, xb)] = False
        diff = cv2.dilate(diff.astype(np.uint8), np.ones((3, 3), np.uint8))
        n, lab, stats, _ = cv2.connectedComponentsWithStats(diff, connectivity=8)
        out = []
        for i in range(1, n):
            x, y, w, h, a = (int(v) for v in stats[i])
            x, y, w, h = x + 1, y + 1, w - 2, h - 2          # undo the dilation
            if not (10 <= w <= 160 and 10 <= h <= 160) or max(w, h) > 3 * min(w, h):
                continue
            box = [x, y, x + w, y + h]
            behind = tuple(int(v) for v in bgimg[y + h // 2, x + w // 2])
            core = self.rgb[y + h // 3:y + 2 * h // 3 + 1, x + w // 3:x + 2 * w // 3 + 1]
            empty = (np.sqrt(((core.astype(float) - behind) ** 2).sum(-1)) < 40).mean() > 0.8
            out.append({"type": "checkbox" if max(w, h) <= 40 and max(w, h) <= 1.4 * min(w, h) and empty else "image",
                        "text": "", "bbox_2d": box})
        return out

    def outline(self, b):
        """A fill whose thin border was not found as a block of its own (anti-aliased corners break the ring into
        pieces): a 1-3 px band around the box that is one colour, unlike the fill and unlike what lies beyond."""
        x1, y1, x2, y2 = b["box"]
        for t in (1, 2, 3):
            # the sides that are inside the image (a box cut off by the bottom edge still shows three)
            sides, far = [], []
            if y1 - t - 2 >= 0:
                sides.append(self.rgb[y1 - t, x1 + 3:x2 - 3]); far.append(self.rgb[y1 - t - 2, x1 + 3:x2 - 3])
            if y2 + t + 1 < self.H:
                sides.append(self.rgb[y2 + t - 1, x1 + 3:x2 - 3]); far.append(self.rgb[y2 + t + 1, x1 + 3:x2 - 3])
            if x1 - t - 2 >= 0:
                sides.append(self.rgb[y1 + 3:y2 - 3, x1 - t]); far.append(self.rgb[y1 + 3:y2 - 3, x1 - t - 2])
            if x2 + t + 1 < self.W:
                sides.append(self.rgb[y1 + 3:y2 - 3, x2 + t - 1]); far.append(self.rgb[y1 + 3:y2 - 3, x2 + t + 1])
            if len(sides) < 3:
                return
            band = np.concatenate(sides)
            c = mode_colour(band)
            share = (np.sqrt(((band.astype(float) - c) ** 2).sum(-1)) < 30).mean()
            beyond = mode_colour(np.concatenate(far))
            if share > 0.8 and dist(c, b["fill"]) > 25 and dist(c, beyond) > 25:
                b["border"] = c
                b["box"] = [max(0, x1 - t), max(0, y1 - t), min(self.W, x2 + t), min(self.H, y2 + t)]
                return

    def behind(self, b):
        return b["parent"]["fill"] if b["parent"] and b["parent"]["fill"] else self.page

    def classify(self, b):
        x1, y1, x2, y2 = b["box"]
        w, h = x2 - x1, y2 - y1
        behind = self.behind(b)
        contrast = dist(b["fill"], behind) if b["fill"] else 0
        texts, kids = b["texts"], b["kids"]
        if not kids and len(texts) == 1 and 20 <= h <= 110 and w >= 1.2 * h:
            t = texts[0]["box"]
            th = t[3] - t[1]
            if abs((t[1] + t[3]) / 2 - (y1 + y2) / 2) > 0.2 * h:      # a heading at the top of a band, not a caption
                return "panel"
            centred = abs((t[0] + t[2]) / 2 - (x1 + x2) / 2) < 0.12 * w and th < 0.75 * h
            offset = t[0] - x1
            if centred and contrast > 40 and w < 8 * h:
                return "button"
            # text at the left padding is a placeholder or value, even when a short one in a narrow box looks centred
            if (offset < 24 or (offset < 0.25 * w and not centred)) and (b["border"] or contrast > 6):
                return "dropdown" if self.chevron(b, t) else "input"
            if centred and (contrast > 40 or b["border"]):        # filled or outlined button
                return "button"
        if not kids and not texts:
            if max(w, h) <= 40 and 0.7 <= w / h <= 1.4 and b["border"]:
                return "checkbox"
            if 20 <= h <= 110 and w >= 3 * h and b["border"]:
                return "dropdown" if self.chevron(b, None) else "input"
            if b["ratio"] < 0.9 or self.patterned(b):
                return "image"
        return "panel"

    def chevron(self, b, text_box):
        """A dropdown has a mark (chevron, arrow) at the right end that is not text."""
        x1, y1, x2, y2 = b["box"]
        start = max(text_box[2] + 6 if text_box else x1 + 4, x2 - max(48, (y2 - y1)))
        region = [start, y1 + 4, x2 - 4, y2 - 4]
        if region[2] - region[0] < 6:
            return False
        got = self.ink(region, b["fill"] or self.page, thr=60)
        return bool(got) and got[1].sum() >= 12

    def patterned(self, b):
        """An icon or picture: a block without text whose inside is not one flat colour."""
        x1, y1, x2, y2 = b["box"]
        got = self.ink([x1 + 2, y1 + 2, x2 - 2, y2 - 2], b["fill"] or self.page, thr=60)
        return bool(got) and got[1].mean() > 0.04

    para_gap = 0.6    # the gap between two lines of a paragraph, as a share of their ink height

    def paragraphs(self, lines):
        """Lines of one paragraph: same container, left (or centre), colour and size; next line close below."""
        lines = sorted(lines, key=lambda l: (l["box"][1], l["box"][0]))
        paras = []
        for l in lines:
            b, h = l["box"], l["box"][3] - l["box"][1]
            for p in paras:
                last = p[-1]["box"]
                lh = last[3] - last[1]
                same_edge = abs(b[0] - last[0]) <= 6 or abs((b[0] + b[2]) / 2 - (last[0] + last[2]) / 2) <= 6
                if (p[-1]["parent"] is l["parent"] and same_edge and -0.45 * max(h, lh) <= b[1] - last[3] <= self.para_gap * max(h, lh)
                        and abs(h - lh) <= 0.3 * max(h, lh) and dist(p[-1]["colour"] or (0, 0, 0), l["colour"] or (0, 0, 0)) < 40):
                    p.append(l)
                    break
            else:
                paras.append([l])
        return paras


def detect(image_path):
    image_path = pathlib.Path(image_path)
    r = Reader(image_path)
    elements, stats = r.run()
    return {"image": image_path.name, "width": r.W, "height": r.H, "elements": elements,
            "stats": {"model": "ocr+pixels", **stats}}


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("image")
    ap.add_argument("--out")
    a = ap.parse_args()
    res = detect(a.image)
    if a.out:
        pathlib.Path(a.out).write_text(json.dumps(res, indent=1, ensure_ascii=False), encoding="utf-8")
    for e in res["elements"]:
        print(e["type"], e["bbox_2d"], repr(e["text"]))
    print(json.dumps(res["stats"]))
