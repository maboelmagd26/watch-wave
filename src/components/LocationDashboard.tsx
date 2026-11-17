import { useState } from "react";
import { toLocation } from "../api/geocodingApi";
import useLocationSearch, { MIN_QUERY_LENGTH } from "../hooks/useLocationSearch";
import type { Location } from "../types/location";
import Filters from "./Filters";

// Small subset of GeoNames feature codes: https://www.geonames.org/export/codes.html
const FEATURE_LABELS: Record<string, string> = {
  PPLC: "Capital",
  PPLA: "Admin capital",
  PPLA2: "Admin-2 capital",
  PPL: "Populated place",
  AIRP: "Airport",
  PRT: "Port",
  ISL: "Island",
  BAY: "Bay",
};

const TABLE_HEADERS = [
  "Name",
  "Region",
  "Type",
  "Population",
  "Elevation",
  "Timezone",
  "Coordinates",
];

const numberFmt = new Intl.NumberFormat("en");

/** circle-flags: one SVG per ISO alpha2 code, lower-case file name. */
function Flag({ code }: { code?: string }) {
  const file = code ? code.toLowerCase() : "xx"; // "xx" = unknown flag
  return (
    <img
      src={`https://hatscripts.github.io/circle-flags/flags/${file}.svg`}
      alt={code ?? "unknown"}
      width={20}
      height={20}
      loading="lazy"
    />
  );
}

type LocationDashboardProps = {
  onLocationSelect: (location: Location) => void;
};

export default function LocationDashboard({
  onLocationSelect,
}: LocationDashboardProps) {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(10);
  const [countryCode, setCountryCode] = useState("");
  const [language, setLanguage] = useState("en");

  const {
    data = [],
    isFetching,
    isError,
    error,
  } = useLocationSearch(query, { count, countryCode, language });

  const countriesInResults = new Set(data.map((r) => r.country_code)).size;
  const isQueryTooShort = query.trim().length < MIN_QUERY_LENGTH;

  return (
    <section className="flex flex-col gap-4 p-4 w-full">
      <Filters
        search={query}
        onSearchChange={setQuery}
        countryCode={countryCode}
        onCountryCodeChange={setCountryCode}
        count={count}
        onCountChange={setCount}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* STATS */}
      <div className="flex gap-4 text-sm text-slate-600">
        <span>Results: {data.length}</span>
        <span>Countries: {countriesInResults}</span>
        {isFetching && <span className="text-sky-700">Loading…</span>}
      </div>

      {isError && <p className="text-red-600">{error.message}</p>}
      {isQueryTooShort && (
        <p className="text-slate-500 text-sm">
          Type at least {MIN_QUERY_LENGTH} characters.
        </p>
      )}

      {/* RESULTS TABLE */}
      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100">
              <tr>
                {TABLE_HEADERS.map((header) => (
                  <th key={header} className="p-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr
                  key={r.id}
                  className="border-b hover:bg-sky-50 cursor-pointer"
                  onClick={() => onLocationSelect(toLocation(r))}
                >
                  <td className="p-2 flex items-center gap-2">
                    <Flag code={r.country_code} />
                    {r.name}
                  </td>
                  <td className="p-2">
                    {[r.admin1, r.admin2, r.country].filter(Boolean).join(", ")}
                  </td>
                  <td className="p-2">
                    {r.feature_code
                      ? (FEATURE_LABELS[r.feature_code] ?? r.feature_code)
                      : "—"}
                  </td>
                  <td className="p-2">
                    {r.population ? numberFmt.format(r.population) : "—"}
                  </td>
                  <td className="p-2">
                    {r.elevation !== undefined ? `${r.elevation} m` : "—"}
                  </td>
                  <td className="p-2">{r.timezone ?? "—"}</td>
                  <td className="p-2 font-mono">
                    {r.latitude.toFixed(3)}, {r.longitude.toFixed(3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
