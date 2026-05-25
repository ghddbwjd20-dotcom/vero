import Hero from '@/components/hero'
import SectionHeader from '@/components/section-header'
import VideoBackground from '@/components/video-background'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Palette, 
  Code, 
  Smartphone, 
  Search, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export const metadata = {
  title: '서비스',
  description: '베로(VERO)가 제공하는 전문적인 웹 서비스를 확인하세요. 브랜딩부터 개발까지 전 과정을 책임집니다.',
}

const services = [
  {
    icon: Palette,
    title: '브랜드 아이덴티티',
    description: '차별화된 브랜드 아이덴티티를 구축하여 고객의 가치를 전달합니다.',
    features: ['로고 디자인', '브랜드 가이드라인', '컬러 시스템', '타이포그래피'],
    price: '500만원~',
    duration: '2-4주'
  },
  {
    icon: Code,
    title: '웹 개발',
    description: '최신 기술로 빠르고 안정적인 웹사이트를 구축합니다.',
    features: ['반응형 웹사이트', 'CMS 연동', '성능 최적화', 'SEO 최적화'],
    price: '1,000만원~',
    duration: '4-8주'
  },
  {
    icon: Smartphone,
    title: '모바일 앱',
    description: '사용자 중심의 직관적인 모바일 앱을 개발합니다.',
    features: ['iOS/Android', '크로스 플랫폼', '푸시 알림', '오프라인 지원'],
    price: '2,000만원~',
    duration: '8-12주'
  },
  {
    icon: Search,
    title: 'UI/UX 디자인',
    description: '사용자 경험을 중심으로 한 직관적인 인터페이스를 설계합니다.',
    features: ['사용자 리서치', '와이어프레임', '프로토타입', '사용성 테스트'],
    price: '800만원~',
    duration: '3-6주'
  },
  {
    icon: Shield,
    title: '보안 & 유지보수',
    description: '안전하고 지속 가능한 웹 서비스를 위한 보안 및 유지보수를 제공합니다.',
    features: ['보안 감사', '정기 업데이트', '백업 관리', '모니터링'],
    price: '월 50만원~',
    duration: '지속적'
  },
  {
    icon: Zap,
    title: '성능 최적화',
    description: '웹사이트의 속도와 성능을 극대화하여 사용자 만족도를 높입니다.',
    features: ['코드 최적화', '이미지 최적화', 'CDN 설정', '캐싱 전략'],
    price: '300만원~',
    duration: '2-3주'
  }
]

export default function ServicesPage() {
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
          title="전문적인 웹 서비스"
          subtitle="브랜딩부터 개발까지, 고객의 성공을 위한 모든 과정을 책임집니다."
          ctaText="견적 문의"
          ctaHref="/contact"
          secondaryCtaText="포트폴리오 보기"
          secondaryCtaHref="/portfolio"
        />
      </VideoBackground>

      {/* 서비스 그리드 */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <SectionHeader
            title="제공 서비스"
            subtitle="고객의 성공을 위한 전문적인 서비스"
          />
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={service.title} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-vero-gold/10 group-hover:bg-vero-gold/20 transition-colors">
                    <service.icon className="h-8 w-8 text-vero-gold" />
                  </div>
                  
                  <h3 className="mb-4 text-xl font-semibold text-vero-charcoal">
                    {service.title}
                  </h3>
                  
                  <p className="mb-6 text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mb-6 space-y-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-vero-gold" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-vero-gold">{service.price}</p>
                      <p className="text-sm text-gray-500">{service.duration}</p>
                    </div>
                    <Button variant="outline" size="sm" className="group-hover:bg-vero-gold group-hover:text-white transition-colors">
                      자세히 보기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 프로세스 섹션 */}
      <section className="section-padding bg-vero-offwhite">
        <div className="container mx-auto">
          <SectionHeader
            title="작업 프로세스"
            subtitle="체계적이고 투명한 프로젝트 진행 과정"
          />
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
              {[
                { step: '01', title: '상담', description: '요구사항 분석 및 목표 설정' },
                { step: '02', title: '기획', description: '전략 수립 및 정보구조 설계' },
                { step: '03', title: '디자인', description: '브랜드 아이덴티티 및 UI/UX 설계' },
                { step: '04', title: '개발', description: '코딩 및 기능 구현' },
                { step: '05', title: '런칭', description: '테스트 및 배포, 유지보수' },
              ].map((item, index) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vero-gold text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
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
              프로젝트를 시작할 준비가 되셨나요?
            </h2>
            <p className="mt-4 text-lg text-gray-200">
              무료 상담을 통해 프로젝트에 대한 구체적인 계획을 세워보세요.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <a href="/contact">무료 상담 신청</a>
              </Button>
              <Button variant="outline" asChild size="lg" className="text-white border-white hover:bg-white hover:text-vero-charcoal">
                <a href="/portfolio">포트폴리오 보기</a>
              </Button>
            </div>
          </div>
        </section>
      </VideoBackground>
    </>
  )
}

