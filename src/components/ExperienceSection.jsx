export default function ExperienceSection() {
  return (
    <div className="w-full max-w-4xl mx-auto text-left space-y-6">

      {/* RESEARCH AIDE — SUNY */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 text-white shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
        <header className="mb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-2xl font-semibold">SUNY Research Foundation</h3>
            <span className="text-sm text-white/70">Buffalo, NY, US</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-white/90">Research Aide</p>
            <p className="text-sm text-white/70">Apr 2026 – May 2026</p>
          </div>
        </header>

        <p className="text-white/80 mb-4 text-sm">
          <strong>Tech Stack:</strong> Python, PyTorch, Neo4j, FAISS, Llama-3.3 (70B), Qwen-32B, LoRA, Hugging Face PEFT, Kafka, Multi-Agent Systems
        </p>

        <p className="text-white/80 mb-4 text-sm">
          Engineered the L-GRIP (Log Graph-Reasoning Inference Pipeline), a zero-trust, dual-tier autonomous Site Reliability Engineering (SRE) engine. The architecture fuses high-speed SLM geometric routing (Tier 1) with an asynchronous Agentic RAG Control Plane (Tier 2) to diagnose zero-day hardware failures and distributed state-machine anomalies across millions of supercomputer telemetry events.
        </p>

        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">Tier 1: Multi-LoRA Ensemble &amp; Early Latent Fusion</h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Designed a Universal Multi-LoRA Engine dynamically hot-swapping Llama-3.2 (1B), Phi-3.5-Mini (3.8B), and GPT-2 (124M) adapters into a single frozen VRAM footprint.
            </li>
            <li>
              Implemented <strong>Early Latent Fusion</strong> by extracting and concatenating un-pooled terminal hidden states into a unified 5,888-D Super-Vector, leveraging Logistic Regression to achieve a 98.54% compute reduction on safe logs while maintaining near-perfect recall.
            </li>
            <li>
              Solved sequence chronological destruction by pivoting from Mean Pooling to <strong>Causal Last-Token Pooling</strong> and explicitly injecting Structural Metadata (Node Drift ratios, Temporal physics ∆t) prior to inference.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">Tier 2: Graph-Augmented Agentic RAG &amp; Control Plane</h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Built an asynchronous Tier 2 <strong>Cognitive Judge</strong> using a quantized Llama-3.3-70B-Instruct model to analyze anomalies escalated by Tier 1.
            </li>
            <li>
              Engineered a <strong>Universal Security Ontology</strong> mapping 1D log streams into a 3D Neo4j Graph Database. Bypassed global O(|V|+|E|) query bottlenecks by implementing O(1) Ego-Graph extraction (a strict 3-hop radius around the target node) to serialize local topological context for the LLM.
            </li>
            <li>
              Resolved LLM hallucination and cognitive overload by extracting 8,192-D hidden state vectors from the 70B model, utilizing it purely as a mathematical feature extractor feeding into a <strong>Focal Loss MLP</strong> to mine hard negatives and catch stealthy zero-day attacks.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">Autonomous Swarm &amp; Temporal Physics Tracking</h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Deployed a 3-stage <strong>Hierarchical Multi-Agent Swarm</strong> (Commander, Coder, Critic) powered by Qwen-2.5-Coder to autonomously deduce unseen "Alien" log topologies and generate deterministic Python extraction rules.
            </li>
            <li>
              Hardened the Control Plane with an <strong>SRE Hardware Guillotine</strong>—an isolated subprocess with a strict 2.0-second execution timeout that evaluates LLM-generated code, catching infinite loops and passing stderr traces back to the Coder for reflection.
            </li>
            <li>
              Implemented an in-memory <strong>EWMA Latent State Tracker</strong> to maintain running session vectors for highly asynchronous state machines, successfully decoupling individual healthy micro-states from doomed macroscopic block failures without shattering the latent manifold.
            </li>
          </ul>
        </section>
      </div>

      {/* YOURO INTERNSHIP */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 text-white shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
        <header className="mb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-2xl font-semibold">Youro</h3>
            <span className="text-sm text-white/70">Buffalo, NY, US</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-white/90">Software Engineer Intern</p>
            <p className="text-sm text-white/70">August 2025 – December 2025</p>
          </div>
        </header>

        <p className="text-white/80 mb-4 text-sm">
          <strong>Tech Stack:</strong> React Native, TypeScript, Java (Spring Boot), STOMP WebSockets, Jest, Git, PostgreSQL
        </p>

        {/* REAL-TIME COMMUNICATION */}
        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">
            Real-Time WebSocket Chat System
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Built a real-time WebSocket chat system, redesigning data subscription paths to guarantee instant messaging between doctors and patients.
            </li>
            <li>
              <strong>Root Cause:</strong> Backend sent to user-specific paths (e.g., <code className="text-yellow-300">/user/42/private</code>); mobile client subscribed to generic <code className="text-yellow-300">/user/private</code> — messages arrived on the wrong channel and were silently dropped.
            </li>
            <li>
              <strong>Fix:</strong> In <code className="text-yellow-300">ChatSocket.ts</code>, computed user-specific subscription segment post-authentication and updated all paths. Messages now appear instantly without requiring a manual refresh.
            </li>
            <li>
              <strong>Architecture:</strong> Hybrid "Socket-First with REST Fallback" — WebSockets for live incoming messages, REST API for loading chat history on open.
            </li>
            <li>
              <strong>Debugging:</strong> Created custom <code className="text-yellow-300">legacyTimestamp</code> formatter to resolve HTTP 400 errors from backend legacy date string requirements.
            </li>
          </ul>
        </section>

        {/* BACKEND — RATE LIMITER / CRASH FIX */}
        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">
            Backend Crash Resolution &amp; Rate Limiting (Spring Boot)
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Implemented a sliding-window rate limiter in Java Spring Boot to prevent database overloads, completely resolving server crashes during peak traffic.
            </li>
            <li>
              <strong>Root Cause 1 — Missing subscriptions:</strong> New patients lacked a subscription record; a raw <code className="text-yellow-300">Optional.get()</code> call in <code className="text-yellow-300">PatientService.java</code> threw <code className="text-yellow-300">NoSuchElementException</code> and crashed the request handler under load. Fixed with just-in-time auto-provisioning.
            </li>
            <li>
              <strong>Root Cause 2 — Column overflow:</strong> <code className="text-yellow-300">diagnoses_list</code> string column hit its size limit as patients accumulated diagnoses. Implemented a sliding window that trims the list to the 25 most recent entries before saving — column never overflows.
            </li>
            <li>
              <strong>Timezone-Aware Scheduling:</strong> Corrected 1-day offset bug in doctor availability by refactoring date extraction to use UTC instants instead of server local time.
            </li>
          </ul>
        </section>

        {/* DASHBOARD & MEMOIZATION */}
        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">
            React Native Dashboard — Component Memoization (40% Render Improvement)
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Developed the React Native patient dashboard — appointments, symptom scores, care plan progress, state selector — using component memoization to reduce render times by 40% for a fluid UI.
            </li>
            <li>
              <strong>Problem:</strong> A <code className="text-yellow-300">nowTick</code> timer updating every 30 seconds triggered a full re-render of every card on the screen, even ones with no dependency on the current time.
            </li>
            <li>
              <strong>Fix:</strong> Wrapped independent cards in <code className="text-yellow-300">React.memo</code>; used <code className="text-yellow-300">useCallback</code> on handler props so memo comparisons didn't see "new" functions on every render.
            </li>
            <li>
              <strong>Stale Closure Fix:</strong> <code className="text-yellow-300">PanResponder</code> gesture handler captured stale state at mount. Fixed by using <code className="text-yellow-300">useRef</code> (<code className="text-yellow-300">symptomModeRef</code>) so gestures always read current state.
            </li>
            <li>
              <strong>Accessibility:</strong> Redesigned StateChooser from a confusing grid to a single-column, elderly-friendly interface with full state name captions and larger touch targets.
            </li>
          </ul>
        </section>

        {/* DATA LAYER OPTIMIZATION */}
        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">
            Network Optimization — 30% Payload Reduction
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Cut network payload by 30% and improved app load times by caching data and stripping duplicate API calls.
            </li>
            <li>
              <strong>Request Deduplication:</strong> Modified <code className="text-yellow-300">ApiClient.ts</code> to track in-flight requests by URL — if a request for the same URL is already running, return the existing Promise instead of starting a new one.
            </li>
            <li>
              <strong>TTL Caching:</strong> Added Time-To-Live GET response caching using AsyncStorage for infrequently-changing data (state lists, diagnoses catalog, provider lists) — reduces redundant fetches.
            </li>
            <li>
              <strong>Parallel Bootstrapping:</strong> Replaced sequential startup fetches with <code className="text-yellow-300">Promise.allSettled</code> — profile, subscription, and settings hydrate concurrently; a single failure no longer blocks the whole startup.
            </li>
            <li>
              <strong>Security:</strong> Added sensitive field masking in API logging — any field named <code className="text-yellow-300">password</code>, <code className="text-yellow-300">token</code>, or <code className="text-yellow-300">authorization</code> is replaced with <code className="text-yellow-300">[REDACTED]</code> before logging.
            </li>
          </ul>
        </section>

        {/* TESTING & QA */}
        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">
            Engineering Rigor &amp; Quality Control
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              <strong>Testing Infrastructure:</strong> Established robust unit testing environment using Jest and react-test-renderer.
            </li>
            <li>
              <strong>Native API Mocking:</strong> Solved "Node environment" limitation for native UI functions by implementing <code className="text-yellow-300">testMeasure</code> prop to inject mock coordinates for components requiring <code className="text-yellow-300">measureInWindow</code>.
            </li>
            <li>
              <strong>Reliable Queries:</strong> Enforced <code className="text-yellow-300">testID</code> props across codebase to move away from fragile text-based or index-based assertions.
            </li>
            <li>
              <strong>Conflict Resolution:</strong> Managed massive 21-file merge conflict during Chat/GMeet feature branch integration using strategic <code className="text-yellow-300">git checkout --theirs</code> to preserve feature integrity.
            </li>
            <li>
              <strong>Architecture Migration:</strong> Transitioned Android build from Legacy to New Architecture (TurboModules/Fabric) by modifying <code className="text-yellow-300">gradle.properties</code> and resolving library incompatibilities.
            </li>
          </ul>
        </section>

        {/* KEY IMPACT */}
        <section>
          <h4 className="mb-2 text-lg font-semibold">Key Impact Summary</h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              <strong>Zero-Defect Codebase:</strong> Achieved 100% test pass rate and resolved all TypeScript/lint errors across mobile repository.
            </li>
            <li>
              <strong>UX Consistency:</strong> Standardized back-button navigation across iOS and Android by integrating native HeaderBackButton elements, replacing inconsistent hardcoded symbols.
            </li>
            <li>
              <strong>Onboarding Efficiency:</strong> Developed "Getting Started" checklist that dynamically tracks intake form status and appointment booking, reducing initial user friction.
            </li>
          </ul>
        </section>
      </div>

      {/* GOODZ EXPERIENCE */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 text-white shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
        <header className="mb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-2xl font-semibold">Goodz</h3>
            <span className="text-sm text-white/70">Hyderabad, India</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-white/90">Software Developer</p>
            <p className="text-sm text-white/70">July 2023 – Dec 2024</p>
          </div>
        </header>

        <p className="text-white/80 mb-4 text-sm">
          <strong>Tech Stack:</strong> Angular, React Native, PHP, MySQL, Firebase (FCM), AWS S3, CloudFront, RxJS, Angular CDK, Paytm, Bitbucket
        </p>

        {/* WEB DEVELOPMENT */}
        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">
            Web Platform Migration &amp; Performance
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Led the migration of a legacy HTML/PHP website to Angular, cutting page load times from 8 seconds to under 2 seconds to boost user retention.
            </li>
            <li>
              <strong>What actually made it fast:</strong> Lazy-loaded images (<code className="text-yellow-300">ng-lazyload</code>), Angular route-level lazy loading (checkout/vendor dashboard modules only load on navigation), and offloading all static assets to AWS S3 + CloudFront.
            </li>
            <li>
              Built a high-performance data grid using Angular CDK VirtualScrollViewport and RxJS, enabling smooth rendering of 3,000+ orders and reducing dashboard load time from 5s to 0.5s — 90% faster, zero crashes.
            </li>
            <li>
              <strong>Grid features:</strong> Multi-level grouping (recursive Angular components), multi-filtering via RxJS BehaviorSubject, drag-and-drop reordering (Angular CDK DragDrop), and WCAG ARIA roles + keyboard navigation.
            </li>
            <li>
              Implemented real-time order tracking through PHP WebSockets with a polling fallback, cutting customer "where is my order?" calls by 25%.
            </li>
            <li>
              Refactored and stabilized Paytm payment flows by fixing checksum mismatches, webhook issues, and timestamp sync errors.
            </li>
          </ul>
        </section>

        {/* AWS / INFRA */}
        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">
            AWS Infrastructure &amp; Deployment Automation
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Reduced server delivery costs by 20% by moving all static asset hosting to AWS S3 and CloudFront with automated deployment scripts.
            </li>
            <li>
              <strong>Scripts (bash + AWS CLI):</strong> <code className="text-yellow-300">ng build --prod</code> → <code className="text-yellow-300">aws s3 sync dist/ s3://bucket --delete</code> → <code className="text-yellow-300">aws cloudfront create-invalidation</code>. Replaced manual FTP deploys with a one-command repeatable pipeline anyone on the team could run.
            </li>
            <li>
              Improved deployment reliability and collaboration workflows by standardizing version control practices on Bitbucket.
            </li>
          </ul>
        </section>

        {/* MOBILE DEVELOPMENT */}
        <section>
          <h4 className="mb-2 text-lg font-semibold">
            React Native Mobile Application
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Rebuilt the React Native mobile app's navigation stack using React Navigation, fixing Android back-button exits and iOS swipe gesture glitches. Used the Dimensions API for responsive layouts across a wide range of cheap Android devices.
            </li>
            <li>
              Integrated Firebase Cloud Messaging (FCM) for real-time driver alerts. Set up custom notification channels — "Order Ready" with distinct sound and high priority, "Delay Update" as lower priority. Fixed a ProGuard/FCM bug where obfuscated class names broke the FCM SDK at runtime by adding explicit keep rules in <code className="text-yellow-300">proguard-rules.pro</code>.
            </li>
            <li>
              Reduced the production APK from 45MB to ~34MB (24% smaller) via ProGuard (<code className="text-yellow-300">minifyEnabled true</code>) and asset optimization.
            </li>
            <li>
              Added delivery tracking maps using OpenStreetMap + Leaflet.js inside a React Native WebView (cost: ~$0 vs. Google Maps Platform). Integrated Supercluster for 50+ delivery pin clustering; markers refresh on tap rather than continuously to keep API call rates low.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
