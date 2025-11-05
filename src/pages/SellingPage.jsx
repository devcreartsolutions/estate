import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { getImageWithFallback } from '../utils/imagePlaceholder'
import { WavyLine, DiagonalLines, GridLines, ZigzagLine, CurvedLine, DottedLine, ArrowLine, DecorativeCircle, AbstractShape, BlueprintGrid, ConstructionLines, BuildingSilhouette, HouseOutline, BlueprintLines, PropertyBoundary, RealEstateWavy } from '../components/VectorIllustrations'

function SellingPage() {
  const [showContactModal, setShowContactModal] = useState(false)
  const [showValueModal, setShowValueModal] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    sellingTimeline: '',
  })

  const handleContactSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', contactForm)
    alert('Thank you! We will contact you soon.')
    setShowContactModal(false)
    setContactForm({ name: '', email: '', phone: '', message: '', sellingTimeline: '' })
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
            backgroundImage: `url(${getImageWithFallback('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920', 1920, 1080)})`,
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
              <FontAwesomeIcon icon={faChartLine} className="w-4 h-4" />
              <span className="text-xs font-bold">Selling Your Home</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Selling Your Home
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed max-w-2xl mx-auto font-medium">
              Ready to sell? I'm ready to help! Get the most value for your property with my proven marketing strategies.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setShowValueModal(true)}
                className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
              >
                Get Home Value
              </button>
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
              >
                Start The Process
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - With Construction Lines Pattern */}
      <section className="py-20 md:py-28 bg-primary-100/15 dark:bg-gray-900 relative overflow-hidden">
        {/* Construction Lines Background */}
        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none">
          <ConstructionLines className="w-full h-full text-primary-500" opacity={0.28} />
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
          <RealEstateWavy className="w-full h-4 text-primary-400" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 opacity-15">
          <RealEstateWavy className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Step by Step
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">The Selling Process</h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Maximize your home's value with our proven process
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-black text-primary-600 dark:text-primary-500 mb-4">1</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Home Valuation</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Get an accurate estimate of your home's value based on current market conditions and comparable sales.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-black text-primary-600 dark:text-primary-500 mb-4">2</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Preparation</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I'll help you prepare your home for sale with staging tips and recommendations to maximize appeal.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-black text-primary-600 dark:text-primary-500 mb-4">3</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Marketing</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Professional photography, virtual tours, and strategic marketing across multiple platforms.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-black text-primary-600 dark:text-primary-500 mb-4">4</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Showings</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Coordinate showings and open houses to showcase your home to qualified buyers.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-black text-primary-600 dark:text-primary-500 mb-4">5</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Negotiation</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I'll negotiate offers on your behalf to get you the best price and terms.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <div className="text-5xl md:text-6xl font-black text-primary-600 dark:text-primary-500 mb-4">6</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Closing</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Guide you through inspections, appraisals, and closing to ensure a smooth transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Section - With Blueprint Grid */}
      <section className="py-20 md:py-28 bg-primary-100/15 dark:bg-gray-900 relative overflow-hidden">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <BlueprintGrid className="w-full h-full text-primary-500" opacity={0.18} />
        </div>
        
        {/* Building Silhouettes */}
        <div className="absolute top-20 left-20 w-96 h-96 opacity-5 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-400" opacity={0.12} />
        </div>
        <div className="absolute bottom-20 right-20 w-80 h-80 opacity-4 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-300" opacity={0.1} />
        </div>
        
        {/* Blueprint Line Separator */}
        <div className="absolute top-0 left-0 right-0 opacity-12">
          <BlueprintLines className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Marketing Services
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Marketing Your Home</h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Comprehensive marketing strategies to showcase your property
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Professional Photography</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                High-quality photos that showcase your home's best features and attract potential buyers.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Virtual Tours</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Interactive 3D tours that let buyers explore your home from anywhere.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">MLS Listing</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Your home will be listed on the Multiple Listing Service, reaching thousands of buyers and agents.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Social Media Marketing</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Strategic marketing across social media platforms to reach the widest audience possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - With Real Estate Vectors */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        {/* Real Estate Construction Vectors */}
        <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
          <div className="absolute inset-0">
            <BlueprintGrid className="w-full h-full text-white" opacity={0.1} />
          </div>
          <div className="absolute top-20 left-20 w-96 h-96 opacity-8">
            <HouseOutline className="w-full h-full text-white" opacity={0.18} />
          </div>
          <div className="absolute bottom-20 right-20 w-72 h-72 opacity-6">
            <PropertyBoundary className="w-full h-full text-white" opacity={0.15} />
          </div>
        </div>
        
        {/* Real Estate Line Separators */}
        <div className="absolute top-0 left-0 right-0 opacity-20">
          <RealEstateWavy className="w-full h-6 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 opacity-20">
          <BlueprintLines className="w-full h-6 text-white" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Sell Your Home?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/95 font-medium">Get started with a free home valuation and marketing plan.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowValueModal(true)}
              className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
            >
              Get Home Value
            </button>
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Request Property Marketing Plan"
      >
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              When are you planning to sell?
            </label>
            <select
              value={contactForm.sellingTimeline}
              onChange={(e) => setContactForm({ ...contactForm, sellingTimeline: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select timeline</option>
              <option value="now">Now</option>
              <option value="0-6mo">0-6 Months</option>
              <option value="6+mo">6+ Months</option>
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
              placeholder="Tell us about your property..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Send
          </button>
        </form>
      </Modal>

      {/* Home Value Modal */}
      <Modal
        isOpen={showValueModal}
        onClose={() => setShowValueModal(false)}
        title="Get Your Home Value"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Get an instant valuation of your home today! Enter your property address below.
        </p>
        <Link
          to="/home-value"
          className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors text-center"
        >
          Get Home Value
        </Link>
      </Modal>
    </div>
  )
}

export default SellingPage


