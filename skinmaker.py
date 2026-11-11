"""Create Visualizer skins: a look (colours, gradient, border, radius, shadow, font) -> one theme JSON file.

New skins live in data/skins/ (Saywright's library) and in the scratch canvas project straight away. The real project
only gets a skin when a form that uses it is saved, the same rule as forms: commands never touch the real project.

Skin file format, read from Visualizer 25's own source (public/desktopweb/app/utils/SkinToCssConverter.js, kskin.js,
utils.js) and from AvenzaBank's skins:
  solid     bg_type "one", background_color RRGGBBAA (AA = opacity)
  gradient  bg_type "ms_gradient", background_style "linear", background_color {angle, colors: [RRGGBBAA...], cs: [%...]}
            Straight directions only. The designer draws any angle, but the build does not: in a Live Preview build's
            theme.css, angle 180 became "linear-gradient(to bottom, ...)" and angle 135 "linear-gradient(to undefined, ...)",
            which a browser ignores, so the widget has no background at all (seen 2026-11-04). 90 and 270 are assumed to
            work the same way as 180 until a build shows them.
  shadow    in the desktopweb block, {color, x, y, br (blur), nm (spread), inner}, as real skins have it. At the top level
            a Live Preview build writes no box-shadow.
  border    border_style plain | custom (with border_radius px), border_width, border_color
  font      font_color, font_weight, font_size + desktopweb.font_size (% of 16 px)
Lessons from react2viz opened in Visualizer 25: names are letters and digits only, or the skin is skipped on open;
a borderless rounded skin renders square, so a rounded skin always gets a 1 px border in its own colour.
"""
import copy
import hashlib
import json
import pathlib
import re
import uuid

ABBR = {"FlexContainer": "Flx", "FlexScrollContainer": "Scr", "Label": "Lbl", "Button": "Btn", "TextField": "Tbx",
        "TextArea": "Txa", "ListBox": "Lst", "Calendar": "Cal", "Image": "Img", "Segment": "Seg", "RichText": "Rtx",
        "Form": "Frm"}
TEXT_TYPES = {"Label", "Button", "TextField", "TextArea", "ListBox", "Calendar", "RichText"}
WORD_TYPE = {"flex": "FlexContainer", "container": "FlexContainer", "panel": "FlexContainer", "card": "FlexContainer",
             "label": "Label", "text": "Label", "button": "Button", "textbox": "TextField", "text box": "TextField",
             "field": "TextField", "input": "TextField", "dropdown": "ListBox", "drop down": "ListBox", "listbox": "ListBox",
             "form": "Form", "calendar": "Calendar", "image": "Image"}
COLOURS = {"white": "ffffff", "black": "000000", "navy": "0a0a23", "midnight": "0a0a23", "blue": "2563eb", "sky": "38bdf8",
           "cyan": "22d3ee", "teal": "14b8a6", "green": "16a34a", "lime": "84cc16", "yellow": "facc15", "gold": "e2c275",
           "orange": "f97316", "red": "dc2626", "pink": "ec4899", "purple": "7c3aed", "violet": "6d5efc", "indigo": "4f46e5",
           "grey": "6b7280", "gray": "6b7280", "silver": "c7c9d3", "slate": "334155"}


def hex8(colour):
    """"635bff" | "#635BFF" | "635bff80" | "violet" | "white at 10%" -> RRGGBBAA, or None."""
    if not isinstance(colour, str):
        return None
    c = colour.strip().lower().lstrip("#")
    m = re.fullmatch(r"(\w+)\s+at\s+(\d{1,3})\s*(?:%|percent)", c)
    alpha = None
    if m:
        c, alpha = m.group(1), min(100, int(m.group(2)))
    c = COLOURS.get(c, c)
    if not re.fullmatch(r"[0-9a-f]{6}([0-9a-f]{2})?", c):
        return None
    if alpha is not None:
        return c[:6] + f"{round(alpha * 255 / 100):02x}"
    return c if len(c) == 8 else c + "ff"


