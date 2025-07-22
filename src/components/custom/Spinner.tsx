'use client'
import React, { useState, useEffect } from 'react'

export default function Spinner() {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ''
        return prev + '.'
      })
    }, 500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(dotsInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#f9f5f0] via-[#faf6f1] to-[#f8f4ef] flex items-center justify-center overflow-hidden py-4 md:py-96">
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
        {/* Animated hexagon */}
        <div
          className="absolute top-20 left-20 w-20 h-20 border-2 border-[#32620e]/40 transform rotate-12 animate-spin"
          style={{
            animationDuration: '20s',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        />

        {/* Animated square */}
        <div
          className="absolute top-32 right-24 w-16 h-16 border-2 border-[#c1440e]/50 transform rotate-45 animate-spin"
          style={{ animationDuration: '15s', animationDirection: 'reverse' }}
        />

        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#32620e]/60 to-[#c1440e]/60 rounded-full animate-float"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Scanning line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c1440e]/60 to-transparent animate-scan"></div>
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* System status indicator */}
        <div className="inline-flex items-center gap-3 bg-black/10 backdrop-blur-xl border border-[#32620e]/30 rounded-full px-6 py-3 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#32620e]/5 via-transparent to-[#c1440e]/5"></div>
          <div className="w-2 h-2 bg-[#32620e] rounded-full animate-pulse shadow-lg shadow-[#32620e]/50"></div>
          <span className="text-[#32620e]/90 text-sm font-mono tracking-wider uppercase">
            INITIALIZING
          </span>
          <div
            className="w-2 h-2 bg-[#c1440e] rounded-full animate-pulse shadow-lg shadow-[#c1440e]/50"
            style={{ animationDelay: '0.5s' }}
          />
        </div>

        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-thin text-[#32620e] mb-4 tracking-tight relative animate-pulse-slow">
            <span className="relative font-bold bg-gradient-to-r from-[#c1440e] via-[#c1440e]/90 to-[#32620e] bg-clip-text text-transparent">
              Liinke
              {/* Holographic effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#c1440e]/20 to-[#32620e]/20 blur-sm animate-pulse opacity-50"></div>
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c1440e]/80 to-transparent"></div>
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-lg font-light text-[#32620e]/90 tracking-[0.2em] font-mono">
            PIN.DISCOVER.LIINKE
          </p>
        </div>

        {/* Loading animation */}
        <div className="space-y-6">
          {/* Circular loading indicator */}
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 border-4 border-[#32620e]/20 rounded-full"></div>
            <div
              className="absolute inset-0 border-4 border-transparent border-t-[#32620e] border-r-[#c1440e] rounded-full animate-spin"
              style={{ animationDuration: '1.2s' }}
            ></div>
            <div
              className="absolute inset-2 border-2 border-transparent border-t-[#c1440e] border-l-[#32620e] rounded-full animate-spin"
              style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}
            ></div>

            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-[#32620e] to-[#c1440e] rounded-full animate-pulse"></div>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-[#32620e]/60 tracking-wider">LOADING</span>
              <span className="text-xs font-mono text-[#32620e]/60 tracking-wider">
                {Math.min(100, Math.floor(progress))}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#32620e]/20 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#32620e] via-[#c1440e] to-[#32620e] rounded-full transition-all duration-300 ease-out relative"
                style={{
                  width: `${Math.min(100, progress)}%`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Loading text */}
          <div className="text-center">
            <span className="text-[#32620e]/60 text-sm font-mono tracking-wider">
              Loading your real estate experience{dots}
            </span>
          </div>

          {/* Digital signature */}
          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="h-px bg-gradient-to-r from-transparent via-[#32620e]/40 to-transparent flex-1 max-w-16"></div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#32620e]/50">
              <div className="w-1 h-1 bg-[#32620e] animate-pulse"></div>
              <span>MENIM GROUP</span>
              <div className="w-1 h-1 bg-[#c1440e] animate-pulse"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#32620e]/40 to-transparent flex-1 max-w-16"></div>
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
            transform: translateY(-8px) rotate(180deg);
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
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
