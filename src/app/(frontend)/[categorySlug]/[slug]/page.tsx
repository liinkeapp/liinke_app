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
