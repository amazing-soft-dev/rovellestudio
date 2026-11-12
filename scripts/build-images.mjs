import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const photosDir = path.join(root, "public", "photos");
const outDir = path.join(root, "public", "images");
const widths = [640, 960, 1280, 1920];

await mkdir(outDir, { recursive: true });
const files = (await readdir(photosDir)).filter((name) => /\.(jpe?g|png|webp)$/i.test(name));

for (const file of files) {
  const id = file.replace(/\.[^.]+$/, "");
  const input = path.join(photosDir, file);
  for (const width of widths) {
    await sharp(input)
      .resize({ width, withoutEnlargement: false })
      .webp({ quality: 76 })
      .toFile(path.join(outDir, `${id}-${width}.webp`));
  }
}

console.log(`built ${files.length * widths.length} webp variants`);
