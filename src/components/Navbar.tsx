import { useEffect, useRef, useState } from "react";
import { PRESET_CITIES } from "../api/marineApi";
export default function Navbar() {
  const [query, setQuery] = useState("");
  const cityRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    cityRef.current?.focus();
  }, []);
  return (
    <header className="bg-sky-900 md:relative text-slate-200 flex flex-col gap-3 py-5 px-2">
      {/* APP NAME AND LOGO */}
      <div className="flex gap-4 items-center">
        <span aria-hidden text-6xl>
          🌊
        </span>
        <h1 className="font-bold text-2xl md:text-4xl tracking-tight md:tracking-wider">
          Watch Wave
        </h1>
      </div>
      {/* Input to show query Results */}
      <div className="w-full md:max-w-60 md:absolute top-8 right-4">
        <input
          id="search-city"
          type="text"
          placeholder="Search a coastal city, e.g. Alexandria"
          ref={cityRef}
          className="py-2 px-3 rounded-xl opacity-50 w-full placeholder-sky-200 text-sm focus:ring-sky-300 ring-1 bg-white/10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {/* NAV of Quick searches */}
      <nav className="p-1 text-md text-gray-300" aria-label="Quick Locations">
        <ul className="flex gap-1 items-center">
          {PRESET_CITIES.map((city) => (
            <li key={city.id}>
              <button className="rounded-full px-3 py-1 border-2 text-sm">
                {city.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
