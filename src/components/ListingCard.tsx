
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Bed, Bath, Calendar, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  category: string;
  type: string;
  images: string[];
  featured: boolean;
  status: 'available' | 'pending' | 'sold';
  details: {
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    year?: number;
    mileage?: number;
    transmission?: string;
  };
  description: string;
  datePosted: string;
}

interface ListingCardProps {
  listing: Listing;
  compact?: boolean;
}

const ListingCard = ({ listing, compact = false }: ListingCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in "${listing.title}" listed for ${formatPrice(listing.price)}. Could you provide more information?`
    );
    window.open(`https://wa.me/15551234567?text=${message}`, '_blank');
  };

  const handleEmailContact = () => {
    const subject = encodeURIComponent(`Inquiry about ${listing.title}`);
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in "${listing.title}" listed for ${formatPrice(listing.price)}.\n\nCould you please provide more information?\n\nThank you!`
    );
    window.open(`mailto:info@marketplace.com?subject=${subject}&body=${body}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            compact ? 'h-48' : 'h-64'
          }`}
        />
        
        {/* Status Badge */}
        {listing.status !== 'available' && (
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              listing.status === 'pending' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {listing.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}

        {/* Price Overlay */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
            {formatPrice(listing.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1 line-clamp-2">
              {listing.title}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {listing.location}
            </div>
          </div>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            {listing.category}
          </span>
        </div>

        {/* Key Details */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          {listing.details.bedrooms && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {listing.details.bedrooms} bed
            </div>
          )}
          {listing.details.bathrooms && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {listing.details.bathrooms} bath
            </div>
          )}
          {listing.details.year && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {listing.details.year}
            </div>
          )}
          {listing.details.mileage && (
            <div className="flex items-center">
              <Gauge className="w-4 h-4 mr-1" />
              {listing.details.mileage.toLocaleString()} mi
            </div>
          )}
        </div>

        {/* Description */}
        {!compact && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {listing.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Button
              onClick={handleWhatsAppContact}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm"
              size="sm"
            >
              <Phone className="w-4 h-4 mr-1" />
              WhatsApp
            </Button>
            <Button
              onClick={handleEmailContact}
              variant="outline"
              className="flex-1 text-sm"
              size="sm"
            >
              <Mail className="w-4 h-4 mr-1" />
              Email
            </Button>
          </div>
          
          <Link to={`/property/${listing.id}`}>
            <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 text-sm">
              View Details →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
