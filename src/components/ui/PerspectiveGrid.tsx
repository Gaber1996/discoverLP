import { motion, useScroll, useTransform } from 'framer-motion';

interface PerspectiveGridProps {
  className?: string;
}

export default function PerspectiveGrid({ className = '' }: PerspectiveGridProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, -40]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ perspective: '800px', perspectiveOrigin: 'center top' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          transform: 'rotateX(65deg) translateY(-10%)',
          transformOrigin: 'center top',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          animation: 'grid-drift 15s ease-in-out infinite',
          y,
        }}
      />
      {/* Fade mask - grid fades toward top */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,15,28,0.85) 0%, transparent 40%, transparent 80%, rgba(10,15,28,0.85) 100%)',
        }}
      />
    </div>
  );
}
