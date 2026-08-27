#!/usr/bin/env python3
"""Pull finished artwork out of Drive and into the build.

    python3 sync-assets.py           # report only, changes nothing
    python3 sync-assets.py --apply   # copy the files in

Two flows, because the site has two kinds of asset:

  LQAgent Photos/                 -> src/assets/img/   (photography, .jpg)
  LQAgent Photos/Build Your Own/  -> src/assets/svc/   (tile icons, .png)

Drive Desktop keeps both synced to local disk, so this is a file copy rather
than an API download. What it adds over `cp` is the checking: names against
the manifests, the " (1)" suffix a re-download picks up, dimensions against
the brief, and — for the icons — whether the PNG carries an alpha channel and
whether the lime accent is actually there.

Both icon checks exist because both failures already happened silently. An
opaque icon renders as a solid block on a dark tile, and a missing accent looks
fine until it sits next to one that has it: the first batch of ten came back
with no accent at all, and nothing noticed until the pixels were decoded by
hand.
"""
import csv, os, re, shutil, struct, subprocess, sys, zlib

HERE  = os.path.dirname(os.path.abspath(__file__))
DRIVE = os.path.expanduser(
    "~/Library/CloudStorage/GoogleDrive-chrisb@loquelogic.com/My Drive/"
    "Marketing/Loque Website Redesign/Loque Agent/LQAgent Photos")

FLOWS = [
    {"name": "photography",
     "src": DRIVE,
     "dst": os.path.join(HERE, "src", "assets", "img"),
     "manifest": os.path.join(HERE, "image-brief.csv"),
     "ext": ".jpg", "alpha": False, "recurse": False},
    {"name": "tile icons",
     "src": os.path.join(DRIVE, "Build Your Own"),
     "dst": os.path.join(HERE, "src", "assets", "svc"),
     "manifest": os.path.join(HERE, "illustration-brief.csv"),
     "ext": ".png", "alpha": True, "accent": True, "recurse": False},
]

APPLY = "--apply" in sys.argv
SUFFIX = re.compile(r" \(\d+\)$")          # Drive's re-download suffix


def sips(path, *keys):
    out = subprocess.run(["sips"] + [a for k in keys for a in ("-g", k)] + [path],
                         capture_output=True, text=True).stdout
    got = {}
    for line in out.splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            got[k.strip()] = v.strip()
    return got


def manifest(path, ext):
    """filename -> expected 'WxH', or None when the brief doesn't pin one."""
    want = {}
    if not os.path.exists(path):
        return want
    for row in csv.DictReader(open(path)):
        fn = row.get("filename", "")
        if not fn.endswith(ext):
            continue
        px = row.get("target_px") or row.get("size") or ""
        m = re.search(r"(\d+)\s*[x×]\s*(\d+)", px)
        want[fn] = f"{m.group(1)}x{m.group(2)}" if m else None
    return want



