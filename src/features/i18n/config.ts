import { atom } from "jotai";

export const locales = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "zh-CN",
    name: "简体中文",
  },
] as const;

export const supportedLocales = locales.map((locale) => locale.code);
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = "en";
export const localeAtom = atom<Locale>(defaultLocale);
export const isValidLocale = (locale: unknown): locale is Locale =>
  typeof locale === "string" && supportedLocales.includes(locale as Locale);
