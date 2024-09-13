import { atom } from "jotai";
import { atomWithDebounce } from "@/lib/atom-with-debounce";
import {
  ALL_UTC_OFFSETS,
  MAX_TIMESTAMP,
  SUPPORTED_TIMEZONES,
} from "./constant";
import { getTimezoneName, isDST, toSecondTimestamp } from "./utils";

const { currentValueAtom, debouncedValueAtom } = atomWithDebounce<number>(
  toSecondTimestamp(new Date().valueOf()),
);

export const timestampAtom = atom(
  (get) => get(currentValueAtom),
  (_, set, value: number) => {
    const clampedValue = Math.min(
      Math.max(value, -MAX_TIMESTAMP),
      MAX_TIMESTAMP,
    );
    set(debouncedValueAtom, clampedValue);
  },
);

export const supportedTimezonesAtom = atom((get) =>
  SUPPORTED_TIMEZONES.map((timezone) =>
    getTimezoneInfo(timezone, get(debouncedValueAtom), true),
  ),
);

export const allETCTimezonesAtom = atom((get) =>
  ALL_UTC_OFFSETS.map((timezone) =>
    getTimezoneInfo(timezone, get(debouncedValueAtom), false),
  ),
);

const getTimezoneInfo = (
  timezone: string,
  timestamp: number,
  abbr: boolean,
) => {
  return {
    label: timezone,
    offset: getTimezoneName(timezone, timestamp, "shortOffset"),
    dst: isDST(timezone, timestamp),
    abbr: abbr
      ? getTimezoneName(timezone, timestamp, "longGeneric")
      : undefined,
  };
};
