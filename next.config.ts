import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next";

const withMDX = createMDX({
  // customise the config file path
  // configPath: "source.config.ts"
});

const nextConfig: NextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*"],
  },
  redirects: async() => {
    return [
      {
        source: "/docs/:path*.mdx",
        destination: "/docs/:path*.md",
        permanent: true,
      },
      {
        source: "/almuerzos/docs/:path*.mdx",
        destination: "/almuerzos/docs/:path*.md",
        permanent: true,
      },
      {
        source: "/ecotrueque/docs/:path*.mdx",
        destination: "/ecotrueque/docs/:path*.md",
        permanent: true,
      },
      {
        source: "/hoteles/docs/:path*.mdx",
        destination: "/hoteles/docs/:path*.md",
        permanent: true,
      },
    ]
  },
  rewrites: async() => {
    return [
      {
        source: "/almuerzos/docs/:path*.md",
        destination: "/llm/almuerzos/:path*",
      },
      {
        source: "/ecotrueque/docs/:path*.md",
        destination: "/llm/ecotrueque/:path*",
      },
      {
        source: "/hoteles/docs/:path*.md",
        destination: "/llm/hoteles/:path*",
      },
      {
        source: "/docs/:path*.md",
        destination: "/llm/:path*",
      },
    ]
  },
};

export default withMDX(nextConfig);