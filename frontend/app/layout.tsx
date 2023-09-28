import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DRIPPIN'POPE",
  description: "DRIPPIN'POPE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100svh" }} className={inter.className}>
        <header className="sticky top-0 z-30">
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
