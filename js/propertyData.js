export const properties = [
  {
      id: '101',
      title: 'The Trillion',
      type: 'residential',
      status: 'Under Construction',
      location: 'Sector 65, Golf Course Extension Road, Gurgaon',
      description: 'Luxury 3 & 4 BHK apartments with world-class amenities in the heart of Gurgaon. Features premium finishes, smart home automation, and stunning golf course views.',
      price: 38500000, // 3.85 Cr
      area: 1679,
      bedrooms: '3',
      bathrooms: '3',
      features: [
          'Golf Course View',
          'Club House',
          'Swimming Pool',
          'Gym',
          '24/7 Security',
          '24/7 Security'
      ],
      image: '../propassets/images/WhatsApp Image 2025-05-04 at 22.53.16_0518588e.jpg',
      propertyId: 'PROP201',
      reraNumber: 'RC/REP/HARERA/GGM/766/498/2023/122'
  },
 
 {
  id: '102',
  title: 'Gokulam The Sanctuary Luxury Floors',
  type: 'residential',
  status: 'Upcoming',
  location: 'Sohna, South of Gurugram',
  description: 'Luxurious 3-bedroom suites with fitted wardrobes, modular kitchen, lift access, and resort-style amenities in the lap of Aravallis. Includes sports arena, nature club, and more.',
  price: 12500000, // Price not mentioned in PDF
  area: 1650,  // Area not specified clearly in PDF
  bedrooms: '3',
  bathrooms: '3',
  features: [
    'Fitted Wardrobes',
    'Modular Kitchen',
    'Lift Access',
    'Sports Arena',
    'Nature Club',
    'Open Gym'
  ],
  image: '../propassets/images/Gokulam The Sanctuary luxury Floor.pdf-image-009.jpg',
  propertyId: 'PROP104',
  reraNumber: null // RERA not mentioned in the provided data
},

];

// Price range configuration for filters
export const priceRangeConfig = {
  min: 10000000,  // 2 Cr
  max: 200000000, // 20 Cr
  step: 1000000   // 10 L
};

// Property type options
export const propertyTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'residential', label: 'Residential' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'commercial', label: 'Commercial' }
];