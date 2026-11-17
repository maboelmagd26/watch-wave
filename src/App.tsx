import { useState } from "react";
import Navbar from "./components/Navbar";
import { PRESET_CITIES } from "./constants/locations";
import type { Location } from "./types/location";

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location>(
    PRESET_CITIES[0],
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        selectedLocation={selectedLocation}
        onLocationSelect={setSelectedLocation}
      />
      <main className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white flex-1 min-w-4xl">
        MAIN
      </main>
      <footer className="bg-amber-400">FOOTER</footer>
    </div>
  );
}

export default App;
