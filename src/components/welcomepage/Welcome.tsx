'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Welcome() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const categories = [
    {
      label: 'Comrade',
      href: '/comrade',
      icon: '🛌🏼',
      description: 'Affordable housing for students & workers',
      code: 'CRD-004',
    },
    {
      label: 'Rentals',
      href: '/rental',
      icon: '🏠',
      description: 'Homes and apartments for rent',
      code: 'RNT-001',
    },
    {
      label: 'Houses',
      href: '/houses',
      icon: '🏡',
      description: 'Family houses for sale or rent',
      code: 'HSE-005',
    },
    {
      label: 'Commercial',
      href: '/commercial',
      icon: '🏢',
      description: 'Shops, offices & business spaces',
      code: 'COM-002',
    },
    {
      label: 'Land',
      href: '/land',
      icon: '🌾',
      description: 'Plots for building or farming',
      code: 'LND-003',
    },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9f5f0] via-[#faf6f1] to-[#f8f4ef] px-4 sm:px-6 lg:px-8 py-26 md:py-30 overflow-hidden">
      {/* Futuristic grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(50, 98, 14, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(50, 98, 14, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Animated grid overlay */}
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(193, 68, 14, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(193, 68, 14, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            animationDuration: '4s',
          }}
        />
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Hexagonal elements */}
        <div
          className="absolute top-20 left-16 w-24 h-24 border-2 border-[#32620e]/40 transform rotate-12 animate-spin"
          style={{
            animationDuration: '20s',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          <div
            className="absolute inset-2 border border-[#32620e]/20 transform -rotate-12"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          ></div>
        </div>

        <div
          className="absolute top-32 right-20 w-20 h-20 border-2 border-[#c1440e]/50 transform -rotate-45 animate-spin"
          style={{ animationDuration: '15s', animationDirection: 'reverse' }}
        >
          <div className="absolute inset-1 bg-[#c1440e]/10 transform rotate-45"></div>
        </div>

        <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-[#32620e]/60 transform rotate-45 animate-pulse">
          <div className="absolute inset-2 border border-[#32620e]/30 transform -rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#32620e]/60 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
        </div>

        {/* Floating orbs with mouse parallax */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-[#32620e]/60 to-[#c1440e]/60 rounded-full animate-float"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              transform: `translate(${(mousePosition.x - window.innerWidth / 2) * (0.01 + i * 0.002)}px, ${(mousePosition.y - window.innerHeight / 2) * (0.01 + i * 0.002)}px)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Scanning line effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c1440e]/60 to-transparent animate-scan"></div>
      </div>

      <div
        className={`max-w-7xl w-full mx-auto text-center relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Futuristic header */}
        <div className="mb-10 lg:mb-12">
          {/* System status indicator */}
          <div className="inline-flex items-center gap-3 bg-black/10 backdrop-blur-xl border border-[#32620e]/30 rounded-full px-6 py-3 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#32620e]/5 via-transparent to-[#c1440e]/5"></div>
            <div className="w-2 h-2 bg-[#32620e] rounded-full animate-pulse shadow-lg shadow-[#32620e]/50"></div>
            <span className="text-[#32620e]/90 text-sm font-mono tracking-wider uppercase">
              ALL MAPPED
            </span>
            <div
              className="w-2 h-2 bg-[#c1440e] rounded-full animate-pulse shadow-lg shadow-[#c1440e]/50"
              style={{ animationDelay: '0.5s' }}
            ></div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin text-[#32620e] mb-6 tracking-tight leading-[1.1] relative">
            <span className="relative inline-block">
              Welcome to{' '}
              <span className="relative font-bold bg-gradient-to-r from-[#c1440e] via-[#c1440e]/90 to-[#32620e] bg-clip-text text-transparent">
                Liinke
                {/* Holographic effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#c1440e]/20 to-[#32620e]/20 blur-sm animate-pulse opacity-50"></div>
                <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c1440e]/80 to-transparent"></div>
              </span>
            </span>
          </h1>

          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-[#32620e]/90 tracking-[0.2em] font-mono">
              PIN.DISCOVER.LIINKE
            </h2>

            {/* Digital divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-[#32620e]/60 to-transparent flex-1 max-w-32 relative">
                <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-[#c1440e]/60 to-transparent animate-pulse"></div>
              </div>
              <div className="w-4 h-4 border border-[#32620e]/60 transform rotate-45 relative">
                <div className="absolute inset-1 bg-gradient-to-br from-[#32620e]/40 to-[#c1440e]/40"></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#32620e]/60 to-transparent flex-1 max-w-32 relative">
                <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-[#c1440e]/60 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Futuristic category grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
          {categories.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative overflow-hidden bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-xl p-6 sm:p-8 hover:border-[#c1440e]/60 transition-all duration-700 hover:shadow-2xl hover:shadow-[#32620e]/20 transform hover:scale-105 hover:-translate-y-4 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                animationDelay: `${index * 0.2}s`,
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              {/* Circuit board pattern overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#32620e]/30"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#c1440e]/30"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#32620e]/30"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#c1440e]/30"></div>
                {/* Center connection */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-[#32620e]/20 rotate-45"></div>
              </div>

              {/* Scanning overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#32620e]/10 via-transparent to-[#c1440e]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

              {/* Content */}
              <div className="relative z-10 space-y-4">
                {/* Code identifier */}
                <div className="text-xs font-mono text-[#32620e]/50 tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.code}
                </div>

                <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-all duration-500 filter group-hover:drop-shadow-lg">
                  {item.icon}
                </div>

                <div className="space-y-3">
                  <span className="block text-[#32620e] font-semibold text-xl sm:text-2xl group-hover:text-[#c1440e] transition-colors duration-500 tracking-wide">
                    {item.label}
                  </span>
                  <p className="text-[#32620e]/60 text-sm sm:text-base font-light group-hover:text-[#32620e]/80 transition-colors duration-500 font-mono tracking-wide">
                    {item.description}
                  </p>
                </div>

                {/* Progress/loading bar */}
                <div className="w-full h-1 bg-[#32620e]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#32620e] via-[#c1440e] to-[#32620e] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 rounded-full shadow-lg shadow-[#c1440e]/50"></div>
                </div>
              </div>

              {/* Holographic border effect */}
              <div className="absolute inset-0 rounded-xl border border-[#c1440e]/0 group-hover:border-[#c1440e]/50 transition-all duration-700 shadow-lg shadow-transparent group-hover:shadow-[#c1440e]/20"></div>

              {/* Energy pulse on click */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#32620e]/20 to-[#c1440e]/20 transform scale-0 group-active:scale-100 group-active:opacity-75 transition-all duration-200 opacity-0"></div>
            </Link>
          ))}
        </div>

        {/* Futuristic footer */}
        <div className="relative space-y-6">
          {/* Digital signature */}
          <div className="flex items-center justify-center gap-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#32620e]/60 to-transparent flex-1 max-w-32 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#32620e]/60 rounded-full animate-ping"></div>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <div className="w-2 h-2 bg-[#32620e] animate-pulse"></div>
              <div
                className="w-1 h-1 bg-[#c1440e]/80 animate-pulse"
                style={{ animationDelay: '0.3s' }}
              ></div>
              <div
                className="w-2 h-2 bg-[#32620e] animate-pulse"
                style={{ animationDelay: '0.6s' }}
              ></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#32620e]/60 to-transparent flex-1 max-w-32 relative">
              <div
                className="absolute top-0 right-1/2 transform translate-x-1/2 w-2 h-2 bg-[#32620e]/60 rounded-full animate-ping"
                style={{ animationDelay: '1s' }}
              ></div>
            </div>
          </div>

          <div className="inline-flex items-center gap-3 text-[#32620e]/50 text-sm font-mono tracking-wider">
            <span>BY</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-[#32620e]/60 animate-pulse"></div>
              <span className="text-[#32620e]/70 font-semibold">MENIM GROUP</span>
              <div className="w-1 h-1 bg-[#c1440e]/60 animate-pulse"></div>
            </div>
            <span>EST 2025</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100vw);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </section>
  )
}
