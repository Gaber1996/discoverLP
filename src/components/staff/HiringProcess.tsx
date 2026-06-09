import { Search, UserCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import useInView from '../../hooks/useInView';

const steps = [
  {
    num: '01',
    title: 'Match',
    description:
      'Tell us the role, stack, and timezone. We shortlist pre-vetted engineers within 48 hours.',
    icon: <Search className="w-5 h-5" />,
    color: '#F59E0B',
    time: '48hrs',
  },
  {
    num: '02',
    title: 'Embed',
    description:
      'Your engineer joins standup, Slack, and your repo on day one — fully integrated, not outsourced.',
    icon: <UserCheck className="w-5 h-5" />,
    color: '#3B82F6',
    time: 'day 1',
  },
  {
    num: '03',
    title: 'Scale',
    description:
      'Add or swap team members anytime. Scale from 1 engineer to a full squad with zero friction.',
    icon: <TrendingUp className="w-5 h-5" />,
    color: '#06B6D4',
    time: 'anytime',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function HiringProcess() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      id="hiring-process"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-xs font-mono text-blue-500 mb-3 inline-block tracking-[0.2em]">
            {'// how it works'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Three steps to your next engineer
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
            <motion.div
              className="w-full h-full origin-top"
              style={{
                background:
                  'linear-gradient(to bottom, #F59E0B, #3B82F6, #06B6D4)',
              }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>

          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {steps.map((step, i) => {
              const isRight = i % 2 === 1;

              return (
                <motion.div
                  key={step.num}
                  variants={cardVariants}
                  className={`relative flex items-start gap-4 md:gap-0 mb-16 last:mb-0 ${
                    isRight ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline node */}
                  <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center border-2 bg-white"
                      style={{
                        borderColor: step.color,
                        color: step.color,
                        boxShadow: `0 0 20px ${step.color}20`,
                      }}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 md:w-[calc(50%-3rem)] bg-white rounded-xl border border-gray-200 shadow-sm p-5 md:p-6 ${
                      isRight
                        ? 'md:mr-auto md:ml-0 md:pr-6'
                        : 'md:ml-auto md:mr-0 md:pl-6'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-mono font-bold text-slate-200 select-none">
                        {step.num}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">
                        {step.title}
                      </h3>
                      <span className="ml-auto inline-flex items-center px-2.5 py-0.5 text-xs font-medium border border-gray-200 rounded-full bg-gray-50 text-slate-500">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
