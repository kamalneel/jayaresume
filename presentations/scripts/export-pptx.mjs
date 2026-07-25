/**
 * export-pptx.mjs — turn any registered deck into a PowerPoint (.pptx).
 *
 * HOW IT WORKS
 *   For each slide, it opens the HTML at 1920x1080 (deviceScaleFactor 2 for
 *   crispness), waits for fonts, screenshots the rendered pixels, and places
 *   that image full-bleed onto a 16:9 PowerPoint slide — one slide per page.
 *
 *   So the .pptx looks EXACTLY like the deck: each PowerPoint slide is a
 *   pixel-perfect picture of your HTML slide. It opens and presents in
 *   PowerPoint / Keynote / Google Slides like any normal deck. (The slides are
 *   images, so text inside them isn't editable in PowerPoint — that's the
 *   trade-off for perfect fidelity. If you need to edit, edit the HTML and
 *   re-export.)
 *
 * USAGE
 *   1. cd engine && npm install         (installs playwright + pptxgenjs)
 *   2. npx playwright install chromium  (one-time browser download)
 *   3. node examples/export-pptx.mjs demo-deck
 *   → writes demo-deck.pptx next to the bundle.
 *
 * Slide order comes from the deck's entry in engine/decks.js, so the PowerPoint
 * can't drift out of order relative to the viewer.
 */
import { chromium } from "playwright";
import pptxgen from "pptxgenjs";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Load the registry (decks.js declares `const DECKS = {...}` with no export).
const decksSrc = fs.readFileSync(path.join(root, "engine", "decks.js"), "utf8");
const DECKS = new Function(`${decksSrc}; return DECKS;`)();

const deckId = process.argv[2] || "demo-deck";
const deck = DECKS[deckId];
if (!deck) {
  console.error(`Deck "${deckId}" not found in engine/decks.js`);
  process.exit(1);
}

const slideFiles = deck.type === "deck"
  ? deck.slides.map((s) => s.file)
  : deck.versions.map((v) => v.file);

async function run() {
  const outPath = path.join(root, `${deckId}.pptx`);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });

  const pptx = new pptxgen();
  pptx.defineLayout({ name: "HD16x9", width: 13.333, height: 7.5 }); // 16:9 in inches
  pptx.layout = "HD16x9";
  pptx.title = deck.title || deckId;

  for (let i = 0; i < slideFiles.length; i++) {
    const abs = path.resolve(root, "engine", slideFiles[i]);
    console.log(`  [${i + 1}/${slideFiles.length}] ${slideFiles[i]}`);
    const page = await context.newPage();
    await page.goto(pathToFileURL(abs).href, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500); // let web fonts render
    const png = await page.screenshot({ type: "png" });
    await page.close();

    const slide = pptx.addSlide();
    slide.addImage({
      data: "data:image/png;base64," + png.toString("base64"),
      x: 0, y: 0, w: 13.333, h: 7.5, // full-bleed
    });
  }

  await browser.close();
  await pptx.writeFile({ fileName: outPath });
  console.log(`\nDone → ${outPath}`);
}

run().catch((e) => { console.error(e); process.exit(1); });
