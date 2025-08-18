/* eslint-disable no-unused-vars */
import { motion, useMotionValue, useSpring } from "framer-motion";
import ResponsiveImage from "./ResponsiveImage.jsx";
import { FaGithub } from "react-icons/fa";
import { FiActivity, FiTrendingUp, FiShield } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";

function ProjectCard({
  project,
  index,
  onOpenCaseStudy,
  lowPower = false,
  eightBit = false,
}) {
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
      className={`group relative overflow-hidden ${
        eightBit
          ? "pixel-card"
          : "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm md:backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.35)] hover:border-white/20 transition-colors"
      }`}
      onMouseMove={lowPower || eightBit ? undefined : handleMouseMove}
      onMouseLeave={lowPower || eightBit ? undefined : handleMouseLeave}
      initial={lowPower ? undefined : { opacity: 0, y: 30 }}
      animate={lowPower ? undefined : { opacity: 1, y: 0 }}
      transition={
        lowPower
          ? undefined
          : { duration: 0.4, delay: index * 0.06, ease: "easeOut" }
      }
      style={
        lowPower || eightBit
          ? undefined
          : {
              transformStyle: "preserve-3d",
              perspective: 1000,
              rotateX,
              rotateY,
            }
      }
    >
      {/* Glow on hover */}
      {!eightBit && (
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute -inset-20 bg-[conic-gradient(from_180deg_at_50%_50%,#a855f7_0deg,#f59e0b_90deg,#22d3ee_180deg,#a855f7_270deg,#f59e0b_360deg)] blur-3xl opacity-10" />
        </div>
      )}

      {/* Image / banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {image ? (
          <ResponsiveImage
            src={image}
            alt={title}
            className={`h-full w-full object-cover ${
              eightBit
                ? "image-pixelated"
                : "transition-transform duration-500 group-hover:scale-[1.03] md:group-hover:scale-[1.05]"
            }`}
            widths={[320, 480, 640, 768, 960, 1200, 1600]}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className={`h-full w-full ${
              eightBit
                ? "bg-black/40"
                : "bg-gradient-to-br from-purple-700/40 via-indigo-600/30 to-amber-500/30"
            }`}
          />
        )}
        {status && (
          <span
            className={`absolute left-3 top-3 ${
              eightBit
                ? "pixel-badge"
                : "rounded-full bg-black/60 backdrop-blur"
            } px-2.5 py-1 text-xs font-medium text-white`}
          >
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
            <div
              className={`flex items-center gap-1 ${
                eightBit
                  ? "pixel-chip"
                  : "rounded-md bg-white/5 border border-white/10"
              } px-2 py-1 text-white/90`}
            >
              <FiTrendingUp className="opacity-80" /> Perf {metrics.perf ?? "—"}
            </div>
            <div
              className={`flex items-center gap-1 ${
                eightBit
                  ? "pixel-chip"
                  : "rounded-md bg-white/5 border border-white/10"
              } px-2 py-1 text-white/90`}
            >
              <FiShield className="opacity-80" /> A11y {metrics.a11y ?? "—"}
            </div>
            <div
              className={`flex items-center gap-1 ${
                eightBit
                  ? "pixel-chip"
                  : "rounded-md bg-white/5 border border-white/10"
              } px-2 py-1 text-white/90`}
            >
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
          {onOpenCaseStudy && (
            <button
              onClick={onOpenCaseStudy}
              className={`inline-flex items-center gap-2 ${
                eightBit
                  ? "pixel-button"
                  : "rounded-md border border-white/20 hover:border-white/40"
              } px-3 py-2 text-sm font-semibold text-white transition`}
            >
              Case Study
            </button>
          )}
          {demoLink ? (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${
                eightBit ? "pixel-button" : "rounded-md btn-accent"
              } px-3 py-2 text-sm font-semibold transition`}
            >
              <FiExternalLink />
              Live
            </a>
          ) : (
            <span
              className={`inline-flex items-center gap-2 ${
                eightBit
                  ? "pixel-button opacity-50 cursor-not-allowed"
                  : "rounded-md border border-white/10 text-white/40 cursor-not-allowed"
              } px-3 py-2 text-sm font-semibold`}
              aria-disabled="true"
              title="Live link not available"
            >
              <FiExternalLink />
              Live
            </span>
          )}
          {repoLink ? (
            <a
              href={repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${
                eightBit
                  ? "pixel-button"
                  : "rounded-md border border-white/20 hover:border-white/40"
              } px-3 py-2 text-sm font-semibold text-white transition`}
            >
              <FaGithub />
              Code
            </a>
          ) : (
            <span
              className={`inline-flex items-center gap-2 ${
                eightBit
                  ? "pixel-button opacity-50 cursor-not-allowed"
                  : "rounded-md border border-white/10 text-white/40 cursor-not-allowed"
              } px-3 py-2 text-sm font-semibold`}
              aria-disabled="true"
              title="Code link not available"
            >
              <FaGithub />
              Code
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
