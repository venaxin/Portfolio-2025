import { useRef, useEffect } from "react";

function MeteorShower() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

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

    // Responsive, lightweight density controls via data-attrs
    const density = parseFloat(canvas.dataset.density || "1"); // 1 = default
    const sizeScale = parseFloat(canvas.dataset.sizeScale || "1");
    let animationFrameId;

    // Debounce function for resize
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    // Set canvas size (we will reposition stars after instantiation)
    const resizeCanvas = debounce(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log("Canvas resized to:", canvas.width, canvas.height);
    }, 100);

    // Star class
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = (Math.random() * 2 + 1.5) * sizeScale; // scaled
        this.baseAlpha = 0.5;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.006 + 0.002; // Pulse: 0.002 to 0.008
      }
      update() {
        this.pulsePhase += this.pulseSpeed;
        this.alpha = 0.5 + Math.sin(this.pulsePhase) * 0.3; // Alpha: 0.2 to 0.8
      }
      draw() {
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
        this.x = canvas.width * 0.2 + Math.random() * (canvas.width * 0.6);
        this.y = canvas.height * 0.2 + Math.random() * (canvas.height * 0.6);
        this.length = Math.random() * 50 + 50;
        this.speed = Math.random() * 5 + 5;
        this.angle = Math.random() > 0.5 ? Math.PI / 4 : (3 * Math.PI) / 4;
        this.alpha = 1;
        this.active = true;
      }
      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.02;
        if (
          this.alpha <= 0 ||
          this.y > canvas.height ||
          this.x < 0 ||
          this.x > canvas.width
        ) {
          this.active = false;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.strokeStyle = `rgba(${meteorRGB[0]}, ${meteorRGB[1]}, ${meteorRGB[2]}, ${this.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Create stars and meteors
    resizeCanvas(); // Set canvas size before creating stars
    const baseStars = 60;
    const stars = Array.from(
      { length: Math.max(10, Math.round(baseStars * density)) },
      () => new Star()
    );
    const meteors = [];
    const maxMeteors = Math.max(1, Math.round(5 * density));
    const addMeteor = () => {
      if (meteors.length < maxMeteors) {
        meteors.push(new Meteor());
        console.log("Meteor added, count:", meteors.length);
      }
    };

    // Log a few star positions for debugging (remove after testing)
    stars.slice(0, 3).forEach((star, i) => {
      console.log(`Star ${i}: x=${star.x.toFixed(0)}, y=${star.y.toFixed(0)}`);
    });

    // Reposition stars when size changes
    const repositionStars = () => {
      for (const star of stars) {
        star.x = Math.random() * canvas.width;
        star.y = Math.random() * canvas.height;
      }
    };
    repositionStars();

    // Animation loop
    const animate = () => {
      // Clear the canvas to keep background (gradient sky) visible
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      if (Math.random() < 0.015) addMeteor();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("resize", () => {
      resizeCanvas();
      repositionStars();
    });

    // Poll CSS variables to update colors if theme changes while running
    const colorPoll = setInterval(() => {
      const getCssVar = (name) =>
        getComputedStyle(document.documentElement)
          .getPropertyValue(name)
          .trim();
      const parseRgb = (rgbStr, fallback) => {
        if (!rgbStr) return fallback;
        const parts = rgbStr.split(",").map((v) => parseFloat(v));
        if (parts.length === 3 && parts.every((n) => Number.isFinite(n)))
          return parts;
        return fallback;
      };
      starRGB = parseRgb(getCssVar("--star-rgb"), starRGB);
      meteorRGB = parseRgb(getCssVar("--meteor-rgb"), meteorRGB);
    }, 400);

    console.log("MeteorShower initialized with theme-aware colors");

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(colorPoll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-transparent"
      data-density="1" /* can be lowered on mobile for performance */
      data-size-scale="1"
    />
  );
}

export default MeteorShower;
