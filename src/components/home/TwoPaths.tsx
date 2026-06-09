import { ArrowRight, Code2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedBorder from '../ui/AnimatedBorder';
import KbdTag from '../shared/KbdTag';
import useTilt from '../../hooks/useTilt';

const buildTags = ['Product Strategy', 'UI/UX Design', 'Custom Development', 'MVP Launch', 'AI & ML'];
const scaleTags = ['Frontend Devs', 'Backend Devs', 'Mobile Engineers', 'QA Specialists', 'DevOps'];


function PathCard({
  icon,
  title,
  description,
  tags,
  cta,
  to,
  direction,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  cta: string;
  to: string;
  direction: 'left' | 'right';
}) {
  const { ref, onMouseMove, onMouseLeave, tiltStyle, shineStyle } = useTilt(8);

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <AnimatedBorder glow>
        <div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={tiltStyle}
          className="relative bg-surface-100 rounded-xl p-8 md:p-10 h-full overflow-hidden"
        >
          {/* Shine overlay */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={shineStyle}
          />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
              {icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">{description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag) => (
                <KbdTag key={tag}>{tag}</KbdTag>
              ))}
            </div>

            <Link
              to={to}
              className="group inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-accent transition-colors"
            >
              {cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </AnimatedBorder>
    </motion.div>
  );
}

export default function TwoPaths() {
  return (
    <section id="two-paths" className="py-20 md:py-28 bg-surface-50 relative bg-dot-pattern-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold text-primary mb-3 inline-block tracking-[0.2em] uppercase">choose your path</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            How can we help?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto relative">
          <PathCard
            icon={<Code2 className="w-6 h-6" />}
            title="Build With Us"
            description="End-to-end product development — from strategy and design to custom software, AI integration, and ongoing support."
            tags={buildTags}
            cta="Explore Services"
            to="/build"
            direction="left"
          />

          {/* Decorative separator between cards (desktop) */}
          <motion.div
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/20" />
            <span className="text-text-muted/40 text-xs font-medium uppercase tracking-widest">or</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>

          <PathCard
            icon={<Users className="w-6 h-6" />}
            title="Scale Your Team"
            description="Pre-vetted engineers embedded in your workflow — frontend, backend, mobile, QA, and DevOps talent on demand."
            tags={scaleTags}
            cta="Learn More"
            to="/staff"
            direction="right"
          />
        </div>
      </div>
    </section>
  );
}
