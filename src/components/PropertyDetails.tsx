import { useParams, Link } from "react-router-dom";
import logoNavbar from "../images/akinmobiliaria.webp"
import { useEffect, useState } from "react";
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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Listing } from "@/hooks/useListings";
import { useListingsStore } from "@/stores/useListingsStore";


const PropertyDetails = () => {
  const {lista}= useListingsStore()
  const { id } = useParams();
  // const [lista[item], setListing] = useState<Listing | null>(null);
  const item = lista.findIndex(i => i.id == id)
  const filterCategory = lista.filter(i => i.category == lista[item].category)
  const rel = filterCategory.filter(i => i.id !== lista[item].id)
  // setRelatedListings(rel)
  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `¡Hola! Estoy interesado en "${lista[item].title}" publicado por ${lista[item].price} ${lista[item].currency}. ¿Podrían brindarme más información?`
    );
    window.open(`https://wa.me/+5493755200964?text=${message}`, '_blank');
  };

  const handleEmailContact = () => {
    const subject = encodeURIComponent(`Consulta sobre ${lista[item].title}`);
    const body = encodeURIComponent(
      `Hola,\n\nEstoy interesado en "${lista[item].title}" publicado por ${(lista[item].price)} ${(lista[item].currency)}.\n\n¿Podrían brindarme más información?\n\n¡Gracias!`
    );
    window.open(`mailto:infoakmisiones@gmail.com?subject=${subject}&body=${body}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lista[item].title,
        text: `Mirá este listado de ${lista[item].category.toLowerCase()}`,
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
                  {lista[item].image_urls && lista[item].image_urls.length > 1 ? (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {lista[item].image_urls.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="relative">
                              <img
                                src={image + '?v=1'}
                                alt={`${lista[item].title} ${index + 1}`}
                                className="w-full h-96 object-cover rounded-t-lg"
                              />
                              
                              {/* Estado */}
                              {lista[item].status !== "available" && index === 0 && (
                                <div className="absolute top-4 left-4">
                                  <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                      lista[item].status === "pending"
                                        ? "bg-yellow-500 text-white"
                                        : "bg-red-500 text-white"
                                    }`}
                                  >
                                    {lista[item].status === "pending" ? "Pendiente" : "Vendido"}
                                  </span>
                                </div>
                              )}

                              {/* Destacado */}
                              {lista[item].featured && index === 0 && (
                                <div className="absolute top-4 right-4">
                                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    Destacado
                                  </span>
                                </div>
                              )}

                              {/* Compartir */}
                              {index === 0 && (
                                <button
                                  onClick={handleShare}
                                  className="absolute bottom-4 right-4 bg-white text-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-50"
                                >
                                  <Share2 className="w-5 h-5" />
                                </button>
                              )}
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
                        src={lista[item].image_urls && lista[item].image_urls.length > 0 ? lista[item].image_urls[0] : "/placeholder.svg"}
                        alt={lista[item].title}
                        className="w-full h-96 object-cover rounded-t-lg"
                      />

                      {/* Estado */}
                      {lista[item].status !== "available" && (
                        <div className="absolute top-4 left-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              lista[item].status === "pending"
                                ? "bg-yellow-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {lista[item].status === "pending" ? "Pendiente" : "Vendido"}
                          </span>
                        </div>
                      )}

                      {/* Destacado */}
                      {lista[item].featured && (
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
                          {lista[item].title}
                        </h1>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-5 h-5 mr-2" />
                          {lista[item].location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">
                          {formatPrice(lista[item].price)} {lista[item].currency}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Publicado: {new Date(lista[item].created_at).toLocaleDateString('es-AR')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detalles clave */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-200">
                    {lista[item].bedrooms && (
                      <div className="text-center">
                        <Bed className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="font-semibold">{lista[item].bedrooms}</div>
                        <div className="text-sm text-gray-500">Habitaciones</div>
                      </div>
                    )}
                    {lista[item].bathrooms && (
                      <div className="text-center">
                        <Bath className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="font-semibold">{lista[item].bathrooms}</div>
                        <div className="text-sm text-gray-500">Baños</div>
                      </div>
                    )}
                    {(lista[item].year || lista[item].year_built) && (
                      <div className="text-center">
                        <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="font-semibold">{lista[item].year || lista[item].year_built}</div>
                        <div className="text-sm text-gray-500">Año</div>
                      </div>
                    )}
                    {lista[item].mileage && (
                      <div className="text-center">
                        <Gauge className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="font-semibold">{lista[item].mileage.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Kilómetros</div>
                      </div>
                    )}
                  </div>

                  {/* Descripción */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      Descripción
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {lista[item].description || "No hay descripción disponible."}
                    </p>
                  </div>

                  {/* Detalles adicionales */}
                  {(lista[item].area || lista[item].transmission || lista[item].make || lista[item].model || lista[item].condition) && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-3">
                        Detalles adicionales
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lista[item].area && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">Superficie:</span>
                            <span className="font-medium">{lista[item].area.toLocaleString()} m²</span>
                          </div>
                        )}
                        {lista[item].make && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">Marca:</span>
                            <span className="font-medium">{lista[item].make}</span>
                          </div>
                        )}
                        {lista[item].model && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">Modelo:</span>
                            <span className="font-medium">{lista[item].model}</span>
                          </div>
                        )}
                        {lista[item].transmission && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">Transmisión:</span>
                            <span className="font-medium">{lista[item].transmission}</span>
                          </div>
                        )}
                        {lista[item].condition && (
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">Condición:</span>
                            <span className="font-medium">{lista[item].condition}</span>
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
                {rel.length > 0 ? (
                  <div className="space-y-4">
                    {rel.map((similar) => (
                      <Link
                        key={similar.id}
                        to={`/property/${similar.id}`}
                        className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
                      >
                        <div className="flex space-x-3">
                          <img
                            src={similar.image_urls && similar.image_urls.length > 0 ? similar.image_urls[0] : "/placeholder.svg"}
                            alt={similar.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 truncate">
                              {similar.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {similar.location}
                            </p>
                            <p className="text-sm font-semibold text-blue-600">
                              {formatPrice(similar.price)} {lista[item].currency}
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
