# Europe and Eurasia

A 66.52-second narrated example. Watch [the finished video](output/europe-continent.mp4), inspect [the scene sheet](output/contact-sheet.png), or open the editable preview with `node scripts/preview.mjs examples/europe-continent` from the skill root.

The first frame already shows the unfolded map. The figure then walks on a floor map, companions hold one shared map, a reader opens a book, two figures lift regional labels, and a cartographer pencils a boundary. The blue companion uses the original runtime’s brimmed hat. Asia labels sit over the middle of the Asian mainland; large EURASIA labels sit below the schoolbooks. The ending invites viewers to choose Europe or Eurasia in the comments.

Read [SOURCES.md](SOURCES.md) for the conditional continent definition, historical sources, teaching examples, and map limits. The script does not claim there is one universal definition of continent. Natural Earth coastlines retain nearby Africa; the conventional boundary is schematic.

Edit `scene-drawings.js` and `build-content.py`, then run `python3 examples/europe-continent/build-content.py` from the skill root to rebuild `scenes.js` and `content.json`. The bundled map data is combined into `scenes.js` so native scene tools and contact checks work independently. The prepared `assets/narration.wav` works without an API key; its Gemini 3.8 / Charon recording is supplied. The bundled closing-question audio is used only to recover its duration when rebuilding the content. Earlier takes, private conversation history and local revision backups are excluded.

All ten scene motions were checked; the final export checked 1,996 frames and 30 hand contacts. Text bounds, decoding, narration playback, pause, seeking and phone layout were checked. See the reports under `output/`. These checks are not a guarantee of every Instagram overlay or factual/voice perfection. No social upload is implied by this example.
