'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, getSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (!searchParams) {
          router.push('/auth/signin')
          return
        }
        
        // URL에서 코드와 상태 파라미터 확인
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const error = searchParams.get('error')

        if (error) {
          console.error('OAuth 오류:', error)
          router.push('/auth/signin?error=oauth_error')
          return
        }

        if (code) {
          // NextAuth가 자동으로 처리하므로 잠시 대기 후 세션 확인
          setTimeout(async () => {
            try {
              const session = await getSession()
              
              if (session) {
                // 로그인 성공
                if (session.user?.role === 'admin') {
                  router.push('/admin/dashboard')
                } else if (session.user?.needsProfileSetup) {
                  // 프로필 설정이 필요한 경우 회원가입 페이지로
                  router.push('/auth/signup?social=true')
                } else {
                  // 프로필 설정이 완료된 경우 메인 페이지로
                  router.push('/')
                }
              } else {
                // 세션이 없으면 로그인 페이지로
                router.push('/auth/signin?error=session_error')
              }
            } catch (error) {
              console.error('세션 확인 오류:', error)
              router.push('/auth/signin?error=session_error')
            }
          }, 1000)
        } else {
          // 코드가 없으면 로그인 페이지로
          router.push('/auth/signin')
        }
      } catch (error) {
        console.error('콜백 처리 오류:', error)
        router.push('/auth/signin?error=callback_error')
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vero-offwhite to-white">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-vero-primary" />
            <h2 className="text-xl font-semibold text-gray-900">
              로그인 처리 중...
            </h2>
            <p className="text-sm text-gray-600">
              잠시만 기다려주세요.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vero-offwhite to-white">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-vero-primary" />
              <h2 className="text-xl font-semibold text-gray-900">
                로딩 중...
              </h2>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  )
}
