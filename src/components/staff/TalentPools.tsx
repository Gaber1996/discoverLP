import { motion } from 'framer-motion';

interface TalentPool {
  country: string;
  flag: string;
  engineers: string;
  timezone: string;
  specialties: string[];
  accentColor: string;
  avatars: string[];
  moreCount: number;
}

const pools: TalentPool[] = [
  {
    country: 'Egypt',
    flag: '\uD83C\uDDEA\uD83C\uDDEC',
    engineers: '120+',
    timezone: 'UTC+2',
    specialties: ['React', 'Node.js', 'Python', 'Mobile', 'AWS'],
    accentColor: '#F59E0B',
    avatars: ['AH', 'MK', 'YS'],
    moreCount: 117,
  },
  {
    country: 'Ukraine',
    flag: '\uD83C\uDDFA\uD83C\uDDE6',
    engineers: '50+',
    timezone: 'UTC+2',
    specialties: ['TypeScript', '.NET', 'DevOps', 'Cloud', 'Go'],
    accentColor: '#3B82F6',
    avatars: ['OL', 'DM', 'IV'],
    moreCount: 47,
  },
  {
    country: 'Romania',
    flag: '\uD83C\uDDF7\uD83C\uDDF4',
    engineers: '30+',
    timezone: 'UTC+2',
    specialties: ['Java', 'React', 'Data', 'QA', 'Kotlin'],
    accentColor: '#06B6D4',
    avatars: ['AD', 'MC', 'SB'],
    moreCount: 27,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const panelVariants = {
  hidden: { opacity: 0, x: -40, rotate: -1 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function TalentPools() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-xs font-mono text-blue-500 mb-3 inline-block tracking-[0.2em]">
            {'// talent pools'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Three regions, one standard
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
            Every engineer passes our 5-stage vetting process — regardless of location.
          </p>
        </motion.div>

        {/* Panels */}
        <motion.div
          className="flex flex-col gap-5 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {pools.map((pool) => (
            <motion.div
              key={pool.country}
              variants={panelVariants}
              className="group relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-300"
            >
              {/* Left accent border */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                style={{ backgroundColor: pool.accentColor }}
              />

              <div className="pl-6 pr-5 py-5 md:py-6 md:pl-8 md:pr-6">
                {/* Top row: Country + stats */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{pool.flag}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                      {pool.country}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium border border-gray-200 rounded-full bg-gray-50 text-slate-600">
                      {pool.engineers} engineers
                    </span>
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium border border-gray-200 rounded-full bg-gray-50 text-slate-600">
                      {pool.timezone}
                    </span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pool.specialties.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 border border-gray-200 transition-colors duration-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Avatars row */}
                <div className="flex items-center gap-1">
                  {pool.avatars.map((initials) => (
                    <div
                      key={initials}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white"
                      style={{
                        backgroundColor: `${pool.accentColor}20`,
                        color: pool.accentColor,
                      }}
                    >
                      {initials}
                    </div>
                  ))}
                  <span className="text-xs text-slate-400 ml-2">
                    and {pool.moreCount} more
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
