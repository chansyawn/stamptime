import { useState, useCallback } from "react";
import { useBrowserPermission } from "@/features/browser-permission/use-browser-permission";
import { useBrowserPermissionCheck } from "@/features/browser-permission/use-browser-permission-check";

export interface UseClipboardOptions {
  timeout?: number;
}

export const useClipboard = ({ timeout = 1000 }: UseClipboardOptions = {}) => {
  const { verify } = useBrowserPermissionCheck();
  const clipboard = useBrowserPermission("clipboard-read");

  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    (value: string) => {
      void navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, timeout);
      });
    },
    [timeout],
  );

  const paste = useCallback(async () => {
    if (!verify("clipboard-read")) {
      throw new Error("clipboard permission denied");
    }
    const value = await navigator.clipboard.readText();
    return value;
  }, [verify]);

  return {
    pasteable: clipboard !== "unsupported",
    paste,
    copy,
    copied,
  };
};
