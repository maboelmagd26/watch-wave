import { z } from "zod";

export const geoLocationSchema = z.object({
  // Always present: without these a result is useless to us.
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),

  // Practically always present, but the docs don't promise it -> optional.
  elevation: z.number().optional(),
  timezone: z.string().optional(),
  feature_code: z.string().optional(), // GeoNames code: PPLC, PPLA, AIRP...
  country_code: z.string().optional(), // e.g. "EG"
  country: z.string().optional(),
  country_id: z.number().optional(),

  // Airports have no population, Egypt has no postcodes, places may not have admins attached.
  population: z.number().optional(),
  postcodes: z.array(z.string()).optional(),

  admin1: z.string().optional(),
  admin2: z.string().optional(),
  admin3: z.string().optional(),
  admin4: z.string().optional(),
  admin1_id: z.number().optional(),
  admin2_id: z.number().optional(),
  admin3_id: z.number().optional(),
  admin4_id: z.number().optional(),
});

/**
 * When nothing matches, the API returns `{ "generationtime_ms": 0.06 }`
 * with NO `results` key at all, so we default it to an empty array.
 */
export const geocodingResponseSchema = z.object({
  results: z.array(geoLocationSchema).default([]),
  generationtime_ms: z.number().optional(),
});

/** HTTP 400 body: { "error": true, "reason": "Parameter count must be between 1 and 100." } */
export const geocodingErrorSchema = z.object({
  error: z.literal(true),
  reason: z.string(),
});

export type GeoLocation = z.infer<typeof geoLocationSchema>;
