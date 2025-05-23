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
{
id: '103',
title: 'Velvet Vista Premium Service Apartments',
type: 'residential',
status: 'Upcoming',
location: 'Porvorim, North Goa',
description: 'Introducing premium service apartments in the heart of Goa. Studio, 1 & 2 BHK units available with attractive 25:25:25:25 payment plan and 12% assured annual rent till possession.',
price: 9687000, // ₹96.87 Lakhs Onwards
area: null,  // Area not specified in the image
bedrooms: 'Studio, 1 & 2 BHK',
bathrooms: null,  // Bathroom count not mentioned
features: [
  'Service Apartments',
  'Located in Porvorim, North Goa',
  '25:25:25:25 Payment Plan',
  '12% Assured Rent Per Annum',
  'Till Possession Offer',
  'Studio, 1 & 2 BHK Options'
],
image: '../propassets/images/VELVET VISTA BROCHURE.pdf-image-058.jpg',
propertyId: 'PROP105',
reraNumber: null // RERA not mentioned in the provided data

},
{
  id: '104',
  title: 'THE PALATIAL by Hero Homes',
  type: 'residential',
  status: 'New Launch',
  location: 'Sector 104, Dwarka Expressway, Gurgaon',
  description: 'Ultra-luxury residential development by Hero Realty on Dwarka Expressway. Spread across 11+ acres with 5 standalone towers, European palace-themed clubhouse, and world-class amenities. Low-density project with only 688 families and 4 apartments per floor.',
  price: 50000000, // Price not explicitly mentioned
  bedrooms: '3 & 4 BHK + SPR',
  bathrooms: null, // Bathroom count not specified
  features: [
    'Ultra-Luxury Palace-Themed Architecture',
  'Tallest Towers on Dwarka Expressway (G+41/42/43)',
  '60,000 Sq.Ft G+4 Clubhouse with Cultfit Gym & Rooftop Pool',
  '1 Acre G+4 High Street Commercial Zone',
  'Low-Density Living with 70% Green Open Area'
  
  ],
  image: '../propassets/hero-patilal/The Palatial - Brochure Presentation - 042025.pdf-image-044 (1).jpg', // Placeholder image path
  propertyId: 'PROP106',
  reraNumber: null // RERA not mentioned in the data
},
{
  id: '105',
  title: 'SOBHA Aranya',
  type: 'residential',
  status: 'New Launch',
  location: 'Sector 80, Gurugram',
  description: 'An eco-luxury residential development by SOBHA in collaboration with Karma Lakelands. Located in Sector 80, Gurgaon, this project features 5 towers in Phase 1 with 524 residences offering forest and golf course views. The project integrates nature with luxury through green terraces, double-height lounges, and eco-sustainable amenities including solar panels and rainwater harvesting.',
  price: 78287676, // Starting price for 3 BHK + DH
  bedrooms: '3 BHK',
  bathrooms: null, // Bathroom count not explicitly mentioned
  features: [
    '3B+G+43/46 Floor High-Rise Towers',
    'Forest and Golf Course Views',
    '75,000 sq. ft. Eco-conscious Clubhouse (Club Antara)',
    'Eco Amenities: Solar Panels, Rainwater Harvesting, Eco Pond',
    '5 Lifestyle Zones including Active, Recreational & Kids’ Zones',
    'Double-Height Visitor Lounge',
    'No Homes Face Each Other for Privacy',
    'Olympic Size Pool, Indoor Pool & Sports Facilities'
  ],
  image: '../propassets/hero-patilal/The Palatial - Brochure Presentation - 042025.pdf-image-044 (1).jpg', // Placeholder image path
  propertyId: 'PROP107',
  reraNumber: 'RC/REP/HARERA/GGM/808/540/2024/35' // RERA number as per brochure
}


];


// Property type options
export const propertyTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'residential', label: 'Residential' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'commercial', label: 'Commercial' }
];