"""A screenshot of the same screen at a narrower size -> what that breakpoint really does.

Why: the rules in responsive.py guess how a desktop design behaves on a tablet or a phone. When the designer has drawn that
size too, there is nothing to guess. The form is still built once, from the widest screenshot (Visualizer has one widget tree
per form; a breakpoint can only change sizes, layouts, visibility and skins). This reads the narrower screenshot, finds each
widget's text in it, and records:

  rows      a row whose parts sit side by side there stays a row; one whose parts sit one under another stacks
  hidden    text the screenshot leaves out, between things it does show, is hidden on that breakpoint
  sizes     a text style drawn bigger or smaller there gets its own size (one ratio per style, so a heading style moves as one)
  full      a button or field that spans its column there spans it on that breakpoint
  not here  what Visualizer cannot do from one tree: text only that screenshot has, and parts shown in another order

The screenshot's own scale is unknown (a phone screenshot is 2-3 px per dp). Most text keeps its size across breakpoints,
so the middle ratio between the two screenshots' text heights gives it.
"""
import difflib
import math
import re

from detect import area

TEXTY = ("text", "button", "input", "dropdown", "link", "field")      # link and field: text the importer gave a purpose
RANGE = {"tablet": (700, 1100), "mobile": (300, 640)}     # the dp widths a screenshot of each breakpoint can show
WORD = re.compile(r"[a-z0-9]+")


def words(text):
    return WORD.findall((text or "").lower())


def same(a, b):
    return a == b or (min(len(a), len(b)) > 3 and difflib.SequenceMatcher(None, a, b).ratio() >= 0.8)


def union(boxes):
    return [min(b[0] for b in boxes), min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes)]


def structure(it):
    """The parts an item is laid out from: a group's kids, a panel's inner structure."""
    if it.get("kind"):
        return it["kids"]
    inner = it.get("inner")
    return [inner] if inner else []


def walk(it):
    yield it
    for k in structure(it):
        yield from walk(k)


def reworded(a, b):
    """Could b be a rewording of a: a shared word stem (4 letters), or a phrase of three words or more on both sides."""
    wa, wb = (re.findall(r"[a-z0-9]{3,}", s.lower()) for s in (a, b))
    stems = {w[:4] for w in wa}
    words = [len(re.findall(r"[a-z0-9]{2,}", s.lower())) for s in (a, b)]
    return any(w[:4] in stems for w in wb) or min(words) >= 3


def row_of(it):
    """The row an item lays out, if it is one: a group, or a panel whose inner structure is a group."""
    if it.get("kind") in ("h", "split"):
        return it
    inner = it.get("inner")
    return inner if inner and inner.get("kind") in ("h", "split") else None


