import { access } from "node:fs/promises";
import path from "node:path";

export async function verifyExport() {
  const out = path.join(process.cwd(), "out");
  const required = [
    "index.html",
    "about.html",
    "playground.html",
    "contact.html",
    "sitemap.xml",
    "robots.txt",
    "icon.png",
    "llms.txt",
  ];
  for (const file of required) {
    await access(path.join(out, file));
  }
  try {
    await access(path.join(out, "api"));
    throw new Error("out/api must not exist");
  } catch (error) {
    if (error instanceof Error && error.message === "out/api must not exist") throw error;
  }
  console.log("static export ok");
}
