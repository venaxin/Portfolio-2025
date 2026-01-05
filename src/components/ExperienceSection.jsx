export default function ExperienceSection({ eightBit = false }) {
  return (
    <div className="w-full max-w-4xl mx-auto text-left space-y-6">
      {/* YOURO INTERNSHIP */}
      <div
        className={`${
          eightBit
            ? "pixel-card"
            : "rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
        } p-6 md:p-8 text-white shadow-[0_8px_40px_rgba(0,0,0,0.35)]`}
      >
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
            Real-Time Communication Architecture (WebSockets/STOMP)
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Refactored the mobile chat system to resolve critical synchronization failure where incoming messages from web users were not appearing in real-time on mobile.
            </li>
            <li>
              <strong>Root Cause Analysis:</strong> Identified mismatch between backend broadcast paths and client-side subscriptions; mobile app was subscribing to generic topics while backend sent user-scoped messages.
            </li>
            <li>
              <strong>Implementation:</strong> Integrated @stomp/stompjs and configured user-specific subscription segments (e.g., /user/{"{id}"}/private).
            </li>
            <li>
              <strong>Resilience:</strong> Engineered "Socket-First with REST Fallback" pattern, ensuring chat history remains available even during WebSocket instability.
            </li>
            <li>
              <strong>Debugging:</strong> Created custom legacyTimestamp formatter to resolve HTTP 400 errors caused by backend-specific legacy date string requirements.
            </li>
          </ul>
        </section>

        {/* UI/UX & GESTURES */}
        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">
            Advanced UI/UX & Gesture Engineering
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Implemented high-fidelity, interactive components requiring complex state management and performance tuning.
            </li>
            <li>
              <strong>Symptom Tracking Interface:</strong> Developed dual-mode visualization (Score/Trend) using Animated.View with horizontal translateX transforms.
            </li>
            <li>
              <strong>Stale Closure Fix:</strong> Solved recurring bug where swipe gestures would reset incorrectly by using useRef (symptomModeRef) to track current mode state outside React render cycle, preventing PanResponder from capturing stale state.
            </li>
            <li>
              <strong>Accessibility:</strong> Redesigned StateChooser component, transitioning from confusing grid layout to single-column, elderly-friendly interface with full state name captions and larger touch targets.
            </li>
          </ul>
        </section>

        {/* DATA LAYER OPTIMIZATION */}
        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">
            Data Layer Optimization & Performance
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              <strong>Request Deduplication:</strong> Modified ApiClient.ts to implement in-flight request deduplication, preventing multiple identical API calls from triggering simultaneously.
            </li>
            <li>
              <strong>Caching Strategy:</strong> Developed TTL-based (Time-To-Live) GET response caching system using AsyncStorage, reducing redundant fetches by up to 5 minutes.
            </li>
            <li>
              <strong>Parallel Fetching:</strong> Optimized app initialization by replacing sequential API calls with Promise.allSettled, allowing user profiles, appointments, and care plans to hydrate concurrently.
            </li>
          </ul>
        </section>

        {/* TESTING & QA */}
        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">
            Engineering Rigor & Quality Control
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              <strong>Testing Infrastructure:</strong> Established robust unit testing environment using Jest and react-test-renderer.
            </li>
            <li>
              <strong>Native API Mocking:</strong> Solved "Node environment" limitation for native UI functions by implementing testMeasure prop to inject mock coordinates for components requiring measureInWindow.
            </li>
            <li>
              <strong>Reliable Queries:</strong> Enforced testID props across codebase to move away from fragile text-based or index-based assertions.
            </li>
            <li>
              <strong>Conflict Resolution:</strong> Managed massive 21-file merge conflict during Chat/GMeet feature branch integration, utilizing strategic git checkout --theirs to preserve feature integrity.
            </li>
            <li>
              <strong>Architecture Migration:</strong> Transitioned Android build from Legacy to New Architecture (TurboModules/Fabric) by modifying gradle.properties and resolving library incompatibilities.
            </li>
          </ul>
        </section>

        {/* BACKEND WORK */}
        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">
            Backend & Database Management (Spring Boot)
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              <strong>Auto-Provisioning:</strong> Fixed 500-error crash for new users by implementing "Just-in-Time" subscription provisioning service in PatientService.java.
            </li>
            <li>
              <strong>Sliding Window Logic:</strong> Resolved database truncation errors (diagnoses_list overflow) by creating deduplication and trimming helper that enforces 25-item limit using sliding window approach.
            </li>
            <li>
              <strong>Timezone-Aware Scheduling:</strong> Corrected 1-day offset bug in doctor availability by refactoring date extraction to use UTC instants instead of server local time.
            </li>
          </ul>
        </section>

        {/* KEY IMPACT */}
        <section>
          <h4 className="mb-2 text-lg font-semibold">
            Key Impact Summary
          </h4>
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
      <div
        className={`${
          eightBit
            ? "pixel-card"
            : "rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
        } p-6 md:p-8 text-white shadow-[0_8px_40px_rgba(0,0,0,0.35)]`}
      >
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

        {/* MOBILE DEVELOPMENT */}
        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">
            Mobile Application Development
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Improved the React Native app's UI/UX by fixing navigation
              inconsistencies across Android and iOS, resulting in smoother
              event-planning flows and fewer user drop-offs.
            </li>
            <li>
              Integrated Firebase Cloud Messaging to deliver real-time updates
              for drivers and customers.
            </li>
            <li>
              Diagnosed and resolved Android keystore signing issues to ensure
              reliable and secure release builds.
            </li>
            <li>
              Optimized the production APK by 24.5% (66MB → ~49.8MB) through
              asset cleanup and ProGuard configuration.
            </li>
            <li>
              Implemented OpenStreetMap-based delivery tracking using a
              Leaflet-powered WebView with optimized refresh cycles for
              cost-efficient real-time updates.
            </li>
          </ul>
        </section>

        {/* WEB DEVELOPMENT */}
        <section>
          <h4 className="mb-2 text-lg font-semibold">
            Web Application Development
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Led the migration of a legacy HTML/PHP website to a modern Angular
              architecture, improving initial load times by 50% and bringing key
              pages under 2 seconds.
            </li>
            <li>
              Built a high-performance data grid using Angular CDK
              virtualization and RxJS, enabling smooth rendering of 3,000+
              orders and reducing dashboard load time from 5s to 0.5s.
            </li>
            <li>
              Implemented real-time order tracking through PHP WebSockets with a
              polling fallback, cutting customer "where is my order?" calls by
              25%.
            </li>
            <li>
              Refactored and stabilized Paytm payment flows by fixing checksum
              mismatches, webhook issues, and timestamp sync errors.
            </li>
            <li>
              Improved deployment reliability and collaboration workflows by
              standardizing version control practices on Bitbucket.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
