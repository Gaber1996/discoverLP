import { motion } from 'framer-motion';

const clients = [
  'Fantacalcio', 'Edulens', 'Nile Support', 'JEDU',
  'DealMaker', 'ProInvest', 'MedTrack', 'ShipFast',
];

export default function TrustedByStrip() {
  return (
    <section className="py-12 md:py-16 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.p
          className="text-xs font-mono text-primary mb-6 text-center tracking-[0.2em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {'// trusted by'}
        </motion.p>
      </div>

      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />

        <div className="overflow-hidden">
          <div className="animate-scroll flex items-center gap-16 whitespace-nowrap">
            {[...clients, ...clients].map((name, i) => (
              <span
                key={i}
                className="text-text-muted/50 hover:text-white/80 text-xl font-bold tracking-wide transition-all duration-300 cursor-default select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
