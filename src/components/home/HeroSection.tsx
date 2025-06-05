
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Quality Properties & Vehicles for Sale
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Find exactly what you're looking for - from dream homes to reliable vehicles, we have quality options waiting for you
        </p>

        {/* Compelling Message */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-xl p-8 max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Your next purchase is just a click away
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Browse our carefully selected properties and vehicles, each personally verified for quality and value
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/category/properties">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Browse Properties
              </Button>
            </Link>
            <Link to="/category/vehicles">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                View Vehicles
              </Button>
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <Button
            onClick={() => window.open('https://wa.me/15551234567', '_blank')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
          >
            WhatsApp: (555) 123-4567
          </Button>
          <div className="text-lg">
            <span className="opacity-75">or email:</span> info@marketplace.com
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
