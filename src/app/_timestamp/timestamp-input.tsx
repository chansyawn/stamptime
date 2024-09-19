import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TimestampGranularitySwitcher } from "./timestamp-granularity-switcher";
import { MAX_TIMESTAMP } from "./constant";
import {
  type TimestampGranularity,
  TIMESTAMP_GRANULARITY_VALUE_LENGTH,
} from "./timestamp-granularity";
import { TimestampQuickPicker } from "./timestamp-quick-picker";

interface TimestampInputProps {
  timestamp: number;
  onTimestampChange: (timestamp: number) => void;
  granularity: TimestampGranularity;
  onGranularityChange: (granularity: TimestampGranularity) => void;
}

export function TimestampInput({
  timestamp,
  onTimestampChange,
  granularity,
  onGranularityChange,
}: TimestampInputProps) {
  const granularityValueLength =
    TIMESTAMP_GRANULARITY_VALUE_LENGTH[granularity];
  const [granularityValue, setGranularityValue] = useState(() =>
    "0".repeat(granularityValueLength),
  );

  const handleValueChange = (value: string, granularityValueLength: number) => {
    if (!/^-?[0-9]*$/.exec(value)) return;

    if (granularityValueLength === 0) {
      onTimestampChange(Number(value));
      setGranularityValue("");
    } else if (value.length === 0 || Number(value) === 0) {
      onTimestampChange(0);
      setGranularityValue("0");
    } else {
      onTimestampChange(Number(value.slice(0, -granularityValueLength)));
      setGranularityValue(value.slice(-granularityValueLength));
    }
  };

  const handleGranularityChange = (value: TimestampGranularity) => {
    onGranularityChange(value);
    handleValueChange(
      `${timestamp}${granularityValue}`,
      TIMESTAMP_GRANULARITY_VALUE_LENGTH[value],
    );
  };

  const isReachMaxTimestamp = Math.abs(timestamp) === MAX_TIMESTAMP;

  const [timestampDisplay, granularityValueDisplay] = (() => {
    if (timestamp === 0 && granularityValueLength !== 0) {
      return ["", granularityValue];
    }
    return [timestamp, granularityValue];
  })();

  return (
    <div className="mt-1">
      <div className="mb-2 flex items-center gap-2">
        <div className="relative">
          <Input
            type="number"
            style={{ width: `calc(${15 + granularityValueLength}ch + 2rem)` }}
            className="h-10 bg-transparent text-xl"
            value={`${timestampDisplay}${granularityValueDisplay}`}
            onChange={(e) => {
              handleValueChange(e.target.value, granularityValueLength);
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 top-0 -z-[1] flex h-10 select-none items-center border border-transparent px-3 text-xl text-transparent">
            {timestampDisplay}
            <span className="bg-secondary">{granularityValueDisplay}</span>
          </div>
        </div>
        {/* <PasteButton
          variant="outline"
          onPaste={(value) => {
            handleValueChange(value, granularityValueLength);
          }}
        /> */}
      </div>
      {isReachMaxTimestamp ? (
        <div className="mb-1 px-1 text-xs text-destructive">
          Reach the maximum supported timestamp.
          <Tooltip>
            <TooltipTrigger className="ml-1 underline">
              Why is {MAX_TIMESTAMP}?
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-96">
                Max timestamp in ECMAScript Date is milliseconds of ±100,000,000
                days (8640000000000), use 8600000000000 as maximum for timezone
                convert correctly there.
                <a
                  className="ml-1 cursor-pointer underline"
                  target="_blank"
                  href="https://en.wikipedia.org/wiki/Time_formatting_and_storage_bugs#Year_275,760"
                  rel="noopener"
                >
                  Read more
                </a>
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      ) : null}
      <TimestampGranularitySwitcher
        value={granularity}
        onChange={handleGranularityChange}
      />
      <TimestampQuickPicker
        timestamp={timestamp}
        granularityValue={granularityValue}
        granularity={granularity}
        onChange={(value) => {
          handleValueChange(value, granularityValueLength);
        }}
      />
    </div>
  );
}
