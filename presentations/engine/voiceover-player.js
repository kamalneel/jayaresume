/**
 * voiceover-player.js — OPTIONAL narration layer.  (STUB / no-op version.)
 *
 * A deck opts in with `voiceover: true` in its decks.js entry. The real player
 * loads a per-slide audio track (TTS in a cloned voice) and plays it when the
 * slide changes. This stub satisfies the viewer's `window.VoiceoverPlayer`
 * checks so nothing errors when a deck has voiceover turned off (the default).
 *
 * To use it, load a per-slide audio track when the slide changes (implement
 * onSlideChange to play track N). Left as a stub because narration is optional.
 */
window.VoiceoverPlayer = {
  init: function () {},
  onSlideChange: function () {},
};
