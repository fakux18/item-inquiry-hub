import { Link } from 'react-router-dom';
import { Home, Car, Tractor } from 'lucide-react';
import { useListings } from "@/hooks/useListings";

const getCategoryCounts = (listings) => {
  const counts = {};
  for (const listing of listings) {
    const category = listing.category || "category-not-found";
    if (listing.status == 'available') {
      counts[category] = (counts[category] || 0) + 1;
    }
  }
  return counts;
};

const CategorySection = () => {
  const { listings } = useListings();
  const categoryCounts = getCategoryCounts(listings);

  const categories = [
    { key: "properties", name: "Propiedades", icon: Home, path: "/category/properties" },
    { key: "vehicles", name: "Vehículos", icon: Car, path: "/category/vehicles" },
    { key: "equipment", name: "Equipo pesado", icon: Tractor, path: "/category/equipment" },
  ].map((category) => ({
    ...category,
    count: categoryCounts[category.key] || 0,
  }));

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Buscar por categoría
          </h2>
          <p className="text-lg text-gray-600">
            Encuentra exactamente lo que buscas en nuestras categorías organizadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.key}
              to={category.path}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center group"
            >
              <category.icon className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600">
                {category.count} opciones disponibles
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;