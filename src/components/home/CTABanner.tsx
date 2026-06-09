import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../shared/Button';
import AuroraBackground from '../ui/AuroraBackground';
import PerspectiveGrid from '../ui/PerspectiveGrid';

const locations = ['Texas, USA', 'Alexandria, Egypt', 'Kyiv, Ukraine', 'Bucharest, Romania'];

export default function CTABanner() {
  return (
    <section className="py-20 md:py-28 bg-surface relative overflow-hidden">
      <AuroraBackground intense />
      <PerspectiveGrid />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.97 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-xs font-semibold text-primary mb-3 inline-block tracking-[0.2em] uppercase">let's talk</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to build?
          </h2>
          <p className="text-text-secondary text-base md:text-lg mb-8 max-w-xl mx-auto">
            Whether you need a full product team or specialized engineers, we're ready to help you ship.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button to="/build" variant="primary" arrow>
              Build With Us
            </Button>
            <Button href="mailto:info@discoverdev.ai" variant="secondary">
              info@discoverdev.ai
            </Button>
          </div>

          {/* Location pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {locations.map((loc) => (
              <span
                key={loc}
                className="inline-flex items-center gap-1.5 text-text-muted text-xs font-mono bg-white/[0.03] border border-white/5 rounded-full px-3 py-1.5"
              >
                <MapPin className="w-3 h-3" />
                {loc}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
