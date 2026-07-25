/**
 * export-pdf.mjs — turn any registered deck into a pixel-exact PDF.
 *
 * HOW IT WORKS
 *   For each slide file, it opens the HTML at 1920x1080 (deviceScaleFactor 2 for
 *   retina crispness), waits for fonts to settle, screenshots it, then stitches
 *   the PNGs into a 1920x1080 PDF — one slide per page. Because it screenshots
 *   the rendered pixels, the PDF looks EXACTLY like the deck. No print-CSS
 *   reflow surprises. (This is why the file-per-slide model exports so cleanly.)
 *
 * USAGE
 *   1. cd into this folder's parent so paths resolve, or run from anywhere with
 *      absolute paths.
 *   2. npm install   (installs playwright + pdf-lib — see engine/package.json)
 *   3. npx playwright install chromium   (one-time browser download)
 *   4. node examples/export-pdf.mjs demo-deck
 *
 * The slide ORDER comes straight from the registry entry in engine/decks.js, so
 * the PDF can never drift out of sync with what the viewer shows.
 */
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Load the registry. decks.js declares `const DECKS = {...}` with no export,
// so we read it and pull DECKS off a tiny sandbox.
const require = createRequire(import.meta.url);
const decksSrc = fs.readFileSync(path.join(root, "engine", "decks.js"), "utf8");
const DECKS = new Function(`${decksSrc}; return DECKS;`)();

const deckId = process.argv[2] || "demo-deck";
const deck = DECKS[deckId];
if (!deck) {
  console.error(`Deck "${deckId}" not found in engine/decks.js`);
  process.exit(1);
}

// Resolve the ordered slide files (handles both "deck" and "versions" shapes).
const slideFiles = deck.type === "deck"
  ? deck.slides.map((s) => s.file)
  : deck.versions.map((v) => v.file);

async function run() {
  const outPath = path.join(root, `${deckId}.pdf`);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });

  const pdf = await PDFDocument.create();
  for (let i = 0; i < slideFiles.length; i++) {
    // Slide paths in decks.js are relative to the engine/ folder.
    const abs = path.resolve(root, "engine", slideFiles[i]);
    console.log(`  [${i + 1}/${slideFiles.length}] ${slideFiles[i]}`);
    const page = await context.newPage();
    await page.goto(pathToFileURL(abs).href, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500); // let web fonts render
    const png = await page.screenshot({ type: "png" });
    await page.close();
    const img = await pdf.embedPng(png);
    const p = pdf.addPage([1920, 1080]);
    p.drawImage(img, { x: 0, y: 0, width: 1920, height: 1080 });
  }

  fs.writeFileSync(outPath, await pdf.save());
  await browser.close();
  console.log(`\nDone → ${outPath}`);
}

run().catch((e) => { console.error(e); process.exit(1); });
