import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { propertyService } from '../services/propertyService'
import { getImageWithFallback, handleImageError } from '../utils/imagePlaceholder'

function BrokerDashboardPage() {
  const navigate = useNavigate()
  const { broker, logout } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    price: '',
    type: 'sale',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    lotSize: '',
    yearBuilt: '',
    description: '',
    images: '',
    features: '',
  })

  useEffect(() => {
    if (!broker) {
      navigate('/broker/login')
      return
    }
    loadProperties()
  }, [broker, navigate])

  const loadProperties = async () => {
    setLoading(true)
    try {
      const brokerProperties = await propertyService.getBrokerProperties(broker.id)
      setProperties(brokerProperties)
    } catch (error) {
      console.error('Error loading properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProperty = () => {
    setEditingProperty(null)
    setFormData({
      title: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      price: '',
      type: 'sale',
      bedrooms: '',
      bathrooms: '',
      squareFeet: '',
      lotSize: '',
      yearBuilt: '',
      description: '',
      images: '',
      features: '',
    })
    setShowAddModal(true)
  }

  const handleEditProperty = (property) => {
    setEditingProperty(property)
    setFormData({
      title: property.title,
      address: property.address,
      city: property.city,
      state: property.state,
      zipCode: property.zipCode,
      price: property.price.toString(),
      type: property.type,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      squareFeet: property.squareFeet.toString(),
      lotSize: property.lotSize,
      yearBuilt: property.yearBuilt.toString(),
      description: property.description,
      images: property.images.join('\n'),
      features: property.features.join('\n'),
    })
    setShowAddModal(true)
  }

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return

    try {
      await propertyService.deleteProperty(id)
      loadProperties()
    } catch (error) {
      console.error('Error deleting property:', error)
      alert('Failed to delete property')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const propertyData = {
        ...formData,
        brokerId: broker.id,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        squareFeet: parseInt(formData.squareFeet),
        yearBuilt: parseInt(formData.yearBuilt),
        images: formData.images.split('\n').filter(url => url.trim()),
        features: formData.features.split('\n').filter(f => f.trim()),
      }

      if (editingProperty) {
        await propertyService.updateProperty(editingProperty.id, propertyData)
      } else {
        await propertyService.createProperty(propertyData)
      }

      setShowAddModal(false)
      loadProperties()
    } catch (error) {
      console.error('Error saving property:', error)
      alert('Failed to save property')
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

  if (!broker) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              Estate Pro
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 dark:text-gray-300">Welcome, {broker.name}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Properties</h1>
          <button
            onClick={handleAddProperty}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
          >
            + Add New Property
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">No properties yet.</p>
            <button
              onClick={handleAddProperty}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
            >
              Add Your First Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageWithFallback(property.images?.[0], 400, 300)}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                  <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    {formatPrice(property.price)}
                    {property.type === 'rent' && '/mo'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{property.address}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>{property.squareFeet.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/properties/${property.id}`}
                      className="flex-1 text-center px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 rounded transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleEditProperty(property)}
                      className="flex-1 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProperty(property.id)}
                      className="px-4 py-2 bg-primary-100 dark:bg-primary-800 text-primary-500 dark:text-primary-500 hover:bg-red-200 dark:hover:bg-primary-700 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-[1400px] w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type *
                    </label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bedrooms *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bathrooms *
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Square Feet *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.squareFeet}
                      onChange={(e) => setFormData({ ...formData, squareFeet: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year Built *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.yearBuilt}
                      onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Image URLs (one per line) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.images}
                      onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                      placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Features (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      placeholder="Hardwood Floors&#10;Granite Countertops&#10;Stainless Steel Appliances"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    {editingProperty ? 'Update Property' : 'Add Property'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BrokerDashboardPage

