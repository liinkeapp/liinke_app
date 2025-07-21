/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect } from 'react'
import { GoogleMap, InfoWindow, useJsApiLoader } from '@react-google-maps/api'
import { Listings } from '@/types/property'
import { useRouter } from 'next/navigation'
import { MarkerClusterer, GridAlgorithm } from '@googlemaps/markerclusterer'
import { MarkerModal } from './MarkerModal'
import { groupPropertiesByLocation, mapStyles, createCustomClusterRenderer } from '@/lib/mapUtils'
import LoadError from './LoadError'
import Loaded from './Loaded'

const accessToken = process.env.NEXT_PUBLIC_GOOGLE_TOKEN!

const containerStyle = {
  width: '100%',
  height: '100vh',
  minHeight: '400px',
  borderRadius: '12px',
  overflow: 'hidden',
}

const fallbackCenter = {
  lat: -1.24411,
  lng: 36.67961,
}

export default function Map({ properties }: { properties: Listings[] }) {
  const router = useRouter()
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: accessToken,
  })
  const [selectedGroup, setSelectedGroup] = React.useState<Listings[] | null>(null)
  const [markerClusterer, setMarkerClusterer] = React.useState<MarkerClusterer | null>(null)

  const [map, setMap] = React.useState<google.maps.Map | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userPosition, setUserPosition] = React.useState<google.maps.LatLngLiteral | null>(null)
  const [markerIcons, setMarkerIcons] = React.useState<{ [key: string]: string }>({})
  const [isLoadingMarkers, setIsLoadingMarkers] = React.useState(true)
  const [hoveredMarker, setHoveredMarker] = React.useState<string | null>(null)
  const [activeInfoWindow, setActiveInfoWindow] = React.useState<string | null>(null)
  const [markers, setMarkers] = React.useState<google.maps.Marker[]>([])

  const validProperties = properties.filter((p) => p.location?.lat && p.location?.lng)
  const grouped = groupPropertiesByLocation(validProperties)

  // Custom cluster renderer with your color scheme

  async function createEnhancedMarker(
    imageUrl: string,
    isMultiple: boolean = false,
    count: number = 1,
  ): Promise<string> {
    return new Promise((resolve) => {
      const size = isMultiple ? 80 : 70
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size

      const ctx = canvas.getContext('2d')
      const img = new window.Image()
      img.crossOrigin = 'anonymous'

      img.onload = () => {
        if (!ctx) return resolve('/prop.jpg')

        ctx.clearRect(0, 0, size, size)

        // Draw enhanced shadow
        ctx.save()
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
        ctx.shadowBlur = isMultiple ? 10 : 6
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2

        // Draw main circle background
        ctx.beginPath()
        ctx.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2)
        ctx.fillStyle = '#f9f5f0'
        ctx.fill()
        ctx.clip()

        // Draw image
        const imageSize = size - 12
        const imageOffset = 6
        ctx.drawImage(img, imageOffset, imageOffset, imageSize, imageSize)
        ctx.restore()

        // Draw border with different colors for single vs multiple
        ctx.beginPath()
        ctx.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2)
        ctx.strokeStyle = isMultiple ? '#c1440e' : '#32620e'
        ctx.lineWidth = isMultiple ? 4 : 3
        ctx.stroke()

        // Add count badge for multiple properties
        if (isMultiple && count > 1) {
          const badgeSize = 24
          const badgeX = size - badgeSize / 2 - 2
          const badgeY = badgeSize / 2 + 2

          // Badge background
          ctx.beginPath()
          ctx.arc(badgeX, badgeY, badgeSize / 2, 0, Math.PI * 2)
          ctx.fillStyle = '#c1440e'
          ctx.fill()

          // Badge border
          ctx.beginPath()
          ctx.arc(badgeX, badgeY, badgeSize / 2, 0, Math.PI * 2)
          ctx.strokeStyle = '#f9f5f0'
          ctx.lineWidth = 2
          ctx.stroke()

          // Badge text
          ctx.fillStyle = '#f9f5f0'
          ctx.font = 'bold 12px Arial'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(count.toString(), badgeX, badgeY)
        }

        resolve(canvas.toDataURL())
      }

      img.onerror = () => resolve('/prop.jpg')
      img.src = imageUrl
    })
  }

  useEffect(() => {
    const loadIcons = async () => {
      setIsLoadingMarkers(true)
      const icons: { [key: string]: string } = {}

      for (const [key, group] of Object.entries(grouped)) {
        const isMultiple = group.length > 1
        const imageUrl = group[0].images?.[0]?.url || '/fallback-marker.png'
        const icon = await createEnhancedMarker(imageUrl, isMultiple, group.length)
        icons[key] = icon
      }

      setMarkerIcons(icons)
      setIsLoadingMarkers(false)
    }

    loadIcons()
  }, [properties])

  // Initialize clusterer when map and markers are ready
  useEffect(() => {
    if (map && markers.length > 0 && !isLoadingMarkers) {
      // Clear existing clusterer
      if (markerClusterer) {
        markerClusterer.clearMarkers()
      }

      // Create new clusterer with custom options
      const clusterer = new MarkerClusterer({
        map,
        markers,
        renderer: createCustomClusterRenderer(),
        algorithm: new GridAlgorithm({
          gridSize: 60,
        }),
      })

      setMarkerClusterer(clusterer)

      return () => {
        if (clusterer) {
          clusterer.clearMarkers()
        }
      }
    }
  }, [map, markers, isLoadingMarkers])

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
          { enableHighAccuracy: true },
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
    if (markerClusterer) {
      markerClusterer.clearMarkers()
    }
    setMap(null)
  }, [markerClusterer])

  const handleMarkerClick = (key: string, group: Listings[]) => {
    if (group.length === 1) {
      // Navigate directly to single property
      router.push(`/${group[0].category}/${group[0].slug}`)
    } else {
      // Show modal for multiple properties
      setSelectedGroup(group)
    }
  }

  const handleMarkerHover = (key: string) => {
    setHoveredMarker(key)
    setActiveInfoWindow(key)
  }

  const handleMarkerLeave = (key: string) => {
    setHoveredMarker(null)
    setTimeout(() => {
      if (hoveredMarker === key) {
        setActiveInfoWindow(null)
      }
    }, 200)
  }

  // Create markers when icons are ready
  useEffect(() => {
    if (!map || isLoadingMarkers) return

    const newMarkers: google.maps.Marker[] = []

    Object.entries(grouped).forEach(([key, group]) => {
      const firstProperty = group[0]
      const position = {
        lat: firstProperty.location!.lat,
        lng: firstProperty.location!.lng,
      }
      const isMultiple = group.length > 1

      const marker = new google.maps.Marker({
        position,
        icon: {
          url: markerIcons[key] || '/prop.jpg',
          scaledSize: new google.maps.Size(isMultiple ? 80 : 70, isMultiple ? 80 : 70),
          anchor: new google.maps.Point(isMultiple ? 40 : 35, isMultiple ? 40 : 35),
        },
        title: isMultiple
          ? `${group.length} properties here - click to view all`
          : firstProperty.title,
        map: null, // Don't add to map yet, clusterer will handle this
      })

      // Add event listeners
      marker.addListener('click', () => handleMarkerClick(key, group))
      marker.addListener('mouseover', () => handleMarkerHover(key))
      marker.addListener('mouseout', () => handleMarkerLeave(key))

      // Store reference to group for info windows
      ;(marker as any).groupKey = key
      ;(marker as any).group = group

      newMarkers.push(marker)
    })

    setMarkers(newMarkers)

    return () => {
      newMarkers.forEach((marker) => {
        google.maps.event.clearInstanceListeners(marker)
      })
    }
  }, [map, markerIcons, isLoadingMarkers])

  if (loadError) {
    return <LoadError />
  }

  if (!isLoaded) {
    return <Loaded />
  }

  return (
    <div className="w-full h-96 lg:h-[500px] xl:h-[600px] relative rounded-xl overflow-hidden border-2 border-[#32620e]/50">
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

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-4 z-10 bg-[#f9f5f0]/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-[#32620e]/20">
        <p className="text-[#32620e] text-xs font-medium">
          Hover markers to preview • Click to view details
        </p>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={fallbackCenter}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: 'greedy',
          scrollwheel: true,
          zoomControl: true,
          cameraControl: false,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
          },
          styles: mapStyles,
        }}
      >
        {/* Info Windows for individual markers */}
        {markers.map((marker) => {
          const groupKey = (marker as any).groupKey
          const group = (marker as any).group

          if (activeInfoWindow !== groupKey) return null

          const position = marker.getPosition()
          if (!position) return null

          const isMultiple = group.length > 1
          const firstProperty = group[0]

          return (
            <InfoWindow
              key={`info-${groupKey}`}
              position={position}
              onCloseClick={() => setActiveInfoWindow(null)}
              options={{
                pixelOffset: new google.maps.Size(0, -20),
                disableAutoPan: false,
              }}
            >
              <div className="p-3 min-w-[200px] max-w-[280px]">
                {isMultiple ? (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[#32620e] font-bold text-sm">
                        {group.length} Properties Here
                      </h3>
                      <span className="bg-[#c1440e] text-white text-xs px-2 py-1 rounded-full font-semibold">
                        {group.length}
                      </span>
                    </div>
                    <div className="space-y-1 mb-3 max-h-24 overflow-y-auto">
                      {group.slice(0, 3).map((property: Listings) => (
                        <div key={property.id} className="text-xs text-gray-600 truncate">
                          • {property.bedrooms} BR, {property.bathrooms} BA -{' '}
                          <span className="font-medium text-[#32620e] truncate">
                            {property.title}
                          </span>
                        </div>
                      ))}
                      {group.length > 3 && (
                        <div className="text-xs text-[#32620e] font-medium">
                          +{group.length - 3} more properties
                        </div>
                      )}
                    </div>
                    <div className="flex-col items-center justify-between">
                      <span className="text-xs text-gray-500">
                        From Ksh {Math.min(...group.map((p: Listings) => p.price)).toLocaleString()}
                      </span>
                      <button
                        className="bg-[#32620e] text-white text-xs px-3 py-1 rounded-full hover:bg-[#32620e]/90 transition-colors w-full cursor-pointer mt-2"
                        onClick={() => {
                          setSelectedGroup(group)
                          setActiveInfoWindow(null)
                        }}
                      >
                        View All
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-[#32620e] font-bold text-sm mb-2 line-clamp-2">
                      {firstProperty.title}
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#c1440e] font-bold text-sm">
                        Ksh {firstProperty.price.toLocaleString()}
                      </span>
                      <span className="bg-[#32620e]/10 text-[#32620e] text-xs px-2 py-1 rounded-full">
                        {firstProperty.category}
                      </span>
                    </div>
                    {firstProperty.location?.address && (
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {firstProperty.location.address}
                      </p>
                    )}
                    <button className="bg-[#32620e] text-white text-xs px-3 py-1 rounded-full hover:bg-[#32620e]/90 transition-colors w-full">
                      View Details
                    </button>
                  </div>
                )}
              </div>
            </InfoWindow>
          )
        })}
      </GoogleMap>

      {/* Enhanced Modal for Multiple Properties */}
      {selectedGroup && (
        <MarkerModal group={selectedGroup} onClose={() => setSelectedGroup(null)} />
      )}
    </div>
  )
}
