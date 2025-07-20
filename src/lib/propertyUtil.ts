import config from '@/payload.config'
import { getPayload } from 'payload'

export async function fetchAllPosts(page = 1, limit = 18) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const res = await payload.find({
    collection: 'properties',
    depth: 3,
    limit,
    page,
  })

  return {
    posts: res.docs.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      type: post.category,
      price: post.price,
      bedrooms: post.bedrooms,
      bathrooms: post.bathrooms,
      location: {
        lat: post.location?.lat,
        lng: post.location?.lng,
        address: post.location?.address,
      },
      images: post.images || [],
      features: post.features || [],
      publishedAt: new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    })),
    pagination: {
      hasNextPage: res.hasNextPage,
      hasPrevPage: res.hasPrevPage,
      totalPages: res.totalPages,
      page: res.page,
    },
  }
}

export async function fetchRelatedPosts(category: string, currentSlug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: relatedProps } = await payload.find({
    collection: 'properties',
    depth: 3,
    limit: 4,
    where: {
      and: [
        {
          category: {
            equals: category,
          },
        },
        {
          slug: {
            not_equals: currentSlug,
          },
        },
      ],
    },
  })

  return relatedProps
}

export async function fetchByType(category: string, page = 1, limit = 18) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const res = await payload.find({
    collection: 'properties',
    depth: 3,
    limit,
    page,
    where: {
      category: {
        equals: category,
      },
    },
  })

  return {
    posts: res.docs.map((post) => ({
      id: post.id, // ✅ FIXED: number → string
      slug: post.slug,
      title: post.title,
      type: post.category,
      publishedAt: new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      price: post.price,
      bedrooms: post.bedrooms,
      bathrooms: post.bathrooms,
      description: post.description,
      location: {
        lat: post.location?.lat,
        lng: post.location?.lng,
        address: post.location?.address,
      },
      images: post.images || [],
      features: post.features || [],
    })),
    pagination: {
      hasNextPage: res.hasNextPage,
      hasPrevPage: res.hasPrevPage,
      totalPages: res.totalPages,
      page: res.page,
    },
  }
}

export async function searchPosts(query: string, page = 1, limit = 0) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const res = await payload.find({
    collection: 'properties',
    where: {
      or: [
        { title: { like: query } },
        { description: { like: query } },
        { category: { like: query } },
        { bedrooms: { like: query } },
        { bathrooms: { like: query } },
      ],
    },
    depth: 2,
    limit,
    page,
  })

  return {
    posts: res.docs,
    pagination: {
      hasNextPage: res.hasNextPage,
      hasPrevPage: res.hasPrevPage,
      totalPages: res.totalPages,
      page: res.page,
    },
  }
}
