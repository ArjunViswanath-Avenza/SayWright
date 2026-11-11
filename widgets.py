"""What a widget is for, and changing it into another kind of widget, or moving it around.

A screenshot or a Figma frame says what things look like, not what they do: a grey box with "Full name" in it can be a text
box, a dropdown or just a card. So the tool guesses, and the person decides. For any widget this lists every kind it could
be, the likely ones first with the reason, and turns it into the chosen one in one undoable edit:

  kinds     label, link, button, text box, password box, dropdown, date picker (real Visualizer widgets, generated from
            templates learned from real forms), and checkbox, radio and switch built from flexes and a label (Visualizer
            has widgets for these, but no real form here uses them, so there is no verified JSON to copy; a broken widget
            JSON can stop a project opening).
  keeps     place in the tree, size and position, every breakpoint's size, position and visibility, the text (as text or
            placeholder), and the look: a matching skin of the new type is made from the old one.
  arrange   move up or down, out of its container, into a row or column with the next widget, unwrap a container, align.
"""
import re

TEXTY = ("label", "button", "textbox", "textarea", "listbox", "calendar")
GEOMETRY = ("w", "h", "top", "left", "right", "bottom", "cx", "cy", "minw", "minh", "maxw", "maxh", "visible", "z")
BPS = ("b1", "b2", "b3")
DATE = re.compile(r"\b(\d{1,2}[ /.-](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[ /.-]\d{2,4}|\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4}|"
                  r"(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* \d{1,2},? \d{4}|dd ?/ ?mm|mm ?/ ?yy)\b", re.I)
DATE_WORDS = re.compile(r"\b(date|dob|expiry|expires|expiration|birthday|valid until|valid from|issued on)\b", re.I)
PICK_WORDS = re.compile(r"^(select|choose|pick)\b|\b(country|nationality|emirate|city|state|gender|currency|title|type|income|"
                        r"source of funds|occupation|industry|region|month|year)\b", re.I)
TYPE_WORDS = re.compile(r"^(enter|type|search|your|e\.g\.|eg\b)|@|\.\.\.|…|\b(name|email|address|phone|mobile|number|amount|"
                        r"employer|building|apartment|street|area|po box|zip|postal|company|id)\b", re.I)
SECRET_WORDS = re.compile(r"\b(password|passcode|pin|secret|cvv)\b", re.I)
LINK_WORDS = re.compile(r"\b(change|edit|view|explore|learn more|see all|forgot|back to|save & exit|use my|why we|compare|"
                        r"resend|terms|privacy|help)\b", re.I)

KINDS = {
    "label": ("label", "Label", "Text to read."),
    "link": ("button", "Link", "Clickable text with no background; gets an onClick."),
    "button": ("button", "Button", "A tap target with a background; gets an onClick."),
    "textbox": ("textbox", "Text box", "The person types here; the text becomes the placeholder."),
    "password": ("textbox", "Password box", "A text box whose input is masked."),
    "dropdown": ("listbox", "Dropdown", "Pick one value from a list; the text becomes the first item."),
    "date": ("calendar", "Date picker", "Pick a date from a calendar."),
    "checkbox": ("flex", "Checkbox", "A box to tick, with this text beside it (flex + label)."),
    "radio": ("flex", "Radio option", "A round option to pick, with this text beside it (flex + label)."),
    "switch": ("flex", "Switch", "An on/off switch with this text before it (flex + label)."),
}
WIDGET_KIND = {"label": "label", "textbox": "textbox", "listbox": "dropdown", "calendar": "date", "textarea": "textbox"}
PREFIX = {"label": "lbl", "button": "btn", "textbox": "tbx", "listbox": "lst", "calendar": "cal", "flex": "flx"}


# ---------- looks ----------
def field_kind(caption, text, chevron=False):
    """What a field's value is for: textbox, password, dropdown or date."""
    if SECRET_WORDS.search(f"{caption} {text}"):
        return "password"
    if DATE.search(text) or DATE_WORDS.search(caption):
        return "date"
    if PICK_WORDS.search(caption or text):
        return "dropdown"
    # typed data wins over an icon at the end of the box (a tick on a valid email is not a dropdown's chevron)
    if "@" in text or re.search(r"\b(email|name|number|phone|mobile|address|building|street|area|po box|zip|postal|id|iban|account)\b", caption, re.I):
        return "textbox"
    return "dropdown" if chevron else "textbox"


