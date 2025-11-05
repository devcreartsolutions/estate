import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBed, faBath, faRulerCombined, faMapMarkerAlt, faDollarSign, 
  faCalendar, faEnvelope, faPhone, faShareAlt, faHeart, faSave,
  faHome, faBuilding, faChevronLeft, faChevronRight, faCheckCircle,
  faInfoCircle, faChartLine, faGraduationCap, faClock, faTag,
  faLayerGroup, faWater, faTree, faRoad, faCouch, faUtensils,
  faCar, faSwimmingPool, faFire, faWifi, faDumbbell, faShieldAlt,
  faUserTie, faFileAlt, faCalculator, faPercentage, faClock as faTime
} from '@fortawesome/free-solid-svg-icons'
import { propertyService } from '../services/propertyService'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import { getImageWithFallback, handleImageError } from '../utils/imagePlaceholder'

function PropertyDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [broker, setBroker] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [tourForm, setTourForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [tourFormSubmitted, setTourFormSubmitted] = useState(false)
  const [showTourModal, setShowTourModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  
  // Payment calculator state
  const [homePrice, setHomePrice] = useState(1400000)
  const [loanTerm, setLoanTerm] = useState(30)
  const [interestRate, setInterestRate] = useState(5.94)
  const [downPayment, setDownPayment] = useState(20)

  useEffect(() => {
    loadProperty()
  }, [id])

  const loadProperty = async () => {
    setLoading(true)
    try {
      const propertyData = await propertyService.getPropertyById(id)
      if (!propertyData) {
        navigate('/')
        return
      }
      setProperty(propertyData)
      setHomePrice(propertyData.price)
      
      // Load broker info
      const brokerData = await propertyService.getBrokerById(propertyData.brokerId)
      setBroker(brokerData)
    } catch (error) {
      console.error('Error loading property:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateMonthlyPayment = () => {
    const principal = homePrice * (1 - downPayment / 100)
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm * 12
    if (monthlyRate === 0) return principal / numPayments
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    return monthlyPayment
  }

  const monthlyPayment = calculateMonthlyPayment()
  const taxes = monthlyPayment * 0.0389 // Approximate tax calculation
  const principalInterest = monthlyPayment - taxes

  const handleContactSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', { propertyId: id, ...contactForm })
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setShowContactModal(false)
      setContactForm({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  const handleTourSubmit = (e) => {
    e.preventDefault()
    console.log('Tour request submitted:', { propertyId: id, ...tourForm })
    setTourFormSubmitted(true)
    setTimeout(() => {
      setTourFormSubmitted(false)
      setShowTourModal(false)
      setTourForm({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '' })
    }, 3000)
  }

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(2)}M`
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`
    }
    return `$${price.toLocaleString()}`
  }

  const getDaysOnSite = () => {
    if (!property?.createdAt) return 0
    const created = new Date(property.createdAt)
    const now = new Date()
    const diffTime = Math.abs(now - created)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading property...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Secondary Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex justify-between items-center h-14">
            <nav className="flex items-center space-x-6">
              <Link to="/listings" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 transition-colors font-medium">
                Search
              </Link>
              <a href="#overview" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 transition-colors font-medium">
                Overview
              </a>
              <a href="#payment" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 transition-colors font-medium">
                Payment
              </a>
              <a href="#market-insights" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 transition-colors font-medium">
                Market Insights
              </a>
              <a href="#schools" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 transition-colors font-medium">
                Schools
              </a>
            </nav>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-primary-600 text-white px-6 py-2 rounded font-semibold hover:bg-primary-700 transition-colors text-sm flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faDollarSign} className="w-4 h-4" />
                <span>MAKE AN OFFER</span>
              </button>
              <button className="bg-white text-primary-500 border border-primary-500 px-6 py-2 rounded font-semibold hover:bg-primary-50 transition-colors text-sm flex items-center space-x-2">
                <FontAwesomeIcon icon={faShareAlt} className="w-4 h-4" />
                <span>SHARE</span>
              </button>
              <button className="bg-white text-primary-500 border border-primary-500 px-6 py-2 rounded font-semibold hover:bg-primary-50 transition-colors text-sm flex items-center space-x-2">
                <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                <span>SAVE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Property Overview Section */}
      <section id="overview" className="py-8 bg-white dark:bg-gray-900">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image Gallery */}
            <div className="lg:col-span-2">
              <div className="relative h-96 md:h-[600px] bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden mb-4">
                <img
                  src={getImageWithFallback(property.images?.[selectedImage] || property.images?.[0], 1200, 800)}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
              {property.images && property.images.length > 1 ? (
                <div className="grid grid-cols-4 gap-2">
                  {property.images.slice(0, 4).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-24 rounded overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-primary-500'
                          : 'border-transparent hover:border-primary-500'
                      }`}
                    >
                      <img
                        src={getImageWithFallback(img, 300, 200)}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className="relative h-24 rounded overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
                    >
                      <img
                        src={getImageWithFallback(null, 300, 200)}
                        alt={`Placeholder ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Property Info & Tour Request */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Request a Tour</h2>
                
                {/* Calendar Placeholder */}
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <button className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                      <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                      <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                      <span>November 2025</span>
                    </span>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                      <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-gray-600 dark:text-gray-400 font-semibold py-1">
                        {day}
                      </div>
                    ))}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(day => (
                      <button
                        key={day}
                        className={`py-2 rounded transition-colors ${
                          [4, 5, 6].includes(day)
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowTourModal(true)}
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FontAwesomeIcon icon={faCalendar} className="w-5 h-5" />
                  <span>IN PERSON TOUR</span>
                </button>
              </div>

              {/* Agent Info */}
              {broker && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={getImageWithFallback(broker?.avatar, 200, 200)}
                      alt={broker?.name || 'Agent'}
                      className="w-16 h-16 rounded-full object-cover mr-4 aspect-square"
                      onError={handleImageError}
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{broker.name}</div>
                      <Link
                        to="/about"
                        className="text-sm text-primary-500 dark:text-primary-500 hover:underline"
                      >
                        View agent profile
                      </Link>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary-600 text-white px-4 py-2 rounded font-semibold hover:bg-primary-700 transition-colors text-sm flex items-center justify-center space-x-2">
                      <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                      <span>EMAIL</span>
                    </button>
                    <button className="flex-1 bg-primary-600 text-white px-4 py-2 rounded font-semibold hover:bg-primary-700 transition-colors text-sm flex items-center justify-center space-x-2">
                      <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                      <span>CALL</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Property Address & Price */}
          <div className="mt-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{property.address}</h1>
            <div className="flex flex-wrap items-center gap-6 mb-4">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faDollarSign} className="w-8 h-8 text-primary-500 dark:text-primary-500" />
                <div className="text-4xl font-bold text-primary-500 dark:text-primary-500">
                  {formatPrice(property.price)}
                </div>
              </div>
              <div className="flex items-center space-x-2 text-lg text-gray-700 dark:text-gray-300">
                <FontAwesomeIcon icon={faCalculator} className="w-5 h-5 text-primary-500 dark:text-primary-500" />
                <span>Est. Payment: <span className="font-semibold">${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <FontAwesomeIcon icon={faTag} className="w-4 h-4 text-primary-500 dark:text-primary-500" />
                <span>Status: <span className="font-semibold text-green-600 dark:text-green-500">{property.status || 'Active'}</span></span>
                <span className="mx-2">•</span>
                <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-primary-500 dark:text-primary-500" />
                <span>Days on site: <span className="font-semibold">{getDaysOnSite()}</span></span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 mb-4">
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <FontAwesomeIcon icon={faBed} className="w-5 h-5 text-primary-500 dark:text-primary-500" />
                <span className="font-semibold">{property.bedrooms || 'N/A'} Bed</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <FontAwesomeIcon icon={faBath} className="w-5 h-5 text-primary-500 dark:text-primary-500" />
                <span className="font-semibold">{property.bathrooms || 'N/A'} Bath</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <FontAwesomeIcon icon={faRulerCombined} className="w-5 h-5 text-primary-500 dark:text-primary-500" />
                <span className="font-semibold">{property.squareFeet ? `${property.squareFeet.toLocaleString()} SqFt` : 'N/A SqFt'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-primary-500 dark:text-primary-500" />
                <span className="font-semibold">{property.city || 'Nashville'}, {property.state || 'TN'}</span>
              </div>
            </div>
            <Link to="/financing" className="text-blue-600 dark:text-blue-400 hover:underline">
              Get Pre-Qualified
            </Link>
          </div>
        </div>
      </section>

      {/* Property Details Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Description & Details */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">House Description</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faBuilding} className="w-5 h-5 text-primary-500 dark:text-primary-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Listed by</div>
                      <div className="text-gray-900 dark:text-white font-semibold">
                        {broker?.company || 'Keller Williams Realty Nashville/Franklin'}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 flex items-center space-x-1 mt-1">
                        <FontAwesomeIcon icon={faPhone} className="w-3 h-3" />
                        <span>{broker?.phone || '(615) 781-818'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faHome} className="w-5 h-5 text-primary-500 dark:text-primary-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Property Type</div>
                      <div className="text-gray-900 dark:text-white font-semibold">{property.type === 'sale' ? 'Residential' : 'Rental'}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faRulerCombined} className="w-5 h-5 text-primary-500 dark:text-primary-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Lot/Acreage</div>
                      <div className="text-gray-900 dark:text-white font-semibold">{property.lotSize || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-primary-500 dark:text-primary-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">County</div>
                      <div className="text-gray-900 dark:text-white font-semibold">{property.state || 'TN'}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-primary-500 dark:text-primary-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Neighborhood</div>
                      <div className="text-gray-900 dark:text-white font-semibold">{property.city || 'Nashville'}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faTag} className="w-5 h-5 text-primary-500 dark:text-primary-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Listing ID</div>
                      <div className="text-gray-900 dark:text-white font-semibold">{property.id}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interior Features */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mt-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Interior Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faRulerCombined} className="w-5 h-5 text-primary-500 dark:text-primary-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Above Ground Sq Ft</div>
                      <div className="text-gray-900 dark:text-white font-semibold">
                        {property.squareFeet ? `${property.squareFeet.toLocaleString()}` : 'N/A'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faLayerGroup} className="w-5 h-5 text-primary-500 dark:text-primary-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Below Ground Sq Ft</div>
                      <div className="text-gray-900 dark:text-white font-semibold">N/A</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faWater} className="w-5 h-5 text-primary-500 dark:text-primary-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Water</div>
                      <div className="text-gray-900 dark:text-white font-semibold">Public</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exterior Features */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mt-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Exterior Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faTree} className="w-5 h-5 text-primary-500 dark:text-primary-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Lot</div>
                      <div className="text-gray-900 dark:text-white font-semibold">Wooded</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faRoad} className="w-5 h-5 text-primary-500 dark:text-primary-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Zoning</div>
                      <div className="text-gray-900 dark:text-white font-semibold">RP-5</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faWater} className="w-5 h-5 text-primary-500 dark:text-primary-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sewer</div>
                      <div className="text-gray-900 dark:text-white font-semibold">Septic Tank</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features List */}
              {property.features && property.features.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mt-6 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                        <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-primary-500 dark:text-primary-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Agent Contact */}
            {broker && (
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 sticky top-32">
                  <div className="flex flex-col items-center mb-6">
                    <img
                      src={getImageWithFallback(broker?.avatar, 200, 200)}
                      alt={broker?.name || 'Agent'}
                      className="w-24 h-24 rounded-full object-cover mb-4"
                      onError={handleImageError}
                    />
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{broker.name}</div>
                      <Link
                        to="/about"
                        className="text-sm text-primary-500 dark:text-primary-500 hover:underline"
                      >
                        View agent profile
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="w-full bg-primary-600 text-white px-4 py-3 rounded font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                      <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                      <span>EMAIL</span>
                    </button>
                    <button className="w-full bg-primary-600 text-white px-4 py-3 rounded font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                      <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                      <span>CALL</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Payment Calculator Section */}
      <section id="payment" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Payment Calculator</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Breakdown */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <FontAwesomeIcon icon={faDollarSign} className="w-8 h-8 text-primary-500 dark:text-primary-500" />
                  <div className="text-5xl font-bold text-primary-500 dark:text-primary-500">
                    {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold">Monthly Payment</div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faHome} className="w-4 h-4 text-primary-500 dark:text-primary-500" />
                    <span className="text-gray-700 dark:text-gray-300">Principal & Interest</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${principalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faFileAlt} className="w-4 h-4 text-primary-500 dark:text-primary-500" />
                    <span className="text-gray-700 dark:text-gray-300">Taxes</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${taxes.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Loan Details</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Home Price
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">$</span>
                    <input
                      type="number"
                      value={homePrice}
                      onChange={(e) => setHomePrice(parseInt(e.target.value))}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Loan Term
                  </label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value={15}>15 yrs</option>
                    <option value={20}>20 yrs</option>
                    <option value={30}>30 yrs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interest Rate
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    <span className="text-gray-600 dark:text-gray-400">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Down Payment
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(parseInt(e.target.value))}
                      className="w-20 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    <span className="text-gray-600 dark:text-gray-400">%</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-auto font-semibold">
                      ${(homePrice * downPayment / 100).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Today's Rates */}
              <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Today's Rates</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">30 year:</span>
                    <span className="text-gray-900 dark:text-white font-semibold">5.94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">20 year:</span>
                    <span className="text-gray-900 dark:text-white font-semibold">5.95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">15 year:</span>
                    <span className="text-gray-900 dark:text-white font-semibold">5.72%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Never Miss a Property Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">NEVER MISS A PROPERTY</h2>
          <p className="text-xl mb-8">Be the first to know when a property hits the market.</p>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            Sign Up
          </button>
        </div>
      </section>

      {/* Market Insights Section */}
      <section id="market-insights" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Market Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md">
              <div className="flex items-center space-x-2 mb-3">
                <FontAwesomeIcon icon={faHome} className="w-5 h-5 text-primary-500 dark:text-primary-500" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Current Listings</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">LAST 30 DAYS</div>
              <div className="text-gray-600 dark:text-gray-400">N/A</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-2 flex items-center space-x-1">
                <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                <span>Nov 2025</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md">
              <div className="flex items-center space-x-2 mb-3">
                <FontAwesomeIcon icon={faDollarSign} className="w-5 h-5 text-primary-500 dark:text-primary-500" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Price</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">ALL PRICE RANGES</div>
              <div className="text-gray-600 dark:text-gray-400">N/A</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-2 flex items-center space-x-1">
                <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                <span>Nov 2025</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md">
              <div className="flex items-center space-x-2 mb-3">
                <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-primary-500 dark:text-primary-500" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Days on Market</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">ALL PRICE RANGES</div>
              <div className="text-gray-600 dark:text-gray-400">N/A</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-2 flex items-center space-x-1">
                <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                <span>Nov 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            The data relating to real estate for sale on this web site comes in part from the IDX program of the Realtracs MLS. Real estate listings held by brokerage firms other than Keller Williams Realty are marked with the IDX logo and detailed information about them includes the name of the listing brokers. Information deemed reliable but not guaranteed. Copyright Realtracs MLS 2015.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>IDX service by Blucroof 360</span>
            <span>•</span>
            <span>Data last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            <span>•</span>
            <span>© 2015 Realtracs MLS</span>
          </div>
        </div>
      </section>

      <Footer />

      {/* Tour Request Modal */}
      <Modal
        isOpen={showTourModal}
        onClose={() => setShowTourModal(false)}
        title="Request a Tour"
      >
        {tourFormSubmitted ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
            <p className="text-gray-600 dark:text-gray-400">We'll contact you soon to schedule your tour.</p>
          </div>
        ) : (
          <form onSubmit={handleTourSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={tourForm.name}
                onChange={(e) => setTourForm({ ...tourForm, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={tourForm.email}
                onChange={(e) => setTourForm({ ...tourForm, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={tourForm.phone}
                onChange={(e) => setTourForm({ ...tourForm, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                value={tourForm.preferredDate}
                onChange={(e) => setTourForm({ ...tourForm, preferredDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Time
              </label>
              <input
                type="time"
                value={tourForm.preferredTime}
                onChange={(e) => setTourForm({ ...tourForm, preferredTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Submit Request
            </button>
          </form>
        )}
      </Modal>

      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Make an Offer"
      >
        {formSubmitted ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
            <p className="text-gray-600 dark:text-gray-400">We'll contact you soon regarding your offer.</p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Tell us about your offer..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Submit Offer
            </button>
          </form>
        )}
      </Modal>
    </div>
  )
}

export default PropertyDetailPage
