import Hero from '@/components/hero'
import SectionHeader from '@/components/section-header'
import VideoBackground from '@/components/video-background'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import PricingCalculator from '@/components/pricing-calculator'
import { CheckCircle } from 'lucide-react'

export const metadata = {
  title: '견적 및 가격',
  description: '베로(VERO)의 투명한 가격 정책과 견적 계산기를 확인하세요.',
}

const pricingPlans = [
  {
    name: '스타터',
    description: '소규모 비즈니스를 위한 기본 패키지',
    price: '500만원',
    duration: '4-6주',
    features: [
      '반응형 웹사이트 (5페이지)',
      '기본 SEO 최적화',
      '모바일 최적화',
      '기본 분석 도구 연동',
      '1회 디자인 수정',
      '30일 무료 지원'
    ],
    popular: false
  },
  {
    name: '프로페셔널',
    description: '성장하는 비즈니스를 위한 완성형 패키지',
    price: '1,200만원',
    duration: '8-12주',
    features: [
      '반응형 웹사이트 (10페이지)',
      '고급 SEO 최적화',
      'CMS 연동',
      '고급 분석 도구',
      '3회 디자인 수정',
      '90일 무료 지원',
      '성능 최적화',
      '보안 설정'
    ],
    popular: true
  },
  {
    name: '엔터프라이즈',
    description: '대규모 비즈니스를 위한 맞춤형 솔루션',
    price: '2,500만원+',
    duration: '12-16주',
    features: [
      '무제한 페이지',
      '맞춤형 기능 개발',
      '고급 CMS 구축',
      '멀티사이트 지원',
      '무제한 디자인 수정',
      '6개월 무료 지원',
      '전용 서버 설정',
      '24/7 모니터링'
    ],
    popular: false
  }
]

export default function PricingPage() {

  return (
    <>
      {/* Hero Section */}
      <VideoBackground
        videoSrc="/videos/process-background.mp4"
        fallbackGradient="bg-gradient-to-br from-vero-offwhite via-vero-gold/5 to-vero-primary/5"
        overlay={true}
        blur={false}
        className="relative"
        blurTransition={true}
      >
        <Hero
          title="투명한 가격 정책"
          subtitle="명확하고 예측 가능한 가격으로 최고의 가치를 제공합니다."
          ctaText="견적 계산하기"
          ctaHref="#calculator"
        />
      </VideoBackground>

      {/* 가격 플랜 */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <SectionHeader
            title="가격 플랜"
            subtitle="프로젝트 규모에 맞는 최적의 패키지를 선택하세요"
          />
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular ? 'ring-2 ring-vero-gold' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-vero-gold text-white px-4 py-1">
                      인기
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-gray-600">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-vero-gold">{plan.price}</span>
                    <span className="text-gray-500 ml-2">({plan.duration})</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-vero-gold" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <a href="/contact">선택하기</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 견적 계산기 */}
      <section id="calculator" className="section-padding bg-vero-offwhite">
        <div className="container mx-auto">
          <SectionHeader
            title="견적 계산기"
            subtitle="프로젝트 요구사항을 입력하여 예상 비용을 확인하세요"
          />
        </div>
        <PricingCalculator />
      </section>

      {/* CTA 섹션 */}
      <VideoBackground
        videoSrc="/videos/footer-background.mp4"
        fallbackGradient="bg-gradient-to-br from-vero-charcoal via-vero-primary/10 to-vero-charcoal"
        overlay={true}
        blur={false}
        className="section-padding py-20"
        blurTransition={true}
      >
        <section className="relative text-white" style={{ backgroundColor: 'transparent' }}>
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold sm:text-4xl text-white">
              정확한 견적이 필요하신가요?
            </h2>
            <p className="mt-4 text-lg text-gray-200">
              무료 상담을 통해 프로젝트에 맞는 정확한 견적을 제공해드립니다.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <a href="/contact">무료 상담 신청</a>
              </Button>
            </div>
          </div>
        </section>
      </VideoBackground>
    </>
  )
}
