"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useAtomValue } from "jotai";
import { ALL_UTC_OFFSETS } from "./constant";
import { allETCTimezonesAtom, supportedTimezonesAtom } from "./atom";
import { useTranslations } from "next-intl";

interface TimezoneSelectorProps {
  value?: string;
  onChange: (value: string) => void;
  trigger?: React.ReactNode;
}

export function TimezoneSelector({
  value,
  onChange,
  trigger,
}: TimezoneSelectorProps) {
  const t = useTranslations();

  const [open, setOpen] = useState(false);
  const [utcMode, setUtcMode] = useState(false);

  const supportedTimezones = useAtomValue(supportedTimezonesAtom);
  const allETCTimezones = useAtomValue(allETCTimezonesAtom);

  const timezoneOptions = utcMode ? allETCTimezones : supportedTimezones;

  const handleUtcModeChange = (utcMode: boolean) => {
    setUtcMode(utcMode);
  };

  const handleSelect = (timezone: string) => {
    onChange(timezone);
    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    setUtcMode(
      ALL_UTC_OFFSETS.find((timezone) => timezone === value) !== undefined,
    );
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant="secondary"
            size="sm"
            role="combobox"
            aria-expanded={open}
          >
            <span className="mr-auto truncate">{value}</span>
            <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Command>
          <CommandInput
            className="border-b-0"
            placeholder={t("timezone-search-placeholder")}
          />
          <div className="flex items-center border-b p-2">
            <Switch
              id="utc-mode"
              checked={utcMode}
              onCheckedChange={handleUtcModeChange}
            />
            <Label htmlFor="utc-mode" className="ml-2 text-sm font-normal">
              {t("etc-timezone")}
            </Label>
            {utcMode ? (
              <Button
                size="sm"
                className="ml-auto h-auto font-normal"
                variant="link"
                asChild
              >
                <a
                  href="https://wikipedia.org/wiki/Tz_database#Area"
                  target="_blank"
                  rel="noopener"
                >
                  {t("etc-timezone-sign-invert-reason")}
                </a>
              </Button>
            ) : null}
          </div>
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup className="h-56 w-full overflow-auto">
              {timezoneOptions.map(({ label, offset, dst }) => (
                <CommandItem
                  key={label}
                  value={label}
                  onSelect={() => {
                    handleSelect(label);
                  }}
                >
                  <div className="flex items-center gap-1">
                    <CheckIcon
                      className={cn(
                        "size-4",
                        value === label ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="truncate">{label}</span>
                    <Badge variant="outline">{offset}</Badge>
                    {dst ? <Badge variant="secondary">DST</Badge> : null}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

TimezoneSelector.displayName = "TimezoneSelector";
