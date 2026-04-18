import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import FreeVsPremium from '../components/home/FreeVsPremium';
import FreshmanPreview from '../components/home/FreshmanPreview';
import PremiumPreview from '../components/home/PremiumPreview';
import FeaturedVideos from '../components/home/FeaturedVideos';
import WhyChoose from '../components/home/WhyChoose';
import DashboardPreview from '../components/home/DashboardPreview';
import Testimonials from '../components/home/Testimonials';
import PricingPreview from '../components/home/PricingPreview';
import FAQ from '../components/home/FAQ';
import CTABanner from '../components/home/CTABanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FreeVsPremium />
      <FreshmanPreview />
      <FeaturedVideos />
      <PremiumPreview />
      <WhyChoose />
      <DashboardPreview />
      <PricingPreview />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
