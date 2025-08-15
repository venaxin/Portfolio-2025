import React, { useEffect, useMemo, useRef } from "react";
import blueGalaxy from "../assets/blue-galaxy.webp";
import whiteGalaxy from "../assets/white-galaxy.png";
import dust from "../assets/galaxy-dust.png";

/*
  GalaxyParallax
  - Lightweight decorative background using static galaxy images.
  - Subtle parallax on scroll and tiny mouse-driven shift; respects disabled.
  - Sits behind MeteorShower, above gradient sky (z-[-1]).
*/
export default function GalaxyParallax({ disabled = false, opacity = 0.14 }) {
  const rootRef = useRef(null);
  const jitter = useMemo(
    () => ({ a: (Math.random() - 0.5) * 8, b: (Math.random() - 0.5) * 8 }),
    []
  );

  // Subtle pointer parallax
  useEffect(() => {
    if (disabled) return undefined;
    const el = rootRef.current;
    if (!el) return undefined;
    let raf = 0;
    let mx = 0;
    let my = 0;
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const nx = Math.max(-1, Math.min(1, (e.clientX / w) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, (e.clientY / h) * 2 - 1));
      mx = nx;
      my = ny;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.setProperty("--mx", String(mx));
          el.style.setProperty("--my", String(my));
        });
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [disabled]);

  if (disabled) return null;

  const commonImg = {
    loading: "lazy",
    decoding: "async",
    draggable: false,
  };

  // Soft edge mask for nicer blending
  const maskStyle = {
    WebkitMaskImage:
      "radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0.0) 75%)",
    maskImage:
      "radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0.0) 75%)",
  };

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[-1] hidden sm:block"
      style={{
        contain: "layout paint",
        contentVisibility: "auto",
        "--mx": 0,
        "--my": 0,
      }}
    >
      {/* Cool blue galaxy - upper left */}
      <div
        className="absolute left-[-8vw] top-[6vh]"
        style={{
          transform:
            "translateY(calc(var(--scroll-y, 0px) * -0.03)) translate(calc(var(--mx, 0) * 8px), calc(var(--my, 0) * 6px)) rotate(-4deg)",
          willChange: "transform",
          opacity,
          mixBlendMode: "screen",
          filter: "saturate(1.1) brightness(1.05)",
          ...maskStyle,
        }}
      >
        <img
          src={blueGalaxy}
          alt="Decorative galaxy"
          className="block select-none"
          width={Math.round(620 + jitter.a * 12)}
          height={Math.round(620 + jitter.a * 12)}
          style={{ objectFit: "contain" }}
          {...commonImg}
        />
      </div>

      {/* White galaxy - right center */}
      <div
        className="absolute right-[-6vw] top-[24vh]"
        style={{
          transform:
            "translateY(calc(var(--scroll-y, 0px) * -0.045)) translate(calc(var(--mx, 0) * 10px), calc(var(--my, 0) * 8px)) rotate(6deg)",
          willChange: "transform",
          opacity: Math.max(0, opacity - 0.02),
          mixBlendMode: "screen",
          filter: "saturate(1.05) brightness(1.04)",
          ...maskStyle,
        }}
      >
        <img
          src={whiteGalaxy}
          alt="Decorative galaxy"
          className="block select-none"
          width={Math.round(540 + jitter.b * 10)}
          height={Math.round(540 + jitter.b * 10)}
          style={{ objectFit: "contain" }}
          {...commonImg}
        />
      </div>

      {/* Dust layer - bottom left */}
      <div
        className="absolute left-[-12vw] bottom-[-6vh]"
        style={{
          transform:
            "translateY(calc(var(--scroll-y, 0px) * -0.028)) translate(calc(var(--mx, 0) * 6px), calc(var(--my, 0) * 10px)) rotate(8deg)",
          willChange: "transform",
          opacity: Math.max(0, opacity - 0.04),
          mixBlendMode: "screen",
          filter: "saturate(1.1) brightness(1.02) blur(0.2px)",
          ...maskStyle,
        }}
      >
        <img
          src={dust}
          alt="Decorative galactic dust"
          className="block select-none"
          width={680}
          height={680}
          style={{ objectFit: "contain" }}
          {...commonImg}
        />
      </div>
    </div>
  );
}
