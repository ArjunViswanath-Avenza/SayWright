# Saywright: say it, see it, ship it

A desktop app that builds Temenos Quantum Visualizer forms from speech. You talk, and the form appears on a live canvas. **Save** writes a real `.sm` form into a Visualizer project. **Export React** turns the saved form, or the whole project, into a standalone React app. Everything runs on this machine: Whisper for speech, Ollama for the local model, Python and Node for the rest.

## Run

Double-click `Saywright.cmd`, or:

```bash
npm --prefix C:/Projects/LLM/Learn/saywright start
```

The app starts its own backend (`server.py` on 127.0.0.1:8770) and stops it on close. Ollama should be running with `qwen3:8b`, which is only used for commands the rules don't cover.

**In Chrome instead:** double-click `Saywright-Chrome.cmd`. It starts the backend in a minimised window called "Saywright backend" (close that window to stop it) and opens http://127.0.0.1:8770 as a Chrome app window. http://127.0.0.1:8770 only answers while a backend is running: either the desktop app is open, or `Saywright-Chrome.cmd` / `python server.py` started one. Chrome asks once for microphone access. The Claude browser pane blocks the microphone.

A React export is a plain folder: open its `index.html` straight from disk in Chrome. No server is needed.

## How it fits together

| Step | Where | What happens |
| --- | --- | --- |
| Speech → text | `../visualizer-voice/voice/stt.py` | faster-whisper `base.en`, local, about 1–1.7 s |
| Text → edits | `../visualizer-voice/voice/{rules,patterns,interpret}.py` | rules and layout patterns first (0–5 ms), local model otherwise; validator rejects bad edits |
| Edits → `.sm` | `../visualizer-copilot/vcp` via `voice/export.py` | after every command the form is written into a scratch copy of the project (`work/canvas-project`) |
| `.sm` → canvas | `render_worker.mjs` → `../viz2react` | a warm Node process converts the form to React (about 120 ms); the canvas shows `work/canvas` |
| Image → prompt | `server.py /api/agent` → `vision/agent.py` | a screenshot read with OCR + pixels, written as a prompt that the UI shows and runs line by line |
| Save | `server.py /api/save` | writes the form and controller stubs into `workspace/AvenzaBank` (or `SAYWRIGHT_PROJECT`), deletes Visualizer's cache files, records the form as Saywright's |
| Export React | `server.py /api/export-react` | viz2react on the saved project → `exports/<Project>-<form>-react` or `exports/<Project>-react` |
| Training data | `data/sessions/*.jsonl` | same record format as visualizer-voice: (form before, utterance) → ops, undo and save as labels |

The canvas is not a mock-up. It shows the form exactly as it will be saved, run by the same React runtime the export uses. **Design** mode turns clicks into selection. **Play** runs the form's controller. Desktop, Tablet and Mobile switch the canvas to 1366, 1024 or 640 px.

**Properties panel:** click a widget on the canvas or in the widget list and a panel slides in on the right. It has the widget's id, text and placeholder, width, height and position (↑/↓ nudge by 1, Shift by 10), container layout, skin (project styles first, with a preview), visibility, all attributes as JSON, and Delete. Each change is validated, re-rendered on the canvas in about 0.2 s, undoable, and logged with `source: "panel"`. Panel records are not training examples. Esc or ← goes back to the list.

**Image agent:** give it screenshots and nothing else. The Image agent card has three boxes, **Desktop**, **Tablet** and **Mobile**; fill any of them by clicking a box, dropping an image (the drop overlay has the same three targets), or pasting with Ctrl+V (Figma "Copy as PNG", a Win+Shift+S snip). A dropped or pasted image that is not aimed at a box goes to Mobile when it is tall, otherwise to the first free of Desktop and Tablet. Press **Build form**:

- The widest screenshot you gave builds the form, at that size (Desktop 1366, Tablet 1024, Mobile 640).
- A tablet or mobile screenshot sets that breakpoint from what it shows: which rows stack and which stay side by side, what is hidden, text that is bigger or smaller, buttons and fields that span their column. The card lists what each one set, and any text it found that the wider screen does not have (Visualizer keeps one widget tree per form, so that text is not added, and parts cannot change order).
- A size you leave empty follows the responsive rules, as before.

