/* eslint-disable no-unused-vars */
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiActivity, FiTrendingUp, FiShield } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";

function ProjectCard({ project, index }) {
  const {
    title,
    description,
    tech = [],
    image,
    demoLink,
    repoLink,
    status,
    metrics,
  } = project;

  // Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(x, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // scale tilt
    x.set(px * 10);
    y.set(-py * 10);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.35)] hover:border-white/20 transition-colors"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX,
        rotateY,
      }}
    >
      {/* Glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute -inset-20 bg-[conic-gradient(from_180deg_at_50%_50%,#a855f7_0deg,#f59e0b_90deg,#22d3ee_180deg,#a855f7_270deg,#f59e0b_360deg)] blur-3xl opacity-10" />
      </div>

      {/* Image / banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-purple-700/40 via-indigo-600/30 to-amber-500/30" />
        )}
        {status && (
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            {status}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="mb-4 text-sm text-gray-300">{description}</p>

        {metrics && (
          <div className="mb-4 grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-white/90 border border-white/10">
              <FiTrendingUp className="opacity-80" /> Perf {metrics.perf ?? "—"}
            </div>
            <div className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-white/90 border border-white/10">
              <FiShield className="opacity-80" /> A11y {metrics.a11y ?? "—"}
            </div>
            <div className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-white/90 border border-white/10">
              <FiActivity className="opacity-80" /> Bundle{" "}
              {metrics.bundle ?? "—"}
            </div>
          </div>
        )}

        <div className="mb-5 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white/90"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-yellow-400/90 px-3 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
            >
              <FiExternalLink />
              Live
            </a>
          )}
          {repoLink && (
            <a
              href={repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white transition hover:border-white/40"
            >
              <FaGithub />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
