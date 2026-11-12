import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = await readFile(path.join(root, "src", "content", "site.ts"), "utf8");
const referenced = [...source.matchAll(/"(?:[a-z0-9-]+)\.jpg"/g)]
  .map((match) => match[0].slice(1, -1))
  .filter((name) => name.endsWith(".jpg"));

const photosDir = path.join(root, "public", "photos");
const files = (await readdir(photosDir)).filter((name) => name.endsWith(".jpg")).sort();
const counts = new Map();
for (const name of referenced) counts.set(name, (counts.get(name) ?? 0) + 1);

const errors = [];
for (const [name, count] of counts) {
  if (count !== 1) errors.push(`${name} is referenced ${count} times`);
}
for (const name of files) {
  if (!counts.has(name)) errors.push(`${name} is in public/photos but unused`);
}
for (const name of counts.keys()) {
  if (!files.includes(name)) errors.push(`${name} is referenced but missing from public/photos`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`check:images ok (${files.length} photos, each used once)`);
