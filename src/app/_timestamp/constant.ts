import { getEtcTimezoneNameByOffset } from "./utils";

export const SUPPORTED_TIMEZONES = Intl.supportedValuesOf("timeZone");

export const ALL_UTC_OFFSETS = new Array(26)
  .fill(0)
  .map((_, idx) => getEtcTimezoneNameByOffset(60 * (idx - 14)));

// Max timestamp in ECMAScript Date is milliseconds of ±100,000,000 days,
// minus two day for timezone convert correctly there.
// https://stackoverflow.com/questions/12666127/what-range-of-dates-are-permitted-in-javascript
// https://en.wikipedia.org/wiki/Time_formatting_and_storage_bugs#Year_275,760
export const MAX_TIMESTAMP = 60 * 60 * 24 * (100000000 - 2);

export const TIME_FIELDS: {
  label: string;
  field: string;
  get: (date: Date) => number;
  set: (date: Date, value: number) => number;
}[] = [
  {
    label: "Y",
    field: "year",
    get: (date) => date.getFullYear(),
    set: (date, value) => date.setFullYear(value),
  },
  {
    label: "M",
    field: "month",
    get: (date) => date.getMonth() + 1,
    set: (date, value) => date.setMonth(value - 1),
  },
  {
    label: "D",
    field: "date",
    get: (date) => date.getDate(),
    set: (date, value) => date.setDate(value),
  },
  {
    label: "h",
    field: "hours",
    get: (date) => date.getHours(),
    set: (date, value) => date.setHours(value),
  },
  {
    label: "m",
    field: "minutes",
    get: (date) => date.getMinutes(),
    set: (date, value) => date.setMinutes(value),
  },
  {
    label: "s",
    field: "seconds",
    get: (date) => date.getSeconds(),
    set: (date, value) => date.setSeconds(value),
  },
];
