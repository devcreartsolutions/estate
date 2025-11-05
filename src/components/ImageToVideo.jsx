import React, { useState, useRef, useEffect } from 'react'
import { generateVideoFromMultiple, applyEffect, applyTextAnimation } from '../services/VideoGenerator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faGear, faCheck, faChevronLeft, faChevronRight, faDownload, faX, faPlay, faStop, faTimes, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'

const ImageToVideo = () => {
  const [mediaItems, setMediaItems] = useState([])
  const [selectedEffect, setSelectedEffect] = useState('zoom')
  const [textOverlay, setTextOverlay] = useState({ text: '', x: 50, y: 50, fontSize: 48, color: '#ffffff', backgroundColor: '#ff0000', animation: 'fade', animationDuration: 1, opacity: 100, visible: false, fullWidth: false, padding: 20, textAlign: 'left', verticalPosition: 'custom' })
  const [durationPerItem, setDurationPerItem] = useState(3)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState(null)
  const [videoDetails, setVideoDetails] = useState(null)
  const [settingsChanged, setSettingsChanged] = useState(false)
  const [fps, setFps] = useState(30)
  const [resolutionPreset, setResolutionPreset] = useState('youtube-1080')
  const [transitionDuration, setTransitionDuration] = useState(0.5)
  const [pendingDownloadUrl, setPendingDownloadUrl] = useState(null)
  const [settingsItem, setSettingsItem] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showReorderModal, setShowReorderModal] = useState(false)
  const [downloadFileName, setDownloadFileName] = useState('')
  const [toast, setToast] = useState(null)
  const [reorderItems, setReorderItems] = useState([])
  const reorderDraggedRef = useRef(null)
  const reorderDragOverRef = useRef(null)
  const [reorderDraggedIndex, setReorderDraggedIndex] = useState(null)
  const [reorderDragOverIndex, setReorderDragOverIndex] = useState(null)
  const [reorderDragPosition, setReorderDragPosition] = useState({ x: 0, y: 0 })
  const scrollAnimationRef = useRef(null)
  const scrollTargetRef = useRef(0)
  const textPreviewCanvasRef = useRef(null)
  const textColorPickerRef = useRef(null)
  const bgColorPickerRef = useRef(null)
  const textInputRef = useRef(null)
  const settingsTextInputRef = useRef(null)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [colorPickerType, setColorPickerType] = useState(null) // 'text' or 'background'
  const colorPickerButtonRef = useRef(null)
  const textPreviewAnimationRef = useRef(null)
  const textPreviewStartTimeRef = useRef(null)
  const textOverlayRef = useRef(textOverlay)
  const [textPreviewPlaying, setTextPreviewPlaying] = useState(false)
  const settingsPreviewCanvasRef = useRef(null)
  const settingsPreviewImageRef = useRef(null)
  const settingsPreviewAnimationRef = useRef(null)
  const settingsPreviewStartTimeRef = useRef(null)
  const [settingsPreviewPlaying, setSettingsPreviewPlaying] = useState(false)
  
  // Keep ref in sync with textOverlay state
  useEffect(() => {
    textOverlayRef.current = textOverlay
  }, [textOverlay])

  const totalSteps = 5

  const steps = [
    { id: 1, name: 'Resolution', description: 'Select video resolution' },
    { id: 2, name: 'Media', description: 'Add images & adjust settings' },
    { id: 3, name: 'Text', description: 'Add text overlay (optional)' },
    { id: 4, name: 'Generate', description: 'Create video' },
    { id: 5, name: 'Download', description: 'Preview & download' }
  ]
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)
  const draggedItemRef = useRef(null)
  const draggedOverItemRef = useRef(null)

  const effects = [
    { id: 'zoom', name: 'Zoom In', description: 'Gradual zoom into the image' },
    { id: 'zoomOut', name: 'Zoom Out', description: 'Gradual zoom out from the image' },
    { id: 'panLeft', name: 'Pan Left', description: 'Pan from right to left' },
    { id: 'panRight', name: 'Pan Right', description: 'Pan from left to right' },
    { id: 'panUp', name: 'Pan Up', description: 'Pan from bottom to top' },
    { id: 'panDown', name: 'Pan Down', description: 'Pan from top to bottom' },
    { id: 'fade', name: 'Fade', description: 'Fade in effect' },
    { id: 'rotate', name: 'Rotate', description: 'Rotate 360 degrees' },
    { id: 'kenBurns', name: 'Ken Burns', description: 'Combined zoom and pan effect' },
    { id: 'static', name: 'Static', description: 'No animation' }
  ]

  const textAnimations = [
    { id: 'fade', name: 'Fade In' },
    { id: 'slideUp', name: 'Slide Up' },
    { id: 'slideDown', name: 'Slide Down' },
    { id: 'slideLeft', name: 'Slide Left' },
    { id: 'slideRight', name: 'Slide Right' },
    { id: 'scale', name: 'Scale' },
    { id: 'bounce', name: 'Bounce' },
    { id: 'none', name: 'None' }
  ]


  const resolutionPresets = [
    { id: 'youtube-1080', name: 'YouTube (1080p) [1920 × 1080]', width: 1920, height: 1080 },
    { id: 'youtube-720', name: 'YouTube (720p) [1280 × 720]', width: 1280, height: 720 },
    { id: 'instagram-square', name: 'Instagram (Square) [1080 × 1080]', width: 1080, height: 1080 },
    { id: 'instagram-story', name: 'Instagram Story/Reels [1080 × 1920]', width: 1080, height: 1920 },
    { id: 'instagram-post', name: 'Instagram Post [1080 × 1350]', width: 1080, height: 1350 },
    { id: 'tiktok', name: 'TikTok [1080 × 1920]', width: 1080, height: 1920 },
    { id: 'facebook-1080', name: 'Facebook (1080p) [1920 × 1080]', width: 1920, height: 1080 },
    { id: 'facebook-square', name: 'Facebook (Square) [1080 × 1080]', width: 1080, height: 1080 },
    { id: 'facebook-vertical', name: 'Facebook (Vertical) [1080 × 1920]', width: 1080, height: 1920 }
  ]

  const getCurrentResolution = () => {
    const preset = resolutionPresets.find(p => p.id === resolutionPreset)
    return {
      width: preset ? preset.width : 1920,
      height: preset ? preset.height : 1080
    }
  }

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  // Set up canvas size (only when step, resolution, or initial setup changes)
  useEffect(() => {
    if (currentStep === 3 && textPreviewCanvasRef.current && textOverlay.text && textOverlay.text.trim()) {
      const canvas = textPreviewCanvasRef.current
      const resolution = getCurrentResolution()
      
      // Set canvas size to match resolution
      canvas.width = resolution.width
      canvas.height = resolution.height
      
      // Get parent container dimensions for scaling
      const parentContainer = canvas.parentElement
      if (parentContainer) {
        // Account for padding (p-1 = 4px on each side = 8px total)
        const containerPadding = 8
        const maxDisplayWidth = parentContainer.clientWidth - containerPadding
        const maxDisplayHeight = parentContainer.clientHeight - containerPadding
        
        // Scale canvas to fill parent container while maintaining aspect ratio
        const widthScale = maxDisplayWidth / resolution.width
        const heightScale = maxDisplayHeight / resolution.height
        const scale = Math.min(widthScale, heightScale) // Take the smaller scale to fit both dimensions
        
        // Apply the scale to fill the container as much as possible
        const displayWidth = resolution.width * scale
        const displayHeight = resolution.height * scale
        
        canvas.style.width = `${displayWidth}px`
        canvas.style.height = `${displayHeight}px`
        canvas.style.display = 'block'
        canvas.style.objectFit = 'contain'
        canvas.style.margin = '0 auto'
      }
    }
  }, [currentStep, resolutionPreset, textOverlay.text])
  
  // Continuous animation loop (runs independently, reads current textOverlay values)
  useEffect(() => {
    if (currentStep === 3 && textPreviewCanvasRef.current && textOverlay.text && textOverlay.text.trim() && textPreviewPlaying) {
      const canvas = textPreviewCanvasRef.current
      
      // Initialize start time if not set
      if (!textPreviewStartTimeRef.current) {
        textPreviewStartTimeRef.current = Date.now()
      }
      
      // Render function - reads current textOverlay from ref (always latest values)
      const renderFrame = () => {
        if (!textPreviewCanvasRef.current || !textPreviewPlaying) return
        
        // Get current resolution (may have changed)
        const resolution = getCurrentResolution()
        const ctx = canvas.getContext('2d')
        
        // Read latest textOverlay values from ref (always current, not stale)
        const currentTextOverlay = textOverlayRef.current
        
        const previewDuration = currentTextOverlay.animationDuration || 1
        const totalPreviewTime = Math.max(previewDuration, 2) // At least 2 seconds to show animation
        
        // Calculate animation progress
        const currentTime = Date.now() - textPreviewStartTimeRef.current
        let progress = currentTime / (totalPreviewTime * 1000)
        
        // Loop animation
        if (progress >= 1) {
          textPreviewStartTimeRef.current = Date.now()
          progress = 0
        }
        
        // Clear canvas with black background
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, resolution.width, resolution.height)
        
        // Use latest textOverlay values from ref (always current)
        applyTextAnimation(ctx, currentTextOverlay, progress, resolution.width, resolution.height, previewDuration)
        
        textPreviewAnimationRef.current = requestAnimationFrame(renderFrame)
      }
      
      // Start animation loop
      textPreviewAnimationRef.current = requestAnimationFrame(renderFrame)
      
      return () => {
        if (textPreviewAnimationRef.current) {
          cancelAnimationFrame(textPreviewAnimationRef.current)
          textPreviewAnimationRef.current = null
        }
      }
    } else if (currentStep === 3 && textPreviewCanvasRef.current && textOverlay.text && textOverlay.text.trim() && !textPreviewPlaying) {
      // Show static preview when not playing
      const canvas = textPreviewCanvasRef.current
      const resolution = getCurrentResolution()
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, resolution.width, resolution.height)
      const previewDuration = textOverlay.animationDuration || 1
      // Only show text if visible is true, otherwise show empty canvas
      if (textOverlay.visible) {
        applyTextAnimation(ctx, textOverlay, 1.0, resolution.width, resolution.height, previewDuration)
      }
    }
  }, [currentStep, textPreviewPlaying, textOverlay.visible, textOverlay.text])
  
  // Auto-play animation preview when text overlay is enabled (keep it running continuously)
  useEffect(() => {
    if (currentStep === 3 && textOverlay.text && textOverlay.text.trim() && textOverlay.visible) {
      // Start playing if not already playing
      if (!textPreviewPlaying) {
        setTextPreviewPlaying(true)
        textPreviewStartTimeRef.current = Date.now()
      }
    } else {
      setTextPreviewPlaying(false)
      textPreviewStartTimeRef.current = null
    }
  }, [currentStep, textOverlay.visible, textOverlay.text, textPreviewPlaying])
  
  // Reset animation timer when settings change (but keep it playing)
  useEffect(() => {
    if (currentStep === 3 && textOverlay.visible && textOverlay.text && textPreviewPlaying) {
      // Just reset the start time to restart animation smoothly when settings change
      textPreviewStartTimeRef.current = Date.now()
    }
  }, [currentStep, textOverlay.animation, textOverlay.animationDuration, textOverlay.fontSize, textOverlay.color, textOverlay.backgroundColor, textOverlay.opacity, textOverlay.x, textOverlay.y, textOverlay.fullWidth, textOverlay.padding, textOverlay.textAlign, textOverlay.verticalPosition, textPreviewPlaying])

  // Settings modal preview canvas with image and text overlay
  useEffect(() => {
    if (settingsItem && settingsPreviewCanvasRef.current && settingsItem.textOverlay?.visible && settingsItem.textOverlay?.text) {
      const canvas = settingsPreviewCanvasRef.current
      const resolution = getCurrentResolution()
      
      // Set canvas size to match resolution
      canvas.width = resolution.width
      canvas.height = resolution.height
      
      // Get parent container dimensions for scaling
      const parentContainer = canvas.parentElement
      if (parentContainer) {
        const containerPadding = 8
        const maxDisplayWidth = parentContainer.clientWidth - containerPadding
        const maxDisplayHeight = 200 // Limit height to 200px for compact preview
        
        // Scale canvas to fit parent container while maintaining aspect ratio
        const widthScale = maxDisplayWidth / resolution.width
        const heightScale = maxDisplayHeight / resolution.height
        const scale = Math.min(widthScale, heightScale)
        
        const displayWidth = resolution.width * scale
        const displayHeight = resolution.height * scale
        
        canvas.style.width = `${displayWidth}px`
        canvas.style.height = `${displayHeight}px`
        canvas.style.display = 'block'
        canvas.style.objectFit = 'contain'
        canvas.style.margin = '0 auto'
      }
      
      // Load image for background
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        // Render function
        const renderFrame = () => {
          if (!settingsPreviewCanvasRef.current || !settingsPreviewPlaying || !settingsItem?.textOverlay?.visible) return
          
          const ctx = canvas.getContext('2d')
          const previewDuration = settingsItem.textOverlay.animationDuration || 1
          const totalPreviewTime = Math.max(previewDuration, 2)
          
          // Calculate animation progress
          const currentTime = Date.now() - settingsPreviewStartTimeRef.current
          let progress = currentTime / (totalPreviewTime * 1000)
          
          // Loop animation
          if (progress >= 1) {
            settingsPreviewStartTimeRef.current = Date.now()
            progress = 0
          }
          
          // Clear and draw image as background
          ctx.fillStyle = '#000000'
          ctx.fillRect(0, 0, resolution.width, resolution.height)
          
          // Draw image maintaining aspect ratio
          if (img.complete && img.naturalWidth > 0) {
            const imgAspect = img.naturalWidth / img.naturalHeight
            const canvasAspect = resolution.width / resolution.height
            
            let drawWidth, drawHeight, drawX, drawY
            
            if (imgAspect > canvasAspect) {
              // Image is wider
              drawWidth = resolution.width
              drawHeight = resolution.width / imgAspect
              drawX = 0
              drawY = (resolution.height - drawHeight) / 2
            } else {
              // Image is taller
              drawHeight = resolution.height
              drawWidth = resolution.height * imgAspect
              drawX = (resolution.width - drawWidth) / 2
              drawY = 0
            }
            
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
          }
          
          // Apply text overlay
          applyTextAnimation(ctx, settingsItem.textOverlay, progress, resolution.width, resolution.height, previewDuration)
          
          settingsPreviewAnimationRef.current = requestAnimationFrame(renderFrame)
        }
        
        // Start animation loop
        if (settingsPreviewPlaying) {
          if (!settingsPreviewStartTimeRef.current) {
            settingsPreviewStartTimeRef.current = Date.now()
          }
          settingsPreviewAnimationRef.current = requestAnimationFrame(renderFrame)
        } else {
          // Show static preview
          const ctx = canvas.getContext('2d')
          ctx.fillStyle = '#000000'
          ctx.fillRect(0, 0, resolution.width, resolution.height)
          
          // Draw image
          if (img.complete && img.naturalWidth > 0) {
            const imgAspect = img.naturalWidth / img.naturalHeight
            const canvasAspect = resolution.width / resolution.height
            
            let drawWidth, drawHeight, drawX, drawY
            
            if (imgAspect > canvasAspect) {
              drawWidth = resolution.width
              drawHeight = resolution.width / imgAspect
              drawX = 0
              drawY = (resolution.height - drawHeight) / 2
            } else {
              drawHeight = resolution.height
              drawWidth = resolution.height * imgAspect
              drawX = (resolution.width - drawWidth) / 2
              drawY = 0
            }
            
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
          }
          
          // Apply text overlay at completion (progress = 1.0)
          applyTextAnimation(ctx, settingsItem.textOverlay, 1.0, resolution.width, resolution.height, previewDuration)
        }
        
        settingsPreviewImageRef.current = img
      }
      img.src = settingsItem.url
      
      return () => {
        if (settingsPreviewAnimationRef.current) {
          cancelAnimationFrame(settingsPreviewAnimationRef.current)
          settingsPreviewAnimationRef.current = null
        }
      }
    }
  }, [settingsItem, resolutionPreset, settingsPreviewPlaying])
  
  // Auto-play settings preview animation
  useEffect(() => {
    if (settingsItem?.textOverlay?.visible && settingsItem.textOverlay.text && settingsItem.textOverlay.text.trim()) {
      if (!settingsPreviewPlaying) {
        setSettingsPreviewPlaying(true)
        settingsPreviewStartTimeRef.current = Date.now()
      }
    } else {
      setSettingsPreviewPlaying(false)
      settingsPreviewStartTimeRef.current = null
    }
  }, [settingsItem?.textOverlay?.visible, settingsItem?.textOverlay?.text, settingsItem?.textOverlay?.animation, settingsItem?.textOverlay?.animationDuration])

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files || [])
    addMediaFiles(files)
  }

  const addMediaFiles = (files) => {
    let filesAdded = 0
    const invalidFilesList = []
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp']
    const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
    
    files.forEach((file) => {
      // Check MIME type
      const fileType = file.type ? file.type.toLowerCase() : ''
      
      // Check file extension
      const fileName = file.name.toLowerCase()
      const lastDotIndex = fileName.lastIndexOf('.')
      const fileExtension = lastDotIndex >= 0 ? fileName.substring(lastDotIndex) : ''
      const hasExtension = lastDotIndex >= 0
      
      let isAllowedImage = false
      
      // Check if it's an image file
      if (fileType.startsWith('image/')) {
        // Must be in allowed image types
        const isAllowedImageByType = allowedImageTypes.includes(fileType)
        
        if (hasExtension) {
          // If extension exists, both MIME type AND extension must match
          const isAllowedExtension = allowedImageExtensions.includes(fileExtension)
          isAllowedImage = isAllowedImageByType && isAllowedExtension
        } else {
          // If no extension, rely only on MIME type (but be stricter)
          isAllowedImage = isAllowedImageByType
        }
        
        // If it's an image but not allowed, reject it
        if (!isAllowedImage) {
          invalidFilesList.push({
            name: file.name,
            type: file.type || 'unknown',
            isImage: true
          })
        }
      } else if (fileType.startsWith('video/')) {
        // Videos are NOT allowed - reject
        invalidFilesList.push({
          name: file.name,
          type: file.type || 'unknown',
          isImage: false
        })
      } else {
        // Unknown file type - reject
        invalidFilesList.push({
          name: file.name,
          type: file.type || 'unknown',
          isImage: false
        })
      }
      
      // Only add if it's an allowed image (videos are not allowed)
      if (isAllowedImage) {
        filesAdded++
        const reader = new FileReader()
        reader.onloadend = () => {
          // Get a random animation effect (excluding 'static' for variety)
          const availableEffects = effects.filter(e => e.id !== 'static')
          const randomEffect = availableEffects[Math.floor(Math.random() * availableEffects.length)]
          
          const newItem = {
            id: Date.now() + Math.random(),
            file: file,
            url: reader.result,
            type: 'image',
            effect: randomEffect.id,
            duration: durationPerItem,
            textOverlay: {
              text: '',
              x: 50,
              y: 50,
              fontSize: 48,
              color: '#ffffff',
              backgroundColor: '#ff0000',
              animation: 'fade',
              animationDuration: 1,
              opacity: 100,
              visible: false,
              fullWidth: false,
              padding: 20,
              textAlign: 'left',
              verticalPosition: 'custom'
            }
          }
          setMediaItems(prev => {
            const updated = [...prev, newItem]
            // Auto-advance to step 2 if on step 1 and this is the first file being added
            if (currentStep === 1 && prev.length === 0 && updated.length === filesAdded) {
              setTimeout(() => setCurrentStep(2), 500)
            }
            return updated
          })
        }
        reader.readAsDataURL(file)
      }
    })
    
    // Show toast notification if there are invalid files
    if (invalidFilesList.length > 0) {
      const invalidFileNames = invalidFilesList.map(f => f.name).join(', ')
      const message = `${invalidFilesList.length} file${invalidFilesList.length !== 1 ? 's' : ''} not added: ${invalidFileNames}. Allowed formats: JPG, PNG, GIF, WEBP, BMP only.`
      
      setToast({
        type: 'error',
        message: message,
        files: invalidFilesList
      })
      
      // Auto-hide toast after 5 seconds
      setTimeout(() => {
        setToast(null)
      }, 5000)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    addMediaFiles(files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const removeMediaItem = (id) => {
    setMediaItems(prev => prev.filter(item => item.id !== id))
  }

  const updateMediaItem = (id, updates) => {
    setMediaItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }

  const moveItem = (fromIndex, toIndex) => {
    const newItems = [...mediaItems]
    const [movedItem] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, movedItem)
    setMediaItems(newItems)
  }

  const handleDragStart = (e, index) => {
    draggedItemRef.current = index
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOverItem = (e, index) => {
    e.preventDefault()
    draggedOverItemRef.current = index
  }

  const handleDropItem = (e, index) => {
    e.preventDefault()
    if (draggedItemRef.current !== null && draggedOverItemRef.current !== null) {
      moveItem(draggedItemRef.current, draggedOverItemRef.current)
    }
    draggedItemRef.current = null
    draggedOverItemRef.current = null
  }

  // Reorder modal handlers
  const handleOpenReorderModal = () => {
    setReorderItems([...mediaItems])
    setShowReorderModal(true)
  }

  const handleReorderDragStart = (e, index) => {
    reorderDraggedRef.current = index
    setReorderDraggedIndex(index)
    
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
      // Create custom drag image for smoother dragging
      const dragImage = e.currentTarget.cloneNode(true)
      dragImage.style.opacity = '0.9'
      dragImage.style.transform = 'rotate(2deg)'
      dragImage.style.width = e.currentTarget.offsetWidth + 'px'
      dragImage.style.height = e.currentTarget.offsetHeight + 'px'
      document.body.appendChild(dragImage)
      dragImage.style.position = 'absolute'
      dragImage.style.top = '-1000px'
      e.dataTransfer.setDragImage(dragImage, e.currentTarget.offsetWidth / 2, e.currentTarget.offsetHeight / 2)
      setTimeout(() => document.body.removeChild(dragImage), 0)
    }
  }

  const handleReorderDragOver = (e, index) => {
    e.preventDefault()
    e.stopPropagation()
    if (reorderDraggedRef.current !== null && reorderDraggedRef.current !== index) {
      const rect = e.currentTarget.getBoundingClientRect()
      const mouseY = e.clientY || 0
      const centerY = rect.top + rect.height / 2
      
      // Determine if we should insert above or below based on mouse position
      const insertAbove = mouseY < centerY
      
      // Update drag over index
      reorderDragOverRef.current = index
      setReorderDragOverIndex(index)
      
      // Update drag position for visual feedback
      if (mouseY) {
        setReorderDragPosition({ x: rect.left, y: mouseY })
      }
    }
  }

  const handleReorderDrag = (e) => {
    // Update position during drag for smooth movement
    if (reorderDraggedIndex !== null) {
      const mouseY = e.clientY || 0
      const mouseX = e.clientX || 0
      if (mouseY && mouseX) {
        setReorderDragPosition({ x: mouseX, y: mouseY })
        
        // Auto-scroll when dragging near top or bottom - calculate target scroll
        const modal = e.currentTarget.closest('.bg-white.dark\\:bg-gray-800') || document.querySelector('.bg-white.dark\\:bg-gray-800')
        if (modal) {
          const scrollContainer = modal.querySelector('.flex-1.overflow-y-auto')
          if (scrollContainer) {
            const rect = scrollContainer.getBoundingClientRect()
            const scrollThreshold = 100 // pixels from top/bottom to trigger scroll
            
            // Calculate distance from edge to determine scroll speed
            const distanceFromTop = mouseY - rect.top
            const distanceFromBottom = rect.bottom - mouseY
            let scrollSpeed = 0
            let targetScroll = scrollContainer.scrollTop
            
            // Check if near top - faster scroll the closer to edge
            if (mouseY < rect.top + scrollThreshold) {
              scrollSpeed = Math.max(15, (scrollThreshold - distanceFromTop) * 0.4) // 15-40px per frame
              targetScroll = Math.max(0, scrollContainer.scrollTop - scrollSpeed)
            }
            // Check if near bottom - faster scroll the closer to edge
            else if (mouseY > rect.bottom - scrollThreshold) {
              scrollSpeed = Math.max(15, (scrollThreshold - distanceFromBottom) * 0.4) // 15-40px per frame
              targetScroll = Math.min(
                scrollContainer.scrollHeight - scrollContainer.clientHeight,
                scrollContainer.scrollTop + scrollSpeed
              )
            }
            
            // Store target scroll for smooth animation
            if (scrollSpeed > 0) {
              scrollTargetRef.current = targetScroll
              
              // Start smooth scroll animation if not already running
              if (!scrollAnimationRef.current) {
                const animateScroll = () => {
                  if (scrollContainer) {
                    const currentScroll = scrollContainer.scrollTop
                    const target = scrollTargetRef.current
                    
                    if (target !== null && Math.abs(target - currentScroll) > 0.5) {
                      // Smooth interpolation - use larger factor for faster response
                      const diff = target - currentScroll
                      scrollContainer.scrollTop = currentScroll + diff * 0.5
                      scrollAnimationRef.current = requestAnimationFrame(animateScroll)
                    } else {
                      if (target !== null) {
                        scrollContainer.scrollTop = target
                      }
                      scrollAnimationRef.current = null
                    }
                  } else {
                    scrollAnimationRef.current = null
                  }
                }
                scrollAnimationRef.current = requestAnimationFrame(animateScroll)
              }
            } else {
              // Stop animation when not scrolling
              if (scrollAnimationRef.current) {
                cancelAnimationFrame(scrollAnimationRef.current)
                scrollAnimationRef.current = null
              }
              scrollTargetRef.current = null
            }
          }
        }
      }
    }
  }

  const handleReorderDragEnd = (e) => {
    // Stop scroll animation
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current)
      scrollAnimationRef.current = null
    }
    scrollTargetRef.current = null
    
    if (reorderDraggedRef.current !== null && reorderDragOverRef.current !== null) {
      const newItems = [...reorderItems]
      const [movedItem] = newItems.splice(reorderDraggedRef.current, 1)
      newItems.splice(reorderDragOverRef.current, 0, movedItem)
      setReorderItems(newItems)
    }
    reorderDraggedRef.current = null
    reorderDragOverRef.current = null
    setReorderDraggedIndex(null)
    setReorderDragOverIndex(null)
    setReorderDragPosition({ x: 0, y: 0 })
  }

  const handleReorderDrop = (e, index) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (reorderDraggedRef.current !== null && reorderDragOverRef.current !== null) {
      const newItems = [...reorderItems]
      const [movedItem] = newItems.splice(reorderDraggedRef.current, 1)
      newItems.splice(reorderDragOverRef.current, 0, movedItem)
      setReorderItems(newItems)
    }
    reorderDraggedRef.current = null
    reorderDragOverRef.current = null
    setReorderDraggedIndex(null)
    setReorderDragOverIndex(null)
    setReorderDragPosition({ x: 0, y: 0 })
  }

  const handleSaveReorder = () => {
    setMediaItems(reorderItems)
    setSettingsChanged(true)
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
      setVideoUrl(null)
      setPendingDownloadUrl(null)
      setVideoDetails(null)
    }
    setShowReorderModal(false)
  }

  const handleCancelReorder = () => {
    setReorderItems([])
    setShowReorderModal(false)
  }

  const handleGenerateVideo = async () => {
    if (mediaItems.length === 0) {
      alert('Please add at least one image or video')
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)
    setVideoDetails(null)
    setSettingsChanged(false) // Reset flag when starting generation
    try {
      const resolution = getCurrentResolution()
      const videoBlob = await generateVideoFromMultiple({
        mediaItems,
        fps,
        textOverlay: textOverlay.text && textOverlay.visible ? textOverlay : null, // Global text overlay from Step 3
        canvasRef,
        width: resolution.width,
        height: resolution.height,
        transitionDuration,
        onProgress: (progress) => {
          setGenerationProgress(Math.round(progress * 100))
        }
      })
      
      const url = URL.createObjectURL(videoBlob)
      
      // Calculate video details immediately
      const fileSizeMB = (videoBlob.size / (1024 * 1024)).toFixed(2)
      const calculatedDuration = mediaItems.reduce((total, item) => 
        total + (item.duration || 3), 0
      ).toFixed(1)
      
      const isInstagramCompatible = videoBlob.type.includes('mp4') && 
        (videoBlob.type.includes('h264') || videoBlob.type.includes('avc1'))
      
      const codec = videoBlob.type.includes('h264') || videoBlob.type.includes('avc1') ? 'H.264' : 
                   videoBlob.type.includes('vp9') ? 'VP9' : 
                   videoBlob.type.includes('vp8') ? 'VP8' : 'Unknown'
      
      setVideoDetails({
        resolution: `${resolution.width} × ${resolution.height}`,
        duration: `${calculatedDuration}s`,
        fileSize: `${fileSizeMB} MB`,
        format: videoBlob.type || 'video/webm',
        codec: codec,
        fps: fps,
        instagramCompatible: isInstagramCompatible
      })
      
      setVideoUrl(url)
      setPendingDownloadUrl(url)
      setGenerationProgress(100)
      setSettingsChanged(false) // Reset settings changed flag after generating new video
      // Auto-advance to download step after successful generation
      setTimeout(() => {
        setCurrentStep(5)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 500)
    } catch (error) {
      console.error('Error generating video:', error)
      const errorMessage = error?.message || 'Unknown error occurred'
      alert(`Error generating video: ${errorMessage}\n\nPlease check the console for more details.`)
      setGenerationProgress(0)
      setIsGenerating(false)
    } finally {
      setIsGenerating(false)
      setTimeout(() => setGenerationProgress(0), 500)
    }
  }

  const handleDownload = () => {
    const downloadUrl = pendingDownloadUrl || videoUrl
    if (downloadUrl) {
      // Set default name and show modal
      const defaultName = `video-${getCurrentResolution().width}x${getCurrentResolution().height}`
      setDownloadFileName(defaultName)
      setShowDownloadModal(true)
    }
  }

  const confirmDownload = () => {
    const downloadUrl = pendingDownloadUrl || videoUrl
    if (downloadUrl && downloadFileName.trim()) {
      // Sanitize filename (remove invalid characters)
      const sanitizedName = downloadFileName.replace(/[^a-z0-9_-]/gi, '_').toLowerCase() || `video-${getCurrentResolution().width}x${getCurrentResolution().height}`
      const fileName = sanitizedName.endsWith('.mp4') ? sanitizedName : `${sanitizedName}.mp4`
      
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      
      setShowDownloadModal(false)
      setDownloadFileName('')
    }
  }



  const handleSettingsSave = () => {
    if (settingsItem) {
      updateMediaItem(settingsItem.id, {
        effect: settingsItem.effect,
        duration: settingsItem.duration,
        textOverlay: settingsItem.textOverlay || {
          text: '',
          x: 50,
          y: 50,
          fontSize: 48,
          color: '#ffffff',
          backgroundColor: '#ff0000',
          animation: 'fade',
          animationDuration: 1,
          opacity: 100,
          visible: false,
          fullWidth: false,
          padding: 20,
          textAlign: 'left',
          verticalPosition: 'custom'
        }
      })
      // Mark that settings have changed - video needs to be regenerated
      setSettingsChanged(true)
      // Clear existing video since settings changed
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
        setVideoUrl(null)
        setPendingDownloadUrl(null)
        setVideoDetails(null)
      }
    }
    setSettingsItem(null)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }
  }

  const goToStep = (step) => {
    // Only allow backward navigation (going to previous steps)
    // Prevent forward navigation (can only go to steps <= currentStep)
    if (step >= 1 && step <= totalSteps && !isGenerating && step <= currentStep) {
      setCurrentStep(step)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-4 px-3 sm:px-4 pb-24 sm:pb-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Video Creator Wizard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Create professional videos from images in 5 easy steps
          </p>
        </div>

        {/* Step Indicator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-center w-full overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={isGenerating || step.id > currentStep}
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold text-sm sm:text-base transition-all flex-shrink-0 ${
                    step.id <= currentStep
                      ? 'bg-purple-600 text-white cursor-pointer hover:bg-purple-700 active:bg-purple-800'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                  } disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation`}
                  title={step.id <= currentStep ? `Go back to Step ${step.id}: ${step.name}` : `Complete previous steps first`}
                >
                  {currentStep > step.id ? <FontAwesomeIcon icon={faCheck} className="w-4 h-4 sm:w-5 sm:h-5" /> : step.id}
                </button>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 sm:h-1 mx-1 sm:mx-2 ${
                    currentStep > step.id ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Step 1: Resolution */}
          {currentStep === 1 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">
                Select Video Resolution
              </h2>
              <div className="space-y-4">
                <select
                  value={resolutionPreset}
                  onChange={(e) => {
                    const newResolution = e.target.value
                    // If resolution changes and video exists, invalidate it
                    if (newResolution !== resolutionPreset && videoUrl) {
                      URL.revokeObjectURL(videoUrl)
                      setVideoUrl(null)
                      setPendingDownloadUrl(null)
                      setVideoDetails(null)
                      setSettingsChanged(true)
                    }
                    setResolutionPreset(newResolution)
                  }}
                  className="w-full px-4 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {resolutionPresets.map(preset => (
                    <option key={preset.id} value={preset.id}>{preset.name}</option>
                  ))}
                    </select>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3">
                  <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300">
                    <strong>What to do:</strong> Select the video resolution based on where you plan to share your video (YouTube, Instagram, TikTok, Facebook). 
                    This determines the final video dimensions and quality. You can change this later, but it will require regenerating the video.
                  </p>
                </div>
                  </div>
            </div>
          )}

          {/* Step 2: Media Items & Configure */}
          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-6">
              {/* Media Items Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                        Add Media Items
                      </h2>
                      {mediaItems.length > 0 && (
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
                          <span className="font-semibold">Duration:</span>{' '}
                          <span className="text-gray-800 dark:text-white">
                            {mediaItems.reduce((total, item) => total + (item.duration || 3), 0).toFixed(1)}s
                          </span>
                          {' • '}
                          <span className="font-semibold">Media:</span>{' '}
                          <span className="text-gray-800 dark:text-white">
                            {mediaItems.length} image{mediaItems.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                    {mediaItems.length > 0 && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleOpenReorderModal}
                          className="text-sm px-3 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 transition-colors touch-manipulation flex items-center gap-1 flex-shrink-0"
                          title="Reorder Media"
                        >
                          <FontAwesomeIcon icon={faArrowsAlt} className="w-4 h-4" />
                          Reorder
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="text-sm px-3 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-500 active:bg-primary-600 transition-colors touch-manipulation flex items-center gap-1 flex-shrink-0"
                          title="Delete All"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                          Delete All
                        </button>
                      </div>
                    )}
                  </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className={`grid gap-3 sm:gap-4 ${mediaItems.length === 0 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
                {/* Upload Box - Always First */}
                <div
                  className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center cursor-pointer active:border-purple-500 transition-colors bg-gray-50 dark:bg-gray-700 touch-manipulation ${
                    mediaItems.length === 0 ? 'p-8 sm:p-12 min-h-[180px] sm:min-h-[200px]' : 'aspect-square'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FontAwesomeIcon icon={faPlus} className={`${mediaItems.length === 0 ? 'w-12 h-12 sm:w-16 sm:h-16' : 'w-8 h-8 sm:w-10 sm:h-10'} text-gray-400 mb-2`} />
                  <p className={`${mediaItems.length === 0 ? 'text-base sm:text-lg' : 'text-sm sm:text-base'} text-gray-500 dark:text-gray-400 text-center px-2`}>
                    {mediaItems.length === 0 ? 'Tap to upload or drag and drop' : 'Add Media'}
                  </p>
                </div>

                {/* Media Items */}
                {mediaItems.map((item, index) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOverItem(e, index)}
                    onDrop={(e) => handleDropItem(e, index)}
                    className="relative group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 active:border-purple-500 dark:active:border-purple-500 transition-all shadow-sm hover:shadow-md"
                  >
                    <div className="aspect-square relative">
                      {item.type === 'image' ? (
                        <img 
                          src={item.url} 
                          alt={`Item ${index + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <video 
                          src={item.url} 
                          className="w-full h-full object-cover" 
                          muted
                          loop
                          playsInline
                        />
                      )}
                      
                      {/* Top Overlay Bar */}
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent p-2 pb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                            #{index + 1}
                          </div>
                          {item.textOverlay && item.textOverlay.visible && item.textOverlay.text && item.textOverlay.text.trim() && (
                            <div className="bg-purple-500/90 dark:bg-purple-600/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                              <span className="w-2 h-2 bg-white rounded-full"></span>
                              Text
                            </div>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeMediaItem(item.id)
                          }}
                          className="bg-primary-500 hover:bg-primary-500 active:bg-primary-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg z-50 backdrop-blur-sm"
                          aria-label="Remove"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Bottom Info Bar */}
                      {item.type === 'image' && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-2 pt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm">
                              {item.duration}s
                            </div>
                            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm whitespace-nowrap">
                              {effects.find(e => e.id === item.effect)?.name || item.effect}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSettingsItem(item)
                            }}
                            className="bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg backdrop-blur-sm z-50"
                            title="Settings"
                            aria-label="Settings"
                          >
                            <FontAwesomeIcon icon={faGear} className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          )}

          {/* Step 3: Text Overlay */}
          {currentStep === 3 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                  Text Overlay (Optional)
                </h2>
                <button
                  onClick={() => {
                    setTextOverlay(prev => ({ ...prev, visible: !prev.visible }))
                    setSettingsChanged(true)
                    if (videoUrl) {
                      URL.revokeObjectURL(videoUrl)
                      setVideoUrl(null)
                      setPendingDownloadUrl(null)
                      setVideoDetails(null)
                    }
                  }}
                  className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors ${
                    textOverlay.visible ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 sm:h-6 sm:w-6 transform rounded-full bg-white transition-transform ${
                      textOverlay.visible ? 'translate-x-6 sm:translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {textOverlay.visible ? (
                <div 
                  className="space-y-3"
                  onClick={(e) => {
                    // Blur text input when clicking outside of it
                    if (e.target !== textInputRef.current && !textInputRef.current?.contains(e.target)) {
                      textInputRef.current?.blur()
                    }
                  }}
                >
                  {/* Text Input */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Text Content
                    </label>
                    <input
                      ref={textInputRef}
                      type="text"
                      value={textOverlay.text}
                      onChange={(e) => {
                        setTextOverlay(prev => ({ ...prev, text: e.target.value }))
                        setSettingsChanged(true)
                        if (videoUrl) {
                          URL.revokeObjectURL(videoUrl)
                          setVideoUrl(null)
                          setPendingDownloadUrl(null)
                          setVideoDetails(null)
                        }
                      }}
                      onKeyDown={(e) => {
                        // On Enter key or keyboard dismiss (mobile), blur the input
                        if (e.key === 'Enter' || e.key === 'Escape') {
                          e.preventDefault()
                          textInputRef.current?.blur()
                        }
                      }}
                      onBlur={() => {
                        // Additional blur handling for mobile keyboard dismissal
                        // This ensures focus is removed when keyboard is dismissed
                      }}
                      placeholder="Enter your text here"
                      className="w-full px-3 py-2 text-sm sm:text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* Show other settings only if text is entered */}
                  {textOverlay.text && textOverlay.text.trim() && (
                    <>
                      {/* Compact Grid Layout */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Font Size */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Font Size: {textOverlay.fontSize}px
                      </label>
                      <input
                        type="range"
                        min="12"
                        max="200"
                        step="4"
                        value={textOverlay.fontSize}
                        onChange={(e) => {
                          setTextOverlay(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))
                          setSettingsChanged(true)
                          if (videoUrl) {
                            URL.revokeObjectURL(videoUrl)
                            setVideoUrl(null)
                            setPendingDownloadUrl(null)
                            setVideoDetails(null)
                          }
                        }}
                        onClick={() => textInputRef.current?.blur()}
                        onMouseDown={() => textInputRef.current?.blur()}
                        onTouchStart={() => textInputRef.current?.blur()}
                        className="w-full h-2 touch-manipulation"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        <span>12</span>
                        <span>200</span>
                      </div>
                    </div>

                    {/* Opacity */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Opacity: {textOverlay.opacity}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={textOverlay.opacity}
                        onChange={(e) => {
                          setTextOverlay(prev => ({ ...prev, opacity: parseInt(e.target.value) }))
                          setSettingsChanged(true)
                          if (videoUrl) {
                            URL.revokeObjectURL(videoUrl)
                            setVideoUrl(null)
                            setPendingDownloadUrl(null)
                            setVideoDetails(null)
                          }
                        }}
                        onClick={() => textInputRef.current?.blur()}
                        onMouseDown={() => textInputRef.current?.blur()}
                        onTouchStart={() => textInputRef.current?.blur()}
                        className="w-full h-2 touch-manipulation"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* Full Width Toggle */}
                    <div className="col-span-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Width
                        </label>
                        <button
                          onClick={() => {
                            setTextOverlay(prev => ({ ...prev, fullWidth: !prev.fullWidth }))
                            setSettingsChanged(true)
                            if (videoUrl) {
                              URL.revokeObjectURL(videoUrl)
                              setVideoUrl(null)
                              setPendingDownloadUrl(null)
                              setVideoDetails(null)
                            }
                            textInputRef.current?.blur()
                          }}
                          className={`relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
                            textOverlay.fullWidth ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${
                              textOverlay.fullWidth ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Position Controls - Show different based on fullWidth */}
                    {textOverlay.fullWidth ? (
                      <>
                        {/* Text Alignment (only for full width) */}
                        <div className="col-span-2">
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Text Alignment
                          </label>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setTextOverlay(prev => ({ ...prev, textAlign: 'left' }))
                                setSettingsChanged(true)
                                if (videoUrl) {
                                  URL.revokeObjectURL(videoUrl)
                                  setVideoUrl(null)
                                  setPendingDownloadUrl(null)
                                  setVideoDetails(null)
                                }
                                textInputRef.current?.blur()
                              }}
                              className={`flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl font-medium transition-colors touch-manipulation ${
                                textOverlay.textAlign === 'left'
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                              }`}
                            >
                              Left
                            </button>
                            <button
                              onClick={() => {
                                setTextOverlay(prev => ({ ...prev, textAlign: 'center' }))
                                setSettingsChanged(true)
                                if (videoUrl) {
                                  URL.revokeObjectURL(videoUrl)
                                  setVideoUrl(null)
                                  setPendingDownloadUrl(null)
                                  setVideoDetails(null)
                                }
                                textInputRef.current?.blur()
                              }}
                              className={`flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl font-medium transition-colors touch-manipulation ${
                                textOverlay.textAlign === 'center'
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                              }`}
                            >
                              Center
                            </button>
                            <button
                              onClick={() => {
                                setTextOverlay(prev => ({ ...prev, textAlign: 'right' }))
                                setSettingsChanged(true)
                                if (videoUrl) {
                                  URL.revokeObjectURL(videoUrl)
                                  setVideoUrl(null)
                                  setPendingDownloadUrl(null)
                                  setVideoDetails(null)
                                }
                                textInputRef.current?.blur()
                              }}
                              className={`flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl font-medium transition-colors touch-manipulation ${
                                textOverlay.textAlign === 'right'
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                              }`}
                            >
                              Right
                            </button>
                          </div>
                        </div>
                        {/* Padding (only for full width) */}
                        <div className="col-span-2">
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Padding: {textOverlay.padding}px
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={textOverlay.padding}
                            onChange={(e) => {
                              setTextOverlay(prev => ({ ...prev, padding: parseInt(e.target.value) }))
                              setSettingsChanged(true)
                              if (videoUrl) {
                                URL.revokeObjectURL(videoUrl)
                                setVideoUrl(null)
                                setPendingDownloadUrl(null)
                                setVideoDetails(null)
                              }
                            }}
                            onClick={() => textInputRef.current?.blur()}
                            onMouseDown={() => textInputRef.current?.blur()}
                            onTouchStart={() => textInputRef.current?.blur()}
                            className="w-full h-2 touch-manipulation"
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            <span>0px</span>
                            <span>100px</span>
                          </div>
                        </div>
                        {/* Vertical Position (only for full width) */}
                        <div className="col-span-2">
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Vertical Position: {textOverlay.y}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={textOverlay.y}
                            onChange={(e) => {
                              setTextOverlay(prev => ({ ...prev, y: parseInt(e.target.value) }))
                              setSettingsChanged(true)
                              if (videoUrl) {
                                URL.revokeObjectURL(videoUrl)
                                setVideoUrl(null)
                                setPendingDownloadUrl(null)
                                setVideoDetails(null)
                              }
                            }}
                            onClick={() => textInputRef.current?.blur()}
                            onMouseDown={() => textInputRef.current?.blur()}
                            onTouchStart={() => textInputRef.current?.blur()}
                            className="w-full h-2 touch-manipulation"
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            <span>Top (0%)</span>
                            <span>Bottom (100%)</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Horizontal Position */}
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            X: {textOverlay.x}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={textOverlay.x}
                            onChange={(e) => {
                              setTextOverlay(prev => ({ ...prev, x: parseInt(e.target.value) }))
                              setSettingsChanged(true)
                              if (videoUrl) {
                                URL.revokeObjectURL(videoUrl)
                                setVideoUrl(null)
                                setPendingDownloadUrl(null)
                                setVideoDetails(null)
                              }
                            }}
                            onClick={() => textInputRef.current?.blur()}
                            onMouseDown={() => textInputRef.current?.blur()}
                            onTouchStart={() => textInputRef.current?.blur()}
                            className="w-full h-2 touch-manipulation"
                          />
                        </div>

                        {/* Vertical Position */}
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Y: {textOverlay.y}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={textOverlay.y}
                            onChange={(e) => {
                              setTextOverlay(prev => ({ ...prev, y: parseInt(e.target.value) }))
                              setSettingsChanged(true)
                              if (videoUrl) {
                                URL.revokeObjectURL(videoUrl)
                                setVideoUrl(null)
                                setPendingDownloadUrl(null)
                                setVideoDetails(null)
                              }
                            }}
                            onClick={() => textInputRef.current?.blur()}
                            onMouseDown={() => textInputRef.current?.blur()}
                            onTouchStart={() => textInputRef.current?.blur()}
                            className="w-full h-2 touch-manipulation"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Color and Background in Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Text Color */}
                    <div className="pt-0.5">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 pt-0.5">
                        Text Color
                      </label>
                      <div className="relative">
                        <input
                          ref={textColorPickerRef}
                          type="color"
                          value={textOverlay.color}
                          onChange={(e) => {
                            setTextOverlay(prev => ({ ...prev, color: e.target.value }))
                            setSettingsChanged(true)
                            if (videoUrl) {
                              URL.revokeObjectURL(videoUrl)
                              setVideoUrl(null)
                              setPendingDownloadUrl(null)
                              setVideoDetails(null)
                            }
                          }}
                          className="hidden"
                        />
                        <div className="relative">
                          <input
                            type="text"
                            value={textOverlay.color}
                            onFocus={(e) => {
                              e.preventDefault()
                              setColorPickerType('text')
                              setShowColorPicker(true)
                            }}
                            onClick={(e) => {
                              e.preventDefault()
                              setColorPickerType('text')
                              setShowColorPicker(true)
                            }}
                            onChange={(e) => {
                              setTextOverlay(prev => ({ ...prev, color: e.target.value }))
                              setSettingsChanged(true)
                              if (videoUrl) {
                                URL.revokeObjectURL(videoUrl)
                                setVideoUrl(null)
                                setPendingDownloadUrl(null)
                                setVideoDetails(null)
                              }
                            }}
                            placeholder="#ffffff"
                            className="w-full pl-9 pr-2 py-2 text-xs sm:text-sm border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                            readOnly
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setColorPickerType('text')
                              setShowColorPicker(true)
                              textInputRef.current?.blur()
                            }}
                            className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-gray-400 dark:border-gray-500 cursor-pointer touch-manipulation shadow-sm z-10"
                            style={{ backgroundColor: textOverlay.color }}
                            title="Click to change color"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Background Color */}
                    <div className="pt-0.5">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 pt-0.5">
                        Background
                      </label>
                      <div className="relative">
                        <input
                          ref={bgColorPickerRef}
                          type="color"
                          value={textOverlay.backgroundColor === 'transparent' ? '#000000' : textOverlay.backgroundColor}
                          onChange={(e) => {
                            setTextOverlay(prev => ({ ...prev, backgroundColor: e.target.value }))
                            setSettingsChanged(true)
                            if (videoUrl) {
                              URL.revokeObjectURL(videoUrl)
                              setVideoUrl(null)
                              setPendingDownloadUrl(null)
                              setVideoDetails(null)
                            }
                          }}
                          className="hidden"
                        />
                        <div className="relative">
                          <input
                            type="text"
                            value={textOverlay.backgroundColor === 'transparent' ? '' : textOverlay.backgroundColor}
                            onFocus={(e) => {
                              e.preventDefault()
                              setColorPickerType('background')
                              setShowColorPicker(true)
                            }}
                            onClick={(e) => {
                              e.preventDefault()
                              setColorPickerType('background')
                              setShowColorPicker(true)
                            }}
                            onChange={(e) => {
                              setTextOverlay(prev => ({ ...prev, backgroundColor: e.target.value || 'transparent' }))
                              setSettingsChanged(true)
                              if (videoUrl) {
                                URL.revokeObjectURL(videoUrl)
                                setVideoUrl(null)
                                setPendingDownloadUrl(null)
                                setVideoDetails(null)
                              }
                            }}
                            placeholder="transparent"
                            className="w-full pl-9 pr-2 py-2 text-xs sm:text-sm border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                            readOnly
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setColorPickerType('background')
                              setShowColorPicker(true)
                              textInputRef.current?.blur()
                            }}
                            className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-gray-400 dark:border-gray-500 cursor-pointer touch-manipulation shadow-sm z-10"
                            style={{ 
                              backgroundColor: textOverlay.backgroundColor === 'transparent' ? 'transparent' : textOverlay.backgroundColor
                            }}
                            title="Click to change color"
                          >
                            {textOverlay.backgroundColor === 'transparent' && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">/</span>
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Animation Options */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Animation Effect */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Animation
                      </label>
                      <select
                        value={textOverlay.animation}
                        onChange={(e) => {
                          setTextOverlay(prev => ({ ...prev, animation: e.target.value }))
                          setSettingsChanged(true)
                          if (videoUrl) {
                            URL.revokeObjectURL(videoUrl)
                            setVideoUrl(null)
                            setPendingDownloadUrl(null)
                            setVideoDetails(null)
                          }
                          textInputRef.current?.blur()
                        }}
                        onClick={() => textInputRef.current?.blur()}
                        onFocus={() => textInputRef.current?.blur()}
                        aria-label="Select text animation effect"
                        className="w-full px-3 py-2 text-xs sm:text-sm border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent touch-manipulation"
                      >
                        {textAnimations.map(anim => (
                          <option key={anim.id} value={anim.id}>
                            {anim.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Animation Duration */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Anim Duration: {textOverlay.animationDuration}s
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="5"
                        step="0.5"
                        value={textOverlay.animationDuration}
                        onChange={(e) => {
                          setTextOverlay(prev => ({ ...prev, animationDuration: parseFloat(e.target.value) }))
                          setSettingsChanged(true)
                          if (videoUrl) {
                            URL.revokeObjectURL(videoUrl)
                            setVideoUrl(null)
                            setPendingDownloadUrl(null)
                            setVideoDetails(null)
                          }
                        }}
                        onClick={() => textInputRef.current?.blur()}
                        onMouseDown={() => textInputRef.current?.blur()}
                        onTouchStart={() => textInputRef.current?.blur()}
                        className="w-full h-2 touch-manipulation"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        <span>0.5s</span>
                        <span>5s</span>
                      </div>
                    </div>
                  </div>

                      {/* Preview Canvas */}
                      {textOverlay.text && textOverlay.text.trim() && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-1.5 sm:p-2">
                          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white mb-1 sm:mb-2">
                            Preview ({getCurrentResolution().width} × {getCurrentResolution().height})
                          </h3>
                          <div className="flex justify-center items-center bg-black rounded-xl p-4 overflow-hidden w-full">
                            <canvas
                              ref={textPreviewCanvasRef}
                              className="border border-gray-300 dark:border-gray-600 rounded-xl"
                              style={{ 
                                maxWidth: '100%', 
                                maxHeight: '100%',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain',
                                display: 'block'
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {!textOverlay.text || !textOverlay.text.trim() ? (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-200 dark:border-blue-800">
                      <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300">
                        💡 <span className="font-semibold">Tip:</span> Enter text above to configure text overlay settings.
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-200 dark:border-blue-800">
                  <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300">
                    💡 <span className="font-semibold">Tip:</span> You can skip adding text. This step is optional.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Generate */}
          {currentStep === 4 && (
            <div className="space-y-4 sm:space-y-6">
              {/* Generate Section */}
              <div className="rounded-xl shadow-lg p-4 sm:p-6 relative z-40">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">
                  Generate Video
                </h2>
                {mediaItems.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-4">
                      Add media items first to generate video
                    </p>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors text-sm sm:text-base font-semibold touch-manipulation"
                    >
                      Go to Add Media
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Resolution:</span>
                          <p className="text-gray-800 dark:text-white font-semibold text-xs">
                            {resolutionPresets.find(p => p.id === resolutionPreset)?.name || `${getCurrentResolution().width} × ${getCurrentResolution().height}`}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                          <p className="text-gray-800 dark:text-white font-semibold">
                            {mediaItems.reduce((total, item) => total + (item.duration || 3), 0).toFixed(1)}s
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Media Count:</span>
                          <p className="text-gray-800 dark:text-white font-semibold">
                            {mediaItems.length} item{mediaItems.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">FPS:</span>
                          <p className="text-gray-800 dark:text-white font-semibold">
                            {fps}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Notification for settings changed */}
                    {settingsChanged && videoUrl && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3 sm:p-4">
                        <p className="text-sm sm:text-base text-yellow-800 dark:text-yellow-300">
                          <span className="font-semibold">⚠️ Settings Changed:</span> Your video settings have been modified. Please regenerate the video to apply changes.
                        </p>
                      </div>
                    )}
                    <button
                      onClick={handleGenerateVideo}
                      disabled={
                        isGenerating || 
                        mediaItems.length === 0 || 
                        (videoUrl && !settingsChanged)
                      }
                      className="w-full py-4 sm:py-5 px-6 rounded-xl font-semibold text-base sm:text-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg relative overflow-hidden touch-manipulation bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white"
                    >
                      <span className="relative z-10">
                        {isGenerating ? (
                          `Generating Video... ${generationProgress}%`
                        ) : settingsChanged && videoUrl ? (
                          'Regenerate Video'
                        ) : videoUrl && !settingsChanged ? (
                          'Video Already Generated'
                        ) : (
                          'Generate Video'
                        )}
                      </span>
                      {isGenerating && (
                        <div 
                          className="absolute top-0 left-0 h-full bg-purple-800 transition-all duration-300 ease-out opacity-50"
                          style={{ width: `${generationProgress}%` }}
                        />
                      )}
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Step 5: Download */}
          {currentStep === 5 && (
            <div className="space-y-4 sm:space-y-6">
              {!videoUrl ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-4">
                      No video generated yet. Please generate a video first.
                    </p>
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 active:bg-purple-800 transition-colors text-sm sm:text-base font-semibold touch-manipulation"
                    >
                      Go to Generate Step
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">
                    Generated Video
                  </h2>
                  <div className="space-y-4 sm:space-y-6">
                    <video
                      src={videoUrl}
                      controls
                      className="w-full rounded-xl shadow-md"
                    />
                    
                    {/* Video Details */}
                    {videoDetails && (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-2">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white mb-3">
                          Video Properties
                        </h3>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Resolution:</span>
                            <p className="text-gray-800 dark:text-white font-medium text-xs">
                              {resolutionPresets.find(p => p.id === resolutionPreset)?.name || videoDetails.resolution}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                            <p className="text-gray-800 dark:text-white font-medium">{videoDetails.duration}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">File Size:</span>
                            <p className="text-gray-800 dark:text-white font-medium">{videoDetails.fileSize}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">FPS:</span>
                            <p className="text-gray-800 dark:text-white font-medium">{videoDetails.fps}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Format:</span>
                            <p className="text-gray-800 dark:text-white font-medium">{videoDetails.format}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Codec:</span>
                            <p className="text-gray-800 dark:text-white font-medium">{videoDetails.codec}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {(() => {
          const hasPrevious = currentStep > 1
          const hasDownload = currentStep === 5 && videoUrl
          const hasNext = currentStep < totalSteps
          const buttonCount = (hasPrevious ? 1 : 0) + (hasDownload ? 1 : 0) + (hasNext ? 1 : 0)
          const showFooter = hasPrevious || hasNext || hasDownload
          
          return showFooter ? (
            <div className={`mt-6 sm:mt-8 flex ${buttonCount === 1 ? 'flex-col sm:flex-row' : 'flex-row'} gap-3 fixed bottom-0 left-0 right-0 p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg sm:static sm:p-4 sm:px-6 sm:bg-transparent sm:border-0 sm:rounded-xl sm:shadow-md z-[60] sm:z-auto ${(hasPrevious || hasNext || hasDownload) ? 'sm:justify-between' : ''}`}>
              {hasPrevious && (
                <div className={`flex flex-row gap-3 ${buttonCount === 1 ? 'w-full sm:w-auto' : 'flex-1 sm:flex-initial'}`}>
                  <button
                    onClick={prevStep}
                    disabled={isGenerating}
                    className={`${buttonCount === 1 ? 'w-full sm:w-auto' : 'flex-1 sm:flex-initial'} px-6 py-3 sm:py-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors text-base sm:text-lg touch-manipulation`}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                    Previous
                  </button>
                </div>
              )}
              <div className={`flex flex-row gap-3 ${buttonCount === 1 ? 'w-full sm:w-auto sm:ml-auto' : 'flex-1 sm:flex-initial sm:ml-auto'}`}>
                {hasDownload && (
                  <button
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className={`${buttonCount === 1 ? 'w-full sm:w-auto' : 'flex-1 sm:flex-initial'} px-6 py-3 sm:py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 active:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-base sm:text-lg touch-manipulation`}
                  >
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    Download
                  </button>
                )}
                {hasNext && (
                  <button
                    onClick={nextStep}
                    disabled={
                      isGenerating ||
                      (currentStep === 2 && mediaItems.length === 0) || 
                      (currentStep === 3 && textOverlay.visible && (!textOverlay.text || !textOverlay.text.trim())) ||
                      (currentStep === 4 && (!videoUrl || settingsChanged))
                    }
                    className={`${buttonCount === 1 ? 'w-full sm:w-auto' : 'flex-1 sm:flex-initial'} px-6 py-3 sm:py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 active:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-base sm:text-lg touch-manipulation`}
                  >
                    Next
                    <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                  </button>
                )}
              </div>
            </div>
          ) : null
        })()}

            {/* Reorder Modal */}
            {showReorderModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-3 sm:p-4 touch-none">
                <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full h-[90vh] max-h-[90vh] flex flex-col overflow-hidden">
                  {/* Header - Fixed */}
                  <div className="flex-shrink-0 p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                        Reorder Media Items
                      </h3>
                      <button
                        onClick={handleCancelReorder}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center touch-manipulation"
                        aria-label="Close"
                      >
                        <FontAwesomeIcon icon={faTimes} className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 mt-3 sm:mt-4">
                      <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300 flex items-center gap-2">
                        <FontAwesomeIcon icon={faArrowsAlt} className="w-4 h-4 flex-shrink-0" />
                        <span>
                          <strong>Tip:</strong> Hold the media item and then start moving it to drag and drop. 
                          On mobile, use long press then drag.
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Scrollable Content Area */}
                  <div 
                    className="flex-1 overflow-y-auto touch-auto"
                    style={{ 
                      overscrollBehavior: 'contain',
                      scrollBehavior: 'smooth'
                    }}
                    ref={(el) => {
                      if (el) {
                        // Store reference for scroll control during drag
                        el._scrollContainer = el
                      }
                    }}
                  >
                    <div className="p-4 sm:p-6 pt-4 sm:pt-4">
                      {/* Vertical Stack View */}
                      <div className="flex flex-col gap-2 sm:gap-2.5 lg:gap-2">
                {reorderItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {/* Drop Zone Indicator (above item) */}
                    {reorderDragOverIndex === index && reorderDraggedIndex !== null && reorderDraggedIndex < index && (
                      <div className="h-1.5 bg-purple-400 dark:bg-purple-500 rounded-full mx-auto w-3/4 animate-pulse" />
                    )}
                    <div
                      draggable
                      onDragStart={(e) => handleReorderDragStart(e, index)}
                      onDrag={(e) => handleReorderDrag(e)}
                      onDragOver={(e) => handleReorderDragOver(e, index)}
                      onDragEnd={(e) => handleReorderDragEnd(e)}
                      onDrop={(e) => handleReorderDrop(e, index)}
                      className={`relative group bg-white dark:bg-gray-700 rounded-xl overflow-hidden border-2 shadow-sm hover:shadow-md cursor-move transition-all duration-200 ease-out ${
                        reorderDraggedIndex === index 
                          ? 'opacity-40 border-purple-500 dark:border-purple-500 z-50 shadow-2xl' 
                          : reorderDragOverIndex === index && reorderDraggedIndex !== null
                            ? 'border-purple-400 dark:border-purple-400 border-dashed scale-[1.02] bg-purple-50/30 dark:bg-purple-900/30 shadow-lg' 
                            : 'border-gray-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500'
                      }`}
                    >
                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-2 p-2 sm:p-3 lg:p-2">
                      {/* Drag Handle */}
                      <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 lg:w-7 lg:h-7 bg-gray-100 dark:bg-gray-600 rounded-xl">
                        <FontAwesomeIcon icon={faArrowsAlt} className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 text-gray-500 dark:text-gray-400" />
                      </div>
                      
                      {/* Order Number */}
                      <div className="flex-shrink-0 bg-purple-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 lg:w-7 lg:h-7 flex items-center justify-center font-bold text-xs shadow-lg">
                        {index + 1}
                      </div>
                      
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-14 lg:h-14 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-600">
                        {item.type === 'image' ? (
                          <img 
                            src={item.url} 
                            alt={`Item ${index + 1}`} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <video 
                            src={item.url} 
                            className="w-full h-full object-cover" 
                            muted
                            loop
                            playsInline
                          />
                        )}
                      </div>
                      
                      {/* Item Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-1.5">
                          {item.type === 'image' && (
                            <>
                              <div className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium px-1.5 sm:px-2 lg:px-1.5 py-0.5 sm:py-1 rounded">
                                {item.duration}s
                              </div>
                              <div className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium px-1.5 sm:px-2 lg:px-1.5 py-0.5 sm:py-1 rounded truncate max-w-[120px] sm:max-w-[150px] lg:max-w-[140px]">
                                {effects.find(e => e.id === item.effect)?.name || item.effect}
                              </div>
                            </>
                          )}
                          {item.textOverlay && item.textOverlay.visible && item.textOverlay.text && item.textOverlay.text.trim() && (
                            <div className="bg-purple-500/90 dark:bg-purple-600/90 text-white text-xs font-medium px-1.5 sm:px-2 lg:px-1.5 py-0.5 sm:py-1 rounded flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                              Text
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    </div>
                    {/* Drop Zone Indicator (below item) */}
                    {reorderDragOverIndex === index && reorderDraggedIndex !== null && reorderDraggedIndex > index && (
                      <div className="h-1.5 bg-purple-400 dark:bg-purple-500 rounded-full mx-auto w-3/4 animate-pulse" />
                    )}
                  </React.Fragment>
                ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer - Fixed */}
                  <div className="flex-shrink-0 p-4 sm:p-6 pt-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex flex-row gap-3">
                      <button
                        onClick={handleCancelReorder}
                        className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-3 sm:py-4 px-6 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors touch-manipulation"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveReorder}
                        className="flex-1 bg-purple-600 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold text-base sm:text-lg hover:bg-purple-700 active:bg-purple-800 transition-colors touch-manipulation"
                      >
                        Save Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-3 sm:p-4 touch-none">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 max-w-md w-full touch-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                  Delete All Media Items?
                </h3>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center touch-manipulation"
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete all media items? This action cannot be undone.
              </p>
              <div className="flex flex-row gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setMediaItems([])
                    setSettingsChanged(true)
                    if (videoUrl) {
                      URL.revokeObjectURL(videoUrl)
                      setVideoUrl(null)
                      setPendingDownloadUrl(null)
                      setVideoDetails(null)
                    }
                    setShowDeleteConfirm(false)
                  }}
                  className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-500 active:bg-primary-600 transition-colors touch-manipulation"
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Color Picker Modal */}
        {showColorPicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[80] p-3 sm:p-4 touch-none">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 max-w-sm w-full touch-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                  Select {colorPickerType === 'text' ? 'Text' : 'Background'} Color
                </h3>
                <button
                  onClick={() => setShowColorPicker(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center touch-manipulation"
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              <div className="space-y-4">
                {/* Color Picker Input */}
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <input
                    ref={colorPickerType === 'text' ? textColorPickerRef : bgColorPickerRef}
                    type="color"
                    value={colorPickerType === 'text' 
                      ? (settingsItem?.textOverlay?.visible ? (settingsItem.textOverlay.color || '#ffffff') : textOverlay.color)
                      : (settingsItem?.textOverlay?.visible ? ((settingsItem.textOverlay.backgroundColor === 'transparent' ? '#000000' : settingsItem.textOverlay.backgroundColor) || '#000000') : (textOverlay.backgroundColor === 'transparent' ? '#000000' : textOverlay.backgroundColor))}
                    onChange={(e) => {
                      const newColor = e.target.value
                      if (settingsItem?.textOverlay?.visible) {
                        // Update settingsItem textOverlay
                        setSettingsItem({
                          ...settingsItem,
                          textOverlay: {
                            ...settingsItem.textOverlay,
                            [colorPickerType === 'text' ? 'color' : 'backgroundColor']: newColor
                          }
                        })
                      } else {
                        // Update global textOverlay (Step 3)
                        if (colorPickerType === 'text') {
                          setTextOverlay(prev => ({ ...prev, color: newColor }))
                        } else {
                          setTextOverlay(prev => ({ ...prev, backgroundColor: newColor }))
                        }
                        setSettingsChanged(true)
                        if (videoUrl) {
                          URL.revokeObjectURL(videoUrl)
                          setVideoUrl(null)
                          setPendingDownloadUrl(null)
                          setVideoDetails(null)
                        }
                      }
                    }}
                    className="w-full h-16 sm:h-20 rounded-xl border-2 border-gray-300 dark:border-gray-600 cursor-pointer touch-manipulation"
                  />
                </div>
                
                {/* Hex Input */}
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hex Color Code
                  </label>
                  <input
                    type="text"
                    value={colorPickerType === 'text' 
                      ? (settingsItem?.textOverlay?.visible ? (settingsItem.textOverlay.color || '#ffffff') : textOverlay.color)
                      : (settingsItem?.textOverlay?.visible ? ((settingsItem.textOverlay.backgroundColor === 'transparent' ? '' : settingsItem.textOverlay.backgroundColor) || '') : (textOverlay.backgroundColor === 'transparent' ? '' : textOverlay.backgroundColor))}
                    onChange={(e) => {
                      const newValue = e.target.value
                      if (settingsItem?.textOverlay?.visible) {
                        // Update settingsItem textOverlay
                        setSettingsItem({
                          ...settingsItem,
                          textOverlay: {
                            ...settingsItem.textOverlay,
                            [colorPickerType === 'text' ? 'color' : 'backgroundColor']: colorPickerType === 'text' ? newValue : (newValue || 'transparent')
                          }
                        })
                      } else {
                        // Update global textOverlay (Step 3)
                        if (colorPickerType === 'text') {
                          setTextOverlay(prev => ({ ...prev, color: newValue }))
                        } else {
                          setTextOverlay(prev => ({ ...prev, backgroundColor: newValue || 'transparent' }))
                        }
                        setSettingsChanged(true)
                        if (videoUrl) {
                          URL.revokeObjectURL(videoUrl)
                          setVideoUrl(null)
                          setPendingDownloadUrl(null)
                          setVideoDetails(null)
                        }
                      }
                    }}
                    placeholder={colorPickerType === 'text' ? '#ffffff' : 'transparent or #hex'}
                    className="w-full px-4 py-3 text-base sm:text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Transparent option for background */}
                {colorPickerType === 'background' && (
                  <button
                    onClick={() => {
                      if (settingsItem?.textOverlay?.visible) {
                        // Update settingsItem textOverlay
                        setSettingsItem({
                          ...settingsItem,
                          textOverlay: {
                            ...settingsItem.textOverlay,
                            backgroundColor: 'transparent'
                          }
                        })
                      } else {
                        // Update global textOverlay (Step 3)
                        setTextOverlay(prev => ({ ...prev, backgroundColor: 'transparent' }))
                        setSettingsChanged(true)
                        if (videoUrl) {
                          URL.revokeObjectURL(videoUrl)
                          setVideoUrl(null)
                          setPendingDownloadUrl(null)
                          setVideoDetails(null)
                        }
                      }
                    }}
                    className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors touch-manipulation"
                  >
                    Set to Transparent
                  </button>
                )}

                <div className="flex gap-3 sm:gap-4 pt-2">
                  <button
                    onClick={() => setShowColorPicker(false)}
                    className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 active:bg-purple-800 transition-colors touch-manipulation"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-4 right-4 z-[70] max-w-sm w-full sm:max-w-md transform transition-all duration-300 ease-in-out">
            <div className={`rounded-xl shadow-lg p-4 border-2 ${
              toast.type === 'error' 
                ? 'bg-primary-50 dark:bg-primary-800/20 border-red-200 dark:border-primary-700' 
                : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 ${toast.type === 'error' ? 'text-primary-500' : 'text-green-500'}`}>
                  {toast.type === 'error' ? (
                    <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                  ) : (
                    <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm sm:text-base font-medium ${
                    toast.type === 'error'
                      ? 'text-primary-700 dark:text-red-300'
                      : 'text-green-800 dark:text-green-300'
                  }`}>
                    {toast.message}
                  </p>
                </div>
                <button
                  onClick={() => setToast(null)}
                  className={`flex-shrink-0 ${toast.type === 'error' ? 'text-primary-500 hover:text-primary-600' : 'text-green-500 hover:text-green-700'}`}
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Download Filename Modal */}
        {showDownloadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-3 sm:p-4 touch-none">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 max-w-md w-full touch-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                  Enter Video Name
                </h3>
                <button
                  onClick={() => {
                    setShowDownloadModal(false)
                    setDownloadFileName('')
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center touch-manipulation"
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Video Name
                </label>
                <input
                  type="text"
                  value={downloadFileName}
                  onChange={(e) => setDownloadFileName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      confirmDownload()
                    }
                  }}
                  placeholder="Enter video name"
                  className="w-full px-4 py-3 text-base sm:text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoFocus
                />
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
                  File will be saved as: {downloadFileName.replace(/[^a-z0-9_-]/gi, '_').toLowerCase() || 'video'}.mp4
                </p>
              </div>
              <div className="flex flex-row gap-3">
                <button
                  onClick={() => {
                    setShowDownloadModal(false)
                    setDownloadFileName('')
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDownload}
                  disabled={!downloadFileName.trim()}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 active:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors touch-manipulation"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {settingsItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-3 sm:p-4 touch-none">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto touch-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 dark:text-white">
                  Settings
                </h3>
                <button
                  onClick={() => setSettingsItem(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center touch-manipulation"
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                    Animation Effect
                  </label>
                  <select
                    value={settingsItem.effect}
                    onChange={(e) => setSettingsItem({ ...settingsItem, effect: e.target.value })}
                    className="w-full px-4 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent touch-manipulation"
                  >
                    {effects.map(effect => (
                      <option key={effect.id} value={effect.id}>
                        {effect.name} - {effect.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                    Duration: {settingsItem.duration}s
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={settingsItem.duration}
                    onChange={(e) => setSettingsItem({ ...settingsItem, duration: parseFloat(e.target.value) })}
                    className="w-full h-2 sm:h-3 touch-manipulation"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>1s</span>
                    <span>10s</span>
                  </div>
                </div>

                {/* Text Overlay Section */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                      Text Overlay
                    </h4>
                    <button
                      onClick={() => {
                        const currentTextOverlay = settingsItem.textOverlay || {
                          text: '',
                          x: 50,
                          y: 50,
                          fontSize: 48,
                          color: '#ffffff',
                          backgroundColor: '#ff0000',
                          animation: 'fade',
                          animationDuration: 1,
                          opacity: 100,
                          visible: false,
                          fullWidth: false,
                          padding: 20,
                          textAlign: 'left',
                          verticalPosition: 'custom'
                        }
                        setSettingsItem({
                          ...settingsItem,
                          textOverlay: {
                            ...currentTextOverlay,
                            visible: !currentTextOverlay.visible
                          }
                        })
                      }}
                      className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors ${
                        (settingsItem.textOverlay?.visible) ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 sm:h-6 sm:w-6 transform rounded-full bg-white transition-transform ${
                          (settingsItem.textOverlay?.visible) ? 'translate-x-6 sm:translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {(settingsItem.textOverlay?.visible) && (
                    <div className="space-y-3">
                      {/* Text Input */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Text Content
                        </label>
                        <input
                          ref={settingsTextInputRef}
                          type="text"
                          value={settingsItem.textOverlay?.text || ''}
                          onChange={(e) => {
                            const currentTextOverlay = settingsItem.textOverlay || {
                              text: '',
                              x: 50,
                              y: 50,
                              fontSize: 48,
                              color: '#ffffff',
                              backgroundColor: '#ff0000',
                              animation: 'fade',
                              animationDuration: 1,
                              opacity: 100,
                              visible: true,
                              fullWidth: false,
                              padding: 20,
                              textAlign: 'left',
                              verticalPosition: 'custom'
                            }
                            setSettingsItem({
                              ...settingsItem,
                              textOverlay: {
                                ...currentTextOverlay,
                                text: e.target.value
                              }
                            })
                          }}
                          onKeyDown={(e) => {
                            // On Enter key, blur the input
                            if (e.key === 'Enter' || e.key === 'Escape') {
                              e.preventDefault()
                              settingsTextInputRef.current?.blur()
                            }
                          }}
                          placeholder="Enter your text here"
                          className="w-full px-3 py-2 text-sm sm:text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      {/* Show other settings only if text is entered */}
                      {settingsItem.textOverlay?.text && settingsItem.textOverlay.text.trim() && (
                        <div className="grid grid-cols-2 gap-3">
                          {/* Font Size */}
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Font Size: {settingsItem.textOverlay.fontSize || 48}px
                            </label>
                            <input
                              type="range"
                              min="12"
                              max="200"
                              step="4"
                              value={settingsItem.textOverlay.fontSize || 48}
                              onChange={(e) => {
                                setSettingsItem({
                                  ...settingsItem,
                                  textOverlay: {
                                    ...settingsItem.textOverlay,
                                    fontSize: parseInt(e.target.value)
                                  }
                                })
                              }}
                              className="w-full h-2 touch-manipulation"
                            />
                          </div>

                          {/* Opacity */}
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Opacity: {settingsItem.textOverlay.opacity || 100}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              step="1"
                              value={settingsItem.textOverlay.opacity || 100}
                              onChange={(e) => {
                                setSettingsItem({
                                  ...settingsItem,
                                  textOverlay: {
                                    ...settingsItem.textOverlay,
                                    opacity: parseInt(e.target.value)
                                  }
                                })
                              }}
                              className="w-full h-2 touch-manipulation"
                            />
                          </div>

                          {/* Animation */}
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Animation
                            </label>
                            <select
                              value={settingsItem.textOverlay.animation || 'fade'}
                              onChange={(e) => {
                                setSettingsItem({
                                  ...settingsItem,
                                  textOverlay: {
                                    ...settingsItem.textOverlay,
                                    animation: e.target.value
                                  }
                                })
                              }}
                              className="w-full px-3 py-2 text-xs sm:text-sm border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent touch-manipulation"
                            >
                              {textAnimations.map(anim => (
                                <option key={anim.id} value={anim.id}>
                                  {anim.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Animation Duration */}
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Anim Duration: {settingsItem.textOverlay.animationDuration || 1}s
                            </label>
                            <input
                              type="range"
                              min="0.5"
                              max="5"
                              step="0.5"
                              value={settingsItem.textOverlay.animationDuration || 1}
                              onChange={(e) => {
                                setSettingsItem({
                                  ...settingsItem,
                                  textOverlay: {
                                    ...settingsItem.textOverlay,
                                    animationDuration: parseFloat(e.target.value)
                                  }
                                })
                              }}
                              className="w-full h-2 touch-manipulation"
                            />
                          </div>

                          {/* Text Color */}
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 pt-0.5">
                              Text Color
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={settingsItem.textOverlay.color || '#ffffff'}
                                onFocus={(e) => {
                                  e.preventDefault()
                                  setColorPickerType('text')
                                  // Store which item's textOverlay we're editing
                                  setShowColorPicker(true)
                                }}
                                onClick={(e) => {
                                  e.preventDefault()
                                  setColorPickerType('text')
                                  setShowColorPicker(true)
                                }}
                                onChange={(e) => {
                                  setSettingsItem({
                                    ...settingsItem,
                                    textOverlay: {
                                      ...settingsItem.textOverlay,
                                      color: e.target.value
                                    }
                                  })
                                }}
                                placeholder="#ffffff"
                                className="w-full pl-9 pr-2 py-2 text-xs sm:text-sm border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                                readOnly
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  setColorPickerType('text')
                                  setShowColorPicker(true)
                                }}
                                className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-gray-400 dark:border-gray-500 cursor-pointer touch-manipulation shadow-sm z-10"
                                style={{ backgroundColor: settingsItem.textOverlay.color || '#ffffff' }}
                                title="Click to change color"
                              />
                            </div>
                          </div>

                          {/* Background Color */}
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 pt-0.5">
                              Background
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={settingsItem.textOverlay.backgroundColor === 'transparent' ? '' : (settingsItem.textOverlay.backgroundColor || '')}
                                onFocus={(e) => {
                                  e.preventDefault()
                                  setColorPickerType('background')
                                  setShowColorPicker(true)
                                }}
                                onClick={(e) => {
                                  e.preventDefault()
                                  setColorPickerType('background')
                                  setShowColorPicker(true)
                                }}
                                onChange={(e) => {
                                  setSettingsItem({
                                    ...settingsItem,
                                    textOverlay: {
                                      ...settingsItem.textOverlay,
                                      backgroundColor: e.target.value || 'transparent'
                                    }
                                  })
                                }}
                                placeholder="transparent"
                                className="w-full pl-9 pr-2 py-2 text-xs sm:text-sm border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                                readOnly
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  setColorPickerType('background')
                                  setShowColorPicker(true)
                                }}
                                className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-gray-400 dark:border-gray-500 cursor-pointer touch-manipulation shadow-sm z-10"
                                style={{ 
                                  backgroundColor: settingsItem.textOverlay.backgroundColor === 'transparent' ? 'transparent' : (settingsItem.textOverlay.backgroundColor || 'transparent')
                                }}
                                title="Click to change color"
                              >
                                {settingsItem.textOverlay.backgroundColor === 'transparent' && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">/</span>
                                  </div>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Full Width Toggle */}
                          <div className="col-span-2">
                            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
                              <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Width
                              </label>
                              <button
                                onClick={() => {
                                  setSettingsItem({
                                    ...settingsItem,
                                    textOverlay: {
                                      ...settingsItem.textOverlay,
                                      fullWidth: !settingsItem.textOverlay.fullWidth
                                    }
                                  })
                                }}
                                className={`relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
                                  settingsItem.textOverlay.fullWidth ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${
                                    settingsItem.textOverlay.fullWidth ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          {/* Position Controls - Show different based on fullWidth */}
                          {settingsItem.textOverlay.fullWidth ? (
                            <>
                              {/* Text Alignment (only for full width) */}
                              <div className="col-span-2">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Text Alignment
                                </label>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      setSettingsItem({
                                        ...settingsItem,
                                        textOverlay: {
                                          ...settingsItem.textOverlay,
                                          textAlign: 'left'
                                        }
                                      })
                                    }}
                                    className={`flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl font-medium transition-colors touch-manipulation ${
                                      settingsItem.textOverlay.textAlign === 'left'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                  >
                                    Left
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSettingsItem({
                                        ...settingsItem,
                                        textOverlay: {
                                          ...settingsItem.textOverlay,
                                          textAlign: 'center'
                                        }
                                      })
                                    }}
                                    className={`flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl font-medium transition-colors touch-manipulation ${
                                      settingsItem.textOverlay.textAlign === 'center'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                  >
                                    Center
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSettingsItem({
                                        ...settingsItem,
                                        textOverlay: {
                                          ...settingsItem.textOverlay,
                                          textAlign: 'right'
                                        }
                                      })
                                    }}
                                    className={`flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl font-medium transition-colors touch-manipulation ${
                                      settingsItem.textOverlay.textAlign === 'right'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                  >
                                    Right
                                  </button>
                                </div>
                              </div>
                              {/* Padding (only for full width) */}
                              <div className="col-span-2">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Padding: {settingsItem.textOverlay.padding || 20}px
                                </label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="5"
                                  value={settingsItem.textOverlay.padding || 20}
                                  onChange={(e) => {
                                    setSettingsItem({
                                      ...settingsItem,
                                      textOverlay: {
                                        ...settingsItem.textOverlay,
                                        padding: parseInt(e.target.value)
                                      }
                                    })
                                  }}
                                  className="w-full h-2 touch-manipulation"
                                />
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  <span>0px</span>
                                  <span>100px</span>
                                </div>
                              </div>
                              {/* Vertical Position (only for full width) */}
                              <div className="col-span-2">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Vertical Position: {settingsItem.textOverlay.y || 50}%
                                </label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="1"
                                  value={settingsItem.textOverlay.y || 50}
                                  onChange={(e) => {
                                    setSettingsItem({
                                      ...settingsItem,
                                      textOverlay: {
                                        ...settingsItem.textOverlay,
                                        y: parseInt(e.target.value)
                                      }
                                    })
                                  }}
                                  className="w-full h-2 touch-manipulation"
                                />
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  <span>Top (0%)</span>
                                  <span>Bottom (100%)</span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* Horizontal Position */}
                              <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  X: {settingsItem.textOverlay.x || 50}%
                                </label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="1"
                                  value={settingsItem.textOverlay.x || 50}
                                  onChange={(e) => {
                                    setSettingsItem({
                                      ...settingsItem,
                                      textOverlay: {
                                        ...settingsItem.textOverlay,
                                        x: parseInt(e.target.value)
                                      }
                                    })
                                  }}
                                  className="w-full h-2 touch-manipulation"
                                />
                              </div>

                              {/* Vertical Position */}
                              <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Y: {settingsItem.textOverlay.y || 50}%
                                </label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="1"
                                  value={settingsItem.textOverlay.y || 50}
                                  onChange={(e) => {
                                    setSettingsItem({
                                      ...settingsItem,
                                      textOverlay: {
                                        ...settingsItem.textOverlay,
                                        y: parseInt(e.target.value)
                                      }
                                    })
                                  }}
                                  className="w-full h-2 touch-manipulation"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {/* Preview Canvas */}
                      {settingsItem.textOverlay?.text && settingsItem.textOverlay.text.trim() && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-1.5 mt-3">
                          <h3 className="text-xs font-semibold text-gray-800 dark:text-white mb-1">
                            Preview ({getCurrentResolution().width} × {getCurrentResolution().height})
                          </h3>
                          <div className="flex justify-center items-center bg-black rounded-xl p-4 overflow-hidden w-full">
                            <canvas
                              ref={settingsPreviewCanvasRef}
                              className="border border-gray-300 dark:border-gray-600 rounded-xl"
                              style={{ 
                                maxWidth: '100%', 
                                maxHeight: '100%',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain'
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleSettingsSave}
                    disabled={settingsItem?.textOverlay?.visible && (!settingsItem.textOverlay?.text || !settingsItem.textOverlay.text.trim())}
                    className="w-full bg-purple-600 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold text-base sm:text-lg hover:bg-purple-700 active:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors touch-manipulation"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}

export default ImageToVideo
