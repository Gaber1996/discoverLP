import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import Button from '../shared/Button';

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

export default function BuildHero() {
  const reduced = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-linked fade-out: content fades + shifts up as user scrolls past
  const fadeRaw = useTransform(scrollYProgress, [0.4, 0.85], [1, 0]);
  const yRaw = useTransform(scrollYProgress, [0.4, 0.85], [0, -120]);
  const opacity = useSpring(fadeRaw, springConfig);
  const y = useSpring(yRaw, springConfig);

  const scrollToProcess = () => {
    const el = document.getElementById('process');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Left-side vignette for text readability against 3D */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, #0A0F1C 0%, rgba(10,15,28,0.7) 45%, transparent 70%)',
        }}
      />

      {/* Bottom fade into solid content area */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0A0F1C)',
        }}
      />

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20"
        style={reduced ? undefined : { opacity, y }}
      >
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0 lg:max-w-2xl">
          {/* Eyebrow */}
          <motion.span
            className="text-xs font-mono text-primary mb-4 inline-block tracking-[0.2em]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {'// build with us'}
          </motion.span>

          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.08]"
            style={{
              background:
                'linear-gradient(135deg, #ffffff 0%, #3B82F6 50%, #06B6D4 100%)',
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
            We design, build &amp; ship your product
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-text-secondary text-base md:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            End-to-end product development and pre-vetted engineering talent.
            From first commit to global scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.45,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <Button
              href="https://calendly.com/mohamed-ali-discoverdev/30min"
              variant="primary"
              arrow
            >
              Schedule a Call
            </Button>
            <Button variant="secondary" onClick={scrollToProcess}>
              Our Process
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
