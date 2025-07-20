'use client'

import React from 'react'
import { Listings } from '@/types/property'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface MarkerModalProps {
  group: Listings[]
  onClose: () => void
}

export const MarkerModal: React.FC<MarkerModalProps> = ({ group, onClose }) => {
  const router = useRouter()

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-[#32620e]">
              {group.length} Properties at This Location
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {group[0].location?.address || 'Same area'}
            </p>
          </div>
          <button
            className="text-[#c1440e] hover:text-[#c1440e]/80 transition-colors p-2 hover:bg-gray-100 rounded-full"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-4">
            {group.map((property, index) => (
              <div
                key={property.id}
                className="group border border-gray-200 rounded-xl p-4 hover:border-[#32620e]/30 hover:shadow-md transition-all cursor-pointer bg-gradient-to-r from-[#f9f5f0]/30 to-transparent"
                onClick={() => {
                  router.push(`/${property.category}/${property.slug}`)
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-[#32620e] text-white text-xs px-2 py-1 rounded-full font-medium">
                        #{index + 1}
                      </span>
                      <h3 className="font-bold text-[#32620e] group-hover:text-[#c1440e] transition-colors">
                        {property.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-[#c1440e] font-bold text-lg">
                        Ksh {property.price.toLocaleString()}
                      </span>
                      <span className="bg-[#32620e]/10 text-[#32620e] text-xs px-2 py-1 rounded-full">
                        {property.category}
                      </span>
                    </div>

                    {property.location?.address && (
                      <p className="text-gray-600 text-sm mb-3">📍 {property.location.address}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">Click to view full details</div>
                      <svg
                        className="w-5 h-5 text-[#32620e] group-hover:text-[#c1440e] group-hover:translate-x-1 transition-all"
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

                  {property.images?.[0]?.url && (
                    <div className="ml-4 w-20 h-20 rounded-lg overflow-hidden border-2 border-[#32620e]/20">
                      <Image
                        src={property.images[0].url}
                        alt={property.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Found {group.length} properties in this location
            </p>
            <button
              className="bg-[#32620e] text-white px-6 py-2 rounded-lg hover:bg-[#32620e]/90 transition-colors font-medium"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
