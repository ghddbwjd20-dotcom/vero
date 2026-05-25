'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { SiKakao, SiNaver } from 'react-icons/si'

interface SocialLoginButtonsProps {
  mode?: 'signin' | 'signup'
  className?: string
}

export default function SocialLoginButtons({ mode = 'signin', className = '' }: SocialLoginButtonsProps) {
  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard' })
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            {mode === 'signin' ? '또는' : '또는 소셜 계정으로'} 계속하기
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* 구글 로그인 */}
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('google')}
          className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          <FcGoogle className="h-5 w-5 mr-3" />
          Google로 {mode === 'signin' ? '로그인' : '회원가입'}
        </Button>

        {/* 카카오 로그인 */}
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('kakao')}
          className="w-full h-12 text-gray-700 border-gray-300 hover:bg-yellow-50"
          style={{ backgroundColor: '#FEE500', borderColor: '#FEE500' }}
        >
          <SiKakao className="h-5 w-5 mr-3" style={{ color: '#000' }} />
          <span style={{ color: '#000' }}>
            카카오로 {mode === 'signin' ? '로그인' : '회원가입'}
          </span>
        </Button>

        {/* 네이버 로그인 */}
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('naver')}
          className="w-full h-12 text-white border-green-500 hover:bg-green-600"
          style={{ backgroundColor: '#03C75A', borderColor: '#03C75A' }}
        >
          <SiNaver className="h-5 w-5 mr-3" />
          네이버로 {mode === 'signin' ? '로그인' : '회원가입'}
        </Button>
      </div>
    </div>
  )
}

