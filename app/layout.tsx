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
        {/* ── Background canvas ── */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Primary glow — large top-center spotlight */}
          <div style={{
            position: "absolute", top: "-20%", left: "50%",
            transform: "translateX(-50%)",
            width: "1100px", height: "700px", borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(160,160,175,0.10) 0%, rgba(100,100,115,0.04) 45%, transparent 70%)",
            filter: "blur(50px)",
          }} />
          {/* Warm left orb */}
          <div style={{
            position: "absolute", bottom: "10%", left: "-8%",
            width: "600px", height: "600px", borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(90,85,80,0.08) 0%, transparent 65%)",
            filter: "blur(70px)",
          }} />
          {/* Cool right orb */}
          <div style={{
            position: "absolute", top: "5%", right: "-8%",
            width: "500px", height: "500px", borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(70,75,90,0.07) 0%, transparent 65%)",
            filter: "blur(60px)",
          }} />
        </div>

        <div className="relative z-10">
          <Toaster />
          {children}
        </div>
      </body>
    </html>
  );
}