def look_of(maker, name):
    """A skin's look, as the skin maker's spec: bg/bg2/angle, border/border_width, radius, shadow…, color/px/bold."""
    if not name:
        return {}
    skin = None
    for folder in (maker.library, maker._theme(maker.canvas), maker._theme(maker.project)):
        p = folder / f"{name}.json"
        if p.exists():
            skin = maker.read_json(p)
            break
    if not skin:
        return {}
    look = {}
    bg = skin.get("background_color")
    if isinstance(bg, dict) and bg.get("colors"):
        look.update(bg=bg["colors"][0], bg2=bg["colors"][-1], angle=bg.get("angle", 180))
    elif isinstance(bg, str) and not bg.endswith("00"):
        look["bg"] = bg
    if skin.get("border_width") and isinstance(skin.get("border_color"), str) and not skin["border_color"].endswith("00"):
        look.update(border=skin["border_color"], border_width=int(skin["border_width"]))
    if skin.get("border_radius"):
        look["radius"] = int(skin["border_radius"])
    shadow = (skin.get("desktopweb") or {}).get("shadow")
    if isinstance(shadow, dict) and shadow.get("color"):
        look.update(shadow=shadow["color"], blur=shadow.get("br", 0), spread=shadow.get("nm", 0), sx=shadow.get("x", 0), sy=shadow.get("y", 0))
    if isinstance(skin.get("font_color"), str):
        look["color"] = skin["font_color"]
    size = (skin.get("desktopweb") or {}).get("font_size") or skin.get("font_size")
    if isinstance(size, (int, float)) and size:
        look["px"] = round(size * 16 / 100) if not skin.get("fontSizeInPx") else round(size)
    look["bold"] = str(skin.get("font_weight")) in ("bold", "600", "700", "800", "900")
    return look


def saturated(colour):
    c = (colour or "")[:6]
    if not re.fullmatch(r"[0-9a-fA-F]{6}", c):
        return False
    r, g, b = (int(c[i:i + 2], 16) for i in (0, 2, 4))
    return max(r, g, b) - min(r, g, b) > 80


# ---------- what a widget holds ----------
def texts_in(node):
    out = []
    for c in node.children:
        if c.type in TEXTY:
            t = c.attrs.get("text") or c.attrs.get("placeholder")
            if isinstance(t, str) and t.strip():
                out.append((c, t.strip()))
        elif c.type in ("flex", "scrollflex"):
            out += texts_in(c)
    return out


def content(node, maker):
    """-> {text, caption, look, box_look, holder} of a widget: its text, and its look split into text look and box look.
    A flex with one text (a chip, a field) speaks for that text; a flex with a small caption over a value is a field."""
    if node.type in TEXTY:
        t = node.attrs.get("text") or node.attrs.get("placeholder")
        if not t and node.type == "listbox" and node.attrs.get("items"):
            t = node.attrs["items"][0][1]
        look = look_of(maker, node.attrs.get("skin"))
        return {"text": (t or "").strip(), "caption": "", "look": look, "box_look": look if node.type != "label" else {}, "holder": None}
    if node.type in ("flex", "scrollflex"):
        ts = texts_in(node)
        box = look_of(maker, node.attrs.get("skin"))
        if len(ts) == 1:
            n, t = ts[0]
            return {"text": t, "caption": "", "look": look_of(maker, n.attrs.get("skin")), "box_look": box, "holder": n}
        if len(ts) >= 2:
            # a field: the value is its biggest text (the longest of equals); the caption is the first text before it,
            # no bigger (badges such as "From ID" are smaller and come after the caption)
            looks = {n.id: look_of(maker, n.attrs.get("skin")) for n, _t in ts}
            px = lambda n: looks[n.id].get("px") or 14  # noqa: E731
            v, vt = max(ts, key=lambda p: (px(p[0]), len(p[1])))
            before = [(n, t) for n, t in ts[:ts.index((v, vt))] if px(n) <= px(v) and len(t) <= 40]
            if before:
                c, ct = before[0]
                return {"text": vt, "caption": ct, "look": looks[v.id], "box_look": box, "holder": v, "caption_node": c}
        return {"text": "", "caption": "", "look": {}, "box_look": box, "holder": None}
    return {"text": "", "caption": "", "look": {}, "box_look": {}, "holder": None}


