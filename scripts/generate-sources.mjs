import { mkdir } from "node:fs/promises";
import path from "node:path";
import { readFile } from "node:fs/promises";
import sharp from "sharp";

const root = process.cwd();
const dir = path.join(root, "public", "photos");
await mkdir(dir, { recursive: true });
await mkdir(path.join(root, "src", "app"), { recursive: true });

const source = await readFile(path.join(root, "src", "content", "site.ts"), "utf8");
const names = [...new Set([...source.matchAll(/"([a-z0-9-]+\.jpg)"/g)].map((match) => match[1]))];

const palette = [
  ["#1c120c", "#c4551a", "#f2d2a2"],
  ["#102028", "#3d7ea6", "#d7e4ea"],
  ["#1a1208", "#e07a2f", "#f6e7c1"],
  ["#241610", "#8c3a32", "#e7c3a1"],
  ["#1a1814", "#c4a574", "#f3efe6"],
  ["#141820", "#6d7c8a", "#d5dbe3"],
  ["#101614", "#2f6b4f", "#d7e6d4"],
  ["#1a1020", "#7a3e8a", "#e7d4ef"],
  ["#2a140c", "#e85d04", "#ffd6a5"],
  ["#0e0e10", "#f4f1ea", "#9aa0a6"],
];

let index = 0;
for (const name of names) {
  const [a, b, c] = palette[index % palette.length];
  index += 1;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
    <defs>
      <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="${a}"/>
        <stop offset="0.6" stop-color="${b}"/>
        <stop offset="1" stop-color="${c}"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#g)"/>
    <circle cx="${420 + (index % 5) * 40}" cy="360" r="160" fill="${c}" opacity="0.28"/>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 76 }).toFile(path.join(dir, name));
}

const icon = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="#141414"/><text x="256" y="330" text-anchor="middle" font-size="280" fill="#EEE5D9" font-family="Georgia">R</text></svg>`);
await sharp(icon).png().toFile(path.join(root, "src", "app", "icon.png"));
await sharp(icon).resize(1200, 630).png().toFile(path.join(root, "src", "app", "opengraph-image.png"));

console.log(`wrote ${names.length} source photos`);