def bulk(values, high=False):
    """Where a part's texts mostly end: the median (a part's own row may have moved away, three texts of eight)."""
    v = sorted(values, reverse=high)
    return v[len(v) // 2] if len(v) >= 3 else v[0]


def mid(values):
    v = sorted(values)
    return v[len(v) // 2]


def trimmed(values, high=False):
    """The extreme of a part's texts, less one stray value when there are several."""
    v = sorted(values, reverse=high)
    return v[1] if len(v) >= 4 else v[0]


def relation(a, b):
    """Where box b is from box a."""
    if b[0] >= a[2] - 4:
        return "right"
    if b[2] <= a[0] + 4:
        return "left"
    return "below" if b[1] >= a[3] - 4 else "above"


def letters(text):
    return "".join(words(text))


KEYS = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"}


def phone_chrome(lines, W, H):
    """A phone screenshot's own parts, which are not the form: the status bar (a time at the very top, and what shares its
    line) and an on-screen keyboard (number keys with ABC/DEF..., or rows of single letters) and everything under it."""
    keep = list(lines)
    clock = [l for l in keep if l["box"][3] < 0.08 * H and re.fullmatch(r"\d{1,2}[:.]\d{2}", l["text"].strip())]
    if clock:
        bottom = max(l["box"][3] for l in clock) + 4
        keep = [l for l in keep if l["box"][1] >= bottom]
    keys = [l for l in keep if l["box"][1] > 0.45 * H and (letters(l["text"]) in KEYS or re.fullmatch(r"\d", letters(l["text"]))
                                                        or (len(l["text"].split()) >= 6 and all(len(t) == 1 for t in l["text"].split())))]
    if len(keys) >= 6:
        top = min(l["box"][1] for l in keys) - 8
        keep = [l for l in keep if l["box"][1] < top]
    return keep


def char_match(line, leaf):
    """How much of a line is in a leaf, letter by letter, so OCR's glued words ("inO:24", "V erifiesautomatically") still
    match. -> (share of the line matched, letters matched, set of leaf letter positions matched)"""
    a, b = letters(line), letters(leaf)
    if not a or not b:
        return 0.0, 0, set()
    if len(a) <= 2 or len(b) <= 2:          # a digit or two: only the same text, and only where it is expected (see below)
        return (1.0, len(a), set(range(len(b)))) if a == b else (0.0, 0, set())
    blocks = [m for m in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks() if m.size >= 2]
    got = {m.b + i for m in blocks for i in range(m.size)}
    n = sum(m.size for m in blocks)
    return n / len(a), n, got


class Seen:
    def __init__(self, planner, reader, lines, bp, shapes=None, images=None):
        """shapes given: a Figma frame, not a screenshot. Its text is exact (a lone digit is a real layer), its boxes are
        dp already, and its lines carry their font size."""
        self.bp, self.p = bp, planner
        self.W, self.H = reader.W, reader.H
        self.exact = shapes is not None
        self.shapes_given = shapes
        self.images_given = images
        lines = phone_chrome(lines, reader.W, reader.H)
        self.items = list(walk(planner.root))
        self.leaves = [n for n in self.items if n.get("type") in TEXTY and letters(n.get("text"))]
        self.got = {id(n): set() for n in self.leaves}      # which of the leaf's letters the screenshot has
        self.boxes = {id(n): [] for n in self.leaves}        # the screenshot's lines that belong to it
        self.pxs = {id(n): [] for n in self.leaves}          # their font sizes, when the source knows them (Figma)
        self.extra = []                                      # lines only this screenshot has: [(text, box)]
        H1 = max(1, planner.px.H)
        short = lambda n: len(letters(n["text"])) <= 2       # noqa: E731
        left = []
        # first the lines with real words: they anchor the page
        for l in sorted(lines, key=lambda l: (l["box"][1], l["box"][0])):
            if len(letters(l["text"])) <= 2:
                left.append(l)
                continue
            best = None
            for n in self.leaves:
                if short(n):
                    continue
                share, hit, got = char_match(l["text"], n["text"])
                cover = hit / len(letters(n["text"]))
                # most of the line is this text; or the line holds all of it and more ("Step 1 of 5 · 5 min left" is two
                # texts of the wider screen set on one line)
                if not ((share >= 0.75 and hit >= 3) or (cover >= 0.9 and hit >= 6)):
                    continue
                # the same text twice ("Apply"): the leaf it covers most, then the one in the same part of the page
                where = abs(n["img"][1] / H1 - l["box"][1] / self.H)
                key = (round(share, 1), round(cover, 2), -bool(self.got[id(n)] & got), -where)
                if best is None or key > best[0]:
                    best = (key, n, got)
            if best:
                _, n, got = best
                self.got[id(n)] |= got
                self.boxes[id(n)].append(l["box"])
                if l.get("px"):
                    self.pxs[id(n)].append(l["px"])
            elif re.search(r"[A-Za-z]{3}", l["text"]):
                self.extra.append((l["text"], l["box"], l.get("px")))
        # a leaf is shown when most of it is, or when a real piece of it is (a title whose subtitle was dropped)
        self.seen = {id(n) for n in self.leaves if not short(n) and (len(self.got[id(n)]) >= 0.5 * len(letters(n["text"])) or len(self.got[id(n)]) >= 6)}
        # then digits and other tiny texts: only between the anchors before and after them, or a "4" on a keypad, a step
        # number and a code digit would all match each other
        order = self.leaves
        for i, n in enumerate(order):
            if not short(n):
                continue
            before = next((m for m in reversed(order[:i]) if id(m) in self.seen), None)
            after = next((m for m in order[i + 1:] if id(m) in self.seen), None)
            # between the anchors around it, with a line or two of slack (a stepper's number sits over its label)
            near = [union(self.boxes[id(m)]) for m in (before, after) if m]
            slack = max([24.0] + [1.5 * (b[3] - b[1]) for b in near])
            lo = min(b[1] for b in near) - slack if before else -1
            hi = max(b[3] for b in near) + slack if after else self.H + 1
            fits = [l for l in left if letters(l["text"]) == letters(n["text"]) and lo <= (l["box"][1] + l["box"][3]) / 2 <= hi]
            if fits:
                l = min(fits, key=lambda l: abs(n["img"][1] / H1 - l["box"][1] / self.H))
                left.remove(l)
                self.seen.add(id(n))
                if l.get("px"):
                    self.pxs[id(n)].append(l["px"])
                self.got[id(n)] = set(range(len(letters(n["text"]))))
                self.boxes[id(n)].append(l["box"])
        self.scale()
        self.find_moved()
        self.match_images()
        self.find_rows()
        self.find_grids()
        self.find_turns()
        self.find_hidden()
        self.find_sizes()
        self.find_full(reader, lines)

    def match_images(self):
        """Figma only: icons and pictures are layers too. Each finds the same-named layer of about its size, nearest in the
        same part of the page; one with none is gone from this frame."""
        self.images_gone = []
        if not self.exact or self.images_given is None:
            return
        H1, W1 = max(1, self.p.px.H), max(1, self.p.px.W)
        order = list(walk(self.p.root))
        gone = {id(k) for g in self.gone for k in walk(g)}        # hidden with their section: they match nothing
        mine = [it for it in order if it.get("type") in ("image", "icon") and id(it) not in gone]
        # every possible pair, best first: same layer name, about the same size, in about the same part of the page
        pairs = []
        for i, it in enumerate(mine):
            w, h = it["img"][2] - it["img"][0], it["img"][3] - it["img"][1]
            for j, g in enumerate(self.images_given):
                gw, gh = g["box"][2] - g["box"][0], g["box"][3] - g["box"][1]
                rw, rh = gw / max(1, w), gh / max(1, h)
                if g["name"] != it.get("name") or not (0.65 <= rw <= 1.5 and 0.65 <= rh <= 1.5):
                    continue
                cost = abs(math.log(rw)) + abs(math.log(rh)) + abs(g["box"][1] / self.H - it["img"][1] / H1) + 0.5 * abs(g["box"][0] / self.W - it["img"][0] / W1)
                pairs.append((cost, i, j))
        used_i, used_j = set(), set()
        for cost, i, j in sorted(pairs):
            if i not in used_i and j not in used_j:
                used_i.add(i)
                used_j.add(j)
        for i, it in enumerate(mine):
            if i in used_i:
                continue
            k = next(x for x, o in enumerate(order) if o is it)
            before = any(id(n) in self.seen for n in order[:k] if id(n) in self.boxes)
            after = any(id(n) in self.seen for n in order[k + 1:] if id(n) in self.boxes)
            if (self.exact or (before and after)) and it.get("id"):
                self.images_gone.append(it)

    def tiny(self, n):
        """A digit or two ("4" in a code box, a step number): OCR does not read lone characters, so its absence says nothing.
        In a Figma frame a digit is a real text layer: it counts like any text."""
        return not self.exact and len(letters(n["text"])) <= 2

    def find_moved(self):
        """A part of the page that is all but gone (a sidebar on a phone), with a scrap of its text shown somewhere else
        ("5 min left" in the phone's header): Visualizer cannot move a widget to another parent, so the part hides whole."""
        self.gone, self.moved = [], []
        order = [n for n in self.leaves if not self.tiny(n)]
        index = {id(n): i for i, n in enumerate(order)}
        for it in self.items:
            if not it.get("id") or it is self.p.root or any(it is g or any(it is k for k in walk(g)) for g in self.gone):
                continue
            mine = [n for n in walk(it) if id(n) in index]
            if len(mine) < 4:
                continue
            shown = [n for n in mine if id(n) in self.seen]
            last = max(index[id(n)] for n in mine)
            nxt = next((n for n in order[last + 1:] if id(n) in self.seen), None)    # none: the bottom of a cut-off screenshot
            # moved: the scrap sits elsewhere from the next shown text than on the wider screen ("5 min left" left of the
            # step caption there, right of it on the phone). A brand name left of "Sign in" on both has not moved.
            moved = nxt and any(relation(n["img"], nxt["img"]) != relation(union(self.boxes[id(n)]), union(self.boxes[id(nxt)])) for n in shown)
            if shown and len(shown) <= 0.2 * len(mine) and moved:
                self.gone.append(it)
                for n in shown:
                    self.seen.discard(id(n))
                    self.moved.append(n["text"])

    # ----- measuring -----
    def box(self, it):
        """Where an item is in the screenshot: around the text it holds that the screenshot shows."""
        found = [b for n in walk(it) if id(n) in self.seen for b in self.boxes[id(n)]]
        return union(found) if found else None

    def drawn_height(self, it):
        """From Figma: how tall the designer drew this panel here, the smallest shape around all of its text."""
        b = self.box(it) if self.exact else None
        if not b:
            return None
        around = [s for s in self.shapes_given or [] if s[0] <= b[0] + 2 and s[1] <= b[1] + 2 and s[2] >= b[2] - 2 and s[3] >= b[3] - 2]
        if not around:
            return None
        s = min(around, key=lambda s: (s[2] - s[0]) * (s[3] - s[1]))
        return s[3] - s[1]

    def scale(self):
        """dp per screenshot pixel: most text keeps its size from one breakpoint to the next."""
        if self.exact:
            self.vw, self.s = self.W, 1.0
            return
        s1 = self.p.s
        ratios = []
        for n in self.leaves:
            if id(n) in self.seen and n.get("type") == "text" and n.get("ink_h") and self.boxes[id(n)]:
                hs = sorted(b[3] - b[1] for b in self.boxes[id(n)])
                ratios.append(n["ink_h"] * s1 / max(1, hs[len(hs) // 2]))
        ratios.sort()
        s = ratios[len(ratios) // 2] if ratios else RANGE[self.bp][1] / self.W
        lo, hi = RANGE[self.bp]
        self.vw = max(lo, min(hi, self.W * s))
        self.s = self.vw / self.W

    def find_rows(self):
        """Each row: do its parts sit side by side in the screenshot, or one under another?"""
        self.rows, self.order = {}, []
        for it in self.items:
            row = row_of(it)
            if not row or id(row) in self.rows:
                continue
            parts = [(k, self.texts_at(k)) for k in row["kids"]]
            parts = [(k, bs) for k, bs in parts if bs]
            if len(parts) < 2:
                continue
            side = below = above = 0
            for (a, ba), (b, bb) in zip(parts, parts[1:]):
                # where the next part's texts are from this part's: the extents of each part's texts, less a stray one
                # (a text that moved, "Save & exit" into a tablet's header, must not make a stack look like a row; a
                # stepper across the top must not make the content under it look beside it)
                # each text of the next part votes against this part's extent (less a stray text): under it, beside it,
                # or over it; the part goes the way most of its texts do
                # (the bulk of this part's texts, not its extreme: a part's own row may have moved below the next part,
                # as a hero's feature list does under the tablet's card picture)
                ax2, ay2 = bulk([x[2] for x in ba], high=True), bulk([x[3] for x in ba], high=True)
                ay1 = bulk([x[1] for x in ba])
                votes = {"side": 0, "below": 0, "above": 0}
                for y in bb:
                    # clear of this part both ways (a card's right column under a tablet's top band): the clearer way wins
                    right, under = y[0] - ax2, y[1] - ay2
                    if right >= -4 and under >= -4:
                        votes["side" if right > under else "below"] += 1
                    elif right >= -4:
                        votes["side"] += 1
                    elif under >= -4:
                        votes["below"] += 1
                    elif y[3] <= ay1 + 4:
                        votes["above"] += 1
                if any(votes.values()):
                    win = max(votes, key=votes.get)
                else:      # interleaved every way: the middles decide
                    acx, acy = mid([(x[0] + x[2]) / 2 for x in ba]), mid([(x[1] + x[3]) / 2 for x in ba])
                    bcx, bcy = mid([(y[0] + y[2]) / 2 for y in bb]), mid([(y[1] + y[3]) / 2 for y in bb])
                    win = "side" if abs(bcx - acx) > abs(bcy - acy) else "below" if bcy > acy else "above"
                side += win == "side"
                below += win == "below"
                above += win == "above"
            if above > below and above > side:
                # drawn above what comes before it: one tree cannot do that. Whole columns (a card picture over the copy on a
                # phone) still stack, in the wider screen's order; small pieces (a header's "Save & exit") are left to the
                # rules, which keep them in a row when it fits
                self.order.append(self.first_text(parts[-1][0])[:30])
                rw = max(1.0, row["img"][2] - row["img"][0])
                if all((k["img"][2] - k["img"][0]) >= 0.3 * rw for k, _b in parts):
                    self.rows[id(row)] = "stack"
                continue
            if side and below and len(parts) >= 3:
                continue        # it wraps (a 2x2 grid of four cards): a Visualizer row cannot wrap, so the rules decide by fit
            self.rows[id(row)] = "row" if side >= below + above else "stack"

    def find_grids(self):
        """Rows this screen wraps into a grid: (row, items per line) when its items run left to right, then wrap back to
        the left below, every line holding the same number (four cards two by two)."""
        self.grids = []
        for it in self.items:
            row = it if it.get("kind") == "h" else it.get("inner") if (it.get("inner") or {}).get("kind") == "h" else None
            if not row or len(row["kids"]) < 4 or any(r is row for r, _k in self.grids):
                continue
            boxes = [self.box(k) for k in row["kids"]]
            if any(b is None for b in boxes):
                continue
            lines = [[boxes[0]]]
            for prev, b in zip(boxes, boxes[1:]):
                if b[0] >= prev[2] - 4 and min(b[3], prev[3]) > max(b[1], prev[1]):
                    lines[-1].append(b)                      # beside the one before
                elif b[1] >= prev[3] - 4 and b[0] < prev[0]:
                    lines.append([b])                        # wrapped to the next line
                else:
                    lines = None
                    break
            if lines and len(lines) > 1 and len(lines[0]) >= 2 and all(len(l) == len(lines[0]) for l in lines):
                self.grids.append((row, len(lines[0])))

    def find_turns(self):
        """A list that runs down on the wider screen and across on this one (a sidebar's steps become a tablet's stepper):
        every shown item to the right of the one before. Its flex turns horizontal on this breakpoint."""
        self.turns = set()
        for it in self.items:
            inner = it if it.get("kind") == "v" else it.get("inner") if (it.get("inner") or {}).get("kind") == "v" else None
            if not inner or it.get("type") == "root" or id(inner) in self.turns:
                continue
            parts = [bs for bs in (self.texts_at(k) for k in inner["kids"]) if bs]
            if len(parts) < 3:
                continue
            across = sum(min(b[0] for b in q) >= max(a[2] for a in p) - 4 for p, q in zip(parts, parts[1:]))
            if across == len(parts) - 1:
                self.turns.add(id(inner))

    def turned(self, stack):
        return id(stack) in self.turns

    def texts_at(self, it):
        return [b for n in walk(it) if id(n) in self.seen for b in self.boxes[id(n)]]

    def first_text(self, it):
        return next((n["text"] for n in walk(it) if n.get("text")), it.get("name") or it.get("id", ""))

    def find_hidden(self):
        """Text the screenshot leaves out. Only between things it shows: a phone screenshot often stops at the fold."""
        order = [n for n in self.leaves if not self.tiny(n)]
        shown = [i for i, n in enumerate(order) if id(n) in self.seen]
        missing, self.reworded, self.reworded_px = set(), [], {}
        gone = {id(n) for g in self.gone for n in walk(g)}
        free = list(self.extra)
        # a text whose siblings all left this screen left with them (a nav bar's "Personal" beside a gone "Business",
        # "Wealth", "Help"): it is not reworded into whatever new text sits near it
        family = {}
        for it in self.items:
            kin = [k for k in structure(it) if k.get("type") in TEXTY and letters(k.get("text"))]
            for k in kin:
                family[id(k)] = [m for m in kin if m is not k]
        if shown:
            for i, n in enumerate(order):
                # a screenshot may stop at the fold, so only what is missing between shown things counts; a Figma frame is
                # the whole design, so anything it does not have is not on that breakpoint
                if not (self.exact or shown[0] < i < shown[-1]) or id(n) in self.seen or id(n) in gone:
                    continue
                # reworded: other words stand between the texts before and after it ("Verifies automatically" became
                # "Auto-reading SMS"). It stays, with the wider screen's words.
                before = next((m for m in reversed(order[:i]) if id(m) in self.seen), None)
                after = next((m for m in order[i + 1:] if id(m) in self.seen), None)
                lo = union(self.boxes[id(before)])[1] - 4 if before else -1
                hi = union(self.boxes[id(after)])[3] + 4 if after else -2      # nothing after: nothing stands in for it
                # in about the same size too, when the source knows sizes (Figma): a phone's 16 px title is not a
                # rewording of a 22 px logo
                px = (n.get("look") or {}).get("px")
                stand_in = next((e for e in free if lo <= (e[1][1] + e[1][3]) / 2 <= hi
                                 and not (px and e[2] and not 0.75 <= e[2] / px <= 1.33)), None)
                kin = family.get(id(n)) or []
                if stand_in and self.exact and len(kin) >= 2 and not any(id(m) in self.seen for m in kin):
                    stand_in = None
                # and from Figma, whose words are exact, a rewording keeps some of them or is a sentence on both sides
                # ("EN / AR" did not become the phone's "Open an account")
                if stand_in and self.exact and not reworded(n["text"], stand_in[0]):
                    stand_in = None
                if stand_in:
                    free.remove(stand_in)
                    self.reworded.append((n["text"], stand_in[0]))
                    if stand_in[2] and px and round(stand_in[2]) != round(px):
                        self.reworded_px[id(n)] = round(stand_in[2])     # drawn at the stand-in's size
                else:
                    missing.add(id(n))
        self.missing_leaves = missing
        self.only_here = [e[0] for e in free]
        # hide the biggest thing all of whose text is missing, and the parts that are all but gone (and, from Figma, images)
        self.hidden = list(self.gone) + [g for g in self.images_gone if not any(g is k for h in self.gone for k in walk(h))]

        def visit(it):
            texts = [n for n in walk(it) if n.get("type") in TEXTY and letters(n.get("text")) and not self.tiny(n)]
            if any(it is g for g in self.gone):
                return
            if texts and all(id(n) in missing for n in texts) and it.get("id"):
                self.hidden.append(it)
                return
            for k in structure(it):
                visit(k)
        visit(self.p.root)

    def find_sizes(self):
        """One ratio per text style: how much bigger or smaller that style is drawn here."""
        self.sizes = {}
        styles = {}
        for n in self.leaves:
            if n.get("type") == "text" and id(n) in self.seen and n.get("look") and self.pxs[id(n)]:
                ps = sorted(self.pxs[id(n)])        # the font size itself (Figma)
                styles.setdefault(id(n["look"]), (n["look"], []))[1].append((n, ps[len(ps) // 2] / n["look"]["px"]))
            elif n.get("type") == "text" and id(n) in self.seen and n.get("look") and n.get("ink_h"):
                hs = sorted(b[3] - b[1] for b in self.boxes[id(n)])
                r = hs[len(hs) // 2] * self.s / (n["ink_h"] * self.p.s)
                styles.setdefault(id(n["look"]), (n["look"], []))[1].append((n, r))
        for look, members in styles.values():
            rs = sorted(r for _, r in members)
            r = rs[len(rs) // 2]
            px = look["px"] * r
            if (self.exact and round(px) != round(look["px"])) or (abs(r - 1) >= 0.1 and abs(px - look["px"]) >= 2):
                for n, _ in members:
                    self.sizes[id(n)] = round(px)
        self.sizes.update(self.reworded_px)

    def find_full(self, reader, lines):
        """Buttons and fields that span their column in the screenshot."""
        from agent import outlines
        self.full = set()
        shapes = self.shapes_given if self.exact else [b["box"] for b in outlines(reader, lines)]
        seen_boxes = [b for n in self.leaves if id(n) in self.seen for b in self.boxes[id(n)]]
        if not seen_boxes:
            return
        left = min(b[0] for b in seen_boxes + shapes)
        right = max(b[2] for b in seen_boxes + shapes)
        # buttons and fields; and, from Figma, a short styled panel holding text (a button with an icon is a flex there)
        small_panels = [it for it in self.items if self.exact and it.get("type") == "panel" and it.get("style")
                        and it["img"][3] - it["img"][1] <= 80 and self.box(it)]
        for n in [n for n in self.leaves if n.get("type") in ("button", "input", "dropdown") and id(n) in self.seen] + small_panels:
            t = union(self.boxes[id(n)]) if id(n) in self.boxes else self.box(n)
            around = [s for s in shapes if s[0] <= t[0] + 2 and s[1] <= t[1] + 2 and s[2] >= t[2] - 2 and s[3] >= t[3] - 2 and s[3] - s[1] <= 4 * (t[3] - t[1])]
            if not around:
                continue
            shape = min(around, key=area)
            # the column it sits in: the smallest shape around it that is not itself (a card), or the page's content
            # (outlines come in pairs a pixel apart: the shape's own second outline is not its column)
            holders = [s for s in shapes if s[0] <= shape[0] and s[2] >= shape[2] and s[1] <= shape[1] and s[3] >= shape[3]
                       and (s[2] - s[0]) - (shape[2] - shape[0]) + (s[3] - s[1]) - (shape[3] - shape[1]) > 12]
            x1, x2 = (min(holders, key=area)[0], min(holders, key=area)[2]) if holders else (left, right)
            before, after = shape[0] - x1, x2 - shape[2]
            # across its column means the same space on both sides: a button pinned to one side is not full width
            if abs(before - after) <= max(12, 0.1 * (x2 - x1)) and shape[2] - shape[0] >= 0.75 * (x2 - x1):
                self.full.add(id(n))

    # ----- what the planner asks -----
    def row(self, row):
        return self.rows.get(id(row))

    def hides(self, it):
        """Hidden on this breakpoint: itself, or inside something hidden."""
        return any(it is h or any(it is k for k in walk(h)) for h in self.hidden)

    def shows(self, it):
        return any(id(n) in self.seen for n in walk(it))

    def summary(self):
        names = lambda items: [self.first_text(i)[:40] for i in items]  # noqa: E731
        return {"width": round(self.vw), "matched": len(self.seen), "of": len(self.leaves),
                "stack": sum(v == "stack" for v in self.rows.values()), "row": sum(v == "row" for v in self.rows.values()),
                "hidden": names(self.hidden), "sizes": len(self.sizes), "full": len(self.full),
                "only_here": self.only_here[:8], "order": self.order[:5], "moved": self.moved[:5],
                "reworded": [f"{a[:30]} → {b[:30]}" for a, b in self.reworded[:5]]}
