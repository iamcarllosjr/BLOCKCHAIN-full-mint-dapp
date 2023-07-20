import "./global.css";
import { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { ReactNode } from "react";

const Start = Press_Start_2P({
  subsets: ["latin"],
  variable: "--sofia_sans",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Full Mint Website",
  description: "This site was created using the NextJS framework 🚀",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={Start.className}>{children}</body>
    </html>
  );
}
