import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
// NO SE ESTABA USANDO ESTO XD

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Upload, X } from "lucide-react";

const AddListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "",
    price: "",
    location: "",
    description: "",
    status: "available",
    featured: false,
    // Property fields
    bedrooms: "",
    bathrooms: "",
    area: "",
    lotSize: "",
    yearBuilt: "",
    propertyType: "",
    // Vehicle fields
    make: "",
    model: "",
    year: "",
    mileage: "",
    transmission: "",
    condition: "",
    vin: "",
    doors: "",
    // OTROS PRODUCTOS
    used: false,
  });

  const [images, setImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // In a real app, you'd upload these to a server
    // For demo, we'll just use placeholder URLs
    const newImages = files.map(() => "/placeholder.svg");
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd submit this to your backend
    console.log("Submitting listing:", { ...formData, images });
    alert(
      isEditing ? "Listing updated successfully!" : "Listing created successfully!"
    );
    navigate("/admin/listings");
  };

  const isPropertyCategory = formData.category === "Properties";
  const isVehicleCategory = formData.category === "Vehicles";
  const isOtherCategory = formData.category === "Other";

  return (
    <div className="add-listing-container">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? "Editar publicación" : "Agregar nueva publicación"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Categoría</label>
            <select
              className="input"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              required
            >
              <option value="">Seleccionar categoría</option>
              <option value="Properties">Propiedades</option>
              <option value="Vehicles">Vehículos</option>
              <option value="Other">Otro</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Precio (ARS)</label>
            <input
              type="number"
              className="input"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="Ej: 15000000"
              required
              min={0}
            />
          </div>
        </div>

        {isPropertyCategory && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Título</label>
                <input
                  type="text"
                  className="input"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Ej: Departamento en el centro"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Ubicación</label>
                <input
                  type="text"
                  className="input"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Ej: Av. Corrientes 1234, CABA"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Dormitorios</label>
                <input
                  type="number"
                  className="input"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                  placeholder="Ej: 3"
                  min={0}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Baños</label>
                <input
                  type="number"
                  className="input"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                  placeholder="Ej: 2"
                  min={0}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Año de construcción</label>
                <input
                  type="number"
                  className="input"
                  value={formData.yearBuilt}
                  onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                  placeholder="Ej: 2010"
                  min={1800}
                  max={new Date().getFullYear()}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Superficie cubierta (m²)</label>
                <input
                  type="number"
                  className="input"
                  value={formData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  placeholder="Ej: 80"
                  min={0}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium">Descripción</label>
              <textarea
                className="input"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Agrega una descripción detallada"
                rows={4}
                required
              />
            </div>
          </div>
        )}

        {isVehicleCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Año</label>
              <input
                type="number"
                className="input"
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                placeholder="Ej: 2020"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Modelo</label>
              <input
                type="text"
                className="input"
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                placeholder="Ej: Corolla"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Marca</label>
              <input
                type="text"
                className="input"
                value={formData.make}
                onChange={(e) => handleInputChange("make", e.target.value)}
                placeholder="Ej: Toyota"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Kilometraje</label>
              <input
                type="number"
                className="input"
                value={formData.mileage}
                onChange={(e) => handleInputChange("mileage", e.target.value)}
                placeholder="Ej: 45000"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Transmisión</label>
              <input
                type="text"
                className="input"
                value={formData.transmission}
                onChange={(e) => handleInputChange("transmission", e.target.value)}
                placeholder="Ej: Manual o Automática"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Puertas</label>
              <input
                type="number"
                className="input"
                value={formData.doors}
                onChange={(e) => handleInputChange("doors", e.target.value)}
                placeholder="Ej: 4"
              />
            </div>
          </div>
        )}

        {isOtherCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="used"
                checked={formData.used}
                onChange={() => handleInputChange("used", !formData.used)}
              />
              <label htmlFor="used" className="font-medium">
                ¿Es usado?
              </label>
            </div>
          </div>
        )}

        <div>
          <label className="block mb-2 font-medium">Imágenes</label>
          <input
            type="file"
            className="input"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          <p className="text-xs text-gray-500 mt-1">
            Puedes subir hasta 5 imágenes. Formatos permitidos: JPG, PNG.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Imagen ${idx + 1}`}
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={() => handleInputChange("featured", !formData.featured)}
          />
          <label htmlFor="featured" className="font-medium">
            Destacar publicación
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="border"
            onClick={() => navigate("/admin/listings")}
          >
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {isEditing ? "Actualizar publicación" : "Publicar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
