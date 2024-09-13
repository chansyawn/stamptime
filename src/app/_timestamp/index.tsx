"use client";

import React from "react";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { CurrentTime } from "./current-time";
import { granularityAtom, timezoneAtomsAtom } from "./persist";
import {
  TimeBreakdownWithCustomTimezone,
  TimeBreakdownWithFixedTimezone,
} from "./time-breakdown";
import { timestampAtom } from "./atom";
import { TimestampInput } from "./timestamp-input";
import { TimezoneSelector } from "./timezone-selector";

function Timestamp() {
  const [timezoneAtoms, dispatchTimezones] = useAtom(timezoneAtomsAtom);
  const [timestamp, setTimestamp] = useAtom(timestampAtom);
  const [granularity, setGranularity] = useAtom(granularityAtom);

  const handleAddTimezone = (timezone: string) => {
    dispatchTimezones({ type: "insert", value: timezone });
  };

  return (
    <div>
      <CurrentTime />
      <TimestampInput
        timestamp={timestamp}
        onTimestampChange={setTimestamp}
        granularity={granularity}
        onGranularityChange={setGranularity}
      />
      <div className="mt-3 flex flex-col gap-4">
        <TimeBreakdownWithFixedTimezone
          value={timestamp}
          onChange={setTimestamp}
          timezone="Etc/UTC"
        />
        <TimeBreakdownWithFixedTimezone
          value={timestamp}
          onChange={setTimestamp}
          timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
        />
        {timezoneAtoms.map((atom) => (
          <TimeBreakdownWithCustomTimezone
            key={atom.toString()}
            value={timestamp}
            onChange={setTimestamp}
            timezoneAtom={atom}
            onRemove={() => {
              dispatchTimezones({ type: "remove", atom });
            }}
          />
        ))}
      </div>
      <TimezoneSelector
        onChange={handleAddTimezone}
        trigger={
          <Button size="sm" className="mt-2">
            <PlusCircleIcon className="mr-1 size-4" />
            Add timezone
          </Button>
        }
      />
    </div>
  );
}

export default Timestamp;
