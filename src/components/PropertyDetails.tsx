import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Listing } from "@/hooks/useListings";
import {
  MapPin,
  Phone,
  Mail,
  Bed,
  Bath,
  Calendar,
  Gauge,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getImageUrl } from "@/lib/cdn";
import logoNavbar from "@/images/akinmobiliaria.webp";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Listing | null | undefined>(
    undefined // undefined: loading, null: not found
  );
  const [relatedListings, setRelatedListings] = useState<Listing[]>([]);

  useEffect(() => {
    const findListing = async () => {
      if (!id) {
        setItem(null);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("listings")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setItem(data as Listing);

        // Buscar listados relacionados de la misma categoría
        const { data: relatedData } = await supabase
          .from("listings")
          .select("*")
          .eq("category", data.category)
          .neq("id", id)
          .limit(3);

        setRelatedListings((relatedData as Listing[]) || []);
      } catch (error) {
        console.error("Error fetching listing:", error);
        setItem(null); // No encontrado
      }
    };

    findListing();
  }, [id]);

  // Estado de carga inicial
  if (item === undefined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-6"></div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Buscando publicación...
        </h2>
      </div>
    );
  }

  // Estado de no encontrado
  if (item === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Publicación no encontrada
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          La publicación que buscas no existe o el enlace es incorrecto.
        </p>
        <Link to="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `¡Hola! Estoy interesado en "${item.title}" publicado por ${item.price} ${item.currency}. ¿Podrían brindarme más información?`
    );
    window.open(`https://wa.me/+5493755200964?text=${message}`, "_blank");
  };

  const handleEmailContact = () => {
    const subject = encodeURIComponent(`Consulta sobre ${item.title}`);
    const body = encodeURIComponent(
      `Hola,\n\nEstoy interesado en "${item.title}" publicado por ${item.price} ${item.currency}.\n\n¿Podrían brindarme más información?\n\n¡Gracias!`
    );
    window.open(
      `mailto:infoakmisiones@gmail.com?subject=${subject}&body=${body}`
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Mirá este listado de ${item.category.toLowerCase()}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("¡Enlace copiado al portapapeles!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Botón Volver */}
        <div className="mb-6">
          <Link to="/">
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 hover:bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2 !hover:bg-none" />
              Volver a los listados
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galería de imágenes con carousel */}
            <Card className="!border-none">
              <CardContent className="p-0">
                <div className="relative">
                  {item.image_urls && item.image_urls.length > 1 ? (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {item.image_urls.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="relative">
                              <img
                                src={getImageUrl(image)}
                                alt={`${item.title} - Imagen ${index + 1}`}
                                loading="lazy"
                                className="fade-in-img w-full h-96 object-cover rounded-t-lg"
                                onLoad={(e) =>
                                  e.currentTarget.classList.add("loaded")
                                }
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4 bg-slate-100 hover:bg-slate-300" />
                      <CarouselNext className="right-4 bg-slate-100 hover:bg-slate-300" />
                    </Carousel>
                  ) : (
                    <div className="relative">
                      <img
                        src={getImageUrl(
                          item.image_urls && item.image_urls.length > 0
                            ? item.image_urls[0]
                            : ""
                        )}
                        alt={item.title}
                        loading="lazy"
                        className="fade-in-img w-full h-96 object-cover rounded-t-lg"
                        onLoad={(e) => e.currentTarget.classList.add("loaded")}
                      />

                      {/* Estado */}
                      {item.status !== "available" && (
                        <div className="absolute top-4 left-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              item.status === "pending"
                                ? "bg-yellow-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {item.status === "pending"
                              ? "Pendiente"
                              : "Vendido"}
                          </span>
                        </div>
                      )}

                      {/* Destacado */}
                      {item.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Destacado
                          </span>
                        </div>
                      )}

                      {/* Compartir */}
                      <button
                        onClick={handleShare}
                        className="absolute bottom-4 right-4 bg-white text-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-50"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detalles */}
            <Card className="!border-none">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Encabezado */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                          {item.title}
                        </h1>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-5 h-5 mr-2" />
                          {item.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">
                          {formatPrice(item.price)} {item.currency}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Publicado:
                          {new Date(item.created_at).toLocaleDateString(
                            "es-AR"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detalles clave */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-200">
                    {item.bedrooms && (
                      <div className="text-center">
                        <Bed className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="font-semibold">{item.bedrooms}</p>
                        <p className="text-sm text-gray-500">Habitaciones</p>
                      </div>
                    )}
                    {item.bathrooms && (
                      <div className="text-center">
                        <Bath className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="font-semibold">{item.bathrooms}</p>
                        <p className="text-sm text-gray-500">Baños</p>
                      </div>
                    )}
                    {(item.year || item.year_built) && (
                      <div className="text-center">
                        <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="font-semibold">
                          {item.year || item.year_built}
                        </p>
                        <p className="text-sm text-gray-500">Año</p>
                      </div>
                    )}
                    {item.mileage && (
                      <div className="text-center">
                        <Gauge className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="font-semibold">{item.mileage} km</p>
                        <p className="text-sm text-gray-500">Kilometraje</p>
                      </div>
                    )}
                  </div>

                  {/* Descripción */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      Descripción
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description || "No hay descripción disponible."}
                    </p>
                  </div>

                  {/* Detalles adicionales */}
                  {(item.area ||
                    item.transmission ||
                    item.make ||
                    item.model ||
                    item.condition) && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-3">
                        Detalles adicionales
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.area && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-semibold">Superficie</span>
                            <span>{item.area} m²</span>
                          </div>
                        )}
                        {item.transmission && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-semibold">Transmisión</span>
                            <span>{item.transmission}</span>
                          </div>
                        )}
                        {item.make && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-semibold">Marca</span>
                            <span>{item.make}</span>
                          </div>
                        )}
                        {item.model && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-semibold">Modelo</span>
                            <span>{item.model}</span>
                          </div>
                        )}
                        {item.condition && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-semibold">Condición</span>
                            <span>{item.condition}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Barra lateral */}
          <div className="space-y-6">
            {/* Contacto */}
            <Card className="!border-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Contacto
                </h3>
                <div className="space-y-4">
                  <Button
                    onClick={handleWhatsAppContact}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp: (3755) 20-0964
                  </Button>

                  <Button
                    onClick={handleEmailContact}
                    variant="border"
                    className="w-full hover:bg-transparent"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar consulta por correo
                  </Button>

                  <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">
                      Respondemos todas las consultas en menos de 24 horas
                    </p>
                    <div className="text-xs text-gray-500">
                      <p>Horarios de atención:</p>
                      <p>Lun-Vie: 9:00-18:00</p>
                      <p>Sáb: 9:00-16:00</p>
                      <p>WhatsApp: Disponible 24/7</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agente */}
            <Card className="!border-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Tu agente
                </h3>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={logoNavbar}
                    alt="Andrés P"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">Andrés P</h4>
                    <p className="text-sm text-gray-600">
                      Propietario y agente matriculado
                    </p>
                    <p className="text-sm text-gray-500">
                      Más de 15 años de experiencia
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  "Verifico personalmente cada publicación y brindo un servicio
                  honesto y transparente para ayudarte a encontrar exactamente
                  lo que buscas."
                </p>
                <Button
                  onClick={handleWhatsAppContact}
                  variant="border"
                  className="w-full"
                >
                  Contactar a Andrés directamente
                </Button>
              </CardContent>
            </Card>

            {/* Listados similares */}
            <Card className="!border-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Listados similares
                </h3>
                {relatedListings.length > 0 ? (
                  <div className="space-y-4">
                    {relatedListings.map((similar) => (
                      <Link
                        key={similar.id}
                        to={`/property/${similar.id}`}
                        className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
                      >
                        <div className="flex space-x-3">
                          <img
                            src={getImageUrl(
                              similar.image_urls &&
                                similar.image_urls.length > 0
                                ? similar.image_urls[0]
                                : ""
                            )}
                            alt={similar.title}
                            loading="lazy"
                            className="fade-in-img w-16 h-16 object-cover rounded-lg"
                            onLoad={(e) =>
                              e.currentTarget.classList.add("loaded")
                            }
                          />
                          <div>
                            <h4 className="font-semibold text-gray-800 truncate">
                              {similar.title}
                            </h4>
                            <p className="text-sm text-blue-600 font-bold">
                              {formatPrice(similar.price)} {similar.currency}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm">
                      No hay artículos relacionados disponibles en este momento.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
