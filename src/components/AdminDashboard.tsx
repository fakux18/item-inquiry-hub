
import { Link } from 'react-router-dom';
import { Eye, MessageCircle, TrendingUp, Plus, List, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockListings, adminStats } from '../data/mockData';

const AdminDashboard = () => {
  const recentListings = mockListings.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-deep-blue to-deep-blue/90 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">¡Bienvenido de nuevo, Admin!</h1>
        <p className="text-light-gray text-lg">
          Aquí está lo que está pasando con tu marketplace hoy.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-dark-charcoal">Total de Listados</CardTitle>
            <List className="h-4 w-4 text-mid-gray-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dark-charcoal">{adminStats.totalListings}</div>
            <p className="text-xs text-mid-gray-blue">
              Listados activos en tu sitio
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-dark-charcoal">Consultas Esta Semana</CardTitle>
            <MessageCircle className="h-4 w-4 text-mid-gray-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dark-charcoal">{adminStats.inquiriesThisWeek}</div>
            <p className="text-xs text-mid-gray-blue">
              +12% desde la semana pasada
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-dark-charcoal">Artículo Más Visto</CardTitle>
            <Eye className="h-4 w-4 text-mid-gray-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dark-charcoal">{adminStats.mostViewed.viewCount}</div>
            <p className="text-xs text-mid-gray-blue">
              {adminStats.mostViewed.title.substring(0, 30)}...
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-dark-charcoal">Contactos Recientes</CardTitle>
            <TrendingUp className="h-4 w-4 text-mid-gray-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dark-charcoal">{adminStats.recentContacts}</div>
            <p className="text-xs text-mid-gray-blue">
              Esperando respuesta
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-dark-charcoal">
              <Plus className="w-5 h-5 mr-2" />
              Agregar Nuevo Listado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-mid-gray-blue mb-4">
              Añade rápidamente una nueva propiedad o vehículo a tu marketplace.
            </p>
            <Link to="/admin/listings/add">
              <Button className="w-full bg-deep-blue hover:bg-deep-blue/90 text-white">
                Crear Listado
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-dark-charcoal">
              <List className="w-5 h-5 mr-2" />
              Gestionar Listados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-mid-gray-blue mb-4">
              Ver, editar o eliminar listados existentes de tu marketplace.
            </p>
            <Link to="/admin/listings">
              <Button variant="outline" className="w-full border-mid-gray-blue text-dark-charcoal hover:bg-light-gray">
                Ver Todos los Listados
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-dark-charcoal">
              <MessageCircle className="w-5 h-5 mr-2" />
              Revisar Mensajes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-mid-gray-blue mb-4">
              Revisa y responde a consultas de clientes y formularios de contacto.
            </p>
            <Button variant="outline" className="w-full border-mid-gray-blue text-dark-charcoal hover:bg-light-gray">
              Ver Mensajes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Listings */}
      <Card className="bg-white shadow-card">
        <CardHeader>
          <CardTitle className="text-dark-charcoal">Listados Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentListings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between p-4 rounded-lg bg-light-gray/50">
                <div className="flex items-center space-x-4">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-dark-charcoal">{listing.title}</h3>
                    <p className="text-sm text-mid-gray-blue">
                      {listing.category} • ${listing.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-mid-gray-blue">
                      Publicado {listing.datePosted} • {listing.viewCount} vistas
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    listing.status === 'available' ? 'bg-green-100 text-green-700' :
                    listing.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {listing.status === 'available' ? 'disponible' : 
                     listing.status === 'pending' ? 'pendiente' : 'vendido'}
                  </span>
                  <Button variant="ghost" size="sm" className="text-dark-charcoal hover:bg-light-gray">
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/admin/listings">
              <Button variant="outline" className="border-mid-gray-blue text-dark-charcoal hover:bg-light-gray">
                Ver Todos los Listados
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* View Website Button */}
      <div className="flex justify-center">
        <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-white hover:bg-terracotta hover:text-white text-dark-charcoal border border-terracotta font-medium px-8 py-3 rounded-lg transition-all duration-200 max-w-[200px]"
        >
          Ver Sitio Web
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;
