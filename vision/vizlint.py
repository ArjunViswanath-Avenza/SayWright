"""What Visualizer's own runtime will do differently from the canvas, read from the generated .sm JSON.

The canvas (viz2react) is a copy of Visualizer's layout rules, and a copy can be kinder than the original. These are the
rules, read from the desktop web runtime (konyui.js _canMeasureHeight and the flex height code), that the canvas does not
enforce, so a form can look right on the canvas and break in Visualizer:

  grow       a flex whose height is preferred on any breakpoint sizes to its content only with autogrowMode 1; without
             it a stacked row keeps its desktop height and its parts run over the next section (frmWelcome on tablet).
  measure    an autogrow flex cannot measure its content when a child uses a % top, bottom, centerY or height: it falls
             back to a default height.
  free       a free-layout flex cannot size to its children: a preferred height there has nothing to measure.

    python vision/vizlint.py <project>/forms/desktop/<form>.sm
"""
import json
import pathlib
import sys

FLEX = ("FlexContainer", "FlexScrollContainer")


def _val(dim):
    return dim.get("value") if isinstance(dim, dict) else dim


def _pct(dim):
    v = _val(dim)
    return isinstance(v, str) and v.endswith("%") and v not in ("0%",)


def lint(form_dir):
    """-> [{rule, id, say}]"""
    form_dir = pathlib.Path(form_dir)
    widgets = {}
    for f in form_dir.glob("*.json"):
        try:
            w = json.loads(f.read_text(encoding="utf-8-sig"))
        except (ValueError, OSError):
            continue
        if "id" in w:
            widgets[w["id"]] = w
    children = {}
    for w in widgets.values():
        for c in w.get("children") or []:
            children.setdefault(w["id"], []).append(c)
    out = []
    for wid, w in widgets.items():
        if w.get("wType") not in FLEX:
            continue
        sizes = {"base": w.get("_height_")}
        layouts = {"base": w.get("layouttype")}
        for bp, rd in (w.get("responsiveData") or {}).items():
            if isinstance(rd, dict):
                if "height" in rd:
                    sizes[bp] = rd["height"]
                if "layoutType" in rd:
                    layouts[bp] = rd["layoutType"]
        preferred = [bp for bp, h in sizes.items() if _val(h) == "preferred"]
        grows = w.get("autogrowmode") == 1
        if preferred and not grows:
            out.append({"rule": "grow", "id": wid, "say": f"{wid} has a preferred height ({', '.join(preferred)}) but no autogrow: "
                                                           "Visualizer keeps a fixed height and what is inside runs over the next widgets."})
        for bp in preferred:
            if layouts.get(bp, layouts["base"]) == 2:
                out.append({"rule": "free", "id": wid, "say": f"{wid} is a free container with a preferred height ({bp}): "
                                                               "Visualizer cannot size it to its children; give it a height."})
        if grows:
            for cid in children.get(wid, []):
                c = widgets.get(cid)
                if not c:
                    continue
                bad = [k for k in ("_top_", "_bottom_", "centery", "_height_") if _pct(c.get(k))]
                for bp, rd in (c.get("responsiveData") or {}).items():
                    if isinstance(rd, dict):
                        bad += [f"{bp}.{k}" for k in ("top", "bottom", "centerY", "height") if _pct(rd.get(k))]
                if bad:
                    out.append({"rule": "measure", "id": wid, "say": f"{wid} grows with its content, but {cid} uses % ({', '.join(bad)}): "
                                                                      "Visualizer cannot measure it and falls back to a default height."})
    return out


if __name__ == "__main__":
    for issue in lint(sys.argv[1]):
        print(issue["rule"], issue["say"])
