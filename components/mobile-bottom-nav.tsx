'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Home, 
  Briefcase, 
  FolderOpen, 
  Calculator, 
  MessageCircle,
  HelpCircle 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const mobileNavItems = [
  {
    name: '홈',
    href: '/',
    icon: Home,
    description: '메인 페이지'
  },
  {
    name: '서비스',
    href: '/services',
    icon: Briefcase,
    description: '제공 서비스'
  },
  {
    name: '포트폴리오',
    href: '/portfolio',
    icon: FolderOpen,
    description: '프로젝트 케이스'
  },
  {
    name: '견적',
    href: '/pricing',
    icon: Calculator,
    description: '가격 및 견적'
  },
  {
    name: 'FAQ',
    href: '/faq',
    icon: HelpCircle,
    description: '자주 묻는 질문'
  },
  {
    name: '문의',
    href: '/contact',
    icon: MessageCircle,
    description: '프로젝트 문의'
  }
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden"
    >
      <div className="grid grid-cols-6 h-16">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center space-y-1 px-2 py-2 transition-colors',
                isActive 
                  ? 'text-vero-gold' 
                  : 'text-gray-500 hover:text-vero-primary'
              )}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Icon 
                  className={cn(
                    'h-5 w-5 transition-colors',
                    isActive && 'text-vero-gold'
                  )} 
                />
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-vero-gold/10 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
              <span className={cn(
                'text-xs font-medium transition-colors',
                isActive ? 'text-vero-gold' : 'text-gray-500'
              )}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
      
      {/* CTA 버튼 오버레이 */}
      <div className="absolute -top-12 right-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
          className="relative"
        >
          <Link
            href="/contact"
            className="flex items-center justify-center w-12 h-12 bg-vero-gold text-white rounded-full shadow-lg hover:bg-vero-gold/90 transition-colors"
          >
            <MessageCircle className="h-6 w-6" />
          </Link>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-vero-gold/20 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}


