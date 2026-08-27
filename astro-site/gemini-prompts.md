# Gemini prompt sheet — Loque Agent website imagery

37 images to generate, 3 that must be shot for real (listed at the end).

Save each result as the filename in its heading, then drop them all into `astro-site/public/img/`.

---

## Step 1 — paste this once, at the start of the session

```
You are art-directing a single coherent set of photographs for one website. Every image must look like it came from the same photographer, on the same day, with the same camera and the same grade.

THE HOUSE STYLE — apply to every image without exception:
- Editorial photography. Photorealistic. Never illustration, 3D render, or cartoon.
- Palette: muted and desaturated — warm neutrals, charcoal grey, soft olive green. No bright saturated colour.
- Light: one soft directional source with gentle falloff into shadow. Deliberately slightly underexposed; these sit on a near-black page, so shadow detail should fall away rather than being lifted.
- Lens: 50mm prime rendering, shallow depth of field, fine natural film grain.
- Composition: calm and uncluttered, with generous negative space. One subject per frame.
- Absolutely no text anywhere in frame — no lettering, words, numbers, signage, logos, labels or watermarks. No readable screens or documents. This is the single most important constraint; any legible text makes the image unusable.
- No recognisable faces and nobody looking at the camera. No stock-photo posing.
- No HDR, no heavy vignette, no oversaturation.

I will send you one image description at a time. For each one, produce a single photograph in the house style above, at the aspect ratio I specify. Do not add text or graphic overlays of any kind. Confirm you understand, and I'll send the first.
```

---

## Step 2 — then send these one at a time

Each already carries the house style, so any one of them also works standalone in a fresh chat.

### /

**1. `home-practices.jpg`** — generate at 4:5 (1400x1750)

```
A street of low-rise professional office buildings at dawn, shot from across the road. Empty pavement, cool blue-grey light before the sun is properly up, one warm window lit. Deliberately non-specific — it could be any professional district in any mid-size city. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a tall portrait cell — keep the subject centred vertically. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> Sets the tone for the whole site; generate this one first and match the others to it.

**2. `home-overflow.jpg`** — generate at 16:9 (2400x1350)

```
A desk photographed from directly overhead where paper has outgrown the surface — stacked folders, loose sheets overlapping at angles, a phone face-down at the edge. Tight framing, slightly claustrophobic, everything blank and unreadable. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Displays at 16:9 with minimal cropping. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> The only frame on the site allowed to feel cluttered. Everything else is calm.

### /legal

**3. `legal-world.jpg`** — generate at 16:9 (2560x1440)

```
The interior of a working law office late at night. A single desk lamp throws warm light across stacked case folders and a legal pad; the rest of the room falls into deep shadow. Bookshelves suggested rather than shown. No people. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a 21:8 letterbox from the centre — keep the subject centred with room above and below. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**4. `legal-drain-stack.jpg`** — generate at 16:9 (1800x1010)

```
A tall stack of unopened mail and closed folders shot from the side, edge-on and very close, so the frame is mostly layered paper edges receding into shadow. Reads as accumulation. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a wide, short cell — keep the subject centred horizontally. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**5. `legal-drain-clock.jpg`** — generate at 16:9 (1800x1010)

```
A wall clock in a dim office, cropped so only part of the dial and the hands are visible, hands indicating a late hour. Everything else falls to black. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a wide, short cell — keep the subject centred horizontally. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> Ensure no numerals render as garbled text — a plain baton dial is safer.

**6. `legal-gain-hands.jpg`** — generate at 4:3 (1600x1200)

```
A pair of hands closing a plain manila folder on a clear desk, shot close from a low angle. Sleeves and cuffs only, no face. Warm light, blank folder tab. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**7. `legal-gain-light.jpg`** — generate at 4:3 (1600x1200)

```
Late afternoon sunlight falling in a hard diagonal across an empty wooden desk surface. The grain of the wood and a single pen are the only subjects. Almost abstract. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**8. `legal-gain-door.jpg`** — generate at 4:3 (1600x1200)

```
An office door being pulled closed from the outside, warm hallway light spilling through the narrowing gap. A hand on the handle, no face. Reads as leaving on time. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

### /healthcare

**9. `healthcare-world.jpg`** — generate at 16:9 (2560x1440)

```
A quiet clinic corridor between appointments. Closed exam room doors recede down one side, soft daylight from a window at the far end, an empty rolling stool in the foreground. Calm and warm rather than clinical-cold. No people. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a 21:8 letterbox from the centre — keep the subject centred with room above and below. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> No signage anywhere — clinic corridors are where models hallucinate text.

**10. `healthcare-drain.jpg`** — generate at 16:9 (2400x1350)

```
An empty clinic waiting room after hours. Rows of chairs, half the overhead lights off, blue evening light through the windows. Still and slightly cold. No people. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Displays at 16:9 with minimal cropping. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**11. `healthcare-gain-hands.jpg`** — generate at 4:3 (1600x1200)

