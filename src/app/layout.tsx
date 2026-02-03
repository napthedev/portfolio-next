import "../styles/globals.css";

import { LazyMotion, domAnimation } from "framer-motion";
import { ScrollProvider } from "../lib/scroll-context";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: "Phong's Portfolio",
  description: "Nguyen Anh Phong's Portfolio",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    title: "Phong's Portfolio",
    description: "Nguyen Anh Phong's Portfolio",
    images: ["/avatar.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phong's Portfolio",
    description: "Nguyen Anh Phong's Portfolio",
    images: ["/avatar.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LazyMotion features={domAnimation}>
          <ScrollProvider>{children}</ScrollProvider>
        </LazyMotion>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="lazyOnload"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
