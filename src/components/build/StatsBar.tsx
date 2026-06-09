import { motion } from 'framer-motion';

const stats = [
  { value: '50+', label: 'Products Shipped' },
  { value: '48hr', label: 'Onboarding' },
  { value: '4.9★', label: 'Clutch Rating' },
  { value: '12+', label: 'Countries' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function StatsBar() {
  return (
    <section className="py-12 md:py-16 relative z-10">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <div className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
