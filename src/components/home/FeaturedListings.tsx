
import ListingCard from '../ListingCard';
import { mockListings } from '../../data/mockData';

const FeaturedListings = () => {
  const featuredListings = mockListings.filter(listing => listing.featured).slice(0, 6);

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Featured Properties & Vehicles
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hand-picked premium listings offering exceptional value and quality
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedListings;
