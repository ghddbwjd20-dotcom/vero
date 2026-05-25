'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Mail, Calendar, Settings, LogOut, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // 아직 로딩 중
    if (!session) {
      router.push('/auth/signin')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vero-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vero-offwhite to-white">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-vero-charcoal">
                베로(VERO)
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            홈으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-vero-charcoal">대시보드</h1>
          <p className="text-gray-600 mt-2">안녕하세요, {session.user?.name}님!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 사용자 정보 카드 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                사용자 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">이름</p>
                <p className="font-medium">{session.user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">이메일</p>
                <p className="font-medium">{session.user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">역할</p>
                <Badge variant={session.user?.role === 'admin' ? 'default' : 'secondary'}>
                  {session.user?.role === 'admin' ? '관리자' : '사용자'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 빠른 액션 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>빠른 액션</CardTitle>
              <CardDescription>자주 사용하는 기능들</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                프로필 설정
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                문의 내역
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                일정 관리
              </Button>
            </CardContent>
          </Card>

          {/* 통계 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>활동 통계</CardTitle>
              <CardDescription>최근 활동 내역</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">총 문의</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">완료된 프로젝트</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">진행 중인 프로젝트</span>
                <span className="font-medium">0</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 최근 활동 섹션 */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
              <CardDescription>최근 문의 및 프로젝트 활동</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>아직 활동 내역이 없습니다</p>
                <p className="text-sm">문의를 남기시면 여기에 표시됩니다</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

