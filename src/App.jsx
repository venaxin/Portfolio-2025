/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useMemo, lazy, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMoon, FiSun, FiAperture } from "react-icons/fi";
import MeteorShower from "./MeteorShower.jsx";
import PixelBlackhole from "./components/PixelBlackhole.jsx";
const ProjectCardLazy = lazy(() => import("./components/ProjectCard.jsx"));
const CaseStudyLazy = lazy(() => import("./components/CaseStudy.jsx"));
const ResumeSectionLazy = lazy(() => import("./components/ResumeSection.jsx"));
const ExperienceSectionLazy = lazy(() =>
  import("./components/ExperienceSection.jsx")
);
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
  const [lowPower, setLowPower] = useState(() => {
    return localStorage.getItem("lowPower") === "true";
  });
  const [eightBit, setEightBit] = useState(() => {
    return localStorage.getItem("eightBit") === "true";
  });

  // Environment flags for perf tuning
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Guard to skip persisting lowPower during initial refresh toggle
  const lowPowerPersistSkipRef = useRef(false);

  useEffect(() => {
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const update = () => {
      setPrefersReduced(mqReduced.matches);
      setIsMobile(mqMobile.matches);
    };
    update();
    mqReduced.addEventListener("change", update);
    mqMobile.addEventListener("change", update);
    return () => {
      mqReduced.removeEventListener("change", update);
      mqMobile.removeEventListener("change", update);
    };
  }, []);

  // Scroll tracking for parallax (rAF-throttled, passive)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          "--scroll-y",
          `${window.scrollY}px`
        );
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for scrollspy
  useEffect(() => {
    // Mount-on-demand set
    const mountedRef = mountedSectionsRef;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            if (!mountedRef.current.has(entry.target.id)) {
              mountedRef.current.add(entry.target.id);
              forceRerender((n) => n + 1);
            }
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

  // Apply theme class to html (supports 8-bit theme override)
  useEffect(() => {
    const html = document.documentElement;
    const themes = [
      "theme-indigo",
      "theme-teal",
      "theme-rose",
      "theme-emerald",
      "theme-8bit",
    ];
    themes.forEach((t) => html.classList.remove(t));
    html.classList.add(eightBit ? "theme-8bit" : theme);
    localStorage.setItem("theme", theme);
    // Appearance changed
    window.dispatchEvent(new Event("appearance-change"));
  }, [theme, eightBit]);

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
    // Trigger appearance update for canvas without polling
    window.dispatchEvent(new Event("appearance-change"));
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
    window.dispatchEvent(new Event("appearance-change"));
  }, [starsColor, meteorsColor, theme]);

  // Persist Low Power (skip during initial refresh toggle)
  useEffect(() => {
    if (lowPowerPersistSkipRef.current) return;
    localStorage.setItem("lowPower", String(lowPower));
  }, [lowPower]);
  useEffect(() => {
    localStorage.setItem("eightBit", String(eightBit));
  }, [eightBit]);

  // One-time background refresh on first load: toggle lowPower on then off
  // This forces canvas backgrounds to fully recalc size and span the viewport
  useEffect(() => {
    // run after first paint
    const original = lowPower;
    lowPowerPersistSkipRef.current = true;
    const raf1 = requestAnimationFrame(() => {
      setLowPower(!original);
      window.dispatchEvent(new Event("appearance-change"));
      window.dispatchEvent(new Event("resize"));
      const t = setTimeout(() => {
        setLowPower(original);
        window.dispatchEvent(new Event("appearance-change"));
        window.dispatchEvent(new Event("resize"));
        // allow persistence again on next tick
        setTimeout(() => {
          lowPowerPersistSkipRef.current = false;
        }, 0);
      }, 60);
      // cleanup timer on unmount
      return () => clearTimeout(t);
    });
    return () => cancelAnimationFrame(raf1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const sectionVariants = prefersReduced
    ? undefined
    : {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      };

  // Projects container variants for staggered reveal
  const gridVariants =
    lowPower || prefersReduced
      ? undefined
      : {
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
          },
        };

  // Mount-on-demand: track which sections have been seen
  const mountedSectionsRef = useRef(new Set(["home"]));
  const [, forceRerender] = useState(0);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 gradient-sky z-[-2]"></div>
      {eightBit ? (
        <PixelBlackhole disabled={prefersReduced || lowPower} fps={28} />
      ) : (
        <MeteorShower
          disabled={prefersReduced || lowPower}
          density={isMobile ? 0.55 : 0.85}
          sizeScale={isMobile ? 0.9 : 1}
          fps={isMobile ? 24 : 30}
        />
      )}
      <div className="relative z-10">
        {sections.map((section) => (
          <Section key={section.id} id={section.id} variants={sectionVariants}>
            {(mountedSectionsRef.current.has(section.id) ||
              section.id === "home") && (
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">
                  {section.label}
                </h2>
                {section.id === "home" && (
                  <div>
                    <p className="text-lg text-white mb-4">
                      Welcome to my portfolio! Scroll to explore.
                    </p>
                    {prefersReduced ? (
                      <span className="text-2xl text-yellow-400 font-semibold">
                        Frontend Engineer
                      </span>
                    ) : (
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
                    )}
                  </div>
                )}
                {section.id === "about" && (
                  <p className="text-lg text-white">
                    I am a passionate developer with a love for creating
                    impactful solutions.
                  </p>
                )}
                {section.id === "experience" && (
                  <Suspense
                    fallback={<div className="text-white/70">Loading…</div>}
                  >
                    <ExperienceSectionLazy eightBit={eightBit} />
                  </Suspense>
                )}
                {section.id === "resume" && (
                  <div className="max-w-6xl mx-auto">
                    <Suspense
                      fallback={<div className="text-white/70">Loading…</div>}
                    >
                      <ResumeSectionLazy pdfUrl={resumePdf} showTitle={false} />
                    </Suspense>
                  </div>
                )}
                {section.id === "projects" && (
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                    variants={gridVariants}
                    initial={gridVariants ? "hidden" : false}
                    whileInView={gridVariants ? "visible" : undefined}
                    viewport={{ once: false, amount: 0.2 }}
                  >
                    <Suspense
                      fallback={<div className="text-white/70">Loading…</div>}
                    >
                      {projects.map((p, i) => (
                        <ProjectCardLazy
                          key={p.title}
                          project={p}
                          index={i}
                          lowPower={lowPower || prefersReduced}
                          eightBit={eightBit}
                          onOpenCaseStudy={() => setOpenCaseStudy(p)}
                        />
                      ))}
                    </Suspense>
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
            )}
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
            } focus:outline-none focus:ring-2 focus:ring-white/30 ${
              eightBit ? "pixel-button" : ""
            }`}
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
        <div
          className={`fixed bottom-16 right-4 z-30 w-[min(92vw,380px)] rounded-xl border border-white/10 bg-black/70 ${
            eightBit ? "pixel-panel" : "backdrop-blur-md"
          } p-4 text-white shadow-2xl`}
        >
          <div className="mb-3 text-base font-semibold">
            Accessibility & Themes
          </div>
          {/* 8-bit mode */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-white/80">8-bit Retro Mode</span>
            <button
              onClick={() => setEightBit((v) => !v)}
              className={`text-xs px-2 py-1 rounded-md border ${
                eightBit
                  ? "border-white/40 text-accent"
                  : "border-white/20 hover:border-white/40"
              } ${eightBit ? "pixel-button" : ""}`}
            >
              {eightBit ? "On" : "Off"}
            </button>
          </div>
          {/* Low Power toggle */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-white/80">Low Power Mode</span>
            <button
              onClick={() => setLowPower((v) => !v)}
              className={`text-xs px-2 py-1 rounded-md border ${
                lowPower
                  ? "border-white/40 text-accent"
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              {lowPower ? "On" : "Off"}
            </button>
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
      <Suspense fallback={null}>
        <CaseStudyLazy
          project={openCaseStudy}
          onClose={() => setOpenCaseStudy(null)}
          eightBit={eightBit}
        />
      </Suspense>
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
      className="min-h-screen flex items-center justify-center p-[10%] content-auto"
      variants={variants}
      initial={variants ? "hidden" : false}
      animate={variants ? (isInView ? "visible" : "hidden") : false}
    >
      {children}
    </motion.section>
  );
}

export default App;
