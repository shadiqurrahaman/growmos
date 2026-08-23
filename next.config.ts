import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content-Security-Policy:
  // - 'unsafe-inline' on script/style is required because Next.js emits inline
  //   bootstrap + JSON-LD scripts/styles; a strict nonce policy would require
  //   deeper middleware refactoring and is tracked separately.
  // - frame-ancestors 'none' replaces X-Frame-Options for modern browsers
  //   (we keep X-Frame-Options for legacy UAs).
  // - GA4 endpoints, Vercel Blob, Google Fonts, Font Awesome CDN, Calendly
  //   are explicit allowlist entries.
  // - data:/blob: on img-src allow Next/Image generated sources.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
      "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.vercel-storage.com https://*.public.blob.vercel-storage.com",
      "frame-src 'self' https://calendly.com https://www.google.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://calendly.com",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Apex growmos.com → www.growmos.com (canonical host)
      {
        source: "/:path*",
        has: [{ type: "host", value: "growmos.com" }],
        destination: "https://www.growmos.com/:path*",
        permanent: true,
      },
      // Localhost-style dev port on www → strip port
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.growmos.com:3000" }],
        destination: "https://www.growmos.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 960, 1040, 1280, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 520, 720],
    remotePatterns: [
      { protocol: "https", hostname: "**.vercel-storage.com" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "flagcdn.com" },
    ],
  },
};

export default nextConfig;