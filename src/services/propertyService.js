// Property service for managing property data
// In production, this would connect to a backend API

// Mock data storage - replace with API calls in production
let properties = [
  {
    id: '1',
    brokerId: 'broker1',
    title: 'Luxury Modern Home',
    address: '1200 Wedgewood Ave, Nashville, TN 37212',
    city: 'Nashville',
    state: 'TN',
    zipCode: '37212',
    price: 1500000,
    type: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3000,
    lotSize: '0.5 acres',
    yearBuilt: 2020,
    description: 'Beautiful modern home with stunning views. Features include an open floor plan, gourmet kitchen, master suite with walk-in closet, and a beautiful backyard perfect for entertaining.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
    ],
    features: ['Hardwood Floors', 'Granite Countertops', 'Stainless Steel Appliances', 'Two-Car Garage', 'Backyard Patio'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    brokerId: 'broker1',
    title: 'Elegant Estate',
    address: '123 Mockingbird Valley Rd, Brentwood, TN 37027',
    city: 'Brentwood',
    state: 'TN',
    zipCode: '37027',
    price: 1400000,
    type: 'sale',
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 4200,
    lotSize: '1 acre',
    yearBuilt: 2019,
    description: 'Stunning estate in desirable Brentwood area. Spacious layout with high-end finishes throughout.',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
    features: ['Hardwood Floors', 'Granite Countertops', 'Stainless Steel Appliances', 'Three-Car Garage', 'Pool'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    brokerId: 'broker1',
    title: 'Contemporary Family Home',
    address: '456 Oak Street, Nashville, TN 37203',
    city: 'Nashville',
    state: 'TN',
    zipCode: '37203',
    price: 1399000,
    type: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3200,
    lotSize: '0.3 acres',
    yearBuilt: 2021,
    description: 'Beautiful contemporary home perfect for families. Open concept with modern amenities.',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
    features: ['Hardwood Floors', 'Granite Countertops', 'Stainless Steel Appliances', 'Two-Car Garage'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    brokerId: 'broker1',
    title: 'Charming Traditional Home',
    address: '789 Maple Drive, Franklin, TN 37067',
    city: 'Franklin',
    state: 'TN',
    zipCode: '37067',
    price: 1398000,
    type: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3100,
    lotSize: '0.4 acres',
    yearBuilt: 2018,
    description: 'Charming traditional home with character and modern updates.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
    features: ['Hardwood Floors', 'Granite Countertops', 'Stainless Steel Appliances', 'Two-Car Garage'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    brokerId: 'broker1',
    title: 'Spacious Modern Home',
    address: '321 Elm Avenue, Nashville, TN 37215',
    city: 'Nashville',
    state: 'TN',
    zipCode: '37215',
    price: 1300000,
    type: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3000,
    lotSize: '0.5 acres',
    yearBuilt: 2020,
    description: 'Spacious modern home with open floor plan and beautiful finishes.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
    ],
    features: ['Hardwood Floors', 'Granite Countertops', 'Stainless Steel Appliances', 'Two-Car Garage'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    brokerId: 'broker1',
    title: 'Luxury Estate',
    address: '654 Pine Street, Brentwood, TN 37027',
    city: 'Brentwood',
    state: 'TN',
    zipCode: '37027',
    price: 1200000,
    type: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    lotSize: '0.6 acres',
    yearBuilt: 2019,
    description: 'Luxury estate with premium finishes and beautiful landscaping.',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    ],
    features: ['Hardwood Floors', 'Granite Countertops', 'Stainless Steel Appliances', 'Two-Car Garage'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    brokerId: 'broker1',
    title: 'Modern Family Home',
    address: '987 Cedar Lane, Nashville, TN 37205',
    city: 'Nashville',
    state: 'TN',
    zipCode: '37205',
    price: 1099000,
    type: 'sale',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2500,
    lotSize: '0.3 acres',
    yearBuilt: 2021,
    description: 'Modern family home with updated features and great location.',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
    features: ['Hardwood Floors', 'Granite Countertops', 'Stainless Steel Appliances', 'Two-Car Garage'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    brokerId: 'broker1',
    title: 'Elegant Home',
    address: '159 Birch Road, Franklin, TN 37067',
    city: 'Franklin',
    state: 'TN',
    zipCode: '37067',
    price: 1099000,
    type: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2900,
    lotSize: '0.4 acres',
    yearBuilt: 2020,
    description: 'Elegant home with sophisticated design and premium amenities.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    ],
    features: ['Hardwood Floors', 'Granite Countertops', 'Stainless Steel Appliances', 'Two-Car Garage'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

let brokers = [
  {
    id: 'broker1',
    name: 'Jamison Blackwell',
    email: 'jamison@example.com',
    phone: '(615) 555-1234',
    company: 'Keller Williams Realty',
    bio: 'Experienced real estate professional with over 10 years in the industry. Specializing in Middle Tennessee including Nashville, Franklin, Spring Hill, Columbia, and surrounding areas.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=1200&fit=crop&auto=format&q=90',
    password: 'demo123', // In production, this should be hashed
  },
]

let topAreas = [
  {
    id: '1',
    name: 'Nashville',
    state: 'TENNESSEE',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: '2',
    name: 'Brentwood',
    state: 'TENNESSEE',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: '3',
    name: 'Franklin',
    state: 'TENNESSEE',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: '4',
    name: 'Spring Hill',
    state: 'TENNESSEE',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: '5',
    name: 'Columbia',
    state: 'TENNESSEE',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: '6',
    name: 'Mount Juliet',
    state: 'TENNESSEE',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: '7',
    name: 'Murfreesboro',
    state: 'TENNESSEE',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: '8',
    name: 'Hendersonville',
    state: 'TENNESSEE',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: '9',
    name: 'Belle Meade',
    state: 'TENNESSEE',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: '10',
    name: 'Green Hills',
    state: 'TENNESSEE',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: '11',
    name: 'Germantown',
    state: 'TENNESSEE',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop&auto=format',
  },
  {
    id: '12',
    name: 'Bellevue',
    state: 'TENNESSEE',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&auto=format',
  },
]

let testimonials = [
  {
    id: '1',
    quote: '"Jamison is very intentional and persistent in his work."',
    author: 'Jon David F',
    location: 'Nashville, TN',
    rating: 5,
    text: 'Jamison is very intentional and persistent in his work. His knowledge of the real estate sphere is very impressive and he will make your experience his priority through consistent communication.',
  },
  {
    id: '2',
    quote: '"Jamison made home buying easy and fun."',
    author: 'Wes P',
    location: 'Franklin, TN',
    rating: 5,
    text: 'Jamison made home buying easy and fun. He has great insights into market trends and was very honest and truthful throughout the entire process.',
  },
  {
    id: '3',
    quote: '"Mr. Blackwell was very personable to work with and get to know!"',
    author: 'Alexander M',
    location: 'Brentwood, TN',
    rating: 5,
    text: 'Mr. Blackwell was very personable to work with and get to know! He really went above and beyond in all aspects of his job and made the entire experience smooth.',
  },
]

export const propertyService = {
  // Get all properties
  getAllProperties: (filters = {}) => {
    let filtered = [...properties]

    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type)
    }

    if (filters.city) {
      filtered = filtered.filter(p => 
        p.city.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice)
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice)
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms)
    }

    if (filters.brokerId) {
      filtered = filtered.filter(p => p.brokerId === filters.brokerId)
    }

    return Promise.resolve(filtered)
  },

  // Get property by ID
  getPropertyById: (id) => {
    const property = properties.find(p => p.id === id)
    return Promise.resolve(property || null)
  },

  // Create property
  createProperty: (propertyData) => {
    const newProperty = {
      ...propertyData,
      id: Date.now().toString(),
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    properties.push(newProperty)
    return Promise.resolve(newProperty)
  },

  // Update property
  updateProperty: (id, updates) => {
    const index = properties.findIndex(p => p.id === id)
    if (index !== -1) {
      properties[index] = {
        ...properties[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      }
      return Promise.resolve(properties[index])
    }
    return Promise.reject(new Error('Property not found'))
  },

  // Delete property
  deleteProperty: (id) => {
    const index = properties.findIndex(p => p.id === id)
    if (index !== -1) {
      properties.splice(index, 1)
      return Promise.resolve(true)
    }
    return Promise.reject(new Error('Property not found'))
  },

  // Broker authentication
  loginBroker: (email, password) => {
    const broker = brokers.find(b => b.email === email && b.password === password)
    if (broker) {
      const { password: _, ...brokerWithoutPassword } = broker
      return Promise.resolve(brokerWithoutPassword)
    }
    return Promise.reject(new Error('Invalid credentials'))
  },

  // Get broker by ID
  getBrokerById: (id) => {
    const broker = brokers.find(b => b.id === id)
    if (broker) {
      const { password: _, ...brokerWithoutPassword } = broker
      return Promise.resolve(brokerWithoutPassword)
    }
    return Promise.resolve(null)
  },

  // Get broker properties
  getBrokerProperties: (brokerId) => {
    return propertyService.getAllProperties({ brokerId })
  },

  // Get top areas
  getTopAreas: () => {
    return Promise.resolve(topAreas)
  },

  // Get testimonials
  getTestimonials: () => {
    return Promise.resolve(testimonials)
  },
}

