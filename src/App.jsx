import { useState, useEffect } from "react";
import MeteorShower from "./MeteorShower.jsx";

function App() {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            console.log("Active section:", entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id) => {
    console.log("Button clicked, scrolling to:", id); // Debug
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error("Element not found:", id);
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      <MeteorShower />
      <div className="relative z-10">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="min-h-screen flex items-center justify-center p-[10%]"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                {section.label}
              </h2>
              <p className="text-lg text-white">
                {section.id === "home" &&
                  "Welcome to my portfolio! Scroll to explore."}
                {section.id === "about" &&
                  "I am a passionate developer with a love for creating impactful solutions."}
                {section.id === "experience" &&
                  "I have worked on various projects, from web apps to AI solutions."}
                {section.id === "projects" &&
                  "Check out my projects showcasing my skills and creativity."}
                {section.id === "contact" &&
                  "Reach out to me via email or social media!"}
              </p>
            </div>
          </section>
        ))}
      </div>
      <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-20">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`text-sm font-medium transition-colors ${
              activeSection === section.id
                ? "text-yellow-400"
                : "text-white hover:text-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
