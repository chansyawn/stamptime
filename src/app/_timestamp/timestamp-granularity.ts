export enum TimestampGranularity {
  Second = "seconds",
  Millisecond = "milliseconds",
  Microsecond = "microseconds",
  Nanosecond = "nanoseconds",
}

export const TIMESTAMP_GRANULARITY_VALUE_LENGTH: Record<
  TimestampGranularity,
  number
> = {
  [TimestampGranularity.Second]: 0,
  [TimestampGranularity.Millisecond]: 3,
  [TimestampGranularity.Microsecond]: 6,
  [TimestampGranularity.Nanosecond]: 9,
};
