export const dynamic = 'force-dynamic'

import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const postsRes = await fetch(`${apiUrl}/properties`, {
    next: { revalidate: 3600 },
  })

  if (!postsRes.ok) {
    throw new Error(`Failed to fetch properties`)
  }

  const postsData = await postsRes.json()
  const posts: { slug: string; category: { slug: string }; updatedAt?: string }[] = postsData.docs

  // Map individual property detail pages
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/${post.category.slug}/${post.slug}`,
    lastModified: post.updatedAt || new Date().toISOString(),
    changeFrequency: 'hourly',
    priority: 0.9,
  }))

  // Map category listing pages
  const uniqueCategories = Array.from(new Set(posts.map((post) => post.category.slug)))
  const categoryEntries: MetadataRoute.Sitemap = uniqueCategories.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  // Static core pages
  const staticPages: MetadataRoute.Sitemap = [
    '/',
    '/about-liinke',
    '/contact',
    '/map',
    '/privacy-policy',
    '/terms',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: path === '/' ? 'hourly' : 'monthly',
    priority: path === '/' ? 1.0 : path === '/terms' ? 0.3 : 0.8,
  }))

  return [...staticPages, ...categoryEntries, ...postEntries]
}
