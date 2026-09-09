import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://propertylifelinegroup.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Property Lifeline Group | Las Vegas Distressed Property Help for Homeowners",
    template: "%s | Property Lifeline Group",
  },
  description:
    "Confidential distressed-property help for Las Vegas homeowners facing mortgage stress, back taxes, or a needed cash sale. Direct-to-seller guidance with no retail commissions.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Property Lifeline Group",
    title:
      "Property Lifeline Group | Las Vegas Distressed Property Help for Homeowners",
    description:
      "Confidential distressed-property help for Las Vegas homeowners facing mortgage stress, back taxes, or a needed cash sale.",
  },
  twitter: {
    card: "summary",
    title:
      "Property Lifeline Group | Las Vegas Distressed Property Help for Homeowners",
    description:
      "Confidential distressed-property help for Las Vegas homeowners facing mortgage stress, back taxes, or a needed cash sale.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Property Lifeline Group",
  url: siteUrl,
  telephone: "+1-725-273-9245",
  areaServed: {
    "@type": "City",
    name: "Las Vegas",
  },
  description:
    "Direct-to-seller distressed property solutions for Las Vegas homeowners and off-market deals for cash buyers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
