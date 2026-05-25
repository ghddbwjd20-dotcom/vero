'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: '김민수',
    company: '카페 드림',
    role: '대표',
    content: '처음 홈페이지를 만들 때 정말 막막했는데, 베로가 처음부터 끝까지 친절하게 도와주셨어요. 예상보다 훨씬 합리적인 가격에 완성도 높은 사이트를 받았습니다.',
    rating: 5,
    project: '카페 웹사이트 제작'
  },
  {
    id: 2,
    name: '이지은',
    company: '스튜디오 루나',
    role: '원장',
    content: '앱으로 만든 티가 전혀 없고, 정말 전문적으로 만들어주셨어요. 고객들이 사이트를 보고 신뢰감을 느낀다고 하네요. 유지보수도 정말 편해요.',
    rating: 5,
    project: '미용실 웹사이트 제작'
  },
  {
    id: 3,
    name: '박준호',
    company: 'IT 스타트업',
    role: 'CEO',
    content: '기술적인 부분을 전혀 몰랐는데, 베로가 모든 것을 설명해주고 관리해주어서 정말 편했습니다. 투명한 견적과 정기적인 소통이 인상적이었어요.',
    rating: 5,
    project: '스타트업 랜딩페이지 제작'
  }
]

const clientLogos = [
  { name: '카페 드림', category: 'F&B' },
  { name: '스튜디오 루나', category: '뷰티' },
  { name: 'IT 스타트업', category: '테크' },
  { name: '디자인 스튜디오', category: '크리에이티브' },
  { name: '로컬 카페', category: 'F&B' },
  { name: '피트니스 센터', category: '헬스' },
  { name: '온라인 쇼핑몰', category: '이커머스' },
  { name: '컨설팅', category: '서비스' }
]

export default function Testimonials() {
  return (
    <section className="section-padding bg-vero-offwhite">
      <div className="container mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-vero-charcoal mb-4">
            고객이 증명하는 진정성
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            베로와 함께한 고객들의 생생한 후기와 신뢰할 수 있는 파트너사들을 만나보세요
          </p>
        </motion.div>

        {/* 고객 후기 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-vero-gold mr-3" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-vero-gold fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-vero-charcoal">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {testimonial.project}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 신뢰 포인트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-xl font-semibold text-vero-charcoal mb-8">
            베로의 신뢰 포인트
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: '투명한 견적', icon: '💰' },
              { label: '숨은 비용 없음', icon: '🔍' },
              { label: '필요 기능만', icon: '🎯' },
              { label: '30일 품질보증', icon: '🛡️' }
            ].map((point, index) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl mb-2">{point.icon}</div>
                <p className="text-sm font-medium text-vero-charcoal">{point.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 고객사 로고월 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-vero-charcoal mb-8">
            신뢰하는 파트너사들
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-lg bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-vero-primary to-vero-gold rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <p className="text-xs font-medium text-vero-charcoal">{client.name}</p>
                <p className="text-xs text-gray-500">{client.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


