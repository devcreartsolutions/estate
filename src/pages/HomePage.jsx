import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faEnvelope, faPhone, faBuilding, faHome, faDollarSign, faHandshake, faChartLine, faSearch, faMapMarkerAlt, faCheckCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import { propertyService } from '../services/propertyService'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import { getImageWithFallback, handleImageError } from '../utils/imagePlaceholder'
import { MapPinIcon, WavyLine, DiagonalLines, GridLines, ZigzagLine, CurvedLine, DottedLine, ArrowLine, DecorativeCircle, AbstractShape, BlueprintGrid, ConstructionLines, BuildingSilhouette, HouseOutline, BlueprintLines, PropertyBoundary, RealEstateWavy } from '../components/VectorIllustrations'
import AnimatedNumber from '../components/AnimatedNumber'

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [newProperties, setNewProperties] = useState([])
  const [topAreas, setTopAreas] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [testimonialsToShow, setTestimonialsToShow] = useState(1)
  const [testimonialTouchStart, setTestimonialTouchStart] = useState(0)
  const [testimonialTouchEnd, setTestimonialTouchEnd] = useState(0)
  const [isTestimonialAutoPlaying, setIsTestimonialAutoPlaying] = useState(true)
  const [currentAreaIndex, setCurrentAreaIndex] = useState(0)
  const [areasToShow, setAreasToShow] = useState(2) // Number of areas to show at once
  const [currentNewListingIndex, setCurrentNewListingIndex] = useState(0)
  const [newListingsToShow, setNewListingsToShow] = useState(2) // Number of new listings to show at once
  const [newListingTouchStart, setNewListingTouchStart] = useState(0)
  const [newListingTouchEnd, setNewListingTouchEnd] = useState(0)
  const [isNewListingAutoPlaying, setIsNewListingAutoPlaying] = useState(true)
  const [loading, setLoading] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [broker, setBroker] = useState(null)

  useEffect(() => {
    loadAllData()
    loadBroker()
    
    // Listen for contact modal open event from header
    const handleOpenContact = () => setShowContactModal(true)
    window.addEventListener('openContactModal', handleOpenContact)
    return () => window.removeEventListener('openContactModal', handleOpenContact)
  }, [])

  useEffect(() => {
    const type = searchParams.get('type')
    if (type) {
      loadProperties({ type })
    }
  }, [searchParams])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [allProps, areas, testis] = await Promise.all([
        propertyService.getAllProperties(),
        propertyService.getTopAreas(),
        propertyService.getTestimonials(),
      ])
      
      setProperties(allProps)
      setFeaturedProperties(allProps.slice(0, 8))
      setNewProperties(allProps.slice(0, 8))
      setTopAreas(areas)
      setTestimonials(testis)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadBroker = async () => {
    try {
      const brokerData = await propertyService.getBrokerById('broker1')
      setBroker(brokerData)
    } catch (error) {
      console.error('Error loading broker:', error)
    }
  }

  const loadProperties = async (filters = {}) => {
    try {
      const filteredProperties = await propertyService.getAllProperties(filters)
      setProperties(filteredProperties)
    } catch (error) {
      console.error('Error loading properties:', error)
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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      loadProperties({ city: searchQuery })
      setSearchParams({ type: '', city: searchQuery })
    }
  }

  useEffect(() => {
    // Always show 1 testimonial at a time
    setTestimonialsToShow(1)
  }, [])

  // Auto-play testimonials carousel
  useEffect(() => {
    if (!isTestimonialAutoPlaying || testimonials.length <= testimonialsToShow) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => {
        const maxIndex = Math.max(0, testimonials.length - testimonialsToShow)
        if (prev >= maxIndex) return 0
        return Math.min(prev + testimonialsToShow, maxIndex)
      })
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isTestimonialAutoPlaying, testimonials.length, testimonialsToShow])

  const nextTestimonial = () => {
    const maxIndex = Math.max(0, testimonials.length - testimonialsToShow)
    setCurrentTestimonial((prev) => {
      if (prev >= maxIndex) return 0
      return Math.min(prev + testimonialsToShow, maxIndex)
    })
  }

  const prevTestimonial = () => {
    const maxIndex = Math.max(0, testimonials.length - testimonialsToShow)
    setCurrentTestimonial((prev) => {
      if (prev === 0) return maxIndex
      return Math.max(prev - testimonialsToShow, 0)
    })
  }

  const canGoNextTestimonial = currentTestimonial < Math.max(0, testimonials.length - testimonialsToShow)
  const canGoPrevTestimonial = currentTestimonial > 0

  // Touch handlers for testimonial swipe
  const handleTestimonialTouchStart = (e) => {
    setIsTestimonialAutoPlaying(false)
    setTestimonialTouchStart(e.targetTouches[0].clientX)
  }

  const handleTestimonialTouchMove = (e) => {
    setTestimonialTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTestimonialTouchEnd = () => {
    if (!testimonialTouchStart || !testimonialTouchEnd) return

    const distance = testimonialTouchStart - testimonialTouchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && canGoNextTestimonial) {
      nextTestimonial()
    }
    if (isRightSwipe && canGoPrevTestimonial) {
      prevTestimonial()
    }

    setTimeout(() => {
      setIsTestimonialAutoPlaying(true)
    }, 10000)

    setTestimonialTouchStart(0)
    setTestimonialTouchEnd(0)
  }

  // Mouse drag handlers for testimonials
  const handleTestimonialMouseDown = (e) => {
    setIsTestimonialAutoPlaying(false)
    setTestimonialTouchStart(e.clientX)
  }

  const handleTestimonialMouseMove = (e) => {
    if (testimonialTouchStart) {
      setTestimonialTouchEnd(e.clientX)
    }
  }

  const handleTestimonialMouseUp = () => {
    if (!testimonialTouchStart || !testimonialTouchEnd) return

    const distance = testimonialTouchStart - testimonialTouchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && canGoNextTestimonial) {
      nextTestimonial()
    }
    if (isRightSwipe && canGoPrevTestimonial) {
      prevTestimonial()
    }

    setTimeout(() => {
      setIsTestimonialAutoPlaying(true)
    }, 10000)

    setTestimonialTouchStart(0)
    setTestimonialTouchEnd(0)
  }

  useEffect(() => {
    // Determine how many areas to show based on screen size
    const updateAreasToShow = () => {
      if (window.innerWidth >= 1280) {
        setAreasToShow(3) // 2xl: show 3
      } else if (window.innerWidth >= 1024) {
        setAreasToShow(2) // lg: show 2
      } else {
        setAreasToShow(1) // mobile: show 1
      }
    }
    updateAreasToShow()
    window.addEventListener('resize', updateAreasToShow)
    return () => window.removeEventListener('resize', updateAreasToShow)
  }, [])

  useEffect(() => {
    // Determine how many new listings to show based on screen size
    const updateNewListingsToShow = () => {
      if (window.innerWidth >= 1536) {
        setNewListingsToShow(3) // 2xl: show 3
      } else if (window.innerWidth >= 1280) {
        setNewListingsToShow(2) // xl: show 2
      } else if (window.innerWidth >= 1024) {
        setNewListingsToShow(2) // lg: show 2
      } else {
        setNewListingsToShow(1) // mobile: show 1
      }
    }
    updateNewListingsToShow()
    window.addEventListener('resize', updateNewListingsToShow)
    return () => window.removeEventListener('resize', updateNewListingsToShow)
  }, [])

  const nextArea = () => {
    const maxIndex = Math.max(0, topAreas.length - areasToShow)
    setCurrentAreaIndex((prev) => {
      if (prev >= maxIndex) return 0
      return Math.min(prev + areasToShow, maxIndex)
    })
  }

  const prevArea = () => {
    const maxIndex = Math.max(0, topAreas.length - areasToShow)
    setCurrentAreaIndex((prev) => {
      if (prev === 0) return maxIndex
      return Math.max(prev - areasToShow, 0)
    })
  }

  const canGoNext = currentAreaIndex < Math.max(0, topAreas.length - areasToShow)
  const canGoPrev = currentAreaIndex > 0

  // New Listings Slider Functions
  const nextNewListing = () => {
    const maxIndex = Math.max(0, newProperties.length - newListingsToShow)
    setCurrentNewListingIndex((prev) => {
      if (prev >= maxIndex) return 0
      return Math.min(prev + newListingsToShow, maxIndex)
    })
  }

  const prevNewListing = () => {
    const maxIndex = Math.max(0, newProperties.length - newListingsToShow)
    setCurrentNewListingIndex((prev) => {
      if (prev === 0) return maxIndex
      return Math.max(prev - newListingsToShow, 0)
    })
  }

  const canGoNextNewListing = currentNewListingIndex < Math.max(0, newProperties.length - newListingsToShow)
  const canGoPrevNewListing = currentNewListingIndex > 0

  // Auto-play new listings carousel
  useEffect(() => {
    if (!isNewListingAutoPlaying || newProperties.length <= newListingsToShow) return

    const interval = setInterval(() => {
      setCurrentNewListingIndex((prev) => {
        const maxIndex = Math.max(0, newProperties.length - newListingsToShow)
        if (prev >= maxIndex) return 0
        return Math.min(prev + newListingsToShow, maxIndex)
      })
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isNewListingAutoPlaying, newProperties.length, newListingsToShow])

  // Touch handlers for new listings swipe
  const handleNewListingTouchStart = (e) => {
    setIsNewListingAutoPlaying(false)
    setNewListingTouchStart(e.targetTouches[0].clientX)
  }

  const handleNewListingTouchMove = (e) => {
    setNewListingTouchEnd(e.targetTouches[0].clientX)
  }

  const handleNewListingTouchEnd = () => {
    if (!newListingTouchStart || !newListingTouchEnd) return

    const distance = newListingTouchStart - newListingTouchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && canGoNextNewListing) {
      nextNewListing()
    }
    if (isRightSwipe && canGoPrevNewListing) {
      prevNewListing()
    }

    setTimeout(() => {
      setIsNewListingAutoPlaying(true)
    }, 8000)

    setNewListingTouchStart(0)
    setNewListingTouchEnd(0)
  }

  // Mouse drag handlers for new listings
  const handleNewListingMouseDown = (e) => {
    setIsNewListingAutoPlaying(false)
    setNewListingTouchStart(e.clientX)
  }

  const handleNewListingMouseMove = (e) => {
    if (newListingTouchStart) {
      setNewListingTouchEnd(e.clientX)
    }
  }

  const handleNewListingMouseUp = () => {
    if (!newListingTouchStart || !newListingTouchEnd) return

    const distance = newListingTouchStart - newListingTouchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && canGoNextNewListing) {
      nextNewListing()
    }
    if (isRightSwipe && canGoPrevNewListing) {
      prevNewListing()
    }

    setTimeout(() => {
      setIsNewListingAutoPlaying(true)
    }, 8000)

    setNewListingTouchStart(0)
    setNewListingTouchEnd(0)
  }

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || topAreas.length <= areasToShow) return

    const interval = setInterval(() => {
      setCurrentAreaIndex((prev) => {
        const maxIndex = Math.max(0, topAreas.length - areasToShow)
        if (prev >= maxIndex) return 0
        return Math.min(prev + areasToShow, maxIndex)
      })
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, topAreas.length, areasToShow])

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setIsAutoPlaying(false) // Pause autoplay when user interacts
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && canGoNext) {
      nextArea()
    }
    if (isRightSwipe && canGoPrev) {
      prevArea()
    }

    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)

    setTouchStart(0)
    setTouchEnd(0)
  }

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsAutoPlaying(false)
    setTouchStart(e.clientX)
  }

  const handleMouseMove = (e) => {
    if (touchStart) {
      setTouchEnd(e.clientX)
    }
  }

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && canGoNext) {
      nextArea()
    }
    if (isRightSwipe && canGoPrev) {
      prevArea()
    }

    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)

    setTouchStart(0)
    setTouchEnd(0)
  }


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section - Real Estate Themed Background */}
      <section className="relative min-h-[700px] md:min-h-[800px] overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 banner-container">
        {/* Real Estate Background Image with Overlay - Fixed layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getImageWithFallback('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920', 1920, 1080)})`,
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
        
        <div className="relative z-10 h-full flex flex-col justify-center w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20" style={{ transform: 'translateZ(0)' }}>
          <div className="w-full max-w-[1600px] mx-auto text-center lg:text-left">
            {/* Real Estate Themed Line Vector */}
            <div className="absolute top-0 left-0 w-full opacity-30 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
              <RealEstateWavy className="w-full h-3 text-white" />
            </div>
            <div className="absolute bottom-0 left-0 w-full opacity-30 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
              <BlueprintLines className="w-full h-3 text-white" />
            </div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full mb-6">
              <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
              <span className="text-xs font-bold">Your Trusted Real Estate Partner</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-white">Home Today</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Discover exceptional properties in Nashville and Middle Tennessee. Expert guidance every step of the way.
            </p>
            
            {/* Navigation Tabs - Modern Design with Better Contrast */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-8">
              <Link
                to="/buying"
                className="group relative px-6 py-3.5 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl hover:bg-white/25 hover:border-white/40 transition-all shadow-lg hover:shadow-xl"
              >
                <FontAwesomeIcon icon={faHome} className="w-4 h-4 mr-2" />
                Buy a Home
              </Link>
              <Link
                to="/selling"
                className="group relative px-6 py-3.5 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl hover:bg-white/25 hover:border-white/40 transition-all shadow-lg hover:shadow-xl"
              >
                <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 mr-2" />
                Sell a Home
              </Link>
              <Link
                to="/home-value"
                className="group relative px-6 py-3.5 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl hover:bg-white/25 hover:border-white/40 transition-all shadow-lg hover:shadow-xl"
              >
                <FontAwesomeIcon icon={faDollarSign} className="w-4 h-4 mr-2" />
                Home Value
              </Link>
            </div>
            
            {/* Enhanced Search Bar with Better Contrast */}
            <div className="bg-white rounded-xl shadow-2xl p-2 mb-6 max-w-3xl mx-auto lg:mx-0">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3.5">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-primary-500" />
                  <input
                    type="text"
                    placeholder="Search by city, county, or zip"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 text-gray-900 placeholder-gray-600 focus:outline-none text-lg font-medium"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-primary-700 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-primary-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                >
                  <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
                  <span>SEARCH</span>
                </button>
              </div>
            </div>
            
            {/* Trust Indicators with Better Contrast */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-white" />
                <span className="text-sm font-bold">
                  <AnimatedNumber value={500} suffix="+ Properties Sold" />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-white" />
                <span className="text-sm font-bold">
                  <AnimatedNumber value={10} suffix="+ Years Experience" />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-white" />
                <span className="text-sm font-bold">
                  <AnimatedNumber value={5.0} decimals={1} suffix=" Rating" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Jamison Blackwell Section - With Diagonal Construction Lines */}
      {broker && (
        <section className="py-20 md:py-28 bg-primary-50/25 dark:bg-gray-900 relative overflow-hidden">
          {/* Diagonal Construction Lines Background */}
          <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none">
            <ConstructionLines className="w-full h-full text-primary-500" opacity={0.3} />
          </div>
          
          {/* House Outlines at corners */}
          <div className="absolute top-20 right-10 w-80 h-80 opacity-5 pointer-events-none">
            <HouseOutline className="w-full h-full text-primary-400" opacity={0.12} />
          </div>
          <div className="absolute bottom-20 left-10 w-72 h-72 opacity-4 pointer-events-none">
            <HouseOutline className="w-full h-full text-primary-300" opacity={0.1} />
          </div>
          
          {/* Real Estate Wavy Separators */}
          <div className="absolute top-0 left-0 right-0 opacity-12">
            <RealEstateWavy className="w-full h-5 text-primary-400" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 opacity-12">
            <RealEstateWavy className="w-full h-5 text-primary-400" />
          </div>
          
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
            <div className="w-full max-w-[1600px] mx-auto">
              <div className="flex flex-col md:flex-row gap-12 md:gap-20 lg:gap-24 items-center">
                <div className="flex-shrink-0 relative group">
                  <div className="absolute inset-0 bg-primary-500 rounded-xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl">
                    <img
                      src={getImageWithFallback(broker.avatar, 600, 600)}
                      alt={broker.name}
                      className="w-full max-w-md rounded-xl shadow-lg object-cover aspect-square"
                      onError={handleImageError}
                    />
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute -bottom-4 -right-4 bg-primary-600 text-white px-6 py-3 rounded-xl shadow-xl border-4 border-white dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5" />
                      <div>
                        <div className="text-2xl font-black">
                          <AnimatedNumber value={5.0} decimals={1} />
                        </div>
                        <div className="text-xs font-bold opacity-95">Client Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-500 border border-primary-300 dark:text-primary-400 px-4 py-2 rounded-full text-xs font-bold mb-6">
                    Meet Your Agent
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                    {broker.name}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto md:mx-0 font-medium">
                    {broker.bio}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-10">
                    <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                      <span className="font-black">
                        <AnimatedNumber value={10} suffix="+ Years Experience" />
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                      <span className="font-black">
                        <AnimatedNumber value={500} suffix="+ Properties Sold" />
                      </span>
                    </div>
                  </div>
                  <Link 
                    to="/about" 
                    className="inline-flex items-center gap-2 bg-primary-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                  >
                    <span>VIEW PROFILE</span>
                    <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top Areas Section - With Background Image & Gradient */}
      {topAreas.length > 0 && (
        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{
              backgroundImage: `url(${getImageWithFallback('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920', 1920, 800)})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-700/90 via-primary-800/85 to-primary-900/90"></div>
          </div>
          
          {/* Complex Vector Design Overlay */}
          <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
            {/* Layered Blueprint Grid */}
            <div className="absolute inset-0">
              <BlueprintGrid className="w-full h-full text-white" opacity={0.3} />
            </div>
            
            {/* Diagonal Construction Lines */}
            <div className="absolute inset-0 transform rotate-3">
              <ConstructionLines className="w-full h-full text-white" opacity={0.2} />
            </div>
            
            {/* Property Boundary Pattern */}
            <div className="absolute inset-0">
              <PropertyBoundary className="w-full h-full text-white" opacity={0.15} />
            </div>
            
            {/* Decorative Building Elements */}
            <div className="absolute top-20 left-20 w-80 h-80 opacity-10">
              <BuildingSilhouette className="w-full h-full text-white" opacity={0.25} />
            </div>
            <div className="absolute bottom-20 right-20 w-72 h-72 opacity-8">
              <HouseOutline className="w-full h-full text-white" opacity={0.22} />
            </div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 opacity-6 transform -translate-x-1/2 -translate-y-1/2">
              <BuildingSilhouette className="w-full h-full text-white" opacity={0.18} />
            </div>
            <div className="absolute bottom-1/4 right-1/3 w-56 h-56 opacity-5">
              <HouseOutline className="w-full h-full text-white" opacity={0.15} />
            </div>
            
            {/* Real Estate Wavy Lines - Top and Bottom */}
            <div className="absolute top-0 left-0 right-0 opacity-25">
              <RealEstateWavy className="w-full h-8 text-white" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 opacity-25">
              <RealEstateWavy className="w-full h-8 text-white" />
            </div>
            
            {/* Blueprint Lines - Middle separators */}
            <div className="absolute top-1/3 left-0 right-0 opacity-20">
              <BlueprintLines className="w-full h-4 text-white" />
            </div>
            <div className="absolute bottom-1/3 left-0 right-0 opacity-20">
              <BlueprintLines className="w-full h-4 text-white" />
            </div>
          </div>
          
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block bg-white/25 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold mb-4 border border-white/40 shadow-lg">
                Explore Top Locations
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Top Areas We Serve
              </h2>
              <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto font-semibold">
                Discover the best neighborhoods in Middle Tennessee with our expert guidance
              </p>
            </div>
            <div className="relative overflow-hidden">
              {/* Slider Container */}
              <div 
                className="overflow-hidden cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    gap: '24px',
                    transform: `translateX(calc(-${currentAreaIndex} * ((100% + 24px) / ${areasToShow})))`,
                  }}
                >
                  {topAreas.map((area) => (
                    <Link
                      key={area.id}
                      to={`/listings?city=${area.name}`}
                      className="relative h-64 md:h-80 rounded-xl overflow-hidden group flex-shrink-0 select-none shadow-lg hover:shadow-2xl transition-all"
                      style={{
                        width: `calc((100% - ${(areasToShow - 1) * 24}px) / ${areasToShow})`,
                        minWidth: `calc((100% - ${(areasToShow - 1) * 24}px) / ${areasToShow})`,
                      }}
                      onClick={(e) => {
                        // Prevent navigation if user was dragging
                        if (Math.abs(touchStart - touchEnd) > 10) {
                          e.preventDefault()
                        }
                      }}
                    >
                      <img
                        src={getImageWithFallback(area.image, 800, 600)}
                        alt={area.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                        onError={handleImageError}
                        draggable="false"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      {/* Modern Card Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPinIcon className="w-6 h-6 text-white" />
                          <span className="text-sm font-medium text-white/90">{area.state}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black mb-3 text-white group-hover:text-primary-100 transition-colors">{area.name}</h3>
                        <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary-100 transition-colors">
                          <span>Explore Properties</span>
                          <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-all duration-300"></div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Dots Indicator */}
              {topAreas.length > areasToShow && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  {Array.from({ length: Math.ceil(topAreas.length / areasToShow) }).map((_, index) => {
                    const maxIndex = Math.max(0, topAreas.length - areasToShow)
                    return (
                    <button
                      key={index}
                        onClick={() => {
                          const newIndex = Math.min(index * areasToShow, maxIndex)
                          setCurrentAreaIndex(newIndex)
                        }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        Math.floor(currentAreaIndex / areasToShow) === index
                          ? 'bg-primary-500 w-8'
                          : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'
                      }`}
                    />
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Featured Listings Section - With Building Silhouette Pattern */}
      <section className="py-20 md:py-28 bg-primary-50/22 dark:bg-gray-900 relative overflow-hidden">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <BlueprintGrid className="w-full h-full text-primary-600" opacity={0.8} />
        </div>
        
        {/* Building Silhouettes Pattern */}
        <div className="absolute top-10 right-10 w-96 h-96 opacity-6 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-500" opacity={0.15} />
        </div>
        <div className="absolute bottom-10 left-10 w-80 h-80 opacity-5 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-400" opacity={0.12} />
        </div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 opacity-4 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-300" opacity={0.1} />
        </div>
        
        {/* Real Estate Wavy Separators */}
        <div className="absolute top-0 left-0 right-0 opacity-18">
          <RealEstateWavy className="w-full h-4 text-primary-400" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 opacity-18">
          <RealEstateWavy className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary-100 dark:bg-primary-900/30 border border-primary-300 text-primary-500 dark:text-primary-400 px-4 py-2 rounded-full text-xs font-bold mb-4">
              Premium Properties
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Featured Listings</h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Handpicked properties that represent the best of Middle Tennessee real estate
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredProperties.slice(0, 4).map((property) => (
              <Link
                key={property.id}
                to={`/properties/${property.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageWithFallback(property.images?.[0], 400, 300)}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={handleImageError}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
                    <div className="text-white text-2xl font-black">{formatPrice(property.price)}</div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <button className="bg-primary-700 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary-800 transition-colors shadow-lg">
                      VIEW
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-gray-900 dark:text-white font-black text-lg mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">{property.title}</h3>
                  <p className="text-gray-800 dark:text-gray-200 text-sm mb-2 font-bold">{property.address}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 font-semibold">
                    {property.bedrooms} bed | {property.bathrooms} bath | {property.squareFeet.toLocaleString()} sqft
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs font-bold">Keller Williams Realty</p>
                </div>
              </Link>
            ))}
            
            {/* View All Button - 5th Card */}
            <Link
              to="/listings"
              className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group flex flex-col items-center justify-center min-h-[400px] relative"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <BlueprintGrid className="w-full h-full text-white" opacity={0.3} />
          </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-5 right-5 w-32 h-32 opacity-5 pointer-events-none">
                <BuildingSilhouette className="w-full h-full text-white" opacity={0.2} />
              </div>
              <div className="absolute bottom-5 left-5 w-24 h-24 opacity-5 pointer-events-none">
                <HouseOutline className="w-full h-full text-white" opacity={0.15} />
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center px-6 py-8">
                <h3 className="text-2xl md:text-3xl font-black mb-4 group-hover:scale-105 transition-transform">
                  View All
                </h3>
                <p className="text-white/90 text-sm mb-6 font-medium max-w-xs mx-auto">
                  Explore our complete collection of premium properties
                </p>
                <div className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg group-hover:shadow-xl transform group-hover:-translate-y-1">
                  <span>Browse All</span>
                  <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How Much Is Your Home Really Worth Section - With Real Estate Vectors */}
      <section id="home-value" className="relative py-20 md:py-28 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getImageWithFallback('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920', 1920, 1080)})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>
        </div>
        
        {/* Real Estate Construction Vectors */}
        <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
          {/* Blueprint Grid */}
          <div className="absolute inset-0">
            <BlueprintGrid className="w-full h-full text-white" opacity={0.1} />
          </div>
          
          {/* Building Silhouettes */}
          <div className="absolute top-20 left-20 w-64 h-64 opacity-15 pointer-events-none animate-float">
            <BuildingSilhouette className="w-full h-full text-primary-300" opacity={0.25} />
          </div>
          <div className="absolute bottom-20 right-20 w-80 h-80 opacity-15 pointer-events-none animate-float" style={{ animationDelay: '1.5s' }}>
            <HouseOutline className="w-full h-full text-primary-200" opacity={0.2} />
          </div>
          
          {/* Construction Lines */}
          <div className="absolute inset-0 opacity-10">
            <ConstructionLines className="w-full h-full text-white" opacity={0.15} />
          </div>
        </div>
        
        {/* Real Estate Wavy Line */}
        <div className="absolute top-1/2 left-0 right-0 opacity-20 hidden lg:block">
          <RealEstateWavy className="w-full h-8 text-white" />
        </div>
        
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="w-full max-w-[1400px] mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
              How Much Is Your Home Really Worth?
            </h2>
            <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/home-value'; }} className="flex flex-col md:flex-row gap-4 mb-6 max-w-2xl mx-auto justify-center items-center">
              <input
                type="text"
                placeholder="Enter Property Address"
                required
                className="flex-1 px-6 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all text-lg font-medium shadow-lg"
              />
              <button
                type="submit"
                className="bg-primary-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-primary-800 transition-all whitespace-nowrap text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
              >
                FIND OUT
              </button>
            </form>
            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto font-bold">
              Just over $92,000 in home equity in the last year.
            </p>
          </div>
        </div>
      </section>

      {/* New Listings Section - Professional Slider Design */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none">
          <BlueprintGrid className="w-full h-full text-primary-500" opacity={0.3} />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-block bg-primary-50 dark:bg-primary-900/20 border border-primary-300 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-xs font-bold mb-3">
              Latest Properties
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">New Listings</h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Fresh properties just added to our collection
            </p>
          </div>
          
          <div className="relative overflow-hidden">
            {/* Slider Container */}
            <div 
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              onTouchStart={handleNewListingTouchStart}
              onTouchMove={handleNewListingTouchMove}
              onTouchEnd={handleNewListingTouchEnd}
              onMouseDown={handleNewListingMouseDown}
              onMouseMove={handleNewListingMouseMove}
              onMouseUp={handleNewListingMouseUp}
              onMouseLeave={handleNewListingMouseUp}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  gap: '24px',
                  transform: `translateX(calc(-${currentNewListingIndex} * ((100% + 24px) / ${newListingsToShow})))`,
                }}
              >
            {newProperties.map((property) => (
              <Link
                key={property.id}
                to={`/properties/${property.id}`}
                    className="flex-shrink-0 select-none group"
                    style={{
                      width: `calc((100% - ${(newListingsToShow - 1) * 24}px) / ${newListingsToShow})`,
                      minWidth: `calc((100% - ${(newListingsToShow - 1) * 24}px) / ${newListingsToShow})`,
                    }}
                    onClick={(e) => {
                      // Prevent navigation if user was dragging
                      if (Math.abs(newListingTouchStart - newListingTouchEnd) > 10) {
                        e.preventDefault()
                      }
                    }}
                  >
                    {/* Professional Card Design */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                      {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                          src={getImageWithFallback(property.images?.[0], 600, 400)}
                    alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={handleImageError}
                          draggable="false"
                        />
                        {/* Subtle Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        {/* Price Badge */}
                        <div className="absolute bottom-3 left-3">
                          <div className="bg-primary-600 text-white px-3 py-1.5 rounded-xl shadow-md">
                            <div className="text-lg font-bold">{formatPrice(property.price)}</div>
                  </div>
                  </div>
                        
                        {/* New Badge */}
                        <div className="absolute top-3 left-3">
                          <div className="bg-white text-primary-600 px-2.5 py-1 rounded-xl text-xs font-semibold uppercase shadow-sm">
                            New
                </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 mb-3">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3.5 h-3.5 text-primary-500" />
                          <span className="text-xs font-medium line-clamp-1">{property.address}</span>
                        </div>
                        
                        {/* Property Details */}
                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faHome} className="w-3.5 h-3.5 text-primary-500" />
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{property.bedrooms}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faBuilding} className="w-3.5 h-3.5 text-primary-500" />
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{property.bathrooms}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faChartLine} className="w-3.5 h-3.5 text-primary-500" />
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{property.squareFeet.toLocaleString()} sqft</span>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="mt-auto pt-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Keller Williams Realty</span>
                          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-primary-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                </div>
              </Link>
            ))}
          </div>
            </div>
            
            {/* Dots Indicator */}
            {newProperties.length > newListingsToShow && (
              <div className="flex justify-center items-center gap-2 mt-6">
                {Array.from({ length: Math.ceil(newProperties.length / newListingsToShow) }).map((_, index) => {
                  const maxIndex = Math.max(0, newProperties.length - newListingsToShow)
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        const newIndex = Math.min(index * newListingsToShow, maxIndex)
                        setCurrentNewListingIndex(newIndex)
                      }}
                      className={`transition-all rounded-full ${
                        Math.floor(currentNewListingIndex / newListingsToShow) === index
                          ? 'bg-primary-600 w-8 h-2'
                          : 'bg-gray-300 dark:bg-gray-600 w-2 h-2 hover:bg-gray-400 dark:hover:bg-gray-500'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Visual Breaker Section - Compact Stats & Visual Design */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url(${getImageWithFallback('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920', 1920, 800)})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-700/90 via-primary-800/85 to-primary-900/90"></div>
        </div>
        
        {/* Simplified Vector Design Overlay */}
        <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
          {/* Layered Blueprint Grid */}
          <div className="absolute inset-0">
            <BlueprintGrid className="w-full h-full text-white" opacity={0.25} />
          </div>
          
          {/* Real Estate Wavy Lines - Top and Bottom */}
          <div className="absolute top-0 left-0 right-0 opacity-20">
            <RealEstateWavy className="w-full h-4 text-white" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 opacity-20">
            <RealEstateWavy className="w-full h-4 text-white" />
          </div>
        </div>
        
        {/* Content with Stats */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-5xl mx-auto">
            {/* Top Badge */}
            <div className="text-center mb-6">
              <div className="inline-block bg-white/25 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold mb-4 border border-white/40 shadow-md">
                Your Real Estate Journey Starts Here
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                Trusted Experience • Proven Results • Personalized Service
              </h3>
              <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto font-medium">
                Serving Middle Tennessee with dedication, expertise, and a commitment to excellence
              </p>
            </div>
            
            {/* Stats Grid - Compact */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-8">
              {/* Stat 1 */}
              <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-lg text-center group hover:bg-white/20 transition-all">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3 mx-auto group-hover:scale-105 transition-transform">
                  <FontAwesomeIcon icon={faChartLine} className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">
                  <AnimatedNumber value={500} suffix="+" />
                </div>
                <div className="text-white/85 text-xs font-semibold uppercase tracking-wide">Properties Sold</div>
              </div>
              
              {/* Stat 2 */}
              <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-lg text-center group hover:bg-white/20 transition-all">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3 mx-auto group-hover:scale-105 transition-transform">
                  <FontAwesomeIcon icon={faHome} className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">
                  <AnimatedNumber value={10} suffix="+" />
                </div>
                <div className="text-white/85 text-xs font-semibold uppercase tracking-wide">Years Experience</div>
              </div>
              
              {/* Stat 3 */}
              <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-lg text-center group hover:bg-white/20 transition-all">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3 mx-auto group-hover:scale-105 transition-transform">
                  <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">
                  <AnimatedNumber value={5.0} decimals={1} />
                </div>
                <div className="text-white/85 text-xs font-semibold uppercase tracking-wide">Client Rating</div>
              </div>
              
              {/* Stat 4 */}
              <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/30 shadow-lg text-center group hover:bg-white/20 transition-all">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3 mx-auto group-hover:scale-105 transition-transform">
                  <FontAwesomeIcon icon={faBuilding} className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">
                  <AnimatedNumber value={98} suffix="%" />
                </div>
                <div className="text-white/85 text-xs font-semibold uppercase tracking-wide">Satisfaction Rate</div>
              </div>
            </div>
            
            {/* Bottom CTA - Compact */}
            <div className="text-center mt-6">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
              >
                <FontAwesomeIcon icon={faHandshake} className="w-4 h-4" />
                <span>Learn More About Our Services</span>
                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - With Mixed Real Estate Vectors */}
      {testimonials.length > 0 && (
        <section className="py-20 md:py-28 bg-primary-50/20 dark:bg-gray-900 relative overflow-hidden">
          {/* Mixed Pattern Background */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035] pointer-events-none">
            <div className="absolute inset-0">
              <BlueprintGrid className="w-full h-full text-primary-500" opacity={0.6} />
              </div>
            <div className="absolute inset-0">
              <ConstructionLines className="w-full h-full text-primary-400" opacity={0.15} />
            </div>
          </div>
          
          {/* Mixed Real Estate Elements */}
          <div className="absolute top-20 left-20 w-72 h-72 opacity-5 pointer-events-none">
            <HouseOutline className="w-full h-full text-primary-400" opacity={0.12} />
          </div>
          <div className="absolute bottom-20 right-20 w-80 h-80 opacity-4 pointer-events-none">
            <BuildingSilhouette className="w-full h-full text-primary-300" opacity={0.1} />
          </div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 opacity-3 pointer-events-none">
            <PropertyBoundary className="w-full h-full text-primary-200" opacity={0.08} />
          </div>
          
          {/* Real Estate Wavy Separators */}
          <div className="absolute top-0 left-0 right-0 opacity-15">
            <RealEstateWavy className="w-full h-5 text-primary-400" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 opacity-15">
            <RealEstateWavy className="w-full h-5 text-primary-400" />
          </div>
          
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary-100 border border-primary-300 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-xs font-bold mb-4 shadow-sm">
               
                <span>Client Testimonials</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                What Our Clients Say
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
                Real experiences from satisfied clients
              </p>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto overflow-hidden">
              {/* Slider Container */}
              <div 
                className="overflow-hidden cursor-grab active:cursor-grabbing"
                onTouchStart={handleTestimonialTouchStart}
                onTouchMove={handleTestimonialTouchMove}
                onTouchEnd={handleTestimonialTouchEnd}
                onMouseDown={handleTestimonialMouseDown}
                onMouseMove={handleTestimonialMouseMove}
                onMouseUp={handleTestimonialMouseUp}
                onMouseLeave={handleTestimonialMouseUp}
              >
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    gap: '32px',
                    transform: `translateX(calc(-${currentTestimonial} * ((100% + 32px) / ${testimonialsToShow})))`,
                  }}
                >
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="flex-shrink-0 select-none"
                      style={{
                        width: `calc((100% - ${(testimonialsToShow - 1) * 32}px) / ${testimonialsToShow})`,
                        minWidth: `calc((100% - ${(testimonialsToShow - 1) * 32}px) / ${testimonialsToShow})`,
                      }}
                    >
                      {/* Testimonial Content - Center Aligned */}
                      <div className="h-full flex flex-col items-center text-center overflow-visible">
                        {/* Long Testimonial Text - 2 Lines with Quotes */}
                        <div className="mb-4 flex-1 max-w-5xl mx-auto relative px-12 md:px-16 lg:px-20 overflow-visible">
                          {/* Left Quote - Centered */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-6xl md:text-7xl lg:text-8xl text-primary-500 dark:text-primary-400 opacity-30 font-serif leading-none">
                            "
                          </div>
                          {/* Right Quote - Centered */}
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-6xl md:text-7xl lg:text-8xl text-primary-500 dark:text-primary-400 opacity-30 font-serif leading-none">
                            "
                          </div>
                          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 leading-relaxed mb-0 font-normal line-clamp-2 relative z-10">
                            {testimonial.text || testimonial.quote}
                          </p>
                        </div>
                        
                        {/* Author & Rating Section */}
                        <div className="mt-auto pt-2 w-full">
                          <div className="flex flex-col items-center gap-3">
                            <p className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">
                              {testimonial.author}
                            </p>
                            {testimonial.location && (
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 text-primary-500" />
                                <span className="font-semibold">{testimonial.location}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <FontAwesomeIcon 
                                  key={i}
                                  icon={faStar} 
                                  className={`w-5 h-5 ${
                                    i < (testimonial.rating || 5)
                                      ? 'text-yellow-400'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Simple Dots Indicator */}
              {testimonials.length > testimonialsToShow && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  {Array.from({ length: Math.ceil(testimonials.length / testimonialsToShow) }).map((_, index) => {
                    const maxIndex = Math.max(0, testimonials.length - testimonialsToShow)
                    return (
                    <button
                      key={index}
                        onClick={() => {
                          const newIndex = Math.min(index * testimonialsToShow, maxIndex)
                          setCurrentTestimonial(newIndex)
                        }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        Math.floor(currentTestimonial / testimonialsToShow) === index
                            ? 'bg-primary-600 w-8'
                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                      }`}
                    />
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export default HomePage
