'use client'

import React, { useEffect, useState } from 'react'

interface FloatingDot {
  id: number
  top: string
  left: string
  animationDuration: string
  delay: string
}

const FloatingDots: React.FC = () => {
  const [dots, setDots] = useState<FloatingDot[]>([])

  useEffect(() => {
    const newDots: FloatingDot[] = [...Array(6)].map((_, i) => ({
      id: i,
      top: `${20 + Math.random() * 60}%`,
      left: `${10 + Math.random() * 80}%`,
      animationDuration: `${3 + Math.random() * 2}s`,
      delay: `${i * 0.3}s`,
    }))
    setDots(newDots)
  }, [])

  return (
    <>
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute w-3 h-3 bg-gradient-to-r from-[#32620e]/60 to-[#c1440e]/60 rounded-full animate-float"
          style={{
            top: dot.top,
            left: dot.left,
            animationDelay: dot.delay,
            animationDuration: dot.animationDuration,
          }}
        />
      ))}
    </>
  )
}

export default FloatingDots
