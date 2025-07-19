import React from 'react'

interface PropertyFeaturesProps {
  features: Array<{ id?: string; feature: string }>
}

export function PropertyFeatures({ features }: PropertyFeaturesProps) {
  if (!features || features.length === 0) return null

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#32620e]/10 p-6 mb-8">
      <h2 className="text-xl font-bold text-[#32620e] mb-4">Features & Amenities</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((featureItem, index) => (
          <div
            key={featureItem.id || index}
            className="flex items-center gap-3 p-3 bg-[#32620e]/5 rounded-lg border border-[#32620e]/5 hover:bg-[#32620e]/10 transition-colors duration-200"
          >
            <div className="flex-shrink-0 p-1.5 bg-[#c1440e]/10 rounded-lg">
              <svg className="w-4 h-4 text-[#c1440e]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-[#32620e] font-medium text-sm leading-tight">
              {featureItem.feature}
            </span>
          </div>
        ))}
      </div>

      {/* Feature Count Indicator */}
      <div className="mt-4 pt-3 border-t border-[#32620e]/10">
        <div className="text-xs text-[#32620e]/60 font-medium">
          {features.length} feature{features.length !== 1 ? 's' : ''} available
        </div>
      </div>
    </div>
  )
}
