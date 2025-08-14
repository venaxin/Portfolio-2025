const projects = [
  // Ongoing
  {
    title: "CommitLife",
    year: 2025,
    status: "Ongoing",
    description:
      "A gamified habit tracker with a GitHub-style contribution grid, streaks, and achievements.",
    tech: ["React", "Tailwind", "Framer Motion", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    demoLink: "#",
    repoLink: "#",
    metrics: { perf: 98, a11y: 100, bundle: "165KB" },
    caseStudy: {
      problem:
        "Users drop off after week 2 in generic habit apps; streak motivation and quick wins aren’t visible enough.",
      constraints: [
        "TTI < 2.5s on mid-tier Android",
        "Offline-first with queued sync",
        "Accessible (WCAG) with keyboard + SR labels",
      ],
      approach:
        "Built a contribution-grid UI with weekly goals, streak boosters, and micro-interactions using Framer Motion. Implemented optimistic updates and background sync via Firebase. Honored prefers-reduced-motion and added semantic roles for tiles and controls.",
      results: [
        "+22% weekly retention (pilot)",
        "+18% average streak length",
        "Lighthouse: Perf 98 / A11y 100",
      ],
      highlights: [
        "Virtualized 12-month grid",
        "Tokenized themes with Tailwind + CSS vars",
        "Motion-reduced fallbacks",
      ],
      links: [{ label: "Design notes", href: "#" }],
      images: [],
    },
  },
  {
    title: "SplitVoice",
    year: 2025,
    status: "Ongoing",
    description:
      "Conversational expense splitter with AI clarifications and OCR-driven receipt parsing.",
    tech: ["React", "Node", "OCR", "OpenAI"],
    image:
      "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1200&auto=format&fit=crop",
    demoLink: "#",
    repoLink: "#",
    metrics: { perf: 96, a11y: 100, bundle: "182KB" },
  },
  {
    title: "PantryChef",
    year: 2024,
    status: "Ongoing",
    description:
      "Interactive cooking assistant that adapts recipes to your pantry and utensils with guided modes.",
    tech: ["React", "LangChain", "Vision OCR", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
    demoLink: "#",
    repoLink: "#",
    metrics: { perf: 94, a11y: 100, bundle: "210KB" },
  },

  // Completed
  {
    title: "HealthAI Connect",
    year: 2023,
    status: "Completed",
    description:
      "AI-powered healthcare app for tailored medication suggestions and diagnostics (e.g., tumor, pneumonia).",
    tech: ["Python", "Flask", "CNN", "NLP"],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
    demoLink: "#",
    repoLink: "#",
    metrics: { perf: 92, a11y: 96, bundle: "—" },
  },
  {
    title: "Intellibot",
    year: 2023,
    status: "Completed",
    description:
      "Chat and image generation system integrating GPT and DALL·E with voice I/O.",
    tech: ["Node.js", "Express", "React"],
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    demoLink: "#",
    repoLink: "#",
    metrics: { perf: 93, a11y: 98, bundle: "240KB" },
  },
  {
    title: "Dynamic Calendar Wallpaper (iOS)",
    year: 2022,
    status: "Completed",
    description:
      "An advanced iOS Shortcut that renders a daily lock-screen calendar via HTML/CSS and Base64 images.",
    tech: ["iOS Shortcuts", "HTML", "CSS"],
    image:
      "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1200&auto=format&fit=crop",
    repoLink: "https://github.com/venaxin/IOS-Dyna-Schedule-Wallpaper",
    metrics: { perf: 99, a11y: 100, bundle: "0KB" },
  },
];

export default projects;