```
A clinician's hands at rest, folded on a clear desk. Plain cuffs, no watch, no badge, no face in frame. Soft warm light. Unhurried. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**12. `healthcare-gain-window.jpg`** — generate at 4:3 (1600x1200)

```
Soft daylight through a window falling onto an empty desk surface, the window frame throwing a gentle shadow. Nothing clinical in frame. Quiet and warm. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**13. `healthcare-gain-coat.jpg`** — generate at 4:3 (1600x1200)

```
A white coat hanging on a hook at the end of the day, shot close so only fabric, shoulder and hook are visible. No badge, no embroidery, no lettering. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> The coat must be completely unmarked.

### /professional-services

**14. `professional-services-world.jpg`** — generate at 16:9 (2560x1440)

```
A glass-walled meeting room seen from the corridor outside, late in the day. Chairs pushed back at angles, one laptop still open on the table, lights low. Cool architectural light, strong horizontal lines. No people. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a 21:8 letterbox from the centre — keep the subject centred with room above and below. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**15. `professional-services-drain-threads.jpg`** — generate at 16:9 (1800x1010)

```
A phone lying face-up on a desk, its screen showing a dense stack of notification cards, photographed at a steep angle and out of focus so nothing is legible. Only the shape and volume of the stack reads. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a wide, short cell — keep the subject centred horizontally. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> Blur the screen heavily — legibility is the failure mode here.

**16. `professional-services-drain-desk.jpg`** — generate at 16:9 (1800x1010)

```
A desk at the end of a difficult day — a laptop, a tablet and a phone all open at once, papers fanned between them with no order to any of it. Cool late light. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a wide, short cell — keep the subject centred horizontally. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**17. `professional-services-gain-table.jpg`** — generate at 4:3 (1600x1200)

```
Two coffee cups on an otherwise completely empty meeting table, shot close with soft window light behind them. Steam just visible. The conversation, not the admin around it. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**18. `professional-services-gain-glass.jpg`** — generate at 4:3 (1600x1200)

```
An abstract detail of daylight through an office glass partition — overlapping reflections, soft geometry, a vertical mullion. No people, no furniture. Almost pure texture. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**19. `professional-services-gain-notes.jpg`** — generate at 4:3 (1600x1200)

```
A closed notebook with a pen clipped to its cover, alone on a clear desk. Shot close at a slight angle. Plain unmarked cover. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

### /real-estate

**20. `real-estate-world.jpg`** — generate at 16:9 (2560x1440)

```
The exterior of a suburban house at golden hour, shot wide and slightly low from across the front lawn. Warm raking light on the facade, long shadows, lights just coming on inside. Calm and aspirational. No people, no signage. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a 21:8 letterbox from the centre — keep the subject centred with room above and below. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> Briefed originally with a 'sold' sign — dropped it, since a sign means text.

**21. `real-estate-drain-phone.jpg`** — generate at 16:9 (1800x1010)

```
A phone held in one hand showing a long list of calls or messages, angled away from the lens and thrown out of focus so nothing is readable. Only the rhythm of the list reads. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a wide, short cell — keep the subject centred horizontally. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**22. `real-estate-drain-paper.jpg`** — generate at 16:9 (1800x1010)

```
Contract pages fanned across a car passenger seat in flat daylight, overlapping at angles. Volume is the subject; every page blank and unreadable. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a wide, short cell — keep the subject centred horizontally. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**23. `real-estate-gain-keys.jpg`** — generate at 4:3 (1600x1200)

```
A set of house keys on a plain kitchen countertop, shot close in warm afternoon light with a long soft shadow. Nothing else in frame. No keyring tag. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**24. `real-estate-gain-road.jpg`** — generate at 4:3 (1600x1200)

```
The view through a car windscreen down an ordinary tree-lined residential street, softly out of focus, late afternoon light. Dashboard just visible at the bottom of the frame. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**25. `real-estate-gain-porch.jpg`** — generate at 4:3 (1600x1200)

```
A front door and porch light at dusk, cropped close so only the door, the light and a little of the frame are visible. Warm and domestic. No house number. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> No house number — that is text.

### /executives

**26. `executives-world.jpg`** — generate at 16:9 (2560x1440)

```
A corner office at dusk with floor-to-ceiling glass, city lights beginning to come on beyond it. The desk is almost clear. The room is dark; the city is the only light source. Empty, or one figure at the window seen only as a silhouette. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a 21:8 letterbox from the centre — keep the subject centred with room above and below. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**27. `executives-drain-calendar.jpg`** — generate at 16:9 (1800x1010)

