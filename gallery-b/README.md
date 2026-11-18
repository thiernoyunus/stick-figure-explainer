# Four detailed action sheets

Companion to [the complete B action study](../references/actions-b.md). All four sheets were rendered using the package's unchanged `scripts/frames.mjs` and its installed Playwright/Chromium, then opened and visually inspected. All four commands exited 0 with no reported browser errors. Each sheet has twelve frames in three columns, at 520 × 270 CSS pixels per scene and device scale 2. PNG dimensions and source fingerprints are in [evidence.json](evidence.json).

## What the images confirm

| Sheet | Inspected evidence | Reuse finding |
|---|---|---|
| [p:mongodumper](mongodumper-detail.png) | 0.6: pickup; 0.95: two-hand cradle; 1.55: low wind-up; 1.7: release position; 1.9/2.2: separated rotating crate; 2.54: crate reaches bucket rim; 2.62: third box and tilted bucket; 3.5: settled result and check; 4.4: reset to two boxes. | The whole body participates. Borrow the wind-up and impact, not just an airborne rectangle. No head is hidden by the crate in these samples. The small initial crate scales up as it is picked up. |
| [p:local-ses](local-ses-detail.png) | 0.75/1.3: incoming letter; 1.37: envelope inside net; 1.57/1.82: held during backward swing; 2.4: lowered net still contains it; 2.5/2.7: letter drops; 2.95/3.6: inbox result; 4.6: original state. | There are distinct catch, retain and release phases. **Original clearance issues:** pole crosses the head at 1.57/1.82; net overlaps the inbox title at 2.4–2.95. Do not carry these overlaps into a new composition. |
| [diffity-loop](diffity-loop-detail.png) | Real 1.5: request typed; 2.3/3.1: thinking and acknowledgment; 4.2: output flood with human recoil; 6.2: board fold transition; 6.7/7.5: notes travel and land; 8.9: feedback plane; 9.7: second thinking hold; 11.2: two fixes; 12.1: all three fixes and human cheer. | Separate actors have visible jobs and delayed responses. Cups stay on desks; the plant keeps the same size. No shared carrying or drinking is shown. Desk keyboards, cups, heads and end labels fit the sampled view. |
| [diffity-agents](diffity-agents-detail.png) | @0: slider travel, opus selected, knob turned, four effort bars, orange robot airborne at 3.92; @1: gpt-5 selected, teal robot airborne with three bars; @2: haiku selected, orange robot airborne with two bars; 6.5/7.6 @0: return and idle. | Selection changes the active character, beam aim and effort level. The other robot dims. The hop is feet leaving a fixed platform, not character growth. All three variants and rail labels fit; bubbles beginning at 3.92 are tiny until their opening animation completes (readable @0 at 4.8). |

## Reproduce from the package root

No installation, changed browser settings or core edits were needed. These commands use relative paths and the package's installed bundled Chromium.

```sh
node scripts/frames.mjs --scene p:mongodumper --src examples/upstream/scenes-p4.js --frames 'idle:0,s:0.6,s:0.95,s:1.55,s:1.7,s:1.9,s:2.2,s:2.54,s:2.62,s:2.85,s:3.5,s:4.4' --fw 520 --fh 270 --cols 3 --out gallery-b/mongodumper-detail.png
node scripts/frames.mjs --scene p:local-ses --src examples/upstream/scenes-p4.js --frames 'idle:0,s:0.75,s:1.3,s:1.37,s:1.57,s:1.82,s:2.4,s:2.5,s:2.7,s:2.95,s:3.6,s:4.6' --fw 520 --fh 270 --cols 3 --out gallery-b/local-ses-detail.png
node scripts/frames.mjs --scene diffity-loop --src examples/upstream/diffity-loop.js --frames 'idle:0,s:1.5,s:2.3,s:3.1,s:4.2,s:6.2,s:6.7,s:7.5,s:8.9,s:9.7,s:11.2,s:12.1' --fw 520 --fh 270 --cols 3 --out gallery-b/diffity-loop-detail.png
node scripts/frames.mjs --scene diffity-agents --src examples/upstream/diffity-agents.js --frames 'idle:0,s:1.3@0,s:2.4@0,s:3.3@0,s:3.92@0,s:4.8@0,s:2.4@1,s:3.92@1,s:2.4@2,s:3.92@2,s:6.5@0,s:7.6@0' --fw 520 --fh 270 --cols 3 --out gallery-b/diffity-agents-detail.png
```

`idle:` samples the resting animation; `s:` is real elapsed action time; `@0`, `@1`, `@2` explicitly set the play variant. In `diffity-loop`, its internal story clock pauses at two points; the `s:` labels still show real elapsed time. Action sheets freeze ambient time at 3 seconds, so breathing/steam/blink/sway do not advance naturally across cells. Source code establishes those motions; these images establish sampled poses and object states.

## Review limits

This is source study of sixteen scenes and **sampled visual inspection of four**, not continuous playback or a clean motion-check report. No original scene was altered to conceal a flaw. No Quran remake, narration change, religious fact-check, full-Reel export, mobile layout verification or package-wide regression test was performed for this reference-only contribution. The storyboard suggestions are in the action study for the lead to implement within its own file ownership.
