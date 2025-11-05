import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Create custom primary color icon using SVG (#12b0df)
const createPrimaryIcon = () => {
  return new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16C0 28 16 48 16 48C16 48 32 28 32 16C32 7.163 24.837 0 16 0Z" fill="#0e8bb3"/>
        <path d="M16 4C9.373 4 4 9.373 4 16C4 24 16 40 16 40C16 40 28 24 28 16C28 9.373 22.627 4 16 4Z" fill="#12b0df"/>
        <circle cx="16" cy="16" r="6" fill="white"/>
      </svg>
    `),
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
  })
}

const locations = [
  { name: 'Nashville', lat: 36.1627, lng: -86.7816 },
  { name: 'Franklin', lat: 35.9251, lng: -86.8689 },
  { name: 'Spring Hill', lat: 35.7512, lng: -86.9300 },
  { name: 'Columbia', lat: 35.6151, lng: -87.0353 },
  { name: 'Brentwood', lat: 36.0331, lng: -86.7828 },
  { name: 'Murfreesboro', lat: 35.8456, lng: -86.3903 },
]

// Calculate center point (average of all locations)
const centerLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length
const centerLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length

const primaryIcon = createPrimaryIcon()

function ServiceAreaMap() {
  useEffect(() => {
    // Force map to invalidate size after mount
    setTimeout(() => {
      const mapElement = document.querySelector('.leaflet-container')
      if (mapElement) {
        // Trigger map resize
        window.dispatchEvent(new Event('resize'))
      }
    }, 100)
  }, [])

  return (
    <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={9}
        style={{ height: '100%', width: '100%', minHeight: '450px' }}
        scrollWheelZoom={true}
        zoomControl={true}
        className="z-0"
        whenReady={(map) => {
          // Force map to update size
          map.target.invalidateSize()
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]} icon={primaryIcon}>
            <Popup>
              <div className="text-center py-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-[#12b0df] mr-2" />
                <strong className="text-[#12b0df] text-lg">{location.name}, TN</strong>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default ServiceAreaMap

