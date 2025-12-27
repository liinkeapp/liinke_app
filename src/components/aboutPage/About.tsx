'use client'
import React, { useState, useEffect } from 'react'
import FloatingDots from '../contactPage/FloatingDots'

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const features = [
    {
      icon: '🗺️',
      title: 'Interactive Mapping',
      description: 'Every property pinned with precision location data',
      code: 'MAP-001',
    },
    {
      icon: '🔍',
      title: 'Smart Discovery',
      description: 'Advanced filtering and search algorithms',
      code: 'SRC-002',
    },
    {
      icon: '⚡',
      title: 'Real-Time Updates',
      description: 'Live property availability and pricing',
      code: 'RTU-003',
    },
    {
      icon: '🏘️',
      title: 'Multi-Category',
      description: 'Rentals, houses, commercial spaces, and land',
      code: 'CAT-004',
    },
  ]

  const stats = [
    { value: '2025', label: 'Founded', suffix: '' },
    { value: '100', label: 'Properties Mapped', suffix: '+' },
    { value: '24', label: 'Hours Active', suffix: '/7' },
    { value: '99', label: 'Accuracy Rate', suffix: '%' },
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#f9f5f0] via-[#faf6f1] to-[#f8f4ef] px-4 sm:px-6 lg:px-8 py-26 md:py-30 overflow-hidden">
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
        />

        <div
          className="absolute top-32 right-20 w-20 h-20 border-2 border-[#c1440e]/50 transform -rotate-45 animate-spin"
          style={{ animationDuration: '15s', animationDirection: 'reverse' }}
        />

        {/* Floating orbs with mouse parallax */}
        <FloatingDots />

        {/* Scanning line effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c1440e]/60 to-transparent animate-scan"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* System status indicator */}
          <div className="inline-flex items-center gap-3 bg-black/10 backdrop-blur-xl border border-[#32620e]/30 rounded-full px-6 py-3 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#32620e]/5 via-transparent to-[#c1440e]/5"></div>
            <div className="w-2 h-2 bg-[#32620e] rounded-full animate-pulse shadow-lg shadow-[#32620e]/50"></div>
            <span className="text-[#32620e]/90 text-sm font-mono tracking-wider uppercase">
              SYSTEM ACTIVE
            </span>
            <div
              className="w-2 h-2 bg-[#c1440e] rounded-full animate-pulse shadow-lg shadow-[#c1440e]/50"
              style={{ animationDelay: '0.5s' }}
            ></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-[#32620e] mb-6 tracking-tight leading-[1.1] relative">
            <span className="relative font-bold bg-gradient-to-r from-[#c1440e] via-[#c1440e]/90 to-[#32620e] bg-clip-text text-transparent">
              About Liinke
              <div className="absolute inset-0 bg-gradient-to-r from-[#c1440e]/20 to-[#32620e]/20 blur-sm animate-pulse opacity-50"></div>
              <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c1440e]/80 to-transparent"></div>
            </span>
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl font-light text-[#32620e]/90 tracking-[0.2em] font-mono">
            REVOLUTIONIZING PROPERTY DISCOVERY
          </h2>
        </div>

        {/* Mission Section */}
        <div
          className={`mb-20 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Circuit board pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#32620e]/30"></div>
              <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#c1440e]/30"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#32620e]/30"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#c1440e]/30"></div>
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="text-xs font-mono text-[#32620e]/50 tracking-wider mb-6">
                MISSION-BRIEF-001
              </div>

              <h3 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-8 tracking-wide">
                Mapping Every Property, Connecting Every Dream.
              </h3>

              <div className="space-y-2 text-[#32620e]/80 text-lg md:text-lg font-light leading-relaxed font-mono">
                <p>
                  At Liinke, we believe finding the perfect property shouldn{"'"}t be a maze of
                  endless searches and outdated listings. Mapping transforms property discovery into
                  an intuitive, visual experience.
                </p>

                <p>
                  Every rental, house, commercial space, and plot of land is precisely pinned on our
                  interactive map, giving you the power to see exactly where opportunities exist in
                  real-time.
                </p>

                <p>
                  Founded in 2025 by Menim Group, we{"'"}re not just another property platform - we
                  {"'"}
                  re the future of real estate discovery.
                </p>
              </div>

              {/* Progress indicator */}
              <div className="mt-8 w-full h-1 bg-[#32620e]/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#32620e] via-[#c1440e] to-[#32620e] animate-pulse rounded-full shadow-lg shadow-[#c1440e]/50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div
          className={`mb-20 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-12">
            <div className="text-xs font-mono text-[#32620e]/50 tracking-wider mb-4">
              CORE-SYSTEMS-ONLINE
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold text-[#32620e] mb-4 tracking-wide">
              Advanced Property Intelligence
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-xl p-6 hover:border-[#c1440e]/60 transition-all duration-700 hover:shadow-2xl hover:shadow-[#32620e]/20 transform hover:scale-105 hover:-translate-y-2 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  animationDelay: `${index * 0.1 + 0.6}s`,
                  transitionDelay: `${index * 0.05}s`,
                }}
              >
                {/* Circuit overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[#32620e]/30"></div>
                  <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-[#c1440e]/30"></div>
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-[#32620e]/30"></div>
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[#c1440e]/30"></div>
                </div>

                <div className="relative z-10">
                  <div className="text-xs font-mono text-[#32620e]/50 tracking-wider mb-3">
                    {feature.code}
                  </div>

                  <div className="text-3xl mb-4 group-hover:scale-110 transition-all duration-500 filter group-hover:drop-shadow-lg">
                    {feature.icon}
                  </div>

                  <h4 className="text-[#32620e] font-semibold text-lg mb-3 group-hover:text-[#c1440e] transition-colors duration-500">
                    {feature.title}
                  </h4>

                  <p className="text-[#32620e]/70 text-sm font-mono group-hover:text-[#32620e]/90 transition-colors duration-500">
                    {feature.description}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full h-0.5 bg-[#32620e]/20 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-gradient-to-r from-[#32620e] to-[#c1440e] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`mb-20 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-[#32620e]/20 via-transparent to-[#c1440e]/20"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="text-xs font-mono text-[#32620e]/50 tracking-wider mb-4">
                  SYSTEM-METRICS
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-[#32620e] tracking-wide">
                  Platform Analytics
                </h3>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center group"
                    style={{ animationDelay: `${index * 0.2 + 0.8}s` }}
                  >
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#c1440e] mb-2 font-mono group-hover:scale-110 transition-transform duration-500">
                      {stat.value}
                      <span className="text-[#32620e]/60">{stat.suffix}</span>
                    </div>
                    <div className="text-[#32620e]/70 text-sm md:text-base font-mono tracking-wide uppercase">
                      {stat.label}
                    </div>

                    {/* Pulse indicator */}
                    <div className="flex justify-center mt-3">
                      <div className="w-2 h-2 bg-[#32620e] rounded-full animate-pulse shadow-lg shadow-[#32620e]/50"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div
          className={`text-center transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Digital divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-[#32620e]/60 to-transparent flex-1 max-w-32 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#32620e]/60 rounded-full animate-ping"></div>
            </div>
            <div className="w-4 h-4 border border-[#32620e]/60 transform rotate-45 relative">
              <div className="absolute inset-1 bg-gradient-to-br from-[#32620e]/40 to-[#c1440e]/40"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#32620e]/60 to-transparent flex-1 max-w-32 relative">
              <div
                className="absolute top-0 right-1/2 transform translate-x-1/2 w-2 h-2 bg-[#32620e]/60 rounded-full animate-ping"
                style={{ animationDelay: '1s' }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl md:text-2xl font-semibold text-[#32620e] tracking-wide">
              Ready to Discover Your Perfect Property?
            </h4>
            <p className="text-[#32620e]/70 font-mono text-sm md:text-base">
              Join the future of real estate exploration with Liinke
            </p>
          </div>

          {/* Digital signature */}
          <div className="mt-8 inline-flex items-center gap-3 text-[#32620e]/50 text-sm font-mono tracking-wider">
            <span>DEVELOPED BY</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-[#32620e]/60 animate-pulse"></div>
              <span className="text-[#32620e]/70 font-semibold">MENIM GROUP</span>
              <div className="w-1 h-1 bg-[#c1440e]/60 animate-pulse"></div>
            </div>
            <span>LAUNCHED 2025</span>
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
