import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  location: string;
  status: string;
  image_urls: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
  // Property fields
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  year_built?: number;
  // Vehicle fields
  make?: string;
  model?: string;
  year?: number;
  mileage?: number;
  transmission?: string;
  condition?: string;
}

// Type for creating a new listing with required fields
export interface CreateListingData {
  title: string;
  description: string; // Make this required to match the form validation
  price: number;
  currency: string;
  category: string;
  location: string;
  status?: string;
  image_urls?: string[];
  featured?: boolean;
  // Property fields
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  year_built?: number;
  // Vehicle fields
  make?: string;
  model?: string;
  year?: number;
  mileage?: number;
  transmission?: string;
  condition?: string;
}

export const useListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setListings(data || []);
    } catch (error: any) {
      console.error("Error fetching listings:", error);
      toast.error("Error al cargar las publicaciones: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const createListing = async (
    listingData: CreateListingData
  ): Promise<boolean> => {
    try {
      const { error } = await supabase.from("listings").insert(listingData);

      if (error) {
        throw error;
      }

      toast.success("Publicación creada exitosamente");
      await fetchListings(); // Refresh list
      return true;
    } catch (error: any) {
      console.error("Error creating listing:", error);
      toast.error("Error al crear la publicación: " + error.message);
      return false;
    }
  };

  const updateListing = async (
    id: string,
    listingData: Partial<Listing>
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("listings")
        .update(listingData)
        .eq("id", id);

      if (error) {
        throw error;
      }

      toast.success("Publicación actualizada exitosamente");
      await fetchListings(); // Refresh list
      return true;
    } catch (error: any) {
      console.error("Error updating listing:", error);
      toast.error("Error al actualizar la publicación: " + error.message);
      return false;
    }
  };

  const deleteListing = async (id: string): Promise<boolean> => {
    try {
      // Buscar la publicación para obtener las imágenes asociadas
      const { data: listingData, error: fetchError } = await supabase
        .from("listings")
        .select("image_urls")
        .eq("id", id)
        .single();
      if (fetchError) throw fetchError;
      const imageUrls: string[] = listingData?.image_urls || [];

      // Eliminar imágenes del bucket si existen
      if (imageUrls.length > 0) {
        // Extraer el path relativo del storage
        const paths = imageUrls.map((url) => {
          // Si es una URL completa, extrae el path después de '/object/' y quita el bucket name
          const match = url.match(/object\/marketplace-images\/(.+)/);
          return match
            ? match[1]
            : url.replace(/^.*\/marketplace-images\//, "");
        });

        console.log("Intentando eliminar archivos:", paths); // Para debug

        const { error: storageError } = await supabase.storage
          .from("marketplace-images")
          .remove(paths);

        if (storageError) {
          console.error("Error eliminando archivos del storage:", storageError);
          throw storageError;
        }
      }

      // Eliminar el registro de la publicación
      const { error } = await supabase.from("listings").delete().eq("id", id);
      if (error) throw error;

      toast.success("Publicación e imágenes eliminadas exitosamente");
      await fetchListings(); // Refresh list
      return true;
    } catch (error: any) {
      console.error("Error deleting listing:", error);
      toast.error("Error al eliminar la publicación: " + error.message);
      return false;
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return {
    listings,
    loading,
    fetchListings,
    createListing,
    updateListing,
    deleteListing,
  };
};
