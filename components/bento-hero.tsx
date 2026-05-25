'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
export default function BentoHero() {
  const [hasVideo, setHasVideo] = useState(false)
  const [videoError, setVideoError] = useState(false)

  // 동영상 파일 존재 여부 확인
  useEffect(() => {
    const checkVideo = async () => {
      try {
        const response = await fetch('/videos/hero-background.mp4', { method: 'HEAD' })
        setHasVideo(response.ok)
      } catch (error) {
        setHasVideo(false)
      }
    }
    checkVideo()
  }, [])

  // 임시로 하드코딩된 텍스트 사용
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'hero.title': '진정성으로 신뢰를 설계합니다',
      'hero.subtitle': '한 번의 멋짐보다 오래가는 신뢰를 만듭니다. 베로는 담백하지만 세련된, 본질에 집중한 웹을 제안합니다.',
      'hero.cta1': '프로젝트 시작하기',
      'hero.cta2': '포트폴리오 보기',
      'bento.professionalism.title': '전문성',
      'bento.professionalism.description': '기획부터 보안까지, 전 과정을 투명하게 설명하고 책임집니다.',
      'bento.transparency.title': '투명한 소통',
      'bento.transparency.description': '주간 리포트로 진행 상황을 공유합니다.',
      'bento.quality.title': '품질 보증',
      'bento.quality.description': '30일 무료 품질보증을 제공합니다.',
    }
    return translations[key] || key
  }
  
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* 동영상 배경 또는 애니메이션 배경 */}
      <div className="absolute inset-0 -z-20">
        {hasVideo && !videoError ? (
          <>
            {/* 실제 동영상 배경 */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              onError={() => setVideoError(true)}
            >
              <source src="/videos/hero-background.mp4" type="video/mp4" />
              <source src="/videos/hero-background.webm" type="video/webm" />
            </video>
            {/* 동영상 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-br from-vero-gold/20 via-vero-primary/10 to-vero-gold/20" />
            <div className="absolute inset-0 bg-black/20" />
          </>
        ) : (
          <>
            {/* CSS 애니메이션 배경 (동영상 효과) */}
            <div className="w-full h-full bg-gradient-to-br from-vero-offwhite via-white to-vero-offwhite" />
            
            {/* 움직이는 그라데이션 레이어들 */}
            <motion.div
              animate={{
                background: [
                  'linear-gradient(45deg, rgba(199,164,106,0.1) 0%, rgba(45,55,72,0.1) 50%, rgba(199,164,106,0.1) 100%)',
                  'linear-gradient(135deg, rgba(45,55,72,0.1) 0%, rgba(199,164,106,0.1) 50%, rgba(45,55,72,0.1) 100%)',
                  'linear-gradient(225deg, rgba(199,164,106,0.1) 0%, rgba(45,55,72,0.1) 50%, rgba(199,164,106,0.1) 100%)',
                  'linear-gradient(315deg, rgba(45,55,72,0.1) 0%, rgba(199,164,106,0.1) 50%, rgba(45,55,72,0.1) 100%)',
                  'linear-gradient(45deg, rgba(199,164,106,0.1) 0%, rgba(45,55,72,0.1) 50%, rgba(199,164,106,0.1) 100%)',
                ]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
            />
            
            {/* 움직이는 파티클 효과 */}
            <motion.div
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -50, 100, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-vero-gold/20 to-vero-primary/20 rounded-full blur-3xl"
            />
            
            <motion.div
              animate={{
                x: [0, -80, 60, 0],
                y: [0, 80, -40, 0],
                scale: [1, 0.8, 1.3, 1],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 5
              }}
              className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-l from-vero-primary/15 to-vero-gold/15 rounded-full blur-2xl"
            />
            
            <motion.div
              animate={{
                x: [0, 120, -80, 0],
                y: [0, -60, 80, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 10
              }}
              className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-vero-gold/25 to-vero-primary/25 rounded-full blur-xl"
            />
            
            {/* 애니메이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-br from-vero-gold/20 via-vero-primary/10 to-vero-gold/20" />
            <div className="absolute inset-0 bg-black/20" />
          </>
        )}
      </div>

      {/* 동적 배경 요소들 */}
      <div className="absolute inset-0 -z-10">
        {/* 메인 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-br from-vero-gold/2 via-transparent to-vero-primary/2" />
        
        {/* 움직이는 원형 요소들 */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-vero-gold/5 rounded-full blur-xl"
        />
        
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute top-40 right-20 w-24 h-24 bg-vero-primary/4 rounded-full blur-lg"
        />
        
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-vero-gold/6 rounded-full blur-md"
        />
        
        {/* 기하학적 패턴 */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-vero-primary" />
          </svg>
        </div>
        
        {/* 텍스처 오버레이 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(199,164,106,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
          {/* 메인 콘텐츠 */}
          <div className="flex flex-col justify-center max-w-md lg:max-w-lg">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xl font-bold tracking-tight text-white drop-shadow-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl relative leading-tight whitespace-nowrap"
            >
              <span className="relative z-10">{t('hero.title')}</span>
              {/* 텍스트 하이라이트 효과 */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-vero-gold to-vero-primary rounded-full"
              />
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-white/90 drop-shadow-md sm:text-xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col items-start justify-start gap-4 sm:flex-row"
            >
              <Button asChild size="lg" className="group bg-vero-gold hover:bg-vero-gold/90 text-white shadow-lg backdrop-blur-sm">
                <Link href="/contact">
                  {t('hero.cta1')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button variant="outline" asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
                <Link href="/portfolio">{t('hero.cta2')}</Link>
              </Button>
            </motion.div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="col-span-2 row-span-2 rounded-2xl bg-gradient-to-br from-vero-gold/90 to-vero-primary/90 backdrop-blur-sm p-8 text-white relative overflow-hidden group shadow-xl"
            >
              {/* 카드 내부 애니메이션 요소 */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"
              />
              <motion.div
                animate={{
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/5 rounded-full"
              />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">{t('bento.professionalism.title')}</h3>
                <p className="text-lg opacity-90">{t('bento.professionalism.description')}</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-xl border border-vero-gold/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-vero-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-vero-charcoal mb-2">{t('bento.transparency.title')}</h3>
                <p className="text-sm text-gray-600">{t('bento.transparency.description')}</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-xl border border-vero-primary/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-vero-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-vero-charcoal mb-2">{t('bento.quality.title')}</h3>
                <p className="text-sm text-gray-600">{t('bento.quality.description')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 추가 배경 장식 요소 */}
      <div className="absolute inset-0 -z-10">
        {/* 큰 배경 블롭 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-vero-gold/8 to-vero-primary/8 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-vero-primary/6 to-vero-gold/6 rounded-full blur-2xl"
        />
        
        {/* 미묘한 노이즈 텍스처 */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHJlc3VsdD0ibm9pc2UiLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIvPjwvc3ZnPg==')] bg-repeat" />
      </div>
    </section>
  )
}
