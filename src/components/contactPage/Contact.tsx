/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react'
import FloatingDots from './FloatingDots'

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dynamicFormData, setDynamicFormData] = useState<any>(null)

  useEffect(() => {
    setIsLoaded(true)

    // Load dynamic form data
    fetch('/api/get-form')
      .then((res) => res.json())
      .then((data) => setDynamicFormData(data))
      .catch(() => console.error('Could not load form data'))

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('')

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      let payload

      if (dynamicFormData) {
        // Use dynamic form submission if available
        payload = {
          form: dynamicFormData.id,
          submissionData: [
            { field: 'name', value: formData.name },
            { field: 'email', value: formData.email },
            { field: 'phone', value: formData.phone },
            { field: 'message', value: formData.message },
          ],
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/form-submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          throw new Error('Form submission failed')
        }
      } else {
        // Fallback to static form submission
        payload = formData

        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          throw new Error('Form submission failed')
        }
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        message: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ form: 'There was a problem submitting your form. Please try again.' })
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email System',
      detail: 'info@liinke.com',
      description: 'Primary communication channel',
      code: 'EML-001',
    },
    {
      icon: '📱',
      title: 'Communication Link',
      detail: '+254 700 000 000',
      description: 'Direct voice connection',
      code: 'PHN-002',
    },

    {
      icon: '🕐',
      title: 'Operational Hours',
      detail: '24/7 Digital Presence',
      description: 'Always online, always available',
      code: 'OPR-004',
    },
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
              COMMUNICATION READY
            </span>
            <div
              className="w-2 h-2 bg-[#c1440e] rounded-full animate-pulse shadow-lg shadow-[#c1440e]/50"
              style={{ animationDelay: '0.5s' }}
            ></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-[#32620e] mb-6 tracking-tight leading-[1.1] relative">
            <span className="relative font-bold bg-gradient-to-r from-[#c1440e] via-[#c1440e]/90 to-[#32620e] bg-clip-text text-transparent">
              Connect with Liinke
              <div className="absolute inset-0 bg-gradient-to-r from-[#c1440e]/20 to-[#32620e]/20 blur-sm animate-pulse opacity-50"></div>
              <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c1440e]/80 to-transparent"></div>
            </span>
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl font-light text-[#32620e]/90 tracking-[0.2em] font-mono">
            ESTABLISH.COMMUNICATION.PROTOCOL
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-2xl p-8 relative overflow-hidden">
              {/* Circuit board pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#32620e]/30"></div>
                <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#c1440e]/30"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#32620e]/30"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#c1440e]/30"></div>
              </div>

              <div className="relative z-10">
                <div className="text-xs font-mono text-[#32620e]/50 tracking-wider mb-6">
                  TRANSMISSION-FORM-001
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-8 tracking-wide">
                  Send Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="block text-[#32620e]/80 font-mono text-sm tracking-wide uppercase">
                      Identification Code
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-white/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 font-mono ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                          : 'border-[#32620e]/30 focus:border-[#c1440e]/60 focus:ring-[#c1440e]/20'
                      }`}
                      placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-red-500 text-sm font-mono">{errors.name}</p>}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-[#32620e]/80 font-mono text-sm tracking-wide uppercase">
                      Email Protocol
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-white/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 font-mono ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                          : 'border-[#32620e]/30 focus:border-[#c1440e]/60 focus:ring-[#c1440e]/20'
                      }`}
                      placeholder="your.email@domain.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm font-mono">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="block text-[#32620e]/80 font-mono text-sm tracking-wide uppercase">
                      Voice Channel
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 border border-[#32620e]/30 rounded-lg focus:border-[#c1440e]/60 focus:outline-none focus:ring-2 focus:ring-[#c1440e]/20 transition-all duration-300 font-mono"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label className="block text-[#32620e]/80 font-mono text-sm tracking-wide uppercase">
                      Message Payload
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 bg-white/50 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 resize-none font-mono ${
                        errors.message
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                          : 'border-[#32620e]/30 focus:border-[#c1440e]/60 focus:ring-[#c1440e]/20'
                      }`}
                      placeholder="Describe your property needs or inquiry..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm font-mono">{errors.message}</p>
                    )}
                  </div>

                  {/* Form-level error */}
                  {errors.form && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 font-mono text-sm">{errors.form}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-[#32620e] to-[#c1440e] text-white py-4 px-6 rounded-lg font-mono font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-2xl hover:shadow-[#32620e]/30 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#c1440e] to-[#32620e] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <span>Send Transmission</span>
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </>
                      )}
                    </div>
                  </button>

                  {/* Status Message */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-[#32620e]/10 border border-[#32620e]/30 rounded-lg">
                      <div className="flex items-center gap-3 text-[#32620e] font-mono">
                        <div className="w-2 h-2 bg-[#32620e] rounded-full animate-pulse"></div>
                        <span className="text-sm tracking-wide">
                          TRANSMISSION SUCCESSFUL - RESPONSE INCOMING
                        </span>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-3 text-red-600 font-mono">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm tracking-wide">
                          TRANSMISSION FAILED - RETRY REQUIRED
                        </span>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="space-y-6">
              <div className="text-xs font-mono text-[#32620e]/50 tracking-wider mb-6">
                CONTACT-PROTOCOLS-ACTIVE
              </div>

              <h3 className="text-2xl md:text-3xl font-semibold text-[#32620e] mb-8 tracking-wide">
                Direct Communication Channels
              </h3>

              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div
                    key={method.title}
                    className="group relative bg-white/60 backdrop-blur-xl border border-[#32620e]/30 rounded-xl p-6 hover:border-[#c1440e]/60 transition-all duration-700 hover:shadow-2xl hover:shadow-[#32620e]/20 transform hover:scale-105"
                    style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
                  >
                    {/* Circuit overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                      <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[#32620e]/30"></div>
                      <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-[#c1440e]/30"></div>
                      <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-[#32620e]/30"></div>
                      <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[#c1440e]/30"></div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl group-hover:scale-110 transition-all duration-500 filter group-hover:drop-shadow-lg">
                          {method.icon}
                        </div>

                        <div className="flex-1">
                          <div className="text-xs font-mono text-[#32620e]/50 tracking-wider mb-2">
                            {method.code}
                          </div>

                          <h4 className="text-[#32620e] font-semibold text-lg mb-1 group-hover:text-[#c1440e] transition-colors duration-500">
                            {method.title}
                          </h4>

                          <div className="text-[#32620e]/90 font-mono text-lg mb-2">
                            {method.detail}
                          </div>

                          <p className="text-[#32620e]/70 text-sm font-mono group-hover:text-[#32620e]/90 transition-colors duration-500">
                            {method.description}
                          </p>
                        </div>
                      </div>

                      {/* Connection indicator */}
                      <div className="flex items-center gap-2 mt-4">
                        <div className="w-2 h-2 bg-[#32620e] rounded-full animate-pulse"></div>
                        <div className="h-px bg-gradient-to-r from-[#32620e]/60 to-transparent flex-1"></div>
                        <span className="text-[#32620e]/50 font-mono text-xs tracking-wider">
                          ACTIVE
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
