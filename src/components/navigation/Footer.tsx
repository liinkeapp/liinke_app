import Link from 'next/link'
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from 'react-icons/fi'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-[#32620e] text-[#f9f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/darklogo.png"
                alt="Liinke Logo"
                width={500}
                height={500}
                className="w-40 relative z-10 drop-shadow-sm"
              />
            </div>
            <p className="text-[#f9f5f0]/80 text-sm leading-relaxed">
              Your trusted partner in finding the perfect property. We connect buyers, sellers, and
              renters with quality real estate solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#f9f5f0]/60 hover:text-[#c1440e] transition-colors duration-200"
              >
                <FiFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[#f9f5f0]/60 hover:text-[#c1440e] transition-colors duration-200"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[#f9f5f0]/60 hover:text-[#c1440e] transition-colors duration-200"
              >
                <FiInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[#f9f5f0]/60 hover:text-[#c1440e] transition-colors duration-200"
              >
                <FiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#f9f5f0]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-[#f9f5f0]/80 hover:text-[#c1440e] text-sm transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-[#f9f5f0]/80 hover:text-[#c1440e] text-sm transition-colors duration-200"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-[#f9f5f0]/80 hover:text-[#c1440e] text-sm transition-colors duration-200"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#f9f5f0]/80 hover:text-[#c1440e] text-sm transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#f9f5f0]/80 hover:text-[#c1440e] text-sm transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#f9f5f0]">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/buy"
                  className="text-[#f9f5f0]/80 hover:text-[#c1440e] text-sm transition-colors duration-200"
                >
                  Buy Property
                </Link>
              </li>
              <li>
                <Link
                  href="/sell"
                  className="text-[#f9f5f0]/80 hover:text-[#c1440e] text-sm transition-colors duration-200"
                >
                  Sell Property
                </Link>
              </li>
              <li>
                <Link
                  href="/rent"
                  className="text-[#f9f5f0]/80 hover:text-[#c1440e] text-sm transition-colors duration-200"
                >
                  Rent Property
                </Link>
              </li>
              <li>
                <Link
                  href="/property-management"
                  className="text-[#f9f5f0]/80 hover:text-[#c1440e] text-sm transition-colors duration-200"
                >
                  Property Management
                </Link>
              </li>
              <li>
                <Link
                  href="/valuation"
                  className="text-[#f9f5f0]/80 hover:text-[#c1440e] text-sm transition-colors duration-200"
                >
                  Property Valuation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#f9f5f0]">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FiMapPin className="h-5 w-5 text-[#c1440e] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#f9f5f0]/80 text-sm">
                    123 Real Estate Ave
                    <br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="h-5 w-5 text-[#c1440e] flex-shrink-0" />
                <p className="text-[#f9f5f0]/80 text-sm">+254 700 123 456</p>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="h-5 w-5 text-[#c1440e] flex-shrink-0" />
                <p className="text-[#f9f5f0]/80 text-sm">info@liinke.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#f9f5f0]/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[#f9f5f0]/60 text-sm">© 2024 Liinke. All rights reserved.</div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-[#f9f5f0]/60 hover:text-[#c1440e] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-[#f9f5f0]/60 hover:text-[#c1440e] transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-[#f9f5f0]/60 hover:text-[#c1440e] transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
