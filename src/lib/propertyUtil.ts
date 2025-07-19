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
      type:
        typeof post.type === 'object' && post.type !== null && 'name' in post.type
          ? { name: post.type.name }
          : { name: String(post.type) },
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

export async function fetchRelatedPosts(currentType: { name: string }, currentSlug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: relatedProps } = await payload.find({
    collection: 'properties',
    depth: 3,
    limit: 4,
    where: {
      and: [
        {
          'type.name': {
            equals: currentType.name,
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

export async function fetchByType(slug: string, page = 1, limit = 18) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const typeRes = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const type = typeRes.docs?.[0]
  if (!type) {
    return { posts: [], pagination: { page: 1, totalPages: 1 } }
  }

  const res = await payload.find({
    collection: 'properties',
    depth: 3,
    limit,
    page,
    where: {
      type: {
        equals: type.id,
      },
    },
  })

  return {
    posts: res.docs.map((post) => ({
      id: post.id, // ✅ FIXED: number → string
      slug: post.slug,
      title: post.title,
      type:
        typeof post.type === 'object' && post.type !== null && 'name' in post.type
          ? { name: post.type.name }
          : { name: String(post.type) },
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
        { 'type.name': { like: query } },
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
