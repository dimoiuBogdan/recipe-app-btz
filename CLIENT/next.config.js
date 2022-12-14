/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "external-content.duckduckgo.com",
      "dimoiubogdanbucket.s3.eu-central-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
