import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { fonts } from "./font";
import { initColorModeScript } from "@/features/color-mode/init-color-mode";
import { Layout } from "./_layout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "STAMPTIME",
  description: "A tool for timestamp conversion",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="hJM0ATeccupnt--DcaRXAIs0bWqj2w1-_iQ6M5gGTco"
        />
        <script
          id="set-color-mode"
          dangerouslySetInnerHTML={{ __html: initColorModeScript }}
        />
      </head>
      <body className={cn(...fonts.map((font) => font.variable))}>
        <NextIntlClientProvider messages={messages}>
          <Layout>{children}</Layout>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
