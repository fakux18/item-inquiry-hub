
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const WhyChooseUs = () => {
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Why Choose Our Marketplace
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">15+</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Years Experience</h3>
              <p className="text-gray-600">Trusted expertise in local market</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600">Every listing personally verified</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">24h</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-600">Personal attention to every inquiry</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <img
                src="/placeholder.svg"
                alt="John Smith - Owner"
                className="w-24 h-24 rounded-full"
              />
              <div className="text-left">
                <h4 className="text-xl font-semibold mb-2">John Smith, Owner</h4>
                <p className="text-gray-600 mb-4">
                  "With over 15 years in the local market, I personally ensure every listing meets our high standards. 
                  Your satisfaction is my guarantee."
                </p>
                <div className="flex space-x-4">
                  <Button
                    onClick={() => window.open('https://wa.me/15551234567', '_blank')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    WhatsApp Me
                  </Button>
                  <Link to="/contact">
                    <Button variant="outline">
                      Send Email
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
