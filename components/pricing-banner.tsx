'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Gift, Users, Clock, Shield } from 'lucide-react'

export default function PricingBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 로컬스토리지에서 배너 상태 확인
    const bannerDismissed = localStorage.getItem('pricing-banner-dismissed')
    if (!bannerDismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('pricing-banner-dismissed', 'true')
  }

  // 배너가 표시될 때 body에 클래스 추가
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('banner-visible')
    } else {
      document.body.classList.remove('banner-visible')
    }
    
    return () => {
      document.body.classList.remove('banner-visible')
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-16 left-0 right-0 z-30 bg-gradient-to-r from-vero-gold to-vero-primary text-white shadow-lg"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Gift className="h-5 w-5" />
                <span className="font-semibold text-sm md:text-base">
                  자영업자·초기 창업 특별 혜택
                </span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                지금 상담 시 디자인 컨설팅 무료
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>소상공인 우대</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>빠른 제작</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span>품질보증</span>
                </div>
              </div>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="text-white hover:bg-white/20 p-1"
                aria-label="배너 닫기"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// 소상공인 전용 카드 컴포넌트
export function SmallBusinessCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-vero-gold/10 to-vero-primary/10 rounded-2xl p-8 border border-vero-gold/20"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-vero-gold rounded-full mb-4">
          <Users className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-vero-charcoal mb-4">
          운영이 바쁜 사장님 대신
        </h3>
        
        <p className="text-lg text-gray-700 mb-6">
          <span className="font-semibold text-vero-primary">세팅·보안·백업</span>까지 베로가 챙깁니다.
          <br />
          사업에만 집중하세요.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { icon: Shield, label: '보안 설정', desc: 'HTTPS, 방화벽, 백업' },
            { icon: Clock, label: '빠른 제작', desc: '4-6주 내 완성' },
            { icon: Gift, label: '특별 혜택', desc: '디자인 컨설팅 무료' }
          ].map((item, index) => (
            <div key={index} className="text-center p-4 bg-white/50 rounded-lg">
              <item.icon className="h-6 w-6 text-vero-gold mx-auto mb-2" />
              <h4 className="font-semibold text-vero-charcoal text-sm mb-1">{item.label}</h4>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            className="bg-vero-gold hover:bg-vero-gold/90 text-white px-6 py-3"
            asChild
          >
            <a href="/contact">무료 상담</a>
          </Button>
          <Button 
            variant="outline" 
            className="border-vero-primary text-vero-primary hover:bg-vero-primary hover:text-white px-6 py-3"
            asChild
          >
            <a href="/pricing">빠른 견적</a>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
