/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/sofi-portal" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
