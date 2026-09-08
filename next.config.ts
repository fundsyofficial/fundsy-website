import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* There is a stray lockfile above this directory, which makes Turbopack guess
     the wrong workspace root. Pin it to this project. */
  turbopack: { root: path.resolve(__dirname) },

  images: {
    /* Instagram serves media from signed, short-lived CDN URLs on these hosts.
       Only needed once INSTAGRAM_ACCESS_TOKEN is set. */
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

export default nextConfig;
