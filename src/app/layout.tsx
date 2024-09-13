import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { fonts } from "./font";
import { initColorModeScript } from "@/features/color-mode/init-color-mode";
import { Layout } from "./_layout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Timestamp",
  description: "Timestamp converter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="set-color-mode"
          dangerouslySetInnerHTML={{ __html: initColorModeScript }}
        />
      </head>
      <body className={cn(...fonts.map((font) => font.variable))}>
        <Layout>{children}</Layout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
