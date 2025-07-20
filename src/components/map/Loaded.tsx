import React from 'react'

export default function Loaded() {
  return (
    <div className="w-full h-96 bg-gradient-to-br from-[#f9f5f0] to-[#32620e]/10 rounded-xl border-2 border-[#32620e]/20 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="absolute inset-0 bg-[#32620e]/20 rounded-full animate-ping"></div>
          <div className="relative w-full h-full bg-[#32620e] rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[#f9f5f0] animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-[#32620e] mb-2">Loading Map</h3>
        <p className="text-[#32620e]/70 text-sm">Preparing your property locations...</p>
      </div>
    </div>
  )
}
