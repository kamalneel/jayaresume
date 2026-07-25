/**
 * auth-gate.js — OPTIONAL share-token gate.  (STUB / no-op version.)
 *
 * In the production system this file does two jobs:
 *   1. If the URL has ?share=<token>, it looks the token up in a SHARE_TOKENS
 *      map, and — if valid — sets window.__ADAMX_SHARE_MODE / __SHARE_DECK /
 *      __SHARE_TOKEN so an unauthenticated visitor can see ONLY that one deck.
 *   2. For logged-in users it exposes window.__ADAMX_SHARE_TOKENS so the viewer
 *      can show a "copy share link" button for decks that have a token.
 *
 * This stub does nothing: the viewer runs fully open, no login, no gating.
 * That is the right default for local development and for a fresh install.
 *
 * TO ADD REAL SHARING LATER:
 *   - Populate SHARE_TOKENS below: { "<random-token>": { deck: "<deckId>", slides: [...] } }
 *   - On page load, read ?share= from the URL; if it matches a token, set
 *     window.__ADAMX_SHARE_MODE = true and window.__ADAMX_SHARE_DECK = tokens[t].deck.
 *   - Optionally gate each iframe slide too (the viewer already forwards the
 *     token into each slide's src as ?share=... — see updateSlide() in the viewer).
 *   - For a 4-digit PIN screen, add `pin: "1234"` to a token and render a PIN
 *     prompt before revealing the deck.
 */
(function () {
  const SHARE_TOKENS = {
    // "my-first-share-2026-ab12cd": { deck: "demo-deck", slides: [] },
  };

  // Expose the (empty) token map so the viewer's "share" button logic is happy.
  window.__ADAMX_SHARE_TOKENS = SHARE_TOKENS;

  // No ?share= handling in the stub — everything is open.
  // Real implementation would branch on new URLSearchParams(location.search).get('share').
})();
