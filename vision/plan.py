"""Screen description (truth.mjs / describe.py schema) + the image -> a Saywright command script.

    python vision/plan.py <description.json> <image.png> <form name> [--width 1366] [--project <Visualizer project>]

Everything here is deterministic code:
  1. scale     image pixels -> form dp (the image is assumed to show the form at --width)
  2. nest      every element goes into the smallest visible panel that contains its centre
  3. arrange   a panel's children are grouped into rows (vertical overlap); one row of full-height panels makes the
               container horizontal, a single card floating in the middle makes it free with centre 50%/50%,
               otherwise the container stacks rows vertically and a row of several elements becomes a horizontal flex
  4. style     colours sampled from the image pixels pick the nearest existing project skin per widget type
               (panel background / border, text colour + size, button fill, input border). When nothing in the project
               is close, a "create ... skin" command makes one from the measured look (gradient, radius, border, font)
  5. write     compound commands that Saywright's fast rules run without a model
"""
import argparse
import colorsys
import json
import pathlib
import re
import sys

from PIL import Image

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))
from skinmaker import auto_name, clean  # noqa: E402

HERE = pathlib.Path(__file__).resolve().parent
DEFAULT_PROJECT = HERE.parent / "workspace" / "AvenzaBank"


# ---------- project skins ----------
def _hex(c):
    if not isinstance(c, str) or len(c) < 6:
        return None
    rgb = tuple(int(c[i:i + 2], 16) for i in (0, 2, 4))
    alpha = int(c[6:8], 16) if len(c) >= 8 else 255
    return rgb if alpha > 20 else None          # skin colours are RRGGBBAA, AA = opacity


def load_skins(project, library=None):
    skins = []
    files = sorted(pathlib.Path(project).glob("themes/*/*.json")) + (sorted(pathlib.Path(library).glob("*.json")) if library else [])
    for f in files:
        try:
            s = json.loads(f.read_text(encoding="utf-8-sig"))
        except (json.JSONDecodeError, UnicodeDecodeError):
            continue
        if not s.get("wType"):
            continue
        d = {**s, **(s.get("desktopweb") if isinstance(s.get("desktopweb"), dict) else {})}
        size = d.get("font_size")
        skins.append({
            "name": f.stem, "wType": s["wType"],
            "bg": _hex(d.get("background_color")) if d.get("bg_type") not in ("two", "ms_gradient")
            else _hex(d["background_color"]["colors"][0]) if isinstance(d.get("background_color"), dict)
            else _hex(d.get("background_gradient_top_color")),
            "gradient": d.get("bg_type") in ("two", "ms_gradient"),
            "translucent": any(isinstance(c, str) and len(c) == 8 and 20 < int(c[6:8], 16) < 245 for c in (d.get("background_color"), d.get("font_color"))),
            "border": _hex(d.get("border_color")) if d.get("border_style") not in (None, "none") and float(d.get("border_width") or 0) > 0 else None,
            "font": _hex(d.get("font_color")),
            "px": round(float(size) * 16 / 100) if isinstance(size, (int, float)) else None,
            "bold": str(d.get("font_weight")) in ("bold", "700"),
            "rounded": d.get("border_style") in ("rc", "custom") and (d.get("border_style") == "rc" or float(d.get("border_radius") or 0) > 0),
            "radius": 8.0 if d.get("border_style") == "rc" else float(d.get("border_radius") or 0) if d.get("border_style") == "custom" else 0.0,
        })
    return skins


SKIN_WORD = {"FlexContainer": "flex", "Label": "label", "Button": "button", "TextField": "text box", "Form": "form",
             "ListBox": "drop down", "Calendar": "calendar"}


def _hexs(rgb):
    return "%02x%02x%02x" % tuple(rgb) if rgb else None


def _rgb(h8):
    return tuple(int(h8[i:i + 2], 16) for i in (0, 2, 4)) if h8 else None


def cdist(a, b):
    if a is None or b is None:
        return 255.0 if (a is None) != (b is None) else 0.0
    return sum((x - y) ** 2 for x, y in zip(a, b)) ** 0.5


