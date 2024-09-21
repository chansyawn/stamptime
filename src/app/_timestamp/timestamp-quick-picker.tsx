"use client";

import { Button } from "@/components/ui/button";
import {
  TIMESTAMP_GRANULARITY_VALUE_LENGTH,
  TimestampGranularity,
} from "./timestamp-granularity";
import { useTranslations } from "next-intl";

interface TimestampQuickPickerProps {
  timestamp: number;
  granularityValue: string;
  granularity: TimestampGranularity;
  onChange: (value: string) => void;
}

interface QuickPickerOption {
  label: string;
  getValue: (value: {
    timestamp: number;
    granularityValue: string;
    granularity: TimestampGranularity;
  }) => string;
  disabled?: (granularity: TimestampGranularity) => boolean;
}

const TIMESTAMP_QUICK_PICKER_OPTIONS = [
  { label: "0", getValue: () => "0" },
  {
    label: "now",
    getValue: ({ granularity }) => {
      const granularityValueLength =
        TIMESTAMP_GRANULARITY_VALUE_LENGTH[granularity];
      return `${Date.now()}${"0".repeat(granularityValueLength)}`.slice(0, -3);
    },
  },
  {
    label: "x1000",
    getValue: ({ timestamp, granularityValue }) =>
      `${timestamp}${granularityValue}000`,
  },
  {
    label: "÷1000",
    getValue: ({ timestamp, granularityValue }) =>
      `${timestamp}${granularityValue}`.slice(0, -3),
  },
  {
    label: "precise-to-seconds",
    getValue: ({ timestamp, granularity }) =>
      `${timestamp}${"0".repeat(
        TIMESTAMP_GRANULARITY_VALUE_LENGTH[granularity],
      )}`,
    disabled: (granularity) => granularity === TimestampGranularity.Second,
  },
] as const satisfies QuickPickerOption[];

export function TimestampQuickPicker({
  timestamp,
  granularityValue,
  granularity,
  onChange,
}: TimestampQuickPickerProps) {
  const t = useTranslations("QuickPicker");

  return (
    <div className="flex gap-2">
      {TIMESTAMP_QUICK_PICKER_OPTIONS.filter((item) =>
        "disabled" in item ? !item.disabled(granularity) : true,
      ).map(({ label, getValue }) => (
        <Button
          key={label}
          className="h-fit px-1.5 py-0.5"
          variant="outline"
          onClick={() => {
            onChange(getValue({ timestamp, granularityValue, granularity }));
          }}
        >
          {t(label)}
        </Button>
      ))}
    </div>
  );
}
