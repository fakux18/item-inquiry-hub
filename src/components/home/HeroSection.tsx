
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-deep-blue min-h-[600px] flex items-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/90 to-deep-blue/70"></div>
      
      {/* Content */}
      <div className="relative container-custom py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Premium Properties & Vehicles
            <span className="block text-golden-yellow">Marketplace</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-light-gray mb-8 max-w-3xl mx-auto leading-relaxed">
            Find exactly what you're looking for - from dream homes to reliable vehicles, 
            we have quality options waiting for you
          </p>

          {/* Compelling Message Box */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto mb-10 border border-white/20">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Your next purchase is just a click away
            </h2>
            <p className="text-lg md:text-xl text-light-gray mb-8 leading-relaxed">
              Browse our carefully selected properties and vehicles, each personally verified for quality and value
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/category/properties">
                <Button className="btn-primary text-lg px-8 py-4 min-w-[200px]">
                  Browse Properties
                </Button>
              </Link>
              <Link to="/category/vehicles">
                <Button className="btn-secondary bg-golden-yellow text-dark-charcoal hover:bg-golden-yellow/90 text-lg px-8 py-4 min-w-[200px] border-golden-yellow">
                  View Vehicles
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <Button
              onClick={() => window.open('https://wa.me/15551234567', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg transition-all duration-200"
            >
              WhatsApp: (555) 123-4567
            </Button>
            <div className="text-lg text-light-gray">
              <span className="opacity-75">or email:</span> 
              <a 
                href="mailto:info@marketplace.com" 
                className="text-golden-yellow hover:text-golden-yellow/80 transition-colors ml-2 font-medium"
              >
                info@marketplace.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
