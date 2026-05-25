'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vero-offwhite to-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-vero-charcoal mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-vero-charcoal mb-4">
          오류가 발생했습니다
        </h2>
        <p className="text-gray-600 mb-8">
          예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>다시 시도</Button>
          <Button variant="outline" asChild>
            <a href="/">홈으로 돌아가기</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
