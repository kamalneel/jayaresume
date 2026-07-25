/**
 * decks.js — the DECK REGISTRY. This is the heart of the system.
 *
 * The viewer (deck_viewer.html) reads DECKS[<id>] where <id> comes from the
 * URL: deck_viewer.html?deck=<id>. It builds the ordered slide list from the
 * entry and swaps them into the iframe as you navigate.
 *
 * A slide file is NOT registered here individually — the DECK is registered,
 * and it points at an ordered array of slide files. Adding a slide = add one
 * line to the `slides` array. Reordering = reorder the array. That's it.
 *
 * TWO ENTRY SHAPES
 * ----------------
 * 1) type: "deck"  — a normal multi-slide deck. `slides` is the ordered list.
 * 2) versions      — a single-slide project with switchable variants (e.g. a
 *                    homepage you're iterating v1/v2/v3). The viewer shows one
 *                    at a time with version pills instead of prev/next.
 *
 * OPTIONAL FIELDS
 *   description  — one line, shown in a library page.
 *   category     — grouping key for a library page ("decks", "customer-slides", …).
 *   mobile: true — 9:16 portrait-native deck; viewer goes full-bleed, swipe-only,
 *                  no scaling and no rotate-overlay. (Default is 16:9 landscape.)
 *   voiceover: true — enable the narration layer (see voiceover-player.js).
 *   pptUrl       — if set, the viewer shows a "Download PPT" button.
 *   shareToken   — a token string; pairs with auth-gate.js SHARE_TOKENS.
 */
const DECKS = {

  // ---- A normal multi-slide deck. Open with: deck_viewer.html?deck=demo-deck ----
  "demo-deck": {
    title: "How These Decks Work",
    description: "A 4-slide demo that doubles as a working template. Copy these slide files to start your own deck.",
    type: "deck",
    category: "decks",
    slides: [
      { file: "../examples/slide_demo_01_title.html",   title: "Title" },
      { file: "../examples/slide_demo_02_content.html", title: "The Idea" },
      { file: "../examples/slide_demo_03_data.html",    title: "Proof" },
      { file: "../examples/slide_demo_04_close.html",   title: "Close" },
    ],
  },

  // ---- Wing Accounting Lead case study. Open with: deck_viewer.html?deck=wing-case-study ----
  "wing-case-study": {
    title: "Wing — Accounting Lead Case Study",
    description: "Jaya Agrawal — prepaid policy, PO accrual automation, and AI-native flux analysis. Presented to Wills Fallon.",
    type: "deck",
    category: "decks",
    slides: [
      { file: "../decks/wing-case-study/slide_wing_01_title.html",              title: "Title" },
      { file: "../decks/wing-case-study/slide_wing_02_roadmap.html",            title: "Scope" },
      { file: "../decks/wing-case-study/slide_wing_03_prepaid_threshold.html",  title: "Prepaid Threshold" },
      { file: "../decks/wing-case-study/slide_wing_04_prepaid_mechanics.html",  title: "Below Threshold & Audit Support" },
      { file: "../decks/wing-case-study/slide_wing_05_grir_insight.html",       title: "The GR/IR Insight" },
      { file: "../decks/wing-case-study/slide_wing_06_accrual_workflow.html",   title: "Automated Workflow" },
      { file: "../decks/wing-case-study/slide_wing_07_data_inputs.html",        title: "Data Inputs" },
      { file: "../decks/wing-case-study/slide_wing_08_system_prompt.html",      title: "The System Prompt" },
      { file: "../decks/wing-case-study/slide_wing_09_guardrails.html",         title: "Guardrails" },
      { file: "../decks/wing-case-study/slide_wing_10_close.html",              title: "Next Steps" },
    ],
  },

  // ---- A versioned single-slide project. Open with: deck_viewer.html?deck=demo-versions ----
  // (Uncomment and point at real files to try it.)
  // "demo-versions": {
  //   title: "Homepage — iterating",
  //   type: "single",
  //   versions: [
  //     { id: "v1", label: "v1", file: "../examples/home_v1.html" },
  //     { id: "v2", label: "v2", file: "../examples/home_v2.html" },
  //   ],
  // },

};
