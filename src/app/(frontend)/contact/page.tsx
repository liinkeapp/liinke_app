import React from 'react'
import Contact from '@/components/contactPage/Contact'

export const metadata = {
  title: 'Contact Us | Liinke',
  description:
    'Have questions about a property or want to partner with Liinke? Reach out to our team — we’re here to help you find your ideal space in Kenya.',
  metadataBase: new URL('https://www.liinke.com'),
  openGraph: {
    title: 'Get in Touch | Liinke Real Estate Support',
    description:
      'Need support or want to list your property? Contact the Liinke team for assistance, partnerships, or property inquiries.',
    url: 'https://www.liinke.com/contact',
    siteName: 'Liinke',
    images: [
      {
        url: '/preview.png', // Ensure this image exists in /public
        width: 1200,
        height: 630,
        alt: 'Contact Liinke - Real Estate in Kenya',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Liinke',
    description:
      'Talk to Liinke today — whether you’re a house hunter, land owner, or investor, our support team is ready to help.',
    images: ['/preview.png'],
    site: '@liinke_app',
  },
}

export default function page() {
  return (
    <>
      <Contact />
    </>
  )
}
