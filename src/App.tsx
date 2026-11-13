import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white flex-1 min-w-4xl">
        MAIN
      </main>
      <footer className="bg-amber-400">FOOTER</footer>
    </div>
  );
}

export default App;
