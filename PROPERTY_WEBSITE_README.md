# Property Website - Broker & Buyer Platform

A full-featured real estate website for brokers and buyers built with React, React Router, and Tailwind CSS.

## Features

### For Buyers/Renters
- **Homepage** (`/`) - Browse all properties with search and filters
- **Property Listings** - Grid view of properties with images, prices, and key details
- **Property Detail Page** (`/properties/:id`) - Full property information with:
  - Image gallery
  - Detailed description
  - Property features
  - Contact form to reach the broker
- **Advanced Search & Filters**:
  - Filter by property type (Sale/Rent)
  - Search by city, county, or zip code
  - Price range filters
  - Bedroom count filter

### For Brokers
- **Broker Login** (`/broker/login`) - Secure authentication system
  - Demo credentials: `jamison@example.com` / `demo123`
- **Broker Dashboard** (`/broker/dashboard`) - Property management:
  - View all your properties
  - Add new properties
  - Edit existing properties
  - Delete properties
  - View property details

## Project Structure

```
src/
├── context/
│   └── AuthContext.jsx          # Authentication context
├── components/
│   ├── ProtectedRoute.jsx       # Route protection component
│   └── ImageToVideo.jsx         # Legacy video component
├── pages/
│   ├── HomePage.jsx             # Main property listings page
│   ├── PropertyDetailPage.jsx  # Individual property page
│   ├── BrokerLoginPage.jsx     # Broker login
│   └── BrokerDashboardPage.jsx # Broker property management
├── services/
│   └── propertyService.js      # Property data management
└── App.jsx                      # Main app with routing
```

## Routes

- `/` - Homepage with property listings
- `/properties/:id` - Property detail page
- `/broker/login` - Broker login page
- `/broker/dashboard` - Broker dashboard (protected)
- `/video` - Legacy ImageToVideo component

## Authentication

The app uses a simple authentication system with localStorage for session management. In production, this should be replaced with:
- JWT tokens
- Secure HTTP-only cookies
- Backend API authentication
- Password hashing (bcrypt)

## Data Storage

Currently using in-memory storage in `propertyService.js`. For production, replace with:
- Backend API (REST or GraphQL)
- Database (PostgreSQL, MongoDB, etc.)
- File storage for images (AWS S3, Cloudinary, etc.)

## Demo Broker Account

- **Email:** `jamison@example.com`
- **Password:** `demo123`

## Next Steps for Production

1. **Backend API**:
   - Create REST API or GraphQL endpoint
   - Implement proper authentication (JWT)
   - Add database integration
   - File upload for property images

2. **Enhanced Features**:
   - Property favorites/bookmarks
   - Email notifications
   - Property comparison tool
   - Map integration (Google Maps, Mapbox)
   - Advanced search with saved searches

3. **Admin Panel**:
   - Multi-broker management
   - Analytics dashboard
   - User management
   - Content moderation

4. **Security**:
   - Input validation
   - XSS protection
   - CSRF tokens
   - Rate limiting
   - Secure password storage

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **React 19** - UI framework
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Context API** - State management
- **LocalStorage** - Session storage

## Browser Support

Modern browsers with ES6+ support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

