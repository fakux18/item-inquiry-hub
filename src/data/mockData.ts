
export interface Listing {
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
    lotSize?: string;
    propertyType?: string;
    make?: string;
    model?: string;
    condition?: string;
  };
  description: string;
  datePosted: string;
  viewCount: number;
}

export const mockListings: Listing[] = [
  // Properties
  {
    id: '1',
    title: 'Beautiful 3BR Family Home with Large Backyard',
    price: 285000,
    location: 'Westside, Springfield',
    category: 'Properties',
    type: 'Residential',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    featured: true,
    status: 'available',
    details: {
      bedrooms: 3,
      bathrooms: 2,
      area: 1850,
      year: 2018,
      lotSize: '0.25 acres',
      propertyType: 'Single Family'
    },
    description: 'Stunning family home in quiet neighborhood with modern updates throughout. Features include hardwood floors, granite countertops, and spacious backyard perfect for entertaining.',
    datePosted: '2024-01-15',
    viewCount: 324
  },
  {
    id: '2',
    title: 'Prime Commercial Office Space - Downtown',
    price: 450000,
    location: 'Downtown, Springfield',
    category: 'Properties',
    type: 'Commercial',
    images: ['/placeholder.svg', '/placeholder.svg'],
    featured: true,
    status: 'available',
    details: {
      area: 3200,
      year: 2020,
      propertyType: 'Office Building'
    },
    description: 'Modern commercial space in the heart of downtown. Perfect for professional services, with ample parking and excellent visibility.',
    datePosted: '2024-01-10',
    viewCount: 198
  },
  {
    id: '3',
    title: '2 Acre Development Land - Zoned Residential',
    price: 75000,
    location: 'North End, Springfield',
    category: 'Properties',
    type: 'Land',
    images: ['/placeholder.svg'],
    featured: false,
    status: 'available',
    details: {
      area: 87120,
      lotSize: '2 acres',
      propertyType: 'Vacant Land'
    },
    description: 'Excellent development opportunity on 2 acres of cleared land. All utilities available at street. Perfect for custom home or small subdivision.',
    datePosted: '2024-01-12',
    viewCount: 156
  },

  // Vehicles
  {
    id: '4',
    title: '2020 Toyota Camry LE - Low Miles, Excellent Condition',
    price: 22500,
    location: 'Springfield',
    category: 'Vehicles',
    type: 'Sedan',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    featured: true,
    status: 'available',
    details: {
      year: 2020,
      mileage: 28500,
      transmission: 'Automatic',
      make: 'Toyota',
      model: 'Camry LE',
      condition: 'Excellent'
    },
    description: 'One-owner vehicle with full service history. Features include backup camera, Bluetooth connectivity, and excellent fuel economy. Clean CarFax report.',
    datePosted: '2024-01-14',
    viewCount: 289
  },
  {
    id: '5',
    title: '2018 Ford F-150 XLT - Work Ready Pickup Truck',
    price: 28000,
    location: 'Springfield',
    category: 'Vehicles',
    type: 'Truck',
    images: ['/placeholder.svg', '/placeholder.svg'],
    featured: true,
    status: 'available',
    details: {
      year: 2018,
      mileage: 65000,
      transmission: 'Automatic',
      make: 'Ford',
      model: 'F-150 XLT',
      condition: 'Very Good'
    },
    description: 'Well-maintained work truck with regular service history. Features 4WD, bed liner, and towing package. Perfect for work or recreation.',
    datePosted: '2024-01-11',
    viewCount: 445
  },
  {
    id: '6',
    title: '2019 Honda CR-V EX - Family SUV, One Owner',
    price: 24000,
    location: 'Springfield',
    category: 'Vehicles',
    type: 'SUV',
    images: ['/placeholder.svg', '/placeholder.svg'],
    featured: true,
    status: 'available',
    details: {
      year: 2019,
      mileage: 42000,
      transmission: 'CVT',
      make: 'Honda',
      model: 'CR-V EX',
      condition: 'Excellent'
    },
    description: 'Perfect family SUV with all the features you need. Sunroof, heated seats, Apple CarPlay, and Honda Sensing safety suite included.',
    datePosted: '2024-01-13',
    viewCount: 367
  },

  // Additional listings for variety
  {
    id: '7',
    title: 'Luxury 4BR Executive Home - Golf Course Views',
    price: 525000,
    location: 'Country Club Estates, Springfield',
    category: 'Properties',
    type: 'Residential',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    featured: false,
    status: 'available',
    details: {
      bedrooms: 4,
      bathrooms: 3,
      area: 2850,
      year: 2021,
      lotSize: '0.5 acres',
      propertyType: 'Single Family'
    },
    description: 'Executive home overlooking the 18th fairway. Premium finishes throughout with chef\'s kitchen, master suite with spa bath, and 3-car garage.',
    datePosted: '2024-01-09',
    viewCount: 512
  },
  {
    id: '8',
    title: '2017 Chevrolet Silverado 1500 - Crew Cab 4x4',
    price: 26500,
    location: 'Springfield',
    category: 'Vehicles',
    type: 'Truck',
    images: ['/placeholder.svg', '/placeholder.svg'],
    featured: false,
    status: 'pending',
    details: {
      year: 2017,
      mileage: 78000,
      transmission: 'Automatic',
      make: 'Chevrolet',
      model: 'Silverado 1500',
      condition: 'Good'
    },
    description: 'Reliable work truck with crew cab seating. Features 4WD, towing package, and bed cover. Well maintained with service records.',
    datePosted: '2024-01-08',
    viewCount: 234
  }
];

export const adminStats = {
  totalListings: mockListings.length,
  inquiriesThisWeek: 23,
  mostViewed: mockListings.reduce((prev, current) => (prev.viewCount > current.viewCount) ? prev : current),
  recentContacts: 8
};
