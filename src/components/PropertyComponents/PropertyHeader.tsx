// components/property/PropertyHeader.tsx
import React from 'react'
import { ImageCarousel } from './ImageCarousel'

interface PropertyHeaderProps {
  post: any
  formatPrice: (price: number) => string
}

export function PropertyHeader({ post, formatPrice }: PropertyHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#32620e]/10 overflow-hidden mb-8">
      {/* Hero Image Carousel */}
      <div className="relative">
        <ImageCarousel images={post.images || []} title={post.title} />

        {/* Floating Tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-[#32620e] text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md backdrop-blur-sm">
            {typeof post.type === 'object' && post.type !== null && 'name' in post.type
              ? post.type.name
              : 'Property'}
          </span>
          <span className="bg-[#c1440e] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md backdrop-blur-sm">
            {typeof post.price === 'number' ? formatPrice(post.price) : 'Price on Request'}
          </span>
        </div>
      </div>

      {/* Property Content */}
      <div className="p-6">
        <div className="max-w-4xl">
          {/* Title and Location */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#32620e] mb-3 leading-tight">
              {post.title}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-[#32620e]/70">
              <div className="p-1.5 bg-[#32620e]/10 rounded-lg">
                <svg className="w-4 h-4 text-[#32620e]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">
                {post.location?.address ||
                  `${post.location?.lat}, ${post.location?.lng}` ||
                  'Location not specified'}
              </span>
            </div>
          </div>

          {/* Key Features - Compact Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-[#32620e]/5 to-[#32620e]/10 rounded-xl p-4 text-center border border-[#32620e]/10">
              <div className="w-8 h-8 mx-auto mb-2 bg-[#32620e]/10 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#32620e]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14zM19 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-[#32620e] font-semibold text-sm">
                {post.bedrooms} Bed{post.bedrooms !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#32620e]/5 to-[#32620e]/10 rounded-xl p-4 text-center border border-[#32620e]/10">
              <div className="w-8 h-8 mx-auto mb-2 bg-[#32620e]/10 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#32620e]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                  />
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                </svg>
              </div>
              <div className="text-[#32620e] font-semibold text-sm">
                {post.bathrooms} Bath{post.bathrooms !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#32620e]/5 to-[#32620e]/10 rounded-xl p-4 text-center border border-[#32620e]/10">
              <div className="w-8 h-8 mx-auto mb-2 bg-[#32620e]/10 rounded-lg flex items-center justify-center">
                {post.status === 'available' ? (
                  <svg className="w-4 h-4 text-[#32620e]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    />
                  </svg>
                )}
              </div>
              <div
                className={`font-semibold text-sm ${post.status === 'available' ? 'text-[#32620e]' : 'text-red-500'}`}
              >
                {post.status === 'available' ? 'Available' : 'Unavailable'}
              </div>
            </div>
          </div>

          {/* Additional Property Details Row */}
          <div className="mt-4 pt-4 border-t border-[#32620e]/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xs text-[#32620e]/60 uppercase tracking-wide font-medium mb-1">
                  Type
                </div>
                <div className="text-sm font-semibold text-[#32620e]">
                  {typeof post.type === 'object' && post.type !== null && 'name' in post.type
                    ? post.type.name
                    : 'Property'}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#32620e]/60 uppercase tracking-wide font-medium mb-1">
                  Price
                </div>
                <div className="text-sm font-semibold text-[#c1440e]">
                  {typeof post.price === 'number' ? formatPrice(post.price) : 'On Request'}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#32620e]/60 uppercase tracking-wide font-medium mb-1">
                  Status
                </div>
                <div
                  className={`text-sm font-semibold ${post.status === 'available' ? 'text-green-600' : 'text-red-500'}`}
                >
                  {post.status === 'available' ? 'Available' : 'Unavailable'}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#32620e]/60 uppercase tracking-wide font-medium mb-1">
                  ID
                </div>
                <div className="text-sm font-semibold text-[#32620e]/80">#{post.id || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
