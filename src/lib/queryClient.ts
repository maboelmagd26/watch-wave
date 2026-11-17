import { QueryClient } from "@tanstack/react-query";
import { ZodError } from "zod";
import { GeocodingError } from "../api/geocodingApi";

const HOUR_MS = 1000 * 60 * 60;
const MAX_RETRIES = 2;

/** Retrying can't fix a bad request (4xx) or an unexpected response shape. */
function shouldRetry(failureCount: number, error: Error): boolean {
  if (error instanceof GeocodingError && error.status < 500) return false;
  if (error instanceof ZodError) return false;
  return failureCount < MAX_RETRIES;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: HOUR_MS,
      gcTime: 24 * HOUR_MS,
      retry: shouldRetry,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: "always",
    },
  },
});
