import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* There is a stray lockfile above this directory, which makes Turbopack guess
     the wrong workspace root. Pin it to this project. */
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
