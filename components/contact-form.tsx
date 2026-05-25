'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-hot-toast'
import { Send, Loader2 } from 'lucide-react'
import { ContactFormData } from '@/types'

const contactSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  company: z.string().optional(),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  phone: z.string().optional(),
  budget: z.string().min(1, '예산을 선택해주세요'),
  timeline: z.string().min(1, '일정을 선택해주세요'),
  requirements: z.string().min(10, '요구사항을 10자 이상 입력해주세요'),
  agreeToTerms: z.boolean().refine((val) => val === true, '이용약관에 동의해주세요'),
  agreeToPrivacy: z.boolean().refine((val) => val === true, '개인정보처리방침에 동의해주세요'),
})

const budgetOptions = [
  { value: 'under-500', label: '500만원 미만' },
  { value: '500-1000', label: '500만원 - 1,000만원' },
  { value: '1000-2000', label: '1,000만원 - 2,000만원' },
  { value: '2000-5000', label: '2,000만원 - 5,000만원' },
  { value: 'over-5000', label: '5,000만원 이상' },
]

const timelineOptions = [
  { value: 'asap', label: 'ASAP (가능한 빨리)' },
  { value: '1-month', label: '1개월 이내' },
  { value: '2-3-months', label: '2-3개월' },
  { value: '3-6-months', label: '3-6개월' },
  { value: 'flexible', label: '유연함' },
]

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('문의가 접수되었습니다. 24시간 내 회신 드리겠습니다.')
        reset()
      } else {
        throw new Error('문의 전송에 실패했습니다.')
      }
    } catch (error) {
      toast.error('문의 전송에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">프로젝트 문의</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 기본 정보 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  이름 *
                </label>
                <Input
                  id="name"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  회사명
                </label>
                <Input
                  id="company"
                  {...register('company')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  이메일 *
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  전화번호
                </label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                />
              </div>
            </div>

            {/* 프로젝트 정보 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  예산 *
                </label>
                <select
                  id="budget"
                  {...register('budget')}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-vero-gold focus:outline-none focus:ring-1 focus:ring-vero-gold ${
                    errors.budget ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">예산을 선택해주세요</option>
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.budget && (
                  <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                  희망 일정 *
                </label>
                <select
                  id="timeline"
                  {...register('timeline')}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-vero-gold focus:outline-none focus:ring-1 focus:ring-vero-gold ${
                    errors.timeline ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">일정을 선택해주세요</option>
                  {timelineOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.timeline && (
                  <p className="mt-1 text-sm text-red-600">{errors.timeline.message}</p>
                )}
              </div>
            </div>

            {/* 요구사항 */}
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                프로젝트 요구사항 *
              </label>
              <Textarea
                id="requirements"
                rows={6}
                placeholder="프로젝트에 대한 구체적인 요구사항을 작성해주세요..."
                {...register('requirements')}
                className={errors.requirements ? 'border-red-500' : ''}
              />
              {errors.requirements && (
                <p className="mt-1 text-sm text-red-600">{errors.requirements.message}</p>
              )}
            </div>

            {/* 동의 체크박스 */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  {...register('agreeToTerms')}
                  className={errors.agreeToTerms ? 'border-red-500' : ''}
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                  <Link href="/terms" className="text-vero-gold hover:underline">
                    이용약관
                  </Link>
                  에 동의합니다 *
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToPrivacy"
                  {...register('agreeToPrivacy')}
                  className={errors.agreeToPrivacy ? 'border-red-500' : ''}
                />
                <label htmlFor="agreeToPrivacy" className="text-sm text-gray-700">
                  <Link href="/privacy" className="text-vero-gold hover:underline">
                    개인정보처리방침
                  </Link>
                  에 동의합니다 *
                </label>
              </div>
              {errors.agreeToPrivacy && (
                <p className="text-sm text-red-600">{errors.agreeToPrivacy.message}</p>
              )}
            </div>

            {/* 제출 버튼 */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  전송 중...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  문의 보내기
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
