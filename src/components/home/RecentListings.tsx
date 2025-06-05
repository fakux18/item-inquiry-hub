
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ListingCard from '../ListingCard';
import { mockListings } from '../../data/mockData';

const RecentListings = () => {
  const recentListings = mockListings.slice(0, 8);

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Latest Additions
        </h2>
        <p className="text-lg text-gray-600">
          Fresh listings added to our marketplace
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} compact />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/category/all">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
            View All Listings
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default RecentListings;
