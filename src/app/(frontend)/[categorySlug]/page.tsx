import React from 'react'
import { fetchByType } from '@/lib/propertyUtil'
import PropertyListingClient from '@/components/listings/PropertyListing'

interface SearchParams {
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

interface PageProps {
  params: { categorySlug: string }
  searchParams?: SearchParams
}

export default async function Page({
  params,
  searchParams,
}: PageProps): Promise<React.JSX.Element> {
  // Extract category slug from params
  if (!params || !params.categorySlug) {
    throw new Error('Category slug is required in params')
  }
  const { categorySlug } = params
  const { posts } = await fetchByType(categorySlug)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postsWithCategory = posts.map((post: any) => ({
    ...post,
    category: post.category ?? post.type ?? categorySlug ?? 'unknown',
  }))

  const categoryName = posts[0]?.type || decodeURIComponent(categorySlug)

  return (
    <div className="md:min-h-screen bg-[#f9f5f0] pt-20">
      {/* Futuristic Hero Section */}
      <section className="relative bg-gradient-to-br from-[#32620e] via-[#32620e]/95 to-[#c1440e]/20 text-white overflow-hidden flex items-center py-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Primary overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

          {/* Floating geometric shapes */}
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full animate-pulse opacity-30"></div>
          <div
            className="absolute top-1/4 right-20 w-24 h-24 border border-[#c1440e]/40 rotate-45 animate-spin"
            style={{ animationDuration: '20s' }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-lg animate-bounce"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 container mx-auto px-4 w-full">
          <div className="max-w-5xl mx-auto">
            {/* Main Title Section */}
            <div className="text-center md:mb-12">
              {/* Category Label */}
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#c1440e]"></div>
                <span className="text-xs font-mono text-[#ffad8a] uppercase tracking-[0.3em] px-4 py-2 border border-[#c1440e]/30 rounded-full bg-[#c1440e]/10 backdrop-blur-sm">
                  Property Category
                </span>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#c1440e]"></div>
              </div>

              {/* Main Heading with Glitch Effect */}
              <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-6 relative group">
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-white via-[#f9f5f0] to-white bg-clip-text text-transparent capitalize tracking-tight leading-none">
                    {categoryName}
                  </span>
                </span>
              </h1>
            </div>

            {/* Bottom Info Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="hidden md:flex items-center gap-4">
                {/* Right side - Time display */}
                <div className="text-right">
                  <div className="text-xs font-mono text-white/60 mb-1">CURRENT SESSION</div>
                  <div className="text-sm font-mono text-white/90 border border-white/20 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{posts.length}</div>
                  <div className="text-xs text-white/60 font-mono uppercase tracking-wider">
                    Listings
                  </div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#c1440e]">100%</div>
                  <div className="text-xs text-white/60 font-mono uppercase tracking-wider">
                    Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-white/30"></div>
        <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-white/30"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-white/30"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-white/30"></div>
      </section>

      {/* Main Content */}
      <PropertyListingClient
        initialProperties={postsWithCategory}
        categoryName={categoryName}
        searchParams={searchParams}
      />
    </div>
  )
}

export const dynamic = 'force-dynamic'
