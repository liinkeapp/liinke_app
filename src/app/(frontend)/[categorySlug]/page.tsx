export const dynamic = 'force-dynamic'

import React from 'react'
import Map from '@/components/map/Map'
import { fetchByType } from '@/lib/propertyUtil'
import PropertyListingClient from '@/components/listings/PropertyListing'

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
  const { posts } = await fetchByType(categorySlug)

  const categoryName = posts[0]?.type?.name || decodeURIComponent(categorySlug)

  return (
    <div className="min-h-screen bg-[#f9f5f0] py-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#32620e] via-[#32620e]/95 to-[#c1440e]/20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#f9f5f0] bg-clip-text text-transparent">
              {categoryName}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Discover your perfect property from our curated collection
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="font-semibold">{posts.length}</span> Properties Available
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="font-semibold">Premium</span> Locations
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="font-semibold">Verified</span> Listings
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#c1440e]/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#c1440e]/20 to-transparent rounded-full blur-3xl"></div>
      </section>

      {/* Main Content */}
      <PropertyListingClient
        initialProperties={posts}
        categoryName={categoryName}
        searchParams={searchParams}
      />
    </div>
  )
}
