import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useListingsStore } from "@/stores/useListingsStore";

interface UsePublicListingsProps {
  searchTerm?: string;
  category?: string;
  status?: string;
  featured?: boolean;
  limit?: number;
}

export const usePublicListingsStore = ({
  status = "available",
}: UsePublicListingsProps = {}) => {
  const { lista, loading, setListings, setLoading } = useListingsStore();

  const fetchLista = async () => {
    try {
      setLoading(true);
      let query = supabase.from("listings").select("*").eq("status", status);

      query = query.order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      setListings(data || []);
    } catch (error: any) {
      console.error("Error fetching public listings:", error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLista();
  }, []);

  return {
    lista,
    loading,
    fetchLista,
  };
};
