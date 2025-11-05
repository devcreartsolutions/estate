/**
 * Video Generator Service
 * Converts images to videos with effects, animations, and text overlays
 */

/**
 * Apply animation effect to the image
 */
export function applyEffect(ctx, img, progress, effect, width, height) {
  ctx.save()
  
  const imgAspect = img.width / img.height
  const canvasAspect = width / height
  let drawWidth, drawHeight, drawX, drawY

  switch (effect) {
    case 'zoom':
      // Zoom in effect
      const zoomScale = 1 + (progress * 0.5) // Zoom from 1x to 1.5x
      drawWidth = width * zoomScale
      drawHeight = height * zoomScale
      drawX = (width - drawWidth) / 2
      drawY = (height - drawHeight) / 2
      break

    case 'zoomOut':
      // Zoom out effect
      const zoomOutScale = 1.5 - (progress * 0.5) // Zoom from 1.5x to 1x
      drawWidth = width * zoomOutScale
      drawHeight = height * zoomOutScale
      drawX = (width - drawWidth) / 2
      drawY = (height - drawHeight) / 2
      break

    case 'panLeft':
      // Pan from right to left
      // Scale image larger than canvas (1.3x) to allow panning
      const panLeftScale = 1.3
      // Calculate scaled dimensions maintaining aspect ratio
      let panLeftScaledWidth = width * panLeftScale
      let panLeftScaledHeight = height * panLeftScale
      
      // Maintain image aspect ratio
      const panLeftImgAspect = img.width / img.height
      const panLeftCanvasAspect = width / height
      
      if (panLeftImgAspect > panLeftCanvasAspect) {
        // Image is wider - fit to height
        panLeftScaledHeight = height * panLeftScale
        panLeftScaledWidth = panLeftScaledHeight * panLeftImgAspect
      } else {
        // Image is taller - fit to width
        panLeftScaledWidth = width * panLeftScale
        panLeftScaledHeight = panLeftScaledWidth / panLeftImgAspect
      }
      
      // Calculate pan offset (from right to left)
      const panLeftMaxOffset = panLeftScaledWidth - width
      const panLeftOffset = panLeftMaxOffset * (1 - progress)
      
      drawWidth = panLeftScaledWidth
      drawHeight = panLeftScaledHeight
      drawX = -panLeftOffset
      drawY = (height - panLeftScaledHeight) / 2
      break

    case 'panRight':
      // Pan from left to right
      const panRightScale = 1.3
      let panRightScaledWidth = width * panRightScale
      let panRightScaledHeight = height * panRightScale
      
      const panRightImgAspect = img.width / img.height
      const panRightCanvasAspect = width / height
      
      if (panRightImgAspect > panRightCanvasAspect) {
        panRightScaledHeight = height * panRightScale
        panRightScaledWidth = panRightScaledHeight * panRightImgAspect
      } else {
        panRightScaledWidth = width * panRightScale
        panRightScaledHeight = panRightScaledWidth / panRightImgAspect
      }
      
      const panRightMaxOffset = panRightScaledWidth - width
      const panRightOffset = panRightMaxOffset * progress
      
      drawWidth = panRightScaledWidth
      drawHeight = panRightScaledHeight
      drawX = -panRightOffset
      drawY = (height - panRightScaledHeight) / 2
      break

    case 'panUp':
      // Pan from bottom to top
      const panUpScale = 1.3
      let panUpScaledWidth = width * panUpScale
      let panUpScaledHeight = height * panUpScale
      
      const panUpImgAspect = img.width / img.height
      const panUpCanvasAspect = width / height
      
      if (panUpImgAspect > panUpCanvasAspect) {
        panUpScaledHeight = height * panUpScale
        panUpScaledWidth = panUpScaledHeight * panUpImgAspect
      } else {
        panUpScaledWidth = width * panUpScale
        panUpScaledHeight = panUpScaledWidth / panUpImgAspect
      }
      
      const panUpMaxOffset = panUpScaledHeight - height
      const panUpOffset = panUpMaxOffset * (1 - progress)
      
      drawWidth = panUpScaledWidth
      drawHeight = panUpScaledHeight
      drawX = (width - panUpScaledWidth) / 2
      drawY = -panUpOffset
      break

    case 'panDown':
      // Pan from top to bottom
      const panDownScale = 1.3
      let panDownScaledWidth = width * panDownScale
      let panDownScaledHeight = height * panDownScale
      
      const panDownImgAspect = img.width / img.height
      const panDownCanvasAspect = width / height
      
      if (panDownImgAspect > panDownCanvasAspect) {
        panDownScaledHeight = height * panDownScale
        panDownScaledWidth = panDownScaledHeight * panDownImgAspect
      } else {
        panDownScaledWidth = width * panDownScale
        panDownScaledHeight = panDownScaledWidth / panDownImgAspect
      }
      
      const panDownMaxOffset = panDownScaledHeight - height
      const panDownOffset = panDownMaxOffset * progress
      
      drawWidth = panDownScaledWidth
      drawHeight = panDownScaledHeight
      drawX = (width - panDownScaledWidth) / 2
      drawY = -panDownOffset
      break

    case 'fade':
      // Fade in effect
      ctx.globalAlpha = progress
      drawWidth = width
      drawHeight = height
      drawX = 0
      drawY = 0
      break

    case 'rotate':
      // Rotate 360 degrees
      const rotation = progress * 2 * Math.PI
      ctx.translate(width / 2, height / 2)
      ctx.rotate(rotation)
      drawWidth = width * 1.2
      drawHeight = height * 1.2
      drawX = -drawWidth / 2
      drawY = -drawHeight / 2
      break

    case 'kenBurns':
      // Ken Burns effect (combined zoom and pan)
      const kenBurnsScale = 1 + (progress * 0.4)
      const kenBurnsPanX = (width * 0.15) * progress
      const kenBurnsPanY = (height * 0.15) * progress
      drawWidth = width * kenBurnsScale
      drawHeight = height * kenBurnsScale
      drawX = kenBurnsPanX - (width * 0.2)
      drawY = kenBurnsPanY - (height * 0.2)
      break

    case 'static':
    default:
      // No animation
      drawWidth = width
      drawHeight = height
      drawX = 0
      drawY = 0
      break
  }

  // Maintain aspect ratio - no stretching/squishing
  // For pan effects, aspect ratio is already handled in the switch case
  // For other effects, calculate the dimensions maintaining original aspect ratio
  let finalDrawWidth = drawWidth
  let finalDrawHeight = drawHeight
  let finalDrawX = drawX
  let finalDrawY = drawY

  // Skip aspect ratio correction for pan effects as they already handle it
  const panEffects = ['panLeft', 'panRight', 'panUp', 'panDown']
  
  if (!panEffects.includes(effect)) {
    // Ensure we maintain image aspect ratio - fit image to canvas without cropping
    const imageAspectRatio = img.width / img.height
    const canvasAspectRatio = width / height
    
    // Calculate dimensions to fit image within canvas (letterbox/pillarbox)
    if (imageAspectRatio > canvasAspectRatio) {
      // Image is wider than canvas - fit to width, center vertically
      finalDrawWidth = drawWidth
      finalDrawHeight = drawWidth / imageAspectRatio
      finalDrawX = drawX
      finalDrawY = drawY + (drawHeight - finalDrawHeight) / 2
    } else {
      // Image is taller than canvas - fit to height, center horizontally
      finalDrawHeight = drawHeight
      finalDrawWidth = drawHeight * imageAspectRatio
      finalDrawX = drawX + (drawWidth - finalDrawWidth) / 2
      finalDrawY = drawY
    }
  }

  // Fill background with black before drawing (for letterboxing/pillarboxing)
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, width, height)
  
  // Draw image maintaining aspect ratio (letterbox/pillarbox if needed)
  ctx.drawImage(img, finalDrawX, finalDrawY, finalDrawWidth, finalDrawHeight)
  ctx.restore()
}

