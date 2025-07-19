'use client'
import React, { useState } from 'react'

interface ContactFormProps {
  propertyTitle: string
}

export function ContactForm({ propertyTitle }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in ${propertyTitle}`,
  })

  const [focused, setFocused] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (isSubmitting || !formData.name || !formData.email) return

    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('Form submitted:', formData)
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFocus = (fieldName: string) => {
    setFocused(fieldName)
  }

  const handleBlur = () => {
    setFocused(null)
  }

  return (
    <div className="relative">
      {/* Decorative background elements */}
      <div className="absolute -inset-4 bg-gradient-to-br from-[#32620e]/5 to-[#c1440e]/5 rounded-3xl blur-xl"></div>

      <div className="bg-white rounded-3xl shadow-2xl border border-[#32620e]/10 overflow-hidden sticky top-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#32620e]/5 to-[#c1440e]/5 px-8 py-6 border-b border-[#32620e]/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#32620e]/10 rounded-xl">
              <svg
                className="w-6 h-6 text-[#32620e]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#32620e] mb-1">Get in Touch</h3>
              <p className="text-[#32620e]/60 text-sm">We{"'"}ll respond within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Name Field */}
            <div className="relative group">
              <label
                className={`absolute left-6 transition-all duration-200 pointer-events-none ${
                  focused === 'name' || formData.name
                    ? '-top-2 left-4 text-xs text-[#32620e] bg-white px-2'
                    : 'top-4 text-[#32620e]/60'
                }`}
              >
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                className="w-full px-6 py-4 border-2 border-[#32620e]/20 rounded-xl focus:outline-none focus:border-[#32620e] transition-all duration-200 bg-gradient-to-r from-transparent to-[#32620e]/[0.02] group-hover:border-[#32620e]/30"
                required
              />
              <div
                className={`absolute right-4 top-4 transition-opacity duration-200 ${formData.name ? 'opacity-100' : 'opacity-0'}`}
              >
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Email Field */}
            <div className="relative group">
              <label
                className={`absolute left-6 transition-all duration-200 pointer-events-none ${
                  focused === 'email' || formData.email
                    ? '-top-2 left-4 text-xs text-[#32620e] bg-white px-2'
                    : 'top-4 text-[#32620e]/60'
                }`}
              >
                Your Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                className="w-full px-6 py-4 border-2 border-[#32620e]/20 rounded-xl focus:outline-none focus:border-[#32620e] transition-all duration-200 bg-gradient-to-r from-transparent to-[#32620e]/[0.02] group-hover:border-[#32620e]/30"
                required
              />
              <div
                className={`absolute right-4 top-4 transition-opacity duration-200 ${formData.email ? 'opacity-100' : 'opacity-0'}`}
              >
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Phone Field */}
            <div className="relative group">
              <label
                className={`absolute left-6 transition-all duration-200 pointer-events-none ${
                  focused === 'phone' || formData.phone
                    ? '-top-2 left-4 text-xs text-[#32620e] bg-white px-2'
                    : 'top-4 text-[#32620e]/60'
                }`}
              >
                Your Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFocus('phone')}
                onBlur={handleBlur}
                className="w-full px-6 py-4 border-2 border-[#32620e]/20 rounded-xl focus:outline-none focus:border-[#32620e] transition-all duration-200 bg-gradient-to-r from-transparent to-[#32620e]/[0.02] group-hover:border-[#32620e]/30"
              />
              <div
                className={`absolute right-4 top-4 transition-opacity duration-200 ${formData.phone ? 'opacity-100' : 'opacity-0'}`}
              >
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Message Field */}
            <div className="relative group">
              <label
                className={`absolute left-6 transition-all duration-200 pointer-events-none ${
                  focused === 'message' || formData.message
                    ? '-top-2 left-4 text-xs text-[#32620e] bg-white px-2'
                    : 'top-4 text-[#32620e]/60'
                }`}
              >
                Your Message
              </label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                className="w-full px-6 py-4 border-2 border-[#32620e]/20 rounded-xl focus:outline-none focus:border-[#32620e] resize-none transition-all duration-200 bg-gradient-to-r from-transparent to-[#32620e]/[0.02] group-hover:border-[#32620e]/30"
              />
              <div className="absolute bottom-4 right-4 text-xs text-[#32620e]/50">
                {formData.message.length}/500
              </div>
            </div>

            {/* Submit Button */}
            <div
              onClick={handleSubmit}
              className={`relative w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform overflow-hidden group cursor-pointer ${
                isSubmitting
                  ? 'bg-[#32620e]/20 text-[#32620e]/60 cursor-not-allowed pointer-events-none'
                  : 'bg-gradient-to-r from-[#c1440e] to-[#32620e] hover:from-[#c1440e]/90 hover:to-[#32620e]/90 text-white hover:scale-105 hover:shadow-xl'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#32620e]/30 border-t-[#32620e] rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <svg
                      className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Section */}
        <div className="border-t border-[#32620e]/10 bg-gradient-to-br from-[#32620e]/[0.02] to-[#c1440e]/[0.02] p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#32620e]/10 rounded-xl">
              <svg
                className="w-5 h-5 text-[#32620e]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 className="font-bold text-[#32620e] text-lg">Quick Contact</h4>
          </div>

          <div className="grid gap-3">
            {/* Call Button */}
            <a
              href="tel:+254700000000"
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#32620e]/20 hover:border-[#32620e]/40 hover:bg-[#32620e]/5 transition-all duration-200 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#32620e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-3 bg-[#32620e]/10 rounded-full group-hover:bg-[#32620e]/20 group-hover:scale-110 transition-all duration-200">
                <svg className="w-5 h-5 text-[#32620e]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div className="relative">
                <span className="text-[#32620e] font-semibold">Call Now</span>
                <p className="text-[#32620e]/60 text-sm">+254 700 000 000</p>
              </div>
              <div className="relative ml-auto">
                <svg
                  className="w-5 h-5 text-[#32620e]/40 group-hover:text-[#32620e] group-hover:translate-x-1 transition-all duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </a>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/254700000000?text=I'm interested in ${encodeURIComponent(propertyTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#32620e]/20 hover:border-[#32620e]/40 hover:bg-[#32620e]/5 transition-all duration-200 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#c1440e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-3 bg-[#c1440e]/10 rounded-full group-hover:bg-[#c1440e]/20 group-hover:scale-110 transition-all duration-200">
                <svg className="w-5 h-5 text-[#c1440e]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" />
                </svg>
              </div>
              <div className="relative">
                <span className="text-[#32620e] font-semibold">WhatsApp</span>
                <p className="text-[#32620e]/60 text-sm">Instant messaging</p>
              </div>
              <div className="relative ml-auto">
                <svg
                  className="w-5 h-5 text-[#32620e]/40 group-hover:text-[#32620e] group-hover:translate-x-1 transition-all duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
