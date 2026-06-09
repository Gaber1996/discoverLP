import Hero from '../components/home/Hero';
import TrustedBy from '../components/home/TrustedBy';
import TwoPaths from '../components/home/TwoPaths';
import WhyDiscoverDev from '../components/home/WhyDiscoverDev';
import HowItWorks from '../components/home/HowItWorks';
import ClientReviews from '../components/home/ClientReviews';
import ClutchWidget from '../components/home/ClutchWidget';
import CTABanner from '../components/home/CTABanner';

import SectionDivider from '../components/shared/SectionDivider';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <SectionDivider label="// paths" />
      <TwoPaths />
      <WhyDiscoverDev />
      <SectionDivider label="@@ process @@" />
      <HowItWorks />
      <ClientReviews />
      <SectionDivider label="/* validation */" />
      <ClutchWidget />
      <SectionDivider label="--- EOF" />
      <CTABanner />
    </>
  );
}
