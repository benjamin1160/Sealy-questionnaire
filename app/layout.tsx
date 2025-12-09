import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Find Your Perfect Mobile Home | Mobile Home Finder",
  description: "Answer a few questions and we'll help you find the perfect mobile home for your needs. Land, financing, and communities - we've got you covered.",
  keywords: "mobile home, manufactured home, mobile home financing, mobile home communities, land for mobile home",
  openGraph: {
    title: "Find Your Perfect Mobile Home",
    description: "Let us help you discover your ideal mobile home. Quick, easy, and personalized to your needs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
