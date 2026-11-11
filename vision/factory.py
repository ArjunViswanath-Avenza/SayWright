"""Fine-tuning data factory: random banking forms -> Saywright -> rendered screenshots + exact element lists.

    python vision/factory.py <count> <out dir> [--seed 7] [--port 8771] [--widths 1366,1024,640]

Each form is a script of Saywright commands (the same commands the image agent writes), run against a Saywright
backend (use the test instance), rendered by viz2react, and read back by truth.mjs. Every (image, elements) pair is
exact by construction: no hand labelling. Output:
  <out>/forms/<form>.txt                 the script
  <out>/images/<form>-<width>.png        the screenshot
  <out>/labels/<form>-<width>.json       what is visible (truth.mjs schema)
  <out>/train.jsonl                      chat-format pairs for a vision LoRA (image + prompt -> JSON answer)
"""
import argparse
import json
import pathlib
import random
import re
import shutil
import subprocess
import sys
import urllib.request

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from describe import PROMPT  # noqa: E402

FIELDS = [
    ("Full name", "Enter your full name", "input"), ("Email address", "name@example.com", "input"),
    ("Mobile number", "Enter mobile number", "input"), ("Password", "Enter your password", "password"),
    ("Confirm password", "Re-enter password", "password"), ("Account number", "Enter account number", "input"),
    ("Amount", "0.00", "input"), ("Beneficiary name", "Enter beneficiary name", "input"),
    ("IBAN", "Enter IBAN", "input"), ("Reference", "Add a reference", "input"), ("User Id", "Enter user id", "input"),
    ("Date of birth", "DD/MM/YYYY", "input"), ("Postal code", "Enter postal code", "input"),
    ("City", "Enter city", "input"), ("Card number", "XXXX XXXX XXXX XXXX", "input"), ("OTP", "Enter 6-digit code", "input"),
]
PAIRS = [(("First name", "Enter first name"), ("Last name", "Enter last name")),
         (("Expiry", "MM/YY"), ("CVV", "123")), (("From account", "Select account"), ("To account", "Select account"))]
HEADINGS = ["Sign in", "Open an account", "Transfer money", "Add beneficiary", "Verify your identity", "Update profile",
            "Pay a bill", "Reset password", "Card details", "Contact us", "Set up your login", "Confirm transfer"]
SUBTITLES = ["Use the credentials issued by your branch.", "It only takes a few minutes.", "We will send a code to your phone.",
             "Check the details before you continue.", "All fields are required.", "Your data is encrypted end to end."]
BUTTONS = ["Continue", "Submit", "Sign In", "Transfer now", "Next", "Save changes", "Verify", "Pay now", "Send code"]
LINKS = ["Forgot password?", "Need help?", "Terms and conditions", "Back to login", "Resend code", "Open an account"]
TAGLINES = ["Banking that stays out of your way.", "Your money, your way.", "Simple, secure banking.", "Banking for every day."]

# AvenzaBank skins (real theme names), grouped by role
DARK_PANELS = ["sknflx0f2233", "CopyslFbox0bb493771c5f743", "sknflx15577d"]
LIGHT_PANELS = ["sknflxE3E9EE", "CopyslFbox0e142d86d9d5243", "CopyslFbox0g86f15b4a96841"]
CARDS = ["sknflxE3E9EE", "CopyslFbox0a7856aec039c4d", "sknflxHeaderBorder5b6b7a20px", "CopyslFbox0ad85847653fd46"]
HEAD_SKINS = ["CopydefLabel0b958727ed83141", "sknlblAvenza0f223337pxBold", "sknlblHeading0f223320px"]
SUB_SKINS = ["CopysknlblDescription0b6df324c89a54a", "sknLblDescription", "sknlblDescription5b6b7a20px"]
FIELD_LABEL = ["sknlblSubheading00000015px", "sknlblHeading0f223320px"]
LINK_SKINS = ["CopydefLabel0ac07d4ebd8e448"]
WHITE_BIG = ["CopydefLabel0g3ca6c356c1746", "sknlblffffff30px", "CopydefLabel0c4a8fec8b9624a"]
WHITE_SMALL = ["sknlblffffff20px", "CopydefLabel0d9c36a8cc7b24d"]
INPUTS = ["skntbx5b6b7a15px", "CopydefTextBoxNormal0d77bd26223a145", "CopydefTextBoxNormal0eaf25455ad3d48"]
BUTTON_SKINS = ["sknbtn15577d", "CopydefBtnNormal0a5557b20e63745"]


