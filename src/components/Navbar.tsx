import { PRESET_CITIES } from "../constants/locations";
export default function Navbar() {
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
