import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="bg-primary-500 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white text-primary-500 font-bold text-xl px-3 py-2 rounded-xl shadow-md group-hover:shadow-lg transition-all">
              KW
            </div>
            <div className="hidden md:block">
              <div className="text-white font-bold text-sm lg:text-base leading-tight">
                NASHVILLE FRANKLIN
              </div>
              <div className="text-white/90 text-xs lg:text-sm font-semibold">
                KELLER WILLIAMS REALTY
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              to="/listings" 
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isActive('/listings') 
                  ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              SEARCH LISTINGS
            </Link>
            <Link 
              to="/buying" 
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isActive('/buying') 
                  ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              BUYING
            </Link>
            <Link 
              to="/selling" 
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isActive('/selling') 
                  ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              SELLING
            </Link>
            <Link 
              to="/home-value" 
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isActive('/home-value') 
                  ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              HOME VALUE
            </Link>
            <Link 
              to="/about" 
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isActive('/about') 
                  ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              ABOUT ME
            </Link>
            <Link 
              to="/blog" 
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isActive('/blog') 
                  ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              BLOG
            </Link>
            <Link 
              to="/video" 
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isActive('/video') 
                  ? 'bg-white/20 text-white shadow-md backdrop-blur-sm' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              MAKE VIDEO
            </Link>
          </nav>

          {/* Desktop: Let's Talk Button */}
          <div className="hidden sm:flex items-center">
            <button 
              onClick={() => {
                const event = new CustomEvent('openContactModal')
                window.dispatchEvent(event)
              }}
              className="bg-white text-primary-500 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={showMenu ? faTimes : faBars} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <nav className="lg:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/listings" 
                onClick={() => setShowMenu(false)}
                className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                  isActive('/listings') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                SEARCH LISTINGS
              </Link>
              <Link 
                to="/buying" 
                onClick={() => setShowMenu(false)}
                className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                  isActive('/buying') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                BUYING
              </Link>
              <Link 
                to="/selling" 
                onClick={() => setShowMenu(false)}
                className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                  isActive('/selling') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                SELLING
              </Link>
              <Link 
                to="/home-value" 
                onClick={() => setShowMenu(false)}
                className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                  isActive('/home-value') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                HOME VALUE
              </Link>
              <Link 
                to="/about" 
                onClick={() => setShowMenu(false)}
                className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                  isActive('/about') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                ABOUT ME
              </Link>
              <Link 
                to="/blog" 
                onClick={() => setShowMenu(false)}
                className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                  isActive('/blog') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                BLOG
              </Link>
              <Link 
                to="/video" 
                onClick={() => setShowMenu(false)}
                className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                  isActive('/video') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                MAKE VIDEO
              </Link>
              <div className="pt-4 mt-4 border-t border-white/20">
                <button 
                  onClick={() => {
                    const event = new CustomEvent('openContactModal')
                    window.dispatchEvent(event)
                    setShowMenu(false)
                  }}
                  className="w-full bg-white text-primary-500 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-md"
                >
                  Let's Talk
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

