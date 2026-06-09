import { Lightbulb, Globe, Shield, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';
import PerspectiveGrid from '../ui/PerspectiveGrid';

const pillars = [
  {
    num: '01',
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Product-First Thinking',
    description:
      'We don\'t just write code — we challenge assumptions, validate ideas, and build products users actually want.',
    accentColor: '#3B82F6',
    glowClass: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
    borderGradient: 'from-blue-500 to-cyan-400',
    iconBg: 'bg-blue-500/10',
    iconHoverBg: 'group-hover:bg-blue-500/20',
  },
  {
    num: '02',
    icon: <Globe className="w-6 h-6" />,
    title: 'Multi-Region Talent',
    description:
      'Engineering teams across Egypt, Ukraine, and Romania, managed by U.S.-based product leads for seamless collaboration.',
    accentColor: '#22C55E',
    glowClass: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]',
    borderGradient: 'from-green-500 to-emerald-400',
    iconBg: 'bg-green-500/10',
    iconHoverBg: 'group-hover:bg-green-500/20',
  },
  {
    num: '03',
    icon: <Shield className="w-6 h-6" />,
    title: 'U.S. Business Standards',
    description:
      'American-headquartered with the communication, legal, and quality standards you expect from a domestic partner.',
    accentColor: '#A78BFA',
    glowClass: 'hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]',
    borderGradient: 'from-violet-500 to-purple-400',
    iconBg: 'bg-violet-500/10',
    iconHoverBg: 'group-hover:bg-violet-500/20',
  },
  {
    num: '04',
    icon: <Repeat className="w-6 h-6" />,
    title: 'Full Product Lifecycle',
    description:
      'Strategy, design, development, deployment, and ongoing support — one partner from idea to scale.',
    accentColor: '#06B6D4',
    glowClass: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    borderGradient: 'from-cyan-500 to-teal-400',
    iconBg: 'bg-cyan-500/10',
    iconHoverBg: 'group-hover:bg-cyan-500/20',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function WhyDiscoverDev() {
  return (
    <section className="py-20 md:py-28 bg-surface relative overflow-hidden">
      <PerspectiveGrid />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold text-primary mb-3 inline-block tracking-[0.2em] uppercase">why discoverdev</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Built different. On purpose.
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            Four pillars that set us apart from typical outsourcing shops.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {pillars.map((p) => (
            <motion.div key={p.num} variants={cardVariants}>
              <div
                className={`group relative h-full rounded-xl bg-[rgba(17,24,39,0.7)] backdrop-blur-xl border border-white/[0.06] p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${p.glowClass} hover:border-white/[0.12]`}
              >
                {/* Accent top border */}
                <div
                  className={`absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r ${p.borderGradient} rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300`}
                />

                <div className="flex gap-4">
                  {/* Line number gutter */}
                  <div className="font-mono text-text-muted/30 text-sm pt-1 select-none">
                    {p.num}
                  </div>
                  <div>
                    {/* Icon with colored background circle */}
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${p.iconBg} ${p.iconHoverBg} transition-colors duration-300 mb-3`}
                      style={{ color: p.accentColor }}
                    >
                      {p.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{p.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
