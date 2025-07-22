'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Map from '@/components/map/Map'
import { Listings } from '@/types/property'
import { IoMdSearch } from 'react-icons/io'

interface PropertyListingClientProps {
  initialProperties: Listings[]
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

export default function MapPage({ initialProperties, searchParams }: PropertyListingClientProps) {
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState(searchParams?.search || '')
  const [priceRange, setPriceRange] = useState({
    min: searchParams?.priceMin || '',
    max: searchParams?.priceMax || '',
  })
  const [bedrooms, setBedrooms] = useState(searchParams?.bedrooms || '')
  const [bathrooms, setBathrooms] = useState(searchParams?.bathrooms || '')
  const [propertyType, setPropertyType] = useState(searchParams?.propertyType || '')
  const [sortBy, setSortBy] = useState(searchParams?.sortBy || 'newest')
  const [currentPage, setCurrentPage] = useState(Number(searchParams?.page) || 1)
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    const filtered = initialProperties.filter((property) => {
      const matchesSearch =
        !searchTerm ||
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location?.address?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesPrice =
        (!priceRange.min || property.price >= Number(priceRange.min)) &&
        (!priceRange.max || property.price <= Number(priceRange.max))

      const matchesBedrooms = !bedrooms || (property.bedrooms ?? 0) >= Number(bedrooms)
      const matchesBathrooms = !bathrooms || (property.bathrooms ?? 0) >= Number(bathrooms)
      const matchesType = !propertyType || property.category === propertyType

      return matchesSearch && matchesPrice && matchesBedrooms && matchesBathrooms && matchesType
    })

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'bedrooms':
          return (b.bedrooms ?? 0) - (a.bedrooms ?? 0)
        case 'newest':
        default:
          return new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime()
      }
    })

    return filtered
  }, [initialProperties, searchTerm, priceRange, bedrooms, bathrooms, propertyType, sortBy])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (priceRange.min) params.set('priceMin', priceRange.min)
    if (priceRange.max) params.set('priceMax', priceRange.max)
    if (bedrooms) params.set('bedrooms', bedrooms)
    if (bathrooms) params.set('bathrooms', bathrooms)
    if (propertyType) params.set('propertyType', propertyType)
    if (sortBy !== 'newest') params.set('sortBy', sortBy)
    if (currentPage !== 1) params.set('page', currentPage.toString())

    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.replace(newUrl, { scroll: false })
  }, [searchTerm, priceRange, bedrooms, bathrooms, propertyType, sortBy, currentPage, router])

  const clearFilters = () => {
    setSearchTerm('')
    setPriceRange({ min: '', max: '' })
    setBedrooms('')
    setBathrooms('')
    setPropertyType('')
    setSortBy('newest')
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl border-2 border-[#32620e]/70 p-2 mb-4">
        <div className="flex flex-row lg:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="flex-1 relative">
            <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#32620e]/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search properties, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#32620e]/20 rounded-lg focus:outline-none"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-[#c1440e] text-white rounded-lg hover:bg-[#c1440e]/90 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
              />
            </svg>
            Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-[#32620e]/10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-[#32620e] mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#32620e]/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#32620e]"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#32620e]/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#32620e]"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-[#32620e] mb-2">Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-3 py-2 border border-[#32620e]/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#32620e]"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium text-[#32620e] mb-2">Bathrooms</label>
                <select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full px-3 py-2 border border-[#32620e]/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#32620e]"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-[#32620e] mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-[#32620e]/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#32620e]"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="bedrooms">Most Bedrooms</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={clearFilters}
                className="text-[#c1440e] hover:text-[#c1440e]/80 text-sm font-medium"
              >
                Clear All Filters
              </button>
              <div className="text-sm text-[#32620e]/70">
                {filteredAndSortedProperties.length} properties found
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative mb-2">
        <Map properties={filteredAndSortedProperties} />
      </div>
    </div>
  )
}