**From Figma (exact):** the Image agent card has a Figma link box for each size: **Desktop**, **Tablet** and **Mobile**. Paste the frame link for each size you have (they can come from different files) and press **Load links**: each size takes the frame its own link points to, and a size left empty is looked for in the file of the first link (the same screen by frame name, or by position in sections named Web/Desktop, Tablet and Mobile). Each box has a picker to change its frame. **Build form** then reads Figma's real layers instead of pixels: the exact text, font sizes and weights, colours, gradients, radii, borders, drop shadows and positions, with icons and pictures exported from Figma as images. Tablet and mobile frames set those breakpoints the same way screenshots do, matched by the real text, and icons that a narrower frame leaves out are hidden there. Figma's API needs a personal access token (Figma > Settings > Security > Personal access tokens, read-only file content); the first Load asks for it and keeps it in `~/.saywright/figma_token.txt` on this computer, or set `FIGMA_TOKEN`. Figma answers and exported images are cached under `work/figma`, so a frame read once builds offline. From the command line: `python vision/figma.py "<frame link>" --tablet "<link>" --mobile "<link>" --out prompt.txt`, or `--list` for a file's frames.

**What each widget is for, and changing it:** a screenshot or a frame shows how things look, not what they do. Saywright works out each element's purpose when it builds from Figma (`widgets.py` holds the reasoning, `vision/figma.py` applies it):

- **Fields.** In a light, bordered box with a small caption over a value, the value becomes a real text box: it keeps the value as its text and uses the caption as the hint. It becomes a password box when the caption asks for a secret. It becomes a dropdown when the caption names a choice (Gender, Nationality, Emirate, Income…) or a chevron ends the box. It becomes a date picker when the value is a date or the caption says date, DOB or expiry. Typed data (an email, a name, a number) beats an icon at the end of the box.
- **Hint boxes.** A bordered box with one faint hint ("Search accounts, deposits, loans") becomes a text box.
- **Code boxes.** Four or more equal square boxes in a row become one-character text boxes.
- **Links.** Short coloured action text ("Change number", "Explore 3 products →", "Save & exit") becomes a button with no background.
- **Toggles.** The plain option of a Yes/No toggle becomes a flat button.

To change it, select any widget. The properties panel's **What it is** section lists every kind it could be: label, link, button, text box, password box, dropdown, date picker, checkbox, radio option or switch. The likely ones come first, marked *suggested*, with the reason ("the value of the “Emirate” field", "short coloured text, like a link"). One click turns it into that kind, in one undoable edit. The change keeps:

- its place in the tree
- its size, position and visibility on every breakpoint
- its text, or the text as the hint
- its look, through a matching skin made for the new type

For a field's value, only the value changes; the box and caption stay. Checkbox, radio and switch are built from a flex and a label, because no real form here uses Visualizer's own widgets for them, so there's no verified JSON to copy.

Under **Arrange**: move up, move down, move out of its container, put in a row or column with the next widget, unwrap a container, align left, centre, align right, or full width. Dragging in the widget list still works too.

All of these can be said or typed: "make this a dropdown", "turn lblEmail into a text box", "change it to a date picker", "move it up", "put it in a row with the next one".

The agent reads the screenshots on this machine, writes a full prompt, shows it in the card, and runs it. The form name comes from the file name, or from the biggest text on the screen. If a screenshot's text size says it shows another size than its box, the agent builds as asked and warns you. Edit the prompt and press **Run prompt** to run your version. Each step is in History marked "from image", can be undone, and is logged with `source: "image"`, so it is not mistaken for spoken training data. Images and their prompts are kept in `work/images`.

Forms from the image agent are **responsive**: it finds the page's sections, rows and columns and uses flows and % widths, with real tablet and mobile values stored as `responsiveData`. Icons and logos are cropped from the image into real Image widgets. After building, the card reports how each breakpoint rendered and how closely Desktop matches the image. Then the local model reads the text in the background (about a minute) and fixes OCR mistakes, each as an undoable edit.

The layout comes from code (`vision/agent.py`, `vision/responsive.py`), following the rules in `vision/knowledge.md`, because code applies them every time and the model on this laptop does not. The prompt runs through the same path as typed commands, and every build is logged to `data/training/image_agent.jsonl` for training a model on a GPU later. Scores and limits are in `vision/README.md`.

**Breakpoint commands:** `on mobile, flxRow: layout vertical, width 100%, left 0dp` sets values for one breakpoint (`on tablet` too), the same as Forking in the panel. `set form skin X` sets the form's skin. `add image imgLogo from aiv12.png, width 30dp, height 30dp, top 0dp, left 0dp` places a cropped image.

