import { ClipboardIcon } from "lucide-react";
import { useClipboard } from "@/hooks/use-clipboard";
import { ButtonProps, Button } from "./ui/button";

interface PasteButtonProps {
  className?: string;
  variant?: ButtonProps["variant"];
  onPaste: (value: string) => void;
}

export function PasteButton({ onPaste, variant, className }: PasteButtonProps) {
  const { pasteable, paste } = useClipboard();

  return (
    <Button
      className={className}
      disabled={!pasteable}
      variant={variant}
      size="icon"
      onClick={() => paste().then(onPaste)}
    >
      <ClipboardIcon className="size-4" />
    </Button>
  );
}
