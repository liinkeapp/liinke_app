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

export async function fetchRelatedPosts(currentCategory: { name: string }, currentSlug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: allBlogs } = await payload.find({
    collection: 'properties',
    depth: 3,
    limit: 4,
    where: {
      and: [
        {
          'category.name': {
            equals: currentCategory.name,
          },
        },
        {
          slug: {
            not_equals: currentSlug, // Exclude the current article
          },
        },
      ],
    },
  })

  return allBlogs
}

export async function fetchByCategory(slug: string, page = 1, limit = 18) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // First, resolve the category ID from the slug
  const catRes = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const category = catRes.docs?.[0]
  if (!category) {
    return { posts: [], pagination: { page: 1, totalPages: 1 } }
  }

  const res = await payload.find({
    collection: 'properties',
    depth: 3,
    limit,
    page,
    where: {
      category: {
        equals: category.id,
      },
    },
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

export async function searchPosts(query: string, page = 1, limit = 0) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const res = await payload.find({
    collection: 'properties',
    where: {
      or: [
        { title: { like: query } },
        { excerpt: { like: query } },
        { 'category.name': { like: query } },
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
