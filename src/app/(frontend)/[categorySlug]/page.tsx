export const dynamic = 'force-dynamic'

import React from 'react'
import PropertyPage from '@/components/listings/Properties'
import PaginationComponent from '@/components/navigation/PaginationComponent'
import { fetchByCategory } from '@/lib/propertyUtil'
import Image from 'next/image'

type PageProps = {
  params: { categorySlug: string }
  searchParams?: { page?: string }
}

export default async function Page({ params, searchParams }: PageProps) {
  const currentPage = Number(searchParams?.page) || 1
  const categorySlug = params.categorySlug

  //Pass the slug to fetchByCategory
  const { posts, pagination } = await fetchByCategory(categorySlug, currentPage)

  const categoryName = posts[0]?.type?.name || decodeURIComponent(categorySlug)

  return (
    <>
      <section className="relative bg-[#32620e] text-white overflow-hidden py-24">
        <div>{categoryName}</div>
        <PropertyPage properties={posts} />
      </section>
    </>
  )
}