/**
 * Apply text animation
 */
export function applyTextAnimation(ctx, textOverlay, progress, width, height, itemDuration = 3) {
  const { text, x, y, fontSize, color, backgroundColor, animation, opacity = 100, animationDuration = 1, fullWidth = false, padding = 20, textAlign = 'left', verticalPosition = 'custom' } = textOverlay
  
  if (!text) return

  ctx.save()
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = color
  
  let textX, textY, textWidth, textHeight, metrics
  
  if (fullWidth) {
    // Full width mode: text spans full width with padding
    const textAlignment = textAlign || 'left'
    ctx.textAlign = textAlignment
    ctx.textBaseline = 'top'
    
    const textPadding = padding || 20
    const maxTextWidth = width - (textPadding * 2)
    
    // Measure text for wrapping (if needed)
    metrics = ctx.measureText(text)
    textWidth = Math.min(metrics.width, maxTextWidth)
    textHeight = fontSize
    
    // Get verticalPosition from textOverlay (if available)
    const verticalPosition = textOverlay.verticalPosition || 'custom'
    
    // Calculate Y position based on verticalPosition setting
    if (verticalPosition === 'top') {
      textY = textPadding
    } else if (verticalPosition === 'bottom') {
      // Position from bottom: canvas height - text height - padding
      textY = height - textHeight - textPadding
    } else {
      // Custom: use percentage but ensure it doesn't go out of bounds
      const calculatedY = (height * y) / 100
      // Ensure text doesn't go above canvas (minimum is padding)
      // Ensure text doesn't go below canvas (maximum is height - textHeight - padding)
      textY = Math.max(textPadding, Math.min(calculatedY, height - textHeight - textPadding))
    }
    
    // Calculate text X position based on alignment
    if (textAlignment === 'center') {
      textX = width / 2
    } else if (textAlignment === 'right') {
      textX = width - textPadding
    } else {
      textX = textPadding
    }
  } else {
    // Normal mode: centered text at specific position
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // Measure text first to calculate bounds
    metrics = ctx.measureText(text)
    textWidth = metrics.width
    textHeight = fontSize
    const bgPadding = 10
    
    // Calculate desired position
    let desiredX = (width * x) / 100
    let desiredY = (height * y) / 100
    
    // Adjust X position to prevent clipping (text is centered)
    // Ensure text doesn't go beyond left edge (0)
    const minX = textWidth / 2 + bgPadding
    // Ensure text doesn't go beyond right edge (width)
    const maxX = width - textWidth / 2 - bgPadding
    textX = Math.max(minX, Math.min(maxX, desiredX))
    
    // Adjust Y position to prevent clipping (text is middle-aligned)
    // Ensure text doesn't go beyond top edge (0)
    const minY = textHeight / 2 + bgPadding
    // Ensure text doesn't go beyond bottom edge (height)
    const maxY = height - textHeight / 2 - bgPadding
    textY = Math.max(minY, Math.min(maxY, desiredY))
  }

  // Calculate animation progress based on animationDuration
  // Animation completes over the specified duration, then stays visible
  const animationProgress = Math.min(1, progress * (itemDuration / animationDuration))
  
  // Calculate animation values
  let finalX = textX
  let finalY = textY
  let animationOpacity = 1
  let finalScale = 1

  switch (animation) {
    case 'fade':
      animationOpacity = Math.min(1, animationProgress * 3) // Fade in over first third
      break

    case 'slideUp':
      finalY = textY + (height * 0.2) * (1 - animationProgress)
      animationOpacity = Math.min(1, animationProgress * 2)
      break

    case 'slideDown':
      finalY = textY - (height * 0.2) * (1 - animationProgress)
      animationOpacity = Math.min(1, animationProgress * 2)
      break

    case 'slideLeft':
      if (!fullWidth) {
        finalX = textX + (width * 0.2) * (1 - animationProgress)
      }
      animationOpacity = Math.min(1, animationProgress * 2)
      break

    case 'slideRight':
      if (!fullWidth) {
        finalX = textX - (width * 0.2) * (1 - animationProgress)
      }
      animationOpacity = Math.min(1, animationProgress * 2)
      break

    case 'scale':
      finalScale = Math.min(1, animationProgress * 2)
      if (animationProgress > 0.5) {
        finalScale = 1 - ((animationProgress - 0.5) * 0.2) // Slight bounce
      }
      break

    case 'bounce':
      const bouncePhase = animationProgress * Math.PI * 2
      finalScale = 1 + Math.sin(bouncePhase) * 0.1
      animationOpacity = Math.min(1, animationProgress * 2)
      break

    case 'none':
    default:
      animationOpacity = 1
      break
  }

  // Combine base opacity with animation opacity
  const finalOpacity = ((opacity || 100) / 100) * animationOpacity
  
  // Apply transforms for animation
  ctx.translate(finalX, finalY)
  ctx.scale(finalScale, finalScale)
  ctx.translate(-finalX, -finalY)
  
  // Draw background with animation (if specified)
  if (backgroundColor && backgroundColor !== 'transparent') {
    ctx.globalAlpha = finalOpacity
    ctx.fillStyle = backgroundColor
    
    if (fullWidth) {
      // Full width background - use finalY (animated position)
      const textPadding = padding || 20
      const bgHeight = textHeight + (textPadding * 2)
      // Background Y position is based on finalY (which includes animation)
      const bgY = finalY - textPadding
      const clampedBgY = Math.max(0, bgY)
      const clampedBgHeight = Math.min(bgHeight, height - clampedBgY)
      
      ctx.fillRect(0, clampedBgY, width, clampedBgHeight)
    } else {
      // Normal mode background - use finalX and finalY (animated positions)
      const bgPadding = 10
      ctx.fillRect(
        finalX - textWidth / 2 - bgPadding,
        finalY - textHeight / 2 - bgPadding,
        textWidth + bgPadding * 2,
        textHeight + bgPadding * 2
      )
    }
  }
  
  // Draw text with stroke and fill
  ctx.globalAlpha = finalOpacity
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)'
  ctx.lineWidth = 2
  ctx.lineJoin = 'round'
  ctx.fillStyle = color
  
  if (!fullWidth) {
    // Normal mode: text at finalX, finalY
    ctx.strokeText(text, finalX, finalY)
    ctx.fillText(text, finalX, finalY)
  } else {
    // Full width mode: text at textX, finalY (using finalY for vertical position animation)
    ctx.strokeText(text, textX, finalY)
    ctx.fillText(text, textX, finalY)
  }

  ctx.restore()
}