def straight(angle):
    """The nearest direction a build can draw."""
    a = int(angle) % 360
    return 90 if 45 < a <= 135 else 180 if 135 < a < 225 else 270 if 225 <= a < 315 else 0


def clean(spec):
    """The look with defaults filled in and colours normalised; raises ValueError on anything Visualizer cannot hold."""
    wtype = spec.get("wType") or "FlexContainer"
    if wtype not in ABBR:
        raise ValueError(f"Skins for {wtype} are not supported yet.")
    out = {"wType": wtype}
    bad = lambda v: ValueError(f"'{v}' is not a colour. Use a hex value like 635bff or a name like violet.")  # noqa: E731
    bg = spec.get("bg")
    if bg not in (None, "", "none", "transparent"):
        out["bg"] = hex8(bg)
        if not out["bg"]:
            raise bad(bg)
        if spec.get("bg2"):
            out["bg2"] = hex8(spec["bg2"])
            if not out["bg2"]:
                raise bad(spec["bg2"])
            out["angle"] = straight(spec.get("angle", 90))
    for key in ("color", "border", "shadow"):
        if spec.get(key):
            out[key] = hex8(spec[key])
            if not out[key]:
                raise bad(spec[key])
    if out.get("border"):
        out["border_width"] = max(1, int(spec.get("border_width") or 1))
    if spec.get("radius"):
        out["radius"] = max(0, int(spec["radius"]))
    if out.get("shadow"):
        out.update(blur=int(spec.get("blur", 20)), spread=int(spec.get("spread", 0)), sx=int(spec.get("sx", 0)), sy=int(spec.get("sy", 0)))
    if wtype in TEXT_TYPES:
        if spec.get("px"):
            out["px"] = int(spec["px"])
            if not 6 <= out["px"] <= 200:
                raise ValueError("Font size must be between 6 and 200 px.")
        out["bold"] = bool(spec.get("bold"))
    return out


def auto_name(look):
    """A readable name that is the same for the same look, so asking twice reuses the skin. Letters and digits only."""
    colour = look.get("bg") or look.get("color") or look.get("border") or "none"
    extra = "".join(p for p in (f"{look['px']}" if look.get("px") else "", "B" if look.get("bold") else "",
                                f"R{look['radius']}" if look.get("radius") else "") if p)
    digest = hashlib.sha1(json.dumps(look, sort_keys=True).encode()).hexdigest()[:4]
    return f"sknSw{ABBR[look['wType']]}{colour[:6]}{extra}x{digest}"


def build(look, sample, kuid):
    """The skin JSON: a real skin of that type (per-platform blocks and all) with the look written over it."""
    s = copy.deepcopy(sample)
    for key in ("background_gradient_top_color", "background_gradient_bottom_color", "background_style", "background_image",
                "border_radius", "shadow", "isCustomCSSEnabled", "customCSS"):
        s.pop(key, None)
    if isinstance(s.get("desktopweb"), dict):
        s["desktopweb"].pop("shadow", None)
    s.update(wType=look["wType"], kuid=kuid, isDefaultSkin=False)
    if look.get("bg2"):
        s.update(bg_type="ms_gradient", background_style="linear",
                 background_color={"angle": look["angle"], "colors": [look["bg"], look["bg2"]], "cs": [0, 100]})
    else:
        s.update(bg_type="one", background_color=look.get("bg") or "ffffff00")
    width = look.get("border_width", 0)
    colour = look.get("border")
    if look.get("radius") and not width:
        width, colour = 1, look.get("bg") or "ffffff00"
    s.update(border_type=0, border_width=width, border_color=colour or "ffffff00",
             border_style="custom" if look.get("radius") else "plain")
    if look.get("radius"):
        s["border_radius"] = look["radius"]
    if look.get("shadow"):
        s.setdefault("desktopweb", {})["shadow"] = {"color": look["shadow"], "x": look["sx"], "y": look["sy"], "br": look["blur"], "nm": look["spread"], "inner": False}
    if look["wType"] in TEXT_TYPES:
        if look.get("color"):
            s["font_color"] = look["color"]
        if look.get("px"):
            pct = round(look["px"] * 100 / 16)
            s["font_size"] = pct
            s["fontSizeInPx"] = False
            s.setdefault("desktopweb", {})["font_size"] = pct
        s["font_weight"] = "bold" if look.get("bold") else "400"
    return s


