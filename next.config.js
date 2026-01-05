/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/voicebridge-site",
  assetPrefix: "/voicebridge-site/",
  images: { unoptimized: true },
};

module.exports = nextConfig;
