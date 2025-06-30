import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useListings, Listing, CreateListingData } from "@/hooks/useListings";
import ImageUpload from "./ImageUpload";

const AddListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { createListing, updateListing, listings } = useListings();
  const imageUploadRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    currency: "ARS", // Add new currency field, default to ARS
    location: "",
    description: "",
    status: "available",
    featured: true,
    // Property fields
    bedrooms: "",
    bathrooms: "",
    area: "",
    year_built: "",
    // Vehicle fields
    make: "",
    model: "",
    year: "",
    mileage: "",
    transmission: "",
    condition: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      const listing = listings.find((l) => l.id === id);
      if (listing) {
        setFormData({
          title: listing.title,
          category: listing.category,
          price: listing.price.toString(),
          currency: listing.currency || "ARS", // Load existing currency or default
          location: listing.location,
          description: listing.description || "",
          status: listing.status,
          featured: listing.featured,
          bedrooms: listing.bedrooms?.toString() || "",
          bathrooms: listing.bathrooms?.toString() || "",
          area: listing.area?.toString() || "",
          year_built: listing.year_built?.toString() || "",
          make: listing.make || "",
          model: listing.model || "",
          year: listing.year?.toString() || "",
          mileage: listing.mileage?.toString() || "",
          transmission: listing.transmission || "",
          condition: listing.condition || "",
        });
        setImages(listing.image_urls || []);
      }
    }
  }, [isEditing, id, listings]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImagesUploaded = (newUrls: string[]) => {
    setImages((prev) => [...prev, ...newUrls]);
  };

  const handleImageRemoved = (url: string) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title.trim()) {
      alert("El título es requerido");
      return;
    }
    if (!formData.category) {
      alert("La categoría es requerida");
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert("El precio es requerido y debe ser mayor a 0");
      return;
    }
    if (!formData.location.trim()) {
      alert("La ubicación es requerida");
      return;
    }
    // Currency is now required too
    if (!formData.currency) {
      alert("La moneda es requerida");
      return;
    }

    setSubmitting(true);
    try {
      // SUBIDA DIFERIDA DE IMÁGENES
      let uploadedImageUrls: string[] = [];
      if (
        imageUploadRef.current &&
        imageUploadRef.current.uploadPendingImages
      ) {
        uploadedImageUrls = await imageUploadRef.current.uploadPendingImages();
      }
      // Combina imágenes ya existentes y nuevas
      const allImages = [...images, ...uploadedImageUrls];

      if (isEditing) {
        // For updates, use Partial<Listing>
        const updateData: Partial<Listing> = {
          title: formData.title.trim(),
          category: formData.category,
          price: parseFloat(formData.price),
          currency: formData.currency, // Include currency in update
          location: formData.location.trim(),
          description: formData.description.trim(),
          status: formData.status as any,
          featured: formData.featured,
          image_urls: allImages,
        };

        // Add category-specific fields
        if (formData.category === "properties") {
          if (formData.bedrooms)
            updateData.bedrooms = parseInt(formData.bedrooms);
          if (formData.bathrooms)
            updateData.bathrooms = parseInt(formData.bathrooms);
          if (formData.area) updateData.area = parseFloat(formData.area);
          if (formData.year_built)
            updateData.year_built = parseInt(formData.year_built);
        }

        if (formData.category === "vehicles") {
          if (formData.make) updateData.make = formData.make;
          if (formData.model) updateData.model = formData.model;
          if (formData.year) updateData.year = parseInt(formData.year);
          if (formData.mileage) updateData.mileage = parseInt(formData.mileage);
          if (formData.transmission)
            updateData.transmission = formData.transmission;
          if (formData.condition) updateData.condition = formData.condition;
        }

        const success = await updateListing(id!, updateData);
        if (success) {
          navigate("/admin/listings");
        }
      } else {
        // For creation, construct CreateListingData with all required fields
        const createData: CreateListingData = {
          title: formData.title.trim(),
          description: formData.description.trim(),
          category: formData.category,
          price: parseFloat(formData.price),
          currency: formData.currency, // Include currency in creation
          location: formData.location.trim(),
          status: formData.status as any,
          featured: formData.featured,
          image_urls: allImages,
        };

        // Add category-specific fields
        if (formData.category === "properties") {
          if (formData.bedrooms)
            createData.bedrooms = parseInt(formData.bedrooms);
          if (formData.bathrooms)
            createData.bathrooms = parseInt(formData.bathrooms);
          if (formData.area) createData.area = parseFloat(formData.area);
          if (formData.year_built)
            createData.year_built = parseInt(formData.year_built);
        }

        if (formData.category === "vehicles") {
          if (formData.make) createData.make = formData.make;
          if (formData.model) createData.model = formData.model;
          if (formData.year) createData.year = parseInt(formData.year);
          if (formData.mileage) createData.mileage = parseInt(formData.mileage);
          if (formData.transmission)
            createData.transmission = formData.transmission;
          if (formData.condition) createData.condition = formData.condition;
        }

        const success = await createListing(createData);
        if (success) {
          navigate("/admin/listings");
        }
      }
    } catch (error) {
      console.error("Error submitting listing:", error);
      alert("Error al procesar la publicación. Por favor intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const isPropertyCategory = formData.category === "properties";
  const isVehicleCategory = formData.category === "vehicles";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? "Editar publicación" : "Agregar nueva publicación"}
        </h2>
        <p className="text-gray-600">
          {isEditing
            ? "Modifica los detalles de tu publicación"
            : "Crea una nueva publicación para el marketplace"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Categoría *
            </label>
            <select
              className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              required
            >
              <option value="">Seleccionar categoría</option>
              <option value="properties">Propiedades</option>
              <option value="vehicles">Vehículos</option>
              <option value="equipment">Maquinaria</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Precio *
            </label>
            <div className="flex">
              <input
                type="number"
                className="w-full px-4 py-2 border border-dark-charcoal rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="Ej: 15000000"
                required
                min={0}
              />
              <select
                className="px-4 py-2 border border-l-0 border-dark-charcoal rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
                required
              >
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Título *
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Ej: Departamento en el centro"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Ubicación *
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="Ej: Av. Corrientes 1234, CABA"
              required
            />
          </div>
        </div>

        {isPropertyCategory && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Detalles de la Propiedad
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Dormitorios
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    handleInputChange("bedrooms", e.target.value)
                  }
                  placeholder="Ej: 3"
                  min={0}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Baños
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.bathrooms}
                  onChange={(e) =>
                    handleInputChange("bathrooms", e.target.value)
                  }
                  placeholder="Ej: 2"
                  min={0}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Superficie cubierta (m²)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  placeholder="Ej: 80"
                  min={0}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Año de construcción
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.year_built}
                  onChange={(e) =>
                    handleInputChange("year_built", e.target.value)
                  }
                  placeholder="Ej: 2010"
                  min={1800}
                  max={new Date().getFullYear()}
                />
              </div>
            </div>
          </div>
        )}

        {isVehicleCategory && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Detalles del Vehículo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Marca
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.make}
                  onChange={(e) => handleInputChange("make", e.target.value)}
                  placeholder="Ej: Toyota"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Modelo
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  placeholder="Ej: Corolla"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Año
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  placeholder="Ej: 2020"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Kilometraje
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                  placeholder="Ej: 45000"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Transmisión
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.transmission}
                  onChange={(e) =>
                    handleInputChange("transmission", e.target.value)
                  }
                  placeholder="Ej: Manual o Automática"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Condición
                </label>
                <select
                  className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.condition}
                  onChange={(e) =>
                    handleInputChange("condition", e.target.value)
                  }
                >
                  <option value="">Seleccionar condición</option>
                  <option value="nuevo">Nuevo</option>
                  <option value="usado">Usado</option>
                  <option value="certificado">Certificado</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Descripción *
          </label>
          <textarea
            className="w-full px-4 py-2 border border-dark-charcoal rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Agrega una descripción detallada"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Imágenes
          </label>
          <ImageUpload
            ref={imageUploadRef}
            onImagesUploaded={handleImagesUploaded}
            existingImages={images}
            onImageRemoved={handleImageRemoved}
            maxImages={10}
          />
        </div>

        <div className="hidden">
          <input
            type="checkbox"
            defaultChecked={true}
            id="featured"
            checked={formData.featured}
            onChange={() => handleInputChange("featured", !formData.featured)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="featured" className="font-medium text-gray-700">
            Destacar publicación
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="border"
            onClick={() => navigate("/admin/listings")}
            disabled={submitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={submitting}
          >
            {submitting
              ? isEditing
                ? "Actualizando..."
                : "Publicando..."
              : isEditing
                ? "Actualizar publicación"
                : "Publicar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