class SkinMaker:
    """catalogue and skins are the running app's lookups; a new skin is registered in them at once."""

    def __init__(self, project, canvas_project, library, catalogue, skins, read_json, write_json):
        self.project, self.canvas, self.library = pathlib.Path(project), pathlib.Path(canvas_project), pathlib.Path(library)
        self.catalogue, self.skins, self.read_json, self.write_json = catalogue, skins, read_json, write_json
        self.library.mkdir(parents=True, exist_ok=True)
        props = self.project / "projectProperties.json"
        self.theme = (json.loads(props.read_text(encoding="utf-8-sig")).get("defaulttheme") if props.exists() else None) or "defaultTheme"
        self.names = set()
        for f in sorted(self.library.glob("*.json")):
            self._register(f.stem, self._repair(f))

    def _repair(self, path):
        """Skins made before the build rules above were known: straighten the gradient, move the shadow. A copy already
        saved in the project is this same skin, so it gets the same repair."""
        skin = self.read_json(path)
        changed = False
        bg = skin.get("background_color")
        if isinstance(bg, dict) and bg.get("angle") != straight(bg.get("angle", 180)):
            bg["angle"] = straight(bg.get("angle", 180))
            changed = True
        if isinstance(skin.get("shadow"), dict):
            skin.setdefault("desktopweb", {})["shadow"] = skin.pop("shadow")
            changed = True
        if changed:
            self.write_json(path, skin)
            saved = self._theme(self.project) / path.name
            if saved.exists():
                self.write_json(saved, skin)
                for cache in (".cacheEntities.json", ".cacheDependency.json"):   # Visualizer rebuilds these
                    (self.project / cache).unlink(missing_ok=True)
        return skin

    def _theme(self, project):
        return pathlib.Path(project) / "themes" / self.theme

    def _register(self, name, skin):
        from voice.skins import font_px, to_css, _dark
        kuid = skin["kuid"]
        self.catalogue.skins[kuid] = {"name": name, "wType": skin["wType"]}
        self.catalogue.skin_by_name[name] = kuid
        self.skins.css[kuid] = to_css(skin)
        self.skins.font[kuid] = (font_px(skin) or 0, str(skin.get("font_weight")) == "bold", _dark(skin.get("font_color")))
        self.names.add(name)
        self.write_json(self._theme(self.canvas) / f"{name}.json", skin)

    def _sample(self, wtype):
        """A real skin of this type to copy the per-platform blocks from."""
        first = None
        for f in sorted(self._theme(self.project).glob("*.json")):
            s = self.read_json(f)
            if s.get("wType") == wtype and "desktopweb" in s and not s.get("isDefaultSkin"):
                return s
            if first is None and s.get("wType") == "Label" and "desktopweb" in s:
                first = s
        return first

    def create(self, spec):
        """-> (name, created). The same look asked for twice is one skin. Never overwrites a skin it did not make."""
        look = clean(spec)
        name = (spec.get("name") or "").strip()
        if name and not re.fullmatch(r"[A-Za-z][A-Za-z0-9]{2,}", name):
            raise ValueError(f"'{name}' cannot be a skin name: Visualizer allows letters and digits only.")
        name = name or auto_name(look)
        if name in self.catalogue.skin_by_name and name not in self.names:
            raise ValueError(f"{name} is already a skin in this project. Pick another name.")
        path = self.library / f"{name}.json"
        if path.exists():
            old = self.read_json(path)
            skin = build(look, old, old["kuid"])
            if skin == old:
                return name, False
        else:
            sample = self._sample(look["wType"])
            if sample is None:
                raise ValueError(f"This project has no {look['wType']} skin to copy the format from.")
            skin = build(look, sample, "s" + uuid.uuid4().hex[1:])   # skin kuids: "s" + 31 hex digits
        self.write_json(path, skin)
        self._register(name, skin)
        return name, True

    def publish(self, spec_text):
        """Save: copy the library skins this form's Spec names into the real project. -> the names copied."""
        used = sorted(n for n in self.names if re.search(rf"\b{n}\b", spec_text))
        for name in used:
            self.write_json(self._theme(self.project) / f"{name}.json", self.read_json(self.library / f"{name}.json"))
        for name in set(re.findall(r"\b((?:aiv|fig)[0-9a-f]{10}\.png)\b", spec_text)):     # cropped (aiv) and Figma (fig) images
            self.copy_image(name, self.project)
        return used

    def copy_image(self, name, project=None):
        """A cropped image into a project's resources (the canvas's unless a project is given). False if there is no such file."""
        source = self.library.parent / "images" / name
        if not source.exists():
            return False
        target = pathlib.Path(project or self.canvas) / "resources" / "desktop" / "common"   # where AvenzaBank's own images are
        target.mkdir(parents=True, exist_ok=True)
        (target / name).write_bytes(source.read_bytes())
        return True


