import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vero-offwhite to-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-vero-charcoal mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-vero-charcoal mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">문의하기</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
