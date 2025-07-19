// Main Property Page Component
export const dynamic = 'force-dynamic'

import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { fetchAllPosts, fetchRelatedPosts } from '@/lib/propertyUtil'

// Import all the components
import { PropertyHeader } from '@/components/PropertyComponents/PropertyHeader'
import { PropertyDescription } from '@/components/PropertyComponents/PropertyDescription'
import { PropertyFeatures } from '@/components/PropertyComponents/PropertyFeatures'
import { ImageGallery } from '@/components/PropertyComponents/ImageGallery'
import { RelatedProperties } from '@/components/PropertyComponents/RelatedProperties'
import { ContactForm } from '@/components/PropertyComponents/ContactForm'
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

  // Format the published date
  const publishedDate = new Date(post.createdAt)
  const publishedDateFormatted = publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Get how long ago the post was published
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true })

  // Fetch related posts
  const data = await fetchRelatedPosts(
    {
      name:
        typeof post.type === 'object' && post.type !== null && 'name' in post.type
          ? post.type.name
          : String(post.type),
    },
    slug,
  )

  const relatedPosts = data.slice(0, 3)

  // Fetch latest posts for sidebar
  const latestPostsData = await fetchAllPosts(1, 5)
  const latestPosts = latestPostsData.posts.filter((p) => p.slug !== slug)

  // Current URL for sharing
  const categorySlug =
    typeof post.type === 'object' && post.type !== null && 'slug' in post.type
      ? post.type.slug
      : typeof post.type === 'string' || typeof post.type === 'number'
        ? post.type
        : 'news'
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${categorySlug}/${slug}`

  // Format price function
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Breadcrumb Navigation */}
      <Breadcrumb categorySlug={categorySlug} post={post} />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Property Header with Carousel */}
            <PropertyHeader post={post} formatPrice={formatPrice} />

            {/* Property Description */}
            <PropertyDescription description={post.description} />

            {/* Features & Amenities */}
            <PropertyFeatures features={post.features} />

            {/* Image Gallery */}
            <ImageGallery images={post.images} title={post.title} />

            {/* Related Properties */}
            <RelatedProperties
              relatedPosts={relatedPosts}
              categorySlug={categorySlug}
              formatPrice={formatPrice}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Form */}
            <ContactForm propertyTitle={post.title} />
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
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
