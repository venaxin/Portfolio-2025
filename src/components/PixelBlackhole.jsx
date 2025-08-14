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
  lensing = 0.28, // vertical lift strength for back/underside halos
  backGlow = 0.8, // intensity multiplier for upper (back) halo
  underGlow = 0.35, // intensity multiplier for underside halo
  innerHot = 0.35, // how much to bias inner radius color toward white
  highDetail = true, // set true for smoother look ("64-bit" non-pixelated)
  pixelSize = 1, // 1 for crisp detail, 2 for chunkier pixels
  targetDisplaySize, // optional: desired diameter in display px (e.g., 500)
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

    // Precomputed turbulence field for filamentary disk (fBm value noise)
    const turb = document.createElement("canvas");
    const turbCtx = turb.getContext("2d");
    const TURB_SIZE = 256; // small, sampled repeatedly
    turb.width = TURB_SIZE;
    turb.height = TURB_SIZE;

    // Simple hash-based value noise
    const seed = 1337 >>> 0;
    const rnd = (x, y) => {
      // 32-bit hash using imul to avoid precision issues
      let h = (x | 0) ^ ((y | 0) << 16) ^ seed;
      h = Math.imul(h ^ (h >>> 15), 2246822519);
      h = Math.imul(h ^ (h >>> 13), 3266489917);
      h ^= h >>> 16;
      return (h >>> 0) / 4294967295; // 0..1
    };
    const smooth = (t) => t * t * (3 - 2 * t);
    const valueNoise2D = (x, y) => {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
      const v00 = rnd(xi, yi);
      const v10 = rnd(xi + 1, yi);
      const v01 = rnd(xi, yi + 1);
      const v11 = rnd(xi + 1, yi + 1);
      const u = smooth(xf);
      const v = smooth(yf);
      const a = v00 * (1 - u) + v10 * u;
      const b = v01 * (1 - u) + v11 * u;
      return a * (1 - v) + b * v; // 0..1
    };
    const fbm2D = (x, y) => {
      let sum = 0;
      let amp = 1;
      let freq = 1;
      let norm = 0;
      for (let o = 0; o < 4; o++) {
        sum += valueNoise2D(x * freq, y * freq) * amp;
        norm += amp;
        amp *= 0.55;
        freq *= 2.1;
      }
      return sum / norm; // 0..1
    };
    function buildTurbulence() {
      const img = turbCtx.createImageData(TURB_SIZE, TURB_SIZE);
      const d = img.data;
      for (let y = 0; y < TURB_SIZE; y++) {
        for (let x = 0; x < TURB_SIZE; x++) {
          const nx = x / TURB_SIZE;
          const ny = y / TURB_SIZE;
          // Filamentary feel: add directional bias along x
          const n = fbm2D(nx * 6.0, ny * 3.5 + Math.sin(nx * Math.PI) * 0.15);
          const v = Math.pow(n, 1.6); // increase contrast
          const idx = (y * TURB_SIZE + x) * 4;
          const g = Math.floor(v * 255);
          d[idx] = g;
          d[idx + 1] = g;
          d[idx + 2] = g;
          d[idx + 3] = 255;
        }
      }
      turbCtx.putImageData(img, 0, 0);
    }
    buildTurbulence();
    const turbData = () =>
      turbCtx.getImageData(0, 0, TURB_SIZE, TURB_SIZE).data;
    const tData = turbData();
    const sampleTurb = (u, v) => {
      // u,v expected in 0..1, wrap
      const x = (((u % 1) + 1) % 1) * (TURB_SIZE - 1);
      const y = (((v % 1) + 1) % 1) * (TURB_SIZE - 1);
      const xi = x | 0;
      const yi = y | 0;
      const idx = (yi * TURB_SIZE + xi) * 4;
      return tData[idx] / 255; // 0..1
    };

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
      } catch {
        // ignore read errors
      }
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
      ctx.imageSmoothingEnabled = highDetail;
    }
    resize();
    window.addEventListener("resize", resize);

    // Drawing parameters
    const diskThickness = 0.14; // relative thickness of disk
    const photonRingScale = 1.08;
    const baseSlices = 420;
    const slices = highDetail ? baseSlices : Math.floor(baseSlices * 0.85);
    const radialSteps = highDetail ? 20 : 16; // thickness resolution

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
      const cy = h * 0.5; // center vertically for requested layout
      // Compute base radius in buffer units; if targetDisplaySize is provided, map display pixels to buffer coords
      const minDim = Math.min(w, h);
      let maxR;
      if (targetDisplaySize && canvas.width > 0 && canvas.height > 0) {
        const sx = canvas.width / w; // display px per buffer px (x)
        const desiredR = (targetDisplaySize * 0.5) / sx;
        // Clamp to avoid exceeding buffer; keep some headroom
        maxR = Math.min(minDim * 0.9, desiredR);
      } else {
        maxR = minDim * diskRadius;
      }
      const horizonR = maxR * 0.22;

      // Accretion disk with simple gravitational lensing approximation
      // Draw both front (underside) and back (upper) halos with beaming
      for (let s = 0; s < slices; s++) {
        const ang = (s / slices) * Math.PI * 2;
        // base radius with subtle spiral jitter
        const spiral = Math.sin(time * 0.0007 + ang * 5) * 0.6;
        const baseR = maxR * (1 + spiral * 0.006);
        const beamingBoost =
          0.35 + beaming * 0.65 * (0.5 + 0.5 * Math.cos(ang - beamingPhase)); // 0..~1
        // approaching side hotter -> bias toward white
        const hot = 0.2 + 0.8 * beamingBoost;

        for (let t = 0; t < radialSteps; t++) {
          const frac = (t / (radialSteps - 1)) * 2 - 1; // -1..1 across thickness
          const rr =
            baseR *
            (1 + frac * diskThickness * (0.8 + 0.2 * Math.sin(ang * 2)));
          const sx = Math.cos(ang);
          const sy = Math.sin(ang);

          // Inner hotness factor (near horizon gets whiter)
          const inner = Math.max(0, 1 - (rr - horizonR) / (maxR * 0.25));
          const whiten = Math.max(0, Math.min(1, inner * innerHot * hot));
          const colR = Math.round(ringRGB[0] * (1 - whiten) + 255 * whiten);
          const colG = Math.round(ringRGB[1] * (1 - whiten) + 255 * whiten);
          const colB = Math.round(ringRGB[2] * (1 - whiten) + 255 * whiten);

          // Base ellipse position
          const x0 = cx + sx * rr;
          const y0 = cy + sy * rr * yScale;

          // Sample turbulence along flow direction to create filaments
          // Map ring coords into [0,1] turb space; shear by angle for orbital streaks
          const uN = ang / (Math.PI * 2) + time * 0.00004 + rr / (maxR * 4);
          const vN = rr / (maxR * 1.5) + Math.sin(ang * 3) * 0.03;
          let turbVal = sampleTurb(uN, vN);
          // Sharpen filaments: favor extremes
          turbVal = Math.pow(turbVal, 1.35);

          // Simple lensing: lift upper (back) halo upward; subtle underside lift
          const denom = Math.max(6, Math.abs(rr - horizonR * 1.02));
          const lens = (lensing * (horizonR * horizonR)) / denom;

          // FRONT (underside), mostly lower half (sy < 0)
          if (sy < 0.05) {
            const edge = Math.exp(-Math.abs(frac) * 2.2);
            let alphaFront = Math.max(
              0,
              Math.min(1, 0.03 + 0.06 * beamingBoost * edge)
            );
            // Modulate by turbulence for filamentary plasma
            alphaFront *= 0.7 + 0.6 * (turbVal - 0.4);
            const yF = y0 + (sy < 0 ? lens * underGlow * 0.4 : 0);
            bctx.fillStyle = `rgba(${colR},${colG},${colB},${alphaFront})`;
            const xi = Math.floor(x0);
            const yi = Math.floor(yF);
            bctx.fillRect(xi, yi, pixelSize, pixelSize);
            if (t % 4 === 0) {
              bctx.globalAlpha = Math.min(0.3, alphaFront * 0.8);
              bctx.fillRect(xi - 1, yi, 1, 1);
              bctx.globalAlpha = 1;
            }
          }

          // BACK (upper halo), sy >= 0
          if (sy > -0.95) {
            const edgeB = Math.exp(-Math.abs(frac) * 2.2);
            let boost = (0.028 + 0.06 * beamingBoost * edgeB) * backGlow;
            boost *= 0.75 + 0.6 * turbVal;
            const yB = y0 - lens; // lift upward over the hole
            const xi2 = Math.floor(x0);
            const yi2 = Math.floor(yB * 0.98 + cy * 0.02);
            bctx.fillStyle = `rgba(${colR},${colG},${colB},${boost})`;
            bctx.fillRect(xi2, yi2, pixelSize, pixelSize);
          }
        }
      }

      // Photon ring glow (gravitational lensing band above and below)
      const pr = maxR * photonRingScale;
      for (let s = 0; s < slices; s++) {
        const ang = (s / slices) * Math.PI * 2;
        const sY = Math.sin(ang);
        const x = Math.floor(cx + Math.cos(ang) * pr);
        const yTop = Math.floor(
          cy + sY * pr * (yScale * 0.78) - (sY > 0 ? lensing * 12 : 0)
        );
        const yBot = Math.floor(
          cy + sY * pr * (yScale * 0.62) + (sY < 0 ? lensing * 6 : 0)
        );
        const beam = 0.5 + 0.5 * Math.cos(ang - beamingPhase);
        const aTop = glow * Math.max(0, sY) * (0.22 + 0.35 * beam);
        const aBot = glow * Math.max(0, -sY) * 0.18 * (0.18 + 0.25 * beam);
        bctx.fillStyle = `rgba(${ringRGB[0]},${ringRGB[1]},${ringRGB[2]},${aTop})`;
        if (aTop > 0.01) bctx.fillRect(x, yTop, pixelSize, pixelSize);
        bctx.fillStyle = `rgba(${ringRGB[0]},${ringRGB[1]},${ringRGB[2]},${aBot})`;
        if (aBot > 0.01) bctx.fillRect(x, yBot, pixelSize, pixelSize);
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
    lensing,
    backGlow,
    underGlow,
    innerHot,
    highDetail,
    pixelSize,
    targetDisplaySize,
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
