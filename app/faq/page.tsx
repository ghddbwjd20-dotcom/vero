import Hero from '@/components/hero'
import SectionHeader from '@/components/section-header'
import VideoBackground from '@/components/video-background'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { HelpCircle, Shield, CreditCard, Clock, Users, Zap } from 'lucide-react'

export const metadata = {
  title: '자주 묻는 질문',
  description: '베로(VERO) 웹 에이전시에 대한 자주 묻는 질문들을 확인하세요.',
}

const faqCategories = [
  {
    title: '가격 및 견적',
    icon: CreditCard,
    color: 'text-vero-gold',
    questions: [
      {
        question: '왜 저렴하게 가능한가요?',
        answer: '템플릿을 그대로 쓰지 않고, 핵심만 재사용해 시간을 줄입니다. 자동화와 클라우드 기술로 운영 비용을 낮춰 합리적인 가격을 제공합니다.'
      },
      {
        question: '숨은 비용이 있나요?',
        answer: '없습니다. 도메인, 호스팅, 보안, 유지 등 모든 선택 항목은 견적서에 별도로 표기하며, 추가 작업은 사전 합의 없이는 진행하지 않습니다.'
      },
      {
        question: '분할 결제가 되나요?',
        answer: '네, 협의 가능합니다. 단계별 납품과 검수에 맞춰 분할 청구를 지원하며, 초기 제작비 분할도 상담해 드립니다.'
      },
      {
        question: '유지관리 비용은 얼마인가요?',
        answer: '월 관리(5-10만원) 또는 건별 유지(시간당 3-5만원) 중 선택 가능합니다. 기본적인 업데이트와 보안 패치는 월 관리에 포함됩니다.'
      }
    ]
  },
  {
    title: '기술 및 품질',
    icon: Zap,
    color: 'text-vero-primary',
    questions: [
      {
        question: '앱/빌더를 못 다루는데도 가능한가요?',
        answer: '가능합니다. 세팅부터 교육, 운영 가이드까지 제공하며, 원하면 대행 운영도 선택 가능합니다. 사장님은 사업에만 집중하세요.'
      },
      {
        question: '모바일 최적화는 되나요?',
        answer: '모든 웹사이트는 반응형으로 제작되어 모바일, 태블릿, 데스크탑에서 완벽하게 작동합니다. 모바일 사용성을 최우선으로 고려합니다.'
      },
      {
        question: '검색엔진 최적화(SEO)는 포함되나요?',
        answer: '기본 SEO 설정은 모든 패키지에 포함됩니다. 고급 SEO는 프로페셔널 패키지부터 제공하며, 키워드 분석과 콘텐츠 최적화를 포함합니다.'
      },
      {
        question: '보안은 어떻게 관리하나요?',
        answer: 'HTTPS 강제, 보안 헤더 설정, 정기적인 보안 업데이트, 백업 시스템을 통해 안전한 웹사이트를 유지합니다. 개인정보보호법도 완벽히 준수합니다.'
      }
    ]
  },
  {
    title: '프로젝트 진행',
    icon: Clock,
    color: 'text-vero-gold',
    questions: [
      {
        question: '프로젝트 기간은 얼마나 걸리나요?',
        answer: '스타터: 4-6주, 프로페셔널: 8-12주, 엔터프라이즈: 12-16주 정도 소요됩니다. 복잡도에 따라 조정 가능합니다.'
      },
      {
        question: '진행 상황을 어떻게 확인하나요?',
        answer: '주간 리포트를 통해 진행 상황을 투명하게 공유하며, 필요시 실시간 소통 채널을 제공합니다. 모든 변경사항은 사전에 논의합니다.'
      },
      {
        question: '디자인 수정은 몇 번까지 가능한가요?',
        answer: '스타터: 1회, 프로페셔널: 3회, 엔터프라이즈: 무제한 수정 가능합니다. 추가 수정은 별도 비용이 발생할 수 있습니다.'
      },
      {
        question: '런칭 후 지원은 어떻게 되나요?',
        answer: '런칭 후 30일간 무료 품질보증을 제공하며, 버그 수정과 기본적인 조정을 지원합니다. 이후 유지관리 서비스를 이용하실 수 있습니다.'
      }
    ]
  },
  {
    title: '서비스 범위',
    icon: Users,
    color: 'text-vero-primary',
    questions: [
      {
        question: '어떤 종류의 웹사이트를 만들 수 있나요?',
        answer: '랜딩페이지, 기업 홈페이지, 쇼핑몰, 포트폴리오, 블로그, 예약 시스템 등 다양한 웹사이트를 제작할 수 있습니다. 복잡한 기능도 협의 가능합니다.'
      },
      {
        question: '소스코드 소유권은 누구에게 있나요?',
        answer: '프로젝트 완료 후 고객에게 소스코드 소유권이 이전됩니다. 단, 사용한 라이브러리와 프레임워크는 각각의 라이선스를 따릅니다.'
      },
      {
        question: '도메인과 호스팅은 어떻게 하나요?',
        answer: '도메인 등록과 호스팅 설정을 대행해 드리거나, 고객이 직접 관리하실 수 있습니다. 안정적인 호스팅 서비스를 추천해 드립니다.'
      },
      {
        question: '다국어 지원이 가능한가요?',
        answer: '네, 다국어 지원이 가능합니다. i18n 구조로 설계하여 향후 언어 추가도 쉽게 할 수 있습니다.'
      }
    ]
  },
  {
    title: '법적 및 보안',
    icon: Shield,
    color: 'text-vero-gold',
    questions: [
      {
        question: '개인정보처리방침은 어떻게 작성하나요?',
        answer: '법무팀과 협력하여 개인정보처리방침, 이용약관, 쿠키 정책을 작성해 드립니다. 개인정보보호법을 완벽히 준수합니다.'
      },
      {
        question: '접근성은 어떻게 보장하나요?',
        answer: 'WCAG 2.2 AA 기준을 준수하여 시각장애인, 청각장애인 등 모든 사용자가 접근 가능한 웹사이트를 제작합니다. 접근성 검수도 포함됩니다.'
      },
      {
        question: '데이터 백업은 어떻게 되나요?',
        answer: '자동 백업 시스템을 구축하여 데이터 손실을 방지합니다. 일일 백업과 주간 백업을 제공하며, 복구 서비스도 지원합니다.'
      },
      {
        question: '계약서는 어떻게 작성하나요?',
        answer: '명확한 계약서를 작성하여 프로젝트 범위, 일정, 비용, 지적재산권 등을 명시합니다. 법무 검토를 거쳐 공정한 계약을 체결합니다.'
      }
    ]
  }
]

