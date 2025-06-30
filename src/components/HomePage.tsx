
import HeroSection from './home/HeroSection';
import FeaturedListings from './home/FeaturedListings';
import CategorySection from './home/CategorySection';
import RecentListings from './home/RecentListings';
import WhyChooseUs from './home/WhyChooseUs';
import { usePublicListingsStore } from '@/hooks/usePublicListingsStore';

const HomePage = () => {
  usePublicListingsStore({
    status: 'available'
  })
  return (
    <div className="space-y-16">
      <HeroSection />
      <FeaturedListings />
      <CategorySection />
      {/* <RecentListings /> */}
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
