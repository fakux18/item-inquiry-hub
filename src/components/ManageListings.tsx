
import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Eye, Plus, Search } from "lucide-react";
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
import { useListings } from "@/hooks/useListings";

const ManageListings = () => {
  const { listings, loading, updateListing, deleteListing } = useListings();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" ||
      listing.category.toLowerCase() === filterCategory;
    const matchesStatus =
      filterStatus === "all" || listing.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")) {
      await deleteListing(id);
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: "available" | "pending" | "sold"
  ) => {
    await updateListing(id, { status: newStatus });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col items-center md:flex-row md:justify-between space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800">
            Administrar publicaciones
          </h1>
          <p className="text-gray-600">
            Ver y gestionar todas tus publicaciones del marketplace
          </p>
        </div>
        <Link to="/admin/listings/add">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Agregar nueva publicación
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <Card className="!border-none">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar publicaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border border-dark-charcoal"
              />
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="border border-dark-charcoal">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent className="!border-none">
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="properties">Propiedades</SelectItem>
                <SelectItem value="vehicles">Vehículos</SelectItem>
                <SelectItem value="equipment">Maquinaria</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="border border-dark-charcoal">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent className="!border-none">
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="available">Disponible</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="sold">Vendido</SelectItem>
              </SelectContent>
            </Select>

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-card"
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
                setFilterStatus("all");
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="!border-none">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{filteredListings.length}</div>
            <p className="text-sm text-gray-600">Total de publicaciones</p>
          </CardContent>
        </Card>

        <Card className="!border-none">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {filteredListings.filter((l) => l.status === "available").length}
            </div>
            <p className="text-sm text-gray-600">Disponibles</p>
          </CardContent>
        </Card>

        <Card className="!border-none">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredListings.filter((l) => l.status === "pending").length}
            </div>
            <p className="text-sm text-gray-600">Pendientes</p>
          </CardContent>
        </Card>

        <Card className="!border-none">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">
              {filteredListings.filter((l) => l.status === "sold").length}
            </div>
            <p className="text-sm text-gray-600">Vendidas</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de publicaciones */}
      <Card className="!border-none">
        <CardContent className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="space-y-0">
              {filteredListings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex items-center justify-between p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                      {listing.image_urls && listing.image_urls.length > 0 ? (
                        <img
                          src={listing.image_urls[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Sin imagen
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-800 truncate">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {listing.location}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-lg font-bold text-blue-600">
                          {listing.price.toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 0,
                          })}
                        </span>
                        <span className="text-sm text-gray-500 capitalize">
                          {listing.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(listing.created_at).toLocaleDateString('es-AR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Select
                      value={listing.status}
                      onValueChange={(
                        value: "available" | "pending" | "sold"
                      ) => handleStatusChange(listing.id, value)}
                    >
                      <SelectTrigger className="w-32 border border-dark-charcoal">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="!border-none">
                        <SelectItem value="available">Disponible</SelectItem>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="sold">Vendido</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex space-x-2">
                      <Link to={`/property/${listing.id}`}>
                        <Button variant="border" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link to={`/admin/listings/edit/${listing.id}`}>
                        <Button variant="border" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="border"
                        size="sm"
                        onClick={() => handleDelete(listing.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No se encontraron publicaciones que coincidan con tus criterios.
              </p>
              <Link to="/admin/listings/add" className="mt-4 inline-block">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Agrega tu primera publicación
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageListings;
