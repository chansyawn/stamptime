"use client";

import { cn } from "@/lib/utils";
import { ColorModeSelector } from "@/features/color-mode/color-mode-selector";

interface AuxiliaryProps {
  className?: string;
}

export function Auxiliary({ className }: AuxiliaryProps) {
  return (
    <div className={cn("flex gap-1", className)}>
      <ColorModeSelector />
    </div>
  );
}
