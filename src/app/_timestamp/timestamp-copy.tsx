import { Badge } from "@/components/ui/badge";
import { getTimezoneOffset } from "./utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useClipboard } from "@/hooks/use-clipboard";
import { cn } from "@/lib/utils";
import { CopyIcon, CheckIcon } from "lucide-react";
import { useLocale } from "next-intl";

interface TimestampCopyProps {
  timestamp: number;
  timezone: string;
}

export function TimestampCopy({ timestamp, timezone }: TimestampCopyProps) {
  const { copy, copied } = useClipboard();
  const locale = useLocale();

  const getIntlDateTimeFormatterPreset = (
    preset: "full" | "long" | "medium" | "short",
  ) => ({
    label: `Intl-${preset}`,
    formatter: (value: number, timezone: string) =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: preset,
        timeStyle: preset,
        timeZone: timezone,
      }).format(value * 1000),
  });

  const TIME_FORMATTER: {
    label: string;
    formatter: (value: number, timezone: string) => string;
  }[] = [
    {
      label: "ISO",
      formatter: (value, timezone) =>
        new Date(
          value * 1000 - getTimezoneOffset(timezone, value) * 6e4,
        ).toISOString(),
    },
    getIntlDateTimeFormatterPreset("short"),
    getIntlDateTimeFormatterPreset("medium"),
    getIntlDateTimeFormatterPreset("long"),
    getIntlDateTimeFormatterPreset("full"),
  ];

  const options = TIME_FORMATTER.map(({ label, formatter }) => {
    const value = formatter(timestamp, timezone);

    return {
      key: label,
      label: (
        <span>
          {value} <Badge variant="secondary">{label}</Badge>
        </span>
      ),
      data: value,
    };
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <CopyIcon
            className={cn(
              "size-4 transition-transform",
              copied ? "-rotate-90 scale-0" : "rotate-0 scale-100",
            )}
          />
          <CheckIcon
            className={cn(
              "absolute size-4 transition-transform",
              copied ? "rotate-0 scale-100" : "rotate-90 scale-0",
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map(({ key, label, data }) => (
          <DropdownMenuItem key={key} onClick={() => copy(data)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
