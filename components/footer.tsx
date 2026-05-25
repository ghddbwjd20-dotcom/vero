import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import VideoBackground from '@/components/video-background'

export default function Footer() {
  // 임시로 하드코딩된 텍스트 사용
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'footer.services': '서비스',
      'footer.portfolio': '포트폴리오',
      'footer.about': '회사 소개',
      'footer.contact': '문의하기',
      'footer.legal': '법적 고지',
      'footer.privacy': '개인정보처리방침',
      'footer.terms': '이용약관',
      'footer.cookies': '쿠키 정책',
      'footer.rights': '© 2024 VERO. 모든 권리 보유.',
    }
    return translations[key] || key
  }
  
  return (
    <VideoBackground
      videoSrc="/videos/footer-background.mp4"
      fallbackGradient="bg-gradient-to-br from-vero-charcoal via-vero-primary/10 to-vero-charcoal"
      overlay={true}
      blur={false}
      className="relative"
      blurTransition={true}
    >
      <footer className="bg-vero-charcoal/90 text-white backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* 회사 정보 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">베로(VERO)</h3>
              <p className="text-sm text-gray-200">
                진정성으로 신뢰를 쌓는 웹 에이전시
              </p>
              <div className="space-y-2 text-sm text-gray-300">
                <p>상호: 베로(VERO)</p>
                <p>대표: 홍유정</p>
                <p>사업자등록번호: 757-37-01436</p>
              </div>
            </div>

            {/* 연락처 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">연락처</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-white" />
                  <span className="text-white">ghddbwjd20@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-white" />
                  <span className="text-white">010-6880-0958</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-white" />
                  <span className="text-white">경기도 부천시 로</span>
                </div>
              </div>
            </div>

            {/* 서비스 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">서비스</h4>
              <div className="space-y-2 text-sm">
                <Link href="/portfolio" className="block text-gray-300 hover:text-white transition-colors">
                  {t('footer.portfolio')}
                </Link>
                <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                  {t('footer.about')}
                </Link>
                <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                  {t('footer.contact')}
                </Link>
              </div>
            </div>

            {/* 법적 고지 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">법적 고지</h4>
              <div className="space-y-2 text-sm">
                <Link href="/privacy" className="block text-gray-300 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
                <Link href="/terms" className="block text-gray-300 hover:text-white transition-colors">
                  {t('footer.terms')}
                </Link>
                <Link href="/cookies" className="block text-gray-300 hover:text-white transition-colors">
                  {t('footer.cookies')}
                </Link>
              </div>
            </div>
          </div>

          {/* 하단 저작권 */}
          <div className="mt-8 border-t border-gray-600 pt-8">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <p className="text-sm text-gray-300">
                {t('footer.rights')}
              </p>
              <p className="text-sm text-gray-300">
                진정성으로 신뢰를 쌓는 웹 에이전시
              </p>
            </div>
          </div>
        </div>
      </footer>
    </VideoBackground>
  )
}