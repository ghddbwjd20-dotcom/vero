'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import { Portfolio } from '@/types'
// import { urlFor } from '@/lib/sanity'

interface PortfolioCardProps {
  portfolio: Portfolio
  index: number
}

export default function PortfolioCard({ portfolio, index }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-vero-gold/20 to-vero-ink/20">
            <span className="text-2xl font-bold text-vero-charcoal">
              {portfolio.title}
            </span>
          </div>
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        </div>
        
        <CardContent className="p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline">{portfolio.category}</Badge>
            <Badge variant="secondary">{portfolio.year}</Badge>
          </div>
          
          <h3 className="mb-2 text-xl font-semibold text-vero-charcoal">
            {portfolio.title}
          </h3>
          
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">
            {portfolio.description}
          </p>
          
          <div className="mb-4 flex flex-wrap gap-1">
            {portfolio.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {portfolio.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{portfolio.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between p-6 pt-0">
          <Button variant="outline" asChild>
            <Link href={`/portfolio/${portfolio.slug.current}`}>
              케이스 보기
            </Link>
          </Button>
          
          <div className="flex space-x-2">
            {portfolio.liveUrl && (
              <Button variant="ghost" size="icon" asChild>
                <Link href={portfolio.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {portfolio.githubUrl && (
              <Button variant="ghost" size="icon" asChild>
                <Link href={portfolio.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
