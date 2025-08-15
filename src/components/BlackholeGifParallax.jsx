import React, { useEffect, useMemo, useRef } from "react";
import redGif from "../assets/red-blackhole.gif";

/*
  BlackholeGifParallax
  - Subtle, vertical parallax for the two provided GIFs.
  - Sits behind MeteorShower. Avoids heavy effects; respects disabled.
  - Uses CSS var --scroll-y set by App for parallax.
*/
export default function BlackholeGifParallax({
  disabled = false,
  opacity = 0.18,
}) {
  // Slight randomization per mount to avoid looking too symmetrical
  const jitter = useMemo(
    () => ({ a: (Math.random() - 0.5) * 6, b: (Math.random() - 0.5) * 6 }),
    []
  );
  const rootRef = useRef(null);

  // Interactive mouse parallax (very subtle), throttled via rAF
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
      {/* Backdrop glows to blend with sky */}
      <div
        className="absolute left-[-12vw] top-[12vh] w-[48vw] h-[48vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.07), rgba(255,255,255,0))",
          transform: `translateY(calc(var(--scroll-y, 0px) * -0.025)) translate(calc(var(--mx, 0) * 6px), calc(var(--my, 0) * 4px))`,
          opacity,
        }}
      />
      <div
        className="absolute right-[-10vw] bottom-[-6vh] w-[52vw] h-[52vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,120,80,0.06), rgba(255,120,80,0))",
          transform: `translateY(calc(var(--scroll-y, 0px) * -0.04)) translate(calc(var(--mx, 0) * 5px), calc(var(--my, 0) * 7px))`,
          opacity,
        }}
      />

      {/* Layered red GIF variants with artistic filters and slight rotation */}
      {/* Variant A - upper-left, magenta tint */}
      <div
        className="absolute left-[-5vw] top-[6vh]"
        style={{
          transform: `translateY(calc(var(--scroll-y, 0px) * -0.03)) translate(calc(var(--mx, 0) * 14px), calc(var(--my, 0) * 10px)) rotate(-8deg)`,
          willChange: "transform",
          opacity,
          filter:
            "hue-rotate(260deg) saturate(1.4) brightness(1.06) drop-shadow(0 6px 28px rgba(190,120,255,0.14))",
          mixBlendMode: "screen",
        }}
      >
        <img
          src={redGif}
          alt="Decorative black hole animation"
          className="block select-none"
          width={Math.round(500 + jitter.a * 8)}
          height={Math.round(500 + jitter.a * 8)}
          style={{ objectFit: "contain" }}
          {...commonImg}
        />
      </div>

      {/* Variant B - right-center, warm golden tint */}
      <div
        className="absolute right-[-3vw] top-[20vh]"
        style={{
          transform: `translateY(calc(var(--scroll-y, 0px) * -0.05)) translate(calc(var(--mx, 0) * 18px), calc(var(--my, 0) * 12px)) rotate(6deg)`,
          willChange: "transform",
          opacity,
          filter:
            "hue-rotate(20deg) saturate(1.25) brightness(1.05) drop-shadow(0 8px 36px rgba(255,180,100,0.18))",
          mixBlendMode: "screen",
        }}
      >
        <img
          src={redGif}
          alt="Decorative black hole animation"
          className="block select-none"
          width={Math.round(620 + jitter.b * 10)}
          height={Math.round(620 + jitter.b * 10)}
          style={{ objectFit: "contain" }}
          {...commonImg}
        />
      </div>

      {/* Variant C - bottom-left, cyan tint */}
      <div
        className="absolute left-[-10vw] bottom-[-4vh]"
        style={{
          transform: `translateY(calc(var(--scroll-y, 0px) * -0.045)) translate(calc(var(--mx, 0) * 10px), calc(var(--my, 0) * 16px)) rotate(10deg)`,
          willChange: "transform",
          opacity,
          filter:
            "hue-rotate(180deg) saturate(1.3) brightness(1.04) drop-shadow(0 8px 34px rgba(120,210,255,0.16))",
          mixBlendMode: "screen",
        }}
      >
        <img
          src={redGif}
          alt="Decorative black hole animation"
          className="block select-none"
          width={560}
          height={560}
          style={{ objectFit: "contain" }}
          {...commonImg}
        />
      </div>

      {/* Variant D - far top-right, cool blue tint */}
      <div
        className="absolute right-[-8vw] top-[-6vh]"
        style={{
          transform: `translateY(calc(var(--scroll-y, 0px) * -0.022)) translate(calc(var(--mx, 0) * 9px), calc(var(--my, 0) * 6px)) rotate(-4deg)`,
          willChange: "transform",
          opacity,
          filter:
            "hue-rotate(220deg) saturate(1.2) brightness(1.06) drop-shadow(0 6px 28px rgba(150,180,255,0.14))",
          mixBlendMode: "screen",
        }}
      >
        <img
          src={redGif}
          alt="Decorative black hole animation"
          className="block select-none"
          width={480}
          height={480}
          style={{ objectFit: "contain" }}
          {...commonImg}
        />
      </div>
    </div>
  );
}
