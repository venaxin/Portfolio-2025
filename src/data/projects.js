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
    // demoLink: "#",
    repoLink: "https://github.com/venaxin/SplitVoice",
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
    // demoLink: "#",
    // repoLink: "#",
    metrics: { perf: 94, a11y: 100, bundle: "210KB" },
  },

  // New
  {
    title: "Cognito",
    year: 2025,
    status: "Ongoing",
    description:
      "An intelligent learning coach to help you master any subject. Powered by a state-of-the-art LLM, it builds a personalized study plan, turns your inputs into learning cards, and uses a science-backed spaced repetition system to quiz you at the right moments. Track progress and build lasting knowledge efficiently.",
    tech: ["React", "Tailwind", "LLM", "Spaced Repetition"],
    image:
      "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=1200&auto=format&fit=crop", // books/learning
    // demoLink: "#",
    repoLink: "https://github.com/venaxin/Cognito",
  },
  {
    title: "Clarity Planner",
    year: 2024,
    status: "Completed",
    description:
      "Real‑time, cross‑device scheduling app with month/week/day views, drag & drop, resize, conflict resolution, and anonymous → Google auth upgrade.",
    tech: [
      "Vanilla JS",
      "Firebase",
      "Firestore",
      "Auth",
      "Interact.js",
      "Tailwind",
      "HTML",
      "CSS",
      "Notifications API",
    ],
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop", // planning / calendar themed
    demoLink: "https://venaxin.github.io/Clarity_Planner/",
    repoLink: "https://github.com/venaxin/Clarity_Planner",
    metrics: { perf: 95, a11y: 100, bundle: "—" },
    caseStudy: {
      problem:
        "Busy users need frictionless, always‑in‑sync scheduling without heavyweight calendar UX or reload delays.",
      constraints: [
        "Sub‑second cross‑device propagation",
        "Mobile‑first auth & interactions",
        "Framework‑less (vanilla JS) implementation",
      ],
      approach:
        "Firestore onSnapshot listeners stream task documents; local state diffs patch UI incrementally. Anonymous sessions encourage zero‑friction trial; users can elevate to Google OAuth (signInWithRedirect) retaining data. Interact.js powers drag/resize; a custom overlap layout algorithm buckets colliding events by time span and assigns dynamic column widths. Notification + Storage APIs persist theme + send reminders. Pure ES modules + careful DOM diffing avoid a framework while keeping code maintainable.",
      results: [
        "<200ms typical multi‑device update latency (Wi‑Fi)",
        "Seamless anonymous → Google account upgrade with data preserved",
        "Lighthouse: Perf 95 / A11y 100 (desktop)",
        "Conflict resolution keeps 100% of overlapping events visible",
      ],
      highlights: [
        "Real‑time Firestore sync (onSnapshot)",
        "Anonymous + Google OAuth auth flow",
        "Drag, resize, and snap interactions (Interact.js)",
        "Custom event overlap layout algorithm",
        "Recurring events & checklist progress",
        "Desktop reminder notifications",
        "Light/dark theme persistence (localStorage)",
      ],
      links: [
        {
          label: "Firestore",
          href: "https://firebase.google.com/docs/firestore",
        },
        {
          label: "Interact.js",
          href: "https://interactjs.io/",
        },
      ],
      images: [],
    },
  },

  {
    title: "CampusClub House",
    year: 2023,
    status: "Ongoing",
    description:
      "A social platform helping students discover and organize in‑person and virtual activities, gatherings, and events across shared interests, hobbies, and professions. Note: this build includes the frontend; sign‑up/auth flows were not completed.",
    tech: ["React", "Tailwind", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", // campus/events placeholder
    demoLink: "https://campusclubhouse.web.app/",
    repoLink: "https://github.com/venaxin/CampusClubHouse",
  },

  {
    title: "Codelab",
    year: 2024,
    status: "Ongoing",
    description:
      "Codelab is an online code editor to write, edit, and execute code directly in the browser. It offers multi‑language support (e.g., JavaScript, Python), real‑time execution, syntax highlighting, responsive design, and shareable links for quick collaboration.",
    tech: ["React", "Tailwind", "Syntax Highlighting"],
    image:
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1200&auto=format&fit=crop", // code editor themed
    // demoLink: none
    repoLink: "https://github.com/venaxin/codelab",
  },

  // Research
  {
    title: "GRASP",
    year: 2025,
    status: "Completed",
    description:
      "Cross‑modal self‑supervised molecular representation learning that aligns graph structures and SMILES using contrastive pre‑training; transfers well to MoleculeNet tasks with less labeled data.",
    tech: [
      "PyTorch",
      "PyTorch Geometric",
      "Transformers",
      "RDKit",
      "GNN",
      "ChemBERTa",
      "Self‑Supervised",
    ],
    image:
      "https://t4.ftcdn.net/jpg/07/28/41/19/360_F_728411989_LBR8P377a0nU8V6rZpVmVqzvrU128OhU.jpg", // local reliable thumbnail
    repoLink: "https://github.com/RitwijParmar/grasp-deep-learning-project",
    caseStudy: {
      problem:
        "Computational chemistry suffers from scarce labeled molecular data; labeling is expensive and slow. Goal: learn unified molecular embeddings by aligning graph and SMILES modalities for efficient transfer to downstream tasks.",
      constraints: [
        "Extremely limited labeled data",
        "Scale to >100M unlabeled molecules (PubChem)",
        "Train efficiently on commodity GPUs (Kaggle P100)",
      ],
      approach:
        "Data: Pulled ~352 compressed SDF archives from PubChem (≈113 GB), extracted ~176M canonical SMILES using RDKit in a streaming, memory‑safe pass.\n\nPipeline: Initially on‑the‑fly featurization in PyTorch DataLoader (RDKit graphs + SMILES tokenization) caused CPU bottlenecks; mitigated via parallel workers and batching. Explored TFRecord precompute for >7 it/s on M1 GPU, but stayed with optimized PyTorch path for simplicity.\n\nModel: Dual‑encoder with a GIN graph encoder (PyTorch Geometric) and a ChemBERTa SMILES encoder (Hugging Face). Projection heads map to a shared embedding space. InfoNCE contrastive loss aligns modalities (same molecule close; different far).\n\nTraining: Pre‑trained on 500k PubChem samples for 5 epochs on a Kaggle P100, ~7.2–7.3 it/s; robust checkpointing for best/final models.",
      results: [
        "InfoNCE convergence: avg loss ↓ from 0.0786 → 0.0039 (E1→E5)",
        "Strong cross‑modal alignment (cosine diag high; off‑diag low/neg)",
        "BBBP ROC‑AUC 0.94",
        "Tox21 ROC‑AUC 0.8186",
        "ESOL RMSE 0.8986",
      ],
      highlights: [
        "Cross‑modal contrastive learning (graphs + SMILES)",
        "Dual encoders: GIN (graphs) + ChemBERTa (SMILES)",
        "Optimized PyTorch data pipeline with RDKit streaming",
        "Transfers with less labeled data than supervised baselines",
      ],
      links: [
        {
          label: "PubChem (Compounds)",
          href: "https://pubchem.ncbi.nlm.nih.gov/docs/compounds",
        },
        { label: "MoleculeNet benchmark", href: "https://moleculenet.org/" },
        {
          label: "SimCLR (contrastive)",
          href: "https://arxiv.org/abs/2002.05709",
        },
        {
          label: "CLIP (cross‑modal)",
          href: "https://arxiv.org/abs/2103.00020",
        },
        { label: "ChemBERTa", href: "https://arxiv.org/abs/2010.09885" },
      ],
    },
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
    // demoLink: "#",
    repoLink: "https://github.com/venaxin/HealthAI-Connect",
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
    demoLink: "https://intellibot-one.vercel.app/",
    repoLink: "https://github.com/venaxin/intellibot",
    metrics: { perf: 93, a11y: 98, bundle: "240KB" },
  },
  {
    title: "WeatherWiz",
    year: 2023,
    status: "Completed",
    description:
      "WeatherWiz is a React app for checking current weather and weekly forecasts for any city using the OpenWeatherMap API. Built while learning React.",
    tech: ["React", "OpenWeatherMap"],
    image:
      "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?cs=srgb&dl=pexels-jplenio-1118873.jpg&fm=jpg", // local reliable thumbnail
    // demoLink: none
    repoLink: "https://github.com/venaxin/weatherwiz",
  },
  {
    title: "SonicWave",
    year: 2023,
    status: "Completed",
    description:
      "SonicWave is a custom music player I built to practice JavaScript and UI design—simple controls, clean UI, and basic playlist handling.",
    tech: ["JavaScript", "HTML", "CSS"],
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop", // music-themed placeholder
    demoLink: "https://venaxin.github.io/SonicWave/",
    repoLink: "https://github.com/venaxin/SonicWave",
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
