import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedBorder from '../ui/AnimatedBorder';

interface ComparisonRow {
  metric: string;
  discoverdev: string;
  traditional: string;
}

const comparisonData: ComparisonRow[] = [
  { metric: 'Time to hire', discoverdev: '48 hours', traditional: '3–6 months' },
  { metric: 'Vetting', discoverdev: '5-stage process', traditional: 'You interview' },
  { metric: 'Trial period', discoverdev: '2-week risk-free', traditional: 'No trial' },
  { metric: 'Scaling', discoverdev: 'Add/swap anytime', traditional: 'New hire cycle' },
  { metric: 'Management', discoverdev: 'Ongoing support', traditional: 'Self-managed' },
  { metric: 'Cost', discoverdev: 'Flat monthly rate', traditional: 'Salary + overhead' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function ComparisonCard({
  title,
  side,
  children,
}: {
  title: string;
  side: 'left' | 'right';
  children: React.ReactNode;
}) {
  const card = (
    <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6 h-full">
      <h3
        className={`text-lg font-bold mb-5 ${
          side === 'left' ? 'text-blue-600' : 'text-slate-400'
        }`}
      >
        {title}
      </h3>
      {children}
    </div>
  );

  if (side === 'left') {
    return (
      <AnimatedBorder
        colors={['#3b82f6', '#06b6d4', '#10b981']}
        glow
        alwaysAnimate
        className="h-full"
      >
        {card}
      </AnimatedBorder>
    );
  }

  return card;
}

export default function WhyStaff() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-xs font-mono text-blue-500 mb-3 inline-block tracking-[0.2em]">
            {'// why discoverdev'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Skip the hiring headache
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-lg mx-auto">
            Traditional hiring takes months and costs a fortune. We deliver vetted, senior engineers in days.
          </p>
        </motion.div>

        {/* Card Duel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* DiscoverDev card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ComparisonCard title="DiscoverDev" side="left">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {comparisonData.map((row) => (
                  <motion.div
                    key={row.metric}
                    variants={rowVariants}
                    className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0"
                  >
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">
                        {row.metric}
                      </div>
                      <div className="text-sm text-slate-800 font-medium">
                        {row.discoverdev}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </ComparisonCard>
          </motion.div>

          {/* Traditional card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <ComparisonCard title="Traditional Hiring" side="right">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {comparisonData.map((row) => (
                  <motion.div
                    key={row.metric}
                    variants={rowVariants}
                    className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0"
                  >
                    <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">
                        {row.metric}
                      </div>
                      <div className="text-sm text-slate-400 font-medium">
                        {row.traditional}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </ComparisonCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
