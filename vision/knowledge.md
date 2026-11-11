# How to build a Visualizer form that holds on every screen

The rules Saywright works by. `vision/responsive.py` applies them in code on every image, so they hold every time. A short version goes into the local model's prompt (`voice/interpret.py`, `vision/review.py`), and every image build is logged to `data/training/image_agent.jsonl`, so this behaviour can be trained into a model once a GPU is available.

The layout-property and skin rules were checked in Visualizer 25, its source, or a real Live Preview build (`visualizer-copilot/knowledge/VISUALIZER.md`), except that straight gradients other than top-to-bottom, and shadows in `desktopweb`, still need a build to confirm them. The structure, breakpoint and image rules are design judgement, tested by rendering real screens.

## Structure

1. Cut a page into sections, sections into rows, rows into columns. Cut along the widest empty band first.
2. A header or footer that spans the page is its own section. Don't merge it into the columns below it.
3. Two real columns (a gutter down the whole height, several things on each side) are columns first, rows inside.
4. A row with a wide gap has a left part and a right part. Pin the right part with `right`, so it stays at the edge.
5. Use a free container only for things that overlap on purpose, and give it a height: it can't size to its children.

## Layout properties

6. In a vertical flow, `top` is the gap after the previous widget. In a horizontal flow, `left` is the gap.
7. Horizontal flows don't wrap. A row either fits or changes layout on that breakpoint.
8. Child order can't change per breakpoint. Stacked columns keep their order.
9. `right` works only when `left` isn't set and the width isn't preferred: Visualizer leaves a preferred-width widget at the left. Anything pinned right gets a dp width. `bottom` works only when `top` isn't set.
10. `h=preferred` needs autogrow. A preferred height ends at the last widget, so a panel's bottom inset is a small spacer flex.
11. Containers and paragraphs take % widths. Buttons, icons and tiles keep dp. Short labels use preferred.
12. Gaps in a row that grows are %, so they shrink with it. Gaps in a cluster stay dp.

## Breakpoints

13. `b1` applies to widths 1025–1366, `b2` to 641–1024, `b3` up to 640. Wider than 1366 uses the base values.
14. Values for one breakpoint are `b2.<prop>` / `b3.<prop>`: size, position, skin, visibility, text and layout can differ. Placeholder can't.
15. Tablet: keep the structure if it fits, ease big text, and let panels grow for text that wraps. Cards in a row stay the same height.
16. Mobile: rows that don't fit stack, big indents shrink first, margins become 4%, big text shrinks by about 40%. A band across the whole page (a header, a hero background) stays across it; only its contents move in, and a part pinned right moves in as far as the left one.
17. A nav that can't fit a phone hides, except the brand name. Extra actions hide before the main action.
18. Never let a fixed width leave the screen.

When the designer's own tablet or mobile screenshot is given, it replaces rules 15–17 for that breakpoint: what it shows side by side stays a row, what it shows one under another stacks, what it leaves out (between things it shows) hides, each text style takes the size it has there, and a button or field drawn across its column spans it. The widget tree still comes from the widest screenshot: text only a narrower screenshot has is reported, not added, and order cannot change. Reading a narrower screenshot:
- A phone's status bar and on-screen keyboard are not the form: their digits would match code boxes and step numbers.
- Match by letters, not words: OCR glues and splits words differently on each screenshot.
- A lone digit says nothing: OCR does not read single characters, so a code box or step number is never hidden for being absent.
- Other words in the same place mean reworded, not removed ("Verifies automatically" → "Auto-reading SMS"): keep the widget.
- A section that is nearly all gone, with a scrap shown somewhere else (a sidebar on a phone, its "5 min left" in the phone's header), hides whole: a widget cannot change parent.
- A row is a stack when its parts' texts sit under one another, judged text by text: one text that moved (a "Save & exit" now beside the logo) does not make a row.
- When only one column of a row is left, it takes the whole width, edge to edge. A small tile (an icon, a code box) keeps its size.

## Skins

19. Skin names are letters and digits only, or Visualizer skips the skin.
20. Colours are `RRGGBBAA`, and AA is opacity.
21. A rounded skin needs a border, even 1 px in its own colour, or it renders square.
22. Gradients run in straight directions only (0, 90, 180, 270). Other angles become `to undefined` in a build, and the widget loses its background.
23. Shadows go in the skin's `desktopweb` block.
24. Font size is `desktopweb.font_size`, a % of 16 px.
25. Don't trust the canvas alone. The designer and the Live Preview build are stricter: check them, and its `theme.css`.

## From an image

26. Set text size by width, so the text in Helvetica is as wide as in the image.
27. Weight can't be measured from a screenshot. Use hierarchy: clearly bigger than body text, or small and coloured, means bold.
28. Similar text shares one style, and a skin is reused only for nearly the same size.
29. Icons and logos are cropped from the image into `resources/desktop/common`, with lowercase letters and digits in the name. They aren't redrawn.
30. A wide box with one short faint line and maybe an icon is an input. Text centred in a small box is a button.
31. OCR text can be wrong. Fix spacing and wrong letters, and never reword.
32. A column of ticks or icons belongs to the rows beside it. A tick starts a new list item; a line without one continues the item above.
33. If a widget spills out of its panel on any breakpoint, grow that panel on that breakpoint and look again.
