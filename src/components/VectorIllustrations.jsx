// Vector Illustrations Component for Real Estate Website
import React from 'react'

// Home Icon SVG
export const HomeIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 20L20 80L30 90V170H80V120H120V170H170V90L180 80L100 20Z" fill="currentColor" opacity="0.1"/>
    <path d="M100 30L30 85V165H75V115H125V165H170V85L100 30Z" stroke="currentColor" strokeWidth="3" fill="none"/>
    <path d="M100 30L30 85M100 30L170 85M100 30V80" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

// Search Icon SVG
export const SearchIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="90" cy="90" r="50" stroke="currentColor" strokeWidth="4" fill="none"/>
    <path d="M130 130L170 170" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
  </svg>
)

// Key Icon SVG
export const KeyIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M120 80C120 93.2548 109.255 104 96 104C82.7452 104 72 93.2548 72 80C72 66.7452 82.7452 56 96 56C109.255 56 120 66.7452 120 80Z" fill="currentColor" opacity="0.2"/>
    <path d="M120 80C120 93.2548 109.255 104 96 104C82.7452 104 72 93.2548 72 80C72 66.7452 82.7452 56 96 56C109.255 56 120 66.7452 120 80Z" stroke="currentColor" strokeWidth="3"/>
    <path d="M96 80V40L40 40V60L60 60V80" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
)

// Chart Icon SVG
export const ChartIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="140" width="30" height="40" fill="currentColor" opacity="0.3"/>
    <rect x="85" y="100" width="30" height="80" fill="currentColor" opacity="0.3"/>
    <rect x="130" y="60" width="30" height="120" fill="currentColor" opacity="0.3"/>
    <path d="M40 140H70M85 100H115M130 60H160" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
  </svg>
)

// Map Pin Icon SVG
export const MapPinIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="80" r="40" fill="currentColor" opacity="0.1"/>
    <path d="M100 30C70.5 30 46 54.5 46 84C46 120 100 160 100 160C100 160 154 120 154 84C154 54.5 129.5 30 100 30Z" fill="currentColor" opacity="0.2"/>
    <path d="M100 30C70.5 30 46 54.5 46 84C46 120 100 160 100 160C100 160 154 120 154 84C154 54.5 129.5 30 100 30Z" stroke="currentColor" strokeWidth="3"/>
    <circle cx="100" cy="80" r="25" fill="currentColor"/>
  </svg>
)

// House Search Icon SVG
export const HouseSearchIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M80 60L40 90V150H70V110H90V150H120V90L80 60Z" fill="currentColor" opacity="0.1"/>
    <path d="M80 60L40 90V150H70V110H90V150H120V90L80 60Z" stroke="currentColor" strokeWidth="3"/>
    <circle cx="145" cy="135" r="20" stroke="currentColor" strokeWidth="3" fill="none"/>
    <path d="M155 145L170 160" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
)

// Trending Up Icon SVG
export const TrendingUpIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 140L80 100L120 120L160 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="40" cy="140" r="8" fill="currentColor"/>
    <circle cx="160" cy="60" r="8" fill="currentColor"/>
    <path d="M150 50L160 60L170 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Money Icon SVG
export const MoneyIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="50" y="60" width="100" height="80" rx="10" fill="currentColor" opacity="0.1"/>
    <rect x="50" y="60" width="100" height="80" rx="10" stroke="currentColor" strokeWidth="3"/>
    <circle cx="100" cy="100" r="25" fill="currentColor" opacity="0.2"/>
    <circle cx="100" cy="100" r="25" stroke="currentColor" strokeWidth="3"/>
    <text x="100" y="110" textAnchor="middle" fontSize="20" fill="currentColor" fontWeight="bold">$</text>
  </svg>
)

// Shield Icon SVG
export const ShieldIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 40L50 60V100C50 130 70 160 100 170C130 160 150 130 150 100V60L100 40Z" fill="currentColor" opacity="0.1"/>
    <path d="M100 40L50 60V100C50 130 70 160 100 170C130 160 150 130 150 100V60L100 40Z" stroke="currentColor" strokeWidth="3"/>
    <path d="M85 105L75 95L70 100L85 115L130 70L125 65L85 105Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// People Icon SVG
