
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Listing } from '@/hooks/useListings';

interface UsePublicListingsProps {
  searchTerm?: string;
  category?: string;
  status?: string;
  featured?: boolean;
  limit?: number;
}

export const usePublicListings = ({
  searchTerm = '',
  category = '',
  status = 'available',
  featured,
  limit
}: UsePublicListingsProps = {}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      
      let query = supabase
        .from('listings')
        .select('*')
        .eq('status', status);

      // Apply category filter
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      // Apply featured filter
      if (featured !== undefined) {
        query = query.eq('featured', featured);
      }

      // Apply search term filter
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Apply limit
      if (limit) {
        query = query.limit(limit);
      }

      // Order by creation date (newest first)
      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setListings(data || []);
    } catch (error: any) {
      console.error('Error fetching public listings:', error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [searchTerm, category, status, featured, limit]);

  // Set up real-time subscription for live updates
  useEffect(() => {
    const channel = supabase
      .channel('public-listings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'listings'
        },
        (payload) => {
          fetchListings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [searchTerm, category, status, featured, limit]);

  return {
    listings,
    loading,
    refetch: fetchListings,
  };
};
