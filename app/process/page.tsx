import Hero from '@/components/hero'
import SectionHeader from '@/components/section-header'
import VideoBackground from '@/components/video-background'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  PenTool, 
  Palette, 
  Code, 
  Rocket,
  CheckCircle,
  Clock,
  Users,
  Target
} from 'lucide-react'

export const metadata = {
  title: '프로세스',
  description: '베로(VERO)의 체계적이고 투명한 프로젝트 진행 과정을 확인하세요.',
}

const processSteps = [
  {
    step: '01',
    title: '탐색 (Discovery)',
    icon: Search,
    description: '프로젝트의 목표와 요구사항을 깊이 있게 분석합니다.',
    duration: '1-2주',
    deliverables: [
      '사용자 리서치',
      '경쟁사 분석',
      '요구사항 정의서',
      '프로젝트 로드맵'
    ],
    details: '고객의 비즈니스 목표와 사용자 니즈를 파악하여 프로젝트의 방향성을 설정합니다. 시장 분석과 사용자 조사를 통해 최적의 솔루션을 찾아갑니다.'
  },
  {
    step: '02',
    title: '설계 (Strategy)',
    icon: PenTool,
    description: '전략적 기획과 정보구조를 설계합니다.',
    duration: '1-2주',
    deliverables: [
      '정보구조 설계',
      '사용자 플로우',
      '와이어프레임',
      '기능 명세서'
    ],
    details: '사용자 중심의 정보구조를 설계하고, 직관적인 사용자 경험을 위한 플로우를 구축합니다. 기술적 제약사항과 비즈니스 요구사항을 모두 고려합니다.'
  },
  {
    step: '03',
    title: '디자인 (Design)',
    icon: Palette,
    description: '브랜드 아이덴티티와 사용자 인터페이스를 설계합니다.',
    duration: '2-4주',
    deliverables: [
      '브랜드 아이덴티티',
      'UI 디자인',
      '프로토타입',
      '디자인 시스템'
    ],
    details: '브랜드의 가치와 개성을 반영한 시각적 아이덴티티를 구축하고, 사용자 친화적인 인터페이스를 설계합니다. 일관성 있는 디자인 시스템을 통해 확장 가능한 솔루션을 제공합니다.'
  },
  {
    step: '04',
    title: '개발 (Development)',
    icon: Code,
    description: '견고하고 확장 가능한 코드로 구현합니다.',
    duration: '4-8주',
    deliverables: [
      '프론트엔드 개발',
      '백엔드 API',
      '데이터베이스 설계',
      '통합 테스트'
    ],
    details: '최신 기술 스택을 활용하여 성능과 보안을 고려한 웹 애플리케이션을 개발합니다. 코드 품질과 유지보수성을 중시하여 장기적으로 안정적인 솔루션을 제공합니다.'
  },
  {
    step: '05',
    title: '성장 (Growth)',
    icon: Rocket,
    description: '런칭 후 지속적인 개선과 성장을 지원합니다.',
    duration: '지속적',
    deliverables: [
      '성능 최적화',
      '사용자 피드백 분석',
      '기능 개선',
      '유지보수'
    ],
    details: '런칭 후에도 지속적으로 성능을 모니터링하고 사용자 피드백을 반영하여 서비스를 개선합니다. 비즈니스 성장에 맞춰 확장 가능한 솔루션을 제공합니다.'
  }
]

export default function ProcessPage() {
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
          title="투명한 프로세스"
          subtitle="체계적이고 예측 가능한 프로젝트 진행 과정으로 고객의 성공을 보장합니다."
          ctaText="프로젝트 시작하기"
          ctaHref="/contact"
        />
      </VideoBackground>

      {/* 프로세스 타임라인 */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <SectionHeader
            title="5단계 프로세스"
            subtitle="탐색부터 성장까지, 체계적인 프로젝트 관리"
          />
          
          <div className="mt-16">
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div key={step.step} className="relative">
                  {/* 연결선 */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute left-8 top-16 h-12 w-0.5 bg-vero-gold/30"></div>
                  )}
                  
                  <div className="flex items-start space-x-8">
                    {/* 아이콘 */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vero-gold text-white font-bold text-lg shadow-lg">
                      <step.icon className="h-8 w-8" />
                    </div>
                    
                    {/* 콘텐츠 */}
                    <div className="flex-1">
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-8">
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-2xl font-semibold text-vero-charcoal">
                              {step.title}
                            </h3>
                            <Badge variant="outline" className="text-vero-gold border-vero-gold">
                              {step.duration}
                            </Badge>
                          </div>
                          
                          <p className="mb-6 text-lg text-gray-600">
                            {step.description}
                          </p>
                          
                          <p className="mb-6 text-gray-700 leading-relaxed">
                            {step.details}
                          </p>
                          
                          <div>
                            <h4 className="mb-4 font-semibold text-vero-charcoal">주요 산출물</h4>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              {step.deliverables.map((deliverable) => (
                                <div key={deliverable} className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-vero-gold" />
                                  <span className="text-sm text-gray-600">{deliverable}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="section-padding bg-vero-offwhite">
        <div className="container mx-auto">
          <SectionHeader
            title="프로세스의 핵심 가치"
            subtitle="고객과의 신뢰 관계를 바탕으로 한 투명한 소통"
          />
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vero-gold/10">
                  <Users className="h-8 w-8 text-vero-gold" />
                </div>
                <h3 className="mb-4 text-xl font-semibold">투명한 소통</h3>
                <p className="text-gray-600">
                  주간 리포트와 정기 미팅을 통해 프로젝트 진행 상황을 투명하게 공유합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vero-gold/10">
                  <Target className="h-8 w-8 text-vero-gold" />
                </div>
                <h3 className="mb-4 text-xl font-semibold">목표 중심</h3>
                <p className="text-gray-600">
                  비즈니스 목표와 사용자 니즈를 중심으로 한 전략적 접근을 제공합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vero-gold/10">
                  <Clock className="h-8 w-8 text-vero-gold" />
                </div>
                <h3 className="mb-4 text-xl font-semibold">예측 가능</h3>
                <p className="text-gray-600">
                  명확한 일정과 마일스톤으로 프로젝트의 진행 상황을 예측 가능하게 관리합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="section-padding bg-vero-charcoal text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            프로젝트를 시작해보세요
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            투명하고 체계적인 프로세스로 성공적인 프로젝트를 완성하겠습니다.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <a href="/contact">프로젝트 상담 신청</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
