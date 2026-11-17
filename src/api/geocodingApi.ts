import {
  geocodingErrorSchema,
  geocodingResponseSchema,
  type GeoLocation,
} from "../schemas/geocoding.schema";
import type { Location } from "../types/location";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

export type SearchOptions = {
  count?: number; // 1..100, API default 10
  language?: string; // "en", "ar", ... (lower-case)
  countryCode?: string; // ISO alpha2, e.g. "EG". Empty = all countries
};

export class GeocodingError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "GeocodingError";
    this.status = status;
  }
}

export async function searchLocations(
  name: string,
  { count = 10, language = "en", countryCode }: SearchOptions = {},
  signal?: AbortSignal,
): Promise<GeoLocation[]> {
  // URLSearchParams handles encoding and avoids string-concat bugs.
  const params = new URLSearchParams({
    name,
    count: String(count),
    language,
    format: "json",
  });
  if (countryCode) params.set("countryCode", countryCode.toUpperCase());

  const response = await fetch(`${GEOCODING_URL}?${params}`, { signal });
  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const parsedError = geocodingErrorSchema.safeParse(body);
    throw new GeocodingError(
      parsedError.success
        ? parsedError.data.reason
        : `Geocoding request failed (${response.status})`,
      response.status,
    );
  }

  // parse() throws if the API shape ever changes -> React Query shows an error.
  return geocodingResponseSchema.parse(body).results;
}

/** Narrows a raw geocoding result to the app-level Location shape. */
export function toLocation(geo: GeoLocation): Location {
  return {
    id: geo.id,
    name: geo.name,
    country: geo.country,
    admin1: geo.admin1,
    latitude: geo.latitude,
    longitude: geo.longitude,
  };
}
