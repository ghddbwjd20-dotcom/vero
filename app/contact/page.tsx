import ContactForm from '@/components/contact-form'
import SectionHeader from '@/components/section-header'
import VideoBackground from '@/components/video-background'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: '문의하기',
  description: '지금, 베로와 시작해 보세요. 아이디어 단계부터 괜찮습니다. 진정성으로 함께 설계하겠습니다.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-vero-offwhite to-white py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-vero-charcoal sm:text-5xl lg:text-6xl">
              지금, 베로와 시작해 보세요
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
              아이디어 단계부터 괜찮습니다. 진정성으로 함께 설계하겠습니다.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center rounded-lg bg-vero-gold px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-vero-gold/90"
              >
                바로 문의하기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 연락처 정보 섹션 */}
      <VideoBackground
        videoSrc="/videos/footer-background.mp4"
        fallbackGradient="bg-gradient-to-br from-vero-offwhite via-vero-gold/5 to-vero-primary/5"
        overlay={true}
        blur={false}
        className="section-padding py-20"
        blurTransition={true}
      >
        <section className="relative">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">연락처 정보</h2>
              <p className="text-lg text-gray-200">언제든지 편하게 연락주세요</p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vero-gold/10">
                  <Mail className="h-6 w-6 text-vero-gold" />
                </div>
                <h3 className="mb-2 font-semibold">이메일</h3>
                <p className="text-sm text-gray-600">contact@vero.co.kr</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vero-gold/10">
                  <Phone className="h-6 w-6 text-vero-gold" />
                </div>
                <h3 className="mb-2 font-semibold">전화</h3>
                <p className="text-sm text-gray-600">02-1234-5678</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vero-gold/10">
                  <MapPin className="h-6 w-6 text-vero-gold" />
                </div>
                <h3 className="mb-2 font-semibold">주소</h3>
                <p className="text-sm text-gray-600">서울특별시 강남구<br />테헤란로 123</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vero-gold/10">
                  <Clock className="h-6 w-6 text-vero-gold" />
                </div>
                <h3 className="mb-2 font-semibold">운영시간</h3>
                <p className="text-sm text-gray-600">평일 09:00 - 18:00</p>
              </CardContent>
            </Card>
          </div>
        </div>
        </section>
      </VideoBackground>

      {/* 문의 폼 섹션 */}
      <section id="contact-form" className="section-padding bg-vero-offwhite">
        <div className="container mx-auto">
          <SectionHeader
            title="프로젝트 문의"
            subtitle="프로젝트에 대한 자세한 내용을 알려주세요"
          />
          
          <div className="mt-16">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <SectionHeader
            title="자주 묻는 질문"
            subtitle="궁금한 점이 있으시면 언제든 문의해주세요"
          />
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold">프로젝트 기간은 얼마나 걸리나요?</h3>
                <p className="text-gray-600">
                  프로젝트 규모와 복잡도에 따라 다르지만, 일반적으로 2-6개월 정도 소요됩니다. 
                  정확한 일정은 상담을 통해 결정됩니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold">예산은 어떻게 책정되나요?</h3>
                <p className="text-gray-600">
                  프로젝트 요구사항과 범위에 따라 예산이 결정됩니다. 
                  무료 상담을 통해 정확한 견적을 제공해드립니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold">런칭 후 지원은 어떻게 되나요?</h3>
                <p className="text-gray-600">
                  런칭 후 30일간 무료 버그 수정을 제공하며, 
                  추가 기능 개발이나 유지보수도 지원합니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold">어떤 기술을 사용하나요?</h3>
                <p className="text-gray-600">
                  Next.js, React, TypeScript 등 최신 프론트엔드 기술과 
                  Node.js, Python 등 다양한 백엔드 기술을 사용합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

