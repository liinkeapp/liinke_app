'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiUser, FiHeart, FiPhone, FiMapPin, FiLayers, FiUsers } from 'react-icons/fi'
import { FaBuilding } from 'react-icons/fa'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const leftNavLinks = [
    { name: 'Rentals', href: '/rentals', icon: FaBuilding, special: false },
    { name: 'Land', href: '/land', icon: FiLayers, special: false },
    { name: 'Commercial', href: '/commercial', icon: FaBuilding, special: false },
    { name: 'Map', href: '/map', icon: FiMapPin, special: false },
  ]

  const rightNavLinks = [
    { name: 'Comrade', href: '/comrade', icon: FiUsers, special: true },
    { name: 'Contact', href: '/contact', icon: FiPhone, special: false },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#f9f5f0]/95 backdrop-blur-lg shadow-2xl border-b border-[#32620e]/10'
          : 'bg-[#f9f5f0] shadow-lg border-b-2 border-[#32620e]'
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {leftNavLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  link.special
                    ? 'text-[#c1440e] hover:text-white hover:bg-[#c1440e] hover:shadow-lg'
                    : 'text-[#32620e] hover:text-[#c1440e] hover:bg-[#32620e]/5'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <span className="flex items-center space-x-2">
                  <link.icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#c1440e] group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Centered Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group relative">
              <div className="relative transform transition-all duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-[#32620e] via-[#c1440e] to-[#32620e] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
                <Image
                  src="/lightlogo.png"
                  alt="Liinke Logo"
                  width={500}
                  height={500}
                  className="w-40 relative z-10 drop-shadow-sm"
                />
              </div>
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {rightNavLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  link.special
                    ? 'text-[#c1440e] hover:text-white hover:bg-[#c1440e] hover:shadow-lg bg-gradient-to-r from-[#c1440e]/10 to-[#32620e]/10 border border-[#c1440e]/30'
                    : 'text-[#32620e] hover:text-[#c1440e] hover:bg-[#32620e]/5'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <span className="flex items-center space-x-2">
                  <link.icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#c1440e] group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3 ml-6">
            <Link
              href="/favorites"
              className="group relative text-[#32620e] hover:text-[#c1440e] p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#32620e]/5"
            >
              <FiHeart className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#c1440e] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </Link>
            <Link
              href="/profile"
              className="group relative text-[#32620e] hover:text-[#c1440e] p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#32620e]/5"
            >
              <FiUser className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#c1440e] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </Link>
            <Link
              href="/list-property"
              className="group relative bg-gradient-to-r from-[#c1440e] to-[#c1440e]/80 text-white px-6 py-3 rounded-full text-sm font-medium hover:from-[#a23a0c] hover:to-[#c1440e] transition-all duration-300 hover:scale-105 hover:shadow-lg overflow-hidden"
            >
              <span className="relative z-10">List Property</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="group relative text-[#32620e] hover:text-[#c1440e] p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#32620e]/5"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-2 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}
                ></span>
                <span
                  className={`absolute top-3 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
                ></span>
                <span
                  className={`absolute top-4 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden absolute top-20 left-0 right-0 bg-[#f9f5f0]/95 backdrop-blur-lg shadow-2xl border-t border-[#32620e]/10 transform transition-all duration-300 ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-2 max-h-[80vh] overflow-y-auto">
          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            {[...leftNavLinks, ...rightNavLinks].map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:scale-[1.02] ${
                  link.special
                    ? 'text-[#c1440e] hover:text-white hover:bg-gradient-to-r hover:from-[#c1440e] hover:to-[#c1440e]/80 bg-gradient-to-r from-[#c1440e]/10 to-[#32620e]/10 border border-[#c1440e]/30'
                    : 'text-[#32620e] hover:text-[#c1440e] hover:bg-[#32620e]/5'
                }`}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
                {link.special && (
                  <span className="ml-auto text-xs bg-[#c1440e]/20 text-[#c1440e] px-2 py-1 rounded-full">
                    VIP
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Action Buttons */}
          <div className="border-t border-[#32620e]/10 pt-4 mt-4 space-y-3">
            <Link
              href="/favorites"
              className="flex items-center space-x-3 text-[#32620e] hover:text-[#c1440e] hover:bg-[#32620e]/5 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiHeart className="h-5 w-5" />
              <span>Favorites</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center space-x-3 text-[#32620e] hover:text-[#c1440e] hover:bg-[#32620e]/5 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiUser className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Link
              href="/list-property"
              className="group flex items-center justify-center bg-gradient-to-r from-[#c1440e] to-[#c1440e]/80 text-white px-4 py-3 rounded-xl text-base font-medium hover:from-[#a23a0c] hover:to-[#c1440e] transition-all duration-300 hover:scale-[1.02] mt-4 overflow-hidden relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10">List Property</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
