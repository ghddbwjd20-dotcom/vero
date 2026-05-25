import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2023-12-01',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// 포트폴리오 쿼리
export const portfolioQuery = `*[_type == "portfolio"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  category,
  tags,
  year,
  thumbnail,
  gallery,
  problem,
  solution,
  results,
  techStack,
  role,
  liveUrl,
  githubUrl,
  publishedAt
}`

// 공지사항 쿼리
export const newsQuery = `*[_type == "news"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  content,
  category,
  tags,
  thumbnail,
  publishedAt,
  updatedAt
}`

// 단일 포트폴리오 쿼리
export const portfolioBySlugQuery = `*[_type == "portfolio" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  category,
  tags,
  year,
  thumbnail,
  gallery,
  problem,
  solution,
  results,
  techStack,
  role,
  liveUrl,
  githubUrl,
  publishedAt
}`

// 단일 공지사항 쿼리
export const newsBySlugQuery = `*[_type == "news" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  content,
  category,
  tags,
  thumbnail,
  publishedAt,
  updatedAt
}`