class Form:
    def __init__(self, rnd, name):
        self.r, self.lines, self.n = rnd, [f"new form called {name}"], 0

    def uid(self, prefix):
        self.n += 1
        return f"{prefix}{self.n}"

    def add(self, line):
        self.lines.append(line)

    def fields(self, container, left, width_pct):
        r = self.r
        self.add(f'add a label called {self.uid("lblHead")} with text "{r.choice(HEADINGS)}", top {r.randint(20, 40)}dp, '
                 f'left {left}dp, skin {r.choice(HEAD_SKINS)}')
        if r.random() < 0.7:
            self.add(f'add a label called {self.uid("lblSub")} with text "{r.choice(SUBTITLES)}", top 8dp, left {left}dp, '
                     f'skin {r.choice(SUB_SKINS)}')
        input_skin, label_skin = r.choice(INPUTS), r.choice(FIELD_LABEL)
        n_fields = r.randint(1, 4)
        if r.random() < 0.35:
            (a_lbl, a_ph), (b_lbl, b_ph) = r.choice(PAIRS)
            row = self.uid("flxPair")
            self.add(f"add a flex called {row} with layout horizontal, width {width_pct}%, height preferred, top 18dp, left {left}dp")
            for i, (lbl, ph) in enumerate(((a_lbl, a_ph), (b_lbl, b_ph))):
                col = self.uid("flxCol")
                self.add(f"select {row}")
                self.add(f"add a flex called {col} with layout vertical, width 48%, height preferred, left {0 if i == 0 else 4}%")
                self.add(f'add a label called {self.uid("lblField")} with text "{lbl}", skin {label_skin}')
                self.add(f'add a text box called {self.uid("tbx")} with placeholder "{ph}", width 100%, height 44dp, top 6dp, skin {input_skin}')
            self.add(f"select {container}")
            n_fields -= 1
        for lbl, ph, kind in r.sample(FIELDS, n_fields):
            self.add(f'add a label called {self.uid("lblField")} with text "{lbl}", top {r.randint(14, 22)}dp, left {left}dp, skin {label_skin}')
            masked = ", masked" if kind == "password" else ""
            self.add(f'add a text box called {self.uid("tbx")} with placeholder "{ph}"{masked}, width {width_pct}%, '
                     f'height {r.choice([40, 44, 50])}dp, top 6dp, left {left}dp, skin {input_skin}')
        if r.random() < 0.4:
            row = self.uid("flxRemember")
            self.add(f"add a flex called {row} with layout horizontal, width preferred, height preferred, top 16dp, left {left}dp")
            self.add(f"add a flex called {self.uid('flxCheck')} with width 22dp, height 22dp, skin CopyslFbox0cf62699586c744")
            self.add(f"select {row}")
            self.add(f'add a label called {self.uid("lblCheck")} with text "Keep me signed in on this device", left 10dp, skin sknLblDescription')
            self.add(f"select {container}")
        self.add(f'add a button called {self.uid("btn")} with text "{r.choice(BUTTONS)}", width {width_pct}%, '
                 f'height {r.choice([44, 50, 56])}dp, top {r.randint(18, 30)}dp, left {left}dp, skin {r.choice(BUTTON_SKINS)}')
        if r.random() < 0.6:
            self.add(f'add a label called {self.uid("lblLink")} with text "{r.choice(LINKS)}", top 16dp, left {left}dp, skin {r.choice(LINK_SKINS)}')


