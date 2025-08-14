import { useRef, useEffect } from "react";

// Lightweight, adaptive meteor shower. Props allow dialing down work.
function MeteorShower({
  disabled = false,
  density = 1,
  sizeScale = 1,
  fps = 30,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (disabled) {
      // Ensure canvas is sized and cleared, but do no animation work
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      return;
    }

    // Read CSS variable colors
    const getCssVar = (name) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const parseRgb = (rgbStr, fallback) => {
      if (!rgbStr) return fallback;
      const parts = rgbStr.split(",").map((v) => parseFloat(v));
      if (parts.length === 3 && parts.every((n) => Number.isFinite(n)))
        return parts;
      return fallback;
    };
    let starRGB = parseRgb(getCssVar("--star-rgb"), [255, 255, 255]);
    let meteorRGB = parseRgb(getCssVar("--meteor-rgb"), [255, 255, 255]);

    let animationFrameId;

    // Debounce function for resize
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    // Track DPR and size canvas accordingly (keep coordinates in CSS pixels)
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    const resizeCanvas = debounce(() => {
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";
      // Reset transform then scale so 1 unit = 1 CSS pixel
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }, 100);

    // Star class
    class Star {
      constructor() {
        const cssW = canvas.width / dpr;
        const cssH = canvas.height / dpr;
        this.x = Math.random() * cssW;
        this.y = Math.random() * cssH;
        this.radius = (Math.random() * 1.1 + 0.6) * sizeScale; // smaller & cheaper
        this.baseAlpha = 0.5;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.006 + 0.002; // Pulse: 0.002 to 0.008
      }
      update() {
        this.pulsePhase += this.pulseSpeed;
        this.alpha = 0.5 + Math.sin(this.pulsePhase) * 0.3; // Alpha: 0.2 to 0.8
      }
      draw() {
        // Simple fill (no shadows/compositing) for performance
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starRGB[0]}, ${starRGB[1]}, ${starRGB[2]}, ${this.alpha})`;
        ctx.fill();
      }
    }

    // Meteor class
    class Meteor {
      constructor() {
        this.reset();
      }
      reset() {
        const cssW = canvas.width / dpr;
        const cssH = canvas.height / dpr;
        this.x = cssW * 0.2 + Math.random() * (cssW * 0.6);
        this.y = cssH * 0.2 + Math.random() * (cssH * 0.6);
        this.length = Math.random() * 40 + 40; // shorter
        this.speed = Math.random() * 3 + 3.2; // slower
        this.thickness = Math.random() * 0.8 + 1.2; // thinner
        this.angle = Math.random() > 0.5 ? Math.PI / 4 : (3 * Math.PI) / 4;
        this.alpha = 1;
        this.active = true;
      }
      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.018;
        if (
          this.alpha <= 0 ||
          this.y > canvas.height / dpr ||
          this.x < 0 ||
          this.x > canvas.width / dpr
        ) {
          this.active = false;
        }
      }
      draw() {
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        // Tail gradient
        const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        grad.addColorStop(
          0,
          `rgba(${meteorRGB[0]}, ${meteorRGB[1]}, ${meteorRGB[2]}, ${
            0.9 * this.alpha
          })`
        );
        grad.addColorStop(
          0.3,
          `rgba(${meteorRGB[0]}, ${meteorRGB[1]}, ${meteorRGB[2]}, ${
            0.28 * this.alpha
          })`
        );
        grad.addColorStop(
          1,
          `rgba(${meteorRGB[0]}, ${meteorRGB[1]}, ${meteorRGB[2]}, 0)`
        );

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.lineCap = "round";
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.thickness;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Head aura (radial gradient)
        const headRadius = this.thickness * 1.8;
        const radial = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          headRadius
        );
        radial.addColorStop(
          0,
          `rgba(${meteorRGB[0]}, ${meteorRGB[1]}, ${meteorRGB[2]}, ${
            0.6 * this.alpha
          })`
        );
        radial.addColorStop(
          1,
          `rgba(${meteorRGB[0]}, ${meteorRGB[1]}, ${meteorRGB[2]}, 0)`
        );
        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(this.x, this.y, headRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create stars and meteors
    resizeCanvas(); // Set canvas size before creating stars
    const area = (canvas.width / dpr) * (canvas.height / dpr);
    const baseStars = Math.min(
      120,
      Math.max(20, Math.round(Math.sqrt(area) / 28))
    );
    const stars = Array.from(
      {
        length: Math.max(8, Math.round((baseStars * density) / Math.sqrt(dpr))),
      },
      () => new Star()
    );
    const meteors = [];
    const isSmall = Math.min(canvas.width / dpr, canvas.height / dpr) < 720;
    const maxMeteors = Math.max(1, Math.round((isSmall ? 2 : 4) * density));
    const addMeteor = () => {
      if (meteors.length < maxMeteors) {
        meteors.push(new Meteor());
      }
    };

    // Optional: debug a couple of stars
    // stars.slice(0, 2).forEach((s, i) => console.log("Star", i, s.x, s.y));

    // Reposition stars when size changes
    const repositionStars = () => {
      const cssW = canvas.width / dpr;
      const cssH = canvas.height / dpr;
      for (const star of stars) {
        star.x = Math.random() * cssW;
        star.y = Math.random() * cssH;
      }
    };
    repositionStars();

    // Animation loop (FPS throttled)
    let lastTime = 0;
    const targetMs = Math.max(16, 1000 / Math.max(1, fps));
    let hidden = document.visibilityState === "hidden";
    const onVisibility = () => {
      hidden = document.visibilityState === "hidden";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const animate = (time = 0) => {
      if (hidden) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      if (time - lastTime < targetMs) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;
      // Clear the canvas using CSS pixel coords (context is scaled to DPR)
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      stars.forEach((star) => {
        star.update();
        star.draw();
      });
      meteors.forEach((meteor, index) => {
        if (meteor.active) {
          meteor.update();
          meteor.draw();
        } else {
          meteors.splice(index, 1);
        }
      });
      if (Math.random() < 0.012) addMeteor();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    const onResize = () => {
      resizeCanvas();
      repositionStars();
    };
    window.addEventListener("resize", onResize);

    // Listen for app-driven appearance changes instead of polling
    const onAppearance = () => {
      starRGB = parseRgb(getCssVar("--star-rgb"), starRGB);
      meteorRGB = parseRgb(getCssVar("--meteor-rgb"), meteorRGB);
    };
    window.addEventListener("appearance-change", onAppearance);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("appearance-change", onAppearance);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [disabled, density, sizeScale, fps]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-transparent"
    />
  );
}

export default MeteorShower;
