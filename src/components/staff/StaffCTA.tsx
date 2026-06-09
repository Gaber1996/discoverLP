import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../shared/Button';
import AnimatedBorder from '../ui/AnimatedBorder';

const agenda = [
  { icon: <Users className="w-4 h-4" />, text: 'Your team needs & tech stack' },
  { icon: <Clock className="w-4 h-4" />, text: 'Talent availability & timelines' },
  { icon: <CheckCircle className="w-4 h-4" />, text: 'Pricing & engagement model' },
];

export default function StaffCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#F8FAFC]">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Eyebrow */}
          <span className="text-xs font-mono text-blue-500 mb-6 inline-block tracking-[0.2em]">
            {'// ready to scale?'}
          </span>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-[1.08]">
            <span
              style={{
                background:
                  'linear-gradient(135deg, #0F172A 0%, #1e40af 50%, #0891b2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Your next engineer is one call away
            </span>
          </h2>

          <p className="text-slate-500 text-base md:text-lg max-w-md mx-auto mb-10">
            Tell us who you need. We&apos;ll match you with vetted, senior
            talent within 48 hours.
          </p>

          {/* Calendar card */}
          <AnimatedBorder
            colors={['#3b82f6', '#06b6d4', '#F59E0B']}
            glow
            alwaysAnimate
            className="max-w-md mx-auto mb-10"
          >
            <div className="bg-white rounded-xl p-6 text-left">
              {/* Event header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-900 font-semibold text-sm">
                    30-min Discovery Call
                  </div>
                  <div className="text-slate-400 text-xs font-mono">
                    DiscoverDev &times; Your Team
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 mb-4" />

              {/* What we'll cover */}
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">
                What we&apos;ll cover
              </p>
              <ul className="space-y-2.5">
                {agenda.map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-2.5 text-sm text-slate-600"
                  >
                    <span className="text-blue-500">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedBorder>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="https://calendly.com/mohamed-ali-discoverdev/30min"
              variant="primary"
              arrow
            >
              Schedule a Call
            </Button>
            <Button
              href="mailto:info@discoverdev.ai"
              variant="secondary"
              className="!border-slate-300 !text-slate-700 hover:!bg-slate-100 hover:!border-slate-400"
            >
              Email Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
