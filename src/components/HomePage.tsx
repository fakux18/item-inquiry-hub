
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, DollarSign, Home, Car, Building, Tractor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ListingCard from './ListingCard';
import { mockListings } from '../data/mockData';

const HomePage = () => {
  const featuredListings = mockListings.filter(listing => listing.featured).slice(0, 6);
  const recentListings = mockListings.slice(0, 8);

  const categories = [
    { name: 'Residential Properties', icon: Home, count: 24, path: '/category/residential' },
    { name: 'Commercial Properties', icon: Building, count: 12, path: '/category/commercial' },
    { name: 'Vehicles', icon: Car, count: 18, path: '/category/vehicles' },
    { name: 'Heavy Equipment', icon: Tractor, count: 6, path: '/category/equipment' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
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
              onClick={() => window.open('https://wa.me/1234567890', '_blank')}
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

      {/* Featured Listings */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Properties & Vehicles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hand-picked premium listings offering exceptional value and quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find exactly what you're looking for in our organized categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center group"
              >
                <category.icon className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600">
                  {category.count} available listings
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Latest Additions
          </h2>
          <p className="text-lg text-gray-600">
            Fresh listings added to our marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} compact />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/category/all">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              View All Listings
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
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
                      onClick={() => window.open('https://wa.me/1234567890', '_blank')}
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
    </div>
  );
};

export default HomePage;