def current_kind(node, maker):
    if node.type == "textbox" and node.attrs.get("secure"):
        return "password"
    if node.type == "button":
        bg = look_of(maker, node.attrs.get("skin")).get("bg")
        return "link" if not bg else "button"
    if node.type == "flex":
        if node.id.startswith("flxChk"):
            return "checkbox"
        if node.id.startswith("flxRadio"):
            return "radio"
        if node.id.startswith("flxSwitch"):
            return "switch"
        return None
    return WIDGET_KIND.get(node.type, node.type)


# ---------- the options, likely first ----------
def enclosing_field(node, idx, maker, depth=3):
    """-> (role, field content) when the widget is a field's value or caption: the box it sits in, up to three levels up."""
    cur = node
    for _ in range(depth):
        parent = idx.get(cur.id, (None, None))[1]
        if parent is None:
            return None, None
        if parent.type in ("flex", "scrollflex"):
            c = content(parent, maker)
            if c.get("caption") and (c["box_look"].get("bg") or c["box_look"].get("border")):
                if c["holder"] is node:
                    return "value", c
                if c.get("caption_node") is node:
                    return "caption", c
        cur = parent
    return None, None


def options(node, parent, maker, idx=None):
    """[{to, title, desc, why, score, current}] for a widget. Containers with no text offer only arranging."""
    c = content(node, maker)
    role, field = enclosing_field(node, idx, maker) if idx else (None, None)
    if role == "value":
        c = {**c, "caption": field["caption"], "box_look": field["box_look"]}
    text, caption = c["text"], c["caption"]
    now = current_kind(node, maker)
    if not text and node.type not in TEXTY:
        return []
    words = f"{caption} {text}"
    boxy = bool(c["box_look"].get("border") or c["box_look"].get("bg"))
    score = {k: 1.0 for k in KINDS}
    why = {k: "" for k in KINDS}

    def bump(k, v, reason):
        score[k] += v
        why[k] = why[k] or reason

    if role != "caption" and (DATE.search(text) or DATE_WORDS.search(caption)):
        bump("date", 4, "the text is a date" if DATE.search(text) else f"“{caption}” asks for a date")
    if SECRET_WORDS.search(words):
        bump("password", 4, "it asks for a secret")
    if role != "caption" and PICK_WORDS.search(caption or text):
        bump("dropdown", 4, "a choice from a fixed list")
    if role == "caption":
        bump("label", 3, "the caption of a field: the value under it is the input")
    elif caption or TYPE_WORDS.search(text):
        bump("textbox", 3, f"the value of the “{caption}” field" if caption else "the text reads like a hint for typing")
    if boxy and node.type in ("flex", "scrollflex", "label") and not caption:
        lk = c["box_look"]
        if lk.get("border") and not lk.get("bg2"):
            bump("textbox", 2, "a bordered box around one text")
        if lk.get("bg") and not lk.get("border"):
            bump("button", 2, "a filled box around one text")
    if node.type == "label":
        lk = c["look"]
        if saturated(lk.get("color")) and len(text.split()) <= 5 and not text.isupper():
            bump("link", 3, "short coloured text, like a link")
        if LINK_WORDS.search(text) and len(text.split()) <= 5:
            bump("link", 2, f"“{text}” reads like an action")
        if len(text.split()) > 6:
            bump("label", 3, "a sentence to read")
    if re.match(r"^(i agree|i accept|remember me|keep me|send me|email me|i have read|i confirm)", text, re.I):
        bump("checkbox", 4, "a statement to tick")
    if len(text) <= 24 and not caption and node.type in ("button",):
        bump("button", 2, "already a tap target")
    out = []
    for k, (wtype, title, desc) in KINDS.items():
        if k == now:
            continue
        out.append({"to": k, "title": title, "desc": desc, "why": why[k], "score": round(score[k], 1)})
    out.sort(key=lambda o: -o["score"])
    best = out[0]["score"] if out else 0
    for o in out:
        o["suggested"] = o["score"] >= max(3, best - 1) and o["score"] > 1
    return [{"to": now, "title": KINDS[now][1] if now in KINDS else node.type.title(), "desc": "What it is now.", "why": "",
             "score": 0, "current": True}] + out if now else out


