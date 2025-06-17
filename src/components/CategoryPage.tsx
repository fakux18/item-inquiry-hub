
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Search, Filter, Currency } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ListingCard from "./ListingCard";
import { usePublicListings } from "@/hooks/usePublicListings";

// Transform Supabase listing to ListingCard format
const transformListing = (listing: any) => {
  return {
    id: listing.id,
    title: listing.title,
    price: listing.price,
    currency: listing.currency,
    location: listing.location,
    category: listing.category,
    type: listing.category,
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

const CategoryPage = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { listings, loading } = usePublicListings({
    searchTerm,
    category: category === 'all' ? '' : category,
    status: 'available'
  });

  const transformedListings = listings.map(transformListing);

  // Apply additional filters and sorting
  let filteredListings = [...transformedListings];

  // Price filter
  if (priceFilter !== "all") {
    switch (priceFilter) {
      case "under-100k":
        filteredListings = filteredListings.filter(l => l.price < 100000);
        break;
      case "100k-500k":
        filteredListings = filteredListings.filter(l => l.price >= 100000 && l.price < 500000);
        break;
      case "500k-1m":
        filteredListings = filteredListings.filter(l => l.price >= 500000 && l.price < 1000000);
        break;
      case "over-1m":
        filteredListings = filteredListings.filter(l => l.price >= 1000000);
        break;
    }
  }

  // Sorting
  switch (sortBy) {
    case "newest":
      filteredListings.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
      break;
    case "oldest":
      filteredListings.sort((a, b) => new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime());
      break;
    case "price-low":
      filteredListings.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredListings.sort((a, b) => b.price - a.price);
      break;
  }

  const getCategoryTitle = (cat: string | undefined) => {
    switch (cat) {
      case "properties":
        return "Propiedades";
      case "vehicles":
        return "Vehículos";
      case "equipment":
        return "Maquinaria";
      default:
        return "Todas las categorías";
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setPriceFilter("all");
    setSortBy("newest");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {getCategoryTitle(category)}
          </h1>
          <p className="text-gray-600">
            {filteredListings.length} {filteredListings.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
          </p>
        </div>

        {/* Filters - Restored original styling */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtros y búsqueda</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                <SelectValue placeholder="Rango de precio" />
              </SelectTrigger>
              <SelectContent className="!border-none">
                <SelectItem value="all">Todos los precios</SelectItem>
                <SelectItem value="under-100k">Menos de $100,000</SelectItem>
                <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                <SelectItem value="over-1m">Más de $1,000,000</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="!border-none">
                <SelectItem value="newest">Más recientes</SelectItem>
                <SelectItem value="oldest">Más antiguos</SelectItem>
                <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex items-center space-x-2 border-gray-300 hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span>Limpiar filtros</span>
            </Button>
          </div>
        </div>

        {/* Results */}
        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No se encontraron resultados
            </h2>
            <p className="text-gray-600 mb-6">
              Intenta ajustar tus filtros de búsqueda para ver más opciones.
            </p>
            <Button onClick={handleClearFilters}>
              Limpiar todos los filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
