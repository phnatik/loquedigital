#!/usr/bin/env python3
# Launch audit for loqueagent.com. Run from astro-site/ after `npm run build`:
#     npm run build && python3 audit.py
# Checks: pricing against WEBSITE_PROCESS.md §9, the "do not quote" list (gate 4),
# handwritten wording (gate 5), ZDR/BAA exclusivity (gate 6), canonicals and OG
# (gate 15), title/description hygiene, <h1> count, alt text, form hidden fields
# and the placeholder inventory (gate 13a).
import os, re, glob, collections
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")
pages = sorted(glob.glob(D + "/*.html"))
issues = collections.defaultdict(list)

def add(gate, msg): issues[gate].append(msg)

# --- §9 pricing source of truth --------------------------------------------
ALLOWED = {"$1,000","$300","$700","$270","$500","$240",
           "$2,500","$650","$1,750","$585","$1,250","$520",
           "$5,000","$2,000","$3,500","$1,800","$1,600",
           "$250","$400","$150","$200","$3","$5",
           "$40K","$150K"}
for f in pages:
    s = open(f).read()
    for amt in set(re.findall(r'\$[0-9][0-9,]*K?', s)):
        if amt not in ALLOWED:
            add("gate3/§9", f"{os.path.basename(f)}: unrecognised figure {amt}")

# --- gate 4: numbers this project has not earned ----------------------------
FORBIDDEN = [
 (r'sav\w*\s+(?:you\s+)?\d+\+?\s*(?:hours|hrs)', "quantified hours saved"),
 (r'\d+\s*%\s*(?:accura|correct|precis)', "accuracy percentage"),
 (r'\bROI\b', "ROI claim"),
 (r'\d+x\s+(?:faster|more|return)', "multiplier claim"),
 (r'(?:up to|as much as)\s+\d+\s*(?:hours|hrs)', "quantified hours"),
]
for f in pages:
    s = re.sub(r'<[^>]+>', ' ', open(f).read())
    for pat, label in FORBIDDEN:
        for m in re.finditer(pat, s, re.I):
            add("gate4", f"{os.path.basename(f)}: {label} — ...{s[max(0,m.start()-60):m.end()+40].strip()}...")

# 30% is earned — confirm it is always attributed
for f in pages:
    s = re.sub(r'<[^>]+>', ' ', open(f).read())
    for m in re.finditer(r'30\s*%', s):
        ctx = s[m.start():m.start()+180]
        if "intake" not in ctx.lower():
            add("gate4", f"{os.path.basename(f)}: bare 30% without the intake attribution — ...{ctx[:120]}...")

# --- gate 5: ADR-P05 handwritten language -----------------------------------
for f in pages:
    s = re.sub(r'<[^>]+>', ' ', open(f).read())
    if "handwritten" in s.lower():
        for bad in ["robot", "programmatic", "automated card", "automated letter", "printed by machine"]:
            if bad in s.lower():
                add("gate5", f"{os.path.basename(f)}: forbidden handwritten word '{bad}'")
    if "real pen, real ink" in s.lower() and "written by machine" not in s.lower():
        add("gate5", f"{os.path.basename(f)}: 'real pen, real ink' without 'written by machine'")

# --- gate 6: ZDR and BAA must never read as a combinable menu ---------------
for f in pages:
    s = re.sub(r'<[^>]+>', ' ', open(f).read()).lower()
    has_zdr = "zero data retention" in s or "zero-data-retention" in s
    has_baa = "business associate agreement" in s or "hipaa-ready" in s or "baa" in s
    if has_zdr and has_baa:
        if not re.search(r"aren't combinable|are not combinable|instead|either|choose one|mutually exclusive", s):
            add("gate6", f"{os.path.basename(f)}: ZDR and BAA both present with no exclusivity statement")

# --- gate 15 + basic SEO hygiene -------------------------------------------
titles, descs = {}, {}
for f in pages:
    s = open(f).read(); n = os.path.basename(f)
    t = re.search(r'<title>(.*?)</title>', s, re.S)
    d = re.search(r'<meta name="description" content="(.*?)"', s, re.S)
    c = re.search(r'<link rel="canonical" href="(.*?)"', s)
    og = re.search(r'<meta property="og:image" content="(.*?)"', s)
    if not t: add("seo", f"{n}: no <title>")
    else:
        titles.setdefault(t.group(1), []).append(n)
        if len(t.group(1)) > 65: add("seo", f"{n}: title {len(t.group(1))} chars (>65)")
    if not d: add("seo", f"{n}: no meta description")
    else:
        descs.setdefault(d.group(1), []).append(n)
        if len(d.group(1)) > 320: add("seo", f"{n}: description {len(d.group(1))} chars")
    if not c or not c.group(1).startswith("https://loqueagent.com"):
        add("gate15", f"{n}: canonical missing or wrong -> {c.group(1) if c else None}")
    if not og or not og.group(1).startswith("https://loqueagent.com"):
        add("gate15", f"{n}: og:image missing or wrong")
    h1s = re.findall(r'<h1[^>]*>', s)
    if len(h1s) != 1: add("a11y", f"{n}: {len(h1s)} <h1> elements")
    for m in re.finditer(r'<img (?![^>]*\balt=)[^>]*>', s):
        add("a11y", f"{n}: <img> without alt — {m.group(0)[:70]}")
