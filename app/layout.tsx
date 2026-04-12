import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SubmissionTicker from "@/components/SubmissionTicker";

export const metadata: Metadata = {
  title: "OfferVault | Real Placement Data",
  description: "India's first crowdsourced database of verified placement offers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <SubmissionTicker />
        {children}
      </body>
    </html>
  );
}