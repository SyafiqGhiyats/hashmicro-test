import { type Content } from '@tiptap/core'
export type Blog = {
  id: string
  slug: string
  title: string
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'
  author: {
    name: string
  }
  featuredImage: string
  description: string
  content: Content
  tags: string[]
  createdAt: string
  count: {
    comments: number
    likes: number
  }
}
