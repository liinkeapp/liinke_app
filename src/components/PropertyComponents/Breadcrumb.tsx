import React from 'react'
import Link from 'next/link'

interface BreadcrumbProps {
  categorySlug: string
  post: any
}

export function Breadcrumb({ categorySlug, post }: BreadcrumbProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-[#32620e]/10 sticky top-0 z-10">
      <div className="container mx-auto px-6 py-6">
        <nav className="flex items-center space-x-3 text-base">
          <Link
            href="/"
            className="text-[#32620e]/70 hover:text-[#32620e] transition-colors font-medium"
          >
            Home
          </Link>
          <svg className="w-4 h-4 text-[#32620e]/40" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <Link
            href={`/${categorySlug}`}
            className="text-[#32620e]/70 hover:text-[#32620e] transition-colors font-medium"
          >
            {typeof post.type === 'object' && post.type !== null && 'name' in post.type
              ? post.type.name
              : 'Properties'}
          </Link>
          <svg className="w-4 h-4 text-[#32620e]/40" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-[#32620e] font-semibold line-clamp-1">{post.title}</span>
        </nav>
      </div>
    </div>
  )
}
