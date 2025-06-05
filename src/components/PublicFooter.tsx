
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const PublicFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <h3 className="text-xl font-bold">MarketPlace</h3>
            </div>
            <p className="text-gray-300">
              Your trusted partner for quality properties and vehicles. 
              Personal service with professional results.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link to="/category/properties" className="text-gray-300 hover:text-white transition-colors">Properties</Link>
              <Link to="/category/vehicles" className="text-gray-300 hover:text-white transition-colors">Vehicles</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              <Link to="/admin/login" className="text-gray-300 hover:text-white transition-colors text-sm">Admin Login</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">123 Market Street</p>
                  <p className="text-gray-300">Your City, ST 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:info@marketplace.com" className="text-gray-300 hover:text-white transition-colors">
                  info@marketplace.com
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Business Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-300">Sat: 9:00 AM - 4:00 PM</p>
                  <p className="text-gray-300">Sun: By appointment</p>
                </div>
              </div>
            </div>
            <div className="bg-green-600 text-white p-3 rounded-lg text-center">
              <p className="font-semibold">Available via WhatsApp 24/7</p>
              <button
                onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                className="text-sm underline hover:no-underline"
              >
                (555) 123-4567
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 MarketPlace. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
