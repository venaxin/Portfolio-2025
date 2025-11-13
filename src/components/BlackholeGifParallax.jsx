import React, { useEffect, useMemo, useRef, useState } from "react";
import redGif from "../assets/red-blackhole.gif";

/*
  BlackholeGifParallax
  - Subtle, vertical parallax for the provided GIF animation.
  - Sits behind MeteorShower. Avoids heavy effects; respects disabled.
  - Uses CSS var --scroll-y set by App for parallax.
  - OPTIMIZED: Deferred loading to prevent blocking initial render
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
  const [gifLoaded, setGifLoaded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Defer GIF loading until after initial render
  useEffect(() => {
    if (disabled) return;

    // Wait for idle time before loading GIF
    const loadGif = () => {
      // Preload the GIF
      const img = new Image();
      img.onload = () => {
        setGifLoaded(true);
        // Show notification after GIF loads (only once)
        setTimeout(() => {
          const hasSeenNotif = localStorage.getItem("bhGifNotificationSeen");
          if (!hasSeenNotif) {
            setShowNotification(true);
            localStorage.setItem("bhGifNotificationSeen", "true");
          }
        }, 1000);
      };
      img.src = redGif;
    };

    // Use requestIdleCallback for better performance, fallback to timeout
    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadGif, { timeout: 2000 });
    } else {
      setTimeout(loadGif, 2000);
    }
  }, [disabled]);

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

  return (
    <>
      <div
        ref={rootRef}
        className="pointer-events-none fixed inset-0 z-[5] hidden sm:block"
        style={{
          contain: "layout paint",
          contentVisibility: "auto",
          "--mx": 0,
          "--my": 0,
        }}
      >
        {/* Backdrop glows to blend with sky - always visible */}
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

        {/* Only render GIFs once loaded */}
        {gifLoaded ? (
          <>
            {/* Layered GIF variants with artistic filters and slight rotation */}
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
                alt=""
                loading="lazy"
                width={Math.round(500 + jitter.a * 8)}
                height={Math.round(500 + jitter.a * 8)}
                className="block select-none"
                style={{ objectFit: "contain" }}
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
                alt=""
                loading="lazy"
                width={Math.round(620 + jitter.b * 10)}
                height={Math.round(620 + jitter.b * 10)}
                className="block select-none"
                style={{ objectFit: "contain" }}
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
                alt=""
                loading="lazy"
                width={560}
                height={560}
                className="block select-none"
                style={{ objectFit: "contain" }}
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
                alt=""
                loading="lazy"
                width={480}
                height={480}
                className="block select-none"
                style={{ objectFit: "contain" }}
              />
            </div>
          </>
        ) : (
          /* Placeholder gradients while loading - lightweight visual feedback */
          <>
            <div
              className="absolute left-[-5vw] top-[6vh] w-[52vw] h-[52vw] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(200,100,255,0.04), transparent)",
                transform: `translateY(calc(var(--scroll-y, 0px) * -0.03))`,
                opacity: opacity * 0.5,
              }}
            />
            <div
              className="absolute right-[-3vw] top-[20vh] w-[48vw] h-[48vw] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,150,50,0.04), transparent)",
                transform: `translateY(calc(var(--scroll-y, 0px) * -0.05))`,
                opacity: opacity * 0.5,
              }}
            />
          </>
        )}
      </div>

      {/* Notification toast */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 max-w-sm rounded-lg border border-white/20 bg-black/80 backdrop-blur-md p-3 shadow-xl animate-slide-in">
          <div className="flex items-start gap-3">
            <span className="text-2xl" aria-hidden="true">
              ✨
            </span>
            <div className="flex-1">
              <p className="text-sm text-white/90 mb-2">
                Black hole parallax loaded! Want more visuals?
              </p>
              <button
                onClick={() => {
                  setShowNotification(false);
                  // Try to open accessibility panel
                  const btn = document.querySelector(
                    '[title="Accessibility & Themes"]'
                  );
                  if (btn) btn.click();
                }}
                className="text-xs px-2 py-1 rounded border border-white/30 hover:border-white/60 transition-colors"
              >
                Open Settings
              </button>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
