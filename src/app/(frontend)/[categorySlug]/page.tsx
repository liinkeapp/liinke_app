export const dynamic = 'force-dynamic'

import React from 'react'
import Map from '@/components/map/Map'
import { fetchByType } from '@/lib/propertyUtil'

type PageProps = {
  params: { categorySlug: string }
  searchParams?: { page?: string }
}

export default async function Page({ params, searchParams }: PageProps) {
  const currentPage = Number(searchParams?.page) || 1
  const categorySlug = params.categorySlug

  //Pass the slug to fetchByCategory
  const { posts } = await fetchByType(categorySlug)

  const categoryName = posts[0]?.type?.name || decodeURIComponent(categorySlug)

  return (
    <>
      <section className="relative bg-[#32620e] text-white overflow-hidden py-24">
        <div>{categoryName}</div>
        <Map properties={posts} />
      </section>
    </>
  )
}
