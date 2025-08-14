/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import MeteorShower from "./MeteorShower.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import ProjectFilters from "./components/ProjectFilters.jsx";
import ResumeSection from "./components/ResumeSection.jsx";
import projects from "./data/projects.js";
import resumePdfUrl from "./data/Resume.pdf";

function App() {
  const sections = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "resume", label: "Resume" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const [activeSection, setActiveSection] = useState("home");
  const [activeTech, setActiveTech] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  // Scroll tracking for parallax
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for scrollspy
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
    console.log("Button clicked, scrolling to:", id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error("Element not found:", id);
    }
  };

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Projects container variants for staggered reveal
  const gridVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 gradient-sky z-[-2]"></div> <MeteorShower />
      <div className="relative z-10">
        {sections.map((section) => (
          <Section key={section.id} id={section.id} variants={sectionVariants}>
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                {section.label}
              </h2>
              {section.id === "home" && (
                <div>
                  <p className="text-lg text-white mb-4">
                    Welcome to my portfolio! Scroll to explore.
                  </p>
                  <TypeAnimation
                    sequence={[
                      "Developer",
                      1000,
                      "UI/UX Designer",
                      1000,
                      "Frontend Engineer",
                      1000,
                    ]}
                    wrapper="span"
                    repeat={Infinity}
                    className="text-2xl text-yellow-400 font-semibold"
                  />
                </div>
              )}
              {section.id === "about" && (
                <p className="text-lg text-white">
                  I am a passionate developer with a love for creating impactful
                  solutions.
                </p>
              )}
              {section.id === "experience" && (
                <p className="text-lg text-white">
                  I have worked on various projects, from web apps to AI
                  solutions.
                </p>
              )}
              {section.id === "resume" && (
                <ResumeSection pdfUrl={resumePdfUrl} />
              )}
              {section.id === "projects" && (
                <div>
                  <div className="max-w-6xl mx-auto">
                    <ProjectFilters
                      projects={projects}
                      activeTech={activeTech}
                      setActiveTech={setActiveTech}
                      sortBy={sortBy}
                      setSortBy={setSortBy}
                    />
                  </div>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                  >
                    {projects
                      .filter((p) =>
                        activeTech ? (p.tech || []).includes(activeTech) : true
                      )
                      .sort((a, b) => {
                        if (sortBy === "newest")
                          return (b.year || 0) - (a.year || 0);
                        if (sortBy === "impact")
                          return (
                            (b.metrics?.a11y ?? 0) - (a.metrics?.a11y ?? 0)
                          );
                        if (sortBy === "perf")
                          return (
                            (b.metrics?.perf ?? 0) - (a.metrics?.perf ?? 0)
                          );
                        return 0;
                      })
                      .map((p, i) => (
                        <ProjectCard key={p.title} project={p} index={i} />
                      ))}
                  </motion.div>
                </div>
              )}
              {section.id === "contact" && (
                <div>
                  <p className="text-lg text-white mb-4">
                    Reach out to me via email or social media!
                  </p>
                  <div className="flex justify-center gap-6">
                    <a
                      href="https://github.com/venaxin"
                      className="text-white hover:text-yellow-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub size={32} />
                    </a>
                    <a
                      href="https://linkedin.com/in/abdul-rahman-hussain"
                      className="text-white hover:text-yellow-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin size={32} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Section>
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

// Section component with animation
function Section({ id, children, variants }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      id={id}
      className="min-h-screen flex items-center justify-center p-[10%]"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
}

export default App;
