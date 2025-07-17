export interface Listings {
  id: number
  slug: string
  title: string
  content: string
  publishedAt: string
  images?: []
  category: number | { name: string } | { slug: string }
  subcategory?: string | null
  tags?: { tag: string; id?: string | null | undefined }[] | null | undefined
  breakingNews?: boolean
}
