import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import AuroraBackground from '../ui/AuroraBackground';
import CodeWaterfall from '../ui/CodeWaterfall';

const reviews = [
  {
    stars: 5,
    quote:
      'Perfect timing, always available. They delivered exactly what we needed for our market research.',
    name: 'Roberto',
    company: 'Fantacalcio',
    role: 'Market Research',
  },
  {
    stars: 5,
    quote:
      'They focused on building solutions that were practical, scalable, and aligned with our vision for AI-driven education.',
    name: 'Youssef',
    company: 'EduLens',
    role: 'CEO — AI Agents',
  },
  {
    stars: 5,
    quote:
      'The quality of their work is top-notch. They handled AI agents, our website, and staff augmentation seamlessly.',
    name: 'CEO',
    company: 'Nile Support',
    role: 'AI Agents + Website + Staff Augmentation',
  },
  {
    stars: 5,
    quote:
      'Thank you for going above and beyond. The research quality exceeded our expectations.',
    name: 'Farah Alkhaldi',
    company: 'Consulting Firm, Kuwait',
    role: 'Market Research',
  },
  {
    stars: 5,
    quote:
      'Professional work and great communication. They delivered our white-label and e-commerce platform flawlessly.',
    name: 'Nojoud Alarfaj',
    company: 'Athkado, Saudi Arabia',
    role: 'White-Label + E-Commerce',
  },
  {
    stars: 5,
    quote:
      'Absolutely amazing! I am very, very pleased with the level of detail and thoroughness of the analysis.',
    name: 'Michelle Boehm',
    company: 'Academic Researcher, Switzerland',
    role: 'ML & Data Analysis',
  },
  {
    stars: 5,
    quote:
      'I will become a regular customer going forward now. Great research quality and turnaround.',
    name: 'Andrei Chejneanu',
    company: 'Entrepreneur, UK',
    role: 'Market Research',
  },
  {
    stars: 5,
    quote:
      'You are doing great, I highly appreciate it! Excellent communication and delivery.',
    name: 'Lea Nechitailo',
    company: 'Entrepreneur, Spain',
    role: 'Market Research',
  },
];

const AUTOPLAY_MS = 5000;
const VISIBLE_BEHIND = 2;
const SWIPE_THRESHOLD = 80;

