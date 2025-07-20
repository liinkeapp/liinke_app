export interface Listings {
  id: number
  slug: string
  title: string
  category: string
  publishedAt: string
  price: number
  description?: string
  bedrooms: number
  bathrooms: number
  location?: {
    lat: number
    lng: number
    address?: string | null
  }
  images?: any[]
  features?: { feature: string }[]
  status?: 'available' | 'sold' | 'rented'
}

export interface MapProps {
  markers?: { lat: number; lng: number; id?: string }[]
}
