import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/nav/Footer";
import { ClerkUserSync } from "@/components/auth/ClerkUserSync";
import { beaverClerkAppearance } from "@/lib/clerk-appearance";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beaver — to do better",
  description:
    "Beaver turns your daily lists into a shared scoreboard. Trusted friends see your streaks, cheer your wins, and call you out when you slip.",
  openGraph: {
    title: "Beaver — to do better",
    description:
      "Beaver turns your daily lists into a shared scoreboard. Trusted friends see your streaks, cheer your wins, and call you out when you slip.",
    images: ["/screens/old-landing.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <ClerkProvider appearance={beaverClerkAppearance}>
          <ClerkUserSync />
          <TopNav />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
