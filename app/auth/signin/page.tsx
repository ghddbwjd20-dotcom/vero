'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import SocialLoginButtons from '@/components/social-login-buttons'

export default function SignInPage() {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    remember: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        login: formData.login,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError('아이디/이메일 또는 비밀번호가 올바르지 않습니다')
      } else {
        // 로그인 성공 시 대시보드로 이동
        const session = await getSession()
        if (session?.user?.role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vero-offwhite to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-vero-charcoal">베로(VERO)</h1>
          <p className="mt-2 text-sm text-gray-600">진정성으로 신뢰를 설계합니다</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">로그인</CardTitle>
            <CardDescription className="text-center">
              계정에 로그인하여 서비스를 이용하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="login" className="text-sm font-medium text-gray-700">
                  아이디 또는 이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="login"
                    name="login"
                    type="text"
                    required
                    value={formData.login}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="아이디 또는 이메일을 입력하세요"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    placeholder="비밀번호를 입력하세요"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, remember: checked as boolean }))
                    }
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    로그인 상태 유지
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-vero-primary hover:underline">
                  비밀번호 찾기
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
            </form>

            {/* 소셜 로그인 버튼 */}
            <SocialLoginButtons mode="signin" className="mt-6" />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                계정이 없으신가요?{' '}
                <Link href="/auth/signup" className="text-vero-primary hover:underline font-medium">
                  회원가입
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
