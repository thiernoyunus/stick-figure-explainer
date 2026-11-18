# Third-party notices

Stick Figure Explainer builds on [stick-scene](https://github.com/nilbuild/stick-scene) by Kamran Ahmed. It is an adaptation for narrated social videos, not an official release of the original project.

- `runtime/stick.js`, `templates/scene.js`, `templates/preview.html`, `examples/upstream/`, and the original portions of `references/craft.md`, `scripts/frames.mjs` and `scripts/motion.mjs` are from that MIT-licensed project. The runtime is retained unchanged. The scripts are adapted to use the package-local Playwright and portable browser selection. The full original MIT notice is in `runtime/LICENSE` and accompanies example/project runtime copies.
- [Balsamiq Sans](https://github.com/google/fonts/tree/main/ofl/balsamiqsans) and [Noto Sans Arabic](https://github.com/google/fonts/tree/main/ofl/notosansarabic) are bundled under the SIL Open Font License 1.1. Their full notices are in `assets/fonts/Balsamiq-OFL.txt` and `assets/fonts/NotoArabic-OFL.txt`, and accompany example/project copies. The font files have not been modified.
- The Europe example uses the public-domain [Natural Earth 1:110m land data](https://www.naturalearthdata.com/downloads/110m-physical-vectors/110m-land/). The original GeoJSON and derived map data accompany it; see [Natural Earth terms](https://www.naturalearthdata.com/about/terms-of-use/) and the example’s `SOURCES.md`.
- Playwright is installed as a dependency under its own license; it and Chromium are not checked into this repository. FFmpeg is a separately installed tool, not redistributed here.

New instructions, composition tools and example source additions are released under the repository's MIT license. Example narration and exports are included as demonstration assets. No API credentials or user conversation logs are included.