**New skins:** Saywright can create skins as well as reuse the project's. Three ways:
- **Say or type it:** `create a flex skin called sknCard with background violet to cyan, angle 135, radius 20, glow violet at 40% blur 60`, or `make a button skin with background white, text navy, size 16, bold, radius 14`. With a widget selected, `give it a new skin with background 0a0a23, border white at 15%, radius 12` also applies it. Colours are hex values or names (violet, navy, cyan, ...), with an optional `at 40%` for opacity. With no name, one is made from the look, so the same look is one skin.
- **Properties panel:** **New skin…** under the Skin dropdown opens a dialog with a live preview. It applies the skin as a normal, undoable edit.
- **From an image:** when no project skin is close to the measured colours and font size, the script creates one. Screens built from the project's own skins create few or none (`frmLogin`: none).

A new skin goes into `data/skins/` and the scratch canvas project straight away. The real project only gets a skin when a form that uses it is saved. Saywright never overwrites a skin it did not make. Rules kept: names are letters and digits only, and a rounded skin always gets a 1 px border (Visualizer 25 draws a borderless rounded skin square). Flat skins and rounded corners are confirmed in Live Preview. Gradients are limited to straight directions (0, 90, 180, 270): a Live Preview build turned angle 135 into `linear-gradient(to undefined, ...)`, which a browser ignores, so any other angle is moved to the nearest straight one, and skins made earlier are repaired at startup. Angle 180 is confirmed in a build; 0, 90, 270 and shadows are not yet. To check, read `workspace/.webapps/AvenzaBank/desktopweb/kwebthemes/default/theme.css` after a build.

**Deleting a form:** press **Delete form…**, or say or type "delete this form" or "delete form transfer money". Either way it stops at a confirmation dialog, so a misheard word can't delete anything. Only forms made in Saywright are listed: forms that came with the project are refused. The form's `.sm` and controller go to `data/trash/`, and the same dialog restores them. It warns if other project files name the form. Skins, images, React exports and session logs stay. If the project is open in Visualizer, reopen it afterwards.

**Reordering:** drag widgets in the Widgets list. A line above or below a row means "before / after it". A highlighted container means "inside it, at the end" (top and bottom edges of a container row still mean before / after). A widget can't be dropped into itself or its own children. Alt+↑ / Alt+↓ moves the selected widget one place among its siblings. Each move is one undoable edit, and order is the same on every breakpoint.

**Rulers and breakpoints:** the canvas has pixel rulers on the top and left edges (form px, 1 dp = 1 px). They follow the form's scroll, shade the selected widget's extent, and mark where Mobile (640) and Tablet (1024) end. The pointer position shows in the corner. Desktop, Tablet and Mobile are Visualizer's breakpoints b1 (1366 px, applies 1025–1366), b2 (1024 px, applies 641–1024) and b3 (640 px, applies up to 640).

**Breakpoint forking** (switch at the top of the properties panel, remembered between runs):
- On: an edit becomes an override for the breakpoint shown on the canvas, `bN.<prop>` in the Spec and `responsiveData.bN` in the `.sm`. Overridden fields are highlighted with ↺ to remove the override, and an empty field shows the shared value. Only properties Visualizer can vary per breakpoint can be forked (size, position, skin, visibility, text, layout, …). Others such as placeholder are marked "all screens".
- Off: the edit changes the shared value and removes that property's overrides, so it shows on every screen. Fields that differ on another screen are marked, e.g. "≠ Mobile".

Safety: Save only overwrites forms Saywright created (`data/saved_forms.json`). An existing project form with the same name is refused. The server answers 127.0.0.1 only, and the window may use the microphone only for that origin.

## Measured (2026-11-02, i5-1335U laptop)

| | |
| --- | --- |
| Command → canvas updated (rules path, includes write + React render) | 180–320 ms, one outlier at 1.3 s |
| React render alone (warm worker) | 110–130 ms |
| Desktop app start → backend answering | about 1 s |
| Saved project, Visualizer's own graph build (`visualizer-copilot/tools/viz_graph_check.js`) | OK |
| React export of `frmApply`, headless render (`viz2react/tests/render.mjs`) | 8 widgets, no errors |

## Known limits (prototype)

- Builds new forms only. Existing project forms can't be opened for editing yet; only forms saved from Saywright can be reopened.
- Desktop channel only. No controller logic is generated yet (empty stubs).
- The Save → Visualizer open check is done by hand (open `workspace/AvenzaBank` in Visualizer).
- The real microphone has been tested in the Voice Form Designer, not yet in this shell.
- Each save gives the form new kuids. That's fine for a new form, but not yet for one already referenced elsewhere.
