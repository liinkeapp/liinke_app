import React from 'react'
import Link from 'next/link'

export default function Welcome() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f9f5f0] px-4 pt-16">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#32620e] mb-4">
          Welcome to <span className="text-[#c1440e]">Liinke</span>
        </h1>
        <div>
          <h2 className="text-3xl font-semibold text-[#32620e] mb-2">Pin. Discover. Liinke.</h2>
          <p className="text-xl text-[#32620e]/80 max-w-2xl mx-auto leading-relaxed">
            Choose a category to start exploring properties across Kenya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { label: 'Rentals', href: '/rental' },
            { label: 'Commercial', href: '/commercial' },
            { label: 'Land', href: '/land' },
            { label: 'Comrade', href: '/comrade' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-6 py-4 bg-[#f9f5f0] border border-[#32630e] text-[#32630e] rounded-xl hover:shadow hover:bg-[#32630e] hover:text-white transition text-lg font-medium shadow-2xl"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
