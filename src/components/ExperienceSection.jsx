export default function ExperienceSection() {
  return (
    <div className="w-full max-w-4xl mx-auto text-left">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 text-white shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
        <header className="mb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-2xl font-semibold">Goodz</h3>
            <span className="text-sm text-white/70">Hyderabad, India</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-white/90">Frontend Development Intern</p>
            <p className="text-sm text-white/70">July 2024 – Dec 2024</p>
          </div>
        </header>

        <section className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">
            Mobile Application Development
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Resolved UI/UX issues in a React Native app, improving navigation
              bars and ensuring cross-device compatibility.
            </li>
            <li>
              Integrated push notifications for Android using Firebase Cloud
              Messaging.
            </li>
            <li>
              Diagnosed and resolved keystore signing errors for secure Android
              release builds.
            </li>
            <li>
              Reduced APK size by optimizing resources and enabling ProGuard.
            </li>
          </ul>
        </section>

        <section>
          <h4 className="mb-2 text-lg font-semibold">
            Web Application Development
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-white/90">
            <li>
              Led the migration of a major front-end application from legacy
              technology to a modern Angular framework.
            </li>
            <li>
              Engineered a high-performance web component to display thousands
              of data records with virtualization, multi-level grouping,
              sorting, filtering, drag/drop, and WCAG accessibility, achieving
              ~90% faster load times than third-party libraries.
            </li>
            <li>
              Developed and optimized features for an Angular-based eCommerce
              platform, enhancing UI consistency and user workflows.
            </li>
            <li>
              Revamped dynamic banners, promotions, and infinite scrolling for
              smooth browse experiences.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