/**
 * Load video element
 */
function loadVideoElement(videoUrl) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.crossOrigin = 'anonymous'
    video.src = videoUrl
    video.preload = 'auto'
    video.muted = true
    video.playsInline = true

    video.onloadedmetadata = () => {
      resolve(video)
    }

    video.onerror = () => {
      reject(new Error('Failed to load video'))
    }

    video.load()
  })
}

/**
 * Generate video from multiple media items (images and videos)
 */
export async function generateVideoFromMultiple(options) {
      const {
        mediaItems,
        fps = 30,
        textOverlay = null, // Global text overlay from Step 3
        canvasRef,
        width = 1920,
        height = 1080,
        transitionDuration = 0.5,
        onProgress = null
      } = options

  return new Promise(async (resolve, reject) => {
    try {
      // Load all images
      const loadedImages = []
      const loadedVideos = []
      
      for (const item of mediaItems) {
        if (item.type === 'image') {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          await new Promise((imgResolve, imgReject) => {
            img.onload = () => imgResolve()
            img.onerror = () => imgReject(new Error(`Failed to load image: ${item.file.name}`))
            img.src = item.url
          })
          loadedImages.push({ ...item, img })
        } else if (item.type === 'video') {
          const video = await loadVideoElement(item.url)
          loadedVideos.push({ ...item, video })
        }
      }

      const canvas = canvasRef?.current || document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = width
      canvas.height = height

      // Check MediaRecorder support
      if (typeof MediaRecorder === 'undefined') {
        reject(new Error('MediaRecorder is not supported in this browser'))
        return
      }

      // Determine supported mime type - prefer MP4/H.264 for Instagram compatibility
      let mimeType = 'video/mp4;codecs=h264'
      if (MediaRecorder.isTypeSupported && !MediaRecorder.isTypeSupported(mimeType)) {
        // Try MP4 with H.264 (AVC1)
        mimeType = 'video/mp4;codecs=avc1'
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          // Fallback to WebM formats
          mimeType = 'video/webm;codecs=vp9'
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = 'video/webm;codecs=vp8'
            if (!MediaRecorder.isTypeSupported(mimeType)) {
              mimeType = 'video/webm'
              if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = '' // Will try default
              }
            }
          }
        }
      }

      // Prepare MediaRecorder
      const stream = canvas.captureStream(fps)
      const chunks = []
      const recorderOptions = {
        videoBitsPerSecond: 2500000 // 2.5 Mbps
      }
      if (mimeType) {
        recorderOptions.mimeType = mimeType
      }
      const mediaRecorder = new MediaRecorder(stream, recorderOptions)

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const finalMimeType = mimeType || mediaRecorder.mimeType || 'video/webm'
        const blob = new Blob(chunks, { type: finalMimeType })
        resolve(blob)
      }

      mediaRecorder.onerror = (event) => {
        reject(new Error('MediaRecorder error: ' + event.error))
      }

      // Calculate total duration
      let totalDuration = 0
      let itemStartTimes = []
      let currentTime = 0

      mediaItems.forEach((item, index) => {
        itemStartTimes.push(currentTime)
        if (item.type === 'image') {
          totalDuration += item.duration || 3
          currentTime += item.duration || 3
        } else if (item.type === 'video') {
          totalDuration += item.video?.duration || 5
          currentTime += item.video?.duration || 5
        }
      })

      // Calculate when text animation should start (if it should animate only once)
      // Animation will start at the beginning and complete over animationDuration

      // Start recording
      mediaRecorder.start(100)

      const totalFrames = Math.ceil(totalDuration * fps)
      const frameDelay = 1000 / fps
      let currentFrame = 0
      let currentTimeInVideo = 0

      const renderFrame = () => {
        // Find current item based on time
        let currentItemIndex = -1
        for (let i = 0; i < mediaItems.length; i++) {
          const item = mediaItems[i]
          let itemDuration = item.type === 'image' ? (item.duration || 3) : (item.video?.duration || 5)
          
          if (currentTimeInVideo >= itemStartTimes[i] && currentTimeInVideo < itemStartTimes[i] + itemDuration) {
            currentItemIndex = i
            break
          }
        }

        // Clear canvas
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, width, height)

        if (currentItemIndex >= 0) {
          const currentItem = mediaItems[currentItemIndex]
          const itemStart = itemStartTimes[currentItemIndex]
          const itemDuration = currentItem.type === 'image' 
            ? (currentItem.duration || 3) 
            : (currentItem.video?.duration || 5)
          
          const itemProgress = (currentTimeInVideo - itemStart) / itemDuration
          
          if (currentItem.type === 'image') {
            const loadedItem = loadedImages.find(li => li.id === currentItem.id)
            if (loadedItem && loadedItem.img) {
              applyEffect(ctx, loadedItem.img, itemProgress, currentItem.effect || 'static', width, height)
            }
          } else if (currentItem.type === 'video') {
            const loadedItem = loadedVideos.find(lv => lv.id === currentItem.id)
            if (loadedItem && loadedItem.video) {
              const video = loadedItem.video
              const videoTime = Math.min((currentTimeInVideo - itemStart), video.duration)
              
              // Seek video if needed (only if time difference is significant)
              if (Math.abs(video.currentTime - videoTime) > 0.1) {
                video.currentTime = videoTime
              }
              
              // Draw video frame - wait a bit for seek if needed
              if (video.readyState >= video.HAVE_CURRENT_DATA) {
                ctx.save()
                const imgAspect = video.videoWidth / video.videoHeight
                const canvasAspect = width / height
                let drawWidth, drawHeight, drawX, drawY
                
                if (imgAspect > canvasAspect) {
                  drawHeight = height
                  drawWidth = height * imgAspect
                  drawX = (width - drawWidth) / 2
                  drawY = 0
                } else {
                  drawWidth = width
                  drawHeight = width / imgAspect
                  drawX = 0
                  drawY = (height - drawHeight) / 2
                }
                
                ctx.drawImage(video, drawX, drawY, drawWidth, drawHeight)
                ctx.restore()
              }
            }
          }

          // Apply text overlays (both global and per-item)
          // First apply global text overlay (from Step 3) - applies to entire video
          if (textOverlay && textOverlay.text && textOverlay.visible && textOverlay.text.trim()) {
            // Calculate progress based on total video time (0 to 1 over entire video)
            const totalVideoProgress = Math.min(currentTimeInVideo / totalDuration, 1)
            // Animation should complete within the animationDuration from video start
            const animationProgress = Math.min(currentTimeInVideo / (textOverlay.animationDuration || 1), 1)
            const finalProgress = Math.min(totalVideoProgress, animationProgress)
            applyTextAnimation(ctx, textOverlay, finalProgress, width, height, textOverlay.animationDuration || 1)
          }
          
          // Then apply per-item text overlay (if enabled) - applies only to this specific item
          const itemTextOverlay = currentItem.textOverlay
          if (itemTextOverlay && itemTextOverlay.visible && itemTextOverlay.text && itemTextOverlay.text.trim()) {
            // Calculate progress for this specific item (0 to 1 over item duration)
            const itemProgress = (currentTimeInVideo - itemStart) / itemDuration
            // Animation should complete within the animationDuration from item start
            const animationProgress = Math.min(itemProgress * (itemDuration / (itemTextOverlay.animationDuration || 1)), 1)
            applyTextAnimation(ctx, itemTextOverlay, animationProgress, width, height, itemTextOverlay.animationDuration || 1)
          }
        }

        currentFrame++
        currentTimeInVideo = currentFrame / fps

        // Update progress
        if (onProgress && totalFrames > 0) {
          const progress = Math.min(currentFrame / totalFrames, 1)
          onProgress(progress)
        }

        if (currentFrame < totalFrames) {
          setTimeout(renderFrame, frameDelay)
        } else {
          setTimeout(() => {
            mediaRecorder.stop()
            stream.getTracks().forEach(track => track.stop())
          }, 200)
        }
      }

      // Start rendering after a short delay
      setTimeout(renderFrame, 100)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Generate video from image (legacy function for backward compatibility)
 */
export async function generateVideo(options) {
  const {
    imageUrl,
    effect = 'static',
    duration = 5,
    fps = 30,
    textOverlay = null,
    canvasRef,
    width = 1920,
    height = 1080
  } = options

  // Convert single image to mediaItems format
  return generateVideoFromMultiple({
    mediaItems: [{
      id: Date.now(),
      type: 'image',
      url: imageUrl,
      effect,
      duration
    }],
    fps,
    textOverlay,
    canvasRef,
    width,
    height,
    transitionDuration: 0
  })
}
