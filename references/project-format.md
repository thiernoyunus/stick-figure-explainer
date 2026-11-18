# Editable project format

A project contains `index.html`, `reel.js`, `scenes.js`, `content.json`, `script.txt`, local `assets/`, and generated `output/`. New-project copies actual files, not links to another person's machine. `scenes.js` registers drawings in `window.SCENES` and uses the unchanged bundled `window.RIG` drawing runtime.

`content.json` has these fields:

| Field | Meaning |
|---|---|
| `title`, `outputFile` | Project label and a plain filename ending in `.mp4` |
| `width`, `height`, `fps` | This starter is 1080×1920; fps is an integer from 1 to 60 |
| `duration` | Total seconds, matching the last beat's end and prepared recording |
| `safe` | `{left:60, top:220, right:960, bottom:1500}` by default |
| `beats` | Contiguous shots starting at zero; no gaps or overlaps |
| `contactChecks` | Active hand measurements described below; empty only when no contacts need checking |

Each beat needs a unique `id`, registered `scene`, `eyebrow` string, one or two `title` lines, hex `accent`, `narration` string, `start`, `duration`, `voiceDuration`, `captions`, and `captionStarts`. Optional `arabic` contains up to two fully written lines. `captionStarts` is one relative start time per caption; it begins at zero and increases within the shot. The last caption lasts to the shot's end. `voiceDuration` records the spoken span within the shot; it doesn't trim or generate audio.

`contactChecks` entries look like `["desk-lamp",1.3,[-44,-64]]`. This means: draw that native scene at 1.3 seconds and assert that the first figure's actual front hand meets the target in scene coordinates within 1.5 units. A fourth integer chooses another figure, starting at zero. Put one check at the held part of each active gesture, not during the reach. The scene's `draw` should use `S.u * this.dur` for action time so checks and playback agree.

The template plays each native scene to 4.75 seconds of a six-second cycle, holding its result instead of showing the reset. The reset is still tested separately by `motion.mjs`. If changing native scene duration, adjust the composer's holding time accordingly.

From the installed skill folder:

```sh
node scripts/new-project.mjs /path/to/new-project
node scripts/prepare-audio.mjs /path/to/new-project /path/to/recording.wav
node scripts/render.mjs /path/to/new-project --check
node scripts/render.mjs /path/to/new-project
node scripts/preview.mjs /path/to/new-project 8765
```

These tools accept paths containing spaces. Existing project folders and narration files are not overwritten by initialization/import. Export uses a temporary video and replaces the final video only after its checks pass. `--check` produces sampled stills and checks contacts/text but does not require or verify audio. Full export checks text on every frame. Neither mode automatically checks the factual script or every drawn shape.

Outputs: the chosen MP4 filename, `captions.srt`, `cover.png`, `contact-sheet.png`, `safe-zone-check.png`, and (after full export) `verification.json`. `captions.srt` contains the concise captions specified in the project; it isn't necessarily a verbatim transcript. `verification.json` describes that export, not later edits. Re-export after changing source.

Preview play/pause, scrubbing, current-scene replay and safe-zone toggle are browser features. The MP4 is a normal noninteractive video. The preview server listens on your computer only. Sharing files or uploading the MP4 is a separate action.
