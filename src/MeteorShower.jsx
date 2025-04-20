import { useRef, useEffect } from 'react';

function MeteorShower() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Star class
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5;
        this.alpha = Math.random() * 0.5 + 0.5;
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
        this.angle = Math.random() > 0.5 ? Math.PI / 4 : (3 * Math.PI) / 4; // Random diagonal
        this.alpha = 1;
        this.active = true;
      }
      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.02;
        if (this.alpha <= 0 || this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
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
    const stars = Array.from({ length: 100 }, () => new Star());
    const meteors = [];
    const addMeteor = () => {
      meteors.push(new Meteor());
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => star.draw());
      meteors.forEach((meteor, index) => {
        if (meteor.active) {
          meteor.update();
          meteor.draw();
        } else {
          meteors.splice(index, 1);
        }
      });
      if (Math.random() < 0.02) addMeteor();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    console.log('Step 5: Multiple random meteors with random start positions');

    return () => {
      cancelAnimationFrame(animationFrameId);
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