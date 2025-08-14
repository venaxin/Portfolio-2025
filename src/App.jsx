/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import MeteorShower from "./MeteorShower.jsx";
<<<<<<< Updated upstream
=======
import ProjectCard from "./components/ProjectCard.jsx";
import ProjectFilters from "./components/ProjectFilters.jsx";
import ResumeSection from "./components/ResumeSection.jsx";
import CaseStudy from "./components/CaseStudy.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import projects from "./data/projects.js";
import resumePdfUrl from "./data/Resume.pdf";
>>>>>>> Stashed changes

function App() {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const [activeSection, setActiveSection] = useState("home");
<<<<<<< Updated upstream
=======
  const [activeTech, setActiveTech] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [openCaseStudy, setOpenCaseStudy] = useState(null);
>>>>>>> Stashed changes

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

  // Project data (replace with your real projects)
  const projects = [
    {
      title: "HealthAI Connect",
      description:
        "A dynamic portfolio with a meteor shower animation built using React and Tailwind CSS.",
      tech: ["React", "Tailwind", "Canvas"],
      image: "https://via.placeholder.com/300x200",
      demoLink: "#",
      repoLink: "#",
    },
    {
      title: "Campus Clubhouse",
      description:
        "A productivity app for managing tasks with real-time updates and user authentication.",
      tech: ["React", "Firebase", "Node.js"],
      image: "https://via.placeholder.com/300x200",
      demoLink: "#",
      repoLink: "#",
    },
  ];

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 gradient-sky z-[-2]"></div>{" "}
      <MeteorShower /> 
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
              {section.id === "projects" && (
<<<<<<< Updated upstream
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 20px rgba(255, 255, 255, 0.2)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="bg-yellow-400 text-black text-sm font-medium px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          <a
                            href={project.demoLink}
                            className="text-white hover:text-yellow-400 transition-colors"
                          >
                            Demo
                          </a>
                          <a
                            href={project.repoLink}
                            className="text-white hover:text-yellow-400 transition-colors"
                          >
                            Repo
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
=======
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
                        <ProjectCard
                          key={p.title}
                          project={p}
                          index={i}
                          onOpenCaseStudy={() => setOpenCaseStudy(p)}
                        />
                      ))}
                  </motion.div>
>>>>>>> Stashed changes
                </div>
              )}
              {section.id === "contact" && (
                <div>
                  <p className="text-lg text-white mb-4">
                    Reach out to me via email or social media!
                  </p>
                  <div className="flex justify-center gap-6">
                    <a
                      href="https://github.com/yourusername"
                      className="text-white hover:text-yellow-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub size={32} />
                    </a>
                    <a
                      href="https://linkedin.com/in/yourusername"
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
