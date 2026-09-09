import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Las Vegas Off-Market Deals for Investors",
  description:
    "Get direct access to verified Las Vegas off-market wholesale, fix-and-flip, and cash-flow deals from Property Lifeline Group.",
  alternates: {
    canonical: "/investors",
  },
  openGraph: {
    url: "/investors",
    title: "Las Vegas Off-Market Deals for Investors | Property Lifeline Group",
    description:
      "Verified Las Vegas off-market wholesale, fix-and-flip, and cash-flow inventory for cash buyers and investors.",
  },
  twitter: {
    title: "Las Vegas Off-Market Deals for Investors | Property Lifeline Group",
    description:
      "Verified Las Vegas off-market wholesale, fix-and-flip, and cash-flow inventory for cash buyers and investors.",
  },
};

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
