import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
      domains: ['lathi.bccdev.id'],
      remotePatterns: [
         {
            protocol: "https",
            hostname: "lathi.bccdev.id",
            port: "",
            pathname: "/**",
         }
      ]
   }
};

export default nextConfig;
