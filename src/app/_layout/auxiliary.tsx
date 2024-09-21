import { cn } from "@/lib/utils";
import { ColorModeSelector } from "@/features/color-mode/color-mode-selector";
import { Button } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LanguageSelector } from "@/features/i18n/language-selector";

interface AuxiliaryProps {
  className?: string;
}

export function Auxiliary({ className }: AuxiliaryProps) {
  return (
    <div className={cn("flex gap-1", className)}>
      <LanguageSelector />
      <a
        href="https://github.com/chansyawn/stamptime"
        target="_blank"
        rel="noopener"
      >
        <Button variant="ghost" size="icon">
          <SiGithub className="size-4" />
        </Button>
      </a>
      <ColorModeSelector />
    </div>
  );
}
