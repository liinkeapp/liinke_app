export const dynamic = 'force-dynamic'

import React from 'react'
import MapPage from '@/components/map/MapPage'
import { fetchAllPosts } from '@/lib/propertyUtil'

type PageProps = {
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

export default async function Page({ params, searchParams }: PageProps) {
  const currentPage = Number(searchParams?.page) || 1
  const categorySlug = params.categorySlug

  // Pass the slug to fetchByCategory
  const { posts } = await fetchAllPosts()
  console.log('CHECKING LISTINGS', posts)

  return (
    <div className="bg-[#f9f5f0] pt-20">
      {/* Main Content */}
      <MapPage initialProperties={posts} searchParams={searchParams} />
    </div>
  )
}
