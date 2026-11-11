"""Responsive placement: the measured boxes -> the structure a designer would build in Visualizer.

Why: free placement reproduces one screen size exactly and nothing else. This finds the page's real structure, so a form
also holds on the other breakpoints:

  structure   cut the boxes along the widest empty band, again and again (XY-cut): sections -> rows -> columns.
              A row with a wide gap is "split": a left cluster and a right cluster pinned to the right edge (header, banner).
              Boxes that cannot be cut apart overlap on purpose, and only those stay in a free container.
  desktop     flows, % widths for what should grow, dp for what should keep its size (buttons, icon tiles), measured gaps.
  tablet      the same structure if it still fits; font sizes eased; panels grow for text that now wraps.
  mobile      rows that do not fit stack; widths 100%; page margins shrink; big text shrinks; a nav that cannot fit hides.
  screenshots when the designer gave the tablet or mobile screen too (observe.py), that breakpoint follows it instead:
              which rows stack, what hides, text sizes, full-width buttons. The rules still size everything around that.

Visualizer rules this relies on (knowledge/VISUALIZER.md; prompts must follow them too):
  - In a vertical flow, "top" is the gap after the previous widget; in a horizontal flow, "left" is the gap.
  - Horizontal flows do not wrap, so a row either fits or must change layout on that breakpoint (responsiveData.bN.layoutType).
  - Child order cannot change per breakpoint.
  - h=preferred needs autogrow (the generator sets it), and a free container cannot size to its children: it needs a height.
  - Flex "bottom" padding is not dependable in a preferred height, so a panel's bottom inset is a small spacer flex.
"""
import re

from agent import FreePlanner
from detect import area
from plan import _hexs, cdist

# the layout widths the breakpoints apply to
BP = {"tablet": 1024, "mobile": 640}
MIN_COLUMN = 150    # below this width a column of text is not readable: the row stacks instead


def segments(items, axis):
    """Bands along an axis: items whose ranges overlap are one band. -> [(start, end, items)]"""
    a, b = (0, 2) if axis == "x" else (1, 3)
    bands = []
    for it in sorted(items, key=lambda i: i["img"][a]):
        if bands and it["img"][a] < bands[-1][1] - 1:
            bands[-1][1] = max(bands[-1][1], it["img"][b])
            bands[-1][2].append(it)
        else:
            bands.append([it["img"][a], it["img"][b], [it]])
    return bands


def bbox(items):
    return [min(i["img"][0] for i in items), min(i["img"][1] for i in items), max(i["img"][2] for i in items), max(i["img"][3] for i in items)]


def icon_column(cols):
    """A column holding only small boxes: ticks or icons, each belonging to the row beside it, not a column of its own."""
    return any(len(c[2]) >= 2 and all(i["img"][2] - i["img"][0] <= 60 and i["img"][3] - i["img"][1] <= 60 and i.get("type") != "text" for i in c[2]) for c in cols)


def is_columns(items):
    """A clear gutter runs the whole height of these items, with several things on each side."""
    cols, rows = segments(items, "x"), segments(items, "y")
    if len(cols) < 2 or len(rows) < 2 or icon_column(cols):
        return False
    box = bbox(items)
    gutter = max(q[0] - p[1] for p, q in zip(cols, cols[1:]))
    return gutter >= 0.03 * (box[2] - box[0]) and sum(len(c[2]) >= 2 for c in cols) >= 2


def merge_columns(rows):
    """A page's header and footer span its width, so its first cut is always into rows, and that would slice a two-column
    hero across its columns. Neighbouring bands that together form real columns are one section."""
    out, i = [], 0
    gaps = [q[0] - p[1] for p, q in zip(rows, rows[1:])]
    limit = 0.6 * max(gaps, default=0)
    while i < len(rows):
        j, best = i, None
        members = list(rows[i][2])
        while j + 1 < len(rows):
            if rows[j + 1][0] - rows[j][1] >= limit:      # a section break
                break
            members = members + rows[j + 1][2]
            j += 1
            if is_columns(members):
                best = j
        if best is None:
            out.append(rows[i])
            i += 1
        else:
            merged = [it for r in rows[i:best + 1] for it in r[2]]
            out.append([rows[i][0], rows[best][1], merged])
            i = best + 1
    return out


def arrange(items):
    """Items -> one item, or {"kind": v|h|split|free, "kids": [...], "img": box}. The widest empty band is cut first."""
    if len(items) == 1:
        return items[0]
    rows, cols = segments(items, "y"), segments(items, "x")
    rows = merge_columns(rows)
    if len(rows) == 1 and len(cols) == 1:
        # things that overlap on purpose: back to front, in the design's own layer order when it is known (Figma), else
        # biggest first
        z = all("z" in i for i in items)
        return {"kind": "free", "kids": sorted(items, key=lambda i: i["z"] if z else -area(i["img"])), "img": bbox(items)}
    gap = lambda bands: max((q[0] - p[1] for p, q in zip(bands, bands[1:])), default=-1)  # noqa: E731
    box = bbox(items)
    # Two real columns: each holds several things and a clear gutter runs the whole height. Cutting into rows first would
    # slice across them. On a phone they stack column by column, which keeps each column's content together.
    columns = is_columns(items) and len(rows) > 1
    if len(rows) > 1 and not columns and (len(cols) == 1 or icon_column(cols) or gap(rows) >= gap(cols) * 0.8):
        return {"kind": "v", "kids": [arrange(r[2]) for r in rows], "img": box}
    kids = [arrange(c[2]) for c in cols]
    gaps = [c2[0] - c1[1] for c1, c2 in zip(cols, cols[1:])]
    widest = max(gaps)
    equal = len(cols) > 2 and max(c[1] - c[0] for c in cols) <= 1.3 * min(c[1] - c[0] for c in cols)
    if not equal and widest >= max(40, 0.1 * (box[2] - box[0])):
        # a wide gap: what is before it stays left, what is after it stays right
        cut = gaps.index(widest) + 1
        left, right = kids[:cut], kids[cut:]
        pack = lambda part: part[0] if len(part) == 1 else {"kind": "h", "kids": part, "img": bbox(part)}  # noqa: E731
        return {"kind": "split", "kids": [pack(left), pack(right)], "img": box}
    return {"kind": "h", "kids": kids, "img": box}


