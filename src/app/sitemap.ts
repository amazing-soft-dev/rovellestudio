import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rovellestudio.example";
  return ["", "/about", "/playground", "/contact"].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date("2026-11-11"),
  }));
}
