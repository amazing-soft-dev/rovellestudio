import { spawn } from "node:child_process";
import { access, rename, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "src", "app", "api");
const parked = path.join(root, "src", "app", "_api_off");

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function restore() {
  if (await exists(parked)) {
    if (await exists(apiDir)) await rm(apiDir, { recursive: true, force: true });
    await rename(parked, apiDir);
  }
}

let code = 0;
try {
  if (await exists(apiDir)) await rename(apiDir, parked);
  code = await new Promise((resolve) => {
    const child = spawn("npx", ["next", "build"], {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, NEXT_OUTPUT: "export" },
    });
    child.on("exit", (status) => resolve(status ?? 1));
  });
  if (code === 0) {
    const { verifyExport } = await import("./verify-export.mjs");
    await verifyExport();
  }
} finally {
  await restore();
}

process.exit(code);
