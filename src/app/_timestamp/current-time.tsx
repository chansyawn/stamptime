"use client";

import { useEffect, useState } from "react";
import { toSecondTimestamp } from "./utils";

export function CurrentTime() {
  const [currentTimestamp, setCurrentTimestamp] = useState(
    new Date().valueOf(),
  );
  const currTimestampSeconds = toSecondTimestamp(currentTimestamp);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setCurrentTimestamp(new Date().valueOf());
    }, 1000);

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  return <div className="ml-auto text-4xl">{currTimestampSeconds}</div>;
}
