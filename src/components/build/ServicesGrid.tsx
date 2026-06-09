import { useRef } from 'react';
import {
  Lightbulb, Palette, Code2, Rocket, Brain,
} from 'lucide-react';
import {
  motion, useScroll, useTransform, useSpring,
} from 'framer-motion';
import KbdTag from '../shared/KbdTag';
import useTilt from '../../hooks/useTilt';

/* ------------------------------------------------------------------ */
/*  Shared spring config                                               */
/* ------------------------------------------------------------------ */

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  { num: '01', title: 'Think', description: 'Strategy, research & product discovery' },
  { num: '02', title: 'Design', description: 'UI/UX design, prototyping & user testing' },
  { num: '03', title: 'Build', description: 'Clean, scalable code with modern stack' },
  { num: '04', title: 'Ship', description: 'Deploy, monitor & iterate' },
];

interface Service {
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  borderGradient: string;
  iconBg: string;
  iconHoverBg: string;
  glowShadow: string;
  tags: string[];
}

const buildServices: Service[] = [
  {
    title: 'Product Strategy & Discovery',
    icon: <Lightbulb className="w-6 h-6" />,
    accentColor: '#3B82F6',
    borderGradient: 'from-blue-500 to-cyan-400',
    iconBg: 'bg-blue-500/10',
    iconHoverBg: 'group-hover:bg-blue-500/20',
    glowShadow: '0 0 30px rgba(59,130,246,0.15)',
    tags: ['Research', 'Roadmap', 'Validation'],
  },
  {
    title: 'UI/UX Design',
    icon: <Palette className="w-6 h-6" />,
    accentColor: '#22C55E',
    borderGradient: 'from-green-500 to-emerald-400',
    iconBg: 'bg-green-500/10',
    iconHoverBg: 'group-hover:bg-green-500/20',
    glowShadow: '0 0 30px rgba(34,197,94,0.15)',
    tags: ['Figma', 'Prototyping', 'User Testing'],
  },
  {
    title: 'Custom Development',
    icon: <Code2 className="w-6 h-6" />,
    accentColor: '#F97316',
    borderGradient: 'from-orange-500 to-amber-400',
    iconBg: 'bg-orange-500/10',
    iconHoverBg: 'group-hover:bg-orange-500/20',
    glowShadow: '0 0 30px rgba(249,115,22,0.15)',
    tags: ['React', 'Node.js', 'Python', 'AWS'],
  },
  {
    title: 'MVP & Rapid Prototyping',
    icon: <Rocket className="w-6 h-6" />,
    accentColor: '#06B6D4',
    borderGradient: 'from-cyan-500 to-teal-400',
    iconBg: 'bg-cyan-500/10',
    iconHoverBg: 'group-hover:bg-cyan-500/20',
    glowShadow: '0 0 30px rgba(6,182,212,0.15)',
    tags: ['Agile', 'Fast Launch', 'Iteration'],
  },
  {
    title: 'AI & Machine Learning',
    icon: <Brain className="w-6 h-6" />,
    accentColor: '#A78BFA',
    borderGradient: 'from-violet-500 to-purple-400',
    iconBg: 'bg-violet-500/10',
    iconHoverBg: 'group-hover:bg-violet-500/20',
    glowShadow: '0 0 30px rgba(167,139,250,0.15)',
    tags: ['TensorFlow', 'NLP', 'Computer Vision'],
  },
];

interface ComparisonRow {
  metric: string;
  discoverdev: string;
  traditional: string;
}

const comparisonData: ComparisonRow[] = [
  { metric: 'Time to start', discoverdev: '48 hours', traditional: '3–6 months' },
  { metric: 'Vetting', discoverdev: 'Pre-vetted seniors', traditional: 'You interview' },
  { metric: 'Flexibility', discoverdev: 'Scale anytime', traditional: 'Fixed contracts' },
  { metric: 'Management', discoverdev: 'Fully managed', traditional: 'Self-managed' },
  { metric: 'Cost', discoverdev: 'Predictable monthly', traditional: 'Salary + overhead' },
];

/* ------------------------------------------------------------------ */
/*  Scroll-animated wrapper                                            */
/* ------------------------------------------------------------------ */

