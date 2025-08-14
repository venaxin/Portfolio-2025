import { useEffect, useRef } from "react";

/*
  PixelBlackhole (gold accretion disk)
  - Single background animation, tuned to resemble src/data/blackhole.webp:
    • Elliptical disk with vertical compression (tilt)
    • Doppler beaming (right side brighter)
    • Photon ring glow above the hole
  - Low-res buffer upscaled for smooth performance and a soft pixel aesthetic.
*/
export default function PixelBlackhole({
  imageUrl, // optional: used to bias ring color
  fps = 28,
  scale = 0.18, // internal buffer scale (lower = cheaper)
  yScale = 0.45, // vertical squash to match viewing angle
  diskRadius = 0.62, // % of min(w,h) for accretion disk radius
  beaming = 0.7, // how much brighter the approaching side is
  beamingPhase = 0, // 0 = right side brightest
  glow = 0.8, // photon ring glow intensity
  disabled = false,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (disabled) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let rafId;
    let hidden = document.visibilityState === "hidden";
    const onVis = () => (hidden = document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVis);

    // Low-res buffer for performance
    const buffer = document.createElement("canvas");
    const bctx = buffer.getContext("2d");
    bctx.imageSmoothingEnabled = false;

    // Optional: sample color from input image (bias toward bright golds)
    let ringRGB = [255, 204, 0]; // fallback gold
    const sampleFromImage = async (src) => {
      if (!src) return;
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.decoding = "async";
        img.loading = "eager";
        img.src = src;
        await img.decode().catch(() => {});
        const s = document.createElement("canvas");
        const sctx = s.getContext("2d");
        s.width = 32;
        s.height = 32;
        sctx.drawImage(img, 0, 0, s.width, s.height);
        const data = sctx.getImageData(0, 0, s.width, s.height).data;

        // Weighted average biased to bright yellows/oranges
        let r = 0,
          g = 0,
          b = 0,
          wsum = 0;
        for (let i = 0; i < data.length; i += 4) {
          const R = data[i],
            G = data[i + 1],
            B = data[i + 2],
            A = data[i + 3] / 255;
          if (A < 0.2) continue;
          const brightness = (R + G + B) / 3;
          // prefer warm hues
          const warm = Math.max(0, R - B) + Math.max(0, R - G);
          const weight = (brightness / 255) ** 2 * (1 + warm / 255);
          r += R * weight;
          g += G * weight;
          b += B * weight;
          wsum += weight;
        }
        if (wsum > 0) {
          r = Math.min(255, Math.max(0, Math.round(r / wsum)));
          g = Math.min(255, Math.max(0, Math.round(g / wsum)));
          b = Math.min(255, Math.max(0, Math.round(b / wsum)));
          ringRGB = [r, g, b];
        }
      } catch {
        // ignore
      }
    };

    // Also allow CSS --accent-rgb to override
    const readAccent = () => {
      try {
        const v = getComputedStyle(document.documentElement)
          .getPropertyValue("--accent-rgb")
          .trim();
        if (v) {
          const parts = v.split(",").map((n) => parseInt(n.trim(), 10));
          if (parts.length === 3 && parts.every((x) => !Number.isNaN(x))) {
            ringRGB = parts;
          }
        }
      } catch {}
    };
    readAccent();
    const onAppearance = () => readAccent();
    window.addEventListener("appearance-change", onAppearance);

    // Init from image (non-blocking)
    sampleFromImage(imageUrl);

    function resize() {
      const w = Math.max(320, Math.floor(window.innerWidth * scale));
      const h = Math.max(180, Math.floor(window.innerHeight * scale));
      buffer.width = w;
      buffer.height = h;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.imageSmoothingEnabled = false;
    }
    resize();
    window.addEventListener("resize", resize);

    // Drawing parameters
    const diskThickness = 0.14; // relative thickness of disk
    const photonRingScale = 1.08;
    const slices = 420; // angular resolution around disk
    const radialSteps = 18; // thickness resolution

    let last = 0;
    const target = 1000 / Math.max(1, fps);

    function draw(time = 0) {
      if (hidden) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      if (time - last < target) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      last = time;

      const w = buffer.width;
      const h = buffer.height;
      bctx.fillStyle = "#000";
      bctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h * 0.62;
      const maxR = Math.min(w, h) * diskRadius;

      // Accretion disk (elliptical due to tilt)
      // Brightness profile with Doppler beaming on approaching side (phase=0 -> right)
      for (let s = 0; s < slices; s++) {
        const ang = (s / slices) * Math.PI * 2;
        // base radius with subtle spiral jitter
        const spiral = Math.sin(time * 0.0007 + ang * 5) * 0.6;
        const baseR = maxR * (1 + spiral * 0.006);
        const beamingBoost =
          0.35 + beaming * 0.65 * (0.5 + 0.5 * Math.cos(ang - beamingPhase)); // 0..~1
        const col = `rgba(${ringRGB[0]},${ringRGB[1]},${ringRGB[2]},`;

        for (let t = 0; t < radialSteps; t++) {
          const frac = (t / (radialSteps - 1)) * 2 - 1; // -1..1 across thickness
          const rr =
            baseR *
            (1 + frac * diskThickness * (0.8 + 0.2 * Math.sin(ang * 2)));
          const x = Math.floor(cx + Math.cos(ang) * rr);
          const y = Math.floor(cy + Math.sin(ang) * rr * yScale);

          // Alpha falloff across thickness + angular beaming
          const edge = Math.exp(-Math.abs(frac) * 2.2);
          const alpha = Math.max(
            0,
            Math.min(1, 0.045 + 0.07 * beamingBoost * edge)
          );

          bctx.fillStyle = `${col}${alpha})`;
          bctx.fillRect(x, y, 2, 2);

          // subtle trailing smear for motion depth
          if (t % 4 === 0) {
            bctx.globalAlpha = Math.min(0.35, alpha * 0.8);
            bctx.fillRect(x - 1, y, 1, 1);
            bctx.globalAlpha = 1;
          }
        }
      }

      // Photon ring glow (gravitational lensing band above)
      const pr = maxR * photonRingScale;
      for (let s = 0; s < slices; s++) {
        const ang = (s / slices) * Math.PI * 2;
        // focus glow more on upper half
        const upper = Math.max(0, Math.sin(ang));
        if (upper < 0.05) continue;
        const x = Math.floor(cx + Math.cos(ang) * pr);
        const y = Math.floor(cy + Math.sin(ang) * pr * (yScale * 0.78));
        const beam = 0.5 + 0.5 * Math.cos(ang - beamingPhase);
        const a = glow * upper * (0.22 + 0.35 * beam);
        bctx.fillStyle = `rgba(${ringRGB[0]},${ringRGB[1]},${ringRGB[2]},${a})`;
        bctx.fillRect(x, y, 2, 2);
      }

      // Event horizon (black ellipse)
      bctx.fillStyle = "#000";
      bctx.beginPath();
      bctx.ellipse(
        cx,
        cy,
        maxR * 0.22,
        maxR * 0.22 * yScale,
        0,
        0,
        Math.PI * 2
      );
      bctx.fill();

      // Vignette to push corners darker
      const grad = bctx.createRadialGradient(
        cx,
        cy,
        maxR * 0.3,
        cx,
        cy,
        maxR * 2
      );
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,0.5)");
      bctx.fillStyle = grad;
      bctx.fillRect(0, 0, w, h);

      // Blit to screen (nearest-neighbor upscale)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height);

      rafId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
      window.removeEventListener("appearance-change", onAppearance);
    };
  }, [
    imageUrl,
    fps,
    scale,
    yScale,
    diskRadius,
    beaming,
    beamingPhase,
    glow,
    disabled,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ imageRendering: "pixelated" }}
      aria-hidden="true"
    />
  );
}
