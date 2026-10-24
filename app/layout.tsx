import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/data";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: ["Mohith H", "IIT Bombay", "machine learning", "atomistic simulation", "DFT", "atomic charges", "differentiable programming"],
  icons: {
    icon: "/icon_new.png",
  },
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/notes/rss.xml", title: `${site.name} — Notes` }],
    },
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-page mx-auto px-4 sm:px-6 pt-10 pb-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
