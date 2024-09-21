"use server";

import { cookies } from "next/headers";
import { Locale, defaultLocale, supportedLocales } from "./config";

const COOKIE_NAME = "LOCALE";

export async function getUserLocale() {
  const cookieLocale = cookies().get(COOKIE_NAME)?.value;
  if (cookieLocale && supportedLocales.includes(cookieLocale as Locale)) {
    return cookieLocale;
  }
  return cookies().get(COOKIE_NAME)?.value ?? defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
