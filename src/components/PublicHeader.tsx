import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoNavbar from "../images/akinmobiliaria.png"

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchTerm)}`);
    }
  };

//   const [count, setCount] = useState(0);
//   const palAdmin = useNavigate()

//   const handleClick = () => {
//     const newCount = count + 1
//     if (newCount === 5) {
//       palAdmin('/admin/login')
//       setCount(0)
//     } else {
//       setCount(newCount)
//   }
// }

  return (
    <header className="bg-deep-blue shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        {/* Barra superior */}
        <div className="py-3 text-sm border-b flex items-center justify-between border-mid-gray-blue/30">
          <div className="flex flex-col gap-2 items-center lg:items-start">
            <a
              href="tel:+15551234567"
              className="flex items-center text-light-gray hover:text-golden-yellow transition-colors group"
            >
              <Phone className="w-4 h-4 mr-2 group-hover:text-golden-yellow" />
              (555) 123-4567
            </a>
            <a
              href="mailto:info@marketplace.com"
              className="flex items-center gap-2 !ml-0 text-light-gray hover:text-golden-yellow transition-colors group"
            >
              <Mail className="w-4 h-4 group-hover:text-golden-yellow" />
              infoakmisiones@gmail.com
            </a>
          </div>
          <div>
            <Link className="text-light-gray hover:text-golden-yellow" to="/admin/login">Admin Login</Link>
          </div>

        </div>
        {/* Encabezado principal */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to='/' className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-terracotta rounded-lg flex overflow-hidden items-center justify-center shadow-md">
              {/* <span className="text-white font-bold text-xl">M</span> */}
              <img src={logoNavbar} alt="" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MarketPlace</h1>
              <p className="text-xs text-light-gray">
                Propiedades y Vehículos Premium
              </p>
            </div>
          </Link>
          {/* Navegación - Escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-golden-yellow font-medium transition-colors relative group"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/category/properties"
              className="text-white hover:text-golden-yellow font-medium transition-colors relative group"
            >
              Propiedades
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/category/vehicles"
              className="text-white hover:text-golden-yellow font-medium transition-colors relative group"
            >
              Vehículos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-golden-yellow font-medium transition-colors relative group"
            >
              Contacto
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          {/* Buscador y contacto */}
          <div className="hidden lg:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar propiedades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-white border-0 rounded-lg focus:ring-2 focus:ring-golden-yellow text-dark-charcoal placeholder-mid-gray-blue"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-mid-gray-blue" />
            </form>
            <Button
              onClick={() => window.open("https://wa.me/15551234567", "_blank")}
              className="bg-[#16a34a] hover:bg-[#15803d]"
            >
              WhatsApp
            </Button>
          </div>
          {/* Botón menú móvil */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-golden-yellow transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-mid-gray-blue/30">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-white hover:text-golden-yellow font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/category/properties"
                className="text-white hover:text-golden-yellow font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Propiedades
              </Link>
              <Link
                to="/category/vehicles"
                className="text-white hover:text-golden-yellow font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Vehículos
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-golden-yellow font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="h-px bg-mid-gray-blue/30 my-4"></div>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Buscar propiedades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border-0 rounded-lg focus:ring-2 focus:ring-golden-yellow text-dark-charcoal placeholder-mid-gray-blue"
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-mid-gray-blue" />
              </form>
              <Button
                onClick={() =>
                  window.open("https://wa.me/15551234567", "_blank")
                }
                className="btn-primary w-full"
              >
                Contacto WhatsApp
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;
