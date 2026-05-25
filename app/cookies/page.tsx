import Hero from '@/components/hero'
import SectionHeader from '@/components/section-header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cookie, Settings, Shield, Eye, Trash2 } from 'lucide-react'

export const metadata = {
  title: '쿠키 정책',
  description: '베로(VERO)의 쿠키 사용 정책을 확인하세요.',
}

export default function CookiesPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="쿠키 정책"
        subtitle="베로(VERO)의 쿠키 사용에 대한 정책입니다"
        ctaText="문의하기"
        ctaHref="/contact"
      />

      {/* 쿠키 정책 내용 */}
      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <Badge className="mb-4">시행일: 2024년 1월 1일</Badge>
              <p className="text-gray-600">
                베로(VERO)는 웹사이트 이용자의 편의를 제공하고 서비스를 개선하기 위해 
                쿠키를 사용합니다. 본 정책은 쿠키 사용에 대한 정보를 제공합니다.
              </p>
            </div>

            <div className="space-y-8">
              {/* 1. 쿠키란? */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Cookie className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">1. 쿠키란?</h2>
                  </div>
                  <p className="text-gray-700">
                    쿠키는 웹사이트를 방문할 때 브라우저에 저장되는 작은 텍스트 파일입니다. 
                    쿠키는 웹사이트가 사용자의 기기를 인식하고, 사용자의 선호도와 설정을 기억하는 데 도움을 줍니다.
                  </p>
                </CardContent>
              </Card>

              {/* 2. 쿠키 사용 목적 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Settings className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">2. 쿠키 사용 목적</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="font-semibold mb-2">필수 쿠키</h3>
                      <p>웹사이트의 기본 기능을 제공하기 위해 필요한 쿠키입니다.</p>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>사용자 인증 및 보안</li>
                        <li>장바구니 및 주문 처리</li>
                        <li>언어 및 지역 설정</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">성능 쿠키</h3>
                      <p>웹사이트의 성능을 분석하고 개선하기 위한 쿠키입니다.</p>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>방문자 수 및 페이지 조회수 분석</li>
                        <li>사용자 행동 패턴 분석</li>
                        <li>웹사이트 속도 최적화</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">마케팅 쿠키</h3>
                      <p>개인화된 광고 및 마케팅을 위한 쿠키입니다.</p>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>관심사 기반 광고 제공</li>
                        <li>마케팅 캠페인 효과 측정</li>
                        <li>소셜 미디어 연동</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 3. 사용하는 쿠키의 종류 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">3. 사용하는 쿠키의 종류</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left">쿠키명</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">목적</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">보유기간</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">유형</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">_vero_session</td>
                          <td className="border border-gray-300 px-4 py-2">사용자 세션 관리</td>
                          <td className="border border-gray-300 px-4 py-2">세션 종료 시</td>
                          <td className="border border-gray-300 px-4 py-2">필수</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">_vero_preferences</td>
                          <td className="border border-gray-300 px-4 py-2">사용자 설정 저장</td>
                          <td className="border border-gray-300 px-4 py-2">1년</td>
                          <td className="border border-gray-300 px-4 py-2">성능</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">_vero_analytics</td>
                          <td className="border border-gray-300 px-4 py-2">웹사이트 분석</td>
                          <td className="border border-gray-300 px-4 py-2">2년</td>
                          <td className="border border-gray-300 px-4 py-2">성능</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* 4. 쿠키 관리 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Eye className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">4. 쿠키 관리</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      사용자는 쿠키 설정을 통해 쿠키 사용을 제어할 수 있습니다. 
                      다만, 필수 쿠키를 비활성화할 경우 웹사이트의 일부 기능이 제한될 수 있습니다.
                    </p>
                    
                    <div>
                      <h3 className="font-semibold mb-2">브라우저 설정을 통한 쿠키 관리</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Chrome:</strong> 설정 &gt; 개인정보 보호 및 보안 &gt; 쿠키 및 기타 사이트 데이터</li>
                        <li><strong>Firefox:</strong> 설정 &gt; 개인정보 보호 및 보안 &gt; 쿠키 및 사이트 데이터</li>
                        <li><strong>Safari:</strong> 환경설정 &gt; 개인정보 보호 &gt; 쿠키 및 웹사이트 데이터</li>
                        <li><strong>Edge:</strong> 설정 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및 사이트 데이터</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">쿠키 동의 관리</h3>
                      <p>
                        웹사이트 하단의 "쿠키 설정" 버튼을 통해 쿠키 사용 동의를 
                        개별적으로 관리할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 5. 제3자 쿠키 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Trash2 className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">5. 제3자 쿠키</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      베로(VERO)는 서비스 개선을 위해 다음과 같은 제3자 서비스를 사용할 수 있습니다:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Google Analytics:</strong> 웹사이트 사용 통계 분석</li>
                      <li><strong>Google Tag Manager:</strong> 태그 관리 및 추적</li>
                      <li><strong>Facebook Pixel:</strong> 광고 효과 측정</li>
                      <li><strong>Hotjar:</strong> 사용자 행동 분석</li>
                    </ul>
                    <p>
                      이러한 서비스들은 자체적인 쿠키 정책을 가지고 있으며, 
                      각 서비스의 웹사이트에서 자세한 정보를 확인할 수 있습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-6 bg-vero-offwhite rounded-lg">
              <h3 className="text-lg font-semibold mb-4">쿠키 정책 변경</h3>
              <p className="text-gray-700">
                본 쿠키 정책은 필요에 따라 변경될 수 있으며, 변경 시 웹사이트를 통해 공지합니다. 
                중요한 변경사항이 있는 경우 이메일을 통해 별도로 안내할 수 있습니다.
              </p>
            </div>

            <div className="mt-8 p-6 bg-vero-primary/5 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-vero-primary">문의사항</h3>
              <p className="text-gray-700">
                쿠키 정책에 대한 문의사항이 있으시면 언제든지 연락해 주세요.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p><strong>이메일:</strong> privacy@vero.co.kr</p>
                <p><strong>전화:</strong> 02-1234-5678</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}