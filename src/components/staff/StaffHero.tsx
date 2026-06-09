import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import Button from '../shared/Button';

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

const stacks = ['React', 'Node.js', 'Python', 'TypeScript', '.NET', 'Java'];
const regions = ['Egypt', 'Ukraine', 'Romania'];
const levels = ['Senior', 'Mid-Level', 'Lead', 'Staff'];

function useTypingCycle(items: string[], typingSpeed = 80, pauseDuration = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [itemIndex, setItemIndex] = useState(0);

  useEffect(() => {
    const currentWord = items[itemIndex];
    let charIndex = 0;
    let phase: 'typing' | 'pausing' | 'deleting' = 'typing';
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      if (phase === 'typing') {
        charIndex++;
        setDisplayed(currentWord.slice(0, charIndex));
        if (charIndex === currentWord.length) {
          phase = 'pausing';
          timeout = setTimeout(tick, pauseDuration);
        } else {
          timeout = setTimeout(tick, typingSpeed);
        }
      } else if (phase === 'pausing') {
        phase = 'deleting';
        timeout = setTimeout(tick, typingSpeed / 2);
      } else {
        charIndex--;
        setDisplayed(currentWord.slice(0, charIndex));
        if (charIndex === 0) {
          setItemIndex((prev) => (prev + 1) % items.length);
        } else {
          timeout = setTimeout(tick, typingSpeed / 2);
        }
      }
    }

    timeout = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timeout);
  }, [itemIndex, items, typingSpeed, pauseDuration]);

  return displayed;
}

function useCrossfadeCycle(items: string[], interval = 3000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(id);
  }, [items, interval]);

  return items[index];
}

function SearchPill({ label, value, typing }: { label: string; value: string; typing?: boolean }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <span className="text-slate-400 text-xs font-mono">{label}:</span>
      <span className="text-slate-800 text-sm font-mono">
        {value}
        {typing && (
          <span
            className="inline-block w-[2px] h-3.5 bg-blue-500/80 ml-0.5 align-middle"
            style={{ animation: 'blink-cursor 1s step-end infinite' }}
          />
        )}
      </span>
    </div>
  );
}

export default function StaffHero() {
  const reduced = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const fadeRaw = useTransform(scrollYProgress, [0.4, 0.85], [1, 0]);
  const yRaw = useTransform(scrollYProgress, [0.4, 0.85], [0, -120]);
  const opacity = useSpring(fadeRaw, springConfig);
  const y = useSpring(yRaw, springConfig);

  const typedStack = useTypingCycle(stacks);
  const currentRegion = useCrossfadeCycle(regions, 2800);
  const currentLevel = useCrossfadeCycle(levels, 3200);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#F8FAFC]"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)',
        }}
      />

      {/* Bottom fade into content */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]"
        style={{
          background: 'linear-gradient(to bottom, transparent, #F8FAFC)',
        }}
      />

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20"
        style={reduced ? undefined : { opacity, y }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.span
            className="text-xs font-mono text-blue-500 mb-4 inline-block tracking-[0.2em]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {'// staff with us'}
          </motion.span>

          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.08]"
            style={{
              background:
                'linear-gradient(135deg, #0F172A 0%, #1e40af 50%, #0891b2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Pre-vetted engineers, ready tomorrow
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-slate-500 text-base md:text-lg lg:text-xl max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Top engineering talent from Egypt, Ukraine, and Romania —
            embedded in your team within 48 hours.
          </motion.p>

          {/* Animated Search Bar */}
          <motion.div
            className="inline-flex items-center bg-white rounded-full mb-12 divide-x divide-gray-200 overflow-hidden border border-gray-200 shadow-sm"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.45,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <SearchPill label="stack" value={typedStack} typing />
            <div className="hidden sm:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRegion}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <SearchPill label="region" value={currentRegion} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="hidden md:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLevel}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <SearchPill label="level" value={currentLevel} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <Button
              href="https://calendly.com/mohamed-ali-discoverdev/30min"
              variant="primary"
              arrow
            >
              Hire Engineers
            </Button>
            <Button
              variant="secondary"
              className="!border-slate-300 !text-slate-700 hover:!bg-slate-100 hover:!border-slate-400"
              onClick={() => {
                const el = document.getElementById('hiring-process');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              How It Works
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
