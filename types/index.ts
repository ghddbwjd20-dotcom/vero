export interface Portfolio {
  _id: string
  title: string
  slug: { current: string }
  description: string
  category: string
  tags: string[]
  year: number
  thumbnail: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  gallery?: Array<{
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
    caption?: string
  }>
  problem: string
  solution: string
  results: string
  techStack: string[]
  role: string
  liveUrl?: string
  githubUrl?: string
  publishedAt: string
}

export interface News {
  _id: string
  title: string
  slug: { current: string }
  content: any // Portable Text
  category: string
  tags: string[]
  thumbnail?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  publishedAt: string
  updatedAt: string
}

export interface ContactFormData {
  name: string
  company?: string
  email: string
  phone?: string
  budget: string
  timeline: string
  requirements: string
  files?: FileList
  agreeToTerms: boolean
  agreeToPrivacy: boolean
}

export interface FilterOptions {
  category?: string
  year?: number
  tags?: string[]
  search?: string
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}


