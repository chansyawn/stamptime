"use client";

import { cn } from "@/lib/utils";
import { TimestampGranularity } from "./timestamp-granularity";

interface TimestampGranularitySwitcherProps {
  value: TimestampGranularity;
  onChange: (value: TimestampGranularity) => void;
}

export function TimestampGranularitySwitcher({
  value,
  onChange,
}: TimestampGranularitySwitcherProps) {
  const renderOption = (timestampUnit: TimestampGranularity) => {
    return (
      <button
        key={timestampUnit}
        type="button"
        className={cn(
          "flex h-6 items-center justify-center rounded-full px-2 text-center text-sm transition-colors hover:text-primary",
          value === timestampUnit
            ? "bg-muted font-medium text-primary"
            : "text-muted-foreground",
        )}
        onClick={() => {
          onChange(timestampUnit);
        }}
      >
        {timestampUnit}
      </button>
    );
  };

  return (
    <div className="mb-2 flex flex-wrap">
      {Object.values(TimestampGranularity).map(renderOption)}
    </div>
  );
}
