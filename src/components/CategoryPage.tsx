import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Search, Filter, Grid, List as ListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ListingCard from "./ListingCard";
import { mockListings } from "../data/mockData";

const CategoryPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // Filter listings based on category and search
  const filteredListings = mockListings.filter((listing) => {
    const matchesCategory =
      category === "all" ||
      listing.category.toLowerCase().includes(category?.toLowerCase() || "");
    const matchesSearch =
      !searchTerm ||
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriceMin =
      !priceRange.min || listing.price >= parseInt(priceRange.min);
    const matchesPriceMax =
      !priceRange.max || listing.price <= parseInt(priceRange.max);

    return (
      matchesCategory && matchesSearch && matchesPriceMin && matchesPriceMax
    );
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return (
          new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
        );
      case "oldest":
        return (
          new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
        );
      default:
        return 0;
    }
  });

  const getCategoryTitle = () => {
    switch (category) {
      case "properties":
        return "Propiedades";
      case "vehicles":
        return "Vehículos";
      case "residential":
        return "Propiedades Residenciales";
      case "commercial":
        return "Propiedades Comerciales";
      case "equipment":
        return "Maquinaria Pesada";
      default:
        return "Todos los Listados";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {getCategoryTitle()}
          </h1>
          <p className="text-gray-600">
            {sortedListings.length} resultados encontrados
          </p>
        </div>

        {/* Filtros */}
        <Card className="mb-8 !border-none">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtros y Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Búsqueda */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar en los listados..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border border-dark-charcoal"
                  />
                </div>
              </div>

              {/* Rango de precio */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Precio mín."
                  type="number"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange((prev) => ({ ...prev, min: e.target.value }))
                  }
                  className="border border-dark-charcoal"
                />
                <Input
                  placeholder="Precio máx."
                  type="number"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({ ...prev, max: e.target.value }))
                  }
                  className="border border-dark-charcoal"
                />
              </div>

              {/* Ordenar */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border border-dark-charcoal">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="!border-none">
                  <SelectItem value="newest">Más nuevos primero</SelectItem>
                  <SelectItem value="oldest">Más antiguos primero</SelectItem>
                  <SelectItem value="price-low">
                    Precio: menor a mayor
                  </SelectItem>
                  <SelectItem value="price-high">
                    Precio: mayor a menor
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Vista */}
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="flex-1"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="flex-1"
                >
                  <ListIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Limpiar filtros */}
            {(searchTerm || priceRange.min || priceRange.max) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchTerm("");
                    setPriceRange({ min: "", max: "" });
                  }}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Limpiar todos los filtros
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resultados */}
        {sortedListings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No se encontraron resultados
            </h2>
            <p className="text-gray-600 mb-6">
              Prueba ajustando tus criterios de búsqueda o explora todas las
              categorías.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setPriceRange({ min: "", max: "" });
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }
          >
            {sortedListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                compact={viewMode === "list"}
              />
            ))}
          </div>
        )}

        {/* Cargar más */}
        {sortedListings.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="border" className="px-8">
              Cargar más resultados
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
