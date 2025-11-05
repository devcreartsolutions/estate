import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt, faHome, faUser, faDollarSign, faChartLine, faHandshake } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter signup:', newsletterEmail)
    setNewsletterEmail('')
    alert('Thank you for subscribing!')
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', contactForm)
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setContactForm({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-primary-500" />
                <a href="tel:+16155551234" className="text-gray-400 hover:text-white transition-colors">(615) 555-1234</a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-primary-500" />
                <a href="mailto:jamison@example.com" className="text-gray-400 hover:text-white transition-colors">jamison@example.com</a>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-primary-500 mt-1" />
                <span className="text-gray-400">Middle Tennessee</span>
              </div>
            </div>
            {/* Social Media */}
            <div className="flex items-center space-x-4 mt-6">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-400 hover:text-white transition-colors text-sm">Listings</Link>
              </li>
              <li>
                <Link to="/buying" className="text-gray-400 hover:text-white transition-colors text-sm">Buying</Link>
              </li>
              <li>
                <Link to="/selling" className="text-gray-400 hover:text-white transition-colors text-sm">Selling</Link>
              </li>
              <li>
                <Link to="/financing" className="text-gray-400 hover:text-white transition-colors text-sm">Financing</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/buying" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <FontAwesomeIcon icon={faHome} className="w-4 h-4 mr-2 text-primary-500" />
                  Buy a Home
                </Link>
              </li>
              <li>
                <Link to="/selling" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <FontAwesomeIcon icon={faDollarSign} className="w-4 h-4 mr-2 text-primary-500" />
                  Sell a Home
                </Link>
              </li>
              <li>
                <Link to="/financing" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 mr-2 text-primary-500" />
                  Financing
                </Link>
              </li>
              <li>
                <Link to="/home-value" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                  <FontAwesomeIcon icon={faDollarSign} className="w-4 h-4 mr-2 text-primary-500" />
                  Home Value
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with the latest properties and market insights.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Jamison Blackwell. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

