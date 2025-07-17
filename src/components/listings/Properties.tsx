import Map from '../map/Map'
import { Listings } from '@/types/property'

export default function PropertyPage({ properties }: { properties: Listings[] }) {
  const listings = [
    { lat: -1.2921, lng: 36.8219 },
    { lat: -1.3032, lng: 36.8076 },
  ]

  return (
    <div>
      <Map markers={listings} />
    </div>
  )
}
