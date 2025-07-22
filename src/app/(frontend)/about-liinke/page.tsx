import React from 'react'
import About from '@/components/aboutPage/About'

export const metadata = {
  title: 'About Us | Liinke',
  description:
    'Learn more about Liinke — a smart Kenyan real estate platform transforming how you find rentals, land, and commercial properties. Meet the team and vision behind the map.',
  metadataBase: new URL('https://www.liinke.com'),
  openGraph: {
    title: 'About Liinke | Kenya’s Smart Real Estate Map',
    description:
      'Discover Liinke’s mission to simplify property discovery in Kenya. Explore the story, vision, and people powering the platform behind your next home or investment.',
    url: 'https://www.liinke.com/about-liinke',
    siteName: 'Liinke',
    images: [
      {
        url: '/preview.png', // Make sure this exists in /public
        width: 1200,
        height: 630,
        alt: 'About Liinke - Real Estate Made Smarter in Kenya',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Liinke',
    description:
      'We’re on a mission to connect Kenyans with the right property — from rentals to land and commercial spaces — all on a live, intuitive map.',
    images: ['/preview.png'],
    site: '@liinke_app',
  },
}

export default function page() {
  return (
    <>
      <About />
    </>
  )
}
