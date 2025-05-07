export const properties = [
  {
      id: '101',
      title: 'The Trillion',
      type: 'residential',
      status: 'Under Construction',
      location: 'Sector 65, Golf Course Extension Road, Gurgaon',
      description: 'Luxury 3 & 4 BHK apartments with world-class amenities in the heart of Gurgaon. Features premium finishes, smart home automation, and stunning golf course views.',
      price: 38500000, // 3.85 Cr
      pricePerSqft: 23000,
      area: 1679,
      bedrooms: '3',
      bathrooms: '3',
      features: [
          'Golf Course View',
          'Club House',
          'Swimming Pool',
          'Gym',
          '24/7 Security'
      ],
      image: '../propassets/images/WhatsApp Image 2025-05-04 at 22.53.16_0518588e.jpg',
      propertyId: 'PROP201',
      reraNumber: 'RC/REP/HARERA/GGM/766/498/2023/122'
  },
  {
    id: '102',
    title: 'Premium Residential Plots – Indore',
    type: 'residential',
    status: 'Pre-Launch',
    location: 'Indore - Ujjain Highway (Sahana)',
    description: '46-acre A+ Grade plotted development by a leading developer on Indore-Ujjain Highway. Strategically located near Airport, IIT, IIM, Metro & Theme Park with vastu-compliant plots and resort-style living.',
    price: 1500000, // ₹15 Lakh as EOI starting
    pricePerSqft: null, // Not explicitly provided
    area: null, // Varies: 1000, 1250, 1500 sqft
    bedrooms: null,
    bathrooms: null,
    features: [
      'Vastu-compliant Plots',
      'Resort-Style Living',
      'Clubhouse',
      'Sports Facilities',
      'Kids\' Zone',
      'Green Living',
      'Theme Garden',
      'Proximity to Metro, IIT, IIM, Airport',
      'Upcoming 300+ Luxury Hotels',
      'Indore’s Largest Theme Park Nearby'
    ],
    image: '../images/godrejindoreplots-indore.png',
    propertyId: 'INDORE-103',
    reraNumber: null // RERA not mentioned in the provided data
  },
  
  {
      id: '104',
      title: 'Godrej Woods',
      type: 'residential',
      status: 'Under Construction',
      location: 'Sector 43, Noida',
      description: 'Premium 3 & 4 BHK apartments surrounded by 600+ trees. Offering sustainable living with modern amenities and excellent connectivity.',
      price: 25000000, // 2.5 Cr
      pricePerSqft: 12500,
      area: 2000,
      bedrooms: '3',
      bathrooms: '3',
      features: [
          'Forest View',
          'Organic Garden',
          'Yoga Deck',
          'Kids Play Area',
          'Meditation Zone'
      ],
      image: '../images/godrej-woods-noida.jpg',
      propertyId: 'GW-104',
      reraNumber: 'RERA2023104UP'
  },
  {
      id: '105',
      title: 'Emaar Palm Heights',
      type: 'residential',
      status: 'Under Construction',
      location: 'Sector 77, Gurugram',
      description: 'Luxury 3 & 4 BHK apartments with resort-style amenities. Features double-height lobby, landscaped gardens, and premium specifications.',
      price: 32000000, // 3.2 Cr
      pricePerSqft: 18500,
      area: 1850,
      bedrooms: '3',
      bathrooms: '3',
      features: [
          'Double Height Lobby',
          'Swimming Pool',
          'Tennis Court',
          'Party Lawn',
          'Power Backup'
      ],
      image: '../images/emaar-palm-heights.jpg',
      propertyId: 'EPH-105',
      reraNumber: 'RERA2023105HR'
  }
];

// Price range configuration for filters
export const priceRangeConfig = {
  min: 20000000,  // 2 Cr
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