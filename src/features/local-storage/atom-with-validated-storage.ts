import { atomWithStorage } from "jotai/utils";
import { type z } from "zod";
import { type LocalStorageKey } from "./local-storage-key";

export const atomWithValidatedStorage = <Value extends Record<string, unknown>>(
  key: LocalStorageKey,
  initialValue: Value,
  schema: z.ZodType<Value>,
) =>
  atomWithStorage(
    key,
    initialValue,
    {
      getItem: (key, initialValue) => {
        try {
          return schema.parse(JSON.parse(localStorage.getItem(key) ?? ""));
        } catch {
          return initialValue;
        }
      },
      setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
      },
      removeItem: (key) => {
        localStorage.removeItem(key);
      },
      /** Only read when initializing */
      subscribe: undefined,
    },
    { getOnInit: true },
  );
