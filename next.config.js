/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }
//
// module.exports = nextConfig
const fs = require("fs");

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    customJs: fs.readFileSync("./public/scripts/custom.js").toString(),
  },
});
