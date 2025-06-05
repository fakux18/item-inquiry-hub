
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const PublicFooter = () => {
  return (
    <footer className="bg-dark-charcoal text-light-gray">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-terracotta rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">MarketPlace</h3>
                <p className="text-xs text-light-gray">Premium Assets</p>
              </div>
            </div>
            <p className="text-light-gray leading-relaxed">
              Your trusted partner for quality properties and vehicles. 
              Personal service with professional results for over 15 years.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-light-gray hover:text-golden-yellow transition-colors duration-200"
              >
                Facebook
              </a>
              <a 
                href="#" 
                className="text-light-gray hover:text-golden-yellow transition-colors duration-200"
              >
                Instagram
              </a>
              <a 
                href="#" 
                className="text-light-gray hover:text-golden-yellow transition-colors duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-light-gray hover:text-golden-yellow transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                to="/category/properties" 
                className="text-light-gray hover:text-golden-yellow transition-colors duration-200"
              >
                Properties
              </Link>
              <Link 
                to="/category/vehicles" 
                className="text-light-gray hover:text-golden-yellow transition-colors duration-200"
              >
                Vehicles
              </Link>
              <Link 
                to="/contact" 
                className="text-light-gray hover:text-golden-yellow transition-colors duration-200"
              >
                Contact
              </Link>
              <Link 
                to="/admin/login" 
                className="text-mid-gray-blue hover:text-golden-yellow transition-colors duration-200 text-sm"
              >
                Admin Login
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-light-gray">123 Market Street</p>
                  <p className="text-light-gray">Your City, ST 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-terracotta flex-shrink-0" />
                <a 
                  href="tel:+15551234567" 
                  className="text-light-gray hover:text-golden-yellow transition-colors duration-200"
                >
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-terracotta flex-shrink-0" />
                <a 
                  href="mailto:info@marketplace.com" 
                  className="text-light-gray hover:text-golden-yellow transition-colors duration-200"
                >
                  info@marketplace.com
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Business Hours</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-light-gray">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-light-gray">Sat: 9:00 AM - 4:00 PM</p>
                  <p className="text-light-gray">Sun: By appointment</p>
                </div>
              </div>
            </div>
            <div className="bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white p-4 rounded-lg text-center cursor-pointer"
                 onClick={() => window.open('https://wa.me/15551234567', '_blank')}>
              <p className="font-semibold">Available via WhatsApp 24/7</p>
              <p className="text-sm opacity-90 mt-1">(555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-mid-gray-blue/30 mt-12 pt-8 text-center">
          <p className="text-light-gray">
            &copy; 2024 MarketPlace. All rights reserved. | 
            <span className="hover:text-golden-yellow transition-colors duration-200 cursor-pointer"> Privacy Policy</span> | 
            <span className="hover:text-golden-yellow transition-colors duration-200 cursor-pointer"> Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
