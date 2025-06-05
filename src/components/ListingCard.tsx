
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
    <div className="card-elevated overflow-hidden group animate-fade-in">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            compact ? 'h-48' : 'h-64'
          }`}
        />
        
        {/* Status Badge */}
        {listing.status !== 'available' && (
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
              listing.status === 'pending' 
                ? 'bg-golden-yellow text-dark-charcoal' 
                : 'bg-red-500 text-white'
            }`}>
              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {listing.featured && (
          <div className="absolute top-4 right-4">
            <span className="badge-featured shadow-md">
              Featured
            </span>
          </div>
        )}

        {/* Price Overlay */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-deep-blue text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
            {formatPrice(listing.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-dark-charcoal mb-2 line-clamp-2 group-hover:text-deep-blue transition-colors">
              {listing.title}
            </h3>
            <div className="flex items-center text-secondary text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {listing.location}
            </div>
          </div>
          <span className="bg-light-gray text-mid-gray-blue px-3 py-1 rounded-full text-xs font-medium ml-2">
            {listing.category}
          </span>
        </div>

        {/* Key Details */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-secondary">
          {listing.details.bedrooms && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1 text-deep-blue" />
              {listing.details.bedrooms} bed
            </div>
          )}
          {listing.details.bathrooms && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1 text-deep-blue" />
              {listing.details.bathrooms} bath
            </div>
          )}
          {listing.details.year && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-deep-blue" />
              {listing.details.year}
            </div>
          )}
          {listing.details.mileage && (
            <div className="flex items-center">
              <Gauge className="w-4 h-4 mr-1 text-deep-blue" />
              {listing.details.mileage.toLocaleString()} mi
            </div>
          )}
        </div>

        {/* Description */}
        {!compact && (
          <p className="text-secondary text-sm mb-6 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <div className="flex space-x-2">
            <Button
              onClick={handleWhatsAppContact}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 text-sm rounded-lg transition-colors duration-200"
            >
              <Phone className="w-4 h-4 mr-1" />
              WhatsApp
            </Button>
            <Button
              onClick={handleEmailContact}
              className="flex-1 btn-secondary py-2 text-sm"
            >
              <Mail className="w-4 h-4 mr-1" />
              Email
            </Button>
          </div>
          
          <Link to={`/property/${listing.id}`}>
            <Button className="w-full btn-primary py-2 text-sm">
              View Details →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
