import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import useInView from '../../hooks/useInView';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  color: string;
  barPercent: number;
}

const stats: Stat[] = [
  { value: 200, suffix: '+', label: 'Engineers', color: '#F59E0B', barPercent: 80 },
  { value: 3, suffix: '', label: 'Countries', color: '#3B82F6', barPercent: 100 },
  { value: 48, suffix: 'hr', label: 'Match Time', color: '#06B6D4', barPercent: 65 },
  { value: 95, suffix: '%', label: 'Retention', color: '#10B981', barPercent: 95 },
];

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    if (!active) return;
    const start = performance.now();

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [target, active, duration]);

  useEffect(() => {
    animate();
  }, [animate]);

  return count;
}

function StatCell({ stat, index, active }: { stat: Stat; index: number; active: boolean }) {
  const count = useCountUp(stat.value, active);

  return (
    <motion.div
      className="flex-1 px-4 md:px-6 py-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="text-3xl md:text-4xl font-mono font-bold text-slate-900 mb-1">
        {count}
        <span style={{ color: stat.color }}>{stat.suffix}</span>
      </div>
      <div className="text-xs text-slate-500 mb-2">{stat.label}</div>
      {/* Progress bar */}
      <div className="h-1 rounded-full bg-slate-200 overflow-hidden max-w-[80px] mx-auto">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: stat.color }}
          initial={{ width: 0 }}
          animate={active ? { width: `${stat.barPercent}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: index * 0.15 + 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

export default function StaffStats() {
  const { ref, inView } = useInView(0.3);

  return (
    <section className="py-12 md:py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className="bg-white rounded-xl border border-gray-200 shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200"
        >
          {stats.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} index={i} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
