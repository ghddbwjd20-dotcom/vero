'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Calculator, ArrowRight } from 'lucide-react'

const additionalServices = [
  { name: '브랜드 아이덴티티', price: '300만원~' },
  { name: 'UI/UX 디자인', price: '500만원~' },
  { name: '모바일 앱 개발', price: '2,000만원~' },
  { name: '성능 최적화', price: '200만원~' },
  { name: '보안 강화', price: '150만원~' },
  { name: '월 유지보수', price: '50만원~' }
]

export default function PricingCalculator() {
  const [budget, setBudget] = useState('1000-2000')
  const [features, setFeatures] = useState<string[]>([])
  const [timeline, setTimeline] = useState('2-3개월')

  const handleFeatureToggle = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    )
  }

  const calculateEstimate = () => {
    let basePrice = 0
    if (budget === '500-1000') basePrice = 800
    else if (budget === '1000-2000') basePrice = 1200
    else if (budget === '2000-5000') basePrice = 2500
    else basePrice = 5000

    const featurePrice = features.length * 200
    return basePrice + featurePrice
  }

  return (
    <>
      {/* 견적 계산기 */}
      <section className="section-padding bg-vero-offwhite">
        <div className="container mx-auto">
          <Card className="mt-16 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* 입력 폼 */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      예상 예산
                    </label>
                    <select 
                      value={budget} 
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-vero-gold focus:outline-none focus:ring-1 focus:ring-vero-gold"
                    >
                      <option value="500-1000">500만원 - 1,000만원</option>
                      <option value="1000-2000">1,000만원 - 2,000만원</option>
                      <option value="2000-5000">2,000만원 - 5,000만원</option>
                      <option value="5000+">5,000만원 이상</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      희망 일정
                    </label>
                    <select 
                      value={timeline} 
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-vero-gold focus:outline-none focus:ring-1 focus:ring-vero-gold"
                    >
                      <option value="1개월">1개월 이내</option>
                      <option value="2-3개월">2-3개월</option>
                      <option value="3-6개월">3-6개월</option>
                      <option value="6개월+">6개월 이상</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      추가 기능
                    </label>
                    <div className="space-y-2">
                      {[
                        '고급 SEO 최적화',
                        '다국어 지원',
                        '결제 시스템 연동',
                        '회원 관리 시스템',
                        '관리자 대시보드',
                        'API 개발'
                      ].map((feature) => (
                        <label key={feature} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={features.includes(feature)}
                            onChange={() => handleFeatureToggle(feature)}
                            className="rounded border-gray-300 text-vero-gold focus:ring-vero-gold"
                          />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 견적 결과 */}
                <div className="bg-vero-charcoal text-white rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Calculator className="h-6 w-6 text-vero-gold" />
                    <h3 className="text-xl font-semibold">예상 견적</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>기본 비용</span>
                      <span>{budget === '500-1000' ? '800만원' : 
                             budget === '1000-2000' ? '1,200만원' :
                             budget === '2000-5000' ? '2,500만원' : '5,000만원+'}</span>
                    </div>
                    
                    {features.length > 0 && (
                      <div className="flex justify-between">
                        <span>추가 기능 ({features.length}개)</span>
                        <span>{features.length * 200}만원</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-600 pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>총 예상 비용</span>
                        <span className="text-vero-gold">{calculateEstimate()}만원</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 bg-vero-gold hover:bg-vero-gold/90">
                    상세 견적 요청
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 추가 서비스 */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {additionalServices.map((service) => (
              <Card key={service.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-vero-charcoal">{service.name}</h3>
                    <span className="text-vero-gold font-semibold">{service.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}


