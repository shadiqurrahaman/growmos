export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_BASE_URL?.startsWith("http://localhost")
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "https://growmos.com");

export const siteName = "GrowMos";
