/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMoon, FiSun, FiAperture } from "react-icons/fi";
import MeteorShower from "./MeteorShower.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import CaseStudy from "./components/CaseStudy.jsx";
import ResumeSection from "./components/ResumeSection.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import projects from "./data/projects.js";
import resumePdf from "./data/Resume.pdf";

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
  const [openCaseStudy, setOpenCaseStudy] = useState(null);
  const [snapEnabled, setSnapEnabled] = useState(() => {
    return localStorage.getItem("snapEnabled") === "true";
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "theme-indigo";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [sky, setSky] = useState(
    () => localStorage.getItem("sky") || "default"
  );
  const [starsColor, setStarsColor] = useState(
    () => localStorage.getItem("starsColor") || "white"
  );
  const [meteorsColor, setMeteorsColor] = useState(
    () => localStorage.getItem("meteorsColor") || "accent"
  );

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

  // Apply snap class to html/body
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.classList.toggle("snap-enabled", snapEnabled);
    body.classList.toggle("snap-enabled", snapEnabled);
    localStorage.setItem("snapEnabled", String(snapEnabled));
  }, [snapEnabled]);

  // Apply theme class to html
  useEffect(() => {
    const html = document.documentElement;
    const themes = [
      "theme-indigo",
      "theme-teal",
      "theme-rose",
      "theme-emerald",
    ];
    themes.forEach((t) => html.classList.remove(t));
    html.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply sky gradient overrides via CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const presets = {
      default: null, // use theme defaults
      dusk: {
        g1: "#0b132b",
        g2: "#1c2541",
        g3: "#3a506b",
        g4: "#1c2541",
        g5: "#0b132b",
      },
      aurora: {
        g1: "#001510",
        g2: "#003d31",
        g3: "#007f73",
        g4: "#00b894",
        g5: "#001510",
      },
      nebula: {
        g1: "#10002b",
        g2: "#240046",
        g3: "#3c096c",
        g4: "#5a189a",
        g5: "#10002b",
      },
    };
    const s = presets[sky];
    if (s) {
      root.style.setProperty("--g1", s.g1);
      root.style.setProperty("--g2", s.g2);
      root.style.setProperty("--g3", s.g3);
      root.style.setProperty("--g4", s.g4);
      root.style.setProperty("--g5", s.g5);
    } else {
      // remove overrides to fall back to theme-defined CSS vars
      ["--g1", "--g2", "--g3", "--g4", "--g5"].forEach((v) =>
        root.style.removeProperty(v)
      );
    }
    localStorage.setItem("sky", sky);
  }, [sky]);

  // Apply stars/meteors color through CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const map = {
      white: "255, 255, 255",
      accent:
        getComputedStyle(root).getPropertyValue("--accent-rgb").trim() ||
        "245, 158, 11",
      teal: "45, 212, 191",
      rose: "251, 113, 133",
      indigo: "129, 140, 248",
    };
    const starRGB = map[starsColor] || map.white;
    const meteorRGB = map[meteorsColor] || map.accent;
    root.style.setProperty("--star-rgb", starRGB);
    root.style.setProperty("--meteor-rgb", meteorRGB);
    localStorage.setItem("starsColor", starsColor);
    localStorage.setItem("meteorsColor", meteorsColor);
  }, [starsColor, meteorsColor, theme]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const target =
      rect.top + scrollTop - (window.innerHeight - rect.height) / 2;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  // Let native CSS scroll-snap handle snap-to-center smoothly; no JS timer needed
  useEffect(() => {
    const onWheel = () => {
      // passive handler keeps scroll buttery; CSS scroll-snap does the snapping
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

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
              {section.id === "experience" && <ExperienceSection />}
              {section.id === "resume" && (
                <div className="max-w-6xl mx-auto">
                  <ResumeSection pdfUrl={resumePdf} showTitle={false} />
                </div>
              )}
              {section.id === "projects" && (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                  variants={gridVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                >
                  {projects.map((p, i) => (
                    <ProjectCard
                      key={p.title}
                      project={p}
                      index={i}
                      onOpenCaseStudy={() => setOpenCaseStudy(p)}
                    />
                  ))}
                </motion.div>
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
                ? "text-accent"
                : "text-white hover:text-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-white/30`}
          >
            {section.label}
          </button>
        ))}
      </nav>
      {/* Accessibility Menu Toggle */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-30 rounded-full btn-accent px-4 py-2 text-sm font-semibold shadow-lg"
        title="Accessibility & Themes"
      >
        Accessibility
      </button>
      {/* Accessibility Menu Panel */}
      {menuOpen && (
        <div className="fixed bottom-16 right-4 z-30 w-[min(92vw,380px)] rounded-xl border border-white/10 bg-black/70 backdrop-blur-md p-4 text-white shadow-2xl">
          <div className="mb-3 text-base font-semibold">
            Accessibility & Themes
          </div>
          {/* Snap toggle */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-white/80">Snap Scrolling</span>
            <button
              onClick={() => setSnapEnabled((v) => !v)}
              className={`text-xs px-2 py-1 rounded-md border ${
                snapEnabled
                  ? "border-white/40 text-accent"
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              {snapEnabled ? "On" : "Off"}
            </button>
          </div>
          <div className="mb-3 text-xs text-white/70">
            Choose a quick mood preset below. Changes apply instantly and
            persist.
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              {
                id: "midnight",
                label: "Midnight Indigo",
                theme: "theme-indigo",
                sky: "default",
                stars: "white",
                meteors: "accent",
              },
              {
                id: "aurora",
                label: "Aurora Teal",
                theme: "theme-teal",
                sky: "aurora",
                stars: "white",
                meteors: "accent",
              },
              {
                id: "cosmic",
                label: "Cosmic Rose",
                theme: "theme-rose",
                sky: "nebula",
                stars: "indigo",
                meteors: "accent",
              },
              {
                id: "nebula",
                label: "Nebula Violet",
                theme: "theme-indigo",
                sky: "nebula",
                stars: "rose",
                meteors: "white",
              },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setTheme(m.theme);
                  setSky(m.sky);
                  setStarsColor(m.stars);
                  setMeteorsColor(m.meteors);
                }}
                className="text-xs px-2 py-1 rounded-md border border-white/20 hover:border-white/40"
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-xs px-3 py-1 rounded-md border border-white/20 hover:border-white/40"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Case Study Modal */}
      <CaseStudy
        project={openCaseStudy}
        onClose={() => setOpenCaseStudy(null)}
      />
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
