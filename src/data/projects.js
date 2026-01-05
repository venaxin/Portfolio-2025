const projects = [
  // New 8 Projects (2025)
  {
    title: "Venyx: Hierarchical Multi-Agent OS Assistant",
    year: 2025,
    status: "Ongoing",
    description:
      "A centralized, hierarchical intelligence layer for macOS that decomposes complex user intents into executable sub-tasks using a Lead Agent orchestrator and specialized Sub-Agents.",
    tech: ["Swift", "SwiftUI", "Gemini API", "Python"],
    image:
      "https://images.unsplash.com/photo-1677442d019cecf8514f0c04e7a36a3d18b440f23?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "macOS lacks a unified intelligence layer that can intelligently decompose complex user intents across multiple applications and delegate to specialized agents.",
      constraints: [
        "Cross-application orchestration",
        "Context-aware task execution",
        "Unified command interface",
        "Native macOS integration",
      ],
      approach:
        "Architected a Hierarchical Multi-Agent System (HMAS) where a Lead Agent receives natural language input, uses Gemini API to decompose tasks, and delegates to specialized Sub-Agents (File Manager, Web Searcher, App Automator). Implemented in Swift with SwiftUI for native macOS UI and Python backend for core logic orchestration.",
      results: [
        "Seamless cross-application task orchestration",
        "Context-aware execution with multi-agent coordination",
        "Unified natural language command interface",
      ],
      highlights: [
        "Hierarchical Multi-Agent System architecture",
        "Lead Agent orchestration with Gemini API",
        "Specialized Sub-Agents for different domains",
        "Native macOS SwiftUI interface",
        "Cross-application automation",
      ],
      links: [
        { label: "Gemini API", href: "https://ai.google.dev/" },
        { label: "SwiftUI", href: "https://developer.apple.com/swiftui/" },
      ],
      images: [],
    },
  },
  {
    title: "The Fire Squad: Multi-Agent Reinforcement Learning",
    year: 2025,
    status: "Completed",
    description:
      "An advanced MARL system optimizing emergency response coordination in wildfire scenarios, addressing credit assignment and multi-agent communication challenges.",
    tech: ["Python", "Stable Baselines3", "Gymnasium", "PyTorch"],
    image:
      "https://images.unsplash.com/photo-1633613286991-611bcede9134?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "Wildfire containment requires coordinated multi-agent decision-making with limited resources. Single-agent approaches fail to capture collaborative suppression and movement policies.",
      constraints: [
        "Multi-agent credit assignment problem",
        "Agent communication and coordination",
        "Limited resource constraints",
        "Real-time decision making",
      ],
      approach:
        "Extended the FirecastRL environment with Multi-Agent Reinforcement Learning (MARL) using Stable Baselines3. Implemented coordinated movement and suppression policies, allowing multiple autonomous agents to collaborate in containing fires while managing limited resources. Addressed credit assignment through policy gradient methods and communication channels.",
      results: [
        "Improved containment efficiency vs. single-agent baselines",
        "Effective multi-agent coordination policies",
        "Scalable to large fire scenarios",
      ],
      highlights: [
        "Multi-Agent Reinforcement Learning framework",
        "Coordinated suppression and movement policies",
        "Credit assignment problem solutions",
        "Agent communication protocols",
        "FirecastRL environment extension",
      ],
      links: [
        { label: "Stable Baselines3", href: "https://stable-baselines3.readthedocs.io/" },
        { label: "Gymnasium", href: "https://gymnasium.farama.org/" },
        { label: "PyTorch", href: "https://pytorch.org/" },
      ],
      images: [],
    },
  },
  {
    title: "Promptly: Real-Time Prompt Engineering Utility",
    year: 2025,
    status: "Completed",
    description:
      "A lightweight, floating macOS widget that instantly optimizes rough drafts into engineered LLM prompts using Gemini API with ultra-low latency.",
    tech: ["Swift", "SwiftUI", "Gemini API"],
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "Users struggle to bridge the gap between rough ideas and well-structured LLM prompts. Manual prompt engineering is time-consuming and blocks workflow.",
      constraints: [
        "Low-latency UI/UX",
        "Floating widget always-on-top",
        "Seamless clipboard integration",
        "Real-time API calls",
      ],
      approach:
        "Built a lightweight macOS widget using SwiftUI that stays on top of the workspace. Users paste a draft prompt; Gemini API restructures it based on engineering principles (Context, Task, Constraints, Output Format). Optimized for minimal latency with async API calls and caching.",
      results: [
        "Sub-second prompt optimization",
        "Seamless clipboard workflow integration",
        "Improved prompt quality and LLM response relevance",
      ],
      highlights: [
        "Lightweight floating widget design",
        "Real-time Gemini API integration",
        "Prompt engineering principle templates",
        "Clipboard automation",
        "Low-latency UI/UX",
      ],
      links: [
        { label: "Gemini API", href: "https://ai.google.dev/" },
        { label: "SwiftUI", href: "https://developer.apple.com/swiftui/" },
      ],
      images: [],
    },
  },

  // Ongoing
  {
    title: "Lock-IN",
    year: 2025,
    status: "Completed",
    description:
      "AI-assisted focus coach that syncs tasks with Google Calendar, predicts procrastination risk, and nudges you into the right work block before momentum slips. Features adaptive priority scoring, smart scheduling with Pomodoro timers, and Gemini AI coaching for personalized productivity insights.",
    tech: [
      "Flask",
      "SQLite",
      "Google Calendar API",
      "Gemini AI",
      "Vanilla JS",
      "OAuth 2.0",
    ],
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop",
    demoLink: "https://lockin.nyc",
    repoLink: "https://github.com/venaxin/Lock-IN",
    metrics: { perf: 94, a11y: 98, bundle: "—" },
    caseStudy: {
      problem:
        "Students struggle with procrastination and momentum loss between tasks. Generic to-do apps lack smart scheduling, risk prediction, and AI-powered coaching to catch issues before they snowball.",
      constraints: [
        "Bidirectional Google Calendar sync without conflicts",
        "Real-time procrastination risk scoring",
        "Smart browser notifications without spam",
        "Lightweight AI coaching within Gemini API limits",
      ],
      approach:
        "Built a Flask backend with SQLite for task/schedule persistence. Integrated Google OAuth for Calendar bidirectional sync, filtering conflicts and inserting Lock-IN focus blocks. Gemini AI classifies tasks (deep_work, planning, etc.) and estimates buffer days + Pomodoro blocks. Priority scoring algorithm fuses deadline slack, streak state, and completion history into 0-200 risk scores. Frontend implements adaptive Pomodoro timers, drag-and-drop scheduling, and background notification sweeps with localStorage deduplication. AI insights coach posts ~45min snapshots for personalized recovery tips.",
      results: [
        "Seamless Google Calendar conflict resolution",
        "Smart notifications for upcoming blocks, deadlines, and missed sessions",
        "AI-powered task classification and coaching",
        "Procrastination analytics with streak tracking and category risk heat maps",
      ],
      highlights: [
        "Gemini AI task classification & coaching",
        "Adaptive priority & procrastination risk scoring (0-200)",
        "Google Calendar bidirectional sync with conflict resolution",
        "Smart Pomodoro scheduling with drag-and-drop",
        "Browser notification sweeps with deduplication",
        "Streak protection & recovery suggestions",
        "OAuth 2.0 security with session management",
      ],
      links: [
        { label: "Live App", href: "https://lockin.nyc" },
        { label: "GitHub", href: "https://github.com/venaxin/Lock-IN" },
        { label: "Gemini API", href: "https://ai.google.dev/" },
      ],
      images: [],
    },
  },
  {
    title: "Zenith Planner: High-Performance Productivity Suite",
    year: 2025,
    status: "Completed",
    description:
      "A robust task management system with complex drag-and-drop functionality across Daily, Weekly, and Monthly views, featuring state persistence and hierarchical task organization.",
    tech: ["JavaScript", "React", "Node.js", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "Users need a high-speed task management system with multiple temporal views without data loss when switching between Daily, Weekly, and Monthly perspectives.",
      constraints: [
        "Complex drag-and-drop across different views",
        "State persistence without data loss",
        "Real-time task updates",
        "Hierarchical task organization",
      ],
      approach:
        "Implemented complex Drag-and-Drop (DnD) functionality using React with state management ensuring seamless transitions between temporal views. Built a robust backend with PostgreSQL for state persistence. Interactive calendar views with real-time updates and hierarchical task organization using a tree-based data structure.",
      results: [
        "Seamless view transitions with zero data loss",
        "High-performance drag-and-drop across all views",
        "Real-time collaborative updates",
      ],
      highlights: [
        "Complex drag-and-drop functionality",
        "Multiple temporal views (Daily, Weekly, Monthly)",
        "State persistence architecture",
        "Hierarchical task organization",
        "Real-time task updates",
        "Interactive calendar interfaces",
      ],
      links: [
        { label: "React", href: "https://react.dev/" },
        { label: "PostgreSQL", href: "https://www.postgresql.org/" },
      ],
      images: [],
    },
  },
  {
    title: "Algorithmic Stock Analysis & RL Trading Policy",
    year: 2025,
    status: "Completed",
    description:
      "A big data system leveraging PySpark for technical indicator calculation and Reinforcement Learning to automate trading decisions on high-frequency market data.",
    tech: ["PySpark", "Python", "Pandas", "Reinforcement Learning", "RLlib"],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7fbda1?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "Identifying profitable trading signals in massive datasets and automating decision-making requires both efficient data processing and intelligent policy learning.",
      constraints: [
        "Large-scale data processing",
        "Technical indicator calculation at scale",
        "Real-time decision making",
        "Risk management in RL policies",
      ],
      approach:
        "Leveraged PySpark for large-scale data processing, calculating technical indicators like RSI (Relative Strength Index) and identifying price gaps across massive datasets. Developed a Reinforcement Learning policy using RLlib or Stable Baselines that treats the market as an environment where the agent learns to 'Buy,' 'Hold,' or 'Sell' based on processed technical indicators to maximize cumulative returns.",
      results: [
        "Efficient processing of high-frequency market data",
        "Profitable trading signals identified",
        "Automated decision-making policy learned",
      ],
      highlights: [
        "PySpark-based data processing pipeline",
        "Technical indicator computation at scale",
        "Reinforcement Learning trading policy",
        "Risk-adjusted return optimization",
        "Buy/Hold/Sell decision automation",
      ],
      links: [
        { label: "PySpark", href: "https://spark.apache.org/" },
        { label: "RLlib", href: "https://docs.ray.io/en/latest/rllib/" },
      ],
      images: [],
    },
  },
  {
    title: "Automated Security & CI/CD Pipeline",
    year: 2025,
    status: "Completed",
    description:
      "A security-first deployment pipeline automating vulnerability detection through Docker Scout integration with every code commit to prevent CVEs in production.",
    tech: ["Docker", "Docker Scout", "GitHub Actions", "Linux Shell"],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "Containerized applications are vulnerable if security scanning is manual or deferred. CVEs can reach production without automated detection gates.",
      constraints: [
        "Automated vulnerability detection",
        "Pre-production security gates",
        "Fast build/scan cycle",
        "CVE reporting and remediation",
      ],
      approach:
        "Built a CI/CD pipeline where every code commit triggers an automated build and scan. Integrated Docker Scout to perform deep image analysis, identifying CVEs (Common Vulnerabilities and Exposures) before the image reaches production. Enforced security gates in the deployment lifecycle using GitHub Actions orchestration.",
      results: [
        "Zero CVEs reaching production",
        "Significantly reduced attack surface",
        "Fast feedback loop for developers",
      ],
      highlights: [
        "Automated CI/CD pipeline",
        "Docker Scout integration",
        "Deep image analysis and scanning",
        "CVE detection and prevention",
        "GitHub Actions orchestration",
        "Security gate enforcement",
      ],
      links: [
        { label: "Docker Scout", href: "https://www.docker.com/products/scout/" },
        { label: "GitHub Actions", href: "https://github.com/features/actions" },
      ],
      images: [],
    },
  },
  {
    title: "OS Core Architecture Implementation",
    year: 2025,
    status: "Completed",
    description:
      "Research and development of fundamental OS components including Process Schedulers, Memory Management (Paging/Segmentation), and File Systems with focus on resource efficiency.",
    tech: ["C", "C++", "Systems Programming", "Unix/Linux"],
    image:
      "https://images.unsplash.com/photo-1550439062-2cba8dba8a97?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "Building scalable and efficient operating systems requires deep understanding of low-level resource management, concurrency, and deadlock prevention.",
      constraints: [
        "Process scheduling efficiency",
        "Memory management optimization",
        "Deadlock prevention and detection",
        "File system reliability",
      ],
      approach:
        "Designed and implemented low-level systems including Process Schedulers with priority queues and preemption logic, Memory Management Units supporting both Paging and Segmentation, and reliable File Systems. Focused on managing concurrency, preventing deadlocks, and optimizing CPU utilization through careful resource allocation and synchronization primitives.",
      results: [
        "Stable multi-process environment",
        "Efficient resource management",
        "Minimal deadlock incidents",
      ],
      highlights: [
        "Process scheduler implementation",
        "Memory management (Paging/Segmentation)",
        "File system design",
        "Concurrency and synchronization",
        "Deadlock prevention mechanisms",
        "CPU utilization optimization",
      ],
      links: [
        { label: "OSDEV.org", href: "https://wiki.osdev.org/" },
        { label: "Linux Kernel", href: "https://kernel.org/" },
      ],
      images: [],
    },
  },

  // Previous
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