# ---------- turning it into another kind ----------
def unique(idx, base):
    wid, n = base, 2
    while wid in idx:
        wid, n = f"{base}{n}", n + 1
    return wid


def id_words(text):
    words = re.findall(r"[A-Za-z0-9]+", text)
    if words and words[0].lower() in ("enter", "select", "choose", "pick", "type", "search"):
        words = words[1:]
    return "".join(w.capitalize() for w in words[:3]) or "Item"


def carried(node):
    """Size, position and visibility, base and per breakpoint."""
    out = {}
    for k, v in node.attrs.items():
        base = k.split(".", 1)[-1]
        if base in GEOMETRY and (("." not in k) or k.split(".", 1)[0] in BPS):
            out[k] = v
    return out


def convert(node, parent, idx, to, maker, after, in_field=False):
    """-> (ops, new id, note). One batch: the new widget(s) go in where the old one is, then the old one goes."""
    if to not in KINDS:
        raise ValueError(f"I cannot turn a widget into '{to}'.")
    if not in_field and node.type in TEXTY:
        in_field = enclosing_field(node, idx, maker)[0] == "value"     # the box around it draws the border
    c = content(node, maker)
    text = c["text"] or node.id
    lk, box = c["look"], c["box_look"] or {}
    font = {k: lk[k] for k in ("color", "px", "bold") if k in lk}
    geo = carried(node)
    note = ""
    # a field (a caption over a value inside a box): the value becomes the input, the box and caption stay
    if node.type in ("flex", "scrollflex") and c.get("caption") and to in ("textbox", "password", "dropdown", "date") and c["holder"] is not None:
        target = c["holder"]
        holder_parent = idx[target.id][1]        # the value can sit a level or two down in the field's box
        ops, wid, _n = convert(target, holder_parent, idx, to, maker, _after(holder_parent, target), in_field=True)
        return ops, wid, "The box and its caption stay; the value became the " + KINDS[to][1].lower() + "."
    if to in ("checkbox", "radio", "switch"):
        return composite(node, idx, to, text, font, geo, maker, after)
    wtype = KINDS[to][0]
    attrs = dict(geo)
    if to == "label":
        skin = maker.create({"wType": "Label", **font})[0] if font else None
        attrs.update(text=text, skin=skin)
        for k in ("h",):
            if node.type in ("textbox", "listbox", "calendar", "button") and attrs.get(k):
                attrs[k] = "preferred"
    elif to == "link":
        skin = maker.create({"wType": "Button", "bg": "ffffff00", "color": lk.get("color") or "5b4bff", "px": lk.get("px") or 15, "bold": True})[0]
        attrs.update(text=text, skin=skin)
        attrs.setdefault("w", "preferred")
        attrs.setdefault("h", "preferred")
    elif to == "button":
        bg = box.get("bg") or (lk.get("color") if saturated(lk.get("color")) else "0b0c24")
        spec = {"wType": "Button", "bg": bg, "color": "ffffff" if not box.get("bg") else (lk.get("color") or "ffffff"), "px": lk.get("px") or 15,
                "bold": True, "radius": box.get("radius") or 10}
        for k in ("bg2", "angle", "border", "border_width", "shadow", "blur", "spread", "sx", "sy"):
            if k in box:
                spec[k] = box[k]
        attrs.update(text=text, skin=maker.create(spec)[0])
        if attrs.get("h") in (None, "preferred"):
            attrs["h"] = "44dp"
    else:     # text box, password, dropdown, date: an input with the box's look and the text's font
        spec = {"wType": {"textbox": "TextField", "password": "TextField", "dropdown": "ListBox", "date": "Calendar"}[to],
                "bg": "ffffff00" if in_field else box.get("bg") or "ffffff",
                "color": lk.get("color") or "111827", "px": lk.get("px") or 15}
        if not in_field:      # inside a field's box the box draws the border; alone, the input draws its own
            spec.update(border=box.get("border") or "d3d6e6", border_width=box.get("border_width") or 1, radius=box.get("radius") or 10)
        attrs["skin"] = maker.create(spec)[0]
        if to == "dropdown":
            attrs.update(placeholder=text, items=[["lb1", text]])
        elif to == "date":
            attrs.update(placeholder=text)
        else:
            attrs.update(placeholder=text)
            if in_field and to == "textbox":
                # a value drawn in a field is sample data: it shows as typed text, the field's caption is the hint
                cap = enclosing_field(node, idx, maker)[1]
                attrs.update(text=text, placeholder=(cap or {}).get("caption") or text)
            if to == "password":
                attrs["secure"] = True
        if node.type == "label":
            attrs["w"] = "100%" if (parent is None or parent.attrs.get("layout") != "horizontal") else "240dp"
            attrs["h"] = "28dp" if in_field else "44dp"
        elif attrs.get("h") in (None, "preferred"):
            attrs["h"] = "44dp"
    if node.type in ("flex", "scrollflex") and any(ch.type == "image" for ch in node.children):
        note = " Its icon was left out: a " + KINDS[to][1].lower() + " holds text only."
    # the old widget goes first, so the new one can keep a matching id (tbxPin -> a password box tbxPin)
    wid = unique({k: v for k, v in idx.items() if k != node.id}, PREFIX[wtype] + id_words(text))
    attrs = {k: v for k, v in attrs.items() if v is not None}
    ops = [{"op": "remove", "id": node.id},
           {"op": "add", "type": wtype, "id": wid, "parent": parent.id, "after": after, "attrs": attrs}]
    return ops, wid, note.strip()


