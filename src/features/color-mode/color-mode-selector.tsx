"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CheckIcon, MoonIcon, SunIcon } from "lucide-react";
import { useColorMode } from "./color-mode-context";

export function ColorModeSelector() {
  const [colorMode, setColorMode] = useColorMode();

  const colorModeOptions = [
    {
      key: "light",
      label: "Light",
      onClick: () => {
        setColorMode("light");
      },
    },
    {
      key: "dark",
      label: "Dark",
      onClick: () => {
        setColorMode("dark");
      },
    },
    {
      key: "system",
      label: "System",
      onClick: () => {
        setColorMode("system");
      },
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <SunIcon className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {colorModeOptions.map(({ key, label, onClick }) => (
          <DropdownMenuItem key={key} onClick={onClick}>
            {label}
            {key === colorMode ? (
              <CheckIcon className="ml-auto size-4" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
