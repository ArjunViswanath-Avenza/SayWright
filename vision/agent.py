"""Image agent: one image in, one Saywright prompt out. No form name, no options, no model, everything on this machine.

    python vision/agent.py <image.png> [--name "transfer money"] [--width 1366] [--mode free|rows] [--out prompt.txt]

The prompt is what a person would write by hand (see prompts/avenza_onboarding_home.txt): the skins first, then every
widget by name. It runs through Saywright's normal command path, so each step is undoable and can be edited before it runs.

1. read    OCR lines (detect.Reader), with spaces and icon characters repaired word by word
2. see     closed rectangular outlines (cards, chips, buttons, tiles, also on gradients and glass) + flat-colour blocks
3. name    what each box is, from its text and shape: button, input, checkbox, tile, panel
4. style   plan.py's skin measuring: the nearest project skin, or a new one when nothing is close; glows on the page
5. place   free (default):  every widget at its measured position. Measured on 8 real AvenzaBank screens: 233 of 266
                            elements come back where they were, against 83 of 266 for rows
           rows:            plan.py's rows and columns, which keep flowing when the screen narrows
"""
import argparse
import difflib
import hashlib
import json
import pathlib
import re
import sys

import cv2
import numpy as np

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from detect import Reader, area, centre_in, detect, inside, inter, line_box, mode_colour, ocr  # noqa: E402
from plan import DEFAULT_PROJECT, Ids, Pixels, Planner, _hexs, cdist, load_skins  # noqa: E402
from skinmaker import auto_name, clean  # noqa: E402

LEADING_ICON = set("@©®OoC0•·*⊙◎○●")
SHORT_WORDS = {"a", "i", "an", "as", "at", "be", "by", "do", "go", "if", "in", "is", "it", "me", "my", "no", "of", "on", "or", "so", "to", "up", "us", "we"}
TRAILING_ICON = {"+": "→", "→": "→", ">": "→", "»": "→", "-": "→", "›": "→"}


# ---------- text repair ----------
def rec(reader, box, bg, zoom=3, retry=False):
    """Recognise one piece of a line, enlarged, on its own background. -> (text, score)"""
    x1, y1, x2, y2 = box
    crop = reader.bgr[max(0, y1 - 3):min(reader.H, y2 + 3), max(0, x1 - 1):min(reader.W, x2 + 1)]
    if crop.size == 0:
        return "", 0.0
    crop = cv2.copyMakeBorder(np.ascontiguousarray(crop), 4, 4, 8, 8, cv2.BORDER_CONSTANT, value=tuple(int(v) for v in bg[::-1]))
    for z in ((zoom, 2, 4) if retry else (zoom,)):      # short words ("in", "~6") can come back empty at one size and fine at another
        # the recogniser directly: about 10x faster than a full OCR call, and a line is already cut out here
        res, _ = ocr().text_recognizer([cv2.resize(crop, None, fx=z, fy=z, interpolation=cv2.INTER_CUBIC)])
        if res and (res[0][0] or "").strip() and float(res[0][1]) >= 0.5:
            return res[0][0].strip(), float(res[0][1])
    return "", 0.0


