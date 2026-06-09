import { useRef, lazy, Suspense } from 'react';
import { useScroll, useReducedMotion } from 'framer-motion';
import BuildHero from '../components/build/BuildHero';
import StatsBar from '../components/build/StatsBar';
import { ProcessSection, ServicesSection, ComparisonSection } from '../components/build/ServicesGrid';
import TechStrip from '../components/build/TechStrip';
import TrustedByStrip from '../components/build/TrustedByStrip';
import BuildCTA from '../components/build/BuildCTA';

const ScrollScene3D = lazy(() => import('../components/build/ScrollScene3D'));

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BuildWithUsPage() {
  const reduced = useReducedMotion() ?? false;
  const pageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={pageRef} className="relative bg-surface">
      {/* Fixed 3D constellation background */}
      {!reduced && (
        <Suspense fallback={null}>
          <ScrollScene3D scrollProgress={scrollYProgress} />
        </Suspense>
      )}

      {/* Hero — transparent bg, 3D constellation visible on the right */}
      <BuildHero />

      {/* Content sections — solid bg blocks 3D cleanly */}
      <div className="relative z-[1] bg-surface">
        <StatsBar />
        <ProcessSection reduced={reduced} />
        <ServicesSection reduced={reduced} />
        <TechStrip />
        <ComparisonSection reduced={reduced} />
        <TrustedByStrip />
      </div>

      {/* Gradient fade: content → CTA (reveals 3D sphere behind CTA) */}
      <div
        className="relative z-[1] h-32 -mb-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0A0F1C, transparent)',
        }}
      />

      {/* CTA — transparent bg, dispersed 3D sphere visible behind card */}
      <BuildCTA />
    </div>
  );
}
