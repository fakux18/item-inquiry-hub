import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Bed, Bath, Calendar, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  category: string;
  type: string;
  images: string[];
  featured: boolean;
  status: "available" | "pending" | "sold";
  details: {
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    year?: number;
    mileage?: number;
    transmission?: string;
  };
  description: string;
  datePosted: string;
}

interface ListingCardProps {
  listing: Listing;
  compact?: boolean;
}

const ListingCard = ({ listing, compact = false }: ListingCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `¡Hola! Estoy interesado en "${listing.title}" publicado por ${formatPrice(listing.price)}. ¿Podrías brindarme más información?`
    );
    window.open(`https://wa.me/+5493775200964?text=${message}`, "_blank");
  };

  const handleEmailContact = () => {
    const subject = encodeURIComponent(`Consulta sobre ${listing.title}`);
    const body = encodeURIComponent(
      `Hola,\n\nEstoy interesado en "${listing.title}" publicado por ${formatPrice(listing.price)}.\n\n¿Podrías brindarme más información?\n\n¡Gracias!`
    );
    window.open(`mailto:infoakmisiones@gmail.com?subject=${subject}&body=${body}`);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "sold":
        return "Vendido";
      default:
        return "Disponible";
    }
  };

  return (
    <div className="card-elevated overflow-hidden group animate-fade-in bg-slate-100">
      {/* Imagen */}
      <div className="relative overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            compact ? "h-48" : "h-64"
          }`}
        />

        {/* Estado */}
        {listing.status !== "available" && (
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                listing.status === "pending"
                  ? "bg-golden-yellow text-dark-charcoal"
                  : "bg-red-500 text-white"
              }`}
            >
              {listing.status === "pending" ? "Pendiente" : "Vendido"}
            </span>
          </div>
        )}

        {/* Destacado */}
        {listing.featured && (
          <div className="absolute top-4 right-4">
            <span className="badge-featured shadow-md">Destacado</span>
          </div>
        )}

        {/* Precio */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-deep-blue text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
            {formatPrice(listing.price)}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-dark-charcoal mb-2 line-clamp-2 group-hover:text-deep-blue transition-colors">
              {listing.title}
            </h3>
            <div className="flex items-center text-mid-gray-blue text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {listing.location}
            </div>
          </div>
          {/* <span className="bg-light-gray text-mid-gray-blue px-3 py-1 rounded-full text-xs font-medium ml-2">
            {listing.category}
          </span> */}
        </div>

        {/* Detalles clave */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-secondary">
          {listing.details.bedrooms && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1 text-deep-blue" />
              {listing.details.bedrooms} hab.
            </div>
          )}
          {listing.details.bathrooms && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1 text-deep-blue" />
              {listing.details.bathrooms} baño
            </div>
          )}
          {listing.details.year && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-deep-blue" />
              {listing.details.year}
            </div>
          )}
          {listing.details.mileage && (
            <div className="flex items-center">
              <Gauge className="w-4 h-4 mr-1 text-deep-blue" />
              {listing.details.mileage.toLocaleString()} km
            </div>
          )}
        </div>

        {/* Descripción */}
        {!compact && (
          <p className="text-mid-gray-blue text-sm mb-6 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col space-y-3 w-full">
          <div className="flex space-x-2">
            <Button
              onClick={handleWhatsAppContact}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 text-sm rounded-lg transition-colors duration-200"
            >
              <Phone className="w-4 h-4 mr-1" />
              WhatsApp
            </Button>
            <Button
              onClick={handleEmailContact}
              className="flex-1 bg-white hover:bg-terracotta hover:text-white text-dark-charcoal border border-dark-charcoal font-medium py-2 text-sm rounded-lg transition-all duration-200"
            >
              <Mail className="w-4 h-4 mr-1" />
              Correo
            </Button>
          </div>

          <Link to={`/property/${listing.id}`}>
            <Button className="w-full btn-primary py-2 text-sm min-w-full">
              Ver detalles →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
