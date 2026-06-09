import { Search, Map, Hammer, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import CodeWaterfall from '../ui/CodeWaterfall';

const steps = [
  {
    icon: Search,
    label: 'Discover',
    description: 'We dig deep into your business, users, and goals to define the right product — not just the right code.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/30',
  },
  {
    icon: Map,
    label: 'Plan',
    description: 'A clear roadmap with milestones, tech decisions, and team allocation — before a single line is written.',
    color: 'text-syntax-green',
    bgColor: 'bg-syntax-green/10',
    borderColor: 'border-syntax-green/30',
  },
  {
    icon: Hammer,
    label: 'Build',
    description: 'Agile sprints with transparent progress, code reviews, and continuous delivery. You see results every week.',
    color: 'text-syntax-orange',
    bgColor: 'bg-syntax-orange/10',
    borderColor: 'border-syntax-orange/30',
  },
  {
    icon: Rocket,
    label: 'Ship',
    description: "From staging to production with CI/CD, monitoring, and ongoing support. We don't disappear after launch.",
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/30',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
  },
};

function DesktopTimeline() {
  return (
    <motion.div
      className="hidden lg:block max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="relative">
        {/* Gradient connector line — draws across on enter */}
        <div className="absolute top-[28px] left-[12.5%] right-[12.5%] h-px overflow-hidden">
          <motion.div
            className="h-full w-full origin-left"
            variants={lineVariants}
            style={{
              background: 'linear-gradient(to right, #3B82F6, #22C55E, #F97316, #06B6D4)',
            }}
          />
        </div>

        <div className="grid grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.label} variants={itemVariants}>
                {/* Icon circle on the line */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    className={`w-14 h-14 rounded-full ${step.bgColor} border ${step.borderColor} flex items-center justify-center ${step.color} relative z-10 bg-surface-50`}
                    variants={iconVariants}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                </div>

                {/* Card */}
                <div className="glass-card rounded-xl p-6 text-center">
                  <h3 className="font-semibold text-white text-lg mb-2">{step.label}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-surface-50 relative overflow-hidden bg-grid-dark">
      <CodeWaterfall />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold text-primary mb-3 inline-block tracking-[0.2em] uppercase">process</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            How it works
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            Four steps from idea to production.
          </p>
        </div>

        {/* Desktop: staggered entrance timeline */}
        <DesktopTimeline />

        {/* Mobile/Tablet: vertical timeline */}
        <div className="lg:hidden max-w-lg mx-auto">
          <div className="relative">
            {/* Vertical connector line */}
            <motion.div
              className="absolute left-[27px] top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(to bottom, #3B82F6, #22C55E, #F97316, #06B6D4)',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            <div className="space-y-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    className="relative flex gap-5"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    {/* Icon circle */}
                    <div className={`w-14 h-14 rounded-full ${step.bgColor} border ${step.borderColor} flex items-center justify-center ${step.color} flex-shrink-0 relative z-10 bg-surface-50`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="glass-card rounded-xl p-5 flex-1">
                      <h3 className="font-semibold text-white text-lg mb-1">{step.label}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
