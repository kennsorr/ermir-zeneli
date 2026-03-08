/**
 * One-off: process hero assets into public/images/hero/
 * Order: 3rd→panel1, 2nd→panel2, 1st→panel3. All flipped on y-axis.
 * Panel3 (1st image) stays color; B&W is applied via CSS filter in the UI.
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
// Cursor saves provided images under workspace's .cursor/projects/.../assets
const assetsDir = path.join(root, "..", "..", "..", ".cursor", "projects", "Users-kens-Documents-GitHub-ermir-zeneli", "assets");
const outDir = path.join(root, "public", "images", "hero");

const assets = [
  "image-0f56fc73-2725-443c-8d94-ea7e9cbb24c3.png", // 3rd image → panel 1
  "image-5e2b8b95-0b01-4ee2-b11b-93a4e7fe14ef.png", // 2nd image → panel 2
  "image-9ff7a342-669a-4734-9fcc-14630ba2b215.png", // 1st image → panel 3 (B&W)
];

const grayscaleOnly = [false, false, false]; // panel 3 = color; B&W via CSS filter

fs.mkdirSync(outDir, { recursive: true });

async function processPanel(index) {
  const oneBased = index + 1;
  const srcPath = path.join(assetsDir, assets[index]);
  const baseName = `panel-${oneBased}`;
  let pipeline = sharp(srcPath).flop(); // flip on y-axis (horizontal)
  if (grayscaleOnly[index]) {
    pipeline = pipeline.grayscale();
  }
  const buf = await pipeline.jpeg({ quality: 88, mozjpeg: true }).toBuffer();
  const outPath = path.join(outDir, `${baseName}.jpg`);
  fs.writeFileSync(outPath, buf);
  console.log(`Wrote ${baseName}.jpg`);
  // Same image for hover
  fs.writeFileSync(path.join(outDir, `${baseName}-hover.jpg`), buf);
  console.log(`Wrote ${baseName}-hover.jpg`);
}

async function main() {
  for (let i = 0; i < 3; i++) await processPanel(i);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
