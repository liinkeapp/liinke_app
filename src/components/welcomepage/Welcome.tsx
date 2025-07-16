import React from 'react'
import Link from 'next/link'

export default function Welcome() {
  return (
    <section className="relative md:min-h-screen flex items-center justify-center bg-[#f9f5f0] px-6 md:px-4 pt-32 pb-8 md:pt-32 md:pb-8 overflow-hidden">
      {/* Enhanced background decorations with subtle animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#32620e]/40 rounded-full animate-pulse"></div>
        <div
          className="absolute top-32 right-20 w-24 h-24 border-2 border-[#c1440e]/50 rounded-full animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-0 left-1/4 w-40 h-40 border-2 border-[#32620e]/60 rounded-full animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute bottom-32 right-1/3 w-20 h-20 border-2 border-[#c1440e]/60 rounded-full animate-pulse"
          style={{ animationDelay: '0.5s' }}
        ></div>

        {/* Enhanced floating shapes with subtle movement */}
        <div
          className="absolute top-1/4 left-1/6 w-3 h-3 bg-[#32620e]/60 rounded-full animate-bounce"
          style={{ animationDelay: '1.5s' }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#c1440e]/50 rounded-full animate-bounce"
          style={{ animationDelay: '2.5s' }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-[#32620e]/70 rounded-full animate-bounce"
          style={{ animationDelay: '3s' }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/6 w-2 h-2 bg-[#c1440e]/60 rounded-full animate-bounce"
          style={{ animationDelay: '0.8s' }}
        ></div>

        {/* Additional decorative elements */}
        <div className="absolute top-1/2 left-8 w-16 h-16 border border-[#32620e]/30 rounded-full transform rotate-45"></div>
        <div className="absolute top-3/4 right-12 w-12 h-12 border border-[#c1440e]/40 rounded-full transform -rotate-12"></div>
      </div>

      <div className="max-w-5xl text-center relative z-10">
        {/* Enhanced main heading with better visual hierarchy */}
        <div className="mb-12 md:mb-12">
          <h1 className="text-6xl md:text-7xl font-extralight text-[#32620e] mb-4 tracking-tight leading-tight">
            Welcome to{' '}
            <span className="relative inline-block">
              <span className="font-bold bg-gradient-to-r from-[#c1440e] to-[#32620e]/80 bg-clip-text text-transparent">
                Liinke
              </span>
            </span>
          </h1>

          {/* Enhanced tagline with better spacing */}
          <div className="space-y-6 mb-4">
            <h2 className="text-xl md:text-3xl font-light text-[#32620e] tracking-wider">
              Pin. Discover. Liinke.
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#32620e]/40 to-transparent mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-[#32620e]/70 max-w-2xl mx-auto font-light leading-relaxed">
              Choose a category to start exploring properties across Kenya
            </p>
          </div>
        </div>

        {/* Enhanced category grid with better visual treatment */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto mb-12">
          {[
            { label: 'Rentals', href: '/rental', icon: '🏠' },
            { label: 'Commercial', href: '/commercial', icon: '🏢' },
            { label: 'Land', href: '/land', icon: '🌾' },
            { label: 'Comrade', href: '/comrade', icon: '👥' },
          ].map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative overflow-hidden bg-white/80 backdrop-blur-md border-2 border-[#32620e]/20 rounded-3xl py-8 px-6 md:py-10 md:px-8 hover:border-[#32620e]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-[#32620e]/20 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10 space-y-3">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <span className="block text-[#32620e] font-semibold text-xl group-hover:text-[#c1440e] transition-colors duration-300">
                  {item.label}
                </span>
                <div className="w-8 h-0.5 bg-[#32620e]/30 group-hover:bg-[#c1440e]/60 group-hover:w-12 transition-all duration-300 mx-auto"></div>
              </div>

              {/* Enhanced hover effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#32620e]/10 via-transparent to-[#c1440e]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#32620e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Subtle border glow effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-[#c1440e]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          ))}
        </div>

        {/* Enhanced bottom accent with gradient */}
        <div className="relative">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#32620e]/50 to-transparent mx-auto mb-4"></div>
          <div className="flex items-center justify-center space-x-2 text-[#32620e]/40">
            <div className="w-2 h-2 bg-[#32620e]/40 rounded-full"></div>
            <div className="w-1 h-1 bg-[#c1440e]/40 rounded-full"></div>
            <div className="w-2 h-2 bg-[#32620e]/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
