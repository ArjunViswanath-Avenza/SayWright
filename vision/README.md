# Saywright vision: image → form

**Start with the image agent, `agent.py`:** one image in, one responsive form out, the same flow as From image in the app.

```bash
python vision/agent.py my_screen.png --out prompt.txt
python vision/agent.py desktop.png --width 1366 --tablet tablet.png --mobile mobile.png --out prompt.txt
```

With `--tablet` / `--mobile` (in the app: the Tablet and Mobile boxes), `observe.py` reads those screenshots and matches their text to the form's widgets word by word, so that breakpoint follows the designer instead of the rules: rows that stack or stay side by side, hidden items (only between things the screenshot shows, since a phone screenshot often stops at the fold), one size ratio per text style, and full-width buttons and fields (the same space on both sides of their column). The screenshot's scale comes from its text: most text keeps its size across breakpoints. Tested on a page made for it, screenshotted at 1366, 1024 and a 390 phone at 2x: the tablet hero stacked while its cards stayed in a row, the mobile nav hid while Sign in stayed, the button went full width.

The first real set (an onboarding code screen whose tablet turns the sidebar into a top band and whose phone screen has a status bar, a keypad and reworded text) added: phone chrome is dropped; matching is letter by letter so glued OCR words still match; lone digits are never hidden for being absent; reworded text stays; a section that is nearly all gone with a scrap shown elsewhere hides whole; rows are judged text by text; a lone remaining column goes edge to edge; small tiles keep their size. Rules are in `knowledge.md`.

| Step | Who | What it does |
|---|---|---|
| Size | code | the breakpoint from the size of the text, not the image: a 752 px desktop screenshot with 7 px text reads as Desktop |
| Read | code | small images are enlarged; OCR lines; text-shaped ink no line covers is read on its own (the detector can skip a whole paragraph line); spaces and icon characters repaired from the gaps in the ink |
| See | code | closed outlines (cards, chips, buttons, tiles, also on gradients and glass) and flat-colour blocks |
| Name | code | button, input, dropdown, checkbox, image, panel, from shape and text position. Icons and logos are cropped from the image into real Image widgets |
| Style | code | fill, border, radius measured; size so the text is as wide as in the image; weight from hierarchy; similar text shares one style |
| Structure | `responsive.py` | sections, rows, columns, right-pinned parts; flows and % widths; tablet and mobile values |
| Build | Saywright | the prompt runs through the rules, the canvas redraws every 12 steps |
| Check | `check.mjs` | renders Desktop, Tablet and Mobile: clipped text, overlaps, off-screen, pixel match with the image |
| Review | local model (`review.py`) | reads the text for OCR mistakes in the background; each change must keep the numbers and most of the letters |

The rules are written out in `knowledge.md`.

**From Figma, `figma.py`:** the same planner fed with a frame's real layers through Figma's REST API instead of OCR and pixels: exact text, font size and weight, colours (with alpha), linear gradients (straightened to top-bottom or left-right, the directions a build draws), radius, border and width, drop shadow, and positions (1 Figma px = 1 dp). Vectors, icon components and image fills are exported from Figma as PNGs. Groups and frames without a fill, border or shadow are only grouping and dissolve; the rest nest by what is inside what. A shape with one centred text is a button, one named like a field is a text box, a small bordered square is a checkbox. Tablet and mobile frames go through `observe.py` in exact mode: boxes are dp, font sizes come from the frame, a lone digit counts like any text, and icons match by layer name and size. Tested offline on a page exported to Figma's JSON shape (`scratchpad/bp/to_figma.mjs`): 143 steps, clean at three widths, 99% pixel match; a gradient button, a shadowed card, a checkbox, four exported icons, an avatar hidden on mobile and a full-width button with an icon on mobile.

