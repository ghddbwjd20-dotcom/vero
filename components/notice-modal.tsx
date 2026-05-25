'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X, Mail, Phone, Info } from 'lucide-react'

export default function NoticeModal() {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
  }

  // 모달이 표시될 때 body 스크롤 방지
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* 배경 오버레이 - 더 고급스러운 그라데이션 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-vero-charcoal/80 via-vero-ink/70 to-vero-charcoal/80 backdrop-blur-md"
        />
        
        {/* 모달 컨텐츠 */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            duration: 0.4
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* 상단 골드 액센트 라인 */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vero-gold via-vero-gold/80 to-vero-gold" />
          
          {/* 배경 장식 요소 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-vero-gold/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-vero-ink/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative p-8">
            {/* 헤더 */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-vero-gold/20 to-vero-gold/10 border border-vero-gold/20">
                  <Info className="h-6 w-6 text-vero-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-vero-charcoal tracking-tight">
                    공지사항
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">베로(VERO)</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-9 w-9 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                aria-label="닫기"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* 내용 */}
            <div className="space-y-5 mb-6">
              <div className="space-y-3">
                <p className="text-gray-800 leading-relaxed text-base font-medium">
                  현재 페이지 임시 운영중입니다.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  자세한 문의는 하단 이메일 또는 전화번호로 연락 부탁드립니다.
                </p>
              </div>

              {/* 연락처 정보 - 더 고급스러운 카드 스타일 */}
              <div className="relative pt-5 mt-5 border-t border-gray-100">
                <div className="space-y-3">
                  <motion.a
                    href="mailto:ghddbwjd20@gmail.com"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-vero-offwhite to-white border border-gray-100 hover:border-vero-gold/30 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-vero-gold/10 group-hover:bg-vero-gold/20 transition-colors">
                      <Mail className="h-5 w-5 text-vero-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">이메일</p>
                      <p className="text-sm font-medium text-vero-charcoal group-hover:text-vero-gold transition-colors">
                        ghddbwjd20@gmail.com
                      </p>
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="tel:010-6880-0958"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-vero-offwhite to-white border border-gray-100 hover:border-vero-gold/30 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-vero-ink/10 group-hover:bg-vero-ink/20 transition-colors">
                      <Phone className="h-5 w-5 text-vero-ink" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">전화번호</p>
                      <p className="text-sm font-medium text-vero-charcoal group-hover:text-vero-ink transition-colors">
                        010-6880-0958
                      </p>
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* 닫기 버튼 */}
            <Button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-vero-gold to-vero-gold/90 hover:from-vero-gold/90 hover:to-vero-gold text-white font-medium py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              확인했습니다
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
