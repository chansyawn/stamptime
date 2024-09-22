"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CheckIcon, LanguagesIcon } from "lucide-react";
import { Locale, localeAtom, locales } from "./config";
import { setUserLocale } from "./service";
import { useLocale } from "next-intl";
import { useEffect, useTransition } from "react";
import { useSetAtom } from "jotai";

export function LanguageSelector() {
  const locale = useLocale();
  const setLocale = useSetAtom(localeAtom);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLocale(locale as Locale);
  }, [locale, setLocale]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <LanguagesIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {locales.map(({ code, name }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => startTransition(() => setUserLocale(code))}
            className="flex items-center"
          >
            {name}
            {code === locale ? <CheckIcon className="ml-auto size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
