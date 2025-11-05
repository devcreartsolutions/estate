import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import { getImageWithFallback } from '../utils/imagePlaceholder'
import { WavyLine, DiagonalLines, GridLines, ZigzagLine, CurvedLine, DottedLine, ArrowLine, DecorativeCircle, AbstractShape, BlueprintGrid, ConstructionLines, BuildingSilhouette, HouseOutline, BlueprintLines, PropertyBoundary, RealEstateWavy } from '../components/VectorIllustrations'

function HomeValuePage() {
  const [showContactModal, setShowContactModal] = useState(false)
  const [formData, setFormData] = useState({
    address: '',
    propertyType: 'residential',
    searchArea: '0.5',
    year: '',
    acreage: '',
    squareFeet: '',
    bedrooms: '',
    bathrooms: '',
    garage: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would connect to a home valuation service
    console.log('Home value form submitted:', formData)
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        address: '',
        propertyType: 'residential',
        searchArea: '0.5',
        year: '',
        acreage: '',
        squareFeet: '',
        bedrooms: '',
        bathrooms: '',
        garage: '',
      })
    }, 5000)
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
              <span className="text-xs font-bold">Home Valuation</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              How Much Is Your Home Really Worth?
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed max-w-2xl mx-auto font-medium">
              Get an instant valuation of your home today! Just over $92,000 in home equity in the last year.
            </p>
          </div>
        </div>
      </section>

      {/* Home Value Form - With Blueprint Grid Pattern */}
      <section className="py-20 md:py-28 bg-primary-50/24 dark:bg-gray-900 relative overflow-hidden">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <BlueprintGrid className="w-full h-full text-primary-500" opacity={0.75} />
        </div>
        
        {/* Property Boundary Elements */}
        <div className="absolute top-10 right-10 w-80 h-80 opacity-5 pointer-events-none">
          <PropertyBoundary className="w-full h-full text-primary-400" opacity={0.15} />
        </div>
        <div className="absolute bottom-10 left-10 w-72 h-72 opacity-4 pointer-events-none">
          <PropertyBoundary className="w-full h-full text-primary-300" opacity={0.12} />
        </div>
        
        {/* Real Estate Wavy Separators */}
        <div className="absolute top-0 left-0 right-0 opacity-15">
          <RealEstateWavy className="w-full h-4 text-primary-400" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 opacity-15">
          <RealEstateWavy className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="w-full max-w-[1600px] mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
                Property Information
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">Enter Your Property Details</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">Provide your property information for an accurate valuation</p>
            </div>
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your home valuation request has been submitted. We'll contact you soon with your home's estimated value.
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  Estimated value will be calculated based on comparable sales in your area.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Property Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your property address"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Property Type *
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="vacant">Vacant</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Search Area (miles)
                    </label>
                    <select
                      value={formData.searchArea}
                      onChange={(e) => setFormData({ ...formData, searchArea: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="0.5">0.5 m</option>
                      <option value="1">1 m</option>
                      <option value="1.5">1.5 m</option>
                      <option value="2">2 m</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year Built
                    </label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="Year built"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Acreage
                    </label>
                    <input
                      type="text"
                      value={formData.acreage}
                      onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                      placeholder="e.g., 0.5 acres"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Square Feet
                    </label>
                    <input
                      type="number"
                      value={formData.squareFeet}
                      onChange={(e) => setFormData({ ...formData, squareFeet: e.target.value })}
                      placeholder="Square footage"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      placeholder="Number of bedrooms"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      placeholder="Number of bathrooms"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Garage
                    </label>
                    <input
                      type="text"
                      value={formData.garage}
                      onChange={(e) => setFormData({ ...formData, garage: e.target.value })}
                      placeholder="e.g., 2-car garage"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                >
                  Find Out
                </button>
              </form>
            )}
          </div>
          </div>
        </div>
      </section>

      {/* Info Section - With House Outlines */}
      <section className="py-20 md:py-28 bg-primary-100/18 dark:bg-gray-900 relative overflow-hidden">
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <BlueprintGrid className="w-full h-full text-primary-500" opacity={0.15} />
        </div>
        
        {/* House Outlines */}
        <div className="absolute top-20 right-20 w-96 h-96 opacity-5 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-400" opacity={0.12} />
        </div>
        <div className="absolute bottom-20 left-20 w-80 h-80 opacity-4 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-300" opacity={0.1} />
        </div>
        
        {/* Blueprint Line Separator */}
        <div className="absolute top-0 left-0 right-0 opacity-12">
          <BlueprintLines className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Get your home value in three easy steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Enter Details</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Provide your property address and basic information about your home.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Market Analysis</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We analyze comparable sales and current market trends in your area.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Get Your Value</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Receive an accurate estimate of your home's value based on market data.
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
          <div className="absolute top-10 left-10 w-80 h-80 opacity-8">
            <HouseOutline className="w-full h-full text-white" opacity={0.18} />
          </div>
          <div className="absolute bottom-10 right-10 w-72 h-72 opacity-6">
            <PropertyBoundary className="w-full h-full text-white" opacity={0.15} />
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
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Sell?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/95 font-medium">Get a free marketing plan that shows how we'll sell your home for the most money.</p>
          <button
            onClick={() => setShowContactModal(true)}
            className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
          >
            Request Marketing Plan
          </button>
        </div>
      </section>

      <Footer />

      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Request Property Marketing Plan"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You're one step away from getting a free marketing plan that shows how we'll sell your home for the most amount of money in the least amount of time - hassle free.
        </p>
        <form onSubmit={(e) => { e.preventDefault(); setShowContactModal(false); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              When are you planning to sell?
            </label>
            <select
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select timeline</option>
              <option value="now">Now</option>
              <option value="0-6mo">0-6 Months</option>
              <option value="6+mo">6+ Months</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Send
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default HomeValuePage


