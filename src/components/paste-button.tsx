import { ClipboardIcon } from "lucide-react";
import { useClipboard } from "@/hooks/use-clipboard";
import { ButtonProps, Button } from "./ui/button";
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PasteButtonProps {
  className?: string;
  variant?: ButtonProps["variant"];
  onPaste: (value: string) => void;
}

export function PasteButton({ onPaste, variant, className }: PasteButtonProps) {
  const { pasteable, paste } = useClipboard();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={className}
          disabled={!pasteable}
          variant={variant}
          size="icon"
          onClick={() => {
            void paste().then(onPaste);
          }}
        >
          <ClipboardIcon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Paste from clipboard</TooltipContent>
    </Tooltip>
  );
}