export default function FAQPage() {
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
          title="자주 묻는 질문"
          subtitle="베로(VERO)에 대한 궁금한 점들을 확인해보세요"
          ctaText="직접 문의하기"
          ctaHref="/contact"
        />
      </VideoBackground>

      {/* FAQ Categories */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <SectionHeader
            title="FAQ 카테고리"
            subtitle="궁금한 주제별로 정리된 질문들을 확인하세요"
          />
          
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {faqCategories.map((category, index) => (
              <Card key={category.title} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-${category.color.replace('text-', '')}/10`}>
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {category.questions.length}개의 질문
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {category.questions.length}개 질문
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding bg-vero-offwhite">
        <div className="container mx-auto">
          <SectionHeader
            title="상세 FAQ"
            subtitle="각 카테고리별 자세한 질문과 답변을 확인하세요"
          />
          
          <div className="mt-16 space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={category.title}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-${category.color.replace('text-', '')}/10`}>
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faq.question} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <div className="flex items-center justify-center mb-4">
              <HelpCircle className="h-8 w-8 text-vero-gold mr-3" />
              <h2 className="text-3xl font-bold text-white">더 궁금한 점이 있으신가요?</h2>
            </div>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              FAQ에서 답을 찾지 못하셨다면 언제든지 문의해 주세요. 
              베로의 전문가가 직접 답변해 드립니다.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-vero-gold px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-vero-gold/90"
              >
                문의하기
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-white px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-vero-charcoal"
              >
                견적 확인하기
              </a>
            </div>
          </div>
        </section>
      </VideoBackground>
    </>
  )
}
