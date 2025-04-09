import React from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { ParticleBackground } from "./components/ParticleBackground/ParticleBackground";

function App() {
  const [isInverted, setIsInverted] = React.useState(false);
  const toggleColors = () => {
    setIsInverted((prev) => !prev);
  };

  return (
    <div style={{ color: "white", position: "relative" }}>
      <button
        onClick={toggleColors}
        style={{
          position: "fixed", // Use fixed positioning to ensure it stays on top
          top: "20px",
          left: "20px",
          zIndex: 1000, // Set a high zIndex to ensure it appears above everything
          padding: "10px 20px",
          background: "#ccc",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Toggle Colors
      </button>
      <Navbar />
      <ParticleBackground isInverted={isInverted} />
      <div className="Resume" style={{ zIndex: 1, position: "relative", marginTop: "10vh" }}>
        <div
          id="home"
          style={{
            height: "100vh",
            backgroundColor: "transparent",
          }}
        >
          <h1>Home Section</h1>
        </div>
        <div
          id="projects"
          style={{ height: "100vh", backgroundColor: "#e0e0e0" }}
        >
          <h1>Projects Section</h1>
        </div>
        <div id="about" style={{ height: "100vh", backgroundColor: "#d0d0d0" }}>
          <h1>About Section</h1>
        </div>
        <div
          id="contact"
          style={{ height: "100vh", backgroundColor: "#c0c0c0" }}
        >
          <h1>Contact Section</h1>
        </div>
      </div>
    </div>
  );
}

export default App;