import React from 'react'

interface PropertyDescriptionProps {
  description?: string
}

export function PropertyDescription({ description }: PropertyDescriptionProps) {
  if (!description) return null

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-[#32620e]/10 p-12 mb-12">
      <h2 className="text-3xl font-bold text-[#32620e] mb-8">Description</h2>
      <div className="text-[#32620e]/80 leading-relaxed text-base whitespace-pre-line max-w-4xl">
        {description}
      </div>
    </div>
  )
}