function ScrollReveal({
  children,
  progress,
  start,
  end,
  offsetY = 40,
  offsetX = 0,
  reduced,
}: {
  children: React.ReactNode;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  start: number;
  end: number;
  offsetY?: number;
  offsetX?: number;
  reduced: boolean;
}) {
  const opRaw = useTransform(progress, [start, end], [0, 1]);
  const yRaw = useTransform(progress, [start, end], [offsetY, 0]);
  const xRaw = useTransform(progress, [start, end], [offsetX, 0]);
  const op = useSpring(opRaw, springConfig);
  const sy = useSpring(yRaw, springConfig);
  const sx = useSpring(xRaw, springConfig);

  if (reduced) return <>{children}</>;

  return (
    <motion.div style={{ opacity: op, y: sy, x: sx }}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Service card with tilt                                             */
/* ------------------------------------------------------------------ */

function ServiceCard({
  s,
  reduced,
}: {
  s: Service;
  reduced: boolean;
}) {
  const { ref, onMouseMove, onMouseLeave, tiltStyle, shineStyle } = useTilt(6);

  return (
    <div
      ref={ref}
      onMouseMove={reduced ? undefined : onMouseMove}
      onMouseLeave={reduced ? undefined : (e) => {
        onMouseLeave();
        e.currentTarget.style.boxShadow = 'none';
      }}
      style={reduced ? undefined : tiltStyle}
      className={`group relative h-full rounded-xl bg-[rgba(17,24,39,0.7)] backdrop-blur-xl border border-white/[0.06] p-6 md:p-8 transition-all duration-300 ${
        reduced ? '' : 'hover:scale-[1.02] hover:-translate-y-1'
      } hover:border-white/[0.12]`}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = s.glowShadow;
      }}
    >
      {/* Shine overlay */}
      {!reduced && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none z-10"
          style={shineStyle}
        />
      )}

      {/* Accent top bar */}
      <div
        className={`absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r ${s.borderGradient} rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300`}
      />

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${s.iconBg} ${s.iconHoverBg} transition-colors duration-300 mb-4`}
        style={{ color: s.accentColor }}
      >
        {s.icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-3">{s.title}</h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {s.tags.map((tag) => (
          <KbdTag key={tag}>{tag}</KbdTag>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 1 — Process                                                */
/* ------------------------------------------------------------------ */

export function ProcessSection({ reduced }: { reduced: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden py-20 md:py-28"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left — heading */}
          <div className="lg:col-span-2">
            <ScrollReveal
              progress={scrollYProgress}
              start={0.08}
              end={0.22}
              reduced={reduced}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-6">
                From idea to launch — in weeks
              </h2>
              <p className="text-text-secondary text-base md:text-lg max-w-md">
                Our four-phase process turns your vision into production-ready software.
              </p>
            </ScrollReveal>
          </div>

          {/* Right — steps */}
          <div className="lg:col-span-3 space-y-0">
            {processSteps.map((step, i) => (
              <ScrollReveal
                key={step.num}
                progress={scrollYProgress}
                start={0.18 + i * 0.08}
                end={0.33 + i * 0.08}
                offsetX={40}
                offsetY={0}
                reduced={reduced}
              >
                <div
                  className={`py-8 ${
                    i < processSteps.length - 1
                      ? 'border-b border-white/[0.06]'
                      : ''
                  }`}
                >
                  <div className="flex items-baseline gap-6">
                    <span className="text-3xl md:text-4xl font-mono font-bold text-white/10 select-none">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary text-sm md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 — Services                                               */
/* ------------------------------------------------------------------ */

export function ServicesSection({ reduced }: { reduced: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <ScrollReveal
          progress={scrollYProgress}
          start={0.05}
          end={0.18}
          reduced={reduced}
        >
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs font-mono text-primary mb-3 inline-block tracking-[0.2em]">
              {'// what we build'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything you need, under one roof
            </h2>
          </div>
        </ScrollReveal>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {buildServices.map((s, i) => {
            const cardStart = 0.12 + (i / 5) * 0.28;
            const cardEnd = cardStart + 0.18;
            return (
              <ScrollReveal
                key={s.title}
                progress={scrollYProgress}
                start={cardStart}
                end={cardEnd}
                offsetY={50}
                reduced={reduced}
              >
                <ServiceCard s={s} reduced={reduced} />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Scale / Comparison                                     */
/* ------------------------------------------------------------------ */

export function ComparisonSection({ reduced }: { reduced: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left — heading */}
          <ScrollReveal
            progress={scrollYProgress}
            start={0.08}
            end={0.22}
            reduced={reduced}
          >
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-6">
                Scale your team — overnight
              </h2>
              <p className="text-text-secondary text-base md:text-lg max-w-md">
                Skip the 6-month hiring cycle. Embed pre-vetted senior engineers directly into your team.
              </p>
            </div>
          </ScrollReveal>

          {/* Right — comparison table */}
          <div>
            {/* Table header */}
            <ScrollReveal
              progress={scrollYProgress}
              start={0.16}
              end={0.3}
              reduced={reduced}
            >
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-white/[0.08] mb-0">
                <div className="text-sm text-text-muted font-medium" />
                <div className="text-sm font-semibold text-primary">DiscoverDev</div>
                <div className="text-sm font-medium text-text-muted">Traditional</div>
              </div>
            </ScrollReveal>

            {/* Table rows */}
            {comparisonData.map((row, i) => (
              <ScrollReveal
                key={row.metric}
                progress={scrollYProgress}
                start={0.22 + i * 0.07}
                end={0.35 + i * 0.07}
                offsetY={30}
                reduced={reduced}
              >
                <div
                  className={`grid grid-cols-3 gap-4 py-5 ${
                    i < comparisonData.length - 1 ? 'border-b border-white/[0.06]' : ''
                  }`}
                >
                  <div className="text-sm text-text-secondary font-medium">
                    {row.metric}
                  </div>
                  <div className="text-sm text-white font-mono font-medium">
                    {row.discoverdev}
                  </div>
                  <div className="text-sm text-text-muted font-mono">
                    {row.traditional}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

