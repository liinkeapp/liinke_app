import { Listings } from '@/types/property'

export function groupPropertiesByLocation(properties: Listings[]) {
  const groups: Record<string, Listings[]> = {}

  for (const property of properties) {
    const lat = property.location?.lat ?? 0
    const lng = property.location?.lng ?? 0

    // Round to threshold precision
    const key = `${lat.toFixed(5)}-${lng.toFixed(5)}`

    if (!groups[key]) groups[key] = []
    groups[key].push(property)
  }

  return groups
}

export const mapStyles = [
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

export const createCustomClusterRenderer = () => {
  return {
    render: (
      cluster: import('@googlemaps/markerclusterer').Cluster,
      stats: import('@googlemaps/markerclusterer').ClusterStats,
      map: google.maps.Map,
    ) => {
      const count = cluster.count
      const position = cluster.position
      // Create cluster marker with custom styling
      const color = count > 10 ? '#c1440e' : '#32620e'
      const size = count > 10 ? 60 : count > 5 ? 50 : 40

      const svg = `
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="${color}" stroke="#f9f5f0" stroke-width="3"/>
            <text x="${size / 2}" y="${size / 2}" fill="#f9f5f0" font-size="${size > 50 ? '16' : '14'}px" font-weight="bold" text-anchor="middle" dominant-baseline="central">
              ${count}
            </text>
          </svg>
        `

      const marker = new google.maps.Marker({
        position: { lat: position.lat(), lng: position.lng() },
        icon: {
          url: `data:image/svg+xml;base64,${btoa(svg)}`,
          scaledSize: new google.maps.Size(size, size),
          anchor: new google.maps.Point(size / 2, size / 2),
        },
        map,
        zIndex: 1000,
      })

      return marker
    },
  }
}
