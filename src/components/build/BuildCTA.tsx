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

export default function BuildCTA() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingOpRaw = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const headingYRaw = useTransform(scrollYProgress, [0.1, 0.25], [50, 0]);
  const subOpRaw = useTransform(scrollYProgress, [0.18, 0.33], [0, 1]);
  const subYRaw = useTransform(scrollYProgress, [0.18, 0.33], [40, 0]);
  const ctaOpRaw = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const ctaYRaw = useTransform(scrollYProgress, [0.25, 0.4], [30, 0]);

  const headingOp = useSpring(headingOpRaw, springConfig);
  const headingY = useSpring(headingYRaw, springConfig);
  const subOp = useSpring(subOpRaw, springConfig);
  const subY = useSpring(subYRaw, springConfig);
  const ctaOp = useSpring(ctaOpRaw, springConfig);
  const ctaY = useSpring(ctaYRaw, springConfig);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Soft vignette — keeps text readable without blocking the 3D */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(10,15,28,0.55) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Eyebrow */}
        <motion.span
          className="text-xs font-mono text-primary mb-6 inline-block tracking-[0.2em]"
          style={reduced ? undefined : { opacity: headingOp, y: headingY }}
        >
          {'// ready to ship?'}
        </motion.span>

        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.08]"
          style={reduced ? undefined : { opacity: headingOp, y: headingY }}
        >
          <span
            style={{
              background:
                'linear-gradient(135deg, #ffffff 0%, #3B82F6 50%, #06B6D4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Let&apos;s build something great
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-text-secondary text-base md:text-lg max-w-md mx-auto mb-8"
          style={reduced ? undefined : { opacity: subOp, y: subY }}
        >
          Book a free 30-minute consultation. We&apos;ll map out your
          project together.
        </motion.p>

        {/* Command line decoration */}
        <motion.div
          className="inline-flex items-center gap-2 bg-white/[0.04] backdrop-blur-sm rounded-lg px-4 py-2.5 font-mono text-sm mb-10 border border-white/[0.08]"
          style={reduced ? undefined : { opacity: subOp, y: subY }}
        >
          <span className="text-syntax-green">$</span>
          <span className="text-text-secondary">discoverdev start</span>
          <span className="text-primary">--with-us</span>
          <span
            className="inline-block w-[2px] h-4 bg-primary/80 ml-1"
            style={{ animation: 'blink-cursor 1s step-end infinite' }}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={reduced ? undefined : { opacity: ctaOp, y: ctaY }}
        >
          <Button
            href="https://calendly.com/mohamed-ali-discoverdev/30min"
            variant="primary"
            arrow
          >
            Schedule a Call
          </Button>
          <Button href="mailto:info@discoverdev.ai" variant="secondary">
            Email Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
