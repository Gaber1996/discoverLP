import { useReducedMotion } from 'framer-motion';
import TalentNetworkCanvas from '../components/staff/TalentNetworkCanvas';
import StaffHero from '../components/staff/StaffHero';
import StaffStats from '../components/staff/StaffStats';
import TalentPools from '../components/staff/TalentPools';
import RolesStrip from '../components/staff/RolesStrip';
import HiringProcess from '../components/staff/HiringProcess';
import WhyStaff from '../components/staff/WhyStaff';
import TrustedByStrip from '../components/build/TrustedByStrip';
import StaffCTA from '../components/staff/StaffCTA';

export default function StaffWithUsPage() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="relative bg-[#F8FAFC]">
      {/* Fixed Canvas 2D particle network background */}
      {!reduced && <TalentNetworkCanvas />}

      {/* Hero — light bg */}
      <StaffHero />

      {/* Content sections — light bg */}
      <div className="relative z-[1] bg-[#F8FAFC]">
        <StaffStats />
        <TalentPools />
        <RolesStrip />
        <HiringProcess />
        <WhyStaff />
      </div>

      {/* CTA — light bg */}
      <div className="relative z-[1]">
        <StaffCTA />
      </div>

      {/* Transition to dark footer */}
      <div className="relative z-[1] bg-surface">
        {/* Gradient fade from light to dark */}
        <div
          className="h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #F8FAFC, #0A0F1C)',
          }}
        />
        <TrustedByStrip />
      </div>
    </div>
  );
}
