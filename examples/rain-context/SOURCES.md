# Content and production notes

The short makes an observed Qur’anic usage distinction, not the claim that the two words are exact opposites or that matar always means punishment. All English explanations are original paraphrases, not quotations of a translation. Anonymous stick figures are modern teaching illustrations, not depictions of prophets or historical people.

- [Qur’an 7:84](https://quran.com/7/84): matar occurs in a destructive shower; the displayed translation specifies brimstone. The animation uses a framed diagram of stones above empty houses, rather than depicting ordinary water as the punishment.
- [Qur’an 42:28](https://quran.com/42/28): al-ghayth is sent after despair, and the verse explicitly mentions Allah spreading His mercy. This supports the short’s rain-as-relief explanation.
- [Qur’an 4:102](https://quran.com/4/102): matar describes rain causing hardship in the instructions about prayer during danger. This is why the short explicitly corrects “matar always means punishment.”

Sources checked on 17 November 2026. These three passages are examples, not an exhaustive survey of every occurrence or every Arabic word for rain.

## Instagram placement

The export is 1080 × 1920, 9:16. Following the user's organic-Reel reference, the working safe box is **x=60–960, y=220–1500**. It reserves 220 px at the top, 420 px at the bottom, 60 px on the left, and 120 px on the right. This gives the content about 49% more room than the first draft. The scenes are 25% larger, the titles and captions are larger, and the background is plain white with no decorative shapes, dots, scene container, or caption panel.

The first draft used conservative ad guidance, reported by the [Anglr safe-zone reference](https://anglr.co/tools/instagram-reels-safe-zone). The current version deliberately uses the larger area requested by the user, rather than that ad preset. [Meta’s own page](https://www.facebook.com/business/ads-guide/video/instagram-reels) redirected to a login/block page during the original check. The current layout is not a claim of official ad compliance or a guarantee for every expanded caption or device.

The editable preview has a “Show Instagram safe zone” control. The exported safe-zone image is for checking only and is not burned into the final video. Every video frame is checked against the actual drawn text bounds, including transformed Arabic text.

## Stick-scene references

Reviewed the craft guide, the starting template, all five files in `examples/`, and the 32 registered scenes through two frozen action states each. The main visual references were:

- `diffity-review`: gesture → response → visible payoff; props behind figures, held objects below the hand.
- `diffity-agents`: hanging rail, targeted emphasis, restrained colour, reaction pauses.
- `diffity-loop`: multiple beats composed into a longer story.
- `mongo-playground`: visible growth and a delayed celebration.
- `awesome-minimal-sites`: suspended cards with small settling motion.
- `claude-statusline`: one physical action at a time and a checked result.
- `balsamiq-sans-neue`: clear before/after comparison.

Following the gesture review, idle figures keep their hands at their sides. The comparison figure taps visible tabs on the word cards, the diagram begins after a physical button tap, and the context figure presses a stamp onto a visible target. The renderer checks the actual drawn hand positions against all four contact points; it fails if a hand misses. The garden figure responds with a small change of posture rather than raised-arm pointing or celebration.

The runtime in `assets/stick.js` is copied unchanged. The accompanying license is included. Balsamiq Sans and Noto Sans Arabic are self-hosted from the Google Fonts repository with their Open Font License files.

## Sound

English voiceover: the Mac’s installed Evan (Enhanced) voice. The per-shot recordings remain in `assets/voice-0.wav` through `assets/voice-6.wav`; `content.json` contains the narration and timing. `assets/narration.wav` includes the complete voiceover and quiet, locally generated rain/whoosh/tap effects. No music or Qur’an recitation was added.

Narration was checked for the presence of audio, duration, silence and clipping. Arabic pronunciation has not had an independent human listening review.

## Packaged example

The original preview used approximate word-count caption timing. In this portable copy those same approximate starts are explicit in `content.json`; they are not a word-level transcript. Use the newer Arabic example for an audio-timed project. The recording and original finished export are retained.
