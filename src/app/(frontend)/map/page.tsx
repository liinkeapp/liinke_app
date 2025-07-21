export const dynamic = 'force-dynamic'

import React from 'react'
import MapPage from '@/components/map/MapPage'
import { fetchAllPosts } from '@/lib/propertyUtil'

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