def _after(parent, child):
    i = parent.children.index(child)
    return parent.children[i - 1].id if i > 0 else None


def composite(node, idx, to, text, font, geo, maker, after):
    """Checkbox, radio and switch from verified widgets: a flex row with a small box (or a track and knob) and a label."""
    name = id_words(text)
    taken = {k for k in idx if k != node.id}
    row = unique(taken, {"checkbox": "flxChk", "radio": "flxRadio", "switch": "flxSwitch"}[to] + name)
    taken.add(row)
    lbl = unique(taken, "lbl" + name)
    taken.add(lbl)
    label_skin = maker.create({"wType": "Label", **({"color": "111827", "px": 15} | font)})[0]
    attrs = {**geo, "layout": "horizontal"}
    attrs.setdefault("w", "preferred")
    attrs["h"] = "preferred"
    parent_id = idx[node.id][1].id
    ops = [{"op": "remove", "id": node.id},
           {"op": "add", "type": "flex", "id": row, "parent": parent_id, "after": after, "attrs": attrs}]
    if to in ("checkbox", "radio"):
        box = unique(taken, ("flxBox" if to == "checkbox" else "flxDot") + name)
        skin = maker.create({"wType": "FlexContainer", "bg": "ffffff", "border": "8a94a6", "border_width": 1, "radius": 4 if to == "checkbox" else 10})[0]
        ops += [{"op": "add", "type": "flex", "id": box, "parent": row, "attrs": {"layout": "free", "w": "20dp", "h": "20dp", "top": "1dp", "left": "0dp", "skin": skin}},
                {"op": "add", "type": "label", "id": lbl, "parent": row, "attrs": {"text": text, "w": "preferred", "h": "preferred", "top": "1dp", "left": "10dp", "skin": label_skin}}]
    else:
        track, knob = unique(taken, "flxTrack" + name), unique(taken | {"flxTrack" + name}, "flxKnob" + name)
        on = maker.create({"wType": "FlexContainer", "bg": "5b4bff", "radius": 12})[0]
        dot = maker.create({"wType": "FlexContainer", "bg": "ffffff", "radius": 10})[0]
        ops += [{"op": "add", "type": "label", "id": lbl, "parent": row, "attrs": {"text": text, "w": "preferred", "h": "preferred", "top": "3dp", "left": "0dp", "skin": label_skin}},
                {"op": "add", "type": "flex", "id": track, "parent": row, "attrs": {"layout": "free", "w": "44dp", "h": "24dp", "top": "0dp", "left": "12dp", "skin": on}},
                {"op": "add", "type": "flex", "id": knob, "parent": track, "attrs": {"layout": "free", "w": "20dp", "h": "20dp", "top": "2dp", "left": "22dp", "skin": dot}}]
    return ops, row, "Built from a flex and a label (no real form here uses Visualizer's own " + KINDS[to][1].lower() + " widget, so there is no verified one to copy)."


