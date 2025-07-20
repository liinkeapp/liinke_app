export interface Listings {
  id: number
  slug: string
  title: string
  category: string
  publishedAt: string | null | undefined
  price: number
  description?: string
  bedrooms: number | null | undefined
  bathrooms: number | null | undefined
  location?: {
    lat: number
    lng: number
    address?: string | null
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images?: any[]
  features?: { feature: string }[]
  status?: 'available' | 'sold' | 'rented'
}

export interface MapProps {
  markers?: { lat: number; lng: number; id?: string }[]
}
