import React from 'react'
import PrivacyPolicy from '@/components/legal/PrivacyPolicy'

export const metadata = {
  title: 'Privacy Policy | Liinke Real Estate Platform',
  description:
    'Learn how Liinke collects, uses, and protects your personal information when you use our real estate services. Your privacy matters to us.',
  metadataBase: new URL('https://www.liinke.com'),
  openGraph: {
    title: 'Liinke Privacy Policy',
    description:
      'Understand how your data is handled with care at Liinke. We’re committed to transparency and privacy across all our real estate services.',
    url: 'https://www.liinke.com/privacy-policy',
    siteName: 'Liinke',
    images: [
      {
        url: '/lightlogo.png', // Ensure this image is available in your /public folder
        width: 1200,
        height: 630,
        alt: 'Liinke Privacy Protection',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Liinke',
    description:
      'Your privacy is important. Find out how Liinke protects your personal data when exploring or listing properties.',
    images: ['/lightlogo.png'],
    site: '@liinke_ke',
  },
}

export default function page() {
  return (
    <>
      <PrivacyPolicy />
    </>
  )
}
