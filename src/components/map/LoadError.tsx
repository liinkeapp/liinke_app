import React from 'react'

export default function LoadError() {
  return (
    <div className="w-full h-96 bg-gradient-to-br from-[#f9f5f0] to-[#32620e]/10 rounded-xl border-2 border-[#32620e]/20 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-[#c1440e]/20 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-[#c1440e]" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[#32620e] mb-2">Map Failed to Load</h3>
        <p className="text-[#32620e]/70 text-sm">
          Please check your internet connection and try refreshing the page.
        </p>
      </div>
    </div>
  )
}
