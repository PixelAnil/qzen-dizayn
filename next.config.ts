import type { NextConfig } from "next";

// Set to "/qzen-dizayn" by the GitHub Pages workflow; empty for local development.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // No image optimizer on a static host; assets in /public are pre-compressed WebP
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
