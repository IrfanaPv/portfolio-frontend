import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "Irfana — Digital Systems / Creative Technology",
  description:
    "Full-stack developer building backend systems, interactive web experiences, and AI-powered products.",

  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bg-black">
        {/* <GridBackground /> */}
           <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}