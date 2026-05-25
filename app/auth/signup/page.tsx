'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import SocialLoginButtons from '@/components/social-login-buttons'

function SignUpContent() {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
    phone: '',
    company: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isSocialUser, setIsSocialUser] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()

  // localStorage 키
  const STORAGE_KEY = 'signup-form-data'

  // 비밀번호 강도 계산
  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 6) strength += 1
    if (password.length >= 8) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  // 소셜 로그인 사용자 확인
  useEffect(() => {
    if (!searchParams) return
    const socialParam = searchParams.get('social')
    if (socialParam === 'true' && session?.user) {
      setIsSocialUser(true)
      // 소셜 로그인 사용자의 기본 정보 설정
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
        userId: session.user.userId || ''
      }))
    }
  }, [searchParams, session])

  // localStorage에서 데이터 복원 (일반 회원가입인 경우만)
  useEffect(() => {
    if (!isSocialUser) {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          setFormData(prev => ({ ...prev, ...parsedData }))
          
          // 비밀번호 강도도 복원
          if (parsedData.password) {
            setPasswordStrength(calculatePasswordStrength(parsedData.password))
          }
        } catch (error) {
          console.error('저장된 폼 데이터 복원 실패:', error)
        }
      }
    }
  }, [isSocialUser])

  // 폼 데이터를 localStorage에 저장
  const saveFormData = (data: typeof formData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('폼 데이터 저장 실패:', error)
    }
  }

  // localStorage에서 데이터 삭제
  const clearFormData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('폼 데이터 삭제 실패:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    // 소셜 로그인 사용자인 경우
    if (isSocialUser) {
      // 소셜 로그인 사용자는 필수 정보만 검사
      if (!formData.birthDate || !formData.gender || !formData.phone) {
        setError('생년월일, 성별, 전화번호를 입력해주세요')
        setIsLoading(false)
        return
      }

      // 전화번호 형식 검사
      const phoneRegex = /^010-\d{4}-\d{4}$/
      if (!phoneRegex.test(formData.phone)) {
        setError('전화번호는 010-1234-5678 형식으로 입력해주세요')
        setIsLoading(false)
        return
      }

      // 나이 검사 (생년월일 기준)
      const birthYear = new Date(formData.birthDate).getFullYear()
      const currentYear = new Date().getFullYear()
      const age = currentYear - birthYear
      if (age < 14 || age > 100) {
        setError('만 14세 이상 100세 이하만 가입 가능합니다')
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch('/api/auth/update-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            birthDate: formData.birthDate,
            gender: formData.gender,
            phone: formData.phone,
            company: formData.company
          }),
        })

        const data = await response.json()

        if (response.ok) {
          setSuccess('프로필 설정이 완료되었습니다.')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        } else {
          setError(data.error || '프로필 설정에 실패했습니다')
        }
      } catch (error) {
        setError('프로필 설정 중 오류가 발생했습니다')
      } finally {
        setIsLoading(false)
      }
      return
    }

    // 일반 회원가입 사용자인 경우
    // 필수 필드 검증
    if (!formData.userId || !formData.name || !formData.email || !formData.password || 
        !formData.confirmPassword || !formData.birthDate || !formData.gender || !formData.phone) {
      setError('모든 필수 항목을 입력해주세요')
      setIsLoading(false)
      return
    }

    // 아이디 길이 검증
    if (formData.userId.length < 3 || formData.userId.length > 50) {
      setError('아이디는 3-50자 사이로 입력해주세요')
      setIsLoading(false)
      return
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('올바른 이메일 형식을 입력해주세요')
      setIsLoading(false)
      return
    }

    // 비밀번호 강도 검증
    if (formData.password.length < 6) {
      setError('비밀번호는 6자 이상 입력해주세요')
      setIsLoading(false)
      return
    }

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다')
      setIsLoading(false)
      return
    }

    // 전화번호 형식 검증
    const phoneRegex = /^010-\d{4}-\d{4}$/
    if (!phoneRegex.test(formData.phone)) {
      setError('전화번호는 010-1234-5678 형식으로 입력해주세요')
      setIsLoading(false)
      return
    }

    // 생년월일 검증
    const birthDate = new Date(formData.birthDate)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    if (age < 14 || age > 100) {
      setError('만 14세 이상 100세 이하만 가입 가능합니다')
      setIsLoading(false)
      return
    }

    // 약관 동의 확인
    if (!formData.agreeToTerms || !formData.agreeToPrivacy) {
      setError('이용약관 및 개인정보처리방침에 동의해주세요')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('회원가입이 완료되었습니다. 로그인해주세요.')
        // 성공 시 localStorage 데이터 삭제
        clearFormData()
        setTimeout(() => {
          router.push('/auth/signin')
        }, 2000)
      } else {
        setError(data.error || '회원가입에 실패했습니다')
      }
    } catch (error) {
      setError('회원가입 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const type = 'type' in e.target ? e.target.type : undefined
    const checked = 'checked' in e.target ? e.target.checked : undefined
    
    // 전화번호 자동 포맷팅
    if (name === 'phone') {
      const phoneValue = value.replace(/\D/g, '') // 숫자만 추출
      let formattedPhone = phoneValue
      
      if (phoneValue.length >= 3) {
        formattedPhone = phoneValue.substring(0, 3) + '-' + phoneValue.substring(3)
      }
      if (phoneValue.length >= 7) {
        formattedPhone = phoneValue.substring(0, 3) + '-' + phoneValue.substring(3, 7) + '-' + phoneValue.substring(7, 11)
      }
      
      const newFormData = {
        ...formData,
        [name]: formattedPhone
      }
      
      setFormData(newFormData)
      saveFormData(newFormData)
      return
    }
    
    const newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    }
    
    setFormData(newFormData)
    
    // localStorage에 저장
    saveFormData(newFormData)
    
    // 비밀번호 강도 업데이트
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value))
    }
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
            <CardTitle className="text-2xl text-center">
              {isSocialUser ? '프로필 설정' : '회원가입'}
            </CardTitle>
            <CardDescription className="text-center">
              {isSocialUser 
                ? '추가 정보를 입력하여 프로필을 완성해주세요' 
                : '새 계정을 만들어 서비스를 이용하세요'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                  {success}
                </div>
              )}

              {!isSocialUser && (
                <div className="space-y-2">
                  <label htmlFor="userId" className="text-sm font-medium text-gray-700">
                    아이디 *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="userId"
                      name="userId"
                      type="text"
                      required
                      value={formData.userId}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="아이디를 입력하세요 (3-50자)"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  이름 *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="실명을 입력하세요"
                  />
                </div>
              </div>

              {!isSocialUser && (
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    이메일 *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="이메일을 입력하세요"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
                    생년월일 *
                  </label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={handleChange}
                    placeholder="생년월일"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="gender" className="text-sm font-medium text-gray-700">
                    성별 *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vero-primary focus:border-transparent"
                  >
                    <option value="">선택하세요</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                    <option value="other">기타</option>
                    <option value="prefer_not_to_say">응답하지 않음</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  전화번호 *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  maxLength={13}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-1234-5678"
                  pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-gray-700">
                  회사명
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="회사명을 입력하세요"
                />
              </div>

              {!isSocialUser && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                      비밀번호 *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 pr-10"
                        placeholder="비밀번호를 입력하세요 (6자 이상)"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">
                        영문, 숫자, 특수문자를 포함하여 6자 이상 입력해주세요
                      </p>
                      {formData.password && (
                        <div className="space-y-1">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5, 6].map((level) => (
                              <div
                                key={level}
                                className={`h-1 flex-1 rounded ${
                                  level <= passwordStrength
                                    ? passwordStrength <= 2
                                      ? 'bg-red-500'
                                      : passwordStrength <= 4
                                      ? 'bg-yellow-500'
                                      : 'bg-green-500'
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">
                            {passwordStrength <= 2 && '약함'}
                            {passwordStrength > 2 && passwordStrength <= 4 && '보통'}
                            {passwordStrength > 4 && '강함'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      비밀번호 확인 *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-10 pr-10"
                        placeholder="비밀번호를 다시 입력하세요"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {!isSocialUser && (
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => {
                        const newFormData = { ...formData, agreeToTerms: checked as boolean }
                        setFormData(newFormData)
                        saveFormData(newFormData)
                      }}
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                      <Link href="/terms" className="text-vero-primary hover:underline">
                        이용약관
                      </Link>에 동의합니다
                    </label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToPrivacy"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onCheckedChange={(checked) => {
                        const newFormData = { ...formData, agreeToPrivacy: checked as boolean }
                        setFormData(newFormData)
                        saveFormData(newFormData)
                      }}
                    />
                    <label htmlFor="agreeToPrivacy" className="text-sm text-gray-600">
                      <Link href="/privacy" className="text-vero-primary hover:underline">
                        개인정보처리방침
                      </Link>에 동의합니다
                    </label>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading 
                  ? (isSocialUser ? '설정 중...' : '회원가입 중...') 
                  : (isSocialUser ? '프로필 완성' : '회원가입')
                }
              </Button>
            </form>

            {/* 소셜 로그인 버튼 */}
            <SocialLoginButtons mode="signup" className="mt-6" />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                이미 계정이 있으신가요?{' '}
                <Link href="/auth/signin" className="text-vero-primary hover:underline font-medium">
                  로그인
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

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vero-offwhite to-white">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                로딩 중...
              </h2>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <SignUpContent />
    </Suspense>
  )
}
