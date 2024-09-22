"use server";

import { cookies, headers } from "next/headers";
import { Locale, defaultLocale, isValidLocale } from "./config";

const COOKIE_NAME = "LOCALE";

export async function getUserLocale() {
  const cookieLocale = cookies().get(COOKIE_NAME)?.value;
  if (isValidLocale(cookieLocale)) {
    return cookieLocale;
  }
  const acceptedLanguage = parseAcceptLanguage(
    headers().get("accept-language"),
  )[0];
  if (isValidLocale(acceptedLanguage)) {
    return acceptedLanguage;
  }
  return defaultLocale;
}

const parseAcceptLanguage = (acceptLanguage: string | null) => {
  if (!acceptLanguage) return [];
  const languageTags = acceptLanguage.split(",");

  const parsedTags = languageTags.map((tag) => {
    const [language, percent] = tag.split(";");
    const p = percent ? parseFloat(percent.split("=")[1]) : 1;
    return { language: language.trim(), q: p };
  });

  parsedTags.sort((a, b) => b.q - a.q);
  return parsedTags.map((tag) => tag.language);
};

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
