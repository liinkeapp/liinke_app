'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationComponentProps {
  totalPages: number
  className?: string
}

const ELLIPSIS = '...'

export default function PaginationComponent({
  totalPages,
  className = '',
}: PaginationComponentProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const safePage = (page: number) => Math.max(1, Math.min(page, totalPages))

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', safePage(pageNumber).toString())
    return `${pathname}?${params.toString()}`
  }

  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 2) {
        endPage = 3
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2
      }

      if (startPage > 2) pages.push(ELLIPSIS)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages - 1) pages.push(ELLIPSIS)

      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className={`mt-12 ${className}`}>
      <Pagination>
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(currentPage - 1)}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : 0}
              onClick={(e) => currentPage === 1 && e.preventDefault()}
              className={`border border-gray-200 rounded-lg hover:border-[#0763fe] hover:text-[#0763fe] transition-colors duration-200 ${
                currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-[#0763fe]/5'
              }`}
            />
          </PaginationItem>

          {pageNumbers.map((pageNumber, index) => {
            if (pageNumber === ELLIPSIS) {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis className="text-gray-400" />
                </PaginationItem>
              )
            }

            const isActive = currentPage === pageNumber

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={createPageURL(Number(pageNumber))}
                  isActive={isActive}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#0763fe] text-white hover:bg-[#0d4175] border-0'
                      : 'text-gray-700 border border-gray-200 hover:border-[#0763fe] hover:text-[#0763fe] hover:bg-[#0763fe]/5'
                  }`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <PaginationNext
              href={createPageURL(currentPage + 1)}
              aria-disabled={currentPage >= totalPages}
              tabIndex={currentPage >= totalPages ? -1 : 0}
              onClick={(e) => currentPage >= totalPages && e.preventDefault()}
              className={`border border-gray-200 rounded-lg hover:border-[#0763fe] hover:text-[#0763fe] transition-colors duration-200 ${
                currentPage >= totalPages
                  ? 'pointer-events-none opacity-50'
                  : 'hover:bg-[#0763fe]/5'
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