class ResponsivePlanner(FreePlanner):
    def __init__(self, *args, views=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.over = {"tablet": [], "mobile": []}    # per-breakpoint commands, written after the widgets
        self.hidden = {"tablet": [], "mobile": []}
        self.groups = 0
        self.views = {bp: v for bp, v in (views or {}).items() if bp in BP}    # bp -> (reader, lines) of that screenshot
        self.obs = {}           # bp -> observe.Seen
        self.observed = {}      # bp -> what the screenshot showed, for the UI

    # ----- measuring -----
    def dp(self, v):
        return max(0, round(v * self.s))

    def w(self, it):
        return (it["img"][2] - it["img"][0]) * self.s

    def h(self, it):
        return (it["img"][3] - it["img"][1]) * self.s

    def fw(self, it):
        return self.w(it) + it.get("extra", 0)

    def has_text(self, it):
        return it.get("type") in ("text", "link", "field") or any(self.has_text(k) for k in (it.get("kids") or []))

    def hugs(self, it):
        """A row of fixed things and short labels: it sizes to its content instead of taking a share of the width."""
        if self.tick_row(it):
            return False
        yes = it.get("kind") == "h" and all(
            (k.get("type") in ("icon", "image", "checkbox", "button") or (k.get("type") == "text" and not self.wraps(k)) or (k.get("type") == "panel" and not k.get("inner")))
            for k in it["kids"])
        if yes:
            for k in it["kids"]:
                k["in_cluster"] = True
        return yes

    def tick_row(self, it):
        """An icon or tick and its text: a list item. It takes the whole line, however short the text is today."""
        k = it.get("kids") or []
        return it.get("kind") == "h" and len(k) == 2 and k[0].get("type") in ("image", "icon", "checkbox") and k[1].get("type") == "text" and " " in k[1]["text"]

    def wraps(self, it):
        """Text that can take several lines: a measured paragraph, or one long line that will need to on a narrower screen."""
        return it.get("type") == "text" and bool(it.get("wrapped") or it.get("lines", 1) > 1 or self.w(it) > 300)

    def needs(self, it, bp):
        """The narrowest this item can go and stay readable."""
        kind = it.get("kind")
        if kind in ("h", "split"):
            gaps = [self.gap_x(a, b) for a, b in zip(it["kids"], it["kids"][1:])] if kind == "h" else [12]
            tight = getattr(self, "tight", False)
            return sum(self.needs(k, bp) for k in it["kids"]) + sum(min(g, 14 if tight else g) if self.hugs(it) else min(g, 24) for g in gaps)
        if kind in ("v", "free"):
            return max(self.needs(k, bp) for k in it["kids"])
        t = it.get("type")
        if t == "text":
            floor = 300 if bp == "mobile" else 90
            if it.get("in_cluster") or " " not in it["text"]:
                return self.w(it) * 1.1
            return min(self.w(it) * 1.08, floor)
        if t == "button" and (it.get("in_cluster") or bp == "split-right"):
            return self.w(it)
        if t in ("button", "input", "dropdown", "field"):
            return min(self.w(it), max(90, 0.8 * self.w(it)))
        if t in ("icon", "image", "checkbox") or not it.get("inner"):
            return self.w(it)
        inner = self.needs(it["inner"], bp) + 2 * max(0, (it["inner"]["img"][0] - it["img"][0]) * self.s)
        return max(min(MIN_COLUMN, self.w(it)), min(inner, 240))

    def gap_x(self, a, b):
        return max(0, (b["img"][0] - a["img"][2]) * self.s)

    def gap_y(self, a, b):
        return max(0, (b["img"][1] - a["img"][3]) * self.s)

    # ----- writing -----
    def add(self, wid, bp, **attrs):
        self.over[bp].append((wid, attrs))

    def prepare(self, n):
        """A panel's own children become its inner structure, bottom-up."""
        for k in n.get("kids", []):
            self.prepare(k)
        if n.get("kids") and n.get("type") in ("panel", "root"):
            n["inner"] = arrange(n["kids"])

    def size_words(self, it, parent, layout):
        t, kind = it.get("type"), it.get("kind")
        pw = self.w(parent)
        w = self.fw(it)
        if t == "text":
            if it.get("wrapped") or it.get("lines", 1) > 1:
                want = max(w, self.w(it) * 1.12)
                if layout == "h":       # in a row, no further than the row's edge (an icon before it keeps its place)
                    want = min(want, max(w, (parent["img"][2] - it["img"][0]) * self.s))
                return f"width {self.pct(want, pw)}"
            return "width preferred"
        if t in ("icon", "image", "checkbox"):
            return None
        if self.hugs(it):
            return "width preferred, height preferred"
        if self.tick_row(it):
            indent = max(0, (it["img"][0] - parent["img"][0]) * self.s)
            return f"width {self.pct(pw - indent - (0 if parent.get('kind') else indent), pw)}, height preferred"
        grows = kind is not None or t in ("panel", "input", "dropdown") or w > 0.6 * pw
        width = f"width {self.pct(w, pw)}" if grows and (w > 90 or kind) else f"width {round(w)}dp"
        if kind in ("v", "h"):
            return f"{width}, height preferred"
        return f"{width}, height {round(self.h(it))}dp"

    @staticmethod
    def pct(v, whole):
        return f"{min(100, round(100 * v / whole, 1)):g}%" if whole else "100%"

    def offset_words(self, it, parent, layout, prev):
        x1, y1 = it["img"][0], it["img"][1]
        px1, py1 = parent["img"][0], parent["img"][1]
        if layout == "v":
            top = (y1 - (prev["img"][3] if prev else py1)) * self.s
            left = (x1 - px1) * self.s
            margin = f"{self.pct(left, self.w(parent))}" if parent.get("type") == "root" else f"{round(left)}dp"
            return f"top {max(0, round(top))}dp, left {margin}"
        if layout == "h":
            left = (x1 - (prev["img"][2] if prev else px1)) * self.s - (prev.get("extra", 0) if prev else 0)
            top = max(0, round((y1 - py1) * self.s))
            if prev and not parent.get("hugging") and prev.get("type") not in ("image", "icon", "checkbox"):
                return f"top {top}dp, left {self.pct(max(0, left), self.w(parent))}"
            return f"top {top}dp, left {max(0, round(left))}dp"
        return f"top {max(0, round((y1 - py1) * self.s))}dp, left {max(0, round((x1 - px1) * self.s))}dp"

    def place(self, it, parent, pid, layout, prev):
        """One item into its parent's layout. -> the widget id"""
        kind, t = it.get("kind"), it.get("type")
        where = self.offset_words(it, parent, layout, prev)
        size = self.size_words(it, parent, layout)
        if kind:
            self.groups += 1
            first = next((k for k in self.leaves(it) if k.get("text")), None)
            it["id"] = self.ids.make("flx", (first["text"] if first else "") + " Group" if not first else first["text"])
            flex = {"v": "vertical", "h": "horizontal", "split": "free", "free": "free"}[kind]
            self.line({"id": pid}, f'add a flex called {it["id"]} with layout {flex}, {size}, {where}')
            self.cur = it["id"]
            self.fill(it, it)
            return it["id"]
        it.setdefault("b", [v * self.s for v in it["img"]])
        text = (it.get("text") or "").replace('"', "'")
        if t == "text":
            it["id"] = self.ids.make("lbl", text)
            skin = self.text_skin(it, None)
            if it.get("centred"):
                self.line({"id": pid}, f'add a label called {it["id"]} with text "{text}", center x 50%, center y 50%, skin {skin}')
            else:
                self.line({"id": pid}, f'add a label called {it["id"]} with text "{text}", {size}, {where}, skin {skin}')
        elif t == "button":
            it["id"] = self.ids.make("btn", text)
            self.line({"id": pid}, f'add a button called {it["id"]} with text "{text}", {size}, {where}, skin {self.button_skin(it)}')
        elif t == "input":
            it["id"] = self.ids.make("tbx", text)
            self.line({"id": pid}, f'add a text box called {it["id"]} with placeholder "{text}", {size}, {where}, skin {self.input_skin(it)}')
        elif t == "dropdown":
            it["id"] = self.ids.make("lst", text)
            self.line({"id": pid}, f'add a drop down called {it["id"]}, {size}, {where}')
        elif t == "checkbox":
            it["id"] = self.ids.make("flx", "Check")
            self.line({"id": pid}, f'add a flex called {it["id"]} with width {round(self.w(it))}dp, height {round(self.h(it))}dp, {where}, skin {self.checkbox_skin(it)}')
            self.cur = it["id"]
        elif t in ("icon", "image"):
            it["id"] = self.ids.make("img", "Icon")
            self.line({"id": pid}, f'add image {it["id"]} from {self.crop(it["img"])}, width {round(self.w(it))}dp, height {round(self.h(it))}dp, {where}')
        else:
            first = next((k for k in self.leaves(it) if k.get("text")), None)
            it["id"] = self.ids.make("flx", first["text"] if first else "Panel")
            skin = self.panel_skin(it)
            inner = it.get("inner")
            flex = {"v": "vertical", "h": "horizontal"}.get(inner.get("kind") if inner else None, "free")
            self.line({"id": pid}, f'add a flex called {it["id"]} with layout {flex}, {size}, {where}' + (f", skin {skin}" if skin else ""))
            self.cur = it["id"]
            if inner:
                self.fill(inner if inner.get("kind") else {"kind": "free", "kids": [inner], "img": inner["img"]}, it)
        return it["id"]

    def leaves(self, it):
        for k in it.get("kids") or []:
            if k.get("type") == "text":
                yield k
            yield from self.leaves(k)

    def fill(self, group, owner):
        """The group's items into the flex `owner` (which has the matching layout)."""
        pid = owner["id"]
        kind = group["kind"]
        prev = None
        if kind == "h":
            owner["hugging"] = self.hugs(group)
            for a, b in zip(group["kids"], group["kids"][1:]):
                if not self.hugs(a) and (a.get("kind") or self.wraps(a)) and self.has_text(a):
                    a["extra"] = 0.85 * self.gap_x(a, b)
            last = group["kids"][-1]
            if not self.hugs(last) and last.get("kind") and self.has_text(last) and owner is not group:
                last["extra"] = max(0, (owner["img"][2] - last["img"][2]) * self.s - 6)
        if kind == "split":
            a, b = group["kids"]
            if not self.hugs(a) and a.get("kind") and self.has_text(a):
                a["extra"] = max(0, self.gap_x(a, b) - 10)
            before = len(self.body)
            self.place_in_free(a, owner, pid)
            self.place_right(b, owner, pid)
            if self.w(b) >= 0.35 * self.w(owner) and not self.hugs(b):
                # two halves (a Yes/No toggle): both keep their share as the row narrows, or they would meet
                ow = self.w(owner)
                for i in range(before, len(self.body)):
                    line = self.body[i]
                    if f"called {b['id']} " in line:
                        self.body[i] = re.sub(r"width \d+dp", f"width {self.pct(self.w(b), ow)}", line, count=1)
                    elif f"called {a['id']} " in line:
                        self.body[i] = re.sub(r"left (\d+)dp", lambda m: f"left {self.pct(float(m.group(1)), ow)}", line, count=1)
            return
        for k in group["kids"]:
            layout = {"v": "v", "h": "h"}.get(kind, "free")
            self.place(k, owner, pid, layout, prev)
            prev = k

    def place_in_free(self, it, owner, pid):
        self.place(it, owner, pid, "free", None)

    def place_right(self, it, owner, pid):
        """Pinned to the right edge, so it stays there as the screen narrows."""
        right = max(0, round((owner["img"][2] - it["img"][2]) * self.s))
        top = max(0, round((it["img"][1] - owner["img"][1]) * self.s))
        before = len(self.body)
        self.place(it, owner, pid, "free", None)
        # the first line added is this item: swap its left for the right anchor
        for i in range(before, len(self.body)):
            if self.body[i].startswith("add a ") and f"called {it['id']} " in self.body[i]:
                self.body[i] = re.sub(r"top \d+dp, left \d+(?:\.\d+)?(?:dp|%)", f"top {top}dp, right {right}dp", self.body[i])
                # Visualizer ignores right on a preferred width, so whatever is pinned gets a dp width
                if it.get("kind"):
                    self.body[i] = re.sub(r"width (?:[\d.]+%|preferred)", f"width {round(self.needs(it, '') + 2)}dp", self.body[i])
                elif it.get("type") == "panel":     # a container (a Figma auto-layout group): its own width, as drawn
                    self.body[i] = re.sub(r"width (?:[\d.]+%|preferred)", f"width {round(max(self.w(it), self.needs(it, '')) + 2)}dp", self.body[i])
                elif it.get("type") == "text":
                    self.body[i] = re.sub(r"width (?:[\d.]+%|preferred)", f"width {round(self.w(it) * 1.1 + 2)}dp", self.body[i])
                    self.body[i] = self.body[i].replace(", skin ", ", align right, skin ", 1)
                break

    # ----- breakpoints -----
    # Every function gets pw: the width in dp its owner has on this breakpoint. Everything is worked out top-down from there.
    def scaled(self, k, owner, pw):
        """k's width on this breakpoint. % widths scale with the owner; dp widths and clusters stay as they are."""
        if k.get("kind") == "h" and self.hugs(k):
            return self.needs(k, "")
        if self.tick_row(k):
            indent = max(0, (k["img"][0] - owner["img"][0]) * self.s)
            return pw - indent - (0 if owner.get("kind") else indent)
        if k.get("kind") or k.get("type") == "panel" or self.wraps(k):
            return self.fw(k) * pw / max(1, self.w(owner))
        return self.w(k)

    def responsive(self, it, pw, bp):
        """Per-breakpoint values inside one item, given the width it has on this breakpoint."""
        kind = it.get("kind")
        if kind in ("h", "split"):
            self.responsive_row(it, it, pw, bp)
        elif kind == "v":
            self.responsive_stack(it, it, pw, bp)
        elif kind == "free":
            self.responsive_free(it, pw, bp)
        elif it.get("type") == "panel" and it.get("inner"):
            inner = it["inner"]
            k = inner.get("kind")
            if k in ("h", "split"):
                self.responsive_row(inner, it, pw, bp)
            elif k == "v":
                self.responsive_stack(inner, it, pw, bp)
            elif k == "free":
                self.responsive_free(inner, pw, bp)
            else:
                self.responsive(inner, self.scaled(inner, it, pw), bp)
        elif it.get("type") == "text":
            self.responsive_text(it, bp)

    def rigid(self, it, bp):
        """A right-pinned part keeps its measured width: buttons do not shrink, and a cluster hugs its content."""
        if it.get("kind") == "h" and self.hugs(it):
            return self.needs(it, bp)
        return self.w(it) if it.get("type") in ("button", "image", "icon", "panel") else self.needs(it, bp)

    def inset(self, group, owner):
        return max(0, (group["img"][0] - owner["img"][0]) * self.s) if owner is not group else 0

    def responsive_row(self, row, owner, pw, bp):
        """A row keeps its structure while it fits. Horizontal flows do not wrap, so otherwise it changes layout."""
        wid = owner["id"]
        kids = row["kids"]
        if owner.get("type") == "panel" and (self.h(owner) <= 44 or (self.h(owner) <= 64 and owner.get("style")
                                                and all(not self.wraps(k) for k in self.leaves(row)))):
            # a pill, or a button drawn as a flex ("Verify →"), keeps its line. An unstyled line (an icon and its words
            # in a card's list) that no longer fits wraps its words beside the icon, and grows to hold them.
            texts = [k for k in kids if k.get("type") == "text"]
            # only a line that spans its list (wider than its words): a cluster that hugs them ("Front · clear and
            # readable" centred on a card) has room around it, and wrapping it would push the card's content down
            spans = self.w(owner) > (row["img"][2] - row["img"][0]) * self.s + 8
            if not owner.get("style") and row["kind"] == "h" and len(texts) == 1 and spans and self.needs(row, bp) > pw + 2:
                t = texts[0]
                share = max(60, pw - sum(self.w(o) + 12 for o in kids if o is not t))
                self.add(t["id"], bp, width=f"{round(share)}dp")
                lines = -(-self.width_on(t, bp) // share)
                if lines > 1:
                    self.add(wid, bp, height=f"{round(self.h(owner) + (lines - 1) * self.h(t))}dp")
            return
        # the screenshot hides all but one column (a sidebar on a phone): that column takes the whole width, edge to edge.
        # Not a pinned cluster ("Save & exit" when the caption beside it hides): that keeps its place.
        shown = [k for k in kids if not (bp in self.obs and self.obs[bp].hides(k))]
        alone = len(kids) > 1 and len(shown) == 1 and not self.hugs(shown[0]) and self.w(shown[0]) >= 0.4 * self.w(row) \
            and (shown[0].get("kind") or shown[0].get("type") == "panel")
        pad = 0 if alone else 2 * self.inset(row, owner)
        if bp == "mobile" and pad > 32:
            pad = 32
            self.add(kids[0]["id"], bp, left="16dp")
            if row["kind"] == "split":      # the side pinned right moves in by as much
                self.add(kids[1]["id"], bp, right="16dp")
        room = pw - pad
        need = self.needs(row, bp)
        verdict = self.obs[bp].row(row) if bp in self.obs else None
        if alone:
            verdict = "stack"
        if verdict == "row":            # the screenshot shows it side by side: it stays a row, nothing hides by guess
            need, long_side = -1, True
        elif verdict == "stack":
            need, long_side = room + 1, True
        elif bp == "mobile" and row["kind"] == "split" and not self.hugs(kids[0]) and self.w(kids[0]) + self.w(kids[1]) + 12 > room:
            need = room + 1
            long_side = True
        else:
            long_side = False
        if need > room and row["kind"] == "split" and not long_side:
            self.tight = True
            tight_need = self.needs(row, bp)
            self.tight = False
            if tight_need <= room:
                for side in kids:
                    if self.hugs(side):
                        for k in side["kids"][1:]:
                            self.add(k["id"], bp, left="14dp")
                need = tight_need
        if need > room and row["kind"] == "split" and not long_side:
            # first a nav: short links do not fit a phone (a real app would put them in a menu). The first label stays:
            # that is the brand name.
            for side in kids:
                words = [k for k in (side.get("kids") or []) if k.get("type") == "text" and " " not in k["text"]]
                for k in words[1:] if len(words) >= 4 else words if len(words) >= 3 else []:
                    self.add(k["id"], bp, visible="false")
                    self.hidden[bp].append(k["text"])
                    need -= self.w(k) + 24
            # then the extra actions, keeping the last, which is the main one
            right = kids[1]
            if right.get("kind") == "h":
                left_over = self.needs(right, bp)
                for k in right["kids"][:-1]:
                    if need <= room:
                        break
                    self.add(k["id"], bp, visible="false")
                    self.hidden[bp].append(k.get("text") or k["id"])
                    need -= self.w(k)
                    left_over -= self.w(k) + 12
                if left_over < self.needs(right, bp):
                    self.add(right["id"], bp, width=f"{round(left_over)}dp")
                    self.add(right["kids"][-1]["id"], bp, left="0dp")
        if need <= room:
            if row["kind"] == "split" and not self.hugs(kids[0]) and kids[0].get("kind") and self.has_text(kids[0]):
                left = room - self.rigid(kids[1], bp) - 16
                self.add(kids[0]["id"], bp, width=self.pct(left, pw))
                self.responsive(kids[0], left, bp)
                self.responsive(kids[1], self.rigid(kids[1], bp), bp)
                if owner.get("type") == "panel":
                    grown = self.height_at(owner, pw)
                    if grown > self.h(owner) + 2:
                        self.add(owner["id"], bp, height=f"{round(grown)}dp")
                return
            fixed = sum(self.w(k) + self.gap_x(a, k) for a, k in zip(kids, kids[1:]) if k.get("type") != "text") + (self.w(kids[0]) if kids[0].get("type") != "text" else 0)
            for k in kids:
                self.responsive(k, self.scaled(k, owner, pw), bp)
                if k.get("type") == "text" and not k.get("in_cluster") and row["kind"] == "h" and not self.hugs(row):
                    share = room - fixed - 14
                    if self.w(k) * 1.05 > share:
                        self.add(k["id"], bp, width=f"{round(max(60, share))}dp")
            panels = [k for k in kids if k.get("type") == "panel" and k.get("inner")]
            if len(panels) > 1:     # cards in a row stay the same height, tall enough for the text that now wraps
                tallest = max(self.height_at(k, self.scaled(k, owner, pw)) for k in panels)
                # and, when the designer drew this size, no taller than their content (smaller text, a shorter card)
                # shorter only when the frame draws every card in the row (our own estimate keeps the wide card's spare
                # room, and is not sure enough to cut a card down)
                drawn = [self.obs[bp].drawn_height(k) for k in panels] if bp in self.obs else []
                shrink = bool(drawn) and all(drawn) and max(drawn) < max(self.h(k) for k in panels) - 12
                if shrink:
                    tallest = min(tallest, max(drawn))     # the check grows it back, evenly, if its text needs more
                if tallest > max(self.h(k) for k in panels) + 2 or shrink:
                    for k in panels:
                        self.add(k["id"], bp, height=f"{round(tallest)}dp")
            elif owner.get("type") == "panel" and not panels:
                grown = self.height_at(owner, pw)
                if grown > self.h(owner) + 2:
                    self.add(owner["id"], bp, height=f"{round(grown)}dp")
            return
        # it does not fit: stack
        self.add(wid, bp, layout="vertical", height="preferred")
        for i, k in enumerate(kids):
            top = (row["img"][1] - owner["img"][1]) * self.s if owner is not row else 0
            attrs = {"left": f"{round(pad / 2)}dp", "top": f"{round(top)}dp" if i == 0 else "14dp"}
            if alone and k is shown[0]:
                attrs["top"] = "0dp"
            if row["kind"] == "split":
                attrs["right"] = "none"
            grows = (k.get("kind") or k.get("type") in ("panel", "text", "input", "dropdown") or self.spans(k, bp)) and not self.tile(k)
            if grows and not self.hugs(k):
                attrs["width"] = self.pct(room, pw)
                attrs["height"] = None
            self.add(k["id"], bp, **attrs)
            self.responsive(k, room if grows else self.scaled(k, owner, pw), bp)
            if k.get("type") == "panel" and k.get("inner"):
                self.grow_panel(k, room, bp)
        if owner.get("type") == "panel":
            self.spacer(owner, bp)

    def grow_panel(self, panel, pw, bp):
        """A panel alone on its line: it sizes to its content if it can, or else gets a height for the wrapped text."""
        inner = panel["inner"]
        flows = inner.get("kind") == "v" or any(w == panel["id"] and a.get("layout") == "vertical" for w, a in self.over[bp])
        if flows:
            self.add(panel["id"], bp, height="preferred")
            self.spacer(panel, bp)
        else:
            grown = self.height_at(panel, pw)
            if abs(grown - self.h(panel)) > 2:
                self.add(panel["id"], bp, height=f"{round(grown)}dp")

    def height_at(self, it, width):
        """How tall this item is at this width: text wraps, rows that no longer fit stack, the rest follows."""
        kind = it.get("kind")
        seen = self.obs.get(self.bp)
        if seen and any(h is it for h in seen.hidden):
            return 0
        if kind == "v":
            y, prev = 0, None
            for k in it["kids"]:
                y += (self.gap_y(prev, k) if prev else 0) + self.height_at(k, self.scaled(k, it, width) if k.get("type") != "text" else width)
                prev = k
            return y
        if kind in ("h", "split"):
            verdict = seen.row(it) if seen else None
            if verdict == "stack" or (verdict is None and self.needs(it, self.bp) > width):
                return sum(self.height_at(k, width) for k in it["kids"]) + 14 * (len(it["kids"]) - 1)
            kids = it["kids"]
            tallest = 0
            for i, k in enumerate(kids):
                if self.hugs(k):
                    kw = self.needs(k, self.bp)
                elif k.get("type") == "text" and kind == "h":
                    kw = max(60, width - sum(self.w(o) + 14 for o in kids if o is not k))
                elif kind == "split" and i == 0:
                    kw = max(60, width - self.rigid(kids[1], self.bp) - 16)
                else:
                    kw = max(60, self.fw(k) * width / max(1, self.w(it)))
                tallest = max(tallest, (k["img"][1] - it["img"][1]) * self.s + self.height_at(k, kw))
            return tallest
        if kind == "free":
            return self.h(it) * min(1.0, width / max(1, self.w(it)))
        if it.get("type") == "text":
            lines = max(1, it.get("lines", 1), 2 if it.get("wrapped") else 1)
            total = self.w(it) * lines * 1.08
            need = max(1, int(-(-total // max(1, width))))
            return self.h(it) * need / lines if need > lines else self.h(it)
        if it.get("type") == "panel" and it.get("inner"):
            inner = it["inner"]
            indent = max(0, (inner["img"][0] - it["img"][0]) * self.s)
            top = (inner["img"][1] - it["img"][1]) * self.s
            bottom = (it["img"][3] - inner["img"][3]) * self.s
            return top + self.height_at(inner, max(60, width - 2 * indent)) + max(0, bottom)
        return self.h(it)

    def responsive_stack(self, stack, owner, pw, bp):
        root = owner.get("type") == "root"
        seen = self.obs.get(bp)
        if seen and not root and seen.turned(stack):
            # the screenshot or frame lays this list out across: a horizontal flex, the shown items sharing the width
            shown = [k for k in stack["kids"] if not seen.hides(k)]
            self.add(owner["id"], bp, layout="horizontal", height="preferred")
            share = pw / max(1, len(shown))
            for k in shown:
                self.add(k["id"], bp, left="0dp", top="0dp", width=self.pct(share, pw))
                self.responsive(k, share, bp)
            return
        for i, k in enumerate(stack["kids"]):
            attrs = {}
            indent = max(0, (k["img"][0] - owner["img"][0]) * self.s)
            if bp == "mobile" and not root and indent > 24:
                indent = 16
                attrs["left"] = "16dp"
            room = pw - indent - (0 if root or owner is stack else indent)
            kw = self.scaled(k, owner, pw)
            # a fixed-width thing far to the right would leave the screen: keep its share of the width instead
            if not root and not k.get("kind") and k.get("type") not in ("panel", "text") and indent + kw > pw:
                attrs["left"] = self.pct(max(0, pw - kw - 8), pw)
            if root and bp == "mobile" and self.w(k) >= 0.95 * self.w(owner):
                kw = room = pw          # a band across the page (header, hero background) stays across it; its contents move in
                if self.w(k) < 0.995 * self.w(owner):
                    attrs.update(left="0%", width="100%")      # edge to edge: a few % inset is a gap on a phone
            elif root and bp == "mobile":
                attrs["left"] = "4%"
                kw = 0.92 * pw
                if (k.get("kind") or k.get("type") in ("panel", "text") or self.w(k) > 0.6 * self.w(owner)) and not self.tile(k):
                    if not self.hugs(k):
                        attrs["width"] = "92%"
                room = kw
            elif kw > room or (attrs.get("left") == "16dp" and (k.get("kind") or k.get("type") in ("panel", "text")) and not self.tile(k)):
                attrs["width"] = self.pct(room, pw)
                kw = room
            if i and bp == "mobile":
                gap = self.gap_y(stack["kids"][i - 1], k)
                if gap > 24:
                    attrs["top"] = f"{round(max(16, gap * 0.6))}dp"
            if k.get("type") == "text" and not k.get("centred") and not self.wraps(k) and self.width_on(k, bp) > room:
                attrs["width"] = self.pct(room, pw)
            if self.spans(k, bp):      # the screenshot shows it across its column
                attrs["width"] = self.pct(room, pw)
            if attrs:
                self.add(k["id"], bp, **attrs)
            self.responsive(k, kw, bp)
            if attrs.get("width") and k.get("type") == "panel" and k.get("inner") and bp == "mobile":
                self.grow_panel(k, kw, bp)
        if owner.get("type") == "panel":
            grown = self.height_at(owner, pw)
            if grown > self.h(owner) + 2 and not any(w == owner["id"] and "height" in a for w, a in self.over[bp]):
                self.add(owner["id"], bp, height=f"{round(grown)}dp")

    def responsive_free(self, group, pw, bp):
        """Things overlap on purpose: scale them down together; on a phone keep the biggest one."""
        for k in group["kids"]:          # text keeps the size this breakpoint gives it
            if k.get("type") == "text" and k.get("id"):
                self.responsive_text(k, bp)
        scale = min(1.0, pw / max(1, self.w(group)))
        if scale >= 0.98:
            return
        biggest = max(group["kids"], key=lambda k: area(k["img"]))
        if bp == "mobile":
            for k in group["kids"]:
                if k is not biggest and k.get("id"):
                    self.add(k["id"], bp, visible="false")
                    self.hidden[bp].append(k.get("text") or k["id"])
        for k in group["kids"]:
            if k.get("id") and (bp != "mobile" or k is biggest):
                self.add(k["id"], bp, left=self.pct((k["img"][0] - group["img"][0]) * self.s, self.w(group)),
                         top=f"{round((k['img'][1] - group['img'][1]) * self.s * scale)}dp",
                         width=self.pct(self.w(k), self.w(group)), height=f"{round(self.h(k) * scale)}dp")

    def spacer(self, panel, bp):
        """A preferred height ends at the last widget: this keeps the panel's bottom inset. Hidden on the design size."""
        inner = panel.get("inner")
        inset = (panel["img"][3] - inner["img"][3]) * self.s if inner else 0
        if inset < 4:
            return
        if not panel.get("spacer"):
            panel["spacer"] = self.ids.make("flx", "End")
            # a panel's padding, not the empty page under a full-height panel's content
            self.ends.append((panel["id"], panel["spacer"], round(min(inset, 40))))
        self.add(panel["spacer"], bp, visible="true")

    def width_on(self, it, bp):
        """A one-line text's width on this breakpoint: at the size the screenshot or frame gives it, else the rules' guess."""
        look = it.get("look") or {}
        seen = self.obs.get(bp)
        px = seen.sizes.get(id(it)) if seen else None
        if px and look.get("px"):
            return self.w(it) * px / look["px"]
        return self.w(it) * (0.75 if look.get("px", 0) >= 30 else 1)

    def tile(self, it):
        """A small square-ish panel (an icon tile, a code box): it keeps its size on every screen."""
        return it.get("type") == "panel" and self.w(it) <= 100 and self.h(it) <= 100

    def spans(self, it, bp):
        return bp in self.obs and id(it) in self.obs[bp].full

    def responsive_text(self, it, bp):
        look = it.get("look")
        seen = self.obs.get(bp)
        if look and seen and (seen.shows(it) or id(it) in seen.sizes):   # shown (or reworded): its size there, or no change
            px = seen.sizes.get(id(it))
            if px:
                self.add(it["id"], bp, skin=self.make_skin("Label", {"color": _hexs(look["ink"]), "px": px, "bold": look["bold"]}))
            return
        if not look or look["px"] < 28:
            return
        px = max(22, round(look["px"] * {"tablet": 0.82, "mobile": 0.58}[bp]))
        self.add(it["id"], bp, skin=self.make_skin("Label", {"color": _hexs(look["ink"]), "px": px, "bold": look["bold"]}))

    def make_grids(self):
        cols = {}
        for seen in self.obs.values():
            for row, k in seen.grids:
                cols[id(row)] = (row, min(k, cols.get(id(row), (row, k))[1]))
        for row, k in cols.values():
            kids = row["kids"]
            if len(kids) % k or k < 2 or k >= len(kids):
                continue
            row["kids"] = [{"kind": "h", "kids": kids[i:i + k], "img": bbox(kids[i:i + k]), "grid": True} for i in range(0, len(kids), k)]
        self.obs = {}

    def follow(self, bp):
        """What the screenshot shows wins over the rules' guesses: guessed hides of things it shows go, its own hides come in."""
        seen = self.obs[bp]
        shown = {k["id"] for k in seen.items if k.get("id") and seen.shows(k)}
        self.over[bp] = [(w, {k: v for k, v in a.items() if not (k == "visible" and v == "false" and w in shown)}) for w, a in self.over[bp]]
        self.hidden[bp] = []
        for it in seen.hidden:
            self.add(it["id"], bp, visible="false")
            self.hidden[bp].append(seen.first_text(it))
        self.observed[bp] = seen.summary()

    # ----- the prompt -----
    def script(self):
        self.build_tree()
        self.plan_text()
        self.prepare(self.root)
        self.ends = []
        base, glows = self.page()
        self.body = [f"new form called {self.form}", "make flxMain free"]
        form_skin = self.make_skin("Form", {"bg": _hexs(base)})
        page_skin = form_skin
        self.body.append(f"set form skin {page_skin}")
        self.cur = "flxMain"
        main = {"id": "flxMain", "img": self.root["img"], "type": "root"}
        width = self.px.W * self.s
        for i, g in enumerate(glows, 1):
            self.line(main, f"add a flex called flxGlow{i} with width 2dp, height 2dp, top {round(g['y'])}dp, left {self.pct(g['x'], width)}, skin {self.glow_skin(g)}")
            self.cur = f"flxGlow{i}"
        inner = self.root.get("inner") or {"kind": "v", "kids": [], "img": self.root["img"]}
        if not inner.get("kind"):
            inner = {"kind": "v", "kids": [inner], "img": inner["img"]}
        if inner["kind"] != "v":
            inner = {"kind": "v", "kids": [inner], "img": inner["img"]}
        self.line(main, 'add a flex called flxPage with layout vertical, width 100%, height preferred, top 0dp, left 0dp')
        self.cur = "flxPage"
        self.root["id"] = "flxPage"
        from observe import Seen

        def observe_all():
            for bp, view in self.views.items():     # (reader, lines) of a screenshot, or (size, lines, shapes) of a Figma frame
                self.obs[bp] = Seen(self, *view[:3], bp) if len(view) == 2 else Seen(self, view[0], view[1], bp, shapes=view[2],
                                                                                       images=view[3] if len(view) > 3 else None)
        # a row that a narrower screen wraps into a grid (four cards, two by two on a phone): a Visualizer row cannot wrap,
        # so the cards go in rows of that size, side by side here and stacked there. Seen before anything is written.
        observe_all()
        self.make_grids()
        self.fill(inner, self.root)
        observe_all()
        for bp, vw in BP.items():
            self.bp = bp
            self.responsive_stack(inner, self.root, vw, bp)
            if bp in self.obs:
                self.follow(bp)
        # spacers go in at the end of their panels, invisible on the design size
        ends = []
        for pid, sid, inset in self.ends:
            ends.append(f"select {pid}")
            ends.append(f"add a flex called {sid} with width 100%, height {inset}dp, top 0dp, left 0dp")
            ends.append("hide it")
        words = []
        for bp in ("tablet", "mobile"):
            for wid, attrs in self.over[bp]:
                parts = ", ".join(f"{k} {v}" for k, v in attrs.items() if v is not None)
                if parts:
                    words.append(f"on {bp}, {wid}: {parts}")
        return list(dict.fromkeys(self.lines)) + self.body + ends + words
