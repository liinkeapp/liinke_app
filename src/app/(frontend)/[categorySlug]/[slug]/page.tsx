/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic'

import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { fetchAllPosts, fetchRelatedPosts } from '@/lib/propertyUtil'
import { Listings } from '@/types/property'

// Import all the components
import { PropertyHeader } from '@/components/PropertyComponents/PropertyHeader'
import { PropertyDescription } from '@/components/PropertyComponents/PropertyDescription'
import { PropertyFeatures } from '@/components/PropertyComponents/PropertyFeatures'
import { RelatedProperties } from '@/components/PropertyComponents/RelatedProperties'
import { Breadcrumb } from '@/components/PropertyComponents/Breadcrumb'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; categorySlug: string }>
}) {
  const { slug, categorySlug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'properties',
    where: {
      slug: { equals: slug },
    },
    depth: 3,
  })

  const post = docs[0]

  if (!post) {
    return {
      title: 'Property Not Found – Liinke.com',
      description:
        'The property listing you’re looking for does not exist. Discover verified real estate opportunities across Kenya on Liinke.',
    }
  }

  const postTitle = post.title || 'Property Listing – Liinke'
  const location = post.location || 'Kenya'
  const category = post.category || 'property'

  const description =
    post.description?.substring(0, 160) ||
    `Find a ${category} in ${location} on Liinke — Kenya's smart property platform.`

  const imageUrl =
    Array.isArray(post.images) &&
    post.images.length > 0 &&
    typeof post.images[0] === 'object' &&
    post.images[0] !== null &&
    'url' in post.images[0] &&
    typeof (post.images[0] as any).url === 'string'
      ? (post.images[0] as any).url
      : '/liinke-preview.png'

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${categorySlug}/${slug}`

  return {
    title: `${postTitle} | Liinke Real Estate`,
    description: description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    openGraph: {
      title: `${postTitle} | Liinke`,
      description: description,
      url: pageUrl,
      siteName: 'Liinke',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${postTitle} - Property on Liinke`,
        },
      ],
      type: 'article',
      locale: 'en_KE',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${postTitle} | Liinke`,
      description: description,
      images: [imageUrl],
      site: '@liinke_ke',
    },
    alternates: {
      canonical: pageUrl,
    },
    authors: ['Liinke Verified Agent'],
    publisher: 'Liinke',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    other: {
      'og:title': `${postTitle} | Liinke`,
      'og:description': description,
      'og:image': imageUrl,
      'og:url': pageUrl,
      'og:type': 'article',
      'twitter:image': imageUrl,
      'twitter:title': `${postTitle} | Liinke`,
      'twitter:description': description,
      'twitter:card': 'summary_large_image',
    },
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'properties',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 3,
  })

  const post = docs[0]
  if (!post) {
    notFound()
  }

  // Fetch related posts
  const data = await fetchRelatedPosts(post.category, slug)
  const relatedPosts = data.slice(0, 3).map((post: any) => ({
    ...post,
  }))

  // Current URL for sharing

  // Format price function
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const categorySlug = post.category || 'all'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Breadcrumb Navigation */}
      <Breadcrumb categorySlug={categorySlug} post={post as Listings} />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {/* Main Content */}
          <div className="lg:col-span-4 space-y-8">
            {/* Property Header with Carousel */}
            <PropertyHeader post={post as Listings} />

            {/* Property Description */}
            <PropertyDescription description={post.description} />

            {/* Features & Amenities */}
            <PropertyFeatures
              features={
                Array.isArray(post.features)
                  ? post.features
                      .filter(
                        (f): f is { id?: string; feature: string } =>
                          !!f && typeof f.feature === 'string',
                      )
                      .map((f) => ({ id: f.id ?? undefined, feature: f.feature! }))
                  : []
              }
            />

            {/* Related Properties */}
            <RelatedProperties
              relatedPosts={relatedPosts}
              categorySlug={categorySlug}
              formatPrice={formatPrice}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const allPosts = await fetchAllPosts(1, 100)
    return allPosts.posts.map((post) => ({
      slug: post.slug,
      categorySlug: post.type,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