/* ── Draggable top card ─────────────────────────────────────── */
function DraggableCard({
  review,
  onSwipe,
  zIndex,
}: {
  review: (typeof reviews)[number];
  onSwipe: (dir: 1 | -1) => void;
  zIndex: number;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);

  // Glow that follows drag direction
  const glowLeft = useTransform(x, [-200, 0], [0.35, 0]);
  const glowRight = useTransform(x, [0, 200], [0, 0.35]);
  const borderColor = useTransform(
    x,
    [-200, -50, 0, 50, 200],
    [
      'rgba(239,68,68,0.4)',
      'rgba(255,255,255,0.08)',
      'rgba(255,255,255,0.08)',
      'rgba(255,255,255,0.08)',
      'rgba(59,130,246,0.4)',
    ],
  );

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipe(1);
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipe(-1);
    }
  }

  return (
    <motion.div
      className="absolute inset-x-0 top-0 cursor-grab active:cursor-grabbing touch-pan-y"
      style={{ zIndex, x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.92, y: -40, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{
        x: 300,
        opacity: 0,
        rotate: 18,
        transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as const },
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      <motion.div
        className="w-full flex flex-col rounded-xl bg-[rgba(17,24,39,0.85)] backdrop-blur-xl overflow-hidden shadow-2xl"
        style={{ borderWidth: 1, borderStyle: 'solid', borderColor }}
      >
        {/* Directional glow overlays */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(239,68,68,0.12), transparent 50%)',
            opacity: glowLeft,
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background:
              'linear-gradient(to left, rgba(59,130,246,0.12), transparent 50%)',
            opacity: glowRight,
          }}
        />

        {/* Terminal header */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 text-[10px] font-mono text-text-muted/40">
            review.tsx
          </span>
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-1">
          <div className="flex gap-1 mb-4">
            {Array.from({ length: review.stars }).map((_, j) => (
              <Star
                key={j}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed flex-1 mb-6">
            &ldquo;{review.quote}&rdquo;
          </p>
          <div className="border-t border-white/[0.08] pt-4">
            <p className="font-semibold text-white text-sm">{review.name}</p>
            <p className="text-text-secondary text-xs">
              {review.role}, {review.company}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Static behind-card (not draggable) ─────────────────────── */
function StackedCard({
  review,
  diff,
  zIndex,
}: {
  review: (typeof reviews)[number];
  diff: number;
  zIndex: number;
}) {
  const scale = 1 - diff * 0.05;
  const yOffset = diff * 18;
  const cardOpacity = 0.5 - (diff - 1) * 0.2;

  return (
    <motion.div
      className="absolute inset-x-0 top-0 pointer-events-none"
      style={{ zIndex }}
      initial={{ scale: scale - 0.05, y: yOffset - 18, opacity: 0 }}
      animate={{ scale, y: yOffset, opacity: cardOpacity }}
      exit={{ scale: scale - 0.05, y: yOffset + 20, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      <div className="w-full flex flex-col rounded-xl bg-[rgba(17,24,39,0.85)] backdrop-blur-xl border border-white/[0.06] overflow-hidden shadow-xl">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 text-[10px] font-mono text-text-muted/40">
            review.tsx
          </span>
        </div>
        <div className="p-6 md:p-8 flex flex-col flex-1">
          <div className="flex gap-1 mb-4">
            {Array.from({ length: review.stars }).map((_, j) => (
              <Star
                key={j}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed flex-1 mb-6">
            &ldquo;{review.quote}&rdquo;
          </p>
          <div className="border-t border-white/[0.08] pt-4">
            <p className="font-semibold text-white text-sm">{review.name}</p>
            <p className="text-text-secondary text-xs">
              {review.role}, {review.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export default function ClientReviews() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % reviews.length);
    timerRef.current = Date.now();
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + reviews.length) % reviews.length);
    timerRef.current = Date.now();
  }, []);

  const handleSwipe = useCallback(
    (dir: 1 | -1) => {
      if (dir === 1) next();
      else prev();
    },
    [next, prev],
  );

  // Reset timer key when active changes (restarts CSS animation)
  const [timerKey, setTimerKey] = useState(0);
  useEffect(() => {
    setTimerKey((k) => k + 1);
  }, [active]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, next, active]);

  return (
    <section className="py-20 md:py-28 bg-surface relative overflow-hidden">
      <AuroraBackground />
      <CodeWaterfall />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold text-primary mb-3 inline-block tracking-[0.2em] uppercase">
            reviews
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            What our clients say
          </h2>
        </div>

        {/* Stacked card deck */}
        <div
          className="relative max-w-xl mx-auto"
          style={{ height: 320 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence initial={false}>
            {reviews.map((review, i) => {
              const diff =
                (i - active + reviews.length) % reviews.length;
              if (diff > VISIBLE_BEHIND) return null;

              const zIndex = reviews.length - diff;

              if (diff === 0) {
                return (
                  <DraggableCard
                    key={`card-${i}`}
                    review={review}
                    onSwipe={handleSwipe}
                    zIndex={zIndex}
                  />
                );
              }

              return (
                <StackedCard
                  key={`card-${i}`}
                  review={review}
                  diff={diff}
                  zIndex={zIndex}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/[0.1] hover:scale-110 active:scale-95 transition-all"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dot indicators with progress ring */}
          <div className="flex gap-2 items-center">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActive(i);
                  timerRef.current = Date.now();
                }}
                className="relative h-2.5 flex items-center"
                aria-label={`Go to review ${i + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-7 h-2 bg-white/10'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
                {/* Animated fill for active dot */}
                {i === active && (
                  <motion.span
                    key={timerKey}
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: 28 }}
                    transition={{
                      duration: paused ? 99999 : AUTOPLAY_MS / 1000,
                      ease: 'linear',
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/[0.1] hover:scale-110 active:scale-95 transition-all"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Counter */}
        <p className="text-center text-text-muted text-xs font-mono mt-4">
          {active + 1} / {reviews.length}
        </p>
      </div>
    </section>
  );
}
