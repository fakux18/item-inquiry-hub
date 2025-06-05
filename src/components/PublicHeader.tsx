
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-deep-blue shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-3 text-sm border-b border-mid-gray-blue/30">
          <div className="flex items-center space-x-6">
            <a 
              href="tel:+15551234567" 
              className="flex items-center text-light-gray hover:text-golden-yellow transition-colors group"
            >
              <Phone className="w-4 h-4 mr-2 group-hover:text-golden-yellow" />
              (555) 123-4567
            </a>
            <a 
              href="mailto:info@marketplace.com" 
              className="flex items-center text-light-gray hover:text-golden-yellow transition-colors group"
            >
              <Mail className="w-4 h-4 mr-2 group-hover:text-golden-yellow" />
              info@marketplace.com
            </a>
          </div>
          <Link 
            to="/admin/login" 
            className="text-light-gray hover:text-golden-yellow transition-colors text-sm font-medium"
          >
            Admin Login
          </Link>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-terracotta rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MarketPlace</h1>
              <p className="text-xs text-light-gray">Premium Properties & Vehicles</p>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-golden-yellow font-medium transition-colors relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/category/properties" 
              className="text-white hover:text-golden-yellow font-medium transition-colors relative group"
            >
              Properties
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/category/vehicles" 
              className="text-white hover:text-golden-yellow font-medium transition-colors relative group"
            >
              Vehicles
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-golden-yellow font-medium transition-colors relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Search & Contact */}
          <div className="hidden lg:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-white border border-light-gray rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow text-dark-charcoal placeholder-mid-gray-blue"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-mid-gray-blue" />
            </form>
            <Button
              onClick={() => window.open('https://wa.me/15551234567', '_blank')}
              className="btn-primary"
            >
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-golden-yellow transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-mid-gray-blue/30">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-white hover:text-golden-yellow font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/category/properties" 
                className="text-white hover:text-golden-yellow font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link 
                to="/category/vehicles" 
                className="text-white hover:text-golden-yellow font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Vehicles
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:text-golden-yellow font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="divider opacity-30"></div>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-light-gray rounded-lg focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow text-dark-charcoal placeholder-mid-gray-blue"
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-mid-gray-blue" />
              </form>
              <Button
                onClick={() => window.open('https://wa.me/15551234567', '_blank')}
                className="btn-primary w-full"
              >
                WhatsApp Contact
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;
