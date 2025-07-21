'use client'
import React, { useState, useEffect } from 'react'

export default function TermsOfService() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]')
      let current = ''

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          current = section.getAttribute('data-section') || ''
        }
      })

      setActiveSection(current)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const lastUpdated = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const sections = [
    { id: 'acceptance', title: 'Terms Acceptance', code: 'ACC-001' },
    { id: 'services', title: 'Service Description', code: 'SRV-002' },
    { id: 'usage', title: 'Usage Guidelines', code: 'USG-003' },
    { id: 'property', title: 'Property Listings', code: 'PRP-004' },
    { id: 'liability', title: 'Liability Limits', code: 'LBL-005' },
    { id: 'termination', title: 'Termination Rights', code: 'TRM-006' },
    { id: 'contact', title: 'Legal Contact', code: 'LGL-007' },
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#f9f5f0] via-[#faf6f1] to-[#f8f4ef] px-4 sm:px-6 lg:px-8 py-26 md:py-30 overflow-hidden">
      {/* Background Effects */}
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

      {/* Floating Elements */}
      <div className="absolute inset-0 opacity-20">
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

        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-[#32620e]/60 to-[#c1440e]/60 rounded-full animate-float"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              transform: `translate(${(mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) * (0.01 + i * 0.002)}px, ${(mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) * (0.01 + i * 0.002)}px)`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c1440e]/60 to-transparent animate-scan"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-3 bg-black/10 backdrop-blur-xl border border-[#32620e]/30 rounded-full px-6 py-3 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#32620e]/5 via-transparent to-[#c1440e]/5"></div>
            <div className="w-2 h-2 bg-[#32620e] rounded-full animate-pulse shadow-lg shadow-[#32620e]/50"></div>
            <span className="text-[#32620e]/90 text-sm font-mono tracking-wider uppercase">
              LEGAL FRAMEWORK ACTIVE
            </span>
            <div
              className="w-2 h-2 bg-[#c1440e] rounded-full animate-pulse shadow-lg shadow-[#c1440e]/50"
              style={{ animationDelay: '0.5s' }}
            ></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-[#32620e] mb-6 tracking-tight leading-[1.1] relative">
            <span className="relative font-bold bg-gradient-to-r from-[#c1440e] via-[#c1440e]/90 to-[#32620e] bg-clip-text text-transparent">
              Terms of Service
              <div className="absolute inset-0 bg-gradient-to-r from-[#c1440e]/20 to-[#32620e]/20 blur-sm animate-pulse opacity-50"></div>
              <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c1440e]/80 to-transparent"></div>
            </span>
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl font-light text-[#32620e]/90 tracking-[0.2em] font-mono">
            LEGAL.TERMS.PROTOCOL
          </h2>

          <div className="mt-8 inline-flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-[#32620e]/20 rounded-full px-4 py-2">
            <div className="w-1.5 h-1.5 bg-[#32620e] rounded-full animate-pulse"></div>
            <span className="text-[#32620e]/80 text-sm font-mono">EFFECTIVE: {lastUpdated}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation */}
          <div
            className={`lg:col-span-1 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="sticky top-8 bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-6">
              <div className="text-xs font-mono text-[#32620e]/50 tracking-wider mb-4">
                LEGAL-INDEX
              </div>
              <h3 className="text-lg font-semibold text-[#32620e] mb-6">Sections</h3>
              <nav className="space-y-3">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block group transition-all duration-300 ${
                      activeSection === section.id
                        ? 'text-[#c1440e] border-l-2 border-[#c1440e] pl-3'
                        : 'text-[#32620e]/70 hover:text-[#32620e] hover:border-l-2 hover:border-[#32620e]/50 hover:pl-3'
                    }`}
                  >
                    <div className="text-xs font-mono tracking-wider opacity-60 mb-1">
                      {section.code}
                    </div>
                    <div className="font-medium text-sm">{section.title}</div>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="space-y-8">
              {/* Acceptance */}
              <div
                id="acceptance"
                data-section="acceptance"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#32620e]/30"></div>
                  <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#c1440e]/30"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      ACC-001
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Terms Acceptance
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      Welcome to Liinke. By accessing or using our property listing website, you
                      agree to be bound by these Terms of Service. If you do not agree to these
                      terms, please do not use our services.
                    </p>

                    <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                      <h4 className="font-semibold text-[#32620e] mb-2">Agreement Scope</h4>
                      <p className="text-[#32620e]/80 text-sm">
                        These terms apply to all visitors, users, and others who access or use our
                        website and services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div
                id="services"
                data-section="services"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      SRV-002
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Service Description
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      Liinke provides an online platform for browsing property listings. Our
                      services include property search functionality, location-based filtering, and
                      contact facilitation between users and property owners/agents.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#32620e] mb-2">✨ Core Features</h4>
                        <ul className="text-[#32620e]/80 text-sm space-y-1 list-none">
                          <li>• Property listing browsing</li>
                          <li>• Location-based search</li>
                          <li>• Contact form services</li>
                        </ul>
                      </div>
                      <div className="bg-[#c1440e]/5 border border-[#c1440e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#c1440e] mb-2">🔧 Platform Type</h4>
                        <p className="text-[#32620e]/80 text-sm">
                          Information service - we facilitate connections but are not a real estate
                          agent or broker.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Guidelines */}
              <div
                id="usage"
                data-section="usage"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      USG-003
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Usage Guidelines
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <div className="grid gap-4">
                      <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#32620e] mb-2 flex items-center gap-2">
                          <span>✅</span> Permitted Uses
                        </h4>
                        <ul className="text-[#32620e]/80 text-sm space-y-1 list-none">
                          <li>• Browse property listings for personal use</li>
                          <li>• Contact property owners/agents through our platform</li>
                          <li>• Use search and filtering features</li>
                        </ul>
                      </div>

                      <div className="bg-[#c1440e]/5 border border-[#c1440e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#c1440e] mb-2 flex items-center gap-2">
                          <span>❌</span> Prohibited Activities
                        </h4>
                        <ul className="text-[#32620e]/80 text-sm space-y-1 list-none">
                          <li>• Automated data scraping or harvesting</li>
                          <li>• Submitting false or misleading information</li>
                          <li>• Interfering with website functionality</li>
                          <li>• Using the service for illegal purposes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Listings */}
              <div
                id="property"
                data-section="property"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      PRP-004
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Property Listings
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      Property information is provided by third-party property owners, agents, and
                      brokers. Liinke serves as a platform for displaying this information but does
                      not guarantee its accuracy, completeness, or current availability.
                    </p>

                    <div className="bg-[#32620e]/10 border border-[#32620e]/30 rounded-lg p-4">
                      <h4 className="font-semibold text-[#32620e] mb-2">Important Notice</h4>
                      <p className="text-[#32620e]/80 text-sm">
                        Users should verify all property details directly with the property owner or
                        agent before making any decisions. Prices, availability, and property
                        details may change without notice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Liability */}
              <div
                id="liability"
                data-section="liability"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      LBL-005
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Liability Limits
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      Liinke provides its services &quot;as is&quot; without warranties of any kind.
                      We are not liable for any indirect, incidental, or consequential damages
                      arising from your use of our services.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#32620e] mb-2">Service Availability</h4>
                        <p className="text-[#32620e]/80 text-sm">
                          We strive for 99% uptime but cannot guarantee uninterrupted service
                          availability.
                        </p>
                      </div>
                      <div className="bg-[#c1440e]/5 border border-[#c1440e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#c1440e] mb-2">Third-Party Content</h4>
                        <p className="text-[#32620e]/80 text-sm">
                          We are not responsible for the accuracy of property information provided
                          by third parties.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Termination */}
              <div
                id="termination"
                data-section="termination"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      TRM-006
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Termination Rights
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      We reserve the right to terminate or suspend access to our services for users
                      who violate these terms or engage in prohibited activities.
                    </p>

                    <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                      <h4 className="font-semibold text-[#32620e] mb-2">User Rights</h4>
                      <p className="text-[#32620e]/80 text-sm">
                        You may discontinue using our services at any time. Since we don{"'"}t
                        require account registration, simply stop accessing our website.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div
                id="contact"
                data-section="contact"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      LGL-007
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Legal Contact
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      For questions about these terms or legal matters, contact us:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#32620e] mb-2 flex items-center gap-2">
                          <span>📧</span> Legal Department
                        </h4>
                        <div className="text-[#32620e]/90 font-mono text-sm">
                          liinkeapp@gmail.com
                        </div>
                      </div>
                      <div className="bg-[#c1440e]/5 border border-[#c1440e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#c1440e] mb-2 flex items-center gap-2">
                          <span>📱</span> Direct Line
                        </h4>
                        <div className="text-[#32620e]/90 font-mono text-sm">+254 792 149 918</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 bg-black/5 backdrop-blur-xl border border-[#32620e]/20 rounded-full px-6 py-3 mb-4">
                  <div className="w-2 h-2 bg-[#32620e] rounded-full animate-pulse"></div>
                  <span className="text-[#32620e]/70 text-sm font-mono tracking-wider">
                    END OF LEGAL FRAMEWORK
                  </span>
                  <div
                    className="w-2 h-2 bg-[#c1440e] rounded-full animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  ></div>
                </div>
                <p className="text-[#32620e]/60 font-mono text-sm">
                  These terms are effective as of {lastUpdated}
                </p>
              </div>
            </div>
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
