import { MessageSquare, Wrench, RefreshCw, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '../shared/ServiceCard';

const services = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Technical Consulting',
    description:
      'Expert guidance on architecture, technology selection, and engineering best practices for your product.',
    features: ['Architecture reviews', 'Technology audits', 'Performance optimization'],
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: 'Maintenance & Support',
    description:
      'Ongoing maintenance, bug fixes, security patches, and feature enhancements to keep your product healthy.',
    features: ['24/7 monitoring', 'Bug fixes & patches', 'Performance tuning'],
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'System Modernization',
    description:
      'Migrate legacy systems to modern stacks, improve scalability, and reduce technical debt.',
    features: ['Legacy migration', 'Cloud adoption', 'Tech debt reduction'],
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: 'White-Label Development',
    description:
      'Build products under your brand. We provide the engineering firepower, you own the relationship.',
    features: ['Agency partnerships', 'NDA-protected', 'Flexible team sizes'],
  },
];

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

export default function MaintainSection() {
  return (
    <section className="py-20 md:py-28 bg-surface bg-dot-pattern-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold text-accent mb-3 inline-block tracking-[0.2em] uppercase">maintain</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Support &amp; Scale
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            We don't disappear after launch. We stay to maintain, optimize, and grow.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
