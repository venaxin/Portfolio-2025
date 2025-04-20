import { useRef, useEffect } from "react";

function MeteorShower() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Debounce function for resize
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    // Set canvas size and reposition stars
    const resizeCanvas = debounce(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars.forEach((star) => {
        star.x = Math.random() * canvas.width;
        star.y = Math.random() * canvas.height;
      });
      console.log("Canvas resized to:", canvas.width, canvas.height);
    }, 100);

    // Star class
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1.5; // Stars: 1.5 to 3.5
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
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
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
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Create stars and meteors
    resizeCanvas(); // Set canvas size before creating stars
    const stars = Array.from({ length: 60 }, () => new Star());
    const meteors = [];
    const maxMeteors = 5;
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

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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

    console.log("Step 8: Fixed star distribution with optimization");

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}

export default MeteorShower;