def chunks(reader, line):
    """The line's ink split at the gaps wide enough to be spaces. -> [(x1, x2)], gap threshold"""
    x1, y1, x2, y2 = line["box"]
    diff = np.abs(reader.rgb[y1:y2, x1:x2].astype(np.int32) - np.array(line["bg"])).sum(axis=2)
    cols = (diff > 70).any(axis=0)
    h = y2 - y1
    # a space is wider than the line's usual gap between letters; bold text has narrow spaces for its height
    runs, run = [], 0
    for on in cols:
        if on:
            if run:
                runs.append(run)
            run = 0
        else:
            run += 1
    letter = sorted(runs)[len(runs) // 2] if runs else 1
    cut = max(2, min(round(0.2 * h), 2 * letter + 1))
    out, start, gap = [], None, 0
    for i, on in enumerate(list(cols) + [False] * (cut + 1)):
        if on:
            if start is None:
                start = i
            gap = 0
        elif start is not None:
            gap += 1
            if gap >= cut:
                out.append((x1 + start, x1 + i - gap + 1))
                start, gap = None, 0
    return out


def read_run(reader, box, bg):
    """One run of ink, which may still hold several words (bold text has narrow spaces). Sizes disagree about spaces, not
    about letters, so read long runs at three sizes and keep the one with the most spaces whose letters agree."""
    x1, y1, x2, y2 = box
    first = rec(reader, box, bg, retry=True)[0]
    if x2 - x1 < 5 * (y2 - y1):
        return first
    best = first
    letters = lambda t: re.sub(r"[^a-z0-9]", "", t.lower())  # noqa: E731
    for zoom in (1, 2):
        got = rec(reader, box, bg, zoom=zoom)[0]
        if got.count(" ") > best.count(" ") and difflib.SequenceMatcher(None, letters(got), letters(first)).ratio() >= 0.9:
            best = got
    return best


def align(core, words, parts):
    """Cut the line's letters into the words seen in the ink. A word that could not be read on its own takes the letters
    between its neighbours, shared out by how wide each was. -> text with spaces, or None if the readable words do not fit."""
    squeeze = re.sub(r"\s+", "", core)
    low = squeeze.lower()
    out, pending, i = [], [], 0

    def flush(end):
        nonlocal i
        chunk = squeeze[i:end]
        if pending:
            total = sum(pending) or 1
            start = 0
            for k, width in enumerate(pending):
                stop = len(chunk) if k == len(pending) - 1 else start + round(len(chunk) * width / total)
                if chunk[start:stop]:
                    out.append(chunk[start:stop])
                start = stop
            pending.clear()
        elif chunk:
            out.append(chunk)
        i = end

    for (a, b), part in zip(words, parts):
        key = re.sub(r"\s+", "", part).lower()
        at = low.find(key, i, i + len(key) + 4 + 3 * len(pending)) if key else -1
        if at < 0:
            pending.append(b - a)
            continue
        flush(at)
        out.append(squeeze[at:at + len(key)])
        i = at + len(key)
    flush(len(squeeze))
    readable = sum(len(re.sub(r"\s+", "", p)) for p in parts)
    return " ".join(out) if readable >= 0.5 * len(squeeze) else None


def clamp_lines(lines):
    """OCR line boxes often run into the line below, and overlapping boxes would make two lines of text look like things that
    overlap on purpose. The later line wins the shared rows."""
    for a in lines:
        for b in lines:
            if a is b:
                continue
            ax1, ay1, ax2, ay2 = a["box"]
            bx1, by1, bx2, by2 = b["box"]
            across = min(ax2, bx2) - max(ax1, bx1)
            if across > 0.3 * min(ax2 - ax1, bx2 - bx1) and ay1 < by1 < ay2 < by2 and by1 - ay1 >= 5:
                a["box"] = [ax1, ay1, ax2, by1 - 1]


def respace(core, read):
    """The letters of the whole-line read with the spaces of the word-by-word read. Re-reading short pieces finds the spaces
    but loses capitals and symbols ("Sara AL MA NSOORI"). Only when both have the same number of characters."""
    letters = re.sub(r"\s+", "", core)
    if len(letters) != len(re.sub(r"\s+", "", read)):
        return read
    spaces, i = set(), 0
    for text in (core, read):
        i = 0
        for ch in text:
            if ch.isspace():
                spaces.add(i)
            else:
                i += 1
    return "".join((" " if i in spaces and i else "") + c for i, c in enumerate(letters))


def repair(reader, line):
    """OCR at this size loses spaces ("Startnewapplication") and reads icons as characters ("@ Bank", "OOpen an").
    Re-reads word by word. A repair is kept only when its letters agree with what the whole line said.
    -> the line, with "icon" set to the box of a leading icon."""
    text = line["text"]
    words = chunks(reader, line)
    if not words:
        return line
    y1, y2 = line["box"][1], line["box"][3]
    h = y2 - y1
    icon, arrow, icon_read = None, False, ""
    if len(words) > 1:
        a, b = words[0]
        if 0.6 * h <= b - a <= 1.5 * h and words[1][0] - b >= 0.25 * h:
            got, score = rec(reader, (a, y1, b, y2), line["bg"])
            # a square blob, then a gap: a real first word is a number, a common short word, or longer than two characters
            short = len(got) <= 2 and not got.isdigit() and got.lower() not in SHORT_WORDS
            rest = len(re.sub(r"[^A-Za-z0-9]", "", text)) - len(got)
            # a capital with a wide gap after it is still the start of its word ("B ank"), not an icon
            capital = got[:1].isupper() and text.startswith(got) and text[len(got):len(got) + 1].islower()
            first = (text.split() or [""])[0]
            real_word = (got.isalpha() and got.lower() in SHORT_WORDS) or first.lower() in SHORT_WORDS
            if got.isdigit() and len(got) == 1 and b - a > 0.5 * h:     # a digit is narrow: a wide blob read as 1 is an icon
                got = ""
            if rest >= 4 and not capital and not real_word and not re.fullmatch(r"[A-Za-z0-9]{3,}", got) and (short or got[0] in LEADING_ICON or score < 0.6):
                icon, words = (a, y1, b, y2), words[1:]
                icon_read = got
        elif text[0] in "@©®" and text[1:2].isalnum() and b - a > 1.5 * h:     # an icon touching the first word
            icon, words = (a, y1, a + h, y2), [(a + h + 1, b)] + words[1:]
        a, b = words[-1]
        if len(words) > 1 and b - a <= 1.5 * h and a - words[-2][1] >= 0.25 * h:
            got, _ = rec(reader, (a, y1, b, y2), line["bg"])
            if got in TRAILING_ICON or (not re.search(r"[A-Za-z0-9]", got) and re.search(r"[^\w\s.,?!:;]$", text)):
                arrow, words = True, words[:-1]
    core = text
    if arrow:
        core = re.sub(r"(?:\s*[^\w\s])+$", "", core)
    if icon:
        if icon_read and core.startswith(icon_read):             # "QSearch", read as one word
            core = core[len(icon_read):]
        else:
            core = re.sub(r"^\S{1,2}\s+", "", core)              # "1h Not sure"
        core = re.sub(r"^\W+\s*", "", core)
        if len(core) > 1 and core[0] in LEADING_ICON and (core[0].lower() == core[1].lower() or not core[1].isalnum()):
            core = core[1:]
    joined = core
    # the ink shows more words than the OCR put spaces in, or a word is too long or glued to a number to be one word
    if icon or arrow or (" " not in core and len(words) > 1) or re.search(r"[A-Za-z0-9]{13,}|[a-z][.,%][a-z0-9]|[a-z]\d", text):
        parts = [read_run(reader, (a, y1, b, y2), line["bg"]) for a, b in words]
        keep = lambda t: re.sub(r"[^a-z0-9]", "", t.lower())  # noqa: E731
        agrees = lambda t: difflib.SequenceMatcher(None, keep(t), keep(core)).ratio() >= 0.9  # noqa: E731
        whole = " ".join(parts)
        fitted = align(core, words, parts)
        if all(parts) and agrees(whole):       # every run could be read: keep the spaces inside them too
            joined = respace(core, whole)
        elif fitted and agrees(fitted):
            joined = fitted
        if len(words) == 1 or not re.search(r"\s", joined):     # one run of ink: try the whole line enlarged
            for zoom in (3, 2, 4):
                got, _ = rec(reader, line["box"], line["bg"], zoom=zoom)
                if got.count(" ") > joined.count(" ") and difflib.SequenceMatcher(None, keep(got), keep(core)).ratio() >= 0.9:
                    joined = got
                    break
    joined = re.sub(r"\*{3,}\s*", lambda m: "•" * len(m.group().strip()) + " ", joined)
    joined = re.sub(r"\b([A-Z]{2,})\s*/\s*([A-Z]{2,})\b", r"\1 / \2", joined)
    joined = re.sub(r"\bEN\s*[J/|Il]\s*AR\b", "EN / AR", joined)      # the language switch: a slash reads as J or I
    joined = re.sub(r"\d[\d,.]*[oOlI,.]*[oOlI][\doOlI,.]*", lambda m: m.group().translate(str.maketrans("oOlI", "0011")), joined)   # 1,ooO
    joined = re.sub(r"\b([A-Z]{3})(\d)", r"\1 \2", joined)            # AED1,000
    joined = re.sub(r"\b(AED|USD|EUR|GBP|INR)\s+[OoQ]\b", r"\1 0", joined)
    joined = re.sub(r"\bp\s*\.\s*a\s*\.", "p.a.", joined)
    joined = re.sub(r"^[+*•]\s*(?=[A-Z])", "", joined)
    joined = re.sub(r"^1\s+(?=[A-Z][a-z]{2,})(?!Months?\b|Years?\b|Weeks?\b|Days?\b|Hours?\b)", "", joined)
    joined = re.sub(r"[$€£₹]\s*[\d ,]*\d(?:\.\s*\d\s*\d)?", lambda m: re.sub(r"\s+", "", m.group()), joined)
    line = dict(line)
    line["text"] = joined + (" →" if arrow else "")
    line["icon"] = icon
    if icon:
        line["box"] = [words[0][0], y1, line["box"][2], y2]
    return line


_DIGITS = {}


def read_digit(reader, box):
    """A lone digit in a tile, which OCR will not read on its own (no word around it): the ink against 0-9 in common
    fonts. Icons score well below real digits (measured: digits 0.62-0.74, icons under 0.45)."""
    from PIL import Image, ImageDraw, ImageFont
    if not _DIGITS:
        for path in ("arial.ttf", "arialbd.ttf", "segoeui.ttf", "seguisb.ttf", "DejaVuSans.ttf"):
            try:
                font = ImageFont.truetype(path, 64)
            except OSError:
                continue
            for ch in "0123456789":
                im = Image.new("L", (90, 90), 0)
                ImageDraw.Draw(im).text((12, 4), ch, fill=255, font=font)
                a = np.array(im)
                ys, xs = np.nonzero(a > 80)
                _DIGITS.setdefault(ch, []).append(cv2.resize(a[ys.min():ys.max() + 1, xs.min():xs.max() + 1].astype(np.float32), (24, 36), interpolation=cv2.INTER_AREA))
    x1, y1, x2, y2 = box
    crop = reader.rgb[y1:y2, x1:x2].astype(np.float32)
    if crop.size == 0 or not _DIGITS:
        return None
    d = np.sqrt(((crop - crop[0, 0]) ** 2).sum(axis=2))
    if d.max() < 40:
        return None
    ys, xs = np.nonzero(d > d.max() * 0.5)
    tight = d[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    if tight.shape[1] > 1.1 * tight.shape[0] or tight.std() == 0:
        return None
    tile = cv2.resize(tight, (24, 36), interpolation=cv2.INTER_AREA)
    scores = sorted(((max(float(np.corrcoef(tile.ravel(), s.ravel())[0, 1]) for s in shapes), ch) for ch, shapes in _DIGITS.items()), reverse=True)
    return scores[0][1] if scores[0][0] >= 0.55 and scores[0][0] - scores[1][0] >= 0.2 else None


_ARIAL = {}


def text_width(text, bold):
    """Width of this text per 1 px of font size, in Arial (the same metrics as Helvetica, which Visualizer's skins name)."""
    from PIL import ImageFont
    if bold not in _ARIAL:
        try:
            _ARIAL[bold] = ImageFont.truetype("arialbd.ttf" if bold else "arial.ttf", 100)
        except OSError:
            _ARIAL[bold] = None
    return _ARIAL[bold].getlength(text) / 100 if _ARIAL[bold] else None


# ---------- boxes ----------
def outlines(reader, lines):
    """Closed rectangles found from their edges: anything with an outline, whatever fills it. A shape counts when its
    contour runs along most of all four sides of its bounding box, which rules out two boxes that touch."""
    gray = cv2.cvtColor(reader.bgr, cv2.COLOR_BGR2GRAY)
    edges = cv2.dilate(cv2.Canny(gray, 20, 60), np.ones((2, 2), np.uint8))
    cnts, _ = cv2.findContours(edges, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)
    found = []
    for c in sorted(cnts, key=cv2.contourArea, reverse=True):
        x, y, w, h = cv2.boundingRect(c)
        if w < 14 or h < 14 or w * h > 0.8 * reader.W * reader.H or cv2.contourArea(c) < 0.7 * w * h:
            continue
        pts = c[:, 0, :]
        sides = (np.unique(pts[pts[:, 1] <= y + 2, 0]).size / w, np.unique(pts[pts[:, 1] >= y + h - 3, 0]).size / w,
                 np.unique(pts[pts[:, 0] <= x + 2, 1]).size / h, np.unique(pts[pts[:, 0] >= x + w - 3, 1]).size / h)
        if min(sides) < 0.5:
            continue
        box = [x + 1, y + 1, x + w - 1, y + h - 1]             # the dilated edge sits a pixel outside the shape
        # a glyph or a word: inside a text line, or mostly on one and not much taller than it
        if any(inside(l["box"], box, 3) or (inter(box, l["box"]) > 0.5 * area(box) and h < 1.4 * (l["box"][3] - l["box"][1])) for l in lines):
            continue
        top = np.nonzero(np.isin(np.arange(x, x + w), pts[pts[:, 1] <= y + 1, 0]))[0]
        radius = (int(top[0]) + (w - 1 - int(top[-1]))) // 2 if top.size else 0
        found.append({"box": box, "radius": min(min(w, h) // 2, radius + 1 if radius > 2 else 0)})
    return found


def merge_boxes(boxes):
    """Near-identical boxes (a shape's inner and outer edge, a fill and its outline) are one box: the outer one."""
    kept = []
    for b in sorted(boxes, key=lambda b: -area(b["box"])):
        if not any(max(abs(p - q) for p, q in zip(k["box"], b["box"])) <= 4 for k in kept):
            kept.append(b)
    return kept


# ---------- the free-placement planner ----------
class FreePlanner(Planner):
    """Shares Planner's skin measuring (panel_skin, text_skin, button_skin, ...); replaces its layout."""

    def __init__(self, reader, lines, image, form, width=1366, project=DEFAULT_PROJECT, library=None, new_skins=True):
        self.px = Pixels(image)
        self.s = width / self.px.W
        self.skins = load_skins(project, library)
        self.new_skins = new_skins
        self.ids, self.form, self.notes = Ids(), form, []
        self.lines = []          # make_skin writes the skin commands here; they go first in the prompt
        self.body = []
        self.cur = None
        self.reader, self.text_lines = reader, lines
        self.images_dir = pathlib.Path(library).parent / "images" if library else pathlib.Path(image).parent / "images"
        self.root = {"type": "root", "text": "", "img": [0, 0, self.px.W, self.px.H], "kids": [], "id": "flxPage",
                     "b": [0, 0, width, self.px.H * self.s]}

    # ----- what is on the screen -----
    def build_tree(self):
        r = self.reader
        boxes = outlines(r, self.text_lines)
        shapes = list(boxes)
        page = r.W * r.H
        for b in r.blocks():
            tall = b["box"][3] - b["box"][1]
            if b["own"] < 0.5 or area(b["box"]) > 0.97 * page or any(inside(l["box"], b["box"], 3) or (inter(b["box"], l["box"]) > 0.5 * area(b["box"]) and tall < 1.4 * (l["box"][3] - l["box"][1])) for l in self.text_lines):
                continue
            around = [s for s in shapes if inside(s["box"], b["box"], 4)]
            if around:
                holder = min(around, key=lambda s: area(s["box"]))["box"]
                # a flat stretch inside a shape of its own colour, or inside a gradient, is a piece of that shape
                edges = sum(abs(p - q) <= 3 for p, q in zip(holder, b["box"]))
                if cdist(self.px.mode(holder, 2), b["colour"]) < 7 or self.px.gradient(holder) or edges >= 2:
                    continue
            boxes.append({"box": b["box"]})
        rects = merge_boxes(boxes)
        nodes = [{"type": "panel", "text": "", "img": [float(v) for v in x["box"]], "kids": [], "texts": [], "radius": x.get("radius")} for x in rects]
        by_size = sorted(nodes, key=lambda n: area(n["img"]))

        def holder(box, skip=None):
            return next((p for p in by_size if p is not skip and area(p["img"]) > area(box) and inside(p["img"], box, 2)), self.root)

        for n in nodes:
            parent = holder(n["img"], n)
            parent["kids"].append(n)
            n["parent"] = parent
        # text goes to the smallest box around it; a leading icon becomes a small tile next to it
        self.root.setdefault("texts", [])
        for l in self.text_lines:
            box = l["box"]
            parent = next((p for p in by_size if centre_in(p["img"], box) and inter(p["img"], box) > 0.7 * area(box)), self.root)
            l["parent"] = parent
            parent["texts"].append(l)
            if l.get("icon"):
                x1, y1, x2, y2 = l["icon"]
                tile = {"type": "image", "text": "", "img": [float(x1 - 1), float(y1 - 1), float(x2 + 1), float(y2 + 1)], "kids": [], "texts": [], "parent": parent, "ink": l.get("colour")}
                parent["kids"].append(tile)
        for n in nodes + [self.root]:
            self.name_box(n)
        for n in nodes + [self.root]:
            n["b"] = [v * self.s for v in n["img"]]

    def split_at_marks(self, para, n):
        """Lines set like a paragraph, with a tick or icon beside one of them: that line starts a new item in a list."""
        marks = [k["img"] for k in n["kids"] if k["img"][2] - k["img"][0] <= 48 and k["img"][3] - k["img"][1] <= 48]
        if len(para) < 2 or not marks:
            return [para]
        pieces = [[para[0]]]
        for before, l in zip(para, para[1:]):
            x1, y1, _, y2 = l["box"]
            above = before["box"][3]
            marked = any(m[2] <= x1 + 2 and x1 - m[0] <= 70 and m[1] < (y1 + y2) / 2 + 3 and (y1 + y2) / 2 - 3 < m[3] and m[1] >= above - 1 for m in marks)
            if marked:
                pieces.append([l])
            else:
                pieces[-1].append(l)
        return pieces

    def name_box(self, n):
        """Turn a box and its text lines into a typed node and its label children."""
        self.reader.para_gap = 1.2     # designs set body text with generous line spacing
        para = self.reader.paragraphs(n["texts"]) if n["texts"] else []
        para = [piece for p in para for piece in self.split_at_marks(p, n)]
        solo = para[0] if len(para) == 1 and len(para[0]) == 1 else None
        if n is not self.root:
            x1, y1, x2, y2 = n["img"]
            w, h = x2 - x1, y2 - y1
            real_kids = [k for k in n["kids"] if k["type"] != "icon"]
            if solo and not n["kids"] and 16 <= h <= 110 and w >= 1.2 * h:
                t = solo[0]["box"]
                if abs((t[1] - y1) - (y2 - t[3])) <= 0.3 * h:
                    if abs((t[0] - x1) - (x2 - t[2])) <= 0.2 * w:
                        n["type"], n["text"] = "button", solo[0]["text"]
                    elif t[0] - x1 < max(24, 0.25 * w) and h * self.s >= 28:
                        n["type"] = "dropdown" if self.reader.chevron({"box": [int(v) for v in n["img"]], "fill": self.px.mode(n["img"], 2)}, t) else "input"
                        n["text"] = solo[0]["text"]
            elif not n["texts"] and w * self.s <= 110 and h * self.s <= 110 and all(area(k["img"]) < area(n["img"]) for k in real_kids):
                inset = (int(x1 + w * 0.2), int(y1 + h * 0.2), int(x2 - w * 0.2), int(y2 - h * 0.2))
                fill = self.px.mode(inset, 1)
                got = read_digit(self.reader, inset)
                ink = self.reader.ink(inset, fill) if got else None
                if ink:
                    fake = {"text": got, "box": ink[0], "parent": n, "colour": None, "centred": True}
                    n["texts"] = [fake]
                    para = [[fake]]
                elif self.has_detail(n["img"]):
                    n["type"], n["kids"] = "image", []
                else:
                    edge = self.px.edge(n["img"], fill)
                    if w <= 40 and abs(w - h) <= 6 and edge and cdist(edge, fill) > 70 and self.px.radius(n["img"], fill) <= 6:
                        n["type"] = "checkbox"
        if n is not self.root and n["type"] == "panel" and solo and 3 * (n["img"][3] - n["img"][1]) <= (n["img"][2] - n["img"][0]) and n["img"][3] - n["img"][1] <= 80:
            only_icon = all(k["type"] == "icon" or (k["img"][2] - k["img"][0]) <= 30 for k in n["kids"])
            hint = re.match(r"(search|enter|type|find|select|choose)\b", solo[0]["text"], re.I)
            ink, fill = solo[0].get("colour"), self.px.mode(n["img"], 2)
            faint = ink is not None and cdist(ink, fill) < 150
            tall_enough = (n["img"][3] - n["img"][1]) * self.s >= 28
            if tall_enough and only_icon and (hint or faint) and solo[0]["box"][0] - n["img"][0] < 0.25 * (n["img"][2] - n["img"][0]):
                n["type"], n["text"], n["kids"] = "input", solo[0]["text"], []
        if n is not self.root and n["type"] == "panel" and not n["kids"] and not n["texts"]:
            w, h = n["img"][2] - n["img"][0], n["img"][3] - n["img"][1]
            scaled = h * self.s
            if 28 <= scaled <= 72 and w >= 3 * h and not self.has_detail(n["img"]):
                fill = self.px.mode(n["img"], 2)
                if self.px.edge(n["img"], fill) or cdist(fill, self.px.outside(n["img"]) or fill) > 6:
                    n["type"] = "input"
        if n["type"] in ("button", "input", "dropdown"):
            return
        for p in para:
            boxes = [line_box(l) for l in p]
            box = [min(b[0] for b in boxes), boxes[0][1], max(b[2] for b in boxes), boxes[-1][3]]
            n["kids"].append({"type": "text", "text": " ".join(l["text"] for l in p), "img": [float(v) for v in box], "kids": [], "texts": [],
                              "parent": n, "wrapped": len(p) > 1, "b": [v * self.s for v in box], "centred": p[0].get("centred"),
                              "ink_h": sorted(l["box"][3] - l["box"][1] for l in p)[len(p) // 2],
                              "measured": [(l["text"], (l["box"][2] - l["box"][0]) * self.s) for l in p]})

    # ----- style -----
    def measure(self, n):
        """Fill, border and radius of a box, read from the ring it was found by; glass cards have low contrast."""
        x1, y1, x2, y2 = n["img"]
        r = n.get("radius")
        if r is None:
            fill = self.px.mode(n["img"], 2)
            around = self.px.outside(n["img"]) or fill
            r = self.px.radius(n["img"], fill) if cdist(fill, around) > 40 else self.soft_radius(n["img"], fill, around)
        inset = max(3, r // 2 + 2)
        fill = self.px.mode((x1 + inset, y1 + inset, x2 - inset, y1 + inset + max(6, (y2 - y1) // 3)), 1) if y2 - y1 >= 2 * inset + 4 else self.px.mode(n["img"], 1)
        border, far = None, 12
        for d in (0, 1, 2, -1):
            line = self.px.colours((x1 + r + 2, y1 + d, x2 - r - 2, y1 + d), 2) + self.px.colours((x1 + r + 2, y2 - d, x2 - r - 2, y2 - d), 2)
            mid = tuple(sorted(c[i] for c in line)[len(line) // 2] for i in range(3))
            if cdist(mid, fill) > far:
                border, far = mid, cdist(mid, fill)
        return fill, border, round(r * self.s)

    def text_look(self, n):
        """What one label measures: text colour, size and weight."""
        behind = self.px.outside(n["img"]) or self.px.mode(n["img"], 1)
        ink = self.px.ink_peak(n["img"], behind) or self.px.ink(n["img"], behind) or (40, 40, 40)
        lines, band = self.px.ink_lines(n["img"], behind)
        n["lines"] = max(lines, 1)
        band = n.get("ink_h") or band
        ratio = 0.93 if re.search(r"[gjpqy]", n["text"]) else 0.72
        px = band * self.s / ratio if band else (n["b"][3] - n["b"][1]) / 1.2
        w, h = n["b"][2] - n["b"][0], n["b"][3] - n["b"][1]
        by_area = (w * h / (max(1, len(n["text"])) * 0.52 * 1.2)) ** 0.5
        if px > 1.3 * by_area:      # lines that touch read as one tall band
            px = by_area
            n["lines"] = max(lines, round(h / (1.2 * by_area)))
        return {"ink": tuple(int(v) for v in ink), "px": self.px_by_width(n, False, px), "height_px": px, "bold": False, "node": n}

    def px_by_width(self, n, bold, near):
        """The font size at which this text is as wide in Visualizer's Helvetica as it is in the image. Height measures vary
        with the letters and with enlarging; width also makes up for the design's own font being narrower or wider."""
        sizes = []
        for text, width in n.get("measured") or []:
            got = text_width(text, bold)
            if got and width > 12:
                sizes.append(width / got)
        if not sizes:
            return near
        sizes.sort()
        px = sizes[len(sizes) // 2]
        return max(0.7 * near, min(px, 1.06 * near))        # OCR ink boxes run tall, so width may pull the size down a long way

    def plan_text(self):
        """Measuring each label alone gives neighbours slightly different sizes and weights. A design uses a few text
        styles, so labels that nearly agree share one: the commonest colour, the middle size, the weight most of them have."""
        nodes = []

        def walk(n):
            for k in n["kids"]:
                if k["type"] == "text":
                    nodes.append(k)
                walk(k)
        walk(self.root)
        groups = []
        for n in nodes:
            n["look"] = self.text_look(n)
            for g in groups:
                if cdist(g[0]["look"]["ink"], n["look"]["ink"]) < 60 and abs(g[0]["look"]["px"] - n["look"]["px"]) <= max(2.5, 0.15 * n["look"]["px"]):
                    g.append(n)
                    break
            else:
                groups.append([n])
        for g in groups:
            sizes = sorted(m["look"]["px"] for m in g)
            inks = [m["look"]["ink"] for m in g]
            shared = {"ink": max(set(inks), key=inks.count), "px": sizes[len(sizes) // 2], "bold": False, "members": g}
            for m in g:
                m["look"] = shared
        # Weight cannot be measured from a screenshot at these sizes (stroke width and ink coverage overlap for regular and
        # bold: tested on the Avenza screens). A design's hierarchy says it instead: text clearly bigger than the page's
        # body text is bold, and so is small coloured text (links, overlines).
        if groups:
            weighted = sorted(m["look"]["px"] for g in groups for m in g)
            body = weighted[len(weighted) // 2]
            for g in groups:
                look = g[0]["look"]
                ink = look["ink"]
                look["bold"] = look["px"] >= 1.25 * body or max(ink) - min(ink) > 90
                if look["bold"]:    # bold sets wider: the same width means a slightly smaller size
                    again = sorted(self.px_by_width(m, True, look["px"]) for m in look["members"])
                    look["px"] = again[len(again) // 2]

    def text_skin(self, node, behind):
        look = node["look"]
        ink, px = look["ink"], look["px"]
        new = {"color": _hexs(ink), "px": max(8, round(px)), "bold": look["bold"]}
        return self.pick("Label", lambda s: cdist(s["font"], ink) + 18.0 * abs((s["px"] or 16) - px) + (80 if s["bg"] else 0)
                         + (40 if s["bold"] != look["bold"] else 0), limit=30, look=new)

    def soft_radius(self, box, fill, around):
        """The corner of a faint shape: how far along the diagonal a pixel is still nearer the outside than the fill."""
        x1, y1, x2, y2 = [int(round(v)) for v in box]
        px = self.px.im.load()
        for d in range(0, min(30, (x2 - x1) // 2, (y2 - y1) // 2)):
            p = px[min(self.px.W - 1, x1 + d), min(self.px.H - 1, y1 + d)]
            if cdist(p, fill) <= cdist(p, around):
                return min(int(round(d / 0.29)), (y2 - y1) // 2) if d > 0 else 0
        return 0

    def panel_skin(self, node):
        fill, border, radius = self.measure(node)
        grad = self.px.gradient(node["img"])
        look = {"bg": _hexs(grad[0] if grad else fill), "radius": radius, "border": _hexs(border)}
        if grad:
            look.update(bg2=_hexs(grad[1]), angle=grad[2])
        return self.pick("FlexContainer", lambda s: cdist(s["bg"], fill) + (0 if bool(s["border"]) == bool(border) else 40)
                         + (cdist(s["border"], border) * 0.3 if s["border"] and border else 0) + 1.5 * abs(s["radius"] - radius)
                         + (0 if bool(s.get("gradient")) == bool(grad) else 80), limit=7, look=look)

    def input_skin(self, node):
        fill, border, radius = self.measure(node)
        x1, y1, x2, y2 = node["img"]
        inner = [x1 + 4, y1 + 3, x2 - 4, y2 - 3]
        ink = self.px.ink_peak(inner, fill) or (90, 90, 90)
        _, band = self.px.ink_lines(inner, fill)
        px = band * self.s / 0.93 if band else 15
        px = max(12, min(px, (node["b"][3] - node["b"][1]) * 0.5))
        look = {"bg": _hexs(fill), "color": _hexs(ink), "px": round(px), "radius": radius, "border": _hexs(border)}
        return self.pick("TextField", lambda s: cdist(s["bg"], fill) + (0 if bool(s["border"]) == bool(border) else 40) + 1.5 * abs(s["radius"] - radius), limit=14, look=look)

    def crop(self, box):
        """A piece of the screenshot as a real image: icons and logos cannot be redrawn from pixels, but they can be kept."""
        x1, y1, x2, y2 = [int(round(v)) for v in box]
        piece = self.reader.bgr[max(0, y1):y2, max(0, x1):x2]
        name = "aiv" + hashlib.sha1(piece.tobytes()).hexdigest()[:10] + ".png"    # Visualizer: lowercase letters and digits
        if self.images_dir:
            self.images_dir.mkdir(parents=True, exist_ok=True)
            cv2.imwrite(str(self.images_dir / name), piece)
        return name

    def has_detail(self, box):
        """Something drawn inside this box, as opposed to one flat fill."""
        x1, y1, x2, y2 = [int(round(v)) for v in box]
        dx, dy = max(1, (x2 - x1) // 6), max(1, (y2 - y1) // 6)
        a = self.reader.rgb[y1 + dy:y2 - dy, x1 + dx:x2 - dx].astype(np.int32)
        if a.size == 0:
            return False
        flat = np.median(a.reshape(-1, 3), axis=0)
        return float((np.abs(a - flat).sum(axis=2) > 60).mean()) > 0.02

    def button_skin(self, node):
        fill, border, radius = self.measure(node)
        x1, y1, x2, y2 = node["img"]
        inner = [x1 + min(14, (x2 - x1) / 5), y1 + 3, x2 - min(14, (x2 - x1) / 5), y2 - 3]
        ink = self.px.ink_peak(inner, fill) or (255, 255, 255)
        _, band = self.px.ink_lines(inner, fill)
        px = band * self.s / (0.93 if re.search(r"[gjpqy]", node["text"]) else 0.72) if band else 16
        px = min(px, (node["b"][3] - node["b"][1]) * 0.6)
        look = {"bg": _hexs(fill), "color": _hexs(ink), "px": max(8, round(px)), "bold": self.px.bold(inner, fill, ink, px / self.s),
                "radius": radius, "border": _hexs(border)}
        return self.pick("Button", lambda s: cdist(s["bg"], fill) + 0.5 * cdist(s["font"], ink) + 12.0 * abs((s["px"] or 16) - px)
                         + (0 if bool(s["border"]) == bool(border) else 30) + 1.5 * abs(s["radius"] - radius), limit=20, look=look)

    # ----- writing -----
    def line(self, parent, text):
        """Every add goes into the selected flex; a flex just added is selected, so go back when it is not the parent."""
        if self.cur != parent["id"]:
            self.body.append(f"select {parent['id']}")
            self.cur = parent["id"]
        self.body.append(text)

    def pos(self, n, parent):
        return f"top {max(0, round(n['b'][1] - parent['b'][1]))}dp, left {max(0, round(n['b'][0] - parent['b'][0]))}dp"

    def size(self, n):
        return f"width {max(2, round(n['b'][2] - n['b'][0]))}dp, height {max(2, round(n['b'][3] - n['b'][1]))}dp"

    def write(self, n, parent):
        t = n["type"]
        n.setdefault("b", [v * self.s for v in n["img"]])
        text = (n.get("text") or "").replace('"', "'")
        if t == "text":
            n["id"] = self.ids.make("lbl", text)
            skin = self.text_skin(n, self.px.outside(n["img"]) or self.px.mode(n["img"], 1))
            if n.get("centred"):
                self.line(parent, f'add a label called {n["id"]} with text "{text}", center x 50%, center y 50%, skin {skin}')
            else:
                # another font sets wider than the image's: leave room, or a wrapped line breaks in the wrong place
                width = f"width {round((n['b'][2] - n['b'][0]) * 1.12)}dp, " if n.get("wrapped") or n.get("lines", 1) > 1 else ""
                self.line(parent, f'add a label called {n["id"]} with text "{text}", {width}{self.pos(n, parent)}, skin {skin}')
        elif t == "button":
            n["id"] = self.ids.make("btn", text)
            self.line(parent, f'add a button called {n["id"]} with text "{text}", {self.size(n)}, {self.pos(n, parent)}, skin {self.button_skin(n)}')
        elif t == "input":
            n["id"] = self.ids.make("tbx", text)
            self.line(parent, f'add a text box called {n["id"]} with placeholder "{text}", {self.size(n)}, {self.pos(n, parent)}, skin {self.input_skin(n)}')
        elif t == "dropdown":
            n["id"] = self.ids.make("lst", text)
            self.line(parent, f'add a drop down called {n["id"]}, {self.size(n)}, {self.pos(n, parent)}')
        elif t == "checkbox":
            n["id"] = self.ids.make("flx", "Check")
            self.line(parent, f'add a flex called {n["id"]} with {self.size(n)}, {self.pos(n, parent)}, skin {self.checkbox_skin(n)}')
            self.cur = n["id"]
        elif t in ("icon", "image"):
            n["id"] = self.ids.make("img", "Icon")
            self.line(parent, f'add image {n["id"]} from {self.crop(n["img"])}, {self.size(n)}, {self.pos(n, parent)}')
        else:
            first = next((k["text"] for k in sorted(n["kids"], key=lambda k: (k["img"][1], k["img"][0])) if k.get("text")), "")
            n["id"] = self.ids.make("flx", first or "Panel")
            skin = self.panel_skin(n)
            self.line(parent, f'add a flex called {n["id"]} with layout free, {self.size(n)}, {self.pos(n, parent)}' + (f", skin {skin}" if skin else ""))
            self.cur = n["id"]
            self.children(n)

    def children(self, n):
        # biggest first: later widgets draw on top, and text goes last
        for k in sorted(n["kids"], key=lambda k: (k["type"] == "text", -area(k["img"]), k["img"][1], k["img"][0])):
            self.write(k, n)

    def page(self):
        """The page: its commonest colour, plus up to two soft glows. A glow is a tiny flex with a large shadow."""
        small = cv2.resize(self.reader.rgb, (max(1, self.px.W // 16), max(1, self.px.H // 16)), interpolation=cv2.INTER_AREA).astype(np.float32)
        free = np.ones(small.shape[:2], bool)
        free[:2, :] = free[-2:, :] = False      # screenshots often carry a frame or a window edge
        free[:, :2] = free[:, -2:] = False
        for n in self.root["kids"]:
            x1, y1, x2, y2 = [int(v / 16) for v in n["img"]]
            free[max(0, y1 - 1):y2 + 2, max(0, x1 - 1):x2 + 2] = False
        pixels = small[free].astype(np.uint8)
        q = pixels // 4
        base = None
        if len(pixels):
            vals, counts = np.unique(q, axis=0, return_counts=True)
            base = tuple(int(v) * 4 + 2 for v in vals[counts.argmax()])
        else:
            base = self.px.mode(self.root["img"], 3)
        glows = []
        if cdist(base, (255, 255, 255)) >= 60:   # a light page has no glows worth rebuilding
            dev = np.sqrt(((small - np.array(base, np.float32)) ** 2).sum(axis=2)) * free
            for _ in range(2):
                y, x = np.unravel_index(int(dev.argmax()), dev.shape)
                peak = float(dev[y, x])
                if peak < 22:
                    break
                ys, xs = np.nonzero(dev > peak / 2)
                radius = max(40.0, float(np.percentile(np.hypot(ys - y, xs - x), 90)) * 16 * self.s)
                colour = tuple(int(v) for v in small[y, x])
                glows.append({"x": (x + 0.5) * 16 * self.s, "y": (y + 0.5) * 16 * self.s, "radius": radius, "colour": colour, "base": base})
                yy, xx = np.ogrid[:dev.shape[0], :dev.shape[1]]
                dev[np.hypot(yy - y, xx - x) * 16 * self.s < radius * 1.6] = 0
        return base, glows

    def glow_skin(self, g):
        # peak = base + a * (colour - base): pick a = 40%, so the colour itself is vivid and the shadow fades over the page
        alpha = 0.5
        vivid = tuple(max(0, min(255, int(b + (c - b) / alpha))) for c, b in zip(g["colour"], g["base"]))
        hexa = _hexs(vivid)
        blur, spread = round(g["radius"]), round(g["radius"] * 0.35)
        look = {"wType": "FlexContainer", "bg": f"{hexa} at 30%", "radius": 1, "shadow": f"{hexa} at 30%", "blur": blur, "spread": spread}
        name = auto_name(clean(look))
        self.lines.append(f"create a flex skin called {name} with background {hexa} at 30%, radius 1, glow {hexa} at 30% blur {blur} spread {spread}")
        return name

    def script(self):
        self.build_tree()
        self.plan_text()
        base, glows = self.page()
        self.body = [f"new form called {self.form}", "make flxMain free"]
        page_skin = self.make_skin("FlexContainer", {"bg": _hexs(base)})
        height = round(self.root["b"][3])
        self.body.append(f"add a flex called flxPage with layout free, width 100%, height {height}dp, skin {page_skin}")
        self.cur = "flxPage"
        for i, g in enumerate(glows, 1):
            self.line(self.root, f"add a flex called flxGlow{i} with width 2dp, height 2dp, top {round(g['y'])}dp, left {round(g['x'])}dp, skin {self.glow_skin(g)}")
            self.cur = f"flxGlow{i}"
        self.children(self.root)
        return list(dict.fromkeys(self.lines)) + self.body


# ---------- the agent ----------
SIZE_WORDS = {"desktop", "tablet", "mobile", "phone", "web", "ipad", "iphone", "android", "view", "dt", "tab", "mob", "wide", "narrow", "large", "small"}
GENERIC = re.compile(r"^(image|screenshot|screen ?shot|clipboard|untitled|capture|snip|photo|img|figma|frame|\d)", re.I)


def form_name(filename, lines):
    """A form name in words: the file's name when it means something, else the biggest text on the screen."""
    stem = pathlib.Path(filename or "").stem
    words = re.findall(r"[A-Za-z][A-Za-z0-9]*", re.sub(r"([a-z])([A-Z])", r"\1 \2", stem))
    # "login-mobile.png", "desktop.png": the size a screenshot shows is not the screen's name
    words = [w for w in words if w.lower() not in SIZE_WORDS]
    if words and not GENERIC.match(" ".join(words)):
        return " ".join(w.lower() for w in words if w.lower() != "frm")[:40]
    big = sorted((l for l in lines if re.search(r"[A-Za-z]{2}", l["text"])), key=lambda l: -(l["box"][3] - l["box"][1]))
    words = re.findall(r"[A-Za-z][A-Za-z0-9]*", big[0]["text"]) if big else []
    return " ".join(w.lower() for w in words[:3]) or "from image"


def guess_width(w, h, lines):
    """The breakpoint an image shows, from its text, because its pixel size says little: a desktop design can arrive as a
    752 px screenshot and a phone screen as 1080 px. Body text is about the same size in dp on every screen (ink about 15 px
    on AvenzaBank's 1366 and 640 screens), so its size in the image says how far the image was scaled."""
    heights = sorted(l["box"][3] - l["box"][1] for l in lines)
    if not heights:
        return 640 if h > w * 1.3 else 1366
    implied = w * 15 / max(1, heights[len(heights) // 2])
    if implied < 800:
        return 640
    return 1024 if implied < 1150 and w / h < 1.25 else 1366


def missed_lines(reader, lines):
    """Lines the OCR detector skipped. It can drop a whole line of a paragraph (seen on a plain grey-on-white hero text, at
    every scale): text-shaped ink that no line covers is read on its own."""
    grad = cv2.morphologyEx(cv2.cvtColor(reader.bgr, cv2.COLOR_BGR2GRAY), cv2.MORPH_GRADIENT, np.ones((3, 3), np.uint8))
    ink = (grad > 40).astype(np.uint8)
    for l in lines:
        x1, y1, x2, y2 = l["box"]
        ink[max(0, y1 - 3):y2 + 3, max(0, x1 - 3):x2 + 3] = 0
    heights = sorted(l["box"][3] - l["box"][1] for l in lines) or [14]
    body = heights[len(heights) // 2]
    glued = cv2.dilate(ink, cv2.getStructuringElement(cv2.MORPH_RECT, (max(5, body // 2 + 1), 1)))
    n, _lab, stats, _ = cv2.connectedComponentsWithStats(glued, connectivity=8)
    found = []
    for i in range(1, n):
        x, y, w, h, a = (int(v) for v in stats[i])
        # a line of words: about body height or a bit more, long, and neither a hollow outline nor a solid bar
        if not (0.7 * body <= h <= 2.2 * body and w >= max(40, 4 * h) and 0.3 <= a / (w * h) <= 0.9):
            continue
        box = [x, y, x + w, y + h]
        if any(inter(box, l["box"]) > 0 for l in lines + found):
            continue
        bg = mode_colour(reader.rgb[max(0, y - 2):y + h + 2, max(0, x - 2):x + w + 2])
        text, score = rec(reader, box, bg)
        if score < 0.8 or not re.search(r"[A-Za-z]{3}", text):
            continue
        got = reader.ink(box, bg)
        tight = got[0] if got else box
        found.append({"text": text, "box": tight, "bg": bg, "conf": score, "colour": reader.ink_colour(tight, bg)})
    return found


def read(image, width=None):
    """One screenshot -> (reader, repaired text lines, the width it shows, the image the reader used). Small text is read
    from an enlarged copy: OCR drops spaces and misreads letters, and enlarging is free. Boxes then scale with it."""
    reader = Reader(image)
    raw = reader.text_lines()
    guessed = guess_width(reader.W, reader.H, raw)
    width = width or guessed
    original = pathlib.Path(image)
    heights = sorted(l["box"][3] - l["box"][1] for l in raw)
    ink = heights[len(heights) // 2] if heights else 14
    k = min(3.0, max(width / reader.W, 13 / max(1, ink)))
    if k > 1.2:
        image = original.with_name(original.stem + ".read.png")
        cv2.imwrite(str(image), cv2.resize(reader.bgr, None, fx=k, fy=k, interpolation=cv2.INTER_CUBIC))
        first = raw
        reader = Reader(image)
        raw = reader.text_lines()
        for l in first:         # enlarging softens faint text: keep any line only the first read found
            box = [int(round(v * k)) for v in l["box"]]
            if not any(inter(box, m["box"]) > 0.3 * area(box) for m in raw):
                raw.append({**l, "box": box})
    raw += missed_lines(reader, raw)
    clamp_lines(raw)
    return reader, [repair(reader, l) for l in raw], width, image, guessed


def run(image, name=None, filename=None, width=None, mode="responsive", project=DEFAULT_PROJECT, library=None, views=None):
    """-> {lines, form words, width, mode, stats}. views: {"tablet"|"mobile": image path}, screenshots of the same screen at a
    narrower size; that breakpoint then follows what they show instead of the rules' guess (responsive mode only)."""
    if mode == "responsive":
        reader, lines, width, image, guessed = read(image, width)
        form = name or form_name(filename or pathlib.Path(image).name.replace(".read", ""), lines)
        from responsive import ResponsivePlanner
        seen = {bp: read(path)[:2] for bp, path in (views or {}).items()}
        planner = ResponsivePlanner(reader, lines, str(image), form, width, project, library, views=seen)
        prompt = planner.script()
        return {"lines": prompt, "form": form, "width": width, "mode": mode, "size": [reader.W, reader.H], "kinds": _kinds(prompt),
                "guessed": guessed, "observed": planner.observed}
    reader = Reader(image)
    raw = reader.text_lines()
    width = width or guess_width(reader.W, reader.H, raw)
    original = pathlib.Path(image)
    heights = sorted(l["box"][3] - l["box"][1] for l in raw)
    ink = heights[len(heights) // 2] if heights else 14
    k = min(3.0, max(width / reader.W, 13 / max(1, ink)))
    if k > 1.2:
        # small text: OCR drops spaces and misreads letters, and enlarging is free. Boxes then scale with it.
        image = original.with_name(original.stem + ".read.png")
        cv2.imwrite(str(image), cv2.resize(reader.bgr, None, fx=k, fy=k, interpolation=cv2.INTER_CUBIC))
        first = raw
        reader = Reader(image)
        raw = reader.text_lines()
        for l in first:         # enlarging softens faint text: keep any line only the first read found
            box = [int(round(v * k)) for v in l["box"]]
            if not any(inter(box, m["box"]) > 0.3 * area(box) for m in raw):
                raw.append({**l, "box": box})
    clamp_lines(raw)
    lines = [repair(reader, l) for l in raw]
    form = name or form_name(filename or original.name, lines)
    if mode == "rows":
        prompt = Planner(detect(image), str(image), form, width, project, library=library).script()
    else:
        prompt = FreePlanner(reader, lines, str(image), form, width, project, library).script()
    return {"lines": prompt, "form": form, "width": width, "mode": mode, "size": [reader.W, reader.H], "kinds": _kinds(prompt)}


def _kinds(prompt):
    kinds = {}
    for l in prompt:
        kind = "skin" if l.startswith(("create", "give")) else re.match(r"add a (\w+)", l).group(1) if l.startswith("add a ") else \
            "image" if l.startswith("add image ") else None
        if kind:
            kinds[kind] = kinds.get(kind, 0) + 1
    return kinds


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("image")
    ap.add_argument("--name")
    ap.add_argument("--width", type=int)
    ap.add_argument("--mode", default="responsive", choices=("responsive", "free", "rows"))
    ap.add_argument("--out")
    ap.add_argument("--tablet", help="a screenshot of the same screen on a tablet")
    ap.add_argument("--mobile", help="a screenshot of the same screen on a phone")
    a = ap.parse_args()
    views = {bp: path for bp, path in (("tablet", a.tablet), ("mobile", a.mobile)) if path}
    res = run(a.image, a.name, width=a.width, mode=a.mode, views=views)
    text = "\n".join(res["lines"]) + "\n"
    if a.out:
        pathlib.Path(a.out).write_text(text, encoding="utf-8")
    else:
        sys.stdout.reconfigure(encoding="utf-8")
        print(text)
    print(json.dumps({k: v for k, v in res.items() if k != "lines"}), file=sys.stderr)