# ---------- arranging ----------
ARRANGE = {
    "up": "Move up", "down": "Move down", "out": "Move out of its container",
    "row": "Put in a row with the next one", "column": "Put in a column with the next one", "unwrap": "Unwrap this container",
    "left": "Align left", "center": "Centre", "right": "Align right", "fill": "Full width",
}


def arrange(node, parent, grand, idx, action):
    """-> (ops, selected id, say)."""
    if parent is None:
        raise ValueError("The form itself cannot be moved.")
    sibs = parent.children
    i = sibs.index(node)
    if action == "up":
        if i == 0:
            raise ValueError(f"{node.id} is already first in {parent.id}.")
        return [{"op": "move", "id": node.id, "parent": parent.id, "after": sibs[i - 2].id if i >= 2 else None}], node.id, f"Moved {node.id} up."
    if action == "down":
        if i == len(sibs) - 1:
            raise ValueError(f"{node.id} is already last in {parent.id}.")
        return [{"op": "move", "id": node.id, "parent": parent.id, "after": sibs[i + 1].id}], node.id, f"Moved {node.id} down."
    if action == "out":
        if grand is None:
            raise ValueError(f"{node.id} is already in the outermost container.")
        return [{"op": "move", "id": node.id, "parent": grand.id, "after": parent.id}], node.id, f"Moved {node.id} out of {parent.id}."
    if action in ("row", "column"):
        if i == len(sibs) - 1:
            raise ValueError(f"There is no widget after {node.id} in {parent.id} to put it with.")
        nxt = sibs[i + 1]
        wrap = unique(idx, "flxRow" if action == "row" else "flxColumn")
        geo = {k: v for k, v in carried(node).items() if "." not in k and k in ("top", "left")}
        ops = [{"op": "add", "type": "flex", "id": wrap, "parent": parent.id, "after": sibs[i - 1].id if i else None,
                "attrs": {"layout": "horizontal" if action == "row" else "vertical", "w": "100%", "h": "preferred", **geo}},
               {"op": "move", "id": node.id, "parent": wrap, "after": None},
               {"op": "move", "id": nxt.id, "parent": wrap, "after": node.id},
               {"op": "set", "id": node.id, "attrs": {"top": "0dp", "left": "0dp"}},
               {"op": "set", "id": nxt.id, "attrs": {"top": "0dp" if action == "row" else "12dp", "left": "16dp" if action == "row" else "0dp"}}]
        return ops, wrap, f"Put {node.id} and {nxt.id} in a new {'row' if action == 'row' else 'column'}, {wrap}."
    if action == "unwrap":
        if node.type not in ("flex", "scrollflex") or not node.children:
            raise ValueError(f"{node.id} is not a container with widgets in it.")
        ops, prev = [], node.id
        for ch in list(node.children):
            ops.append({"op": "move", "id": ch.id, "parent": parent.id, "after": prev})
            prev = ch.id
        ops.append({"op": "remove", "id": node.id})
        return ops, node.children[0].id, f"Took the widgets out of {node.id} and removed it."
    if action in ("left", "center", "right", "fill"):
        attrs = {"left": None, "right": None, "cx": None}
        if action == "left":
            attrs["left"] = "0dp"
        elif action == "right":
            attrs["right"] = "0dp"
            if node.attrs.get("w") in (None, "preferred"):
                return [], node.id, "Give it a width first: Visualizer ignores right on a preferred width."
        elif action == "center":
            attrs["cx"] = "50%"
        else:
            attrs.update(left="0dp", w="100%")
        return [{"op": "set", "id": node.id, "attrs": attrs}], node.id, f"{ARRANGE[action]}: {node.id}."
    raise ValueError(f"Unknown arrangement '{action}'.")
