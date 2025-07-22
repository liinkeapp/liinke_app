import React from 'react'
import TermsOfService from '@/components/legal/TermsOfService'

export const metadata = {
  title: 'Terms & Conditions | Liinke Real Estate Platform',
  description:
    'Review the terms and conditions for using Liinke, Kenya’s smart real estate platform. Understand your rights and responsibilities as a user.',
  metadataBase: new URL('https://www.liinke.com'),
  openGraph: {
    title: 'Liinke Terms & Conditions',
    description:
      'By using Liinke, you agree to our terms of service. Read about user responsibilities, content guidelines, and platform usage policies.',
    url: 'https://www.liinke.com/terms',
    siteName: 'Liinke',
    images: [
      {
        url: '/lightlogo.png', // Ensure this file exists in your /public folder
        width: 1200,
        height: 630,
        alt: 'Liinke Terms and Service Agreement',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Liinke',
    description:
      'Familiarize yourself with Liinke’s service policies, terms of use, and legal agreement before using our real estate tools.',
    images: ['/lightlogo.png'],
    site: '@liinke_ke',
  },
}

export default function page() {
  return (
    <>
      <TermsOfService />
    </>
  )
}
