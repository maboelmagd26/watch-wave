import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchLocations, type SearchOptions } from "../api/geocodingApi";
import useDebouncedValue from "./useDebouncedValue";

/** The API returns nothing for 0-1 characters, so don't spend a request on it. */
export const MIN_QUERY_LENGTH = 2;

export default function useLocationSearch(
  rawQuery: string,
  { count = 10, language = "en", countryCode = "" }: SearchOptions = {},
) {
  const query = useDebouncedValue(rawQuery.trim().toLowerCase());
  const enabled = query.length >= MIN_QUERY_LENGTH;

  return useQuery({
    // Normalised key: "Alex", "alex " and "ALEX" share one cache entry.
    queryKey: ["geocoding", query, count, language, countryCode],
    queryFn: ({ signal }) =>
      searchLocations(query, { count, language, countryCode }, signal),
    enabled,
    // Keep old rows visible while typing, but clear them once the query is too short.
    placeholderData: enabled ? keepPreviousData : undefined,
  });
}
