'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { News } from '@/types'
import { formatDate } from '@/lib/utils'
// import { urlFor } from '@/lib/sanity'

interface NewsItemProps {
  news: News
  index: number
}

export default function NewsItem({ news, index }: NewsItemProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        <Link href={`/news/${news.slug.current}`}>
          <div className="relative aspect-video overflow-hidden">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-vero-gold/10 to-vero-ink/10">
              <span className="text-lg font-semibold text-vero-charcoal">
                {news.title}
              </span>
            </div>
          </div>
        </Link>
        
        <CardContent className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <Badge variant="outline">{news.category}</Badge>
            <time className="text-sm text-gray-500">
              {formatDate(news.publishedAt)}
            </time>
          </div>
          
          <Link href={`/news/${news.slug.current}`}>
            <h3 className="mb-2 text-lg font-semibold text-vero-charcoal transition-colors group-hover:text-vero-gold">
              {news.title}
            </h3>
          </Link>
          
          {news.tags && news.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {news.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {news.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{news.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.article>
  )
}
