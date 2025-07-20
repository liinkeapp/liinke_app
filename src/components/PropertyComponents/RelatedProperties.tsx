// components/property/RelatedProperties.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Listings } from '@/types/property'

interface RelatedPropertiesProps {
  relatedPosts: Listings[]
  categorySlug: string
  formatPrice: (price: number) => string
}

export function RelatedProperties({
  relatedPosts,
  categorySlug,
  formatPrice,
}: RelatedPropertiesProps) {
  if (!relatedPosts || relatedPosts.length === 0) return null

  return (
    <div className="bg-gradient-to-br from-[#32620e]/5 via-white to-[#c1440e]/5 rounded-2xl shadow-lg border border-[#32620e]/10 p-8 mb-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#32620e]/10 rounded-full px-4 py-2 mb-4">
          <div className="w-2 h-2 bg-[#32620e] rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold text-[#32620e] uppercase tracking-wider">
            Similar Properties
          </span>
        </div>
        <h2 className="text-2xl font-bold text-[#32620e] mb-2">You Might Also Like</h2>
        <p className="text-sm text-[#32620e]/60">Discover more properties in this area</p>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((relatedPost, index) => (
          <Link
            key={relatedPost.id}
            href={`/${categorySlug}/${relatedPost.slug}`}
            className="group"
          >
            <div
              className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-[#32620e]/10 hover:border-[#32620e]/20 transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              {/* Image Container */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={relatedPost.images?.[0]?.url || '/placeholder-property.jpg'}
                  alt={relatedPost.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Property Type Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#32620e]/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
                    {typeof relatedPost.category ? relatedPost.category : 'Property'}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-3 right-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      relatedPost.status === 'available'
                        ? 'bg-green-400 shadow-lg shadow-green-400/50'
                        : 'bg-red-400 shadow-lg shadow-red-400/50'
                    }`}
                  ></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="font-bold text-[#32620e] group-hover:text-[#c1440e] transition-colors mb-2 line-clamp-2 text-base leading-tight">
                  {relatedPost.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-[#32620e]/60 mb-3">
                  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs line-clamp-1">
                    {relatedPost.location?.address || 'Location not specified'}
                  </span>
                </div>

                {/* Property Details */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-[#32620e]/50"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <span className="text-xs text-[#32620e]/70 font-medium">
                      {relatedPost.bedrooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-[#32620e]/50"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                      />
                    </svg>
                    <span className="text-xs text-[#32620e]/70 font-medium">
                      {relatedPost.bathrooms}
                    </span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-[#32620e]/10">
                  <div className="text-[#c1440e] font-bold text-sm">
                    {typeof relatedPost.price === 'number'
                      ? formatPrice(relatedPost.price)
                      : 'Contact'}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1 text-[#32620e] text-xs font-medium">
                      View Details
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
