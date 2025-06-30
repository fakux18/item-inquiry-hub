import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Listing } from '@/hooks/useListings';

interface ListingsState {
  lista: Listing[];
  loading: boolean;
  setListings: (lista: Listing[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useListingsStore = create<ListingsState>()(
  persist(
    (set) => ({
      lista: [],
      loading: true,
      setListings: (lista) => set({ lista }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'listings-storage', // nombre de la clave en localStorage
      partialize: (state) => ({ lista: state.lista }), // sólo persistimos lista, no loading
    }
  )
);
