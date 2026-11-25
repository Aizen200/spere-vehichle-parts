import type { Metadata } from "next";
import { Barlow_Condensed, Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const condensed = Barlow_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Jay Engineering Company | Forklift Spare Parts India",
    template: "%s | Jay Engineering Company",
  },
  description:
    "45+ years supplying ISO 9001:2015 certified multi-brand forklift spare parts, rentals, service and training across India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${condensed.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Header />
        {/* The page lifts off the footer, which is revealed underneath on tall desktop screens */}
        <main className="relative z-10 flex-1 bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] lg:rounded-b-[2rem]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
