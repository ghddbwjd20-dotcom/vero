'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import LanguageSwitcher from './language-switcher'
import { useSession, signOut } from 'next-auth/react'

const navigation = [
  { key: 'services', href: '/services' },
  { key: 'process', href: '/process' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'pricing', href: '/pricing' },
  { key: 'faq', href: '/faq' },
  { key: 'contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  
  // 임시로 하드코딩된 텍스트 사용
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'navigation.services': '서비스',
      'navigation.process': '프로세스',
      'navigation.portfolio': '포트폴리오',
      'navigation.pricing': '견적',
      'navigation.faq': 'FAQ',
      'navigation.contact': '문의',
    }
    return translations[key] || key
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto flex h-16 items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">VERO</span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-vero-gold"
            >
              {t(`navigation.${item.key}`)}
            </Link>
          ))}
        </div>

        {/* CTA 버튼 및 언어 전환 */}
        <div className="hidden md:flex md:items-center md:space-x-3">
          {session ? (
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  <User className="h-4 w-4 mr-2" />
                  {session.user?.name}
                </Link>
              </Button>
              <Button variant="ghost" onClick={() => signOut()}>
                <LogOut className="h-4 w-4 mr-2" />
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">로그인</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">회원가입</Link>
              </Button>
            </div>
          )}
          <LanguageSwitcher />
        </div>

        {/* 모바일 메뉴 버튼 */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="border-t bg-white px-4 py-4">
              <div className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="block text-base font-medium text-gray-700 transition-colors hover:text-vero-gold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(`navigation.${item.key}`)}
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  <div className="flex justify-center">
                    <LanguageSwitcher />
                  </div>
                  {session ? (
                    <div className="space-y-2">
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/dashboard">
                          <User className="h-4 w-4 mr-2" />
                          {session.user?.name}
                        </Link>
                      </Button>
                      <Button variant="ghost" onClick={() => signOut()} className="w-full">
                        <LogOut className="h-4 w-4 mr-2" />
                        로그아웃
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button variant="ghost" asChild className="w-full">
                        <Link href="/auth/signin">로그인</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/auth/signup">회원가입</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
