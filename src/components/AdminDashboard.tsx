
import { Link } from 'react-router-dom';
import { Eye, MessageCircle, TrendingUp, Plus, List, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockListings, adminStats } from '../data/mockData';
import { usePublicListings } from "@/hooks/usePublicListings";


const AdminDashboard = () => {
  const {listings} = usePublicListings( {
    limit: 3,
  })

  const handleLogout = () => {
    // Implement logout functionality
    window.location.href = '/admin/login';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-deep-blue/90 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold text-slate-200 mb-2">¡Bienvenido de nuevo, Admin!</h1>
        <p className="text-light-gray text-lg">
          Aquí está lo que está pasando con tu marketplace hoy.
        </p>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white shadow-card border-0">
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

        <Card className="bg-white shadow-card border-0">
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

        <Card className="bg-white shadow-card border-0">
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

        <Card className="bg-white shadow-card border-0">
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
      </div> */}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-card border-0 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="flex items-center text-dark-charcoal">
              <Plus className="w-5 h-5 mr-2" />
              <h2 className='text-lg'>Agregar Nuevo Listado</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-mid-gray-blue mb-4">
              Añade rápidamente un nuevo producto al listado de tu marketplace.
            </p>
            <Link to="/admin/listings/add">
              <Button className="w-full bg-deep-blue hover:bg-deep-blue/90 text-white border-0">
                Crear Listado
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white flex flex-col justify-between shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-dark-charcoal">
              <List className="w-5 h-5 mr-2" />
              <h2 className='text-lg'>Gestionar Listados</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-mid-gray-blue mb-4">
              Verificar, editar o eliminar listados existentes de tu marketplace.
            </p>
            <Link to="/admin/listings">
              <Button className="w-full bg-white border border-mid-gray-blue text-dark-charcoal hover:bg-slate-200">
                Ver Todos los Listados
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* <Card className="bg-white shadow-card border-0 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="flex items-center text-dark-charcoal">
              <MessageCircle className="w-5 h-5 mr-2" />
              <h2 className='text-lg'>Revisar Mensajes</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-mid-gray-blue mb-4">
              Revisa y responde a consultas de clientes y formularios de contacto.
            </p>
            <Button className="w-full bg-white border border-mid-gray-blue text-dark-charcoal hover:bg-slate-200">
              Ver Mensajes
            </Button>
          </CardContent>
        </Card> */}
      </div>

      {/* Recent Listings */}
      <Card className="bg-white shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-dark-charcoal">Listados Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-6 md:grid-cols-1">
            {listings.map((listing) => (
              <div key={listing.id} className="flex flex-col md:flex-row items-center justify-between p-4 rounded-lg bg-slate-200/30 gap-4">
                <div className="flex flex-col md:flex-row items-center !m-0 gap-4">
                  <img
                    src={listing.image_urls[0]}
                    alt={listing.title}
                    className="w-44 h-44 md:h-24 md:w-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-center uppercase md:text-left text-base md:text-lg text-dark-charcoal">{listing.title}</h3>
                    <p className="text-sm text-center md:text-left text-mid-gray-blue">
                      {listing.currency} • ${listing.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-center md:text-left text-mid-gray-blue">
                      Publicado {listing.created_at.slice(0,10)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col-reverse gap-3 items-center space-x-2">
                  <span className={`px-8 py-1 rounded-full text-xs font-medium uppercase ${
                    listing.status === 'available' ? 'bg-green-100 text-green-700' :
                    listing.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {listing.status === 'available' ? 'disponible' : 
                     listing.status === 'pending' ? 'pendiente' : 'vendido'}
                  </span>
                  <Link to={`/admin/listings/edit/${listing.id}`} className='w-full'>
                    <Button className="bg-white border w-full border-mid-gray-blue text-dark-charcoal hover:bg-slate-200 text-sm px-3 py-1 !m-0">
                      Editar
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/admin/listings">
              <Button className="bg-white border border-mid-gray-blue text-dark-charcoal hover:bg-slate-200">
                Ver Todos los Listados
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white hover:bg-slate-200 text-dark-charcoal border border-dark-charcoal font-medium px-6 py-3 rounded-lg transition-all duration-200 max-w-[180px] text-sm h-full"
        >
          Ver Sitio
        </a>
        
        <Button
          onClick={handleLogout}
          className="bg-white hover:bg-slate-200 text-dark-charcoal border border-dark-charcoal font-medium px-6 py-3 rounded-lg transition-all duration-200 max-w-[180px] text-sm h-full"
        >
          Cerrar Sesión
        </Button>
        
        {/* <Button className="bg-white hover:bg-slate-200 text-dark-charcoal border border-dark-charcoal font-medium px-6 py-3 rounded-lg transition-all duration-200 max-w-[180px] text-sm h-full">
          <Settings className="w-4 h-4 mr-2" />
          Configuración
        </Button> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
