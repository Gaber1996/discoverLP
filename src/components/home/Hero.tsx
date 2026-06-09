import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

function AnimatedRating() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(1));

  useEffect(() => {
    const controls = animate(count, 5.0, {
      duration: 1.5,
      delay: 1.2,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [count]);

  return <motion.span>{rounded}</motion.span>;
}

const headlineWords = 'Your technology partner from idea to scale.'.split(' ');

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const PARTICLE_COUNT = 50;
    const CONNECTION_DIST_SQ = 120 * 120;

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      speedZ: number;
    }> = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        speedZ: Math.random() * 2 + 1,
      });
    }

    // Pre-compute 2D projected positions each frame
    const projected = new Float64Array(PARTICLE_COUNT * 3); // x, y, opacity

    let rafId: number;

    function draw() {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      const hw = w / 2;
      const hh = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Update positions & project to 2D
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.z -= p.speedZ;

        if (p.z <= 0) {
          p.z = 1000;
          p.x = Math.random() * w;
          p.y = Math.random() * h;
        }

        const scale = 1000 / (1000 + p.z);
        const idx = i * 3;
        projected[idx] = (p.x - hw) * scale + hw;
        projected[idx + 1] = (p.y - hh) * scale + hh;
        projected[idx + 2] = (1 - p.z / 1000) * scale;
      }

      // Draw connection lines — single batched path
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.08)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = pi.x - particles[j].x;
          const dy = pi.y - particles[j].y;
          if (dx * dx + dy * dy < CONNECTION_DIST_SQ) {
            const iIdx = i * 3;
            const jIdx = j * 3;
            ctx.moveTo(projected[iIdx], projected[iIdx + 1]);
            ctx.lineTo(projected[jIdx], projected[jIdx + 1]);
          }
        }
      }
      ctx.stroke();

      // Draw particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        const scale = 1000 / (1000 + p.z);
        const idx = i * 3;
        const opacity = projected[idx + 2];

        ctx.fillStyle = `rgba(147, 197, 253, ${opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(projected[idx], projected[idx + 1], p.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="hero" className="relative h-screen md:max-h-[800px] lg:max-h-[900px] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 py-3 relative z-10">
        <div className="text-center max-w-4xl mx-auto">

          <motion.h1
            className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-[1.1] flex flex-wrap justify-center gap-x-[0.3em]"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08 }}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  background: 'linear-gradient(to right, #ffffff, #93c5fd, #67e8f9)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-lg md:text-lg lg:text-xl font-light mb-3 md:mb-4 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            We think product-first, then build with precision.
          </motion.p>

          <motion.p
            className="text-sm sm:text-sm md:text-sm lg:text-base text-slate-300 mb-5 md:mb-6 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            From strategy to deployment, we help startups and enterprises build world-class software with global engineering teams.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Link
              to="/build"
              className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 sm:px-6 sm:py-2.5 rounded-2xl sm:rounded-xl font-semibold text-base sm:text-sm hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-1 overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10">Build With Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <a
              href="#two-paths"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#two-paths')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group border-2 border-blue-400/50 text-white px-8 py-4 sm:px-6 sm:py-2.5 rounded-2xl sm:rounded-xl font-semibold text-base sm:text-sm hover:bg-blue-500/10 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm shadow-xl w-full sm:w-auto text-center"
            >
              Scale Your Team
            </a>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-syntax-green animate-pulse" />
                <AnimatedRating /> on Clutch
              </span>
              <span className="text-slate-600">·</span>
              <span>U.S. Registered</span>
              <span className="text-slate-600">·</span>
              <span>Teams in Egypt, Ukraine &amp; Romania</span>
              <span className="text-slate-600 hidden sm:inline">·</span>
              <span className="hidden sm:inline">Clients in 10+ Countries</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">

      </div>
    </section>
  );
}
