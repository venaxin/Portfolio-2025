// src/App.jsx
import { Navbar } from './components/Navbar/Navbar';
import { HeroSection } from './components/HeroSection/HeroSection';
import { ParticleBackground } from './components/ParticleBackground/ParticleBackground';

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      {/* Add more sections here */}
    </div>
  );
}

export default App;