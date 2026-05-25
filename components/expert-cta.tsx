'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Zap, 
  Search, 
  Lock, 
  FileText, 
  Wrench,
  ArrowRight 
} from 'lucide-react'

const trustPoints = [
  {
    icon: Shield,
    label: '접근성(AA)',
    description: 'WCAG 2.2 AA 기준 준수'
  },
  {
    icon: Zap,
    label: 'Core Web Vitals',
    description: '성능 최적화 보장'
  },
  {
    icon: Search,
    label: 'SEO/OG',
    description: '검색엔진 최적화'
  },
  {
    icon: Lock,
    label: 'HTTPS/HSTS/CSP',
    description: '보안 헤더 설정'
  },
  {
    icon: FileText,
    label: '개인정보처리방침',
    description: '법적 고지 완비'
  },
  {
    icon: Wrench,
    label: '유지관리 가이드',
    description: '운영 매뉴얼 제공'
  }
]

export default function ExpertCTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-vero-primary/5 to-vero-gold/5">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-vero-charcoal mb-4">
            웹사이트, 전문가에게 맡기세요
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            겉모습만 예쁜 웹이 아니라, <span className="text-vero-primary font-semibold">접근성·속도·SEO·보안·법적 고지</span>까지 
            '운영 가능한 웹'을 만듭니다.
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            처음 설계가 틀리면 유지비가 늘어납니다. 베로는 <span className="text-vero-gold font-semibold">필요한 것만 정확히</span> 제안해 장기 비용을 줄입니다.
          </p>
        </motion.div>

        {/* 신뢰 배지 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-vero-charcoal text-center mb-8">
            베로의 전문성
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trustPoints.map((point, index) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-xl bg-white/80 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-vero-primary/10">
                  <point.icon className="h-6 w-6 text-vero-primary" />
                </div>
                <h4 className="font-semibold text-vero-charcoal text-sm mb-1">
                  {point.label}
                </h4>
                <p className="text-xs text-gray-500">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-vero-gold hover:bg-vero-gold/90 text-white px-8 py-3 text-lg font-semibold"
              asChild
            >
              <a href="/contact">
                전문가 상담 받기
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-vero-primary text-vero-primary hover:bg-vero-primary hover:text-white px-8 py-3 text-lg font-semibold"
              asChild
            >
              <a href="/pricing">
                빠른 견적
              </a>
            </Button>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {[
              '무료 상담',
              '투명한 견적',
              '30일 품질보증'
            ].map((badge) => (
              <Badge 
                key={badge}
                variant="secondary" 
                className="bg-vero-gold/10 text-vero-gold border-vero-gold/20 px-4 py-2"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


