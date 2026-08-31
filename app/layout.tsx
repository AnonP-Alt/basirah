import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Changa, JetBrains_Mono } from "next/font/google";
import LocalFont from "next/font/local";

import { ThemeProvider } from "$/theme-provider";
import { DirectionProvider } from "$/ui/direction";

import "./globals.css";

const fontSans = Changa({
  subsets: ["arabic"],
  variable: "--font-sans",
});

const fontSerif = LocalFont({
  display: "fallback",
  fallback: ["arial"],
  preload: true,
  src: "../public/fonts/Alyamama-VariableFont.ttf",
  variable: "--font-serif",
  weight: "100 900",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "بصيرة - إدارة الخطباء والمساجد",
    template: "%s | بصيرة",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      dir="rtl"
      lang="ar"
      suppressHydrationWarning
      className={cn(
        "font-sans antialiased",
        fontSans.variable,
        fontSerif.variable,
        fontMono.variable
      )}
    >
      <body>
        <DirectionProvider direction="rtl">
          <ThemeProvider>{children}</ThemeProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
