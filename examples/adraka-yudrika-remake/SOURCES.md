# Sources and production notes

This remake preserves the approved script and the exact prepared narration from the first version. Its new physical actions are teaching metaphors: opening, unfolding, carrying, observing, hanging and sharing. They do not imply that a person or device creates revealed knowledge. No sacred text is thrown or treated as a disposable object. A lantern/backpack and a sealed packet are new drawings, not claims about what the original upstream examples contained.

The script was approved before production and is retained in `script.txt`. English wording is a concise rendering for narration.

## Quran examples

1. [Al-Qadr 97:2–3](https://quran.com/97/2-3): وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ — followed by لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ. The following verse explains the night's excellence.
2. [At-Tariq 86:2–3](https://quran.com/at-tariq/2-3): وَمَا أَدْرَاكَ مَا الطَّارِقُ — followed by النَّجْمُ الثَّاقِبُ. The following verse identifies the night visitor as the piercing star.
3. [Al-Ahzab 33:63](https://quran.com/33/63): excerpt وَمَا يُدْرِيكَ لَعَلَّ السَّاعَةَ تَكُونُ قَرِيبًا. No date for the Hour is supplied; the full verse states that its knowledge is with Allah.
4. [Abasa 80:3](https://quran.com/80/3): وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكَّىٰ. The verse mentions a possibility; it does not confirm that outcome there. The narration makes no claim that all later knowledge of an individual's outcome is impossible.

## Scholarly observation

[Al-Qurtubi on 86:2](https://quran.ksu.edu.sa/tafseer/qortobi/sura86-aya2.html) attributes the distinction to Sufyan ibn Uyaynah. [Al-Baghawi on 90:12](https://quran.com/al-balad/12/tafsirs/ar-tafsir-al-baghawi) also reports the observation. The script summarizes it as an explanation being supplied for *wa ma adraka*, while the specific answer is not supplied for *wa ma yudrika*.

## Audio and visuals

Narration was generated with `gemini-3.8-flash-tts`, voice `Charon`; the actual generation metadata is in `assets/voice.generation.json`. Arabic expressions were supplied in Arabic, with vowel marks, rather than English transliteration. The audio is normalized to -16 LUFS with a -1.5 dB true-peak target.

Word timing was checked against a local transcript. All six Quran quotations received automatic Arabic speech-recognition checks. The base recognizer misheard part of the Qadr answer; an independent larger recognizer, without a supplied answer, recovered the complete expected phrase (`assets/qadr-check.json`). These are automatic checks, not a human recitation or tajwid review.

Figures are generic readers, not depictions of named Quranic people. The calendar, telescope, clock and sealed envelope are explanatory metaphors; they do not claim to illustrate unseen realities literally.

Text bounds are checked on every exported frame against the agreed safe area. Native motion checks cover all eight scene variants; active hands are checked against their visible prop targets. Instagram's live upload interface has not been checked and the video has not been posted.
