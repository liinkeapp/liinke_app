'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  Phone,
  Zap,
  MapPin,
  Bed,
  Bath,
  Home,
} from 'lucide-react'
import { Listings } from '@/types/property'

interface PropertyHeaderProps {
  post: Listings & {
    contactinfo?: {
      phone?: string
    }
  }
}

export function PropertyHeader({ post }: PropertyHeaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [thumbnailScrollPosition, setThumbnailScrollPosition] = useState(0)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

  const images = post.images || []
  const hasImages = images.length > 0

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (!thumbnailContainerRef.current) return

    const container = thumbnailContainerRef.current
    const scrollAmount = 200
    const newPosition =
      direction === 'left'
        ? Math.max(0, thumbnailScrollPosition - scrollAmount)
        : Math.min(
            container.scrollWidth - container.clientWidth,
            thumbnailScrollPosition + scrollAmount,
          )

    container.scrollTo({ left: newPosition, behavior: 'smooth' })
    setThumbnailScrollPosition(newPosition)
  }

  const canScrollLeft = thumbnailScrollPosition > 0
  const canScrollRight = thumbnailContainerRef.current
    ? thumbnailScrollPosition <
      thumbnailContainerRef.current.scrollWidth - thumbnailContainerRef.current.clientWidth
    : false

  useEffect(() => {
    const handleScroll = () => {
      if (thumbnailContainerRef.current) {
        setThumbnailScrollPosition(thumbnailContainerRef.current.scrollLeft)
      }
    }

    const container = thumbnailContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl border border-[#32620e]/10 overflow-hidden mb-8">
        {/* Enhanced Hero Section with Carousel and Thumbnails */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Main Carousel Area */}
          <div className="lg:col-span-2 relative">
            <div className="relative h-64 md:h-96 lg:h-[500px] group">
              {hasImages ? (
                <>
                  <Image
                    src={images[currentIndex]?.url || '/placeholder-property.jpg'}
                    alt={`${post.title} - Image ${currentIndex + 1}`}
                    fill
                    className="object-cover transition-all duration-500 cursor-pointer hover:scale-105"
                    onClick={() => setShowModal(true)}
                    priority
                  />

                  {/* Enhanced Floating Tags with Glass Effect */}
                  <div className="absolute top-4 left-4 flex gap-3 z-10">
                    <span className="bg-[#32620e]/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg ring-1 ring-white/20 capitalize flex items-center gap-2">
                      <Home size={14} />
                      {post.category}
                    </span>
                    <span className="bg-[#c1440e]/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg ring-1 ring-white/20 flex items-center gap-1">
                      Ksh {post.price?.toLocaleString()}
                    </span>
                  </div>

                  {/* Enhanced Expand Icon */}
                  <button
                    onClick={() => setShowModal(true)}
                    className="absolute top-4 right-4 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110 ring-1 ring-white/20"
                    aria-label="View full size"
                  >
                    <ZoomIn size={18} />
                  </button>

                  {/* Enhanced Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          prevImage()
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110 ring-1 ring-white/20"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage()
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110 ring-1 ring-white/20"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Enhanced Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium ring-1 ring-white/20">
                      {currentIndex + 1} / {images.length}
                    </div>
                  )}
                </>
              ) : (
                <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <Home size={48} className="text-gray-400 mx-auto mb-3" />
                    <span className="text-gray-500 text-lg font-medium">No images available</span>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Scrollable Thumbnail Strip */}
            {hasImages && images.length > 1 && (
              <div className="p-6 border-t border-[#32620e]/10 bg-gradient-to-r from-[#32620e]/[0.02] to-transparent">
                <div className="relative">
                  {/* Left Scroll Button */}
                  {canScrollLeft && (
                    <button
                      onClick={() => scrollThumbnails('left')}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-[#32620e] p-2 rounded-full shadow-lg border border-[#32620e]/20 hover:border-[#32620e]/40 transition-all duration-200 hover:scale-110"
                      aria-label="Scroll thumbnails left"
                    >
                      <ChevronLeft size={16} />
                    </button>
                  )}

                  {/* Thumbnail Container */}
                  <div
                    ref={thumbnailContainerRef}
                    className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-8 py-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`flex-shrink-0 relative w-20 h-16 md:w-24 md:h-20 rounded-xl overflow-hidden border-3 transition-all duration-300 hover:scale-105 ${
                          index === currentIndex
                            ? 'border-[#32620e] ring-4 ring-[#32620e]/20 scale-110 shadow-lg'
                            : 'border-[#32620e]/20 hover:border-[#32620e]/50 shadow-md hover:shadow-lg'
                        }`}
                      >
                        <Image
                          src={image.url}
                          alt={`Thumbnail ${index + 1}`}
                          width={100}
                          height={100}
                          className="object-cover transition-all duration-300"
                        />
                        {index === currentIndex && (
                          <div className="absolute inset-0 bg-[#32620e]/20 backdrop-blur-[1px]" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Right Scroll Button */}
                  {canScrollRight && (
                    <button
                      onClick={() => scrollThumbnails('right')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-[#32620e] p-2 rounded-full shadow-lg border border-[#32620e]/20 hover:border-[#32620e]/40 transition-all duration-200 hover:scale-110"
                      aria-label="Scroll thumbnails right"
                    >
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Contact Info and Property Details Sidebar */}
          <div className="lg:border-l border-[#32620e]/10 bg-gradient-to-br from-[#32620e]/[0.03] via-white to-[#c1440e]/[0.02] p-6">
            {/* Contact Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-[#32620e]/10 to-[#32620e]/20 rounded-xl shadow-sm">
                  <Zap className="w-5 h-5 text-[#32620e]" />
                </div>
                <h3 className="font-bold text-[#32620e] text-lg">Contact Agent</h3>
              </div>

              {post.contactinfo?.phone && (
                <a
                  href={`tel:${post.contactinfo.phone}`}
                  className="flex items-center gap-4 p-5 rounded-2xl border-2 border-[#32620e]/20 hover:border-[#32620e] hover:bg-gradient-to-r hover:from-[#32620e]/5 hover:to-[#32620e]/10 transition-all duration-300 group w-full shadow-sm hover:shadow-lg hover:scale-[1.02]"
                >
                  <div className="p-4 bg-gradient-to-br from-[#32620e]/10 to-[#32620e]/20 rounded-2xl group-hover:from-[#32620e]/20 group-hover:to-[#32620e]/30 transition-all duration-300 shadow-sm">
                    <Phone className="w-5 h-5 text-[#32620e]" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[#32620e] font-bold block text-lg">Call Now</span>
                    <p className="text-[#32620e]/70 text-sm font-medium">
                      {post.contactinfo.phone}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#32620e]/40 group-hover:text-[#32620e] group-hover:translate-x-1 transition-all duration-300" />
                </a>
              )}
            </div>

            {/* Enhanced Quick Property Stats */}
            <div className="space-y-4">
              <h4 className="font-bold text-[#32620e] mb-4 text-lg flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-[#32620e] to-[#c1440e] rounded-full" />
                Property Details
              </h4>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-[#32620e]/10 hover:bg-[#32620e]/5 px-3 -mx-3 rounded-lg transition-all duration-200">
                  <span className="text-[#32620e]/70 text-sm font-semibold">Price</span>
                  <span className="text-[#c1440e] font-bold text-lg">
                    Ksh. {post.price?.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-[#32620e]/10 hover:bg-[#32620e]/5 px-3 -mx-3 rounded-lg transition-all duration-200">
                  <span className="text-[#32620e]/70 text-sm font-semibold">Status</span>
                  <span
                    className={`font-bold px-3 py-2 rounded-full text-xs shadow-sm ${
                      post.status === 'available'
                        ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200'
                        : 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {post.status === 'available' ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                {post.bedrooms !== undefined && (
                  <div className="flex justify-between items-center py-3 border-b border-[#32620e]/10 hover:bg-[#32620e]/5 px-3 -mx-3 rounded-lg transition-all duration-200">
                    <span className="text-[#32620e]/70 text-sm font-semibold flex items-center gap-2">
                      <Bed size={14} />
                      Bedrooms
                    </span>
                    <span className="text-[#32620e] font-bold">{post.bedrooms}</span>
                  </div>
                )}

                {post.bathrooms !== undefined && (
                  <div className="flex justify-between items-center py-3 border-b border-[#32620e]/10 hover:bg-[#32620e]/5 px-3 -mx-3 rounded-lg transition-all duration-200">
                    <span className="text-[#32620e]/70 text-sm font-semibold flex items-center gap-2">
                      <Bath size={14} />
                      Bathrooms
                    </span>
                    <span className="text-[#32620e] font-bold">{post.bathrooms}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Property Info */}
        <div className="p-8 border-t border-[#32620e]/10 bg-gradient-to-r from-[#32620e]/[0.01] to-transparent">
          <div className="max-w-4xl">
            {/* Title and Location */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-[#32620e] mb-4 leading-tight bg-gradient-to-r from-[#32620e] to-[#32620e]/80 bg-clip-text">
                {post.title}
              </h1>

              {/* Enhanced Location */}
              <div className="flex items-center gap-3 text-[#32620e]/70 hover:text-[#32620e] transition-colors duration-200 cursor-pointer group">
                <div className="p-2 bg-gradient-to-br from-[#32620e]/10 to-[#32620e]/20 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
                  <MapPin className="w-5 h-5 text-[#32620e]" />
                </div>
                <span className="text-base font-semibold group-hover:underline">
                  {post.location?.address || 'Location not specified'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Full Size Modal */}
      {showModal && hasImages && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {/* Enhanced Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white p-4 rounded-full z-10 transition-all duration-200 hover:scale-110 ring-1 ring-white/20"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={images[currentIndex]?.url || '/placeholder-property.jpg'}
                alt={`${post.title} - Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Enhanced Modal Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white p-4 rounded-full transition-all duration-200 hover:scale-110 ring-1 ring-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white p-4 rounded-full transition-all duration-200 hover:scale-110 ring-1 ring-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Enhanced Modal Counter */}
            {images.length > 1 && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full text-base font-semibold ring-1 ring-white/20">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
