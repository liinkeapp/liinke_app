'use client'
import React, { useState, useEffect } from 'react'

export default function PrivacyPolicy() {
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
    { id: 'overview', title: 'Data Collection Overview', code: 'DCP-001' },
    { id: 'location', title: 'Location Services', code: 'LOC-002' },
    { id: 'cookies', title: 'Tracking Technologies', code: 'TRK-003' },
    { id: 'contact', title: 'Communication Data', code: 'COM-004' },
    { id: 'sharing', title: 'Data Sharing Protocol', code: 'SHR-005' },
    { id: 'security', title: 'Security Measures', code: 'SEC-006' },
    { id: 'rights', title: 'User Rights', code: 'USR-007' },
    { id: 'contact-us', title: 'Contact Information', code: 'CNT-008' },
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

        {[...Array(6)].map((_, i) => (
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
        {/* Header Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-3 bg-black/10 backdrop-blur-xl border border-[#32620e]/30 rounded-full px-6 py-3 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#32620e]/5 via-transparent to-[#c1440e]/5"></div>
            <div className="w-2 h-2 bg-[#32620e] rounded-full animate-pulse shadow-lg shadow-[#32620e]/50"></div>
            <span className="text-[#32620e]/90 text-sm font-mono tracking-wider uppercase">
              PRIVACY PROTOCOLS ACTIVE
            </span>
            <div
              className="w-2 h-2 bg-[#c1440e] rounded-full animate-pulse shadow-lg shadow-[#c1440e]/50"
              style={{ animationDelay: '0.5s' }}
            ></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-[#32620e] mb-6 tracking-tight leading-[1.1] relative">
            <span className="relative font-bold bg-gradient-to-r from-[#c1440e] via-[#c1440e]/90 to-[#32620e] bg-clip-text text-transparent">
              Privacy Policy
              <div className="absolute inset-0 bg-gradient-to-r from-[#c1440e]/20 to-[#32620e]/20 blur-sm animate-pulse opacity-50"></div>
              <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c1440e]/80 to-transparent"></div>
            </span>
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl font-light text-[#32620e]/90 tracking-[0.2em] font-mono">
            DATA.PROTECTION.PROTOCOL
          </h2>

          <div className="mt-8 inline-flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-[#32620e]/20 rounded-full px-4 py-2">
            <div className="w-1.5 h-1.5 bg-[#32620e] rounded-full animate-pulse"></div>
            <span className="text-[#32620e]/80 text-sm font-mono">LAST UPDATED: {lastUpdated}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div
            className={`lg:col-span-1 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="sticky top-8 bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-6 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#32620e]/30"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#c1440e]/30"></div>
              </div>

              <div className="relative z-10">
                <div className="text-xs font-mono text-[#32620e]/50 tracking-wider mb-4">
                  NAVIGATION-INDEX
                </div>

                <h3 className="text-lg font-semibold text-[#32620e] mb-6">Contents</h3>

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
          </div>

          {/* Content Area */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="space-y-8">
              {/* Overview Section */}
              <div
                id="overview"
                data-section="overview"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#32620e]/30"></div>
                  <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#c1440e]/30"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      DCP-001
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Data Collection Overview
                  </h2>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-[#32620e]/90 leading-relaxed mb-4">
                      At Liinke, we are committed to protecting your privacy while providing you
                      with an exceptional property browsing experience. This privacy policy explains
                      how we collect, use, and protect your information when you visit our website.
                    </p>
                    <p className="text-[#32620e]/90 leading-relaxed mb-4">
                      We operate on a minimal data collection principle - we only collect
                      information that is necessary to provide you with relevant property listings
                      and improve your browsing experience.
                    </p>
                    <p className="text-[#32620e]/90 leading-relaxed">
                      <strong>Key Information:</strong> Our website does not require user
                      registration or login. You can browse property listings anonymously without
                      creating an account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Services Section */}
              <div
                id="location"
                data-section="location"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#32620e]/30"></div>
                  <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#c1440e]/30"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      LOC-002
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Location Services
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      <strong>Location Data Collection:</strong> We may request access to your
                      device{"'"}s location to show you property listings near your current
                      location. This feature is entirely optional and requires your explicit
                      consent.
                    </p>

                    <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                      <h4 className="font-semibold text-[#32620e] mb-2">
                        How we use location data:
                      </h4>
                      <ul className="text-[#32620e]/80 space-y-2 list-none">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#32620e] rounded-full mt-2"></div>
                          <span>Display properties within your preferred radius</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#32620e] rounded-full mt-2"></div>
                          <span>Calculate distances to points of interest</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#32620e] rounded-full mt-2"></div>
                          <span>Provide location-based search suggestions</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-[#32620e]/90 leading-relaxed">
                      <strong>Google Maps Integration:</strong> We use Google Maps services to
                      display property locations and provide mapping functionality. When you
                      interact with maps on our site, Google may collect certain data as outlined in
                      their privacy policy.
                    </p>

                    <p className="text-[#32620e]/90 leading-relaxed">
                      <strong>Your Control:</strong> You can disable location services at any time
                      through your browser settings. Disabling location services will not affect
                      your ability to browse properties, but you may need to manually enter location
                      preferences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cookies and Tracking */}
              <div
                id="cookies"
                data-section="cookies"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#32620e]/30"></div>
                  <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#c1440e]/30"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      TRK-003
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Tracking Technologies
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      We use cookies and similar technologies to enhance your browsing experience
                      and analyze website usage patterns.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#32620e] mb-2">Essential Cookies</h4>
                        <p className="text-[#32620e]/80 text-sm">
                          Required for basic website functionality, including remembering your
                          preferences and maintaining session state.
                        </p>
                      </div>
                      <div className="bg-[#c1440e]/5 border border-[#c1440e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#c1440e] mb-2">Analytics Cookies</h4>
                        <p className="text-[#32620e]/80 text-sm">
                          Help us understand how visitors interact with our website to improve user
                          experience and site performance.
                        </p>
                      </div>
                    </div>

                    <p className="text-[#32620e]/90 leading-relaxed">
                      <strong>Third-Party Services:</strong> We may use Google Analytics and other
                      analytics services to understand website usage. These services may set their
                      own cookies and have their own privacy policies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Communication Data */}
              <div
                id="contact"
                data-section="contact"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#c1440e]/30"></div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#32620e]/30"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      COM-004
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Communication Data
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      When you contact us through our contact form or other communication channels,
                      we collect and process the following information:
                    </p>

                    <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                      <h4 className="font-semibold text-[#32620e] mb-2">Information We Collect:</h4>
                      <ul className="text-[#32620e]/80 space-y-1 list-none">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#32620e] rounded-full mt-2"></div>
                          <span>Name and contact details (email, phone number)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#32620e] rounded-full mt-2"></div>
                          <span>Property inquiry details and preferences</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#32620e] rounded-full mt-2"></div>
                          <span>Any additional information you choose to provide</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-[#32620e]/90 leading-relaxed">
                      <strong>Purpose:</strong> This information is used solely to respond to your
                      inquiries, provide property information, and facilitate communication
                      regarding your property interests.
                    </p>

                    <p className="text-[#32620e]/90 leading-relaxed">
                      <strong>Retention:</strong> We retain communication data for as long as
                      necessary to provide our services and comply with legal obligations, typically
                      not exceeding 3 years unless required by law.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Sharing */}
              <div
                id="sharing"
                data-section="sharing"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#32620e]/30"></div>
                  <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#c1440e]/30"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      SHR-005
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Data Sharing Protocol
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      We do not sell, rent, or trade your personal information to third parties.
                      However, we may share limited information in the following circumstances:
                    </p>

                    <div className="grid gap-4">
                      <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#32620e] mb-2">Service Providers</h4>
                        <p className="text-[#32620e]/80 text-sm">
                          Trusted third-party services that help us operate our website, such as
                          hosting providers, analytics services, and email services.
                        </p>
                      </div>

                      <div className="bg-[#c1440e]/5 border border-[#c1440e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#c1440e] mb-2">Property Partners</h4>
                        <p className="text-[#32620e]/80 text-sm">
                          When you express interest in a specific property, we may share your
                          contact information with the relevant property owner or agent to
                          facilitate communication.
                        </p>
                      </div>

                      <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#32620e] mb-2">Legal Requirements</h4>
                        <p className="text-[#32620e]/80 text-sm">
                          When required by law, regulation, or legal process, or to protect the
                          rights, property, or safety of our users or others.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div
                id="security"
                data-section="security"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#c1440e]/30"></div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#32620e]/30"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      SEC-006
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Security Measures
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      We implement appropriate technical and organizational security measures to
                      protect your personal information against unauthorized access, alteration,
                      disclosure, or destruction.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-3">
                          <h5 className="font-semibold text-[#32620e] text-sm mb-1">
                            🔐 Encryption
                          </h5>
                          <p className="text-[#32620e]/80 text-xs">
                            SSL/TLS encryption for data transmission
                          </p>
                        </div>
                        <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-3">
                          <h5 className="font-semibold text-[#32620e] text-sm mb-1">
                            🛡️ Access Control
                          </h5>
                          <p className="text-[#32620e]/80 text-xs">
                            Restricted access to personal data
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-[#c1440e]/5 border border-[#c1440e]/20 rounded-lg p-3">
                          <h5 className="font-semibold text-[#c1440e] text-sm mb-1">
                            📊 Monitoring
                          </h5>
                          <p className="text-[#32620e]/80 text-xs">
                            Regular security audits and monitoring
                          </p>
                        </div>
                        <div className="bg-[#c1440e]/5 border border-[#c1440e]/20 rounded-lg p-3">
                          <h5 className="font-semibold text-[#c1440e] text-sm mb-1">💾 Backup</h5>
                          <p className="text-[#32620e]/80 text-xs">
                            Secure data backup and recovery procedures
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-[#32620e]/90 leading-relaxed">
                      While we strive to protect your personal information, no method of
                      transmission over the internet or electronic storage is 100% secure. We cannot
                      guarantee absolute security but continuously work to improve our security
                      measures.
                    </p>
                  </div>
                </div>
              </div>

              {/* User Rights */}
              <div
                id="rights"
                data-section="rights"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#32620e]/30"></div>
                  <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#c1440e]/30"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      USR-007
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Your Rights
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      You have certain rights regarding your personal information. Since our website
                      doesn{"'"}t require registration, most data is processed on a minimal basis,
                      but you still maintain the following rights:
                    </p>

                    <div className="grid gap-4">
                      <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#32620e] mb-2 flex items-center gap-2">
                          <span>📋</span> Right to Information
                        </h4>
                        <p className="text-[#32620e]/80 text-sm">
                          You have the right to know what personal data we collect and how we use
                          it, as outlined in this privacy policy.
                        </p>
                      </div>

                      <div className="bg-[#c1440e]/5 border border-[#c1440e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#c1440e] mb-2 flex items-center gap-2">
                          <span>🔍</span> Right of Access
                        </h4>
                        <p className="text-[#32620e]/80 text-sm">
                          You can request copies of any personal data we hold about you, such as
                          contact form submissions.
                        </p>
                      </div>

                      <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#32620e] mb-2 flex items-center gap-2">
                          <span>✏️</span> Right to Rectification
                        </h4>
                        <p className="text-[#32620e]/80 text-sm">
                          You can request that we correct any inaccurate or incomplete personal data
                          we hold about you.
                        </p>
                      </div>

                      <div className="bg-[#c1440e]/5 border border-[#c1440e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#c1440e] mb-2 flex items-center gap-2">
                          <span>🗑️</span> Right to Erasure
                        </h4>
                        <p className="text-[#32620e]/80 text-sm">
                          You can request that we delete your personal data, subject to certain
                          legal obligations.
                        </p>
                      </div>

                      <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#32620e] mb-2 flex items-center gap-2">
                          <span>⏸️</span> Right to Restrict Processing
                        </h4>
                        <p className="text-[#32620e]/80 text-sm">
                          You can request that we limit how we use your personal data in certain
                          circumstances.
                        </p>
                      </div>

                      <div className="bg-[#c1440e]/5 border border-[#c1440e]/20 rounded-lg p-4">
                        <h4 className="font-semibold text-[#c1440e] mb-2 flex items-center gap-2">
                          <span>🚫</span> Right to Object
                        </h4>
                        <p className="text-[#32620e]/80 text-sm">
                          You can object to certain types of processing, including location tracking
                          and marketing communications.
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#32620e]/10 border border-[#32620e]/30 rounded-lg p-4 mt-6">
                      <h4 className="font-semibold text-[#32620e] mb-2">
                        How to Exercise Your Rights
                      </h4>
                      <p className="text-[#32620e]/80 text-sm">
                        To exercise any of these rights, please contact us using the information
                        provided in the &quot;Contact Information&quot; section below. We will
                        respond to your request within 30 days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div
                id="contact-us"
                data-section="contact-us"
                className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#c1440e]/30"></div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#32620e]/30"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      CNT-008
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Contact Information
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      If you have any questions about this privacy policy, need to exercise your
                      rights, or have concerns about how we handle your personal data, please
                      contact us:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-6">
                        <h4 className="font-semibold text-[#32620e] mb-4 flex items-center gap-2">
                          <span>📧</span> Privacy Officer
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-mono text-[#32620e]/50 mb-1">
                              EMAIL PROTOCOL
                            </div>
                            <div className="text-[#32620e]/90 font-mono">liinkeapp@gmail.com</div>
                          </div>
                          <div>
                            <div className="text-xs font-mono text-[#32620e]/50 mb-1">
                              SUBJECT LINE
                            </div>
                            <div className="text-[#32620e]/90 font-mono text-sm">
                              &quot;PRIVACY INQUIRY - [YOUR REQUEST]&quot;
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#c1440e]/5 border border-[#c1440e]/20 rounded-lg p-6">
                        <h4 className="font-semibold text-[#c1440e] mb-4 flex items-center gap-2">
                          <span>📱</span> Direct Line
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-mono text-[#32620e]/50 mb-1">
                              VOICE CHANNEL
                            </div>
                            <div className="text-[#32620e]/90 font-mono">+254 792 149 918</div>
                          </div>
                          <div>
                            <div className="text-xs font-mono text-[#32620e]/50 mb-1">
                              OPERATIONAL HOURS
                            </div>
                            <div className="text-[#32620e]/90 font-mono text-sm">
                              24/7 Digital Presence
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#32620e]/10 border border-[#32620e]/30 rounded-lg p-4 mt-6">
                      <h4 className="font-semibold text-[#32620e] mb-2">Response Timeline</h4>
                      <p className="text-[#32620e]/80 text-sm">
                        We aim to respond to all privacy-related inquiries within 48 hours. For
                        complex requests requiring investigation, we may need up to 30 days as
                        permitted by applicable privacy laws.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Changes to Policy */}
              <div className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#32620e]/30"></div>
                  <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#c1440e]/30"></div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#32620e]/30"></div>
                  <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#c1440e]/30"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-mono text-[#32620e]/50 tracking-wider">
                      UPD-009
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-6">
                    Policy Updates
                  </h2>

                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-[#32620e]/90 leading-relaxed">
                      We may update this privacy policy from time to time to reflect changes in our
                      practices, technology, legal requirements, or other factors. When we make
                      significant changes, we will notify you by:
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">🌐</div>
                        <h5 className="font-semibold text-[#32620e] mb-2">Website Notice</h5>
                        <p className="text-[#32620e]/80 text-sm">Prominent notice on our website</p>
                      </div>

                      <div className="bg-[#c1440e]/5 border border-[#c1440e]/20 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">📧</div>
                        <h5 className="font-semibold text-[#c1440e] mb-2">Email Notification</h5>
                        <p className="text-[#32620e]/80 text-sm">
                          If you{"'"}ve contacted us previously
                        </p>
                      </div>

                      <div className="bg-[#32620e]/5 border border-[#32620e]/20 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">📅</div>
                        <h5 className="font-semibold text-[#32620e] mb-2">Updated Date</h5>
                        <p className="text-[#32620e]/80 text-sm">
                          Revision timestamp at top of policy
                        </p>
                      </div>
                    </div>

                    <p className="text-[#32620e]/90 leading-relaxed">
                      Your continued use of our website after the effective date of any changes
                      constitutes your acceptance of the updated privacy policy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 bg-black/5 backdrop-blur-xl border border-[#32620e]/20 rounded-full px-6 py-3 mb-4">
                  <div className="w-2 h-2 bg-[#32620e] rounded-full animate-pulse"></div>
                  <span className="text-[#32620e]/70 text-sm font-mono tracking-wider">
                    END OF PRIVACY PROTOCOL
                  </span>
                  <div
                    className="w-2 h-2 bg-[#c1440e] rounded-full animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  ></div>
                </div>

                <p className="text-[#32620e]/60 font-mono text-sm">
                  This policy is effective as of {lastUpdated}
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