# ---------- commands: "create a flex skin called sknCard with background violet to cyan, radius 20, glow violet blur 60" ----------
CREATE = re.compile(r"^(?:please\s+)?(?:create|make|add|define)\s+(?:me\s+)?(?:a\s+|an\s+)?(?:new\s+)?"
                    r"(?:(flex|container|panel|card|label|text box|textbox|text|button|field|input|drop ?down|listbox|form|calendar|image)\s+)?"
                    r"(?:new\s+)?skin\b", re.I)
GIVE = re.compile(r"^(?:please\s+)?(?:give|apply)\s+(?:it|this|that)\s+(?:a\s+)?(?:new\s+)?skin\b", re.I)
_COLOUR = r"(#?[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?\b|[a-zA-Z]+)(?:\s+at\s+(\d{1,3})\s*(?:%|percent))?"

# ---------- commands for the other breakpoints: "on mobile, flxRow: layout vertical, width 100%, left 0dp" ----------
BP_LINE = re.compile(r"^on\s+(tablet|mobile)\s*,?\s+(\w+)\s*:\s*(.+)$", re.I)
BP_KEYS = {"layout": "layout", "width": "w", "height": "h", "top": "top", "left": "left", "right": "right", "bottom": "bottom",
           "visible": "visible", "skin": "skin"}
BP_CODE = {"tablet": "b2", "mobile": "b3"}


def parse_breakpoint(text):
    """-> {"id", "attrs": {"b3.w": "100%", ...}}, or None when the text is not a breakpoint command. "none" clears a value
    on that breakpoint (an empty string in the Spec means "not set here")."""
    m = BP_LINE.match(text.strip())
    if not m:
        return None
    attrs = {}
    for part in m.group(3).split(","):
        words = part.split()
        if len(words) != 2 or words[0].lower() not in BP_KEYS:
            return {"id": m.group(2), "attrs": {}, "bad": part.strip()}
        key, value = BP_KEYS[words[0].lower()], words[1]
        if key == "visible":
            value = value.lower() == "true"
        attrs[f"{BP_CODE[m.group(1).lower()]}.{key}"] = None if value == "none" else value
    return {"id": m.group(2), "attrs": attrs}


IMAGE_LINE = re.compile(r"^add image (\w+) from ([a-z0-9_]+\.png)\s*,\s*(.+)$", re.I)


def parse_image(text):
    """"add image imgLogo from aiv12.png, width 30dp, height 30dp, top 0dp, left 0dp" -> {id, src, attrs}, or None."""
    m = IMAGE_LINE.match(text.strip())
    if not m:
        return None
    attrs = {"src": m.group(2)}
    for part in m.group(3).split(","):
        words = part.split()
        if len(words) == 2 and words[0].lower() in BP_KEYS:
            attrs[BP_KEYS[words[0].lower()]] = words[1]
    return {"id": m.group(1), "attrs": attrs}