Then on a real file (Avenza Onboarding: 12 screens drawn at Web 1440, Tablet 768 and Mobile 390). What real frames needed:
- Soft glows are radial-gradient frames bigger than their column: dropped (a build has no radial gradient). Circles and pills cut by a card's clipping are dropped too, and a parent that clips its content clips its children's boxes.
- Icons export at exactly their box (`use_absolute_bounds`), so a shadowed tile does not overlap the heading under it.
- One line set in two styles ("We sent it to … · " + violet "Change number") becomes a label per style.
- Labels get the width their text needs in Arial (Visualizer's font), not the design font's.
- Unfilled auto-layout frames are kept as containers without a skin: they are the designer's groups (a main column beside a sidebar).
- Overlapping layers keep Figma's order (a back card stays behind the front one).
- In a narrower frame: icons match by name and size, best pairs first; anything the frame does not have is hidden there; a list that runs across (a sidebar's steps as a tablet stepper) turns its flex horizontal; rows are judged by where most of each part's texts are, sides first; a row that wraps into a grid (four cards two by two) is regrouped into rows of that many, side by side wide and stacked narrow; cards side by side take the height the frame draws them (grown evenly if their text needs more); a text is only a rewording of a new one when they share a word or are both phrases, never when all its siblings left (a nav bar's last item), and it takes the new text's size.
- Result on all 12 screens (Web frame builds the form, Tablet and Mobile frames set their breakpoints): every step worked, 32 of 36 screen-and-width checks fully clean, none overflowing; the other 4 are one clipped or touching label each on mobile.
- Not carried: the font family (Visualizer's Helvetica sets wider, so a headline can wrap one line earlier), radial glows, arcs.

**Checked against Visualizer's own runtime, not just the canvas.** Arjun's first tablet view of a Figma-built screen in Visualizer was broken: flexes that stack on tablet or mobile (`b2.h=preferred`) had no autogrow. Visualizer's desktop web runtime cannot measure a flex without it and gives it the default 220dp (`konyui.js` `_canMeasureHeight`, `konywidget.js` `_getDefaultHeight`), so the stacked content ran over the next section. The canvas grew those flexes anyway, so its checks passed. Fixed in three places:

- The exporter turns autogrow on for a flex whose height is preferred on any breakpoint.
- The canvas now gives such a flex 220dp, as Visualizer does.
- `vizlint.py` reads the generated JSON for what the runtime does that the canvas might not: a preferred height without autogrow, an autogrow flex with a % child (it cannot measure it), and a free flex asked to size to its children. Its findings show in the quality check as "In Visualizer itself".

The check also reports **covered**: text, a button or an image under a skinned panel that does not hold it, the way a card picture lay over the buttons. Covering the widest screen already has counts as the design's own. Saywright repairs forms it saved before this fix when it starts; Visualizer then needs the project reopened.

**Figma's API limits:** some plans allow very few calls (this file's Starter-plan token was blocked for 4.6 days on `/nodes` and `/images` after about twenty). So one call reads the whole file and is kept; a build makes one image call (icons and the frame picture together); thumbnails come in one call; a long block is remembered and reported, and icons that cannot be exported become empty boxes of their size so the form still builds.

## What the local model does, and why not more

`qwen3:8b` on this laptop runs at 4-5 tokens/s, so a call takes about a minute. Measured:

| Test | Result |
|---|---|
| Fix OCR text, 16 real lines, 36-60 s | 3 fixed, 8 correct lines left alone, 5 missed, **0 broken** |
| Same job in the app on one screen, 76 s | fixed "Not sure which one fits? Compare rates", "p.a.", "Prime Savings ·"; left "feos" |
| Layout rules in its prompt, one phone-only command, 2 min 34 s | ignored the rule and changed all sizes |
| Long knowledge prompt, 10 commands (2026-10-30) | 4/10 -> 5/10, 2.6x slower |

So the layout rules run as code, which applies them every time, and the model does the reading. `to_screen()` in `voice/interpret.py` scopes a model command to a breakpoint when the words say so, because the prompt alone did not. Fine-tuning would change this and needs a GPU: every image build is logged to `data/training/image_agent.jsonl`.

## Measured (2026-11-05)

Each screen went through the app's path: `/api/agent`, build, `/api/agent/check` (which grows panels something spills out of). "Matched" is scored against the original at 1366 px with `score.py`. "Clean" means no clipped text, overlaps, spills or off-screen widgets at that width.

| Screen | Elements | Matched | Clean at |
|---|---|---|---|
| frmLogin | 20 | 20 | Desktop, Tablet |
| frmAddress | 31 | 19 | Desktop, Tablet, Mobile |
| frmDashboard | 47 | 44 | Desktop, Tablet |
| frmAcknowledgement | 37 | 27 | Desktop, Tablet |
| frmIdentity | 33 | 17 | Desktop, Tablet, Mobile |
| frmOpenAccount | 32 | 20 | Desktop, Tablet |
| frmPersonalDetails | 28 | 25 | Desktop, Tablet, Mobile |
| frmProfile | 38 | 36 | Mobile |
| **Total** | **266** | **208 (78%)** | |

With three Avenza screenshots (Savings clean at all three, Choose Product at Desktop, Onboarding at none), 22 of 33 screen-and-width checks are clean and none scroll sideways. Pixel match with the source image at Desktop is 94-99%.

The earlier 224 of 266 was not comparable: this run uses a canvas that behaves like Visualizer on `right`, which exposed widgets the old canvas placed wrongly. Flows also shift when a screen's source is broken: frmIdentity's header is cut off in its own source, so a correct rebuild sits about 30 px lower and scores low.

These screens were used while building all this, so new screens may do worse. Everything here is the viz2react canvas, not Visualizer.

Limits:
- The designer and Live Preview are stricter than the canvas, and differences keep turning up (`right` on preferred widths was found this way). Left-to-right gradients and shadows are not yet confirmed in a build. Check `workspace/.webapps/AvenzaBank/desktopweb/kwebthemes/default/theme.css` after one.
- Horizontal flows do not wrap: 4 cards go 2x2 only when a narrower Figma frame or screenshot shows the grid; from the rules alone they stack.
- A hidden nav on a phone has no menu to replace it.
- Shapes that touch and merge into one outline are lost. Some OCR errors stay.

`--mode free` (fixed positions, the most exact at one size) and `--mode rows` (the older planner) remain as options.

## How it works

| Step | File | Who | What |
|---|---|---|---|
| Read | `detect.py` | RapidOCR (local, Apache-2.0) + pixel analysis | text lines (split where the ink colour changes, joined into paragraphs); flat-colour rectangles (cards, panels, input and button fills, borders); small marks (radios, ticks, icons); then types from shape, contrast and where the text sits |
| or | `describe.py` | local vision model (Ollama `qwen2.5vl:7b`) | the same list, read by the model |
| Plan | `plan.py` | code | nests elements in visible panels; infers columns next to full-height panels; groups rows; a centred card → free layout with centre 50%/50%; sizes in % and dp |
| Style | `plan.py` | code, from pixels | samples real colours and measures text size from ink height (×0.93 for lines with g/j/p/q/y, ×0.72 without), then picks the nearest **existing project skin**. Also grows buttons the model boxed around the caption only, and turns "panels" that are really text back into text |
| Write | `plan.py` | code | compound commands that run through Saywright's fast rules (no model) |
| Run | `run_script.py` | Saywright | runs a script against a backend and reports any line that failed or needed the model |

Ids, skins and Visualizer layout are always deterministic code, never a reader's guess.

## Measured (2026-11-03, i5-1335U, no GPU)

Reading: every element of a screen, scored with `score.py` (`eval.py --model cv` or `--model qwen2.5vl:7b`):

| Reader | Screens | Found (recall) | Correct (precision) | Text | Seconds / image |
|---|---|---|---|---|---|
| Base `qwen2.5vl:7b` | 16 real AvenzaBank (8 forms × 1366/640) | 0.29 | 0.49 | 0.91 | 344 |
| **OCR + pixels** | same 16 (also used while tuning `detect.py`) | **0.88** | **0.93** | **0.99** | **6** |
| **OCR + pixels** | 174 synthetic banking forms (`factory.py`; checked once, for inputs read as buttons) | **0.95** | **0.95** | **1.00** | **3** |

Several of the 16 real screens render broken (texts overlapping, inputs invisible); what is not visible cannot be read.

Rebuilding: AvenzaBank `frmLogin` at 1366 px → script → Saywright → re-rendered and scored against the original with `score.py`:

| Input to the planner | Elements matched | Precision | Box overlap | Text |
|---|---|---|---|---|
| Perfect description (ground truth) | 18 / 20 | 0.90 | 0.90 | 1.00 |
| Base `qwen2.5vl:7b`, no fine-tuning | 13 / 20 | 0.93 | 0.74 | 0.96 |
| **OCR + pixels** | **18 / 20** | 0.90 | 0.90 | 1.00 |

Side by side: `out/compare_truth_cv.png`.

Base model on its own: 10 / 20 elements, in **~410 s per image** (1,832 prompt tokens, then 657 output tokens at 3.6 tok/s). Exact pixel boxes when it finds something. Typical misses: small labels ("User Id"), panels with no text (the card), lines of text called "panels", two texts merged into one, "Forget" corrected to "Forgot".

## New skins (2026-11-04)

The planner still prefers the nearest project skin. When nothing is close, it adds a `create ... skin` command with the measured look: fill or gradient, corner radius, border, text colour, size and weight. A dark or coloured page gives `flxMain` its own skin. `detect.py` also finds gradient panels from their outline (`soft_panels`). `Planner(new_skins=False)` turns all of this off.

| Screen | New skins | Result |
|---|---|---|
| `frmLogin` (AvenzaBank) | 0 | 18 / 20, unchanged |
| 16 held-out screens, reader only | n/a | 0.88 / 0.93 / 0.99, unchanged |
| `frmDashboard`, `frmAddress`, `frmAcknowledgement` (AvenzaBank) | 3, 0, 3 | not rebuilt or scored; some of these skins are false |
| Avenza onboarding (dark, glows, overlapping card and chips) | 5 + page | colours and fonts right; **layout wrong and card missing** |

Designs with overlapping, floating elements are the limit: the planner thinks in rows and columns, and this screen needs free placement. For those, write a prompt: `prompts/avenza_onboarding_home.txt` is the worked example. Glows on such screens also read as false checkboxes and icons (`marks()`).

## Fine-tuning (optional now)

Not needed for screenshots and Figma exports: the OCR + pixel reader is faster and more accurate than the base model. The pieces below stay for the model reader (photos, sketches), if that is ever needed.

| Piece | File | Status |
|---|---|---|
| Ground truth from any rendered form | `truth.mjs` | done: renders with viz2react, records every visible element's type, text and exact box |
| Training data factory | `factory.py` | done: random banking forms (split / card / header / plain; fields, pairs, checkbox, links; real AvenzaBank skins) → Saywright → screenshots at 1366/1024/640 + exact labels + `train.jsonl` in chat format (image + prompt → JSON answer) |
| Held-out test set | `eval/` | 8 real AvenzaBank screens × 2 widths; never used for training |
| Evaluation | `eval.py` | scores any Ollama model on the held-out set; base vs fine-tuned on the same images |
| LoRA training | (GPU) | **not possible on this laptop**: a 7B vision LoRA needs a CUDA GPU (roughly 16–24 GB). The data and format are ready |

The R25 corpus (1,068 real forms) would be much better training material, but it needs legal approval first.
