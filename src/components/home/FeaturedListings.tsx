import ListingCard from "../ListingCard";
import { mockListings } from "../../data/mockData";

const FeaturedListings = () => {
  const featuredListings = mockListings
    .filter((listing) => listing.featured)
    .slice(0, 6);

  return (
    <section className="bg-light-gray section-spacing">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-charcoal mb-4">
            Propiedades y Vehículos Destacados
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            Publicaciones seleccionadas que ofrecen valor y calidad
            excepcionales
          </p>
          <div className="w-24 h-1 bg-terracotta mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
