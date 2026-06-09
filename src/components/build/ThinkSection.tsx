import { Compass, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '../shared/ServiceCard';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function ThinkSection() {
  return (
    <section className="py-20 md:py-28 bg-surface-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold text-syntax-green mb-3 inline-block tracking-[0.2em] uppercase">think</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Strategy &amp; Discovery
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            Before we build, we make sure you're building the right thing.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={itemVariants}>
            <ServiceCard
              icon={<Compass className="w-6 h-6" />}
              title="Product Strategy & Discovery"
              description="We work alongside your team to define product vision, validate market fit, and create a clear roadmap before writing any code."
              features={[
                'Market & user research',
                'Product roadmap & prioritization',
                'Technical feasibility analysis',
                'Go-to-market strategy',
              ]}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ServiceCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Digital Transformation"
              description="Modernize legacy systems, automate workflows, and build the digital infrastructure your business needs to scale."
              features={[
                'Legacy system modernization',
                'Process automation',
                'Cloud migration strategy',
                'Digital maturity assessment',
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
