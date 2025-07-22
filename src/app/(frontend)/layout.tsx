import React from 'react'
import './styles.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'

export const metadata = {
  title: 'Liinke - Pin. Discover. Liinke.',
  description:
    'Liinke (Live in Kenya) is a smart real estate platform that helps you discover rental, commercial, and land properties across Kenya. Explore vacancies on an interactive map and find your next space with ease.',
  metadataBase: new URL('https://www.liinke.com'),
  openGraph: {
    title: 'Liinke - Explore Properties Across Kenya',
    description:
      'Find your next rental, home, or piece of land with Liinke — Kenya’s interactive real estate platform. Browse listings on a live map and connect directly with property agents.',
    url: 'https://www.liinke.com',
    siteName: 'Liinke',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Liinke Real Estate Platform Preview',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liinke - Pin. Discover. Liinke.',
    description:
      'Pin your dream property with Liinke — discover rentals, land, and commercial spaces across Kenya on a powerful live map experience.',
    images: ['/preview.png'],
    site: '@liinke_app',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/web-app-manifest-192x192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#32620e" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Liinke" />
      </head>
      <body>
        <main>
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
