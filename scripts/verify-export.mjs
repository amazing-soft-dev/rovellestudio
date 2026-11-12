import { access } from "node:fs/promises";
import path from "node:path";

export async function verifyExport() {
  const out = path.join(process.cwd(), "out");
  await access(path.join(out, "index.html"));
  try {
    await access(path.join(out, "api"));
    throw new Error("out/api must not exist");
  } catch (error) {
    if (error instanceof Error && error.message === "out/api must not exist") throw error;
  }
  console.log("static export ok");
}
