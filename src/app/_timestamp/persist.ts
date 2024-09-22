import { z } from "zod";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import { atomWithValidatedStorage } from "@/features/local-storage/atom-with-validated-storage";
import { LocalStorageKey } from "@/features/local-storage/local-storage-key";
import { ALL_UTC_OFFSETS, SUPPORTED_TIMEZONES } from "./constant";
import { TimestampGranularity } from "./timestamp-granularity";

const PERSIST_SCHEMA = z.object({
  granularity: z.nativeEnum(TimestampGranularity),
  customTimezone: z.array(
    z.enum([...ALL_UTC_OFFSETS, ...SUPPORTED_TIMEZONES] as [
      string,
      ...string[],
    ]),
  ),
});

type Persist = z.infer<typeof PERSIST_SCHEMA>;

const persistAtom = atomWithValidatedStorage<Persist>(
  LocalStorageKey.TimestampConfig,
  {
    granularity: TimestampGranularity.Second,
    customTimezone: [],
  },
  PERSIST_SCHEMA,
);

export const timezoneAtomsAtom = splitAtom(
  focusAtom(persistAtom, (optic) => optic.prop("customTimezone")),
);

export const granularityAtom = focusAtom(persistAtom, (optic) =>
  optic.prop("granularity"),
);
