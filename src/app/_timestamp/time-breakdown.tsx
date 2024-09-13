"use client";

import { type PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MinusCircleIcon } from "lucide-react";
import { TimezoneSelector } from "./timezone-selector";
import { TimestampBreakdownInput } from "./time-breakdown-input";
import { getTimezoneOffset, toSecondTimestamp } from "./utils";
import { TIME_FIELDS } from "./constant";
import { allETCTimezonesAtom, supportedTimezonesAtom } from "./atom";

export interface TimeBreakdownProps {
  value: number;
  onChange: (value: number) => void;
  timezone: string;
}

function TimeBreakdown({ value, onChange, timezone }: TimeBreakdownProps) {
  const timestamp = value * 1000;
  const realOffset =
    -new Date(timestamp).getTimezoneOffset() +
    getTimezoneOffset(timezone, value);

  const date = new Date(timestamp - realOffset * 6e4);

  return (
    <>
      {TIME_FIELDS.map(({ label, field, get, set }) => {
        let width = "8ch";
        if (field === "year") {
          const isPositiveYear = date.getFullYear() < 0 ? 1 : 0;
          const yearLength = Math.max(4, String(date.getFullYear()).length);
          width = `calc(3rem + ${yearLength + isPositiveYear}ch)`;
        }

        return (
          <TimestampBreakdownInput
            key={field}
            label={label}
            value={get(date)}
            width={width}
            onChange={(value: number) => {
              const targetTimestamp = toSecondTimestamp(
                new Date(set(date, value) + realOffset * 6e4).valueOf(),
              );
              if (!Number.isNaN(targetTimestamp)) {
                onChange(targetTimestamp);
              }
            }}
          />
        );
      })}
    </>
  );
}

export function TimeBreakdownWithFixedTimezone({
  timezone,
  ...breakdownProps
}: TimeBreakdownProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button
          className="w-fit justify-start disabled:opacity-100"
          variant="secondary"
          size="sm"
          disabled
        >
          <span className="truncate">{timezone}</span>
        </Button>
        <TimezoneInfo timezone={timezone} />
      </div>
      <div className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-1">
        <TimeBreakdown timezone={timezone} {...breakdownProps} />
      </div>
    </div>
  );
}

type TimeBreakdownWithCustomTimezoneProps = {
  timezoneAtom: PrimitiveAtom<string>;
  onRemove: () => void;
} & Omit<TimeBreakdownProps, "timezone">;

export function TimeBreakdownWithCustomTimezone({
  timezoneAtom,
  onRemove,
  value,
  ...breakdownProps
}: TimeBreakdownWithCustomTimezoneProps) {
  const [timezone, onTimezoneChange] = useAtom(timezoneAtom);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <TimezoneSelector value={timezone} onChange={onTimezoneChange} />
        <TimezoneInfo timezone={timezone} />
        <Button
          variant="ghost"
          size="icon"
          className="-ml-1 size-6"
          onClick={onRemove}
        >
          <MinusCircleIcon className="size-4 text-destructive" />
        </Button>
      </div>
      <div className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-1">
        <TimeBreakdown value={value} timezone={timezone} {...breakdownProps} />
      </div>
    </div>
  );
}

export function TimezoneInfo({ timezone }: { timezone: string }) {
  const supportedTimezones = useAtomValue(supportedTimezonesAtom);
  const allETCTimezones = useAtomValue(allETCTimezonesAtom);

  const timezoneInfo = [...supportedTimezones, ...allETCTimezones].find(
    ({ label }) => label === timezone,
  );

  if (!timezoneInfo) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 whitespace-nowrap">
      <Badge variant="outline">{timezoneInfo.offset}</Badge>
      {timezoneInfo.abbr ? (
        <Badge variant="outline">{timezoneInfo.abbr}</Badge>
      ) : null}
      {timezoneInfo.dst ? <Badge variant="secondary">DST</Badge> : null}
    </div>
  );
}
