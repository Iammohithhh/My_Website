import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohith H | AI/ML Engineer & Researcher",
  description: "Portfolio of Mohith H - Chemical Engineering student at IIT Bombay specializing in AI/ML research and development",
  keywords: ["Mohith H", "IIT Bombay", "AI", "Machine Learning", "Chemical Engineering", "Research"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