```
A screen showing a calendar week packed wall-to-wall with coloured blocks, photographed at a steep angle and out of focus. Only the density of the blocks reads, no labels. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a wide, short cell — keep the subject centred horizontally. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> Blur heavily. Calendar labels are a classic garbled-text failure.

**28. `executives-drain-late.jpg`** — generate at 16:9 (1800x1010)

```
A single desk lamp burning as the only light in an otherwise dark office, shot from across the room. Deep shadow filling most of the frame. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a wide, short cell — keep the subject centred horizontally. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**29. `executives-gain-pen.jpg`** — generate at 4:3 (1600x1200)

```
A fountain pen resting on a closed leather folio, shot close in soft directional light. Considered, unhurried, expensive without being showy. No monogram. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**30. `executives-gain-city.jpg`** — generate at 4:3 (1600x1200)

```
City lights at night thrown completely out of focus into soft overlapping circles of warm and cool colour. Pure bokeh texture, no recognisable buildings. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

**31. `executives-gain-chair.jpg`** — generate at 4:3 (1600x1200)

```
An empty office chair turned away from a desk to face a window, seen from behind in low evening light. Reads as thinking time rather than absence. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to roughly 6:5 inside a card grid — keep the subject centred and away from the edges. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

### /proof

**32. `proof-rack.jpg`** — generate at 16:9 (1800x1010)

```
A server rack seen at a sharp angle in a dark room, lit only by rows of small status LEDs and one cool overhead strip. Cabling runs clean and vertical. No labels. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a wide, short cell — keep the subject centred horizontally. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> DECORATIVE ONLY. /proof argues from design properties — this must not be captioned or presented as a photo of your actual infrastructure.

**33. `proof-log.jpg`** — generate at 16:9 (1800x1010)

```
A monitor in a dark room showing a scrolling log or dashboard, shot well off-axis and out of focus so it reads as activity rather than as data. Cool blue-green screen glow. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a wide, short cell — keep the subject centred horizontally. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> DECORATIVE ONLY — same caveat as proof-rack. Text must be unreadable.

### /plans

**34. `plans-build.jpg`** — generate at 16:9 (2560x1440)

```
Index cards pinned in a sequence across a wall, some clearly moved and re-pinned, connected by a loose line. Shot straight on in flat daylight. Every card blank. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a 21:8 letterbox from the centre — keep the subject centred with room above and below. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> Cards must be blank — a wall of cards is a text-hallucination magnet.

### /pricing

**35. `pricing-desk.jpg`** — generate at 16:9 (2400x1350)

```
Two chairs at a small round table by a window, one occupied, seen from a distance and slightly behind so no face is visible. Two coffees on the table. Reads as an agreement being reached, not a sale being closed. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Displays at 16:9 with minimal cropping. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

### /compliance

**36. `compliance-vault.jpg`** — generate at 16:9 (2400x1350)

```
A single heavy closed door in a plain concrete wall, lit from one side, shot straight on. Architectural and restrained. One clean object standing for containment. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Displays at 16:9 with minimal cropping. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> No padlock icons, no hooded figures, no green code rain. Understatement is the point on this page.

### /book

**37. `book-call.jpg`** — generate at 16:9 (2560x1440)

```
A phone lying on a desk beside an open notepad with two short handwritten lines on it, shot from above in soft daylight. Quiet and ordinary. Editorial photograph, clean modern aesthetic. Muted desaturated palette of warm neutrals, charcoal grey and soft olive. One soft directional light source with gentle falloff into shadow, slightly underexposed so the frame sits comfortably on a near-black page. Shallow depth of field, 50mm prime lens rendering, fine natural film grain. Calm uncluttered composition with generous negative space. Photorealistic. Layout crops this to a 21:8 letterbox from the centre — keep the subject centred with room above and below. The frame contains no text, lettering, words, numbers, signage, logos or watermarks anywhere, no readable screens or documents, and no recognisable faces.
```

> The two lines should read as handwriting shapes, not legible words.

---

## Do not generate these — they have to be real

**`about-chris.jpg`** — /about, 3:2 (2000x1333)

REAL PHOTOGRAPH OF CHRIS BARBIERI. Environmental portrait at a desk or on a shop floor — working, not posed against a backdrop. Natural light, muted palette, shallow depth of field to match the generated set.

> DO NOT GENERATE. This is a named real person and the page is captioned with his name. Shoot it.

**`handwritten-card.jpg`** — /handwritten, 16:9 (2560x1440)

REAL PHOTOGRAPH OF A CARD YOU PRODUCED. A finished handwritten card and envelope on a plain surface, shot from directly above in soft raking light. Close enough to read as genuine handwriting; crop so no name or address is identifiable.

> DO NOT GENERATE. The page's entire claim is that the object is physical and really written. An AI image here would be evidence against you if anyone looked closely.

**`handwritten-macro.jpg`** — /handwritten, 3:2 (2400x1600)

REAL MACRO PHOTOGRAPH. The ink itself — a pen stroke on card stock at an angle that catches the ridge where wet ink sits on top of the fibre. Raking light, very shallow depth of field.

> DO NOT GENERATE. This is the shot that proves it is not printed; it has to be the real thing.

