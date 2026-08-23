import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import {
  siteName,
  defaultOgImage,
  homeTitle,
  homeDescription,
  pageUrl,
} from "@/lib/seo";

// Homepage-specific metadata: concrete value-prop title + proof+CTA description.
// Other routes still inherit `defaultTitle` / `siteDescription` from app/layout.tsx.
// `metadataBase` is inherited from app/layout.tsx.
export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: pageUrl("/") },
  openGraph: {
    type: "website",
    siteName,
    title: homeTitle,
    description: homeDescription,
    url: pageUrl("/"),
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteName} — ${homeTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [defaultOgImage],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
