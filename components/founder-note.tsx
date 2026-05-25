'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Quote, CheckCircle } from 'lucide-react'

interface FounderNoteProps {
  variant?: 'first-person' | 'third-person'
}

export default function FounderNote({ variant = 'first-person' }: FounderNoteProps) {
  const content = variant === 'first-person' ? {
    title: '왜 베로를 시작했나요?',
    content: `내가 만들고 싶은 웹 디자인, 원하는 레이아웃을 어디서도 찾지 못해 제가 직접 시작했습니다. 멋짐보다 본질과 정리된 정보를 중요하게 생각합니다. 그래서 베로는 처음부터 끝까지 진정성 있는 방식으로, 필요한 것만 담아 오래 쓰이는 웹을 만듭니다.

저는 예산이 넉넉하지 않은 자영업자·초기 창업자의 현실을 잘 압니다. 그래서 과한 기능 제안 대신, 핵심에 집중하고 투명한 견적으로 신뢰를 쌓습니다. 빠르게 만들어도 기본기—접근성, 속도, 보안—는 절대 놓치지 않습니다.

여러분은 사업에 집중하세요. 웹은 제가 책임지겠습니다.`,
    signature: '베로 VERO 대표'
  } : {
    title: '베로의 시작',
    content: `베로의 대표는 '원하는 디자인과 레이아웃을 직접 구현하겠다'는 생각으로 시작했습니다. 화려함보다 정보 구조와 신뢰를 우선하며, 소상공인과 초기 팀이 지속 가능한 비용으로 웹을 운영하도록 돕습니다.

기획부터 보안까지, 전 과정을 투명하게 설명하고 책임집니다. 우리는 숫자보다 관계를, 속도보다 완성도를 중시합니다. 베로의 기준은 '진짜 필요한 것'입니다.`,
    signature: '베로 VERO'
  }

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-vero-primary to-vero-gold"></div>
            
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-vero-primary to-vero-gold rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">V</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-vero-charcoal mb-4">
                    {content.title}
                  </h2>
                  <div className="flex items-center space-x-2 mb-4">
                    <Quote className="h-5 w-5 text-vero-gold" />
                    <Badge variant="outline" className="text-vero-gold border-vero-gold/20">
                      대표 메시지
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                  {content.content}
                </p>
              </div>

              <div className="border-t pt-6 mt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-vero-charcoal">{content.signature}</p>
                    <p className="text-sm text-gray-500">진정성으로 신뢰를 쌓는 웹 에이전시</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-vero-gold" />
                    <span className="text-sm font-medium text-vero-gold">검증된 전문성</span>
                  </div>
                </div>
              </div>

              {/* 핵심 가치 */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: '진정성', description: '진짜 필요한 것만' },
                  { label: '신뢰', description: '투명한 소통' },
                  { label: '품질', description: '기본기부터 완벽하게' }
                ].map((value, index) => (
                  <motion.div
                    key={value.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4 rounded-lg bg-vero-offwhite"
                  >
                    <h4 className="font-semibold text-vero-charcoal mb-1">{value.label}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}