FORM_SKIN = re.compile(r"^set\s+form\s+skin\s+([A-Za-z][A-Za-z0-9]{2,})$", re.I)


def _colour(m, g=1):
    word, alpha = m.group(g), m.group(g + 1)
    return f"{word} at {alpha}%" if alpha else word


def parse(text):
    """A skin command -> {spec, apply}, or None when the text is not one. Unknown colours surface later as a clear error."""
    create, give = CREATE.match(text), GIVE.match(text)
    if not create and not give:
        return None
    t = text[(create or give).end():]
    spec = {}
    if create and create.group(1):
        spec["wType"] = WORD_TYPE[create.group(1).lower()]
    m = re.search(r"\bfor\s+(?:a\s+|an\s+)?(flex|container|panel|card|label|text box|textbox|text|button|field|input|drop ?down|listbox|form|calendar|image)\b", t, re.I)
    if m and "wType" not in spec:
        spec["wType"] = WORD_TYPE[m.group(1).lower()]
    m = re.search(r"\b(?:called|named|name)\s+([A-Za-z]\w*)", t, re.I)
    if m:
        spec["name"] = m.group(1)
    m = re.search(rf"\b(?:background|bg|fill)(?:\s+colou?r)?\s+(?:is\s+|of\s+)?(?:gradient\s+)?(?:from\s+)?{_COLOUR}(?:\s+to\s+{_COLOUR})?", t, re.I)
    if m:
        spec["bg"] = _colour(m)
        if m.group(3):
            spec["bg2"] = _colour(m, 3)
    m = re.search(r"\b(?:angle\s+(\d{1,3})|(vertical)|(horizontal)|(diagonal))\b", t, re.I)
    if m:
        spec["angle"] = int(m.group(1)) if m.group(1) else 180 if m.group(2) else 90 if m.group(3) else 135
    m = re.search(rf"\b(?:text|font)(?:\s+colou?r)?\s+(?:is\s+)?(?!size\b){_COLOUR}", t, re.I)
    if m:
        spec["color"] = _colour(m)
    m = re.search(r"\b(?:font\s+size|text\s+size|size)\s+(\d{1,3})", t, re.I) or re.search(r"\b(\d{1,3})\s*px\b", t, re.I)
    if m:
        spec["px"] = int(m.group(1))
    if re.search(r"\bbold\b", t, re.I):
        spec["bold"] = True
    m = re.search(rf"\bborder(?:\s+colou?r)?\s+(?!width\b|radius\b){_COLOUR}", t, re.I)
    if m and not re.search(r"\bno\s+border\b", t, re.I):
        spec["border"] = _colour(m)
    m = re.search(r"\bborder\s+width\s+(\d+)", t, re.I)
    if m:
        spec["border_width"] = int(m.group(1))
    m = re.search(r"\b(?:radius|corners?)\s+(\d+)", t, re.I)
    if m:
        spec["radius"] = int(m.group(1))
    elif re.search(r"\brounded\b", t, re.I):
        spec["radius"] = 8
    m = re.search(rf"\b(?:glow|shadow)\s+{_COLOUR}", t, re.I)
    if m:
        spec["shadow"] = _colour(m)
        for key, word in (("blur", "blur"), ("spread", "spread"), ("sx", "x"), ("sy", "y")):
            n = re.search(rf"\b{word}\s+(-?\d+)", t, re.I)
            if n:
                spec[key] = int(n.group(1))
    if not set(spec) - {"wType", "name"}:
        return {"spec": spec, "apply": bool(give), "empty": True}
    return {"spec": spec, "apply": bool(give) or bool(re.search(r"\b(?:and\s+)?(?:apply|use)\s+it\b", t, re.I))}
