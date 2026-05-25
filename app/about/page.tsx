import Hero from '@/components/hero'
import SectionHeader from '@/components/section-header'
import FounderNote from '@/components/founder-note'
import VideoBackground from '@/components/video-background'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Users, Shield, Zap, Target, Award } from 'lucide-react'

export const metadata = {
  title: '회사 소개',
  description: '진정성으로 신뢰를 쌓는 웹 에이전시 베로(VERO)의 철학과 전문성을 소개합니다.',
}

export default function AboutPage() {
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
          title="진정성으로 신뢰를 설계합니다"
          subtitle="베로는 한 번의 멋짐보다 오래가는 신뢰를 만듭니다. 담백하지만 세련된, 본질에 집중한 웹을 제안합니다."
          ctaText="프로젝트 문의"
          ctaHref="/contact"
        />
      </VideoBackground>

      {/* 대표 소개 섹션 */}
      <FounderNote variant="first-person" />

      {/* 철학 섹션 */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <SectionHeader
            title="우리의 철학"
            subtitle="숫자보다 관계를, 속도보다 완성도를 중시합니다"
          />
          
          <div className="mt-16">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xl text-gray-600 leading-relaxed">
                "우리는 숫자보다 관계를, 속도보다 완성도를 중시합니다. 
                베로의 기준은 '진짜 필요한 것'입니다."
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-8">
                  <h3 className="mb-4 text-xl font-semibold">진정성</h3>
                  <p className="text-gray-600">
                    과장된 마케팅보다는 실제 가치를 전달합니다. 
                    고객의 성공이 곧 우리의 성공이라고 믿습니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="mb-4 text-xl font-semibold">신뢰</h3>
                  <p className="text-gray-600">
                    투명한 커뮤니케이션과 약속을 지키는 것으로 
                    고객과의 신뢰 관계를 구축합니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 전문성 섹션 */}
      <section className="section-padding bg-vero-offwhite">
        <div className="container mx-auto">
          <SectionHeader
            title="전문성"
            subtitle="기획부터 보안까지, 전 과정을 투명하게 설명하고 책임집니다"
          />
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-vero-gold/10">
                  <Target className="h-6 w-6 text-vero-gold" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">기획 & 브랜딩</h3>
                <p className="text-sm text-gray-600">
                  사용자 중심의 전략적 기획과 차별화된 브랜드 아이덴티티를 구축합니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-vero-gold/10">
                  <Users className="h-6 w-6 text-vero-gold" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">UI/UX 디자인</h3>
                <p className="text-sm text-gray-600">
                  직관적이고 아름다운 사용자 경험을 설계합니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-vero-gold/10">
                  <Zap className="h-6 w-6 text-vero-gold" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">퍼포먼스 최적화</h3>
                <p className="text-sm text-gray-600">
                  빠르고 효율적인 웹사이트를 구축하여 사용자 만족도를 높입니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-vero-gold/10">
                  <Shield className="h-6 w-6 text-vero-gold" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">보안 & 접근성</h3>
                <p className="text-sm text-gray-600">
                  WCAG 2.2 AA 기준을 준수한 접근성과 강력한 보안을 구현합니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-vero-gold/10">
                  <Award className="h-6 w-6 text-vero-gold" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">최신 기술</h3>
                <p className="text-sm text-gray-600">
                  Next.js, React, TypeScript 등 최신 프론트엔드 기술을 활용합니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-vero-gold/10">
                  <CheckCircle className="h-6 w-6 text-vero-gold" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">품질 보증</h3>
                <p className="text-sm text-gray-600">
                  체계적인 테스트와 코드 리뷰를 통해 높은 품질을 보장합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 프로세스 섹션 */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <SectionHeader
            title="프로세스"
            subtitle="체계적이고 투명한 프로젝트 진행 과정"
          />
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
              {[
                { 
                  step: '01', 
                  title: '탐색', 
                  description: '문제를 깊이 이해하고 목표를 설정합니다',
                  details: ['사용자 리서치', '경쟁사 분석', '목표 설정', 'KPI 정의']
                },
                { 
                  step: '02', 
                  title: '설계', 
                  description: '사용자 중심의 정보구조를 설계합니다',
                  details: ['정보구조 설계', '와이어프레임', '사용자 플로우', '기능 명세']
                },
                { 
                  step: '03', 
                  title: '디자인', 
                  description: '브랜드와 사용자를 연결하는 인터페이스를 만듭니다',
                  details: ['브랜드 아이덴티티', 'UI 디자인', '프로토타입', '디자인 시스템']
                },
                { 
                  step: '04', 
                  title: '개발', 
                  description: '견고하고 확장 가능한 코드로 구현합니다',
                  details: ['프론트엔드 개발', '백엔드 연동', 'API 구축', '데이터베이스 설계']
                },
                { 
                  step: '05', 
                  title: '성장', 
                  description: '런칭 후 지속적인 개선과 성장을 지원합니다',
                  details: ['성능 최적화', '사용자 피드백', '기능 개선', '유지보수']
                },
              ].map((item, index) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vero-gold text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mb-4 text-sm text-gray-600">{item.description}</p>
                  <div className="space-y-1">
                    {item.details.map((detail, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {detail}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 신뢰 포인트 섹션 */}
      <section className="section-padding bg-vero-offwhite">
        <div className="container mx-auto">
          <SectionHeader
            title="신뢰 포인트"
            subtitle="베로와 함께하는 이유"
          />
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-8">
                <h3 className="mb-4 text-xl font-semibold">투명한 커뮤니케이션</h3>
                <p className="text-gray-600">
                  주간 리포트를 통해 프로젝트 진행 상황을 투명하게 공유합니다. 
                  모든 의사결정 과정을 문서화하고 공유합니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="mb-4 text-xl font-semibold">품질 체크리스트</h3>
                <p className="text-gray-600">
                  성능, 접근성, 보안 체크리스트를 공개하여 품질을 보장합니다. 
                  모든 프로젝트는 동일한 기준으로 검증됩니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="mb-4 text-xl font-semibold">30일 품질보증</h3>
                <p className="text-gray-600">
                  런칭 후 30일간 버그 핫픽스를 무료로 제공합니다. 
                  추가 기능 요청도 합리적인 비용으로 지원합니다.
                </p>
              </CardContent>
            </Card>
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
              지금, 베로와 시작해 보세요
            </h2>
            <p className="mt-4 text-lg text-gray-200">
              아이디어 단계부터 괜찮습니다. 진정성으로 함께 설계하겠습니다.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-vero-gold px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-vero-gold/90"
              >
                프로젝트 문의하기
              </a>
            </div>
          </div>
        </section>
      </VideoBackground>
    </>
  )
}
