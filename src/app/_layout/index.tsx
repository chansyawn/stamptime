import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ColorModeProvider } from "@/features/color-mode/color-mode-context";
import { Auxiliary } from "./auxiliary";
import { References } from "./reference";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorModeProvider>
        <TooltipProvider delayDuration={200}>
          <header className="sticky top-0 z-10 mb-2 border-b bg-background py-2">
            <div className="container flex items-center">
              <h1 className="mr-auto flex items-center gap-1 font-mono text-2xl font-semibold">
                <Image src="/icon.svg" alt="STAMPTIME" width={24} height={24} />
                STAMPTIME
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
      <Toaster />
    </>
  );
}
