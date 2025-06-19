
import { usePublicListings } from "@/hooks/usePublicListings";
import ListingCard from "../ListingCard";

// Transform Supabase listing to ListingCard format
const transformListing = (listing: any) => {
  return {
    id: listing.id,
    title: listing.title,
    price: listing.price,
    currency: listing.currency,
    location: listing.location,
    category: listing.category,
    type: listing.category, // Use category as type
    images: listing.image_urls || [],
    featured: listing.featured || false,
    status: listing.status as "available" | "pending" | "sold",
    details: {
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      area: listing.area,
      year: listing.year || listing.year_built,
      mileage: listing.mileage,
      transmission: listing.transmission,
    },
    description: listing.description || "",
    datePosted: listing.created_at,
  };
};

const FeaturedListings = () => {
  const { listings, loading } = usePublicListings({
    featured: true,
    status: 'available',
    // limit: 6
  });

  const transformedListings = listings.map(transformListing);

  if (loading) {
    return (
      <section className="section-spacing">
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
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing">
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

        {transformedListings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-secondary">
              No hay publicaciones destacadas disponibles en este momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transformedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
