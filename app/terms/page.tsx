import Hero from '@/components/hero'
import SectionHeader from '@/components/section-header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Scale, Users, AlertTriangle, Shield, Gavel, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: '이용약관',
  description: '베로(VERO)의 이용약관을 확인하세요.',
}

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="이용약관"
        subtitle="베로(VERO) 서비스 이용에 관한 약관입니다"
        ctaText="문의하기"
        ctaHref="/contact"
      />

      {/* 이용약관 내용 */}
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
                본 약관은 베로(VERO)가 제공하는 웹사이트 제작 서비스의 이용과 관련하여 
                회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </div>

            <div className="space-y-8">
              {/* 1. 서비스의 정의 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">제1조 (서비스의 정의)</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      "서비스"란 베로(VERO)가 제공하는 다음의 서비스를 의미합니다:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>웹사이트 기획, 디자인, 개발 서비스</li>
                      <li>웹사이트 유지보수 및 관리 서비스</li>
                      <li>웹사이트 관련 컨설팅 서비스</li>
                      <li>기타 회사가 정하는 서비스</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* 2. 약관의 효력 및 변경 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Scale className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">제2조 (약관의 효력 및 변경)</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      ① 본 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.
                    </p>
                    <p>
                      ② 회사는 필요하다고 인정되는 경우 본 약관을 변경할 수 있으며, 
                      변경된 약관은 서비스 내 공지사항을 통해 공지합니다.
                    </p>
                    <p>
                      ③ 이용자가 변경된 약관에 동의하지 않는 경우, 서비스 이용을 중단할 수 있습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 3. 서비스의 제공 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">제3조 (서비스의 제공)</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      ① 회사는 이용자와 별도로 서비스 계약을 체결하여 서비스를 제공합니다.
                    </p>
                    <p>
                      ② 서비스의 구체적인 내용, 범위, 기간, 비용 등은 별도의 계약서에 명시합니다.
                    </p>
                    <p>
                      ③ 회사는 서비스 제공을 위해 필요한 경우 이용자에게 추가 정보를 요청할 수 있습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 4. 이용자의 의무 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">제4조 (이용자의 의무)</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>서비스 이용 시 필요한 정보를 허위로 제공하는 행위</li>
                      <li>타인의 정보를 도용하는 행위</li>
                      <li>서비스의 안정적 운영을 방해하는 행위</li>
                      <li>기타 관련 법령에 위반되는 행위</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* 5. 지적재산권 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">제5조 (지적재산권)</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      ① 서비스와 관련된 모든 지적재산권은 회사에 귀속됩니다.
                    </p>
                    <p>
                      ② 프로젝트 완료 후 고객에게 소스코드 소유권이 이전되며, 
                      사용된 라이브러리와 프레임워크는 각각의 라이선스를 따릅니다.
                    </p>
                    <p>
                      ③ 고객이 제공한 자료의 지적재산권은 고객에게 귀속됩니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 6. 손해배상 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Gavel className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">제6조 (손해배상)</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      ① 회사는 서비스 제공과 관련하여 고의 또는 중대한 과실이 없는 한 손해배상 책임을 지지 않습니다.
                    </p>
                    <p>
                      ② 회사의 손해배상 책임은 계약금액을 초과하지 않습니다.
                    </p>
                    <p>
                      ③ 천재지변, 전쟁, 정부의 규제 등 불가항력적 사유로 인한 손해는 배상하지 않습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 7. 계약 해지 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">제7조 (계약 해지)</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      ① 양 당사자는 상대방이 본 약관을 위반한 경우 계약을 해지할 수 있습니다.
                    </p>
                    <p>
                      ② 계약 해지 시 이미 제공된 서비스에 대한 대가는 정산됩니다.
                    </p>
                    <p>
                      ③ 계약 해지 후에도 제5조(지적재산권)는 계속 유효합니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 8. 분쟁 해결 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Scale className="h-6 w-6 text-vero-gold mr-3" />
                    <h2 className="text-xl font-semibold">제8조 (분쟁 해결)</h2>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      ① 서비스 이용과 관련하여 발생한 분쟁은 대한민국 법률에 따라 해결합니다.
                    </p>
                    <p>
                      ② 분쟁의 관할은 회사의 본사 소재지를 관할하는 법원으로 합니다.
                    </p>
                    <p>
                      ③ 분쟁 발생 시 우선적으로 협의를 통해 해결하도록 노력합니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-6 bg-vero-offwhite rounded-lg">
              <h3 className="text-lg font-semibold mb-4">부칙</h3>
              <p className="text-gray-700">
                본 약관은 2024년 1월 1일부터 시행합니다. 
                약관의 변경이 있는 경우 변경된 약관의 시행일부터 효력을 발생합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}