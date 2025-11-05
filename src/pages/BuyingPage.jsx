import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { getImageWithFallback } from '../utils/imagePlaceholder'
import { WavyLine, DiagonalLines, GridLines, ZigzagLine, CurvedLine, DottedLine, ArrowLine, DecorativeCircle, AbstractShape, BlueprintGrid, ConstructionLines, BuildingSilhouette, HouseOutline, BlueprintLines, PropertyBoundary, RealEstateWavy } from '../components/VectorIllustrations'

function BuyingPage() {
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    buyingTimeline: '',
    preApproved: '',
  })

  const handleContactSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', contactForm)
    alert('Thank you! We will contact you soon.')
    setShowContactModal(false)
    setContactForm({ name: '', email: '', phone: '', message: '', buyingTimeline: '', preApproved: '' })
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
              <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
              <span className="text-xs font-bold">Buying Your Dream Home</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Buying a Home
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed max-w-2xl mx-auto font-medium">
              Let's find your dream home together. I'll guide you through every step of the buying process.
            </p>
            
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
            >
              Start The Process
            </button>
          </div>
        </div>
      </section>

      {/* Process Section - With Blueprint Grid Pattern */}
      <section className="py-20 md:py-28 bg-primary-50/18 dark:bg-gray-900 relative overflow-hidden">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <BlueprintGrid className="w-full h-full text-primary-500" opacity={0.7} />
        </div>
        
        {/* Building Silhouettes */}
        <div className="absolute top-10 right-10 w-80 h-80 opacity-5 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-400" opacity={0.12} />
        </div>
        <div className="absolute bottom-10 left-10 w-72 h-72 opacity-4 pointer-events-none">
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
            <div className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Step by Step
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">The Buying Process</h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Your journey to homeownership made simple
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-black text-primary-600 dark:text-primary-500 mb-4">1</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Get Pre-Approved</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Start by getting pre-approved for a mortgage. This helps you understand your budget and shows sellers you're serious.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-black text-primary-600 dark:text-primary-500 mb-4">2</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Find Your Home</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Browse listings, attend open houses, and schedule viewings. I'll help you find properties that match your criteria.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-black text-primary-600 dark:text-primary-500 mb-4">3</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Make an Offer</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Once you find the perfect home, I'll help you craft a competitive offer and negotiate the best terms.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-black text-primary-600 dark:text-primary-500 mb-4">4</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Home Inspection</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We'll arrange a professional inspection to ensure the property is in good condition.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-black text-primary-600 dark:text-primary-500 mb-4">5</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Finalize Financing</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Work with your lender to finalize your mortgage and secure financing.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-black text-primary-600 dark:text-primary-500 mb-4">6</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Closing</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Sign the paperwork, get your keys, and move into your new home!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section - With Property Boundaries */}
      <section className="py-20 md:py-28 bg-primary-50/25 dark:bg-gray-900 relative overflow-hidden">
        {/* Property Boundary Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <PropertyBoundary className="w-full h-full text-primary-500" opacity={0.2} />
        </div>
        
        {/* House Outlines */}
        <div className="absolute top-10 right-10 w-80 h-80 opacity-5 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-400" opacity={0.12} />
        </div>
        <div className="absolute bottom-10 left-10 w-72 h-72 opacity-4 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-300" opacity={0.1} />
        </div>
        
        {/* Real Estate Wavy Separator */}
        <div className="absolute top-0 left-0 right-0 opacity-15">
          <RealEstateWavy className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Helpful Resources
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Resources</h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Tools and guides to help you through the process
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Buying a Home Guide</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Download our comprehensive guide to buying a home, covering everything from pre-approval to closing.
              </p>
              <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl">
                Download Guide
              </button>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mortgage Calculator</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Calculate your monthly mortgage payment and see how much home you can afford.
              </p>
              <Link
                to="/financing"
                className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl inline-block"
              >
                Use Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - With Real Estate Vectors */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        {/* Real Estate Construction Vectors */}
        <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
          <div className="absolute inset-0">
            <ConstructionLines className="w-full h-full text-white" opacity={0.1} />
          </div>
          <div className="absolute top-10 right-10 w-96 h-96 opacity-8">
            <BuildingSilhouette className="w-full h-full text-white" opacity={0.18} />
          </div>
          <div className="absolute bottom-10 left-10 w-80 h-80 opacity-6">
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
        <div className="absolute bottom-1/3 left-0 right-0 opacity-20 hidden lg:block">
          <ArrowLine className="w-full h-8 text-white" direction="left" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/95 font-medium">Let's start your home buying journey today.</p>
          <button
            onClick={() => setShowContactModal(true)}
            className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      <Footer />

      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Let's Get Started"
      >
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              When are you planning on buying a new home?
            </label>
            <select
              value={contactForm.buyingTimeline}
              onChange={(e) => setContactForm({ ...contactForm, buyingTimeline: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select timeline</option>
              <option value="1-3mo">1-3 Months</option>
              <option value="3-6mo">3-6 Months</option>
              <option value="6+mo">6+ Months</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Are you pre-approved for a mortgage?
            </label>
            <select
              value={contactForm.preApproved}
              onChange={(e) => setContactForm({ ...contactForm, preApproved: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="cash">Using Cash</option>
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
              Message
            </label>
            <textarea
              rows={4}
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Tell us about your home buying goals..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default BuyingPage

