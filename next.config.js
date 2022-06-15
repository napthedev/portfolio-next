const withAnalyzer = require("@next/bundle-analyzer")({
  enabled:
    process.env.ANALYZE === "true" && process.env.NODE_ENV !== "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
    };
    if (!isServer) {
      config.module.rules.push({
        test: /\b(?:graphql|graphql-request)\b/gi,
        use: "null-loader",
      });
    }

    return config;
  },
};

module.exports = withAnalyzer(nextConfig);
