export const dynamic = 'force-dynamic'

import React from 'react'
import MapPage from '@/components/map/MapPage'
import { fetchAllPosts } from '@/lib/propertyUtil'

export const metadata = {
  title: 'Explore Properties on Map | Liinke',
  description:
    'Discover rental homes, commercial spaces, and land across Kenya — all in one interactive map. Zoom in, explore, and find your next space with Liinke.',
  metadataBase: new URL('https://www.liinke.com'),
  openGraph: {
    title: 'Property Map Search | Liinke Real Estate',
    description:
      'Navigate properties visually with Liinke’s powerful map. Instantly view listings by category and location — from rentals to commercial and land.',
    url: 'https://www.liinke.com/map',
    siteName: 'Liinke',
    images: [
      {
        url: '/preview.png', // Ensure this exists in /public
        width: 1200,
        height: 630,
        alt: 'Interactive Property Map - Liinke',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Map-Based Property Search | Liinke',
    description:
      'Pin, discover, and Liinke — find rentals, land, or commercial properties across Kenya using our interactive map.',
    images: ['/preview.png'],
    site: '@liinke_app',
  },
}

interface PageProps {
  params: { categorySlug: string }
  searchParams?: {
    page?: string
    search?: string
    priceMin?: string
    priceMax?: string
    bedrooms?: string
    bathrooms?: string
    propertyType?: string
    sortBy?: string
    view?: string
  }
}

export default async function Page({ searchParams }: PageProps) {
  const { posts } = await fetchAllPosts()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postsWithCategory = posts.map((post: any) => ({
    ...post,
    category: post.category ?? post.type ?? 'unknown',
  }))

  return (
    <div className="bg-[#f9f5f0] pt-20">
      {/* Main Content */}
      <MapPage initialProperties={postsWithCategory} searchParams={searchParams} />
    </div>
  )
}