# ---------- pixels ----------
class Pixels:
    def __init__(self, path):
        self.im = Image.open(path).convert("RGB")
        self.W, self.H = self.im.size

    def colours(self, box, step=2):
        x1, y1, x2, y2 = [int(round(v)) for v in box]
        x1, y1, x2, y2 = max(0, x1), max(0, y1), min(self.W - 1, x2), min(self.H - 1, y2)
        px = self.im.load()
        return [px[x, y] for y in range(y1, y2 + 1, step) for x in range(x1, x2 + 1, step)] or [(255, 255, 255)]

    def mode(self, box, step=2):
        counts = {}
        for c in self.colours(box, step):
            q = tuple(v // 6 * 6 for v in c)
            counts[q] = counts.get(q, 0) + 1
        return max(counts, key=counts.get)

    def ink(self, box, bg):
        """The text colour in a box: the pixels that differ most from the background (median of the far third)."""
        cs = sorted(self.colours(box, 1), key=lambda c: -cdist(c, bg))
        far = [c for c in cs[:max(3, len(cs) // 12)] if cdist(c, bg) > 40]
        if not far:
            return None
        far = far[len(far) // 4: max(len(far) // 4 + 1, len(far) * 3 // 4)]
        return tuple(sorted(v[i] for v in far)[len(far) // 2] for i in range(3))

    def ink_lines(self, box, bg):
        """Text lines in a box from the pixels: bands of rows that hold ink. Returns (count, typical band height)."""
        x1, y1, x2, y2 = [int(round(v)) for v in box]
        x1, y1, x2, y2 = max(0, x1), max(0, y1), min(self.W - 1, x2), min(self.H - 1, y2)
        px = self.im.load()
        inked = [any(cdist(px[x, y], bg) > 60 for x in range(x1, x2 + 1)) for y in range(y1, y2 + 1)]
        bands, run = [], 0
        for v in inked + [False]:
            if v:
                run += 1
            elif run:
                bands.append(run)
                run = 0
        bands = [b for b in bands if b >= 3]
        return (len(bands), sorted(bands)[len(bands) // 2]) if bands else (0, 0)

    def grow(self, box, limit=400):
        """A button the model boxed around its caption only: grow each side while the line beyond is still the
        button's fill colour (the most common colour inside the box)."""
        x1, y1, x2, y2 = [int(round(v)) for v in box]
        fill = self.mode(box, 1)
        px = self.im.load()
        same = lambda pts: sum(cdist(px[x, y], fill) < 30 for x, y in pts) > 0.8 * len(pts)  # noqa: E731
        for _ in range(limit):
            moved = False
            if x1 > 0 and same([(x1 - 1, y) for y in range(y1, y2 + 1)]): x1 -= 1; moved = True  # noqa: E701,E702
            if x2 < self.W - 1 and same([(x2 + 1, y) for y in range(y1, y2 + 1)]): x2 += 1; moved = True  # noqa: E701,E702
            if y1 > 0 and same([(x, y1 - 1) for x in range(x1, x2 + 1)]): y1 -= 1; moved = True  # noqa: E701,E702
            if y2 < self.H - 1 and same([(x, y2 + 1) for x in range(x1, x2 + 1)]): y2 += 1; moved = True  # noqa: E701,E702
            if not moved:
                break
        return [x1, y1, x2, y2]

    def outside(self, box, gap=3, depth=8):
        """The colour just outside a box, on the first side that has room (None if it fills the image)."""
        x1, y1, x2, y2 = [int(round(v)) for v in box]
        for strip in ((x1 - gap - depth, y1, x1 - gap, y2), (x2 + gap, y1, x2 + gap + depth, y2),
                      (x1, y1 - gap - depth, x2, y1 - gap), (x1, y2 + gap, x2, y2 + gap + depth)):
            if strip[0] >= 0 and strip[1] >= 0 and strip[2] < self.W and strip[3] < self.H:
                return self.mode(strip, 2)
        return None

    def gradient(self, box):
        """(start, end, css angle) when a panel's fill changes across it, else None. Compares the most common colour of
        large corner patches, so text or an icon inside a patch does not decide it."""
        x1, y1, x2, y2 = [int(round(v)) for v in box]
        w, h = x2 - x1, y2 - y1
        if w < 60 or h < 18:
            return None
        pw, ph = max(10, w // 7), max(4, h // 3 if h < 60 else h // 7)
        r = max(4, min(w, h) // 12) if h >= 60 else max(2, h // 5)     # stay off the rounded corners
        tl = self.mode((x1 + r, y1 + r, x1 + r + pw, y1 + r + ph), 2)
        tr = self.mode((x2 - r - pw, y1 + r, x2 - r, y1 + r + ph), 2)
        bl = self.mode((x1 + r, y2 - r - ph, x1 + r + pw, y2 - r), 2)
        br = self.mode((x2 - r - pw, y2 - r - ph, x2 - r, y2 - r), 2)
        near, far = 30, 45
        if cdist(tl, tr) < near and cdist(bl, br) < near and cdist(tl, bl) > far:
            return tl, bl, 180
        if cdist(tl, bl) < near and cdist(tr, br) < near and cdist(tl, tr) > far:
            return tl, tr, 90
        # a real diagonal passes through the other two corners about halfway; a child panel in one corner does not
        between = lambda a, b, c: cdist(c, tuple((x + y) / 2 for x, y in zip(a, b))) < 95  # noqa: E731
        # Visualizer's build only draws straight gradients: a diagonal becomes the panel's longer axis
        if cdist(tl, br) > far and cdist(tl, br) >= cdist(tr, bl) and between(tl, br, tr) and between(tl, br, bl):
            return (tl, br, 90) if w >= h else (tl, br, 180)
        if cdist(tr, bl) > far and between(tr, bl, tl) and between(tr, bl, br):
            return (tr, bl, 270) if w >= h else (tr, bl, 180)
        return None

    def radius(self, box, fill):
        """Corner radius from how far along the top-left diagonal the fill starts (a circle's corner gap is 0.29 r)."""
        x1, y1, x2, y2 = [int(round(v)) for v in box]
        px = self.im.load()
        for d in range(0, min(40, (x2 - x1) // 2, (y2 - y1) // 2)):
            if 0 <= x1 + d < self.W and 0 <= y1 + d < self.H and cdist(px[x1 + d, y1 + d], fill) < 30:
                return min(int(round(d / 0.29 / 2) * 2), (y2 - y1) // 2, (x2 - x1) // 2) if d > 1 else 0
        return 0

    def bold(self, box, bg, ink, font_px):
        """Is the text bold? The typical horizontal stroke width against the font size (image px): about 0.09 em for
        regular and 0.16 em for bold. "Ink" means past halfway between the background and the text colour, so muted
        text is judged by its own contrast, and one pixel of anti-aliasing comes off the width."""
        if not ink:
            return False
        x1, y1, x2, y2 = [int(round(v)) for v in box]
        x1, y1, x2, y2 = max(0, x1), max(0, y1), min(self.W - 1, x2), min(self.H - 1, y2)
        cut = cdist(ink, bg) / 2
        px = self.im.load()
        runs = []
        for y in range(y1, y2 + 1, max(1, (y2 - y1) // 12)):
            run = 0
            for x in range(x1, x2 + 2):
                if x <= x2 and cdist(px[x, y], bg) > cut:
                    run += 1
                elif run:
                    runs.append(run)
                    run = 0
        if len(runs) < 4:
            return False
        return (sorted(runs)[len(runs) // 2] - 1) / max(1.0, font_px) >= 0.1

    def ink_peak(self, box, bg):
        """The text colour itself: thin strokes never reach it in the median, so take the far end of the pixels."""
        cs = sorted(self.colours(box, 1), key=lambda c: -cdist(c, bg))
        return cs[min(len(cs) - 1, len(cs) // 100)] if cs and cdist(cs[0], bg) > 40 else None

    def edge(self, box, inside):
        """A border colour if the box's outline differs from its inside, else None."""
        x1, y1, x2, y2 = [int(round(v)) for v in box]
        line = self.colours((x1 + 4, y1, x2 - 4, y1 + 1), 1) + self.colours((x1, y1 + 4, x1 + 1, y2 - 4), 1)
        far = [c for c in line if cdist(c, inside) > 25]
        return max(set(far), key=far.count) if len(far) > len(line) * 0.4 else None


# ---------- ids ----------
def camel(text, limit=3):
    words = [w for w in re.findall(r"[A-Za-z0-9]+", text) if w.lower() not in ("enter", "your", "the", "a", "an", "of", "to")]
    return "".join(w[:1].upper() + w[1:].lower() for w in words[:limit]) or "Item"


class Ids:
    def __init__(self):
        self.used = {"flxMain"}

    def make(self, prefix, text):
        base = prefix + camel(text)
        wid, n = base, 2
        while wid in self.used:
            wid, n = f"{base}{n}", n + 1
        self.used.add(wid)
        return wid


# ---------- geometry ----------
def area(b):
    return max(0, b[2] - b[0]) * max(0, b[3] - b[1])


def contains(outer, inner, slack=4):
    cx, cy = (inner[0] + inner[2]) / 2, (inner[1] + inner[3]) / 2
    return outer[0] - slack <= cx <= outer[2] + slack and outer[1] - slack <= cy <= outer[3] + slack and area(outer) > area(inner)


def rows_of(children):
    """Group children into rows: boxes whose vertical ranges overlap by more than half the smaller one."""
    rows = []
    for c in sorted(children, key=lambda c: (c["b"][1], c["b"][0])):
        for row in rows:
            top, bot = min(r["b"][1] for r in row), max(r["b"][3] for r in row)
            ov = min(bot, c["b"][3]) - max(top, c["b"][1])
            if ov > 0.5 * min(bot - top, c["b"][3] - c["b"][1]):
                row.append(c)
                break
        else:
            rows.append([c])
    for row in rows:
        row.sort(key=lambda c: c["b"][0])
    return sorted(rows, key=lambda r: min(c["b"][1] for c in r))


def dp(v):
    return f"{max(0, int(round(v)))}dp"


def pct(v, whole):
    return f"{round(100 * v / whole, 1):g}%" if whole else "100%"


# ---------- the planner ----------
class Planner:
    def __init__(self, desc, image, form, width=1366, project=DEFAULT_PROJECT, library=None, new_skins=True):
        self.px = Pixels(image)
        self.s = width / self.px.W                      # image px -> form dp
        self.skins = load_skins(project, library)
        self.new_skins = new_skins                      # False: nearest existing skin only, as before
        self.ids = Ids()
        self.form = form
        self.notes = []
        els = []
        for e in desc["elements"]:
            b = e.get("bbox_2d")
            if not b or len(b) != 4 or b[2] <= b[0] or b[3] <= b[1]:
                continue
            els.append({"type": e["type"], "text": (e.get("text") or "").strip(), "img": list(map(float, b)),
                        "b": [v * self.s for v in b], "kids": []})
        # The base model calls lines of text "panels". A real panel has its own background or border; a "panel"
        # with text whose inside looks like its surroundings is text.
        for e in els:
            if e["type"] == "panel" and e["text"] and area(e["img"]) < 0.08 * self.px.W * self.px.H:
                inside = self.px.mode(e["img"], 3)
                around = self.px.outside(e["img"])
                if around is not None and cdist(inside, around) < 20 and not self.px.edge(e["img"], inside):
                    e["type"] = "text"
        for e in els:
            if e["type"] == "button":
                grown = self.px.grow(e["img"])
                if area(grown) > area(e["img"]) * 1.3:
                    e["img"] = list(map(float, grown))
                    e["b"] = [v * self.s for v in grown]
        root_box = [0, 0, self.px.W * self.s, self.px.H * self.s]
        self.root = {"type": "root", "text": "", "img": [0, 0, self.px.W, self.px.H], "b": root_box, "kids": [], "id": "flxMain"}
        panels = sorted([e for e in els if e["type"] == "panel"], key=lambda e: area(e["b"]))
        for e in sorted(els, key=lambda e: area(e["b"])):
            parent = next((p for p in panels if p is not e and contains(p["b"], e["b"])), self.root)
            parent["kids"].append(e)
        self.columns(self.root)
        self.lines = []

    def columns(self, node):
        """A full-height panel next to loose elements (a side panel whose neighbour the model did not report as a
        panel): the loose elements get a column of their own beside it, so the container can be a row of columns."""
        kids, b = node["kids"], node["b"]
        H = b[3] - b[1]
        tall = sorted([k for k in kids if k["type"] == "panel" and k["b"][3] - k["b"][1] >= 0.85 * H], key=lambda k: k["b"][0])
        loose = [k for k in kids if k not in tall]
        if tall and loose:
            edges = [b[0]] + [v for t in tall for v in (t["b"][0], t["b"][2])] + [b[2]]
            cols = []
            for xa, xb in zip(edges[0::2], edges[1::2]):
                inside = [k for k in loose if xa - 2 <= (k["b"][0] + k["b"][2]) / 2 <= xb + 2]
                if inside and xb - xa > 20:
                    box = [xa, b[1], xb, b[3]]
                    cols.append({"type": "panel", "synthetic": True, "text": "", "b": box, "img": [v / self.s for v in box], "kids": inside})
            node["kids"] = tall + cols + [k for k in loose if not any(k in c["kids"] for c in cols)]
        for k in node["kids"]:
            if k.get("kids"):
                self.columns(k)

    # ----- style -----
    def bg_of(self, node):
        return self.px.mode(node["img"], 3)

    def pick(self, wtype, score, limit=None, look=None):
        """The nearest skin of this type; when even that is further than limit, make one with the measured look."""
        cands = [s for s in self.skins if s["wType"] == wtype and not s.get("translucent")]
        best = min(cands, key=score) if cands else None
        if self.new_skins and look and limit is not None and (best is None or score(best) > limit):
            return self.make_skin(wtype, look)
        return best["name"] if best else None

    def make_skin(self, wtype, look):
        """Emit the command that creates the skin; later widgets with this look reuse it as an ordinary candidate."""
        spec = clean({"wType": wtype, **look})
        name = auto_name(spec)
        words = [f"create a {SKIN_WORD[wtype]} skin called {name} with"]
        attrs = []
        if look.get("bg"):
            attrs.append(f"background {look['bg']}" + (f" to {look['bg2']}, angle {look['angle']}" if look.get("bg2") else ""))
        if look.get("color"):
            attrs.append(f"text {look['color']}")
        if look.get("px"):
            attrs.append(f"size {int(look['px'])}")
        if look.get("bold"):
            attrs.append("bold")
        if look.get("border"):
            attrs.append(f"border {look['border']}")
        if look.get("radius"):
            attrs.append(f"radius {look['radius']}")
        self.lines.append(" ".join(words) + " " + ", ".join(attrs))
        self.skins.append({"name": name, "wType": wtype, "bg": _rgb(spec.get("bg")), "border": _rgb(spec.get("border")), "font": _rgb(spec.get("color")),
                           "px": spec.get("px"), "bold": bool(look.get("bold")), "rounded": bool(look.get("radius")),
                           "radius": float(look.get("radius") or 0), "gradient": bool(look.get("bg2"))})
        return name

    def panel_skin(self, node):
        bg = self.bg_of(node)
        if node.get("synthetic") and cdist(bg, self.px.mode(self.root["img"], 6)) < 20 and cdist(bg, (255, 255, 255)) < 20:
            return None
        border = self.px.edge(node["img"], bg)
        grad = self.px.gradient(node["img"])
        radius = self.px.radius(node["img"], bg)
        look = {"bg": _hexs(grad[0] if grad else bg), "radius": radius, "border": _hexs(border)}
        if grad:
            look.update(bg2=_hexs(grad[1]), angle=grad[2])
        return self.pick("FlexContainer", lambda s: cdist(s["bg"], bg) + (0 if bool(s["border"]) == bool(border) else 60)
                         + (cdist(s["border"], border) * 0.3 if s["border"] and border else 0)
                         + (0 if bool(s.get("gradient")) == bool(grad) else 80), limit=25, look=look)

    def text_skin(self, node, behind):
        ink = self.px.ink(node["img"], behind) or (40, 40, 40)
        lines, band = self.px.ink_lines(node["img"], behind)
        node["lines"] = lines
        # ink height / font size, measured on AvenzaBank's skins: ~0.93 when the line has descenders (g j p q y),
        # ~0.72 when it has only capitals and ascenders ("Avenza" 23px ink at 32px, "User Id" 11px at 15px)
        ratio = 0.93 if re.search(r"[gjpqy]", node["text"]) else 0.72
        px = band * self.s / ratio if band else (node["b"][3] - node["b"][1]) / 1.2
        # lines that touch (descender into ascender) read as one tall band: the box's area says what the font really is
        w, h = node["b"][2] - node["b"][0], node["b"][3] - node["b"][1]
        by_area = (w * h / (max(1, len(node["text"])) * 0.52 * 1.2)) ** 0.5
        if px > 1.3 * by_area:
            px = by_area
            node["lines"] = max(lines, round(h / (1.2 * by_area)))
        # colour and size both matter (a heading and a caption share colours); a skin with its own background is wrong
        # for plain text
        peak = self.px.ink_peak(node["img"], behind) or ink
        look = {"color": _hexs(peak), "px": max(8, round(px)), "bold": self.px.bold(node["img"], behind, peak, px / self.s)}
        return self.pick("Label", lambda s: cdist(s["font"], ink) + 6.0 * abs((s["px"] or 16) - px) + (80 if s["bg"] else 0),
                         limit=40, look=look)

    def button_skin(self, node):
        fill = self.px.mode([node["img"][0] + 3, node["img"][1] + 3, node["img"][2] - 3, node["img"][1] + 8], 1)
        x1, y1, x2, y2 = node["img"]
        inner = [x1 + min(14, (x2 - x1) / 5), y1 + 3, x2 - min(14, (x2 - x1) / 5), y2 - 3]
        ink = self.px.ink(inner, fill)
        _, band = self.px.ink_lines(inner, fill)
        px = band * self.s / (0.93 if re.search(r"[gjpqy]", node["text"]) else 0.72) if band else 16
        px = min(px, (node["b"][3] - node["b"][1]) * 0.6)
        peak = self.px.ink_peak(inner, fill) or ink or (255, 255, 255)
        look = {"bg": _hexs(fill), "color": _hexs(peak), "px": max(8, round(px)), "bold": self.px.bold(inner, fill, peak, px / self.s),
                "radius": self.px.radius(node["img"], fill), "border": _hexs(self.px.edge(node["img"], fill))}
        return self.pick("Button", lambda s: cdist(s["bg"], fill) + 0.5 * cdist(s["font"], ink) + 6.0 * abs((s["px"] or 16) - px),
                         limit=40, look=look)

    def input_skin(self, node):
        inside = self.px.mode([node["img"][0] + 4, node["img"][1] + 4, node["img"][2] - 4, node["img"][3] - 4], 2)
        border = self.px.edge(node["img"], inside)
        return self.pick("TextField", lambda s: cdist(s["bg"], inside) + (0 if bool(s["border"]) == bool(border) else 80))

    def checkbox_skin(self, node):
        inside = self.px.mode([node["img"][0] + 3, node["img"][1] + 3, node["img"][2] - 3, node["img"][3] - 3], 1)
        side = min(node["b"][2] - node["b"][0], node["b"][3] - node["b"][1])
        edge = self.px.edge(node["img"], inside) or (0, 0, 0)
        return self.pick("FlexContainer", lambda s: cdist(s["bg"], inside) + (0.6 * cdist(s["border"], edge) if s["border"] else 200)
                         + (60 if s["radius"] > side / 4 else 0))

    # ----- writing -----
    def emit(self, line):
        self.lines.append(line)

    def place(self, node, parent, layout, prev_bottom, prev_right, row_box=None):
        """Position words for a node in its parent's layout (dp; widths of blocks as % of the parent)."""
        b, pb = node["b"], parent["b"]
        pw = pb[2] - pb[0]
        w, h = b[2] - b[0], b[3] - b[1]
        words = []
        if node["type"] == "text":
            if node.get("lines", 1) > 1:     # wrapped text needs a width, in a row too, or it takes one long line
                words.append(f"width {dp(w)}" if layout == "horizontal" else f"width {pct(w, pw)}")
        elif node["type"] in ("checkbox",):
            words += [f"width {dp(w)}", f"height {dp(h)}"]
        elif node["type"] == "panel" and layout == "horizontal" and h >= 0.9 * (pb[3] - pb[1]):
            words += [f"width {pct(w, pw)}", "height 100%"]
        else:
            words += [f"width {pct(w, pw)}", f"height {dp(h)}" if node["type"] != "panel" or node.get("fixed_h") else "height preferred"]
        if layout == "free":
            if node.get("centred"):
                words += ["center x 50%", "center y 50%"]
            else:
                words += [f"top {dp(b[1] - pb[1])}", f"left {dp(b[0] - pb[0])}"]
        elif layout == "vertical":
            words += [f"top {dp(b[1] - prev_bottom)}", f"left {dp(b[0] - pb[0])}"]
        else:   # horizontal: left is the gap after the previous one; top lines it up within the row
            words += [f"left {dp(b[0] - prev_right)}"]
            top_ref = row_box[1] if row_box else pb[1]
            if b[1] - top_ref > 2:
                words.append(f"top {dp(b[1] - top_ref)}")
        return words

    def add(self, node, parent, layout, prev_bottom, prev_right, row_box=None):
        t, text = node["type"], node["text"].replace('"', "'")
        behind = self.bg_of(parent) if parent is not self.root else self.px.mode(self.root["img"], 6)
        skin = self.text_skin(node, behind) if t == "text" else None      # also counts its lines
        pos = ", ".join(self.place(node, parent, layout, prev_bottom, prev_right, row_box))
        if t == "text":
            node["id"] = self.ids.make("lbl", text)
            self.emit(f'add a label called {node["id"]} with text "{text}", {pos}' + (f", skin {skin}" if skin else ""))
        elif t == "button":
            node["id"] = self.ids.make("btn", text)
            skin = self.button_skin(node)
            self.emit(f'add a button called {node["id"]} with text "{text}", {pos}' + (f", skin {skin}" if skin else ""))
        elif t in ("input", "dropdown"):
            node["id"] = self.ids.make("tbx" if t == "input" else "lst", text)
            masked = ", masked" if re.search(r"pass(word|code)|\bpin\b", text, re.I) else ""
            if t == "input":
                skin = self.input_skin(node)
                self.emit(f'add a text box called {node["id"]} with placeholder "{text}"{masked}, {pos}' + (f", skin {skin}" if skin else ""))
            else:
                self.emit(f'add a drop down called {node["id"]}, {pos}')
        elif t == "checkbox":
            node["id"] = self.ids.make("flx", "Check")
            skin = self.checkbox_skin(node)
            self.emit(f'add a flex called {node["id"]} with {pos}' + (f", skin {skin}" if skin else ""))
            self.emit(f"select {parent['id']}")      # a new flex becomes the selection: the next widget is its sibling
        elif t == "image":
            node["id"] = self.ids.make("img", text or "Image")
            self.emit(f'add an image called {node["id"]} with {pos}')
        elif t == "panel":
            node["id"] = self.ids.make("flx", self.panel_name(node, parent))
            kind = self.arrange(node)
            skin = self.panel_skin(node)
            self.emit(f'add a flex called {node["id"]} with layout {kind}, {pos}' + (f", skin {skin}" if skin else ""))
            self.children(node, kind)
            self.emit(f"select {parent['id']}")

    def panel_name(self, node, parent):
        b, pb = node["b"], parent["b"]
        if b[0] <= pb[0] + 2 and b[3] - b[1] > 0.8 * (pb[3] - pb[1]) and b[2] - b[0] < 0.6 * (pb[2] - pb[0]):
            return "Left Panel"
        if b[2] >= pb[2] - 2 and b[3] - b[1] > 0.8 * (pb[3] - pb[1]):
            return "Right Panel"
        if b[1] <= pb[1] + 2 and b[3] - b[1] < 0.3 * (pb[3] - pb[1]):
            return "Header"
        return "Card"

    def arrange(self, node):
        """Layout for a container from its children."""
        kids, b = node["kids"], node["b"]
        rows = rows_of(kids)
        if len(rows) == 1 and len(rows[0]) > 1 and all(k["type"] == "panel" and (k["b"][3] - k["b"][1]) >= 0.85 * (b[3] - b[1]) for k in rows[0]):
            return "horizontal"
        if len(kids) == 1 and kids[0]["type"] == "panel":
            k = kids[0]["b"]
            cx, cy = (k[0] + k[2]) / 2 - (b[0] + b[2]) / 2, (k[1] + k[3]) / 2 - (b[1] + b[3]) / 2
            if abs(cx) < 0.05 * (b[2] - b[0]) and abs(cy) < 0.08 * (b[3] - b[1]) and k[0] - b[0] > 8 and k[1] - b[1] > 8:
                kids[0]["centred"] = True
                kids[0]["fixed_h"] = True
                return "free"
        return "vertical"

    def children(self, node, layout):
        rows = rows_of(node["kids"])
        if layout == "horizontal":
            prev_right = node["b"][0]
            for k in rows[0]:
                self.add(k, node, "horizontal", None, prev_right)
                prev_right = k["b"][2]
            return
        if layout == "free":
            for k in node["kids"]:
                self.add(k, node, "free", None, None)
            return
        prev_bottom = node["b"][1]
        for row in rows:
            rb = [min(k["b"][0] for k in row), min(k["b"][1] for k in row), max(k["b"][2] for k in row), max(k["b"][3] for k in row)]
            if len(row) == 1:
                self.add(row[0], node, "vertical", prev_bottom, None)
            else:
                rid = self.ids.make("flx", "Row " + " ".join(k["text"] for k in row if k["text"])[:30])
                pw = node["b"][2] - node["b"][0]
                # a row sizes to its content: a fixed width clipped texts whose font renders wider than in the image.
                # But a content-sized row whose children are far apart clips the last one (the gap is not counted
                # in the preferred width): those get their measured width plus room for wider fonts
                gaps = [b["b"][0] - a["b"][2] for a, b in zip(row, row[1:])]
                width = f"width {pct(min(pw, (rb[2] - rb[0]) * 1.1 + 10), pw)}" if max(gaps) > 40 else "width preferred"
                self.emit(f"add a flex called {rid} with layout horizontal, {width}, height preferred, "
                          f"top {dp(rb[1] - prev_bottom)}, left {dp(rb[0] - node['b'][0])}")
                row_node = {"id": rid, "b": rb, "img": [v / self.s for v in rb], "type": "row", "text": "", "kids": row}
                prev_right = rb[0]
                for k in row:
                    self.add(k, row_node, "horizontal", None, prev_right, rb)
                    prev_right = k["b"][2]
                self.emit(f"select {node['id']}")
            prev_bottom = rb[3]

    def page_look(self):
        """A dark or coloured page: flxMain needs its own skin, or light text lands on white. None for a light page."""
        if not self.new_skins:
            return None
        bg = self.px.mode(self.root["img"], 3)
        if cdist(bg, (255, 255, 255)) < 60:
            return None
        grad = self.px.gradient(self.root["img"])
        return f"background {_hexs(grad[0])} to {_hexs(grad[1])}, angle {grad[2]}" if grad else f"background {_hexs(bg)}"

    def script(self):
        self.emit(f"new form called {self.form}")
        kind = self.arrange(self.root)
        if kind != "vertical":
            self.emit(f"make flxMain {kind}")
        page = self.page_look()
        if page:
            self.emit("select flxMain")
            self.emit(f"give it a new skin with {page}")
        self.children(self.root, kind)
        # "select X" right before another "select" or at the end does nothing: drop it
        out = [l for i, l in enumerate(self.lines) if not (l.startswith("select ") and (i + 1 == len(self.lines) or self.lines[i + 1].startswith("select ")))]
        return out


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("description")
    ap.add_argument("image")
    ap.add_argument("form", help='form name in words, e.g. "sign in vision"')
    ap.add_argument("--width", type=int, default=1366)
    ap.add_argument("--project", default=str(DEFAULT_PROJECT))
    ap.add_argument("--out")
    a = ap.parse_args()
    desc = json.load(open(a.description, encoding="utf-8"))
    lines = Planner(desc, a.image, a.form, a.width, a.project).script()
    text = "\n".join(lines) + "\n"
    if a.out:
        pathlib.Path(a.out).write_text(text, encoding="utf-8")
    print(text)
