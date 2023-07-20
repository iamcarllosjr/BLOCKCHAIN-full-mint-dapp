import "./global.css";
import { Metadata } from "next";
import { Sofia_Sans } from "next/font/google";
import { ReactNode } from "react";

const Sofia = Sofia_Sans({
  subsets: ["latin"],
  variable: "--sofia_sans",
  weight: ["200", "300", "400"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "This site was created using the NextJS framework 🚀",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={Sofia.className}>{children}</body>
    </html>
  );
}
