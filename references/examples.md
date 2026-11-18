# Example guide

Inspect the image links with your image-viewing tool and read the relevant `scenes.js` before adapting an idea. Start with the new Reel examples; reach into the original website examples for a different physical metaphor. Do not copy captions or religious claims into an unrelated topic.

| Example | Inspect | What it teaches |
|---|---|---|
| Europe and Eurasia | [video](../examples/europe-continent/output/europe-continent.mp4), [cover](../examples/europe-continent/output/cover.png), [sheet](../examples/europe-continent/output/contact-sheet.png), [scenes](../examples/europe-continent/scene-drawings.js), [sources](../examples/europe-continent/SOURCES.md) | An already-open hook map, walking on real coastlines, two-person map holding, a pencil following the boundary, a consistent brimmed-hat companion, centered region labels, EURASIA labels below books and a closing question. Ten scenes and thirty checked hand contacts. The conditional definition and geography sources belong to this specific script. |
| Focus, not busyness | [cover](../examples/focus/output/cover.png), [sheet](../examples/focus/output/contact-sheet.png), [scenes](../examples/focus/scenes.js), [timing](../examples/focus/content.json) | A new general topic: a reader carries a task into lamplight; a helper carries the other cards to a later tray while the reader pencils a checkmark. A visible result carries the idea without pointless pointing. |
| Rain in context | [cover](../examples/rain-context/output/cover.png), [sheet](../examples/rain-context/output/contact-sheet.png), [scenes](../examples/rain-context/scenes.js), [sources](../examples/rain-context/SOURCES.md) | An umbrella attached to the hand, rain and moving plants, contrasting hardship/relief, then a contextual correction. White background and enlarged scenes. |
| Adraka and yudrika | [cover](../examples/adraka-yudrika/output/cover.png), [sheet](../examples/adraka-yudrika/output/contact-sheet.png), [scenes](../examples/adraka-yudrika/scenes.js), [sources](../examples/adraka-yudrika/SOURCES.md) | A question followed by an explanation versus a sealed answer. Native question variants prevent premature reveals. Arabic quotations, timed English captions and several different props across one story. |
| Adraka and yudrika — remake | [cover](../examples/adraka-yudrika-remake/output/cover.png), [sheet](../examples/adraka-yudrika-remake/output/contact-sheet.png), [scenes](../examples/adraka-yudrika-remake/scenes.js) | Same approved script and exact recording, rebuilt after studying the originals: unfold a note, open a book, carry a lantern/backpack, draw out a month scroll, lift a telescope, pull a star chart, hang a page and share it with a reading partner. Eleven native scenes and fourteen registered contacts; no button-driven reveals. |

Each complete example includes a playable MP4, editable content, script, local fonts/runtime and prepared narration. Their scene vocabulary is reusable; their wording is specific to their topics. Focus is a small demonstration, not a scientific claim about productivity. Its bundled voice was generated with the macOS Samantha voice; using the recording does not require macOS. The Europe and Arabic examples use Gemini 3.8/Charon, and rain uses a macOS system voice with quiet generated effects.

## Original stick-scene references

The complete 32-scene source inventory is [here](gallery/inventory.json). The overview review covers all 32 at 20%, 50% and 80% of their native action in [sheet 1](gallery/actions-1.png), [sheet 2](gallery/actions-2.png), [sheet 3](gallery/actions-3.png) and [sheet 4](gallery/actions-4.png). These overview stills show range; they do not establish clean motion or all per-play variants. The detailed [action study A](actions-a.md) and [action study B](actions-b.md) add source-level timings, attachment patterns and selected denser visual checks. Read the relevant entries and source before adapting them.

The five original scene-source files are included under [examples/upstream](../examples/upstream/), with Kamran Ahmed's MIT notice retained. They are website-scale scenes, not vertical-video templates:

- [diffity-review.js](../examples/upstream/diffity-review.js): a request, a pause, a response and approval; two figures, clear props and a visible payoff.
- [diffity-agents.js](../examples/upstream/diffity-agents.js): hanging labels, a spotlight and purposeful emphasis.
- [diffity-loop.js](../examples/upstream/diffity-loop.js): multiple connected stages and delayed responses.
- [scenes-p3.js](../examples/upstream/scenes-p3.js): converter/crank, stack, conveyor, gate, database growth, printer and hanging frames. Search `yaml-sample`, `github`, `mongo-playground`, `db-playground`, or `awesome-minimal-sites`.
- [scenes-p4.js](../examples/upstream/scenes-p4.js): clerk, porter, letter catcher, card swiper, time machine, queue, sign fitter, puppeteer, font smith and camera operator. Search `local-ses`, `claude-queue`, `claude-statusline`, `balsamiq`, or `video-demo`.

Render any relevant scene with the bundled `frames.mjs`/`motion.mjs` tools before borrowing its pose. Original helpers can have slightly different arguments from runtime helpers; read the top of that source file. Preserve the original credit when reusing substantial code. See [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md).
