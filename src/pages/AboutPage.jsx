import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faEnvelope, faPhone, faBuilding, faHome, faUserTie, faDollarSign, 
  faChartLine, faHandshake, faChevronRight, faAward, faStar, faMapMarkerAlt,
  faCheckCircle, faQuoteLeft, faQuoteRight, faTrophy, faCertificate
} from '@fortawesome/free-solid-svg-icons'
import { propertyService } from '../services/propertyService'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import { getImageWithFallback, handleImageError } from '../utils/imagePlaceholder'
import ServiceAreaMap from '../components/ServiceAreaMap'
import { WavyLine, DiagonalLines, GridLines, ZigzagLine, CurvedLine, DottedLine, ArrowLine, DecorativeCircle, AbstractShape, BlueprintGrid, ConstructionLines, BuildingSilhouette, HouseOutline, BlueprintLines, PropertyBoundary, RealEstateWavy } from '../components/VectorIllustrations'

function AboutPage() {
  const [broker, setBroker] = useState(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'buying',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    loadBroker()
  }, [])

  const loadBroker = async () => {
    try {
      const brokerData = await propertyService.getBrokerById('broker1')
      setBroker(brokerData)
    } catch (error) {
      console.error('Error loading broker:', error)
    }
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', contactForm)
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setShowContactModal(false)
      setContactForm({ name: '', email: '', phone: '', message: '', interest: 'buying' })
    }, 3000)
  }

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Nashville, TN',
      text: 'Jamison made our home buying experience seamless. His knowledge of the market and attention to detail is unmatched. Highly recommend!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Franklin, TN',
      text: 'Professional, responsive, and truly cares about his clients. Jamison helped us sell our home quickly and at the best price.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      location: 'Spring Hill, TN',
      text: 'As a first-time homebuyer, I was nervous about the process. Jamison guided me every step of the way and made it stress-free.',
      rating: 5
    }
  ]

  // Certifications data
  const certifications = [
    { name: 'Licensed Real Estate Broker', icon: faCertificate },
    { name: 'Certified Residential Specialist', icon: faAward },
    { name: 'Top Producer Award', icon: faTrophy },
    { name: '10+ Years Experience', icon: faStar }
  ]

  if (!broker) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
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
            backgroundImage: `url(${getImageWithFallback('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920', 1920, 1080)})`,
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
          {/* Real Estate Themed Line Vector */}
          <div className="absolute top-0 left-0 w-full opacity-30 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
            <RealEstateWavy className="w-full h-3 text-white" />
          </div>
          <div className="absolute bottom-0 left-0 w-full opacity-30 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
            <BlueprintLines className="w-full h-3 text-white" />
          </div>
          <div className="relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Image Card */}
            <div className="shrink-0 w-full md:w-auto">
              <div className="relative inline-block">
                <div className="bg-white rounded-2xl p-4 border-2 border-primary-500 shadow-2xl">
                  <img
                    src={getImageWithFallback(broker.avatar, 600, 600)}
                    alt={broker.name}
                    className="w-full max-w-sm rounded-xl object-cover aspect-square"
                    onError={handleImageError}
                  />
                </div>
                {/* Rating Badge */}
                <div className="absolute -bottom-2 -left-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl shadow-lg border border-gray-200">
                  <div className="flex items-center space-x-1.5">
                    <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-base">5.0</span>
                  </div>
                  <div className="text-xs text-gray-600 font-medium">Client Rating</div>
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="flex-1 text-center md:text-left w-full">
              {/* Badge */}
              <div className="inline-block bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-primary-500">
                Your Trusted Real Estate Expert
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                About {broker.name.split(' ')[0]}
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl mb-8 leading-relaxed text-white/95 max-w-2xl mx-auto md:mx-0">
                {broker.bio}
              </p>
              
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-primary-600 rounded-xl p-4 border border-primary-500 shadow-md">
                  <div className="flex items-center space-x-3 mb-2">
                    <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-white" />
                    <div className="text-xs text-white font-medium">Email</div>
                  </div>
                  <a href={`mailto:${broker.email}`} className="text-white font-semibold hover:text-primary-100 hover:underline text-sm md:text-base block">
                    {broker.email}
                  </a>
                </div>
                <div className="bg-primary-600 rounded-xl p-4 border border-primary-500 shadow-md">
                  <div className="flex items-center space-x-3 mb-2">
                    <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-white" />
                    <div className="text-xs text-white font-medium">Phone</div>
                  </div>
                  <a href={`tel:${broker.phone}`} className="text-white font-semibold hover:text-primary-100 hover:underline text-sm md:text-base block">
                    {broker.phone}
                  </a>
                </div>
                <div className="bg-primary-600 rounded-xl p-4 border border-primary-500 shadow-md">
                  <div className="flex items-center space-x-3 mb-2">
                    <FontAwesomeIcon icon={faBuilding} className="w-5 h-5 text-white" />
                    <div className="text-xs text-white font-medium">Company</div>
                  </div>
                  <span className="text-white font-semibold text-sm md:text-base block">{broker.company}</span>
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="bg-white text-primary-500 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg border-2 border-primary-500 min-w-[140px]"
                >
                  Let's Talk
                </button>
                <Link
                  to="/listings"
                  className="bg-primary-600 text-white border-2 border-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all min-w-[140px] text-center shadow-lg"
                >
                  View Listings
                </Link>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Stats Section - With Blueprint Grid Pattern */}
      <section className="py-16 md:py-24 bg-primary-50/26 dark:bg-gray-800 relative overflow-hidden">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <BlueprintGrid className="w-full h-full text-primary-500" opacity={0.65} />
        </div>
        
        {/* Property Boundaries */}
        <div className="absolute top-10 right-10 w-80 h-80 opacity-5 pointer-events-none">
          <PropertyBoundary className="w-full h-full text-primary-400" opacity={0.15} />
        </div>
        <div className="absolute bottom-10 left-10 w-72 h-72 opacity-4 pointer-events-none">
          <PropertyBoundary className="w-full h-full text-primary-300" opacity={0.12} />
        </div>
        
        {/* Blueprint Line Separators */}
        <div className="absolute top-0 left-0 right-0 opacity-15">
          <BlueprintLines className="w-full h-4 text-primary-400" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 opacity-15">
          <BlueprintLines className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">My Track Record</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Proven results that speak for themselves
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-bold text-primary-500 mb-4 text-center md:text-left">10+</div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 text-center md:text-left">Years Experience</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-center md:text-left">
                Over a decade of helping clients find their dream homes and achieve their real estate goals
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-bold text-primary-500 mb-4 text-center md:text-left">500+</div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 text-center md:text-left">Homes Sold</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-center md:text-left">
                Successfully closed hundreds of real estate transactions with satisfied clients
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <FontAwesomeIcon icon={faStar} className="w-10 md:w-12 h-10 md:h-12 text-yellow-500" />
                <div className="text-5xl md:text-6xl font-bold text-primary-500">5.0</div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 text-center md:text-left">Client Rating</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-center md:text-left">
                Consistently delivering exceptional service and outstanding results for every client
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section - With Construction Lines Pattern */}
      <section className="py-16 md:py-24 bg-primary-100/10 dark:bg-gray-900 relative overflow-hidden">
        {/* Construction Lines Background */}
        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none">
          <ConstructionLines className="w-full h-full text-primary-500" opacity={0.27} />
        </div>
        
        {/* House Outlines */}
        <div className="absolute top-20 right-20 w-96 h-96 opacity-5 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-400" opacity={0.12} />
        </div>
        <div className="absolute bottom-20 left-20 w-80 h-80 opacity-4 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-300" opacity={0.1} />
        </div>
        
        {/* Real Estate Wavy Separators */}
        <div className="absolute top-0 left-0 right-0 opacity-15">
          <RealEstateWavy className="w-full h-5 text-primary-400" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 opacity-15">
          <RealEstateWavy className="w-full h-5 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
            {/* Left Column - Text Content */}
            <div className="flex flex-col h-full">
              <div className="inline-block bg-primary-100 dark:bg-primary-800/30 text-primary-500 dark:text-primary-500 px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit">
                Why Choose Me
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Your Real Estate Success is My Priority
              </h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                With over a decade of experience in Middle Tennessee real estate, I bring a unique combination of 
                local market expertise, negotiation skills, and personalized service to every transaction. My approach 
                is simple: listen to your needs, understand your goals, and deliver results that exceed expectations.
              </p>
              <div className="space-y-4">
                {[
                  'Local market expert with deep knowledge of Nashville & surrounding areas',
                  'Proven track record of successful transactions',
                  'Personalized service tailored to your unique needs',
                  'Transparent communication throughout the entire process',
                  'Dedicated to finding the perfect home or selling at the best price'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-primary-500 dark:text-primary-500 mt-0.5 shrink-0" />
                    <span className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Map Card */}
            <div className="flex flex-col h-full">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-800/20 dark:to-primary-700/20 rounded-2xl p-6 lg:p-8 h-full flex flex-col">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-primary-100 dark:bg-primary-800/30 p-3 rounded-xl shrink-0">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-8 h-8 text-primary-500 dark:text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Serving Middle Tennessee</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Specialized local expertise</p>
                    </div>
                  </div>
                  {/* Interactive Map */}
                  <div className="mb-6 w-full flex-shrink-0">
                    <ServiceAreaMap />
                  </div>
                  {/* City List */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    {['Nashville', 'Franklin', 'Spring Hill', 'Columbia', 'Brentwood', 'Murfreesboro'].map((city, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 text-primary-500 dark:text-primary-500 shrink-0" />
                        <span className="text-sm font-medium">{city}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Awards - With Property Boundaries */}
      <section className="py-16 md:py-24 bg-primary-50/28 dark:bg-gray-900 relative overflow-hidden">
        {/* Property Boundary Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <PropertyBoundary className="w-full h-full text-primary-500" opacity={0.15} />
        </div>
        
        {/* House Outlines */}
        <div className="absolute top-10 right-10 w-80 h-80 opacity-5 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-400" opacity={0.12} />
        </div>
        <div className="absolute bottom-10 left-10 w-64 h-64 opacity-4 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-300" opacity={0.1} />
        </div>
        
        {/* Blueprint Line Separator */}
        <div className="absolute top-0 left-0 right-0 opacity-12">
          <BlueprintLines className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">Certifications & Awards</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Recognized expertise and professional achievements
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center border border-gray-100 dark:border-gray-800"
              >
                <FontAwesomeIcon icon={cert.icon} className="w-10 h-10 text-primary-500 dark:text-primary-500 mb-4" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{cert.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Expertise - With Building Silhouette Pattern */}
      <section className="py-16 md:py-24 bg-primary-50/16 dark:bg-gray-900 relative overflow-hidden">
        {/* Building Silhouette Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035] pointer-events-none">
          <div className="absolute inset-0">
            <BuildingSilhouette className="w-full h-full text-primary-500" opacity={0.14} />
          </div>
          <div className="absolute inset-0">
            <BlueprintGrid className="w-full h-full text-primary-400" opacity={0.5} />
          </div>
        </div>
        
        {/* Building Elements */}
        <div className="absolute top-10 right-10 w-96 h-96 opacity-5 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-400" opacity={0.12} />
        </div>
        <div className="absolute bottom-10 left-10 w-80 h-80 opacity-4 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-300" opacity={0.1} />
        </div>
        
        {/* Blueprint Line Separators */}
        <div className="absolute top-0 left-0 right-0 opacity-15">
          <BlueprintLines className="w-full h-4 text-primary-400" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 opacity-15">
          <BlueprintLines className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">Areas of Expertise</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Specialized services tailored to your needs
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-gradient-to-br from-primary-50 to-white dark:from-primary-800/20 dark:to-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-primary-100 dark:border-primary-800/30">
                <div className="bg-primary-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={faHome} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Residential Real Estate</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Specializing in single-family homes, condos, and townhouses across Middle Tennessee. 
                  Whether you're buying or selling, I'll help you navigate the market with confidence.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-white dark:from-primary-800/20 dark:to-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-primary-100 dark:border-primary-800/30">
                <div className="bg-primary-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={faUserTie} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">First-Time Buyers</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Expert guidance for first-time homebuyers navigating the process. I'll explain every step, 
                  answer all your questions, and make your first home purchase smooth and stress-free.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-white dark:from-primary-800/20 dark:to-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-primary-100 dark:border-primary-800/30">
                <div className="bg-primary-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={faDollarSign} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Luxury Properties</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Experience with high-end properties and luxury market segments. Discreet service and 
                  exclusive access to premium listings throughout Middle Tennessee.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-white dark:from-primary-800/20 dark:to-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-primary-100 dark:border-primary-800/30">
                <div className="bg-primary-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={faChartLine} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Investment Properties</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Strategic advice for real estate investors and property portfolios. I'll help you identify 
                  opportunities, analyze returns, and build your investment portfolio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials - With Blueprint Grid */}
      <section className="py-20 md:py-28 bg-primary-100/12 dark:bg-gray-900 relative overflow-hidden">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <BlueprintGrid className="w-full h-full text-primary-500" opacity={0.15} />
        </div>
        
        {/* Building Silhouettes */}
        <div className="absolute top-20 left-20 w-96 h-96 opacity-5 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-400" opacity={0.12} />
        </div>
        <div className="absolute bottom-20 right-20 w-80 h-80 opacity-4 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-300" opacity={0.1} />
        </div>
        
        {/* Blueprint Line Separators */}
        <div className="absolute top-0 left-0 right-0 opacity-12">
          <BlueprintLines className="w-full h-4 text-primary-400" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 opacity-12">
          <BlueprintLines className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Client Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
              What Clients Say
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Real experiences from real clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="text-center"
              >
                {/* Rating Stars */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FontAwesomeIcon 
                      key={i} 
                      icon={faStar} 
                      className="w-5 h-5 text-yellow-400" 
                    />
                  ))}
                </div>
                
                {/* Quote Icon */}
                <div className="mb-4">
                  <FontAwesomeIcon icon={faQuoteLeft} className="w-10 h-10 text-primary-500 dark:text-primary-400 opacity-30" />
                </div>
                
                {/* Testimonial Text */}
                <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed mb-6 font-medium">
                  {testimonial.text}
                </p>
                
                {/* Author Info */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - With Mixed Real Estate Vectors */}
      <section className="py-16 md:py-24 bg-primary-100/14 dark:bg-gray-900 relative overflow-hidden">
        {/* Mixed Pattern Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035] pointer-events-none">
          <div className="absolute inset-0">
            <ConstructionLines className="w-full h-full text-primary-500" opacity={0.2} />
          </div>
          <div className="absolute inset-0">
            <PropertyBoundary className="w-full h-full text-primary-400" opacity={0.12} />
          </div>
        </div>
        
        {/* Mixed Real Estate Elements */}
        <div className="absolute top-10 left-10 w-96 h-96 opacity-5 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-400" opacity={0.12} />
        </div>
        <div className="absolute bottom-10 right-10 w-80 h-80 opacity-4 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-300" opacity={0.1} />
        </div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 opacity-3 pointer-events-none">
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
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">How I Can Help</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive real estate services for every need
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 group">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Buying a Home</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                I'll help you find the perfect home that meets your needs and budget. From initial search to closing, 
                I'll guide you through every step of the process with expertise and care.
              </p>
              <Link
                to="/buying"
                className="text-primary-500 dark:text-primary-500 font-semibold hover:text-primary-600 dark:hover:text-primary-500 inline-flex items-center group-hover:translate-x-2 transition-transform"
              >
                Learn More <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 group">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Selling Your Home</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Get the most value for your property with my proven marketing strategies. I'll help you price it right, 
                market it effectively, and close the deal quickly.
              </p>
              <Link
                to="/selling"
                className="text-primary-500 dark:text-primary-500 font-semibold hover:text-primary-600 dark:hover:text-primary-500 inline-flex items-center group-hover:translate-x-2 transition-transform"
              >
                Learn More <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 group">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Home Financing</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Need help with financing? I can connect you with trusted lenders and help you find the best mortgage 
                options for your situation.
              </p>
              <Link
                to="/financing"
                className="text-primary-500 dark:text-primary-500 font-semibold hover:text-primary-600 dark:hover:text-primary-500 inline-flex items-center group-hover:translate-x-2 transition-transform"
              >
                Learn More <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 group">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Home Valuation</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Curious about your home's value? Get an instant, accurate estimate based on current market data 
                and comparable sales in your area.
              </p>
              <Link
                to="/home-value"
                className="text-primary-500 dark:text-primary-500 font-semibold hover:text-primary-600 dark:hover:text-primary-500 inline-flex items-center group-hover:translate-x-2 transition-transform"
              >
                Get Your Home Value <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - With Real Estate Vectors */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white relative overflow-hidden">
        {/* Real Estate Construction Vectors */}
        <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
          <div className="absolute inset-0">
            <ConstructionLines className="w-full h-full text-white" opacity={0.1} />
          </div>
          <div className="absolute top-20 left-20 w-96 h-96 opacity-8">
            <BuildingSilhouette className="w-full h-full text-white" opacity={0.18} />
          </div>
          <div className="absolute bottom-20 right-20 w-80 h-80 opacity-6">
            <HouseOutline className="w-full h-full text-white" opacity={0.15} />
          </div>
        </div>
        
        {/* Real Estate Line Separators */}
        <div className="absolute top-0 left-0 right-0 opacity-20">
          <RealEstateWavy className="w-full h-5 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 opacity-20">
          <BlueprintLines className="w-full h-5 text-white" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/95">
            Let's discuss your real estate goals and how I can help you achieve them. 
            Schedule a free consultation today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-white text-primary-500 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-lg"
            >
              Let's Talk
            </button>
            <Link
              to="/listings"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all transform hover:scale-105 text-lg"
            >
              View Listings
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Let's Talk"
      >
        {formSubmitted ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
            <p className="text-gray-600 dark:text-gray-400">We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                I'm interested in:
              </label>
              <select
                value={contactForm.interest}
                onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="buying">I'm interested in buying a home</option>
                <option value="selling">I'm interested in selling a home</option>
                <option value="both">I'm interested in buying and selling</option>
                <option value="renting">I'm interested in finding a home to rent</option>
                <option value="career">I'm interested in a real estate career</option>
                <option value="other">Other reason to contact an agent</option>
              </select>
            </div>
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
                Phone
              </label>
              <input
                type="tel"
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
                placeholder="Tell me about your real estate goals..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-500 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Send Us A Message
            </button>
          </form>
        )}
      </Modal>
    </div>
  )
}

export default AboutPage
