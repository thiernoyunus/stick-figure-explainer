---
name: stick-reel
description: Create narrated vertical explainer videos with hand-drawn stick figures, meaningful prop interactions, timed captions, and checked social-media text placement. Use for a finished stick-figure Reel or Short, rather than an isolated website animation.
license: MIT
---

# Stick Reel

Turn a topic into a finished narrated 9:16 video and an editable browser preview. The package includes its drawing runtime, fonts, examples and export tools; the original stick-scene skill does not need to be installed.

## Start with the story

Read [creative.md](references/creative.md) and the [example guide](references/examples.md). Inspect the linked example images and relevant scene code before drawing; they teach physical ideas, not a menu of compulsory scenes. For richer actions, consult the [full action study](references/actions-a.md) and [companion/tool study](references/actions-b.md); choose the entries that fit the story. For the drawing API, use [craft.md](references/craft.md). Read [quran.md](references/quran.md) only for Quran or religious content.

Establish the audience, one takeaway, approximate length and voice choice from the request. Offer a concise script first when approval is requested or the message is still being developed. If the user already approved the script or delegated the choices, proceed. Preserve approved words; do not quietly shorten them, change quotations or invent conclusions. Estimate spoken length before promising a duration.

Use a specific hook, a simple explanation, concrete examples and a useful closing thought. Write for listening: connected short sentences, everyday words, no jargon or canned introductions. Each scene should show an idea changing through a physical action. Choose props suited to the subject; don't reuse Quran metaphors for an unrelated topic just because the code exists.

## Create the project

Use this skill folder as `SKILL_DIR` below; resolve its actual installed path. Install dependencies once with `npm ci` and `npx playwright install chromium` from that folder. Node 22+, FFmpeg and FFprobe are required; see [README.md](README.md).

```sh
node "$SKILL_DIR/scripts/new-project.mjs" ./my-reel
```

This creates an editable demo with local fonts and drawing code. Replace its script, scenes and timed content with the user's topic. Keep projects outside the installed skill folder. [project-format.md](references/project-format.md) describes the actual format and commands.

## Record, then time

Read [audio.md](references/audio.md). An existing recording works without a service key; Gemini is optional. Use a speech service only within the user's authorization. Never put keys in project files or a command saved to the repository. Don't substitute a paid service silently or treat silence/a tone as narration.

Generate or import the final recording before finalizing scenes and captions. Listen or inspect a word-timed transcript, check names and non-English phrases, and cut scenes at natural boundaries. A transcript helps locate timings; it does not certify pronunciation. Don't stretch speech or clip its ending to force the planned length.

Set `content.json` to the actual recording's timing, leaving a short closing hold, then import it:

```sh
node "$SKILL_DIR/scripts/prepare-audio.mjs" ./my-reel ./recording.wav
```

## Draw for a phone

Default to 1080 × 1920, white paper, black ink, a few accent colors, large titles and unboxed scenes. Keep important text inside the editable safe rectangle (x=60–960, y=220–1500). This is a roomy organic-video preset, not a promise of ad compliance or every platform layout. Follow a different requested format; explain if it requires adapting this vertical template.

Leave the surrounding video white. Don't add decorative dots, colored margins, outer scene cards or caption panels by habit. Physical cards, books and machines inside a scene are useful props; an outer container that shrinks the whole drawing is unnecessary.

Before drawing, describe each shot as a physical verb, object and result: carry a card to a tray, catch a letter and tip it into an inbox, unfold a note, crank a converter, hang a frame, or hand a request to a companion who responds. A button is appropriate when a button explains the idea; do not default every thought to walk → click → reveal. Add a companion when they have a distinct useful role, not just to occupy space.

Hands rest at the sides unless doing something. For active hands, draw reachable handles, tabs, pages or objects and aim at their real coordinates with `lp()`. Draw props behind figures; use the returned hand position for held objects. A thrown object stays attached until release, then travels from that actual hand along an arc; a catch meets it at the receiving hand. No pointing into empty space. Use anticipation, follow-through, a small settling wobble, and a delayed reaction where they follow from the action. Decorative objects alone do not make a scene lively. Hold the visible result long enough to read. Change scenes when the idea changes, not merely to add motion.

## Check and export

Run the scene tools for every new or modified scene and inspect every resulting sheet:

```sh
node "$SKILL_DIR/scripts/frames.mjs" --scene SCENE_ID --src ./my-reel/scenes.js --out ./my-reel/output/SCENE_ID.png
node "$SKILL_DIR/scripts/motion.mjs" --scene SCENE_ID --src ./my-reel/scenes.js
node "$SKILL_DIR/scripts/render.mjs" ./my-reel --check
```

Fix motion findings, cropped drawings, unreadable labels, overlaps and premature reveals. Register active hand targets in `contactChecks`; the exporter measures the real drawn positions. Native checks include the loop reset; Reel shots hold the payoff before cutting.

Inspect the full-Reel contact sheet at phone size, not only the small native scenes. Then export:

```sh
node "$SKILL_DIR/scripts/render.mjs" ./my-reel
node "$SKILL_DIR/scripts/preview.mjs" ./my-reel
```

The exporter checks every frame's painted text bounds, recording duration, browser errors and registered contacts. It writes an MP4, captions, cover, contact sheet, safe-zone image and verification report. A green report does not prove factual claims, timing, aesthetics or pronunciation: review those separately. Play the result with audio, test pause/scrubbing, and inspect desktop and phone widths.

Deliver the video, editable project and material unverified limits. Do not publish unless requested. Safe-zone guides and browser controls belong only to the preview, never the MP4.
