import { motion } from 'framer-motion';

const logos = [
  { src: '/logos/logo-fantacalcio.svg', alt: 'Fantacalcio' },
  { src: '/logos/edulens.jpeg', alt: 'Edulens' },
  { src: '/logos/nilesupport.jpg', alt: 'Nile Support' },
  { src: '/logos/athkado.jpeg', alt: 'Athkado' },
  { src: '/logos/biobnk.jpg', alt: 'BioBnk' },
  { src: '/logos/darb.jpeg', alt: 'Darb' },
  { src: '/logos/pyramakerz.jpeg', alt: 'Pyramakerz' },
  { src: '/logos/upscend.jpeg', alt: 'Upscend' },
  { src: '/logos/welcomeapp.jpeg', alt: 'WelcomeApp' },
  { src: '/logos/zest.jpeg', alt: 'Zest' },
  { src: '/logos/rushr.svg', alt: 'Rushr' },
  { src: '/logos/jumlaty.svg', alt: 'Jumlaty' },
  { src: '/logos/arheb.svg', alt: 'Arheb' },
  { src: '/logos/amstdd.svg', alt: 'Amstdd' },
];

export default function TrustedBy() {
  return (
    <section className="py-16 bg-surface relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.p
          className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Trusted by innovative teams
        </motion.p>

        {/* Infinite scroll carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />

          <div className="overflow-hidden">
            <div className="animate-scroll flex items-center gap-8 whitespace-nowrap">
              {[...logos, ...logos].map((logo, i) => (
                <div
                  key={i}
                  className="w-36 h-20 flex items-center justify-center shrink-0 transition-all duration-500 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-[90%] w-[90%] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
