
import React, { useEffect, useRef } from 'react';

interface GlobalBackgroundProps {
  isDarkMode?: boolean;
}

const GlobalBackground: React.FC<GlobalBackgroundProps> = ({ isDarkMode = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let orbs: Orb[] = [];
    const mouse = { x: -1000, y: -1000, radius: 250 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    // "Magic Dust" - Small twinkling particles
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 0.5;
        this.density = (Math.random() * 30) + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = isDarkMode ? '6, 182, 212' : '37, 99, 235';
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouse.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx / 20;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy / 20;
          }
        }
        
        // Subtle twinkle
        this.opacity += (Math.random() - 0.5) * 0.01;
        if (this.opacity < 0.1) this.opacity = 0.1;
        if (this.opacity > 0.6) this.opacity = 0.6;
      }
    }

    // Large Floating Glass Orbs for Mesh Gradient effect
    class Orb {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;

      constructor(color: string) {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.radius = Math.random() * 300 + 200;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.color = color;
      }

      draw() {
        if (!ctx) return;
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.globalCompositeOperation = isDarkMode ? 'screen' : 'multiply';
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.radius) this.x = canvas!.width + this.radius;
        if (this.x > canvas!.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas!.height + this.radius;
        if (this.y > canvas!.height + this.radius) this.y = -this.radius;
      }
    }

    const init = () => {
      particles = [];
      orbs = [];
      const numberOfParticles = Math.min(Math.floor((canvas!.width * canvas!.height) / 8000), 250);
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }

      // 3 Main Orbs for the Mesh effect
      if (isDarkMode) {
        orbs.push(new Orb('rgba(30, 58, 138, 0.3)'));  // Deep Blue
        orbs.push(new Orb('rgba(88, 28, 135, 0.2)'));  // Deep Purple
        orbs.push(new Orb('rgba(15, 118, 110, 0.15)')); // Teal
      } else {
        orbs.push(new Orb('rgba(219, 234, 254, 0.4)')); // Light Blue
        orbs.push(new Orb('rgba(243, 232, 255, 0.4)')); // Light Purple
        orbs.push(new Orb('rgba(236, 254, 255, 0.4)')); // Light Cyan
      }
    };

    const animate = () => {
      // Draw background base color
      ctx.fillStyle = isDarkMode ? '#020617' : '#f8fafc';
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);

      // Draw decorative grid
      drawGrid();

      // Update and draw Orbs
      for (let orb of orbs) {
        orb.update();
        orb.draw();
      }

      // Update and draw Particles
      for (let particle of particles) {
        particle.update();
        particle.draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const drawGrid = () => {
      const step = 60;
      ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      for (let x = 0; x <= canvas!.width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas!.height);
      }
      for (let y = 0; y <= canvas!.height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas!.width, y);
      }
      ctx.stroke();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none transition-all duration-1000 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full" 
      />
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
      {/* Vignette effect */}
      <div className={`absolute inset-0 pointer-events-none ${isDarkMode ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.4)_100%)]' : 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,0.3)_100%)]'}`}></div>
    </div>
  );
};

export default GlobalBackground;
