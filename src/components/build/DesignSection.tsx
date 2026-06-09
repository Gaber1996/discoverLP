import { Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '../shared/ServiceCard';

export default function DesignSection() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold text-syntax-purple mb-3 inline-block tracking-[0.2em] uppercase">design</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Product Design
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            Beautiful, functional interfaces that users love.
          </p>
        </div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <ServiceCard
            icon={<Palette className="w-6 h-6" />}
            title="UI/UX & Product Design"
            description="From wireframes to high-fidelity prototypes, we design products that balance aesthetics with usability. Every pixel serves a purpose."
            features={[
              'User research & personas',
              'Wireframing & prototyping',
              'Design systems & component libraries',
              'Usability testing & iteration',
              'Responsive & accessible design',
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
}
