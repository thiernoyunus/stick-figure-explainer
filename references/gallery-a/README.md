# Detailed action-state evidence

Companion to [actions-a.md](../actions-a.md). Seven selected scenes, **60 rendered states**, all seven sheets opened and visually inspected. These are detailed preparation/contact/release/result samples, not the global three-state atlas. Generated from the unmodified bundled upstream source using the original stick-scene `frames.mjs`, headless Chrome, four columns, 420 × 250 CSS pixels per scene and device scale 2. All seven render commands exited 0 with no reported page/console errors. Date: 2026-11-18.

All seven original `motion.mjs` checks also exited 0 and reported “motion is clean,” sampling at 60 fps on the default play. Raw reports are linked below. This does **not** certify all 16 scenes, every repeat variant, actual hand-to-prop contact, smooth object motion, absence of overlap, phone composition, narration or religious accuracy. The checker passes even where the sheets show a receipt or picture touching/overlapping a head.

A separate [receipt-release measurement](throw-release.json) sampled the actual returned front hand just before release at 3.16 seconds. At fixed scene clock 3 and default play, the held centre was approximately `[16.29,-96.20]`; the free flight starts at `[15,-98]`, a small **2.21-stage-unit** change. This is a selected numeric continuity finding, not a checker failure or a complete contact test. Match the release to the actual grip when changing the figure, prop or facing direction.

The original tool's runtime and the bundled [runtime](../../runtime/stick.js) had identical SHA-256 fingerprints when these sheets were made. The original frame tool uses the same frame specification and preview layout as the bundled tool. The public commands below use bundled paths; no original skill installation is required after package setup. Font availability can change exact text rendering: the native runtime can request Balsamiq Sans from Google Fonts. This is not an offline Reel-export test.

## Inspected evidence

`idle:0` is a resting state. `s:3.14` is 3.14 seconds into the action. Read cells left to right, then top to bottom. Action samples use the frame tool's fixed `S.t=3`; this freezes clock-driven breathing, flag sway, rotor phase and similar motion. Differences in `T` show the action sequence, but do not visually prove those continuous secondary motions. The motion checker uses its own sequential sampling. Repeat number is the default 0; later name/post/database variants were not exhaustively rendered.

| Scene / sheet | Exact sampled states | Observed findings | Motion report |
|---|---|---|---|
| `p:aws-cost-cli` · [throw-receipt.png](throw-receipt.png) | `idle:0,s:2.2,s:2.8,s:2.98,s:3.14,s:3.2,s:3.45,s:4.35` | Catch, turn, wind-up, receipt released/spinning, acknowledgement. At 3.14 receipt overlaps head; tiny bill columns crowd its total. | [report](throw-receipt-motion.txt) |
| `p:makers.ae` · [carry-and-companions.png](carry-and-companions.png) | `idle:0,s:0.85,s:1.8,s:2.15,s:2.65,s:3.25,s:4.2,s:5.6` | Visitors carry/show different objects; drone leaves and returns; synchronized cheer. Laptop near head at cheer, returning drone close to head at 4.2. Arrival/departure edges crop/fade visitors by design. | [report](carry-and-companions-motion.txt) |
| `p:mongo-playground` · [grow-and-react.png](grow-and-react.png) | `idle:0,s:1.15,s:1.65,s:2.0,s:2.5,s:3.1,s:3.8,s:4.8` | Small plant, travelling signal, growing leaf, three staggered branch labels, delayed cheer, readable hold. Enter gesture is high near display. | [report](grow-and-react-motion.txt) |
| `p:yaml-sample` · [feed-and-crank.png](feed-and-crank.png) | `idle:0,s:0.8,s:1.12,s:1.8,s:2.5,s:3.15,s:4.7,s:5.8` | Hand-held input switches to insertion path; crank grip changes; output rises; back hand collects refill. JSON output visible in idle; not an unrevealed starting state. | [report](feed-and-crank-motion.txt) |
| `p:data structures in JS` · [lift-stack-retrieve.png](lift-stack-retrieve.png) | `idle:0,s:0.5,s:1.1,s:1.5,s:2.3,s:3.1,s:3.55,s:4.2` | Block 4 lifts, rests on stack, hands withdraw, block returns to hand. High path passes beside head; exact two-hand contact is not certified. | [report](lift-stack-retrieve-motion.txt) |
| `p:awesome-minimal-sites` · [lift-hang-straighten.png](lift-hang-straighten.png) | `idle:0,s:0.48,s:0.85,s:1.25,s:1.6,s:2.22,s:2.8,s:4.4` | Bend, collect, lift, hang tilted, tap straight, admire, rail shifts. Frame touches/overlaps head during lift/straightening. | [report](lift-hang-straighten-motion.txt) |
| `diffity-review` · [request-fix-approve.png](request-fix-approve.png) | `idle:0,s:0.8,s:1.7,s:2.8,s:3.7,s:4.7,s:5.2,s:5.5,s:5.9,s:6.5,s:7.1,s:7.2` | Request → flight → waiting → returned fix/reply → approval → cheer. At 7.1 old red line returns beneath the fading green; approval scales larger while fading. At 7.2 board resets. No held stamp tool. | [report](request-fix-approve-motion.txt) |

