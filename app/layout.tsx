import { ReactNode } from "react";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Bricolage_Grotesque } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FMT Meet",
  description: "Video meetings, beautifully simple.",
  // icons: { icon: "/icons/logo.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} h-full`}>
      <body
        className="min-h-full text-white antialiased relative overflow-x-hidden"
        style={{ background: "#080808", fontFamily: "var(--font-bricolage, Arial, sans-serif)" }}
      >

        <div className="relative z-10">
          <Toaster />
          {children}
        </div>
      </body>
    </html>
  );
}
