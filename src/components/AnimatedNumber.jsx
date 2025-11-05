import { useState, useEffect, useRef } from 'react'

function AnimatedNumber({ value, duration = 2000, suffix = '', prefix = '', decimals = 0, className = '' }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const numericValue = parseFloat(value)
    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (numericValue - startValue) * easeOutQuart

      if (decimals === 0) {
        setDisplayValue(Math.floor(currentValue))
      } else {
        setDisplayValue(parseFloat(currentValue.toFixed(decimals)))
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(numericValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, value, duration, decimals])

  // Handle percentage values
  if (typeof value === 'string' && value.includes('%')) {
    const numValue = parseFloat(value.replace('%', ''))
    return (
      <span ref={elementRef} className={className}>
        {prefix}{decimals === 0 ? Math.floor(displayValue) : displayValue.toFixed(decimals)}%{suffix}
      </span>
    )
  }

  // Handle values with + sign
  if (typeof value === 'string' && value.includes('+')) {
    const numValue = parseFloat(value.replace('+', ''))
    return (
      <span ref={elementRef} className={className}>
        {prefix}{decimals === 0 ? Math.floor(displayValue) : displayValue.toFixed(decimals)}+{suffix}
      </span>
    )
  }

  // Regular numeric values
  return (
    <span ref={elementRef} className={className}>
      {prefix}{decimals === 0 ? Math.floor(displayValue) : displayValue.toFixed(decimals)}{suffix}
    </span>
  )
}

export default AnimatedNumber


