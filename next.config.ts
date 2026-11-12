import type { NextConfig } from "next";

const staticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackRustReactCompiler: true,
  },
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: staticExport ? "1" : "0",
  },
  images: staticExport
    ? {
        loader: "custom",
        loaderFile: "./src/image-loader.ts",
      }
    : {
        formats: ["image/avif", "image/webp"],
      },
  ...(staticExport ? { output: "export" as const } : {}),
};

export default nextConfig;
