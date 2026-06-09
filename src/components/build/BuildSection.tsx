import { Code2, Rocket, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '../shared/ServiceCard';
import PerspectiveGrid from '../ui/PerspectiveGrid';

const services = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Custom Software Development',
    description:
      'Scalable web and mobile applications built with modern frameworks, clean architecture, and best practices.',
    features: [
      'React, Next.js, React Native',
      'Node.js, Python, Go',
      'Cloud-native architecture',
      'CI/CD & automated testing',
    ],
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: 'MVP & Product Development',
    description:
      'Get to market fast with a lean, production-ready MVP. We help you validate, iterate, and scale without wasting time or budget.',
    features: [
      'Rapid prototyping',
      'Lean methodology',
      'User feedback loops',
      'Post-launch iteration',
    ],
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI & Machine Learning',
    description:
      'From intelligent automation to custom ML models, we integrate AI into your product to unlock new capabilities.',
    features: [
      'Custom ML model development',
      'LLM integration & fine-tuning',
      'Computer vision & NLP',
      'Data pipeline architecture',
    ],
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

export default function BuildSection() {
  return (
    <section className="py-20 md:py-28 bg-surface-50 relative overflow-hidden">
      <PerspectiveGrid />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold text-syntax-orange mb-3 inline-block tracking-[0.2em] uppercase">build</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Engineering &amp; Development
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            Modern software built with precision, speed, and scale in mind.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
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
