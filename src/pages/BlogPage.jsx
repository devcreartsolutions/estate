import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { getImageWithFallback, handleImageError } from '../utils/imagePlaceholder'
import { WavyLine, DiagonalLines, GridLines, ZigzagLine, CurvedLine, DottedLine, ArrowLine, DecorativeCircle, AbstractShape, BlueprintGrid, ConstructionLines, BuildingSilhouette, HouseOutline, BlueprintLines, PropertyBoundary, RealEstateWavy } from '../components/VectorIllustrations'

function BlogPage() {
  const [blogPosts] = useState([
    {
      id: 1,
      title: 'Top 10 Tips for First-Time Home Buyers',
      excerpt: 'Buying your first home can be overwhelming. Here are 10 essential tips to help you navigate the process successfully.',
      date: 'March 15, 2024',
      category: 'Buying',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    },
    {
      id: 2,
      title: 'How to Stage Your Home for Maximum Sale Value',
      excerpt: 'Learn how to prepare your home for sale and attract potential buyers with these professional staging tips.',
      date: 'March 10, 2024',
      category: 'Selling',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    },
    {
      id: 3,
      title: 'Understanding Mortgage Rates in 2024',
      excerpt: 'Everything you need to know about current mortgage rates and how to secure the best rate for your home purchase.',
      date: 'March 5, 2024',
      category: 'Financing',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
    },
    {
      id: 4,
      title: 'Nashville Real Estate Market Update: Q1 2024',
      excerpt: 'Get the latest insights on the Nashville real estate market, including trends, prices, and what to expect.',
      date: 'February 28, 2024',
      category: 'Market News',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    },
    {
      id: 5,
      title: 'Home Inspection Checklist: What to Look For',
      excerpt: 'A comprehensive guide to home inspections, including what inspectors check and red flags to watch out for.',
      date: 'February 20, 2024',
      category: 'Buying',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    },
    {
      id: 6,
      title: 'The Benefits of Working with a Buyer\'s Agent',
      excerpt: 'Discover why having a professional buyer\'s agent on your side can make all the difference in your home purchase.',
      date: 'February 15, 2024',
      category: 'Buying',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Buying', 'Selling', 'Financing', 'Market News']

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Hero Section - Real Estate Themed Background */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 banner-container">
        {/* Real Estate Background Image with Overlay - Fixed layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getImageWithFallback('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920', 1920, 1080)})`,
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
              <FontAwesomeIcon icon={faBuilding} className="w-4 h-4" />
              <span className="text-xs font-bold">Real Estate Blog</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Blog
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed max-w-2xl mx-auto font-medium">
              Real estate insights, market updates, and helpful tips for buyers and sellers.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter - With Construction Lines Pattern */}
      <section className="py-12 md:py-16 bg-primary-50/18 dark:bg-gray-800 relative overflow-hidden">
        {/* Construction Lines Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035] pointer-events-none">
          <ConstructionLines className="w-full h-full text-primary-500" opacity={0.24} />
        </div>
        
        {/* House Outline */}
        <div className="absolute top-5 right-5 w-64 h-64 opacity-4 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-400" opacity={0.1} />
        </div>
        
        {/* Real Estate Wavy Separator */}
        <div className="absolute bottom-0 left-0 right-0 opacity-12">
          <RealEstateWavy className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-xl font-bold transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts - With Construction Lines Pattern */}
      <section className="py-20 md:py-28 bg-primary-100/14 dark:bg-gray-900 relative overflow-hidden">
        {/* Construction Lines Background */}
        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none">
          <ConstructionLines className="w-full h-full text-primary-500" opacity={0.26} />
        </div>
        
        {/* House Outlines */}
        <div className="absolute top-10 right-10 w-96 h-96 opacity-5 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-400" opacity={0.12} />
        </div>
        <div className="absolute bottom-10 left-10 w-80 h-80 opacity-4 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-300" opacity={0.1} />
        </div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 opacity-3 pointer-events-none">
          <HouseOutline className="w-full h-full text-primary-200" opacity={0.08} />
        </div>
        
        {/* Blueprint Line Separators */}
        <div className="absolute top-0 left-0 right-0 opacity-15">
          <BlueprintLines className="w-full h-4 text-primary-400" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 opacity-15">
          <BlueprintLines className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">No posts found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImageWithFallback(post.image, 400, 300)}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={handleImageError}
                    />
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-primary-600 dark:text-primary-400 font-bold hover:text-primary-700 dark:hover:text-primary-300 transition-colors inline-flex items-center gap-2"
                    >
                      Read More <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section - With Building Silhouettes */}
      <section className="py-20 md:py-28 bg-primary-50/22 dark:bg-gray-900 relative overflow-hidden">
        {/* Construction Lines Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <ConstructionLines className="w-full h-full text-primary-500" opacity={0.18} />
        </div>
        
        {/* Building Silhouettes */}
        <div className="absolute top-10 right-10 w-96 h-96 opacity-5 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-400" opacity={0.12} />
        </div>
        <div className="absolute bottom-10 left-10 w-80 h-80 opacity-4 pointer-events-none">
          <BuildingSilhouette className="w-full h-full text-primary-300" opacity={0.1} />
        </div>
        
        {/* Real Estate Wavy Separators */}
        <div className="absolute top-0 left-0 right-0 opacity-12">
          <RealEstateWavy className="w-full h-4 text-primary-400" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 opacity-12">
          <RealEstateWavy className="w-full h-4 text-primary-400" />
        </div>
        
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center relative z-10">
          <div className="w-full max-w-[1600px] mx-auto">
            <div className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
            Stay Updated
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-medium">
            Get the latest real estate news, market updates, and tips delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white shadow-sm"
            />
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              Subscribe
            </button>
          </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BlogPage

