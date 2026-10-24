/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Old project URLs for research work now live under /research.
  async redirects() {
    return [
      { source: "/projects/ml-interatomic-potentials", destination: "/research/opt-ddap", permanent: true },
      { source: "/projects/soap-descriptors-ml", destination: "/research/water-activity", permanent: true },
    ];
  },
};

module.exports = nextConfig;
