import { motion } from 'framer-motion';

interface SectionDividerProps {
  label: string;
  className?: string;
  bg?: string;
}

export default function SectionDivider({ label, className = '', bg = 'bg-surface' }: SectionDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`relative flex items-center justify-center py-2 ${className}`}
    >
      <div className="absolute inset-x-0 top-1/2 h-px border-t border-white/[0.12]" />
      <span
        className={`relative z-10 px-5 font-mono text-xs text-white/[0.18] ${bg}`}
      >
        {label}
      </span>
    </motion.div>
  );
}
