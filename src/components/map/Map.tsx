'use client'

import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Listings } from '@/types/property'

const accessToken = process.env.NEXT_PUBLIC_GOOGLE_TOKEN!

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '400px',
  borderRadius: '12px',
  overflow: 'hidden',
}

const fallbackCenter = {
  lat: -1.24411,
  lng: 36.67961,
}

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#f9f5f0' }],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#32620e' }],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f9f5f0' }, { lightness: 13 }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [{ color: '#f9f5f0' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#32620e' }, { lightness: 14 }, { weight: 1.4 }],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{ color: '#f9f5f0' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#32620e' }, { lightness: 80 }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#32620e' }, { lightness: 70 }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#32620e' }, { lightness: 29 }, { weight: 0.2 }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#32620e' }, { lightness: 80 }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{ color: '#32620e' }, { lightness: 90 }],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{ color: '#c1440e' }, { lightness: 80 }],
  },
]

export default function Map({ properties }: { properties: Listings[] }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: accessToken,
  })

  const [map, setMap] = React.useState<google.maps.Map | null>(null)
  const [userPosition, setUserPosition] = React.useState<google.maps.LatLngLiteral | null>(null)
  const [markerIcons, setMarkerIcons] = React.useState<{ [id: number]: string }>({})
  const [isLoadingMarkers, setIsLoadingMarkers] = React.useState(true)
  const [selectedProperty, setSelectedProperty] = React.useState<number | null>(null)

  const validProperties = properties.filter((p) => p.location?.lat && p.location?.lng)

  React.useEffect(() => {
    const loadIcons = async () => {
      setIsLoadingMarkers(true)
      const icons: { [id: number]: string } = {}

      for (const property of validProperties) {
        const imageUrl = property.images?.[0]?.url || '/fallback-marker.png'
        const icon = await createCircularMarker(imageUrl, property.id === selectedProperty)
        icons[property.id] = icon
      }

      setMarkerIcons(icons)
      setIsLoadingMarkers(false)
    }

    loadIcons()
  }, [properties, selectedProperty])

  const onLoad = React.useCallback(
    (map: google.maps.Map) => {
      // Try to center on user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }

            setUserPosition(userLocation)
            map.setCenter(userLocation)
            map.setZoom(13)
          },
          (error) => {
            console.warn('⚠️ Geolocation error:', error)
            fitBoundsToProperties(map)
          },
          { enableHighAccuracy: true, timeout: 10000 },
        )
      } else {
        fitBoundsToProperties(map)
      }

      setMap(map)
    },
    [validProperties],
  )

  const fitBoundsToProperties = (map: google.maps.Map) => {
    if (validProperties.length > 0) {
      const bounds = new google.maps.LatLngBounds()
      validProperties.forEach((property) => {
        bounds.extend({
          lat: property.location!.lat,
          lng: property.location!.lng,
        })
      })
      map.fitBounds(bounds)

      // Add padding to bounds
      const padding = { top: 20, right: 20, bottom: 20, left: 20 }
      map.fitBounds(bounds, padding)
    } else {
      map.setCenter(fallbackCenter)
      map.setZoom(10)
    }
  }

  const onUnmount = React.useCallback(() => {
    setMap(null)
  }, [])

  const handleMarkerClick = (propertyId: number) => {
    setSelectedProperty(propertyId === selectedProperty ? null : propertyId)
  }

  if (loadError) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-[#f9f5f0] to-[#32620e]/10 rounded-xl border-2 border-[#32620e]/20 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#c1440e]/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[#c1440e]" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#32620e] mb-2">Map Failed to Load</h3>
          <p className="text-[#32620e]/70 text-sm">
            Please check your internet connection and try refreshing the page.
          </p>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-[#f9f5f0] to-[#32620e]/10 rounded-xl border-2 border-[#32620e]/20 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-[#32620e]/20 rounded-full animate-ping"></div>
            <div className="relative w-full h-full bg-[#32620e] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#f9f5f0] animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-[#32620e] mb-2">Loading Map</h3>
          <p className="text-[#32620e]/70 text-sm">Preparing your property locations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-96 lg:h-[500px] xl:h-[600px] relative rounded-xl overflow-hidden shadow-2xl border-2 border-[#32620e]/20">
      {/* Loading overlay for markers */}
      {isLoadingMarkers && (
        <div className="absolute top-4 left-4 z-10 bg-[#f9f5f0]/95 backdrop-blur-sm rounded-lg px-4 py-2 border border-[#32620e]/20">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#32620e] rounded-full animate-pulse"></div>
            <span className="text-[#32620e] text-sm font-medium">Loading properties...</span>
          </div>
        </div>
      )}

      {/* Property count badge */}
      {validProperties.length > 0 && (
        <div className="absolute top-4 right-4 z-10 bg-[#32620e] text-[#f9f5f0] px-4 py-2 rounded-lg font-semibold shadow-lg">
          {validProperties.length} {validProperties.length === 1 ? 'Property' : 'Properties'}
        </div>
      )}

      {/* User location indicator */}
      {userPosition && (
        <div className="absolute bottom-4 left-4 z-10 bg-[#c1440e] text-[#f9f5f0] px-3 py-1 rounded-full text-sm font-medium shadow-lg">
          📍 Your Location
        </div>
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={fallbackCenter}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: 'greedy',
          scrollwheel: true,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
          },
          styles: mapStyles,
        }}
      >
        {/* User position marker */}
        {userPosition && (
          <Marker
            position={userPosition}
            icon={{
              url: createUserLocationIcon(),
              scaledSize: new google.maps.Size(24, 24),
              anchor: new google.maps.Point(12, 12),
            }}
            title="Your Location"
          />
        )}

        {/* Property markers */}
        {validProperties.map((property) => (
          <Marker
            key={property.id}
            position={{
              lat: property.location!.lat,
              lng: property.location!.lng,
            }}
            icon={{
              url: markerIcons[property.id] || '/prop.jpg',
              scaledSize: new google.maps.Size(
                selectedProperty === property.id ? 70 : 60,
                selectedProperty === property.id ? 70 : 60,
              ),
              anchor: new google.maps.Point(
                selectedProperty === property.id ? 35 : 30,
                selectedProperty === property.id ? 35 : 30,
              ),
            }}
            title={property.title}
            onClick={() => handleMarkerClick(property.id)}
            animation={selectedProperty === property.id ? google.maps.Animation.BOUNCE : undefined}
          />
        ))}
      </GoogleMap>
    </div>
  )
}

