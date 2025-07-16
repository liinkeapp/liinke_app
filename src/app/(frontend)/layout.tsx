import React from 'react'
import './styles.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'

export const metadata = {
  title: 'Liinke - Pin. Discover. Liinke.',
  description:
    'Liinke (Live in Kenya) is a smart real estate platform that helps you discover rental, commercial, and land properties across Kenya. Explore vacancies on an interactive map and find your next space with ease.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
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
