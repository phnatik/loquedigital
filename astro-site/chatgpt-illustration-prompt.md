# ChatGPT — top-level prompt for the /build service icons

Paste the block below **once**, at the start of a new chat. Then send the outstanding
`prompt` cells from `illustration-brief.csv` one at a time, in order.

Keep it all in **one conversation** — consistency across the set comes from
ChatGPT being able to see what it already made. If the look drifts, re-paste
this block rather than trying to correct in prose.

---

```
You are producing a set of 35 icon illustrations for one website. They will sit
side by side on the same page, so they must look like one set drawn by one hand
on one day — not 35 individually good icons.

THE SPEC — every icon, no exceptions:

Format
- 1024×1024, square, PNG with a FULLY TRANSPARENT background.
- The artwork is centred with even margin, occupying about 80% of the frame.
- No background fill of any kind. Not white, not off-white, not a subtle tint.
- No container: no circle, no rounded square, no badge, no card, no frame,
  no border behind or around the icon.

Drawing
- Flat vector-style line illustration. Geometric, constructed, deliberate.
- One single even stroke weight throughout — as if drawn at 3px on a 64px grid.
- Generously rounded caps and joins.
- Three or four shapes maximum. These are read at 46 pixels on the page, so
  anything finer than that disappears. When in doubt, remove a shape.

Colour — exactly two, and no others
- Linework: warm off-white #E8E7E0.
- Accent: acid lime #D2FF4D, used on EXACTLY ONE element per icon. Each prompt
  names which element gets it. Never accent two things.
- No gradients, no shading, no fills other than these two, no drop shadows,
  no outer glow, no highlights, no texture, no grain.

Never
- No text, no letters, no numbers, no labels, no logos, no watermarks. This is
  the constraint most likely to be broken and it makes an icon unusable. If a
  subject seems to want a word on it, leave that surface blank.
- Not a photograph. Not 3D. Not isometric. Not skeuomorphic. Not hand-drawn,
  sketchy, painterly, or textured. Not a sticker. Not neon.

HOW WE WILL WORK
1. I send one short subject description at a time. Each names the shapes and
   names which single element takes the lime accent.
2. You return one icon for it, in the spec above. One image, not a sheet of
   variations, not a grid.
3. Match every icon to the FIRST one you make — same stroke weight, same
   optical size, same margin, same corner radius, same level of detail.
4. Do not add commentary, do not restate the prompt, and do not add elements
   I did not ask for.

BEFORE YOU OUTPUT, CHECK
- Is the background actually transparent, with nothing behind the artwork?
- Is there a container shape I added without being asked? Remove it.
- Are there exactly two colours, with lime on exactly one element?
- Is there any text, lettering or numeral anywhere? Remove it.
- Is the stroke weight identical to the previous icons in this chat?
- Would this still read at 46 pixels wide?

Reply "ready" and I'll send the first.
```

---

## Working notes

**Generate `email-classification.png` first.** It's marked as the reference in
the sheet. Everything after it is matched to it, so if it isn't right, fix it
before going on — otherwise 32 icons inherit the problem.

**On "readable at 46 pixels".** The tiles now render the icons at 138px, not 46.
The line in the spec is deliberately left alone anyway: it is what keeps them to
three or four shapes, and the first ten were drawn under it. Loosening it now
would make the remaining twenty busier than the ten already done, which is worse
than either level of detail applied consistently. Keep the spec as written.

**The three that fight back.** Calendar grids attract date numerals, clock faces
attract hour numbers, and anything with "notes" or "script" attracts real
lettering. `cal-focus`, `cal-audit`, `hw-cards` and `email-digest` carry notes
in the sheet about this. Zoom in before accepting them.

**If a background comes back anyway**, say exactly this and it usually fixes it:

> Regenerate with a fully transparent background. Remove the circle/panel behind
> the icon entirely — the artwork should float with nothing behind it.

**Where they go.** Save each as the `filename` from its row and put them in the
Drive folder:

> *Marketing / Loque Website Redesign / Loque Agent / LQAgent Photos / **Build Your Own***
> — `drive.google.com/drive/folders/1ZOHqiZ4UjNUet89fsU_uiMXl1VLRrXWe`

Then from `astro-site/`:

```
python3 sync-assets.py            # dry run — what it found, what it would copy
python3 sync-assets.py --apply    # copy them into src/assets/svc/
npm run build
```

The tiles pick them up with no code change. `sync-assets.py` strips the ` (1)`
suffix a re-download picks up, checks each name against the brief, checks the
dimensions, and — the one that matters here — **flags any PNG without an alpha
channel**. An opaque icon renders as a solid pale block on a dark tile, which
is not obvious until the page is in front of you.

**Checking your work.** `python3 audit.py` from `astro-site/` lists which slots
are still empty.
