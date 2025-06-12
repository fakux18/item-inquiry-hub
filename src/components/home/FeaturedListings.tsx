
import { useEffect, useState } from "react";
import ListingCard from "../ListingCard";
import { supabase } from "@/integrations/supabase/client";
import { Listing } from "@/hooks/useListings";

const FeaturedListings = () => {
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('featured', true)
        .eq('status', 'available')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching featured listings:', error);
        return;
      }

      setFeaturedListings(data || []);
    } catch (error) {
      console.error('Error fetching featured listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchFeaturedListings();

    // Set up real-time subscription
    const channel = supabase
      .channel('featured-listings-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'listings'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          // Refetch data when any change occurs to listings table
          fetchFeaturedListings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

        {featuredListings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-secondary">
              No hay publicaciones destacadas disponibles en este momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
