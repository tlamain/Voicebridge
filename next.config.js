/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // IMPORTANT: must match repo name exactly (capital V)
  basePath: "/Voicebridge",
  assetPrefix: "/Voicebridge/",

  // GitHub Pages has no image optimizer server
  images: { unoptimized: true },
};

module.exports = nextConfig;
