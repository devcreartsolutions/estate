// Utility function to get placeholder image URL
export const getPlaceholderImage = (width = 800, height = 600) => {
  return `https://via.placeholder.com/${width}x${height}/E5E7EB/9CA3AF?text=Property+Image`
}

// Utility function to handle image errors
export const handleImageError = (e) => {
  e.target.src = getPlaceholderImage(800, 600)
  e.target.onerror = null // Prevent infinite loop
}

// Utility function to get image with fallback
export const getImageWithFallback = (imageUrl, width = 800, height = 600) => {
  if (!imageUrl || imageUrl.trim() === '' || imageUrl === 'undefined' || imageUrl === 'null') {
    return getPlaceholderImage(width, height)
  }
  return imageUrl
}

