/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Map from '@/components/map/Map'
import { Listings } from '@/types/property'
import Image from 'next/image'
import Link from 'next/link'

interface PropertyListingClientProps {
  initialProperties: Listings[]
  categoryName: string
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

const ITEMS_PER_PAGE = 12

export default function PropertyListingClient({
  initialProperties,

  searchParams,
}: PropertyListingClientProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()

  // State management
  const [view, setView] = useState<'grid' | 'list' | 'map'>(
    (searchParams?.view as 'grid' | 'list' | 'map') || 'grid',
  )
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
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null)

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

      const matchesBedrooms = !bedrooms || (property?.bedrooms ?? 0) >= Number(bedrooms)
      const matchesBathrooms = !bathrooms || (property?.bathrooms ?? 0) >= Number(bathrooms)
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
          return (b?.bedrooms ?? 0) - (a?.bedrooms ?? 0)
        case 'newest':
        default:
          return new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime()
      }
    })

    return filtered
  }, [initialProperties, searchTerm, priceRange, bedrooms, bathrooms, propertyType, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProperties.length / ITEMS_PER_PAGE)
  const paginatedProperties = filteredAndSortedProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  // Get unique property types for filter
  const propertyTypes = useMemo(() => {
    const types = initialProperties.map((p) => p.category).filter(Boolean)
    return [...new Set(types)]
  }, [initialProperties])

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
    if (view !== 'grid') params.set('view', view)
    if (currentPage !== 1) params.set('page', currentPage.toString())

    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.replace(newUrl, { scroll: false })
  }, [searchTerm, priceRange, bedrooms, bathrooms, propertyType, sortBy, view, currentPage, router])

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
      <div className="bg-white rounded-2xl shadow-lg border border-[#32620e]/10 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="flex-1 relative w-full">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#32620e]/50 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search properties, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#32620e]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32620e] focus:border-transparent"
            />
          </div>

          <div className="flex  items-center gap-4">
            {/* View Toggle */}
            <div className="flex bg-[#32620e]/10 rounded-lg p-1">
              {[
                { key: 'grid', icon: '⊞', label: 'Grid' },
                { key: 'map', icon: '🗺', label: 'Map' },
              ].map(({ key, icon, label }) => (
                <button
                  key={key}
                  onClick={() => setView(key as 'grid' | 'map')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    view === key
                      ? 'bg-[#32620e] text-white shadow-sm'
                      : 'text-[#32620e] hover:bg-[#32620e]/10'
                  }`}
                  title={label}
                >
                  <span className="mr-2">{icon}</span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
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

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-[#32620e] mb-2">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-2 border border-[#32620e]/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#32620e]"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
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

      {/* Results Section */}
      {view === 'map' ? (
        <div className="md:h-[600px] rounded-2xl overflow-hidden">
          <Map properties={filteredAndSortedProperties} />
        </div>
      ) : (
        <>
          {/* Properties Grid/List */}
          <div
            className={`grid gap-6 mb-8 ${
              view === 'grid'
                ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}
          >
            {paginatedProperties.map((property) => (
              <div
                key={property.id}
                className={`group bg-white rounded-2xl shadow-lg border border-[#32620e]/10 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  view === 'list' ? 'flex' : ''
                }`}
                onClick={() => setSelectedProperty(property.id)}
              >
                {/* Property Image */}
                <div className="relative overflow-hidden h-48">
                  <Image
                    width={500}
                    height={480}
                    src={property.images?.[0]?.url || '/placeholder-property.jpg'}
                    alt={property.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-[#32620e] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.category || 'Property'}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#c1440e] text-white px-3 py-1 rounded-full text-sm font-bold">
                    {property && typeof property.price === 'number'
                      ? property.price.toFixed(2)
                      : 'N/A'}
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6 flex-1">
                  <h3 className="text-lg font-semibold text-[#32620e] mb-2 group-hover:text-[#c1440e] transition-colors">
                    <Link
                      href={`/${
                        property.category ? property.category : 'properties'
                      }/${property.slug}`}
                      className="block"
                    >
                      {property.title}
                    </Link>
                  </h3>
                  <p className="text-[#32620e]/70 text-sm mb-4">
                    📍 {property.location?.address || 'Location not specified'}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-[#32620e]/80 mb-4">
                    <span className="flex items-center gap-1">
                      🛏️ {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      🚿 {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#32620e]/50">
                      Listed {new Date(property.publishedAt || '').toLocaleDateString()}
                    </span>
                    <button className="bg-[#32620e] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#32620e]/90 transition-colors">
                      <Link
                        href={`/${
                          property.category ? property.category : 'properties'
                        }/${property.slug}`}
                        className="block"
                      >
                        View Details
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-[#32620e]/20 text-[#32620e] hover:bg-[#32620e]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === i + 1
                      ? 'bg-[#32620e] text-white'
                      : 'border border-[#32620e]/20 text-[#32620e] hover:bg-[#32620e]/10'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-[#32620e]/20 text-[#32620e] hover:bg-[#32620e]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* No Results */}
      {filteredAndSortedProperties.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-[#32620e]/10 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-[#32620e]/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#32620e] mb-2">No Properties Found</h3>
          <p className="text-[#32620e]/70 mb-6">Try adjusting your search criteria or filters</p>
          <button
            onClick={clearFilters}
            className="bg-[#c1440e] text-white px-6 py-3 rounded-lg hover:bg-[#c1440e]/90 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}
