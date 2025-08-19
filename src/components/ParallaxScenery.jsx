import React from "react";
import ResponsiveImage from "./ResponsiveImage.jsx";

/*
  ParallaxScenery: decorative side images with gentle parallax.
  - Hidden on small screens; shown from md and up.
  - Disabled via prop to respect Low Power or reduced-motion.
*/
export default function ParallaxScenery({ disabled = false, opacity = 0.22 }) {
  if (disabled) return null;

  const common = {
    widths: [320, 480, 640, 768, 960, 1200],
    sizes: "(max-width: 1024px) 30vw, 28vw",
    loading: "lazy",
    decoding: "async",
    fetchPriority: "low",
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] hidden md:block">
      {/* Left nebula */}
      <div
        className="absolute left-0 top-[-10vh] h-[140vh] w-[30vw] md:w-[28vw] lg:w-[26vw]"
        style={{
          transform: "translateY(calc(var(--scroll-y, 0px) * -0.06))",
          willChange: "transform",
          opacity,
        }}
      >
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&auto=format&fit=crop"
          alt="Decorative nebula"
          className="h-full w-full object-cover"
          {...common}
        />
      </div>

      {/* Right clouds/galaxy */}
      <div
        className="absolute right-0 top-[-12vh] h-[150vh] w-[32vw] md:w-[30vw] lg:w-[28vw]"
        style={{
          transform: "translateY(calc(var(--scroll-y, 0px) * -0.08))",
          willChange: "transform",
          opacity,
        }}
      >
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&auto=format&fit=crop"
          alt="Decorative galaxy clouds"
          className="h-full w-full object-cover"
          {...common}
        />
      </div>
    </div>
  );
}
