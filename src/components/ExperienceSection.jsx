export default function ExperienceSection({ eightBit = false }) {
  return (
    <div className="w-full max-w-4xl mx-auto text-left">
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
              Improved the React Native app’s UI/UX by fixing navigation
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
              polling fallback, cutting customer “where is my order?” calls by
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
