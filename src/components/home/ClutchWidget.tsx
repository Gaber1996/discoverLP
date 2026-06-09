import { Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import KbdTag from '../shared/KbdTag';

const industries = ['Healthcare', 'EdTech', 'E-Commerce', 'FoodTech', 'Transportation', 'Home Services', 'Sales & Outreach', 'Sports', 'Academic Research', 'Startups', 'Software Houses', 'Legal'];

const tagVariants = {
  hidden: { y: 12, opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.4 + i * 0.06, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function ClutchWidget() {
  return (
    <section className="py-20 md:py-28 bg-surface-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Clutch rating card */}
          <motion.a
            href="https://clutch.co/profile/discoverdev"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl bg-[rgba(17,24,39,0.7)] backdrop-blur-xl border border-white/[0.06] p-8 md:p-10 text-center mb-12 transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-4">Verified on Clutch</p>

            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-5xl font-bold text-white">5.0</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            <p className="text-text-secondary text-sm mb-4">
              11 verified reviews from clients across 10+ countries
            </p>

            <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium group-hover:text-accent transition-colors">
              Read Reviews
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </motion.a>

          {/* Industries */}
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-6">Industries we serve</p>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((industry, i) => (
                <motion.span
                  key={industry}
                  custom={i}
                  variants={tagVariants}
                >
                  <KbdTag>{industry}</KbdTag>
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