async function createCircularMarker(
  imageUrl: string,
  isSelected: boolean = false,
): Promise<string> {
  return new Promise((resolve) => {
    const size = isSelected ? 80 : 70
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size

    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      if (!ctx) return resolve('/prop.jpg')

      ctx.clearRect(0, 0, size, size)

      // Draw enhanced shadow
      ctx.save()
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
      ctx.shadowBlur = isSelected ? 12 : 8
      ctx.shadowOffsetX = isSelected ? 3 : 2
      ctx.shadowOffsetY = isSelected ? 3 : 2

      // Draw outer ring (selection indicator)
      if (isSelected) {
        ctx.beginPath()
        ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2)
        ctx.fillStyle = '#c1440e'
        ctx.fill()
      }

      // Draw main circle background
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2 - (isSelected ? 6 : 4), 0, Math.PI * 2)
      ctx.fillStyle = '#f9f5f0'
      ctx.fill()
      ctx.clip()

      // Draw image
      const imageSize = size - (isSelected ? 12 : 8)
      const imageOffset = isSelected ? 6 : 4
      ctx.drawImage(img, imageOffset, imageOffset, imageSize, imageSize)
      ctx.restore()

      // Draw border
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2 - (isSelected ? 6 : 4), 0, Math.PI * 2)
      ctx.strokeStyle = '#32620e'
      ctx.lineWidth = isSelected ? 3 : 2
      ctx.stroke()

      resolve(canvas.toDataURL())
    }

    img.onerror = () => resolve('/prop.jpg')
    img.src = imageUrl
  })
}

function createUserLocationIcon(): string {
  const canvas = document.createElement('canvas')
  const size = 24
  canvas.width = size
  canvas.height = size

  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // Draw pulsing circle
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2)
  ctx.fillStyle = '#c1440e'
  ctx.fill()

  // Draw inner circle
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2)
  ctx.fillStyle = '#f9f5f0'
  ctx.fill()

  // Draw center dot
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, 3, 0, Math.PI * 2)
  ctx.fillStyle = '#c1440e'
  ctx.fill()

  return canvas.toDataURL()
}
