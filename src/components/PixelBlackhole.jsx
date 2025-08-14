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
  beamingGamma = 1.4, // gamma shaping for beaming falloff (>=1)
  glow = 0.8, // photon ring glow intensity
  lensing = 0.28, // vertical lift strength for back/underside halos
  backGlow = 0.8, // intensity multiplier for upper (back) halo
  underGlow = 0.35, // intensity multiplier for underside halo
  innerHot = 0.35, // how much to bias inner radius color toward white
  highDetail = true, // set true for smoother look ("64-bit" non-pixelated)
  pixelSize = 1, // 1 for crisp detail, 2 for chunkier pixels
  targetDisplaySize, // optional: desired diameter in display px (e.g., 500)
  // Radial color palette (outer->mid->inner) when enabled
  useRadialPalette = false,
  paletteOuter = [255, 180, 0],
  paletteMid = [255, 210, 80],
  paletteInner = [255, 245, 220],
  // Photon ring thickness
  photonRingPasses = 1, // >1 renders thicker band
  // Flow and flicker
  inflowRate = 0.0, // inward drift (px per second in buffer units)
  flickerAmp = 0.0, // 0..~0.2
  // Moderate HQ controls
  turbSize = 256, // turbulence texture resolution
  sliceMul = 1.0, // multiply angular slices for smoother arcs
  stepAdd = 0, // add radial steps to thicken disk sampling
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
    const TURB_SIZE = Math.max(128, Math.floor(turbSize)); // small, sampled repeatedly
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
    const slices = Math.max(
      60,
      Math.floor(
        (highDetail ? baseSlices : Math.floor(baseSlices * 0.85)) *
          Math.max(0.5, sliceMul)
      )
    );
    const radialSteps = Math.max(
      8,
      (highDetail ? 20 : 16) + Math.max(0, Math.floor(stepAdd))
    );

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

      // Animated flow + hotspots
      const azimuthDrift = 0.00055; // rotation speed
      const spiralJitter = 0.006;
      const hotAng1 = time * 0.00042 + 0.8;
      const hotAng2 = time * -0.00035 + 3.2;

      const drawArc = (front) => {
        for (let s = 0; s < slices; s++) {
          const ang = (s / slices) * Math.PI * 2;
          const sy = Math.sin(ang);
          const isFront = sy < 0; // near side is lower half
          if (isFront !== front) continue;

          // base radius with subtle spiral jitter
          const spiral = Math.sin(time * 0.0007 + ang * 5) * 0.6;
          const baseR = maxR * (1 + spiral * spiralJitter);
          // Gamma-shaped beaming so the approaching side is tighter/brighter
          const cosTerm = Math.max(0, Math.cos(ang - beamingPhase));
          const shaped = Math.pow(cosTerm, Math.max(1, beamingGamma));
          const beamingBoost = 0.25 + beaming * 0.9 * shaped;

          for (let t = 0; t < radialSteps; t++) {
            const frac = (t / (radialSteps - 1)) * 2 - 1; // -1..1 across thickness
            let rr =
              baseR *
              (1 + frac * diskThickness * (0.8 + 0.2 * Math.sin(ang * 2)));
            // Inflow drift (spiral inward over time)
            if (inflowRate > 0) {
              rr = Math.max(horizonR * 1.01, rr - inflowRate * (time * 0.001));
            }
            const sx = Math.cos(ang);

            // Inner hotness factor (near horizon gets whiter)
            const inner = Math.max(0, 1 - (rr - horizonR) / (maxR * 0.25));

            // Hot spots (orbiting bright patches)
            const wrap = (v) =>
              ((v % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
            const d1 = Math.abs(wrap(ang - hotAng1));
            const d2 = Math.abs(wrap(ang - hotAng2));
            const hotSpot = Math.max(Math.exp(-d1 * 2.5), Math.exp(-d2 * 2.2));

            // Bias toward white with inner heat + beaming + hot spots
            const whiten = Math.max(
              0,
              Math.min(
                1,
                inner * innerHot * (0.65 + 0.35 * beamingBoost) + hotSpot * 0.35
              )
            );
            // Base color from palette or accent ring color (avoid name clash with radius baseR)
            let colBaseR = ringRGB[0],
              colBaseG = ringRGB[1],
              colBaseB = ringRGB[2];
            if (useRadialPalette) {
              // t: 0 outer edge .. 1 near horizon
              const t = Math.max(
                0,
                Math.min(1, 1 - (rr - horizonR) / Math.max(1, maxR - horizonR))
              );
              const split = 0.6;
              if (t < split) {
                const u = t / split;
                colBaseR = Math.round(
                  paletteOuter[0] * (1 - u) + paletteMid[0] * u
                );
                colBaseG = Math.round(
                  paletteOuter[1] * (1 - u) + paletteMid[1] * u
                );
                colBaseB = Math.round(
                  paletteOuter[2] * (1 - u) + paletteMid[2] * u
                );
              } else {
                const u = (t - split) / (1 - split);
                colBaseR = Math.round(
                  paletteMid[0] * (1 - u) + paletteInner[0] * u
                );
                colBaseG = Math.round(
                  paletteMid[1] * (1 - u) + paletteInner[1] * u
                );
                colBaseB = Math.round(
                  paletteMid[2] * (1 - u) + paletteInner[2] * u
                );
              }
            } else {
              // Slight brightness boost toward vivid accent
              colBaseR = Math.min(255, Math.round(colBaseR * 1.12));
              colBaseG = Math.min(255, Math.round(colBaseG * 1.12));
              colBaseB = Math.min(255, Math.round(colBaseB * 1.12));
            }
            const colR = Math.round(colBaseR * (1 - whiten) + 255 * whiten);
            const colG = Math.round(colBaseG * (1 - whiten) + 255 * whiten);
            const colB = Math.round(colBaseB * (1 - whiten) + 255 * whiten);

            // Base ellipse position
            const x0 = cx + sx * rr;
            const y0 = cy + sy * rr * yScale;

            // Sample turbulence along flow direction to create filaments
            // Map ring coords into [0,1] turb space; shear by angle for orbital streaks
            const uN =
              ang / (Math.PI * 2) + time * azimuthDrift + rr / (maxR * 4);
            const vN = rr / (maxR * 1.5) + Math.sin(ang * 3) * 0.03;
            let turbVal = sampleTurb(uN, vN);
            // Sharpen filaments: favor extremes
            turbVal = Math.pow(turbVal, 1.35);

            // Simple lensing: lift upper (back) halo upward; subtle underside lift
            const denom = Math.max(6, Math.abs(rr - horizonR * 1.02));
            const lens = (lensing * (horizonR * horizonR)) / denom;

            if (front) {
              // FRONT (underside), mostly lower half
              const edge = Math.exp(-Math.abs(frac) * 2.2);
              let alphaFront =
                (0.035 + 0.07 * beamingBoost * edge) *
                (0.75 + 0.6 * turbVal) *
                underGlow;
              if (flickerAmp > 0) {
                const flick = Math.sin(time * 0.006 + ang * 5 + frac * 3);
                alphaFront *=
                  1 + flickerAmp * (0.5 * flick + 0.5 * (turbVal - 0.5));
              }
              const yF = y0 + (sy < 0 ? lens * 0.35 : 0);
              bctx.fillStyle = `rgba(${colR},${colG},${colB},${alphaFront})`;
              const xi = Math.floor(x0);
              const yi = Math.floor(yF);
              bctx.fillRect(xi, yi, pixelSize, pixelSize);
              if (t % 4 === 0) {
                bctx.globalAlpha = Math.min(0.3, alphaFront * 0.8);
                bctx.fillRect(xi - 1, yi, 1, 1);
                bctx.globalAlpha = 1;
              }
            } else {
              // BACK (upper halo)
              const edgeB = Math.exp(-Math.abs(frac) * 2.2);
              let alphaBack =
                (0.028 + 0.06 * beamingBoost * edgeB) *
                (0.75 + 0.6 * turbVal) *
                backGlow;
              if (flickerAmp > 0) {
                const flick = Math.sin(time * 0.005 + ang * 4 + frac * 2);
                alphaBack *=
                  1 + flickerAmp * (0.5 * flick + 0.5 * (turbVal - 0.5));
              }
              const yB = y0 - lens; // lift upward over the hole
              const xi2 = Math.floor(x0);
              const yi2 = Math.floor(yB * 0.98 + cy * 0.02);
              bctx.fillStyle = `rgba(${colR},${colG},${colB},${alphaBack})`;
              bctx.fillRect(xi2, yi2, pixelSize, pixelSize);
            }
          }
        }
      };

      // 1) BACK halo first (upper half, behind horizon)
      drawArc(false);

      // 2) Event horizon (occludes back, sits behind front arc)
      bctx.fillStyle = "#000";
      bctx.beginPath();
      bctx.ellipse(cx, cy, horizonR, horizonR * yScale, 0, 0, Math.PI * 2);
      bctx.fill();

      // 3) FRONT underside (near side, on top of horizon)
      drawArc(true);

      // 4) Photon ring glow (gravitational lensing band above and below) on top
      const pr = maxR * photonRingScale;
      const rR = Math.min(255, Math.round(ringRGB[0] * 1.12));
      const rG = Math.min(255, Math.round(ringRGB[1] * 1.12));
      const rB = Math.min(255, Math.round(ringRGB[2] * 1.12));
      const passes = Math.max(1, Math.floor(photonRingPasses));
      const step = Math.max(1, Math.round(pixelSize));
      for (let s = 0; s < slices; s++) {
        const ang = (s / slices) * Math.PI * 2;
        const sY = Math.sin(ang);
        const beamShape = Math.pow(
          Math.max(0, Math.cos(ang - beamingPhase)),
          Math.max(1, beamingGamma)
        );
        for (
          let k = -Math.floor(passes / 2);
          k <= Math.floor(passes / 2);
          k++
        ) {
          const off = k * step;
          const x = Math.floor(cx + Math.cos(ang) * (pr + off));
          const yTop = Math.floor(
            cy + sY * (pr + off) * (yScale * 0.78) - (sY > 0 ? lensing * 12 : 0)
          );
          const yBot = Math.floor(
            cy + sY * (pr + off) * (yScale * 0.62) + (sY < 0 ? lensing * 6 : 0)
          );
          const aTop =
            glow *
            Math.max(0, sY) *
            (0.2 + 0.55 * beamShape) *
            (1 - Math.abs(k) / passes);
          const aBot =
            glow *
            Math.max(0, -sY) *
            0.16 *
            (0.16 + 0.35 * beamShape) *
            (1 - Math.abs(k) / passes);
          if (aTop > 0.01) {
            bctx.fillStyle = `rgba(${rR},${rG},${rB},${aTop})`;
            bctx.fillRect(x, yTop, pixelSize, pixelSize);
          }
          if (aBot > 0.01) {
            bctx.fillStyle = `rgba(${rR},${rG},${rB},${aBot})`;
            bctx.fillRect(x, yBot, pixelSize, pixelSize);
          }
        }
      }

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
    beamingGamma,
    glow,
    lensing,
    backGlow,
    underGlow,
    innerHot,
    highDetail,
    pixelSize,
    targetDisplaySize,
    useRadialPalette,
    paletteOuter,
    paletteMid,
    paletteInner,
    photonRingPasses,
    inflowRate,
    flickerAmp,
    turbSize,
    sliceMul,
    stepAdd,
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
