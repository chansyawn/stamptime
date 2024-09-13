import { useSyncExternalStore } from "react";

export const useMediaQuery = (query: string) => {
  return useSyncExternalStore(
    (callback) => {
      matchMedia(query).addEventListener("change", callback);
      return () => {
        matchMedia(query).removeEventListener("change", callback);
      };
    },
    () => matchMedia(query).matches,
    () => true,
  );
};
