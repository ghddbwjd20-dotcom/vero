import Hero from '@/components/hero'
import SectionHeader from '@/components/section-header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, FileText, Calendar, Users, Lock, Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: '개인정보처리방침',
  description: '베로(VERO)의 개인정보처리방침을 확인하세요.',
}

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="개인정보처리방침"
        subtitle="베로(VERO)는 고객의 개인정보를 안전하게 보호합니다"
        ctaText="문의하기"
        ctaHref="/contact"
      />

      {/* 개인정보처리방침 내용 */}
      <section className="section-padding bg-white">
        <div className="container mx-auto max-w-4xl">
          {/* 뒤로가기 버튼 */}
          <div className="mb-8">
            <Link href="/auth/signup">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>회원가입으로 돌아가기</span>
              </Button>
            </Link>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <Badge className="mb-4">시행일: 2024년 1월 1일</Badge>
              <p className="text-gray-600">
                베로(VERO)는 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고자 
                다음과 같이 개인정보처리방침을 수립·공개합니다.
              </p>
            </div>

            <div className="space-y-8">
              {/* 1. 개인정보의 처리목적 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">1. 개인정보의 처리목적</h2>
                  </div>
                  <p className="text-gray-700 mb-4">
                    베로(VERO)는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 
                    다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 
                    개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>웹사이트 제작 서비스 제공 및 계약 이행</li>
                    <li>고객 상담 및 문의사항 처리</li>
                    <li>서비스 개선 및 신규 서비스 개발</li>
                    <li>마케팅 및 광고에 활용 (동의 시)</li>
                    <li>법령 및 약관이 정하는 의무의 이행</li>
                  </ul>
                </CardContent>
              </Card>

              {/* 2. 개인정보의 처리 및 보유기간 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">2. 개인정보의 처리 및 보유기간</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="font-semibold mb-2">서비스 이용자 정보</h3>
                      <p>보유기간: 서비스 이용 종료 후 3년</p>
                      <p>근거: 전자상거래 등에서의 소비자보호에 관한 법률</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">상담 및 문의 정보</h3>
                      <p>보유기간: 문의 처리 완료 후 1년</p>
                      <p>근거: 개인정보보호법</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">마케팅 정보</h3>
                      <p>보유기간: 동의 철회 시까지</p>
                      <p>근거: 개인정보보호법</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 3. 처리하는 개인정보의 항목 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">3. 처리하는 개인정보의 항목</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="font-semibold mb-2">필수항목</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>이름, 연락처(전화번호, 이메일)</li>
                        <li>회사명, 직책</li>
                        <li>서비스 이용 기록, 접속 로그</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">선택항목</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>마케팅 정보 수신 동의 여부</li>
                        <li>추가 연락처 정보</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 4. 개인정보의 제3자 제공 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">4. 개인정보의 제3자 제공</h2>
                  </div>
                  <p className="text-gray-700">
                    베로(VERO)는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 
                    다만, 아래의 경우에는 예외로 합니다.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
                    <li>이용자가 사전에 동의한 경우</li>
                    <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                    <li>서비스 제공에 따른 요금정산을 위하여 필요한 경우</li>
                  </ul>
                </CardContent>
              </Card>

              {/* 5. 개인정보의 안전성 확보조치 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Lock className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">5. 개인정보의 안전성 확보조치</h2>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>개인정보 취급 직원의 최소화 및 교육</li>
                    <li>개인정보에 대한 접근 제한</li>
                    <li>개인정보의 암호화</li>
                    <li>해킹 등에 대비한 기술적 대책</li>
                    <li>개인정보처리시스템 등의 접근권한 관리</li>
                    <li>개인정보의 정기적인 점검</li>
                  </ul>
                </CardContent>
              </Card>

              {/* 6. 개인정보보호책임자 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Eye className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">6. 개인정보보호책임자</h2>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>성명:</strong> 베로(VERO) 대표</p>
                    <p><strong>연락처:</strong> privacy@vero.co.kr</p>
                    <p><strong>주소:</strong> 서울특별시 강남구 테헤란로 123, 456호</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-6 bg-vero-offwhite rounded-lg">
              <h3 className="text-lg font-semibold mb-4">개인정보처리방침 변경</h3>
              <p className="text-gray-700">
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 
                삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}