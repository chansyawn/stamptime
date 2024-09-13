import {
  TIMESTAMP_GRANULARITY_VALUE_LENGTH,
  TimestampGranularity,
} from "./timestamp-granularity";

export const getEtcTimezoneNameByOffset = (offset: number) =>
  `Etc/GMT${offset >= 0 ? "+" : "-"}${Math.floor(Math.abs(offset / 60))}`;

export const getTimezoneOffset = (timezone: string, timestamp: number) => {
  // Formatting B.C. dates with `toLocaleString` does not add a negative sign to the year,
  // and adding the `era` attribute to the `option` causes the new Date to be parsed incorrectly.
  // So when the date is < 1970/1/1, use the utc offset of 1970/1/1 instead.
  const date = new Date(Math.max(0, timestamp * 1000));
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
  return date.getTimezoneOffset() - (tzDate.getTime() - date.getTime()) / 6e4;
};

export const isDST = (timezone: string, timestamp: number) => {
  const year = new Date(timestamp * 1000).getUTCFullYear();

  const winterSolsticeOffset = getTimezoneOffset(
    timezone,
    toSecondTimestamp(Date.UTC(year, 11, 21)),
  );
  const summerSolsticeOffset = getTimezoneOffset(
    timezone,
    toSecondTimestamp(Date.UTC(year, 6, 21)),
  );
  if (winterSolsticeOffset === summerSolsticeOffset) {
    return false;
  }
  return getTimezoneOffset(timezone, timestamp) === summerSolsticeOffset;
};

export const toSecondTimestamp = (
  timestamp: number,
  granularity: TimestampGranularity = TimestampGranularity.Millisecond,
) => {
  return Math.trunc(
    timestamp / 10 ** TIMESTAMP_GRANULARITY_VALUE_LENGTH[granularity],
  );
};

export const getTimezoneName = (
  timezone: string,
  timestamp: number,
  formatter: Intl.DateTimeFormatOptions["timeZoneName"],
) => {
  return Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: formatter,
  })
    .formatToParts(new Date(timestamp * 1000))
    .find((part) => {
      return part.type === "timeZoneName";
    })?.value;
};