def random_form(r, name):
    f = Form(r, name)
    layout = r.choice(["split", "card", "header", "plain"])
    if layout == "split":
        f.add("make flxMain horizontal")
        w = r.choice([30, 35, 40])
        f.add(f"add a flex called flxBrand with layout vertical, width {w}%, height 100%, skin {r.choice(DARK_PANELS)}")
        f.add(f'add a label called lblLogo with text "AvenzaBank", top 50dp, left 60dp, skin {r.choice(WHITE_BIG)}')
        f.add(f'add a label called lblTagline with text "{r.choice(TAGLINES)}", width 70%, top 60dp, left 60dp, skin {r.choice(WHITE_BIG)}')
        f.add("select flxMain")
        f.add(f"add a flex called flxRight with layout free, width {100 - w}%, height 100%, skin {r.choice(LIGHT_PANELS)}")
        f.add(f"add a flex called flxCard with layout vertical, width {r.choice([440, 480, 520])}dp, height preferred, "
              f"center x 50%, center y 50%, skin {r.choice(CARDS)}")
        f.fields("flxCard", 24, 88)
    elif layout == "card":
        f.add("make flxMain free")
        f.add(f"add a flex called flxBg with layout free, width 100%, height 100%, skin {r.choice(LIGHT_PANELS)}")
        f.add(f"add a flex called flxCard with layout vertical, width {r.choice([480, 520, 560])}dp, height preferred, "
              f"center x 50%, center y 50%, skin {r.choice(CARDS)}")
        f.fields("flxCard", 28, 88)
    elif layout == "header":
        f.add(f"add a flex called flxHeader with layout vertical, width 100%, height {r.choice([90, 120, 160])}dp, skin {r.choice(DARK_PANELS)}")
        f.add(f'add a label called lblLogo with text "AvenzaBank", top 28dp, left 40dp, skin {r.choice(WHITE_BIG)}')
        if r.random() < 0.5:
            f.add(f'add a label called lblTagline with text "{r.choice(TAGLINES)}", top 8dp, left 40dp, skin {r.choice(WHITE_SMALL)}')
        f.add("select flxMain")
        f.fields("flxMain", 40, r.choice([40, 50, 60]))
    else:
        f.fields("flxMain", r.choice([40, 80, 120]), r.choice([35, 45, 55]))
    return f.lines


def post(port, path, body):
    req = urllib.request.Request(f"http://127.0.0.1:{port}{path}", json.dumps(body).encode(), {"Content-Type": "application/json"})
    return json.load(urllib.request.urlopen(req, timeout=600))


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("count", type=int)
    ap.add_argument("out")
    ap.add_argument("--seed", type=int, default=7)
    ap.add_argument("--port", default="8771")
    ap.add_argument("--widths", default="1366,1024,640")
    ap.add_argument("--canvas", required=True, help="the backend's work/canvas folder (viz2react output it renders)")
    a = ap.parse_args()
    out = pathlib.Path(a.out)
    for d in ("forms", "images", "labels"):
        (out / d).mkdir(parents=True, exist_ok=True)
    r = random.Random(a.seed)
    made, failed = 0, 0
    with open(out / "train.jsonl", "a", encoding="utf-8") as train:
        for i in range(a.count):
            name = f"synth {a.seed} {i}"
            lines = random_form(r, name)
            problems = []
            for line in lines:
                res = post(a.port, "/api/command", {"text": line})
                if not res["ok"] or res.get("path") == "model":
                    problems.append(f"{line[:60]} -> {res['say'][:80]}")
            form = res["form"]
            # every widget the script names must exist: a line can be "ok" and still not build what it says
            for wid in re.findall(r"\bcalled (\w+)", "\n".join(lines[1:])):
                if not re.search(rf"\b{wid}\b", res["spec"]):
                    problems.append(f"{wid} was not created")
            (out / "forms" / f"{form}.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")
            if problems:
                failed += 1
                print(f"{form}: {len(problems)} command problems, skipped: {problems[0]}")
                continue
            tmp = out / "_render"
            subprocess.run(["node", str(HERE / "truth.mjs"), a.canvas, form, str(tmp), a.widths], check=True, capture_output=True)
            for w in a.widths.split(","):
                png, lab = tmp / f"{form}-{w}.png", tmp / f"{form}-{w}.json"
                shutil.move(png, out / "images" / png.name)
                label = json.loads(lab.read_text(encoding="utf-8"))
                (out / "labels" / lab.name).write_text(json.dumps(label, indent=1), encoding="utf-8")
                answer = {"elements": [{"type": e["type"], "text": e["text"], "bbox_2d": e["bbox_2d"]} for e in label["elements"]]}
                train.write(json.dumps({"messages": [
                    {"role": "user", "content": [{"type": "image", "image": f"images/{png.name}"},
                                                 {"type": "text", "text": PROMPT.format(w=label["width"], h=label["height"])}]},
                    {"role": "assistant", "content": [{"type": "text", "text": json.dumps(answer, ensure_ascii=False)}]},
                ]}, ensure_ascii=False) + "\n")
                lab.unlink()
            made += 1
    print(f"{made} forms rendered, {failed} skipped -> {out}")
