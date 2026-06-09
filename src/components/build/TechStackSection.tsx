import { motion } from 'framer-motion';
import KbdTag from '../shared/KbdTag';

const stack = [
  {
    category: 'Frontend',
    color: 'text-primary',
    borderColor: 'border-primary/20',
    techs: ['React.js', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'React Native', 'Flutter'],
  },
  {
    category: 'Backend',
    color: 'text-syntax-green',
    borderColor: 'border-syntax-green/20',
    techs: ['Node.js', 'NestJS', 'Spring Boot', 'Python', 'Django', 'FastAPI', 'PHP', '.NET', 'Go'],
  },
  {
    category: 'Mobile',
    color: 'text-accent',
    borderColor: 'border-accent/20',
    techs: ['React Native', 'Flutter', 'Swift (iOS)', 'Kotlin/Java (Android)'],
  },
  {
    category: 'AI / ML',
    color: 'text-syntax-purple',
    borderColor: 'border-syntax-purple/20',
    techs: ['OpenAI', 'LangChain', 'RAG', 'Computer Vision', 'NLP', 'Custom ML Models', 'PyTorch', 'TensorFlow'],
  },
  {
    category: 'Data',
    color: 'text-syntax-orange',
    borderColor: 'border-syntax-orange/20',
    techs: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'ETL', 'Data Pipelines'],
  },
  {
    category: 'Cloud & DevOps',
    color: 'text-syntax-green',
    borderColor: 'border-syntax-green/20',
    techs: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
  },
  {
    category: 'AR / Immersive',
    color: 'text-primary',
    borderColor: 'border-primary/20',
    techs: ['AR Product Visualization', '3D Rendering'],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { y: 24, opacity: 0, rotate: -2 },
  visible: { y: 0, opacity: 1, rotate: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function TechStackSection() {
  return (
    <section className="py-20 md:py-28 bg-surface-50 bg-grid-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold text-text-muted mb-3 inline-block tracking-[0.2em] uppercase">stack</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Technology Stack
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            Modern tools, proven at scale.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {stack.map((group) => (
            <motion.div
              key={group.category}
              className="glass-card rounded-xl p-6"
              variants={cardVariants}
            >
              <h3 className={`text-sm font-semibold ${group.color} mb-4 uppercase tracking-wide`}>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.techs.map((tech) => (
                  <KbdTag key={tech}>{tech}</KbdTag>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