def png_pixels(path):
    """Decode a PNG to (channels, raw bytes). None if unsupported."""
    d = open(path, "rb").read()
    i, idat, ct, bd, w, h = 8, b"", None, None, 0, 0
    while i < len(d) - 8:
        ln = struct.unpack(">I", d[i:i + 4])[0]
        typ = d[i + 4:i + 8]
        if typ == b"IHDR":
            w, h, bd, ct = struct.unpack(">IIBB", d[i + 8:i + 18])
        elif typ == b"IDAT":
            idat += d[i + 8:i + 8 + ln]
        elif typ == b"IEND":
            break
        i += 12 + ln
    ch = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}.get(ct)
    if ch is None or bd != 8 or not idat:
        return None
    raw = zlib.decompress(idat)
    stride, out, prev, p = w * ch, bytearray(), bytearray(w * ch), 0
    for _ in range(h):
        f = raw[p]; p += 1
        line = bytearray(raw[p:p + stride]); p += stride
        for x in range(stride):
            a = line[x - ch] if x >= ch else 0
            b = prev[x]
            c = prev[x - ch] if x >= ch else 0
            if f == 1: line[x] = (line[x] + a) & 255
            elif f == 2: line[x] = (line[x] + b) & 255
            elif f == 3: line[x] = (line[x] + (a + b) // 2) & 255
            elif f == 4:
                pp = a + b - c
                pa, pb, pc = abs(pp - a), abs(pp - b), abs(pp - c)
                line[x] = (line[x] + (a if (pa <= pb and pa <= pc) else (b if pb <= pc else c))) & 255
        out += line; prev = line
    return ch, bytes(out)


def lime_fraction(path):
    """Share of opaque pixels that are the acid-lime accent.

    Counts fully opaque pixels only. Anti-aliased edges between off-white
    linework and transparency drift through intermediate hues and will read as
    lime if you let them in — which is how a first pass at this reported an
    accent on ten icons that had none.
    """
    got = png_pixels(path)
    if not got:
        return None
    ch, px = got
    lime = opaque = 0
    for i in range(0, len(px) - ch + 1, ch):
        a = px[i + 3] if ch == 4 else (px[i + 1] if ch == 2 else 255)
        if a < 200:
            continue
        r, g, b = (px[i], px[i + 1], px[i + 2]) if ch >= 3 else (px[i],) * 3
        opaque += 1
        if g > 190 and b < 160 and g > r > 120:
            lime += 1
    return (lime / opaque) if opaque else 0.0

total_new = total_upd = total_warn = 0

for flow in FLOWS:
    print(f"\n=== {flow['name']} ===")
    if not os.path.isdir(flow["src"]):
        print(f"  source folder not found: {flow['src']}")
        continue
    os.makedirs(flow["dst"], exist_ok=True)

    want = manifest(flow["manifest"], flow["ext"])
    seen, new, upd, warn = set(), [], [], []

    for entry in sorted(os.listdir(flow["src"])):
        if not entry.lower().endswith(flow["ext"]):
            continue
        src = os.path.join(flow["src"], entry)
        stem, ext = os.path.splitext(entry)
        clean = SUFFIX.sub("", stem) + ext.lower()
        if clean != entry:
            warn.append(f"{entry} -> renamed to {clean}")

        if want and clean not in want:
            warn.append(f"{clean}: not in the brief — check the filename")
            continue
        seen.add(clean)

        info = sips(src, "pixelWidth", "pixelHeight", "hasAlpha")
        got = f"{info.get('pixelWidth','?')}x{info.get('pixelHeight','?')}"
        exp = want.get(clean)
        if exp and got != exp:
            warn.append(f"{clean}: {got}, brief says {exp}")
        if flow.get("accent"):
            frac = lime_fraction(src)
            if frac is None:
                warn.append(f"{clean}: could not decode — is it really a PNG?")
            elif frac < 0.002:
                warn.append(f"{clean}: NO LIME ACCENT — every opaque pixel is the "
                            f"linework colour; the brief asks for one lime element")
            elif frac > 0.30:
                warn.append(f"{clean}: {frac:.0%} lime — the accent should be one "
                            f"element, not the whole icon")
        if flow["alpha"] and info.get("hasAlpha") != "yes":
            warn.append(f"{clean}: NO ALPHA CHANNEL — will render as a solid "
                        f"block on the tile; regenerate with a transparent background")

        dst = os.path.join(flow["dst"], clean)
        if not os.path.exists(dst):
            new.append(clean)
            if APPLY:
                shutil.copy2(src, dst)
        elif os.path.getsize(dst) != os.path.getsize(src) or \
                os.path.getmtime(src) > os.path.getmtime(dst):
            upd.append(clean)
            if APPLY:
                shutil.copy2(src, dst)

    for f in new:
        print(f"  NEW   {f}")
    for f in upd:
        print(f"  UPD   {f}")
    for w in warn:
        print(f"  WARN  {w}")

    # Report against what is installed, not against what happens to be sitting
    # in Drive — the folder gets emptied once files are pulled in, and a count
    # of Drive would then claim everything is still outstanding.
    installed = set(os.listdir(flow["dst"])) if os.path.isdir(flow["dst"]) else set()
    print(f"  -- {len(new)} new, {len(upd)} updated, {len(warn)} warning(s)")
    if want:
        done = [n for n in want if n in installed]
        todo = [n for n in want if n not in installed]
        print(f"  -- {len(done)} of {len(want)} installed in {os.path.relpath(flow['dst'], HERE)}")
        if todo:
            print(f"  -- still to make: {', '.join(todo[:8])}"
                  + (f" +{len(todo)-8} more" if len(todo) > 8 else ""))
    total_new += len(new); total_upd += len(upd); total_warn += len(warn)

print(f"\n{total_new} new, {total_upd} updated, {total_warn} warning(s)")
if not APPLY and (total_new or total_upd):
    print("dry run — nothing copied. Re-run with --apply to commit the copy.")
elif APPLY and (total_new or total_upd):
    print("copied. Now: npm run build && python3 audit.py")
