import { motion, useScroll, useTransform } from 'framer-motion';

interface AuroraBackgroundProps {
  className?: string;
  intense?: boolean;
}

export default function AuroraBackground({ className = '', intense = false }: AuroraBackgroundProps) {
  const opacity1 = intense ? 0.5 : 0.35;
  const opacity2 = intense ? 0.4 : 0.3;
  const opacity3 = intense ? 0.35 : 0.25;

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, -80]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -50]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -30]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Layer 1 - Blue/Purple sweep */}
      <motion.div
        className="absolute"
        style={{
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: `linear-gradient(135deg, rgba(59,130,246,${opacity1}), rgba(139,92,246,${opacity1 * 0.75}), rgba(6,182,212,${opacity1}))`,
          filter: 'blur(60px)',
          animation: 'aurora-1 20s ease-in-out infinite',
          y: y1,
        }}
      />
      {/* Layer 2 - Cyan/Blue radial */}
      <motion.div
        className="absolute"
        style={{
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: `radial-gradient(circle at 60% 40%, rgba(6,182,212,${opacity2}), rgba(59,130,246,${opacity2 * 0.67}), transparent)`,
          filter: 'blur(60px)',
          animation: 'aurora-2 25s ease-in-out infinite',
          y: y2,
        }}
      />
      {/* Layer 3 - Violet/Pink ellipse */}
      <motion.div
        className="absolute"
        style={{
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: intense
            ? `radial-gradient(ellipse at 40% 60%, rgba(167,139,250,${opacity3}), rgba(236,72,153,${opacity3 * 0.6}), transparent)`
            : `radial-gradient(ellipse at 40% 60%, rgba(167,139,250,${opacity3}), rgba(139,92,246,${opacity3 * 0.6}), transparent)`,
          filter: 'blur(60px)',
          animation: 'aurora-3 30s ease-in-out infinite',
          y: y3,
        }}
      />
    </div>
  );
}