for t, ns in titles.items():
    if len(ns) > 1: add("seo", f"duplicate title across {ns}: {t[:60]}")
for d, ns in descs.items():
    if len(ns) > 1: add("seo", f"duplicate description across {ns}")

# --- gate 13a: placeholders ------------------------------------------------
# Content placeholders only. Image slots are a separate inventory below —
# a missing photograph is a production task, an unearned claim is not.
for f in pages:
    n = os.path.basename(f); c = open(f).read().count("data-placeholder")
    if c: add("gate13a", f"{n}: {c} placeholder block(s)")

# --- image slots: the shot list --------------------------------------------
# Every [data-image-slot] is an asset that still has to be made. Filename is
# the slot id; drop /img/<id>.jpg in and swap the div for an <img>.
shots, live = [], 0
# slot assets moved to src/assets so Astro's pipeline processes them
IMGDIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src", "assets", "img")
for f in pages:
    n = os.path.basename(f); s = open(f).read()
    for m in re.finditer(r'data-image-slot="([^"]+)"\s+data-ratio="([^"]+)"', s):
        sid, ar = m.group(1), m.group(2).strip()
        if os.path.exists(os.path.join(IMGDIR, sid + ".jpg")):
            live += 1
        else:
            shots.append((n, sid, ar))
for n, sid, ar in shots:
    add("images-pending", f"{n}: {sid}.jpg ({ar})")
if live:
    print(f"images installed: {live} of {live + len(shots)}")

# --- /build tier drift ------------------------------------------------------
# services.js transcribes its tiers from the comparison matrix in plans.astro.
# If the two disagree, two public pages are making contradictory claims about
# what a plan includes. Checked against source, not the build.
SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src")
try:
    _plans = open(os.path.join(SRC, "pages", "plans.astro")).read()
    _body = _plans[_plans.index("<tbody>"):_plans.index("</tbody>")]
    _matrix = {}
    for _row in re.findall(r"<tr>(.*?)</tr>", _body, re.S):
        _f = re.search(r'class="feat">(.*?)</td>', _row, re.S)
        _v = re.findall(r'<td class="val([^"]*)">(.*?)</td>', _row, re.S)
        if not _f or len(_v) != 3:
            continue
        _has = [("mno" not in c) for c, _ in _v]
        _matrix[_f.group(1).strip()] = "select" if _has[0] else ("reserve" if _has[1] else "custom")
    _svc = open(os.path.join(SRC, "data", "services.js")).read()
    _alias = {"Handwritten cards": "Handwritten cards included",
              "Handwritten letters": "Handwritten letters included"}
    for _name, _tier in re.findall(r"name: '([^']+)',\s*\n\s*tier: '(\w+)'", _svc):
        _key = _alias.get(_name, _name)
        if _key not in _matrix:
            add("build-tiers", f"{_name}: not present in the /plans matrix")
        elif _matrix[_key] != _tier:
            add("build-tiers",
                f"{_name}: matrix says {_matrix[_key]}, services.js says {_tier}")
except FileNotFoundError:
    pass

# --- forms -----------------------------------------------------------------
for f in pages:
    s = open(f).read(); n = os.path.basename(f)
    for form in re.findall(r'<form\b.*?</form>', s, re.S):
        # /build's selector is a form for keyboard and no-JS reasons but never
        # submits anywhere; it has no endpoint to check.
        if 'id="builder"' in form:
            continue
        keys = re.findall(r'name="access_key" value="([^"]*)"', form)
        vert = re.findall(r'name="vertical" value="([^"]*)"', form)
        subj = re.findall(r'name="subject" value="([^"]*)"', form)
        add("forms", f"{n}: form subject={subj[0] if subj else 'NONE'} | vertical={vert[0] if vert else 'NONE'} | live_key={'yes' if keys and keys[0] else 'no'}")

# --- approval promise present on every vertical -----------------------------
VERTS = ["legal.html","healthcare.html","professional-services.html","real-estate.html","executives.html"]
for n in VERTS:
    s = re.sub(r'<[^>]+>', ' ', open(D + "/" + n).read()).lower()
    if "nothing goes out under your name without your approval" not in s:
        add("gate-p04", f"{n}: approval promise missing")

for gate in sorted(issues):
    # the shot list is an inventory to work from, not a warning to skim
    cap = 999 if gate == "images-pending" else 14
    print(f"\n### {gate}  ({len(issues[gate])})")
    for m in issues[gate][:cap]: print("   -", m)
    if len(issues[gate]) > cap: print(f"   ... +{len(issues[gate])-cap} more")
if not issues: print("clean")
