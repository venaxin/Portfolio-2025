/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useMemo, lazy, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiMoon, FiSun, FiAperture } from "react-icons/fi";
import MeteorShower from "./MeteorShower.jsx";
import PixelBlackhole from "./components/PixelBlackhole.jsx";
import BlackholeGifParallax from "./components/BlackholeGifParallax.jsx";
import GalaxyParallax from "./components/GalaxyParallax.jsx";
import OnboardingModal from "./components/OnboardingModal.jsx";
const ProjectCardLazy = lazy(() => import("./components/ProjectCard.jsx"));
const CaseStudyLazy = lazy(() => import("./components/CaseStudy.jsx"));
const ResumeSectionLazy = lazy(() => import("./components/ResumeSection.jsx"));
const ExperienceSectionLazy = lazy(() =>
  import("./components/ExperienceSection.jsx")
);
import projects from "./data/projects.js";
import resumePdf from "./data/Resume.pdf";
import blackholeImg from "./data/blackhole.webp";

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
  // Capture initial viewport width synchronously to handle first paint on mobile
  const isNarrowAtMountRef = useRef(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const [openCaseStudy, setOpenCaseStudy] = useState(null);
  const [snapEnabled, setSnapEnabled] = useState(() => {
    return localStorage.getItem("snapEnabled") === "true";
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "theme-mono";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    const seen = localStorage.getItem("onboardingSeen");
    return seen ? false : true;
  });
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
  // High detail and target size for PixelBlackhole (8-bit mode)
  const [bhHighDetail, setBhHighDetail] = useState(() => {
    const v = localStorage.getItem("bhHighDetail");
    return v ? v === "true" : true;
  });
  const [bhPixelSize, setBhPixelSize] = useState(() => {
    const v = parseInt(localStorage.getItem("bhPixelSize") || "1", 10);
    return Number.isFinite(v) ? Math.min(4, Math.max(1, v)) : 1;
  });
  const [bhTargetSize, setBhTargetSize] = useState(() => {
    const v = parseInt(localStorage.getItem("bhTargetSize") || "500", 10);
    return Number.isFinite(v) ? Math.min(1000, Math.max(200, v)) : 500;
  });
  // Red Blackhole preset
  const [bhRedPreset, setBhRedPreset] = useState(() => {
    return localStorage.getItem("bhRedPreset") === "true";
  });
  // Moderate HQ
  const [bhHQ, setBhHQ] = useState(() => {
    return localStorage.getItem("bhHQ") === "true";
  });
  const [bhHQHigh, setBhHQHigh] = useState(() => {
    return localStorage.getItem("bhHQHigh") === "true";
  });
  // Master Black Hole enable toggle (default off)
  const [bhEnabled, setBhEnabled] = useState(() => {
    return localStorage.getItem("bhEnabled") === "true";
  });
  // Background element toggles
  const [starsEnabled, setStarsEnabled] = useState(() => {
    const v = localStorage.getItem("starsEnabled");
    return v ? v === "true" : true;
  });
  const [bhGifsEnabled, setBhGifsEnabled] = useState(() => {
    const v = localStorage.getItem("bhGifsEnabled");
    return v ? v === "true" : true;
  });
  const [galaxiesEnabled, setGalaxiesEnabled] = useState(() => {
    const v = localStorage.getItem("galaxiesEnabled");
    return v ? v === "true" : false;
  });
  // Exposure & Vignette
  const [bhExposure, setBhExposure] = useState(() => {
    const stored = parseFloat(localStorage.getItem("bhExposure") || "");
    if (!Number.isNaN(stored)) return Math.min(2, Math.max(0.8, stored));
    const red = localStorage.getItem("bhRedPreset") === "true";
    return red ? 1.25 : 1.18;
  });
  const [bhVignette, setBhVignette] = useState(() => {
    const stored = parseFloat(localStorage.getItem("bhVignette") || "");
    if (!Number.isNaN(stored)) return Math.min(1, Math.max(0, stored));
    const red = localStorage.getItem("bhRedPreset") === "true";
    return red ? 0.22 : 0.28;
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
      { threshold: 0.2 }
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
      "theme-red",
      "theme-sky",
      "theme-mono",
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
        g1: "#000000",
        g2: "#1c2541",
        g3: "#3a506b",
        g4: "#1c2541",
        g5: "#000000",
      },
      aurora: {
        g1: "#000000",
        g2: "#003d31",
        g3: "#007f73",
        g4: "#00b894",
        g5: "#000000",
      },
      nebula: {
        g1: "#000000",
        g2: "#240046",
        g3: "#3c096c",
        g4: "#5a189a",
        g5: "#000000",
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
  useEffect(() => {
    localStorage.setItem("bhHighDetail", String(bhHighDetail));
  }, [bhHighDetail]);
  useEffect(() => {
    localStorage.setItem("bhPixelSize", String(bhPixelSize));
  }, [bhPixelSize]);
  useEffect(() => {
    localStorage.setItem("bhTargetSize", String(bhTargetSize));
  }, [bhTargetSize]);
  useEffect(() => {
    localStorage.setItem("bhRedPreset", String(bhRedPreset));
  }, [bhRedPreset]);
  useEffect(() => {
    localStorage.setItem("bhHQ", String(bhHQ));
  }, [bhHQ]);
  useEffect(() => {
    localStorage.setItem("bhHQHigh", String(bhHQHigh));
  }, [bhHQHigh]);
  useEffect(() => {
    localStorage.setItem("bhEnabled", String(bhEnabled));
  }, [bhEnabled]);
  useEffect(() => {
    localStorage.setItem("starsEnabled", String(starsEnabled));
  }, [starsEnabled]);
  useEffect(() => {
    localStorage.setItem("bhGifsEnabled", String(bhGifsEnabled));
  }, [bhGifsEnabled]);
  useEffect(() => {
    localStorage.setItem("galaxiesEnabled", String(galaxiesEnabled));
  }, [galaxiesEnabled]);
  useEffect(() => {
    localStorage.setItem("bhExposure", String(bhExposure));
  }, [bhExposure]);
  useEffect(() => {
    localStorage.setItem("bhVignette", String(bhVignette));
  }, [bhVignette]);
  // Persist onboarding state when dismissed with "Done"
  const handleCloseOnboarding = (dontShowAgain) => {
    setShowOnboarding(false);
    if (dontShowAgain) localStorage.setItem("onboardingSeen", "true");
  };

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

  // iOS/mobile safety: if loading directly on a small screen, briefly disable heavy backgrounds
  useEffect(() => {
    const small =
      window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
    const ua = navigator.userAgent || navigator.vendor || "";
    const isiOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (ua.includes("Mac") && "ontouchend" in document);
    if (!small || !isiOS) return;
    let reverted = false;
    const prevBhEnabled = bhEnabled;
    if (bhEnabled) setBhEnabled(false);
    const id = setTimeout(() => {
      if (bhEnabled !== prevBhEnabled) setBhEnabled(prevBhEnabled);
      reverted = true;
    }, 120);
    return () => {
      clearTimeout(id);
      if (!reverted && bhEnabled !== prevBhEnabled) setBhEnabled(prevBhEnabled);
    };
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
      {/* Use positive z-index to avoid iOS Safari bugs with negative z on fixed elements */}
      <div className="fixed inset-0 gradient-sky z-0"></div>
      {bhEnabled ? (
        <PixelBlackhole
          imageUrl={blackholeImg}
          disabled={prefersReduced || lowPower}
          fps={isMobile ? 26 : 30}
          scale={isMobile ? 0.2 : bhHQHigh ? 0.26 : 0.2}
          yScale={bhRedPreset ? 0.38 : 0.4}
          diskRadius={bhRedPreset ? 0.54 : 0.5}
          beaming={bhRedPreset ? 0.95 : 0.78}
          beamingPhase={0}
          beamingGamma={bhRedPreset ? 1.9 : 1.4}
          glow={bhRedPreset ? 1.08 : 0.95}
          lensing={bhRedPreset ? 0.42 : 0.36}
          backGlow={bhRedPreset ? 1.18 : 1.08}
          underGlow={bhRedPreset ? 0.62 : 0.52}
          innerHot={bhRedPreset ? 0.62 : 0.5}
          highDetail={bhHighDetail}
          pixelSize={bhPixelSize}
          targetDisplaySize={bhTargetSize}
          useRadialPalette={bhRedPreset}
          paletteOuter={[156, 26, 18]}
          paletteMid={[255, 106, 0]}
          paletteInner={[255, 235, 180]}
          photonRingPasses={bhRedPreset ? (bhHQHigh ? 4 : 3) : bhHQHigh ? 2 : 1}
          inflowRate={bhRedPreset ? 0.02 : 0}
          flickerAmp={bhRedPreset ? 0.08 : 0}
          turbSize={bhHQHigh ? 512 : bhHQ ? 384 : 256}
          sliceMul={bhHQHigh ? 1.6 : bhHQ ? 1.25 : 1.0}
          stepAdd={bhHQHigh ? 8 : bhHQ ? 4 : 0}
          exposure={bhExposure}
          vignette={bhVignette}
        />
      ) : (
        <>
          {galaxiesEnabled && (
            <GalaxyParallax
              disabled={prefersReduced || lowPower}
              opacity={0.12}
            />
          )}
          {bhGifsEnabled && (
            <BlackholeGifParallax
              disabled={prefersReduced || lowPower}
              opacity={0.16}
            />
          )}
          <MeteorShower
            disabled={prefersReduced || lowPower}
            density={isMobile ? 0.55 : 0.85}
            sizeScale={isMobile ? 0.9 : 1}
            fps={isMobile ? 24 : 30}
            showStars={starsEnabled}
          />
        </>
      )}
      <div className="relative z-20">
        <OnboardingModal
          isOpen={showOnboarding}
          onClose={handleCloseOnboarding}
          onOpenAccessibility={() => setMenuOpen(true)}
          lowPower={lowPower}
          galaxiesEnabled={galaxiesEnabled}
          bhGifsEnabled={bhGifsEnabled}
          bhEnabled={bhEnabled}
          setGalaxiesEnabled={setGalaxiesEnabled}
          setBhGifsEnabled={setBhGifsEnabled}
          setBhEnabled={setBhEnabled}
        />
        {sections.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            variants={sectionVariants}
            isMobile={isMobile}
          >
            {(section.id === "projects" ||
              isMobile ||
              isNarrowAtMountRef.current ||
              mountedSectionsRef.current.has(section.id) ||
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
                        Software Developer
                      </span>
                    ) : (
                      <TypeAnimation
                        sequence={[
                          "Software Developer",
                          1000,
                          "Full‑stack Developer",
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
                  <div className="max-w-5xl mx-auto grid gap-4 sm:grid-cols-2">
                    <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                      <h3 className="text-xl font-semibold mb-2">
                        Software Developer
                      </h3>
                      <p className="text-sm text-white/80">
                        CS Master’s student at UB and former Goodz frontend
                        intern. I build reliable, accessible software across the
                        stack — from animated, responsive UIs to APIs and
                        data-driven features. I care about correctness,
                        performance, and great UX.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        {[
                          "Full‑stack (React, Node)",
                          "Systems & Performance",
                          "AI/ML & OCR",
                          "Testing (Jest)",
                          "Cloud (Firebase)",
                        ].map((s) => (
                          <span
                            key={s}
                            className="px-2 py-1 rounded border border-white/15"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                      <h3 className="text-xl font-semibold mb-2">Now / Next</h3>
                      <ul className="text-sm text-white/80 space-y-1">
                        <li>
                          Now: Building CommitLife, SplitVoice, and PantryChef.
                        </li>
                        <li>
                          Next: Seeking Software Developer Internship — Winter
                          2026.
                        </li>
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-3">
                        <a
                          href={resumePdf}
                          className="btn-accent rounded-md px-3 py-1 text-xs"
                        >
                          Resume
                        </a>
                        <a
                          href="mailto:abdulrahman.hussain02@gmail.com"
                          className="rounded-md border border-white/20 hover:border-white/40 px-3 py-1 text-xs"
                        >
                          Email
                        </a>
                        <a
                          href="https://linkedin.com/in/abdul-rahman-hussain"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md border border-white/20 hover:border-white/40 px-3 py-1 text-xs"
                        >
                          LinkedIn
                        </a>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-white/10 bg-white/5 sm:col-span-2">
                      <h3 className="text-xl font-semibold mb-2">
                        What I care about
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-3 text-sm text-white/80">
                        <div>
                          <div className="font-medium text-white">
                            Accessible‑first
                          </div>
                          <p className="text-white/70">
                            WCAG-friendly, keyboard/SR labels, motion‑safe
                            defaults.
                          </p>
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            Reliable & Tested
                          </div>
                          <p className="text-white/70">
                            Clean architecture, meaningful tests, performance
                            budgets.
                          </p>
                        </div>
                        <div>
                          <div className="font-medium text-white">Impact</div>
                          <p className="text-white/70">
                            Shipping features that solve real user problems.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                        href="mailto:abdulrahman.hussain02@gmail.com"
                        className="text-white hover:text-yellow-400 transition-colors"
                        aria-label="Send me an email"
                      >
                        <FaEnvelope size={32} />
                      </a>
                      <a
                        href="https://linkedin.com/in/abdul-rahman-hussain"
                        className="text-white hover:text-yellow-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit my LinkedIn profile"
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
      {/* Desktop sidebar nav (hidden on small screens) */}
      <nav className="hidden sm:flex fixed right-4 top-1/2 -translate-y-1/2 flex-col space-y-4 z-20">
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
      {/* Mobile sections button + panel */}
      <button
        onClick={() => setMobileNavOpen((v) => !v)}
        className="sm:hidden fixed bottom-4 left-4 z-30 rounded-full border border-white/20 bg-black/60 backdrop-blur px-3 py-2 text-sm text-white hover:border-white/40"
        title="Sections"
      >
        Sections
      </button>
      {mobileNavOpen && (
        <div
          className={`sm:hidden fixed bottom-16 left-4 z-30 w-[min(92vw,360px)] rounded-xl border border-white/10 bg-black/70 ${
            eightBit ? "pixel-panel" : "backdrop-blur-md"
          } p-3 text-white shadow-2xl`}
          role="dialog"
          aria-label="Sections"
        >
          <div className="mb-2 text-base font-semibold">Sections</div>
          <div className="grid grid-cols-2 gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setMobileNavOpen(false);
                  scrollToSection(s.id);
                }}
                className={`text-xs px-2 py-2 rounded-md border ${
                  activeSection === s.id
                    ? "border-white/40 text-accent"
                    : "border-white/20 hover:border-white/40"
                } ${eightBit ? "pixel-button" : ""}`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => setMobileNavOpen(false)}
              className="text-xs px-3 py-1 rounded-md border border-white/20 hover:border-white/40"
            >
              Close
            </button>
          </div>
        </div>
      )}
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
          {/* 8-bit mode (hidden when Pixel Blackhole is ON) */}
          {!bhEnabled && (
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
          )}
          {/* Pixel Blackhole controls */}
          <div className="mb-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">Pixel Blackhole</span>
              <button
                onClick={() => setBhEnabled((v) => !v)}
                className={`text-xs px-2 py-1 rounded-md border ${
                  bhEnabled
                    ? "border-white/40 text-accent"
                    : "border-white/20 hover:border-white/40"
                } ${eightBit ? "pixel-button" : ""}`}
              >
                {bhEnabled ? "On" : "Off"}
              </button>
            </div>
            {bhEnabled && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">
                    Red Blackhole Preset
                  </span>
                  <button
                    onClick={() => setBhRedPreset((v) => !v)}
                    className={`text-xs px-2 py-1 rounded-md border ${
                      bhRedPreset
                        ? "border-white/40 text-accent"
                        : "border-white/20 hover:border-white/40"
                    } ${eightBit ? "pixel-button" : ""}`}
                  >
                    {bhRedPreset ? "On" : "Off"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">High Detail</span>
                  <button
                    onClick={() => setBhHighDetail((v) => !v)}
                    className={`text-xs px-2 py-1 rounded-md border ${
                      bhHighDetail
                        ? "border-white/40 text-accent"
                        : "border-white/20 hover:border-white/40"
                    } ${eightBit ? "pixel-button" : ""}`}
                  >
                    {bhHighDetail ? "On" : "Off"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Moderate HQ</span>
                  <button
                    onClick={() => setBhHQ((v) => !v)}
                    className={`text-xs px-2 py-1 rounded-md border ${
                      bhHQ
                        ? "border-white/40 text-accent"
                        : "border-white/20 hover:border-white/40"
                    } ${eightBit ? "pixel-button" : ""}`}
                  >
                    {bhHQ ? "On" : "Off"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">High HQ</span>
                  <button
                    onClick={() => setBhHQHigh((v) => !v)}
                    className={`text-xs px-2 py-1 rounded-md border ${
                      bhHQHigh
                        ? "border-white/40 text-accent"
                        : "border-white/20 hover:border-white/40"
                    } ${eightBit ? "pixel-button" : ""}`}
                  >
                    {bhHQHigh ? "On" : "Off"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Pixel Size</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBhPixelSize((v) => Math.max(1, v - 1))}
                      className="text-xs px-2 py-1 rounded-md border border-white/20 hover:border-white/40"
                    >
                      -
                    </button>
                    <span className="text-xs w-8 text-center">
                      {bhPixelSize}
                    </span>
                    <button
                      onClick={() => setBhPixelSize((v) => Math.min(4, v + 1))}
                      className="text-xs px-2 py-1 rounded-md border border-white/20 hover:border-white/40"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">
                    Target Size (px)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setBhTargetSize((v) => Math.max(200, v - 50))
                      }
                      className="text-xs px-2 py-1 rounded-md border border-white/20 hover:border-white/40"
                    >
                      -
                    </button>
                    <span className="text-xs w-12 text-center">
                      {bhTargetSize}
                    </span>
                    <button
                      onClick={() =>
                        setBhTargetSize((v) => Math.min(1000, v + 50))
                      }
                      className="text-xs px-2 py-1 rounded-md border border-white/20 hover:border-white/40"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Exposure</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setBhExposure((v) =>
                          parseFloat(Math.max(0.8, v - 0.03).toFixed(2))
                        )
                      }
                      className="text-xs px-2 py-1 rounded-md border border-white/20 hover:border-white/40"
                    >
                      -
                    </button>
                    <span className="text-xs w-12 text-center">
                      {bhExposure.toFixed(2)}
                    </span>
                    <button
                      onClick={() =>
                        setBhExposure((v) =>
                          parseFloat(Math.min(2, v + 0.03).toFixed(2))
                        )
                      }
                      className="text-xs px-2 py-1 rounded-md border border-white/20 hover:border-white/40"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Vignette</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setBhVignette((v) =>
                          parseFloat(Math.max(0, v - 0.03).toFixed(2))
                        )
                      }
                      className="text-xs px-2 py-1 rounded-md border border-white/20 hover:border-white/40"
                    >
                      -
                    </button>
                    <span className="text-xs w-12 text-center">
                      {bhVignette.toFixed(2)}
                    </span>
                    <button
                      onClick={() =>
                        setBhVignette((v) =>
                          parseFloat(Math.min(1, v + 0.03).toFixed(2))
                        )
                      }
                      className="text-xs px-2 py-1 rounded-md border border-white/20 hover:border-white/40"
                    >
                      +
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Background elements (hidden when Pixel Blackhole is ON) */}
          {!bhEnabled && (
            <div className="mb-3 space-y-3">
              {!lowPower && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">
                    Blackhole GIF Parallax
                  </span>
                  <button
                    onClick={() => setBhGifsEnabled((v) => !v)}
                    className={`text-xs px-2 py-1 rounded-md border ${
                      bhGifsEnabled
                        ? "border-white/40 text-accent"
                        : "border-white/20 hover:border-white/40"
                    } ${eightBit ? "pixel-button" : ""}`}
                  >
                    {bhGifsEnabled ? "On" : "Off"}
                  </button>
                </div>
              )}
              {!lowPower && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Galaxy Parallax</span>
                  <button
                    onClick={() => setGalaxiesEnabled((v) => !v)}
                    className={`text-xs px-2 py-1 rounded-md border ${
                      galaxiesEnabled
                        ? "border-white/40 text-accent"
                        : "border-white/20 hover:border-white/40"
                    } ${eightBit ? "pixel-button" : ""}`}
                  >
                    {galaxiesEnabled ? "On" : "Off"}
                  </button>
                </div>
              )}
              {lowPower && (
                <div className="text-xs text-white/60">
                  Low Power Mode is on. Visual effects are paused. You can still
                  change themes below.
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Stars</span>
                <button
                  onClick={() => setStarsEnabled((v) => !v)}
                  className={`text-xs px-2 py-1 rounded-md border ${
                    starsEnabled
                      ? "border-white/40 text-accent"
                      : "border-white/20 hover:border-white/40"
                  } ${eightBit ? "pixel-button" : ""}`}
                >
                  {starsEnabled ? "On" : "Off"}
                </button>
              </div>
            </div>
          )}
          {/* Low Power toggle (hidden when Pixel Blackhole is ON) */}
          {!bhEnabled && (
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
          )}
          {/* Snap toggle (hidden when Pixel Blackhole is ON) */}
          {!bhEnabled && (
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
          )}
          {/* Mood presets (hidden when Pixel Blackhole is ON) */}
          {!bhEnabled && (
            <>
              <div className="mb-3 text-xs text-white/70">
                Choose a quick mood preset below. Changes apply instantly and
                persist.
              </div>
              <div
                className="grid grid-cols-3 gap-3"
                role="radiogroup"
                aria-label="Theme presets"
              >
                {[
                  {
                    id: "noir",
                    label: "Noir Mono",
                    theme: "theme-mono",
                    sky: "default",
                    stars: "white",
                    meteors: "accent",
                    swatch: { from: "#0a0a0a", to: "#1f2937" },
                  },
                  {
                    id: "aurora",
                    label: "Aurora Teal",
                    theme: "theme-teal",
                    sky: "aurora",
                    stars: "white",
                    meteors: "accent",
                    swatch: { from: "#001a1a", to: "#0f766e" },
                  },
                  {
                    id: "cosmic",
                    label: "Cosmic Rose",
                    theme: "theme-rose",
                    sky: "nebula",
                    stars: "indigo",
                    meteors: "accent",
                    swatch: { from: "#14000d", to: "#db2777" },
                  },
                  {
                    id: "sky",
                    label: "Sky Blue",
                    theme: "theme-sky",
                    sky: "default",
                    stars: "white",
                    meteors: "accent",
                    swatch: { from: "#031320", to: "#0ea5e9" },
                  },
                  {
                    id: "crimson",
                    label: "Crimson Red",
                    theme: "theme-red",
                    sky: "default",
                    stars: "white",
                    meteors: "accent",
                    swatch: { from: "#190000", to: "#dc2626" },
                  },
                  {
                    id: "midnight",
                    label: "Midnight Indigo",
                    theme: "theme-indigo",
                    sky: "default",
                    stars: "white",
                    meteors: "accent",
                    swatch: { from: "#070311", to: "#4b0082" },
                  },
                ].map((m) => {
                  const selected = theme === m.theme;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setTheme(m.theme);
                        setSky(m.sky);
                        setStarsColor(m.stars);
                        setMeteorsColor(m.meteors);
                      }}
                      role="radio"
                      aria-checked={selected}
                      title={m.label}
                      className="group w-24 flex flex-col items-center gap-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    >
                      <div
                        className={
                          "w-12 h-12 rounded-full shadow-inner transition-all duration-150 " +
                          (selected
                            ? "ring-4 ring-[var(--accent)]"
                            : "ring-2 ring-white/10 group-hover:ring-white/30")
                        }
                        style={{
                          background: `linear-gradient(135deg, ${m.swatch.from}, ${m.swatch.to})`,
                        }}
                        aria-hidden="true"
                      />
                      <span
                        className={
                          "text-[10px] leading-tight text-center text-white/80 " +
                          (selected ? "text-accent" : "")
                        }
                      >
                        {m.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
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
function Section({ id, children, variants, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const enableAnim = variants && !isMobile;
  // Fallback: ensure visible at mount on mobile in case observer misses first frame
  const initialIsNarrow =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;
  const initialState = enableAnim && !initialIsNarrow ? "hidden" : "visible";
  const animateState = enableAnim
    ? isInView
      ? "visible"
      : "hidden"
    : "visible";

  return (
    <motion.section
      ref={ref}
      id={id}
      className="min-h-screen flex items-center justify-center p-[10%] content-auto"
      variants={enableAnim ? variants : undefined}
      initial={initialState}
      animate={animateState}
    >
      {children}
    </motion.section>
  );
}

export default App;
