import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Find Your Perfect Mobile Home | Reliable Homes of Sealy",
  description: "Reliable Homes of Sealy - Your trusted mobile home dealer in Sealy, Texas. Answer a few questions and we'll help you find the perfect manufactured home. Huge selection of single-wide and double-wide homes. Delivery anywhere in Texas.",
  keywords: "Reliable Homes Sealy, mobile home Sealy TX, manufactured home Texas, mobile home dealer, single wide homes, double wide homes, mobile home financing, Clayton Homes dealer",
  openGraph: {
    title: "Find Your Perfect Mobile Home | Reliable Homes of Sealy",
    description: "Discover your ideal manufactured home with Reliable Homes of Sealy. Huge selection, great financing, and delivery anywhere in Texas.",
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
