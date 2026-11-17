import type { ReactNode } from "react";
import { COUNTRIES, LANGUAGES, RESULT_COUNTS } from "../constants/search";

type FilterFieldProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

function FilterField({ label, children, className = "" }: FilterFieldProps) {
  return (
    <label className={`flex flex-col text-sm ${className}`}>
      {label}
      {children}
    </label>
  );
}

type FiltersProps = {
  search: string;
  onSearchChange: (search: string) => void;
  countryCode: string;
  onCountryCodeChange: (countryCode: string) => void;
  count: number;
  onCountChange: (count: number) => void;
  language: string;
  onLanguageChange: (language: string) => void;
};

export default function Filters({
  search,
  onSearchChange,
  countryCode,
  onCountryCodeChange,
  count,
  onCountChange,
  language,
  onLanguageChange,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 items-end">
      <FilterField label="Name or postal code" className="min-w-48 flex-1">
        <input
          className="border rounded-lg px-3 py-2"
          placeholder='e.g. "Alex" or "Paris, France"'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          autoFocus
        />
      </FilterField>
      <FilterField label="Country">
        <select
          className="border rounded-lg px-3 py-2"
          value={countryCode}
          onChange={(e) => onCountryCodeChange(e.target.value)}
        >
          {COUNTRIES.map(({ code, label }) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </FilterField>
      <FilterField label="Count">
        <select
          className="border rounded-lg px-3 py-2"
          value={count}
          onChange={(e) => onCountChange(Number(e.target.value))}
        >
          {RESULT_COUNTS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </FilterField>
      <FilterField label="Language">
        <select
          className="border rounded-lg px-3 py-2"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          {LANGUAGES.map(({ code, label }) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </FilterField>
    </div>
  );
}
