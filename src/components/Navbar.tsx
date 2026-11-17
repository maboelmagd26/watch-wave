import { PRESET_CITIES } from "../constants/locations";
import type { Location } from "../types/location";

type NavbarProps = {
  selectedLocation: Location;
  onLocationSelect: (location: Location) => void;
};

export default function Navbar({
  selectedLocation,
  onLocationSelect,
}: NavbarProps) {
  return (
    <header className="bg-sky-900 text-slate-200 flex flex-col gap-3 py-5 px-2">
      {/* APP NAME AND LOGO */}
      <div className="flex gap-4 items-center">
        <span aria-hidden className="text-2xl md:text-4xl">
          🌊
        </span>
        <h1 className="font-bold text-3xl md:text-4xl tracking-tight md:tracking-wider">
          Watch Wave
        </h1>
      </div>

      {/* QUICK LOCATIONS */}
      <nav className="p-1 text-md text-gray-300" aria-label="Quick locations">
        <ul className="flex gap-1 items-center">
          {PRESET_CITIES.map((city) => {
            const isSelected = city.id === selectedLocation.id;
            return (
              <li key={city.id}>
                <button
                  type="button"
                  className={`rounded-full px-3 py-1 border-2 text-sm transition-colors ${
                    isSelected
                      ? "text-sky-900 bg-white"
                      : "bg-white/10 hover:bg-white/50 hover:text-black"
                  }`}
                  aria-pressed={isSelected}
                  onClick={() => onLocationSelect(city)}
                >
                  {city.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
