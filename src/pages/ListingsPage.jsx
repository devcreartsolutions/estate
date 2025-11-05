import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { propertyService } from '../services/propertyService'
import { getImageWithFallback, handleImageError } from '../utils/imagePlaceholder'
import { WavyLine, DiagonalLines, GridLines, ZigzagLine, CurvedLine, DottedLine, ArrowLine, DecorativeCircle, AbstractShape, BlueprintGrid, ConstructionLines, BuildingSilhouette, HouseOutline, BlueprintLines, PropertyBoundary, RealEstateWavy } from '../components/VectorIllustrations'

function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    city: searchParams.get('city') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
  })

  useEffect(() => {
    loadProperties()
  }, [filters])

  const loadProperties = async () => {
    setLoading(true)
    try {
      const filteredProperties = await propertyService.getAllProperties(filters)
      setProperties(filteredProperties)
    } catch (error) {
      console.error('Error loading properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(2)}M`
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`
    }
    return `$${price.toLocaleString()}`
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    const params = new URLSearchParams()
    Object.keys(newFilters).forEach(filterKey => {
      if (newFilters[filterKey]) {
        params.set(filterKey, newFilters[filterKey])
      }
    })
    setSearchParams(params)
  }

  const clearFilters = () => {
    const clearedFilters = {
      type: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
    }
    setFilters(clearedFilters)
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Hero Section - Real Estate Themed Background */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 banner-container">
        {/* Real Estate Background Image with Overlay - Fixed layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getImageWithFallback('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920', 1920, 1080)})`,
            transform: 'translateZ(0)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/85 via-primary-600/80 to-primary-700/85"></div>
        </div>
        
        {/* Real Estate Construction Vectors - Combined layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ transform: 'translateZ(0)' }}>
          {/* Blueprint Grid Background */}
          <div className="absolute inset-0 opacity-[0.08]">
            <BlueprintGrid className="w-full h-full text-white" opacity={0.15} />
          </div>
          
          {/* Building Silhouettes */}
          <div className="absolute top-10 right-10 w-96 h-96 opacity-[0.06]" style={{ transform: 'translateZ(0)' }}>
            <BuildingSilhouette className="w-full h-full text-white" opacity={0.2} />
          </div>
          <div className="absolute bottom-10 left-10 w-80 h-80 opacity-[0.05]" style={{ transform: 'translateZ(0)' }}>
            <HouseOutline className="w-full h-full text-white" opacity={0.15} />
          </div>
          
          {/* Construction Lines */}
          <div className="absolute inset-0 opacity-[0.05]">
            <ConstructionLines className="w-full h-full text-white" opacity={0.2} />
          </div>
        </div>
        
        {/* Decorative Elements - Static layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ transform: 'translateZ(0)' }}>
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 md:py-8" style={{ transform: 'translateZ(0)' }}>
          <div className="w-full max-w-[1600px] mx-auto text-center">
            {/* Real Estate Themed Line Vector */}
            <div className="absolute top-0 left-0 w-full opacity-30 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
              <RealEstateWavy className="w-full h-3 text-white" />
            </div>
            <div className="absolute bottom-0 left-0 w-full opacity-30 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
              <BlueprintLines className="w-full h-3 text-white" />
            </div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full mb-6">
              <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
              <span className="text-xs font-bold">Search Properties</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Search Listings
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed max-w-2xl mx-auto font-medium">
              Find your dream home from our extensive collection of properties.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar - With Property Boundary Pattern */}
      <section className="py-12 md:py-16 bg-primary-50/20 dark:bg-gray-800 relative overflow-hidden">
        {/* Property Boundary Grid */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(18, 176, 223, 0.06) 30px, rgba(18, 176, 223, 0.06) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(18, 176, 223, 0.06) 30px, rgba(18, 176, 223, 0.06) 31px)' }}></div>
        </div>
        
        {/* Property Boundary Markers */}
        <div className="absolute top-5 right-5 w-64 h-64 opacity-4 pointer-events-none">
          <PropertyBoundary className="w-full h-full text-primary-400" opacity={0.12} />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, County or Zip"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Types</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Min Price
                </label>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Price
                </label>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex items-end gap-2">
                <button
                  onClick={loadProperties}
                  className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Search
                </button>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid - With Blueprint Grid Pattern */}
      <section className="py-20 md:py-28 bg-primary-100/16 dark:bg-gray-900 relative overflow-hidden">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <BlueprintGrid className="w-full h-full text-primary-500" opacity={0.7} />
        </div>
        
        {/* Building Silhouettes */}
        <div className="absolute top-10 right-10 w-96 h-96 opacity-5 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-400" opacity={0.13} />
        </div>
        <div className="absolute bottom-10 left-10 w-80 h-80 opacity-4 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-300" opacity={0.11} />
        </div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 opacity-3 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-200" opacity={0.09} />
        </div>
        
        {/* Blueprint Line Separators */}
        <div className="absolute top-0 left-0 right-0 opacity-15">
          <BlueprintLines className="w-full h-4 text-primary-400" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 opacity-15">
          <BlueprintLines className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">No properties found. Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {properties.length} {properties.length === 1 ? 'Property' : 'Properties'} Found
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {properties.map((property) => (
                  <Link
                    key={property.id}
                    to={`/properties/${property.id}`}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                  >
                    <div className="relative h-64 overflow-hidden">
                    <img
                      src={getImageWithFallback(property.images?.[0], 400, 300)}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={handleImageError}
                    />
                      <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full">
                        <span className="text-sm font-semibold text-primary-500 dark:text-primary-500">
                          {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="text-white text-2xl font-bold">{formatPrice(property.price)}</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-500 transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{property.address}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{property.bedrooms} Beds</span>
                        <span>{property.bathrooms} Baths</span>
                        <span>{property.squareFeet.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ListingsPage

