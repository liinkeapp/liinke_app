import { Listings } from '@/types/property'

export function groupPropertiesByLocation(properties: Listings[], threshold = 0.0001) {
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

export async function createEnhancedMarker(
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
