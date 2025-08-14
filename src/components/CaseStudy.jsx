import { useEffect, useCallback } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

export default function CaseStudy({ project, onClose }) {
  const isOpen = !!project;

  const escHandler = useCallback(
    (e) => {
      if (e.key === "Escape") onClose?.();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", escHandler);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", escHandler);
      document.body.style.overflow = prev;
    };
  }, [isOpen, escHandler]);

  if (!isOpen) return null;

  const {
    title,
    status,
    image,
    tech = [],
    demoLink,
    repoLink,
    caseStudy = {},
  } = project;

  const { problem, constraints, approach, results, highlights, links, images } =
    caseStudy;

  return (
    <AnimatePresence>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
      >
        <Motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-white shadow-xl"
        >
          {/* Header / Hero */}
          {image && (
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
              {status && (
                <span className="absolute left-4 top-4 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                  {status}
                </span>
              )}
            </div>
          )}

          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <FiX />
          </button>

          <div className="p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-semibold">{title}</h3>
                {tech?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white/10 px-2 py-1 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {demoLink && (
                  <a
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-yellow-400/90 px-3 py-2 text-sm font-semibold text-black hover:bg-yellow-400"
                  >
                    <FiExternalLink /> Live
                  </a>
                )}
                {repoLink && (
                  <a
                    href={repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold hover:border-white/40"
                  >
                    <FaGithub /> Code
                  </a>
                )}
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              {problem && (
                <section className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold">Problem</h4>
                  <p className="text-white/90">{problem}</p>
                </section>
              )}
              {constraints && (
                <section className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold">Constraints</h4>
                  <ul className="list-disc pl-5 text-white/90">
                    {constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </section>
              )}
              {approach && (
                <section className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold">Approach</h4>
                  <p className="text-white/90 whitespace-pre-line">
                    {approach}
                  </p>
                </section>
              )}
              {results && (
                <section className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold">Results</h4>
                  <ul className="list-disc pl-5 text-white/90">
                    {results.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </section>
              )}
              {highlights && (
                <section className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold">Highlights</h4>
                  <ul className="list-disc pl-5 text-white/90">
                    {highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </section>
              )}
              {images?.length > 0 && (
                <section className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold">Screens</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`s-${i}`}
                        className="rounded-lg border border-white/10"
                      />
                    ))}
                  </div>
                </section>
              )}
              {links && (
                <section className="mb-2">
                  <h4 className="mb-2 text-lg font-semibold">
                    Further Reading
                  </h4>
                  <ul className="list-disc pl-5 text-white/90">
                    {links.map(({ label, href }, i) => (
                      <li key={i}>
                        <a
                          className="text-yellow-300 hover:underline"
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </Motion.div>
      </Motion.div>
    </AnimatePresence>
  );
}