## Reproduce selected sheets

From the `stick-reel` package root, after its documented dependency/browser setup:

```sh
node scripts/frames.mjs --scene 'p:aws-cost-cli' --src examples/upstream/scenes-p3.js --frames 'idle:0,s:2.2,s:2.8,s:2.98,s:3.14,s:3.2,s:3.45,s:4.35' --fw 420 --fh 250 --cols 4 --out references/gallery-a/throw-receipt.png
node scripts/frames.mjs --scene 'p:makers.ae' --src examples/upstream/scenes-p3.js --frames 'idle:0,s:0.85,s:1.8,s:2.15,s:2.65,s:3.25,s:4.2,s:5.6' --fw 420 --fh 250 --cols 4 --out references/gallery-a/carry-and-companions.png
node scripts/frames.mjs --scene 'p:mongo-playground' --src examples/upstream/scenes-p3.js --frames 'idle:0,s:1.15,s:1.65,s:2.0,s:2.5,s:3.1,s:3.8,s:4.8' --fw 420 --fh 250 --cols 4 --out references/gallery-a/grow-and-react.png
node scripts/frames.mjs --scene 'p:yaml-sample' --src examples/upstream/scenes-p3.js --frames 'idle:0,s:0.8,s:1.12,s:1.8,s:2.5,s:3.15,s:4.7,s:5.8' --fw 420 --fh 250 --cols 4 --out references/gallery-a/feed-and-crank.png
node scripts/frames.mjs --scene 'p:data structures in JS' --src examples/upstream/scenes-p3.js --frames 'idle:0,s:0.5,s:1.1,s:1.5,s:2.3,s:3.1,s:3.55,s:4.2' --fw 420 --fh 250 --cols 4 --out references/gallery-a/lift-stack-retrieve.png
node scripts/frames.mjs --scene 'p:awesome-minimal-sites' --src examples/upstream/scenes-p3.js --frames 'idle:0,s:0.48,s:0.85,s:1.25,s:1.6,s:2.22,s:2.8,s:4.4' --fw 420 --fh 250 --cols 4 --out references/gallery-a/lift-hang-straighten.png
node scripts/frames.mjs --scene 'diffity-review' --src examples/upstream/diffity-review.js --frames 'idle:0,s:0.8,s:1.7,s:2.8,s:3.7,s:4.7,s:5.2,s:5.5,s:5.9,s:6.5,s:7.1,s:7.2' --fw 420 --fh 250 --cols 4 --out references/gallery-a/request-fix-approve.png
```

For sequential motion checks, use `node scripts/motion.mjs --scene 'SCENE_ID' --src examples/upstream/scenes-p3.js`, substituting the actual id and using `diffity-review.js` for that scene. Read findings separately from the sheets; rechecking after adaptation is required.

## Source fingerprints at capture

Paths below are relative to the package root. Fingerprints identify the inspected version if these originals change later.

| File | SHA-256 |
|---|---|
| [examples/upstream/scenes-p3.js](../../examples/upstream/scenes-p3.js) | `3af6032e6217a7e19b9e3cf09db0d802f13e176748d2804743ae99fc8e0c8d95` |
| [examples/upstream/diffity-review.js](../../examples/upstream/diffity-review.js) | `0220fc2010a1698397b230afd6db480bd85eb0f40a732c418ad3b418194c4978` |
| [runtime/stick.js](../../runtime/stick.js) | `e489c2f5ec58dda2ef7251a6a70e5c669126a9cfc77d492e0d3b1b55af529ae6` |

The scenes and runtime retain their [upstream attribution and license notice](../../THIRD_PARTY_NOTICES.md). New files here record inspection evidence; they do not change the originals or the core skill.
