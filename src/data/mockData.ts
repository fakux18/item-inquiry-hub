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
  // Propiedades
  {
    id: '1',
    title: 'Preciosa casa familiar de 3 habitaciones con gran patio trasero',
    price: 285000,
    location: 'Westside, Springfield',
    category: 'Propiedades',
    type: 'Residencial',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    featured: true,
    status: 'available',
    details: {
      bedrooms: 3,
      bathrooms: 2,
      area: 1850,
      year: 2018,
      lotSize: '0.25 acres',
      propertyType: 'Casa unifamiliar'
    },
    description: 'Impresionante casa familiar en un vecindario tranquilo con renovaciones modernas. Incluye pisos de madera, encimeras de granito y amplio patio trasero ideal para reuniones.',
    datePosted: '2024-01-15',
    viewCount: 324
  },
  {
    id: '2',
    title: 'Oficina comercial de primera - Centro de la ciudad',
    price: 450000,
    location: 'Centro, Springfield',
    category: 'Propiedades',
    type: 'Comercial',
    images: ['/placeholder.svg', '/placeholder.svg'],
    featured: true,
    status: 'available',
    details: {
      area: 3200,
      year: 2020,
      propertyType: 'Edificio de oficinas'
    },
    description: 'Espacio comercial moderno en el corazón del centro. Perfecto para servicios profesionales, con amplio estacionamiento y excelente visibilidad.',
    datePosted: '2024-01-10',
    viewCount: 198
  },
  {
    id: '3',
    title: 'Terreno de 2 acres para desarrollo - Zona residencial',
    price: 75000,
    location: 'North End, Springfield',
    category: 'Propiedades',
    type: 'Terreno',
    images: ['/placeholder.svg'],
    featured: false,
    status: 'available',
    details: {
      area: 87120,
      lotSize: '2 acres',
      propertyType: 'Terreno baldío'
    },
    description: 'Excelente oportunidad de desarrollo en 2 acres de terreno despejado. Todos los servicios disponibles en la calle. Ideal para casa personalizada o pequeña subdivisión.',
    datePosted: '2024-01-12',
    viewCount: 156
  },

  // Vehículos
  {
    id: '4',
    title: 'Toyota Camry LE 2020 - Pocos kilómetros, excelente estado',
    price: 22500,
    location: 'Springfield',
    category: 'Vehículos',
    type: 'Sedán',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    featured: true,
    status: 'available',
    details: {
      year: 2020,
      mileage: 28500,
      transmission: 'Automático',
      make: 'Toyota',
      model: 'Camry LE',
      condition: 'Excelente'
    },
    description: 'Vehículo de un solo dueño con historial completo de mantenimiento. Incluye cámara de retroceso, conectividad Bluetooth y excelente economía de combustible. Informe CarFax limpio.',
    datePosted: '2024-01-14',
    viewCount: 289
  },
  {
    id: '5',
    title: 'Ford F-150 XLT 2018 - Camioneta lista para trabajar',
    price: 28000,
    location: 'Springfield',
    category: 'Vehículos',
    type: 'Camioneta',
    images: ['/placeholder.svg', '/placeholder.svg'],
    featured: true,
    status: 'available',
    details: {
      year: 2018,
      mileage: 65000,
      transmission: 'Automático',
      make: 'Ford',
      model: 'F-150 XLT',
      condition: 'Muy bueno'
    },
    description: 'Camioneta de trabajo bien mantenida con historial regular de servicio. Incluye 4WD, protector de cama y paquete de remolque. Perfecta para el trabajo o recreación.',
    datePosted: '2024-01-11',
    viewCount: 445
  },
  {
    id: '6',
    title: 'Honda CR-V EX 2019 - SUV familiar, único dueño',
    price: 24000,
    location: 'Springfield',
    category: 'Vehículos',
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
      condition: 'Excelente'
    },
    description: 'SUV familiar perfecto con todas las funciones que necesitas. Incluye techo solar, asientos calefaccionados, Apple CarPlay y sistema de seguridad Honda Sensing.',
    datePosted: '2024-01-13',
    viewCount: 367
  },

  // Listados adicionales para variedad
  {
    id: '7',
    title: 'Casa ejecutiva de lujo de 4 habitaciones - Vista al campo de golf',
    price: 525000,
    location: 'Country Club Estates, Springfield',
    category: 'Propiedades',
    type: 'Residencial',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    featured: false,
    status: 'available',
    details: {
      bedrooms: 4,
      bathrooms: 3,
      area: 2850,
      year: 2021,
      lotSize: '0.5 acres',
      propertyType: 'Casa unifamiliar'
    },
    description: 'Casa ejecutiva con vista al hoyo 18 del campo de golf. Acabados premium, cocina de chef, suite principal con baño tipo spa y garaje para 3 autos.',
    datePosted: '2024-01-09',
    viewCount: 512
  },
  {
    id: '8',
    title: 'Chevrolet Silverado 1500 2017 - Crew Cab 4x4',
    price: 26500,
    location: 'Springfield',
    category: 'Vehículos',
    type: 'Camioneta',
    images: ['/placeholder.svg', '/placeholder.svg'],
    featured: false,
    status: 'pending',
    details: {
      year: 2017,
      mileage: 78000,
      transmission: 'Automático',
      make: 'Chevrolet',
      model: 'Silverado 1500',
      condition: 'Bueno'
    },
    description: 'Camioneta de trabajo confiable con cabina doble. Incluye 4WD, paquete de remolque y cubierta de cama. Bien mantenida con registros de servicio.',
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
