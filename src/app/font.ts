import {
  Roboto_Flex as RobotoFlexFont,
  Roboto_Mono as RobotoMonoFont,
} from "next/font/google";

const RobotoFlex = RobotoFlexFont({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  fallback: ["sans-serif"],
  display: "swap",
});

const RobotoMono = RobotoMonoFont({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  fallback: ["monospace"],
  display: "swap",
});

export const fonts = [RobotoFlex, RobotoMono];
