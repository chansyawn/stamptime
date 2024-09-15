"use client";

import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ColorModeProvider } from "@/features/color-mode/color-mode-context";
import { Auxiliary } from "./auxiliary";
import { References } from "./reference";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ColorModeProvider>
      <TooltipProvider delayDuration={200}>
        <header className="sticky top-0 z-10 mb-2 border-b bg-background py-2">
          <div className="container flex items-center">
            <h1 className="mr-auto font-mono text-2xl font-semibold">
              ⌛STAMPTIME
            </h1>
            <Auxiliary />
          </div>
        </header>
        <main className="container isolate">
          {children}
          <aside className="mt-4">
            <References />
          </aside>
        </main>
      </TooltipProvider>
    </ColorModeProvider>
  );
}
