"""The local model reviews the text the image agent read: spacing, wrong letters, punctuation. It runs after the form is built,
because on this laptop it takes about a minute and the form must not wait for it.

Why this job and not the layout: qwen3:8b at 4-5 tok/s on CPU cannot lay out a screen, and a long knowledge prompt did not make
it better (4/10 -> 5/10 commands, 2.6x slower, tools/eval_model.py, 2026-10-30). Words it reads well. Measured on 16 real lines:
3 fixed, 8 correct lines left alone, 5 missed, 0 broken.

Nothing it returns is trusted: a change must keep the numbers and most of the letters, or it is dropped.
"""
import difflib
import json
import os
import re
import time
import urllib.error
import urllib.request

MODEL = os.environ.get("VOICE_MODEL", "qwen3:8b")
OLLAMA = "http://127.0.0.1:11434/api/chat"
SYSTEM = """You fix OCR errors in text read from a banking app screen. Words may be run together or have a wrong letter.
Rules: keep the meaning and wording exactly. Only fix spacing, wrong letters and punctuation. Never rewrite, shorten, add or translate.
Keep numbers, percentages, codes, names and symbols. p.a. means per annum. If a line is already right, return it unchanged.
Reply with JSON only: {"lines": ["...", "..."]} with the same number of lines in the same order."""


def letters(text):
    return re.sub(r"[^a-z0-9]", "", text.lower())


def acceptable(before, after):
    """A repair, not a rewrite: most of the letters stay, no number appears from nowhere, and the length stays close."""
    if not after.strip() or after == before:
        return False
    a, b = letters(before), letters(after)
    if not a or abs(len(a) - len(b)) > max(2, 0.15 * len(a)):
        return False
    if difflib.SequenceMatcher(None, a, b).ratio() < 0.8:
        return False
    # no number appears from nowhere; a letter that was really a digit (o, O, l, I) is the one exception
    was = re.findall(r"\d", before.translate(str.maketrans("oOlI", "0011")))
    now = re.findall(r"\d", after)
    return not (set(now) - set(was)) and len(now) >= len(re.findall(r"\d", before)) - 1


def ask(lines, timeout=240):
    body = {"model": MODEL, "think": False, "stream": False, "format": "json",
            "options": {"temperature": 0, "num_ctx": 2048, "num_predict": 40 * len(lines) + 60},
            "messages": [{"role": "system", "content": SYSTEM}, {"role": "user", "content": json.dumps({"lines": lines}, ensure_ascii=False)}]}
    req = urllib.request.Request(OLLAMA, json.dumps(body).encode(), {"Content-Type": "application/json"})
    reply = json.load(urllib.request.urlopen(req, timeout=timeout))
    return json.loads(reply["message"]["content"]).get("lines", [])


def review(texts, batch=20):
    """Distinct texts -> {"changes": {old: new}, "seconds", "asked", "error"}. Lines are sent in small batches, so one bad reply
    costs only its batch."""
    t = time.time()
    wanted = [x for x in dict.fromkeys(texts) if re.search(r"[A-Za-z]{2}", x)]
    changes, error, skipped = {}, None, 0
    for i in range(0, len(wanted), batch):
        part = wanted[i:i + batch]
        try:
            got = ask(part)
        except (urllib.error.URLError, OSError, ValueError, KeyError) as e:
            error = f"The local model did not answer ({e})."
            break
        if len(got) != len(part):       # a reply of the wrong length cannot be matched to its lines
            skipped += len(part)
            continue
        for old, new in zip(part, got):
            if isinstance(new, str) and acceptable(old, new):
                changes[old] = new
    return {"changes": changes, "seconds": round(time.time() - t), "asked": len(wanted), "skipped": skipped, "error": error}