export const PeopleIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="70" cy="70" r="30" fill="currentColor" opacity="0.2"/>
    <circle cx="70" cy="70" r="30" stroke="currentColor" strokeWidth="3"/>
    <path d="M30 130C30 110 50 95 70 95C90 95 110 110 110 130" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="130" cy="70" r="30" fill="currentColor" opacity="0.2"/>
    <circle cx="130" cy="70" r="30" stroke="currentColor" strokeWidth="3"/>
    <path d="M90 130C90 110 110 95 130 95C150 95 170 110 170 130" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
)

// Star Icon SVG (for ratings)
export const StarIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 30L120 80L170 80L130 110L145 160L100 130L55 160L70 110L30 80L80 80L100 30Z" fill="currentColor" opacity="0.2"/>
    <path d="M100 30L120 80L170 80L130 110L145 160L100 130L55 160L70 110L30 80L80 80L100 30Z" stroke="currentColor" strokeWidth="3"/>
  </svg>
)

// Decorative Line Vectors
export const WavyLine = ({ className = "w-full h-1", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 400 4" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M0,2 Q100,0 200,2 T400,2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export const DiagonalLines = ({ className = "w-full h-full", color = "currentColor", opacity = 0.1 }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="0" x2="200" y2="200" stroke={color} strokeWidth="1" opacity={opacity}/>
    <line x1="0" y1="50" x2="200" y2="250" stroke={color} strokeWidth="1" opacity={opacity}/>
    <line x1="0" y1="100" x2="200" y2="300" stroke={color} strokeWidth="1" opacity={opacity}/>
    <line x1="0" y1="150" x2="200" y2="350" stroke={color} strokeWidth="1" opacity={opacity}/>
  </svg>
)

export const GridLines = ({ className = "w-full h-full", color = "currentColor", opacity = 0.1 }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="0" x2="200" y2="0" stroke={color} strokeWidth="1" opacity={opacity}/>
    <line x1="0" y1="50" x2="200" y2="50" stroke={color} strokeWidth="1" opacity={opacity}/>
    <line x1="0" y1="100" x2="200" y2="100" stroke={color} strokeWidth="1" opacity={opacity}/>
    <line x1="0" y1="150" x2="200" y2="150" stroke={color} strokeWidth="1" opacity={opacity}/>
    <line x1="0" y1="200" x2="200" y2="200" stroke={color} strokeWidth="1" opacity={opacity}/>
    <line x1="0" y1="0" x2="0" y2="200" stroke={color} strokeWidth="1" opacity={opacity}/>
    <line x1="50" y1="0" x2="50" y2="200" stroke={color} strokeWidth="1" opacity={opacity}/>
    <line x1="100" y1="0" x2="100" y2="200" stroke={color} strokeWidth="1" opacity={opacity}/>
    <line x1="150" y1="0" x2="150" y2="200" stroke={color} strokeWidth="1" opacity={opacity}/>
    <line x1="200" y1="0" x2="200" y2="200" stroke={color} strokeWidth="1" opacity={opacity}/>
  </svg>
)

export const ZigzagLine = ({ className = "w-full h-1", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 400 10" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M0,5 L50,5 L50,0 L100,0 L100,5 L150,5 L150,10 L200,10 L200,5 L250,5 L250,0 L300,0 L300,5 L350,5 L350,10 L400,10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export const CurvedLine = ({ className = "w-full h-1", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 400 20" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M0,10 Q100,0 200,10 T400,10" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
)

export const DottedLine = ({ className = "w-full h-1", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 400 2" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <line x1="0" y1="1" x2="400" y2="1" stroke={color} strokeWidth="2" strokeDasharray="5,5" strokeLinecap="round"/>
  </svg>
)

export const ArrowLine = ({ className = "w-full h-1", color = "currentColor", direction = "right" }) => {
  const path = direction === "right" 
    ? "M0,10 L350,10 L340,0 M350,10 L340,20"
    : direction === "left"
    ? "M400,10 L50,10 L60,0 M50,10 L60,20"
    : "M200,0 L200,350 L210,340 M200,350 L190,340"
  
  return (
    <svg className={className} viewBox="0 0 400 20" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <line x1="0" y1="10" x2={direction === "right" ? "350" : direction === "left" ? "50" : "200"} y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d={path} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

export const DecorativeCircle = ({ className = "w-full h-full", color = "currentColor", opacity = 0.1 }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="2" opacity={opacity}/>
    <circle cx="100" cy="100" r="60" stroke={color} strokeWidth="1" opacity={opacity * 0.7}/>
    <circle cx="100" cy="100" r="40" stroke={color} strokeWidth="1" opacity={opacity * 0.5}/>
    <circle cx="100" cy="100" r="20" stroke={color} strokeWidth="1" opacity={opacity * 0.3}/>
  </svg>
)

export const AbstractShape = ({ className = "w-full h-full", color = "currentColor", opacity = 0.1 }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100,20 L180,60 L180,140 L100,180 L20,140 L20,60 Z" stroke={color} strokeWidth="2" opacity={opacity} fill="none"/>
    <path d="M100,40 L160,70 L160,130 L100,160 L40,130 L40,70 Z" stroke={color} strokeWidth="1.5" opacity={opacity * 0.7} fill="none"/>
    <path d="M100,60 L140,80 L140,120 L100,140 L60,120 L60,80 Z" stroke={color} strokeWidth="1" opacity={opacity * 0.5} fill="none"/>
  </svg>
)

// Real Estate Specific Vectors - Construction & Blueprint Lines
export const BlueprintGrid = ({ className = "w-full h-full", color = "currentColor", opacity = 0.1 }) => (
  <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="blueprint-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="40" y2="0" stroke={color} strokeWidth="0.5" opacity={opacity}/>
        <line x1="0" y1="0" x2="0" y2="40" stroke={color} strokeWidth="0.5" opacity={opacity}/>
      </pattern>
    </defs>
    <rect width="400" height="400" fill="url(#blueprint-grid)"/>
  </svg>
)

export const ConstructionLines = ({ className = "w-full h-full", color = "currentColor", opacity = 0.1 }) => (
  <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Horizontal construction lines */}
    <line x1="0" y1="50" x2="400" y2="50" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
    <line x1="0" y1="100" x2="400" y2="100" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
    <line x1="0" y1="150" x2="400" y2="150" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
    <line x1="0" y1="200" x2="400" y2="200" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
    <line x1="0" y1="250" x2="400" y2="250" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
    <line x1="0" y1="300" x2="400" y2="300" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
    <line x1="0" y1="350" x2="400" y2="350" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
    {/* Vertical construction lines */}
    <line x1="50" y1="0" x2="50" y2="400" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
    <line x1="100" y1="0" x2="100" y2="400" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
    <line x1="150" y1="0" x2="150" y2="400" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
    <line x1="200" y1="0" x2="200" y2="400" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
    <line x1="250" y1="0" x2="250" y2="400" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
    <line x1="300" y1="0" x2="300" y2="400" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
    <line x1="350" y1="0" x2="350" y2="400" stroke={color} strokeWidth="1" strokeDasharray="5,5" opacity={opacity}/>
  </svg>
)

export const BuildingSilhouette = ({ className = "w-full h-full", color = "currentColor", opacity = 0.1 }) => (
  <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Building outline */}
    <rect x="50" y="150" width="80" height="200" stroke={color} strokeWidth="2" opacity={opacity} fill="none"/>
    <rect x="150" y="100" width="80" height="250" stroke={color} strokeWidth="2" opacity={opacity} fill="none"/>
    <rect x="250" y="120" width="80" height="230" stroke={color} strokeWidth="2" opacity={opacity} fill="none"/>
    {/* Windows */}
    <rect x="60" y="170" width="15" height="20" stroke={color} strokeWidth="1" opacity={opacity * 0.7} fill="none"/>
    <rect x="80" y="170" width="15" height="20" stroke={color} strokeWidth="1" opacity={opacity * 0.7} fill="none"/>
    <rect x="100" y="170" width="15" height="20" stroke={color} strokeWidth="1" opacity={opacity * 0.7} fill="none"/>
    <rect x="160" y="120" width="15" height="20" stroke={color} strokeWidth="1" opacity={opacity * 0.7} fill="none"/>
    <rect x="180" y="120" width="15" height="20" stroke={color} strokeWidth="1" opacity={opacity * 0.7} fill="none"/>
    <rect x="200" y="120" width="15" height="20" stroke={color} strokeWidth="1" opacity={opacity * 0.7} fill="none"/>
    <rect x="260" y="140" width="15" height="20" stroke={color} strokeWidth="1" opacity={opacity * 0.7} fill="none"/>
    <rect x="280" y="140" width="15" height="20" stroke={color} strokeWidth="1" opacity={opacity * 0.7} fill="none"/>
    <rect x="300" y="140" width="15" height="20" stroke={color} strokeWidth="1" opacity={opacity * 0.7} fill="none"/>
  </svg>
)

export const HouseOutline = ({ className = "w-full h-full", color = "currentColor", opacity = 0.1 }) => (
  <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* House outline */}
    <path d="M200,50 L100,150 L100,320 L300,320 L300,150 Z" stroke={color} strokeWidth="3" opacity={opacity} fill="none"/>
    {/* Roof */}
    <path d="M200,50 L100,150 L300,150 Z" stroke={color} strokeWidth="3" opacity={opacity} fill="none"/>
    {/* Door */}
    <rect x="175" y="250" width="50" height="70" stroke={color} strokeWidth="2" opacity={opacity * 0.8} fill="none"/>
    {/* Windows */}
    <rect x="120" y="180" width="40" height="40" stroke={color} strokeWidth="2" opacity={opacity * 0.7} fill="none"/>
    <rect x="240" y="180" width="40" height="40" stroke={color} strokeWidth="2" opacity={opacity * 0.7} fill="none"/>
  </svg>
)

export const BlueprintLines = ({ className = "w-full h-1", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 400 20" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <line x1="0" y1="10" x2="400" y2="10" stroke={color} strokeWidth="2" strokeDasharray="8,4" strokeLinecap="round"/>
    <circle cx="20" cy="10" r="2" fill={color} opacity="0.6"/>
    <circle cx="380" cy="10" r="2" fill={color} opacity="0.6"/>
  </svg>
)

export const PropertyBoundary = ({ className = "w-full h-full", color = "currentColor", opacity = 0.1 }) => (
  <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Property boundary lines */}
    <rect x="50" y="50" width="300" height="300" stroke={color} strokeWidth="2" strokeDasharray="10,5" opacity={opacity} fill="none"/>
    {/* Corner markers */}
    <circle cx="50" cy="50" r="4" fill={color} opacity={opacity * 1.5}/>
    <circle cx="350" cy="50" r="4" fill={color} opacity={opacity * 1.5}/>
    <circle cx="50" cy="350" r="4" fill={color} opacity={opacity * 1.5}/>
    <circle cx="350" cy="350" r="4" fill={color} opacity={opacity * 1.5}/>
  </svg>
)

export const RealEstateWavy = ({ className = "w-full h-1", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 400 8" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M0,4 Q50,0 100,4 T200,4 T300,4 T400,4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    {/* Small house icons along the wave */}
    <path d="M50,4 L45,0 L50,4 L55,0" stroke={color} strokeWidth="1.5" opacity="0.6" fill="none"/>
    <path d="M150,4 L145,0 L150,4 L155,0" stroke={color} strokeWidth="1.5" opacity="0.6" fill="none"/>
    <path d="M250,4 L245,0 L250,4 L255,0" stroke={color} strokeWidth="1.5" opacity="0.6" fill="none"/>
    <path d="M350,4 L345,0 L350,4 L355,0" stroke={color} strokeWidth="1.5" opacity="0.6" fill="none"/>
  </svg>
)

