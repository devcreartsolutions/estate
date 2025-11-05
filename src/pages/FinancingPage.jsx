import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import { getImageWithFallback } from '../utils/imagePlaceholder'
import { WavyLine, DiagonalLines, GridLines, ZigzagLine, CurvedLine, DottedLine, ArrowLine, DecorativeCircle, AbstractShape, BlueprintGrid, ConstructionLines, BuildingSilhouette, HouseOutline, BlueprintLines, PropertyBoundary, RealEstateWavy } from '../components/VectorIllustrations'

function FinancingPage() {
  const [showRefinanceModal, setShowRefinanceModal] = useState(false)
  const [showFinanceModal, setShowFinanceModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e, type) => {
    e.preventDefault()
    console.log(`${type} form submitted:`, formData)
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      if (type === 'refinance') setShowRefinanceModal(false)
      if (type === 'finance') setShowFinanceModal(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
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
            backgroundImage: `url(${getImageWithFallback('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920', 1920, 1080)})`,
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
              <FontAwesomeIcon icon={faDollarSign} className="w-4 h-4" />
              <span className="text-xs font-bold">Home Financing</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Home Financing
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed max-w-2xl mx-auto font-medium">
              I've got you covered. Get the best mortgage rates and financing options tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section - With Property Boundary Pattern */}
      <section className="py-20 md:py-28 bg-primary-50/20 dark:bg-gray-900 relative overflow-hidden">
        {/* Property Boundary Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035] pointer-events-none">
          <div className="absolute inset-0">
            <PropertyBoundary className="w-full h-full text-primary-500" opacity={0.15} />
          </div>
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(18, 176, 223, 0.03) 20px, rgba(18, 176, 223, 0.03) 21px)' }}></div>
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
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Financing Options
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Financing Options</h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Choose the best financing solution for your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Looking to Refinance?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Lower your monthly payments, get cash out, or shorten your loan term. I can help you find the best refinancing options.
              </p>
              <button
                onClick={() => setShowRefinanceModal(true)}
                className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Finance a Home</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Buying a new home? I'll connect you with trusted lenders and help you find the best mortgage rates available.
              </p>
              <button
                onClick={() => setShowFinanceModal(true)}
                className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage Calculator Section - With Construction Lines */}
      <section className="py-20 md:py-28 bg-primary-50/20 dark:bg-gray-900 relative overflow-hidden">
        {/* Construction Lines Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <ConstructionLines className="w-full h-full text-primary-500" opacity={0.2} />
        </div>
        
        {/* Property Boundaries */}
        <div className="absolute top-10 right-10 w-80 h-80 opacity-5 pointer-events-none">
          <PropertyBoundary className="w-full h-full text-primary-400" opacity={0.15} />
        </div>
        <div className="absolute bottom-10 left-10 w-72 h-72 opacity-4 pointer-events-none">
          <PropertyBoundary className="w-full h-full text-primary-300" opacity={0.12} />
        </div>
        
        {/* Real Estate Wavy Separator */}
        <div className="absolute top-0 left-0 right-0 opacity-15">
          <RealEstateWavy className="w-full h-5 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="w-full max-w-[1600px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Calculate Your Payment
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Mortgage Calculator</h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Estimate your monthly mortgage payment
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-lg">
            <MortgageCalculator />
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
          <div className="absolute top-10 left-10 w-80 h-80 opacity-8">
            <BuildingSilhouette className="w-full h-full text-white" opacity={0.15} />
          </div>
          <div className="absolute bottom-10 right-10 w-72 h-72 opacity-6">
            <PropertyBoundary className="w-full h-full text-white" opacity={0.12} />
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
          <h2 className="text-4xl md:text-5xl font-black mb-6">Need Help With Financing?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/95 font-medium">Fill out the form below and I'll be happy to find a solution tailored to your needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowRefinanceModal(true)}
              className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
            >
              Refinance
            </button>
            <button
              onClick={() => setShowFinanceModal(true)}
              className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
            >
              Finance a Home
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Refinance Modal */}
      <Modal
        isOpen={showRefinanceModal}
        onClose={() => setShowRefinanceModal(false)}
        title="Looking to Refinance?"
      >
        {formSubmitted ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
            <p className="text-gray-600 dark:text-gray-400">We'll contact you soon with refinancing options.</p>
          </div>
        ) : (
          <form onSubmit={(e) => handleSubmit(e, 'refinance')} className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              I've got you covered. Fill out the form below and I'll be happy to find a solution tailored to your needs.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Tell us about your refinancing needs..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-500 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Send
            </button>
          </form>
        )}
      </Modal>

      {/* Finance Modal */}
      <Modal
        isOpen={showFinanceModal}
        onClose={() => setShowFinanceModal(false)}
        title="Finance a Home"
      >
        {formSubmitted ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
            <p className="text-gray-600 dark:text-gray-400">We'll contact you soon with financing options.</p>
          </div>
        ) : (
          <form onSubmit={(e) => handleSubmit(e, 'finance')} className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              I've got you covered. Fill out the form below and I'll be happy to find a solution tailored to your needs.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Tell us about your financing needs..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-500 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Send
            </button>
          </form>
        )}
      </Modal>
    </div>
  )
}

function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [downPayment, setDownPayment] = useState(20)

  const calculateMonthlyPayment = () => {
    const principal = loanAmount * (1 - downPayment / 100)
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm * 12
    if (monthlyRate === 0) return principal / numPayments
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  }

  const monthlyPayment = calculateMonthlyPayment()

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Home Price: ${loanAmount.toLocaleString()}
        </label>
        <input
          type="range"
          min="100000"
          max="5000000"
          step="10000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Down Payment: {downPayment}%
        </label>
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={downPayment}
          onChange={(e) => setDownPayment(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Interest Rate: {interestRate}%
        </label>
        <input
          type="range"
          min="2"
          max="10"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Loan Term: {loanTerm} years
        </label>
        <input
          type="range"
          min="15"
          max="30"
          step="1"
          value={loanTerm}
          onChange={(e) => setLoanTerm(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="bg-primary-50 dark:bg-primary-800/20 p-6 rounded-xl border-2 border-red-200 dark:border-primary-700">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly Payment</div>
        <div className="text-4xl font-bold text-primary-500 dark:text-primary-500">
          ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
      </div>
    </div>
  )
}

export default FinancingPage

