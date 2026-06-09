import { motion } from 'framer-motion';

const roles = [
  'Frontend', 'Backend', 'Full Stack', 'Mobile', 'iOS', 'Android',
  'DevOps', 'Cloud Architecture', 'QA', 'Data Engineering',
  'Machine Learning', 'Security',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function RolesStrip() {
  return (
    <section className="py-14 md:py-20 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.p
          className="text-xs font-mono text-blue-500 mb-8 text-center tracking-[0.2em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {'// roles we fill'}
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {roles.map((role) => (
            <motion.span
              key={role}
              variants={pillVariants}
              className="inline-flex items-center px-4 py-2 font-mono text-sm border border-gray-200 rounded-full bg-white text-slate-600 cursor-default select-none transition-all duration-300 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
