import { motion } from 'framer-motion';
import KbdTag from '../shared/KbdTag';

const industries = ['Healthcare', 'EdTech', 'E-Commerce', 'FoodTech', 'Transportation', 'Home Services', 'Sales & Outreach', 'Sports', 'Academic Research', 'Startups', 'Software Houses', 'Legal'];

const tagVariants = {
  hidden: { y: 12, opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function Industries() {
  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-6">Industries we serve</p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry, i) => (
              <motion.span
                key={industry}
                custom={i}
                variants={tagVariants}
              >
                <KbdTag>{industry}</KbdTag>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
