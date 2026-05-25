'use client'

import BentoHero from '@/components/bento-hero'
import SectionHeader from '@/components/section-header'
import Testimonials from '@/components/testimonials'
import ExpertCTA from '@/components/expert-cta'
import PricingBanner, { SmallBusinessCard } from '@/components/pricing-banner'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Users, Shield, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useScrollAnimation, fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem } from '@/hooks/useScrollAnimation'
import VideoBackground from '@/components/video-background'

export default function HomePage() {
  // 임시로 하드코딩된 텍스트 사용
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'home.philosophy.title': '우리의 철학',
      'home.philosophy.subtitle': '숫자보다 관계를, 속도보다 완성도를 중시합니다',
      'home.philosophy.authenticity.title': '진정성',
      'home.philosophy.authenticity.desc': '베로의 기준은 \'진짜 필요한 것\'입니다.',
      'home.philosophy.trust.title': '신뢰',
      'home.philosophy.trust.desc': '투명한 커뮤니케이션으로 신뢰를 쌓습니다.',
      'home.philosophy.quality.title': '품질',
      'home.philosophy.quality.desc': '성능, 접근성, 보안까지 완벽하게 구현합니다.',
      'home.philosophy.innovation.title': '혁신',
      'home.philosophy.innovation.desc': '최신 기술로 미래를 준비합니다.',
      'home.process.title': '우리의 프로세스',
      'home.process.subtitle': '체계적이고 투명한 프로젝트 진행 과정',
      'home.process.step1.title': '탐색',
      'home.process.step1.desc': '문제를 깊이 이해하고 목표를 설정합니다',
      'home.process.step2.title': '설계',
      'home.process.step2.desc': '사용자 중심의 정보구조를 설계합니다',
      'home.process.step3.title': '디자인',
      'home.process.step3.desc': '브랜드와 사용자를 연결하는 인터페이스를 만듭니다',
      'home.process.step4.title': '개발',
      'home.process.step4.desc': '견고하고 확장 가능한 코드로 구현합니다',
      'home.process.step5.title': '성장',
      'home.process.step5.desc': '런칭 후 지속적인 개선과 성장을 지원합니다',
      'home.smallbusiness.title': '소상공인을 위한 특별 서비스',
      'home.smallbusiness.subtitle': '운영이 바쁜 사장님을 위한 맞춤형 솔루션',
      'home.trust.title': '신뢰 포인트',
      'home.trust.subtitle': '베로와 함께하는 이유',
      'home.trust.communication.title': '투명한 커뮤니케이션',
      'home.trust.communication.desc': '주간 리포트를 통해 프로젝트 진행 상황을 투명하게 공유합니다.',
      'home.trust.checklist.title': '품질 체크리스트',
      'home.trust.checklist.desc': '성능, 접근성, 보안 체크리스트를 공개하여 품질을 보장합니다.',
      'home.trust.guarantee.title': '30일 품질보증',
      'home.trust.guarantee.desc': '런칭 후 30일간 버그 핫픽스를 무료로 제공합니다.',
      'home.cta.title': '지금, 베로와 시작해 보세요',
      'home.cta.subtitle': '아이디어 단계부터 괜찮습니다. 진정성으로 함께 설계하겠습니다.',
      'home.cta.button': '프로젝트 문의하기',
    }
    return translations[key] || key
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <PricingBanner />
      </motion.div>
      <BentoHero />

      {/* 철학 섹션 */}
      <motion.section 
        className="section-padding bg-white py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionHeader
              title={t('home.philosophy.title')}
              subtitle={t('home.philosophy.subtitle')}
            />
          </motion.div>
          
          <motion.div 
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={staggerItem}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <motion.div 
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vero-gold/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckCircle className="h-8 w-8 text-vero-gold" />
                  </motion.div>
                  <h3 className="mb-2 text-lg font-semibold">{t('home.philosophy.authenticity.title')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('home.philosophy.authenticity.desc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <motion.div 
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vero-gold/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Users className="h-8 w-8 text-vero-gold" />
                  </motion.div>
                  <h3 className="mb-2 text-lg font-semibold">{t('home.philosophy.trust.title')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('home.philosophy.trust.desc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <motion.div 
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vero-gold/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Shield className="h-8 w-8 text-vero-gold" />
                  </motion.div>
                  <h3 className="mb-2 text-lg font-semibold">{t('home.philosophy.quality.title')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('home.philosophy.quality.desc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <motion.div 
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vero-gold/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Zap className="h-8 w-8 text-vero-gold" />
                  </motion.div>
                  <h3 className="mb-2 text-lg font-semibold">{t('home.philosophy.innovation.title')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('home.philosophy.innovation.desc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 프로세스 섹션 */}
      <VideoBackground
        videoSrc="/videos/process-background.mp4"
        fallbackGradient="bg-gradient-to-br from-vero-offwhite via-vero-gold/5 to-vero-primary/5"
        overlay={true}
        blur={false}
        className="section-padding py-20"
        blurTransition={true}
      >
        <motion.section 
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionHeader
                title={t('home.process.title')}
                subtitle={t('home.process.subtitle')}
              />
            </motion.div>
            
            <div className="mt-16">
              <motion.div 
                className="grid grid-cols-1 gap-8 md:grid-cols-5"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {[
                  { step: '01', title: t('home.process.step1.title'), description: t('home.process.step1.desc') },
                  { step: '02', title: t('home.process.step2.title'), description: t('home.process.step2.desc') },
                  { step: '03', title: t('home.process.step3.title'), description: t('home.process.step3.desc') },
                  { step: '04', title: t('home.process.step4.title'), description: t('home.process.step4.desc') },
                  { step: '05', title: t('home.process.step5.title'), description: t('home.process.step5.desc') },
                ].map((item, index) => (
                  <motion.div 
                    key={item.step} 
                    className="text-center"
                    variants={staggerItem}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vero-gold text-white font-bold text-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.step}
                    </motion.div>
                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      </VideoBackground>

      {/* 고객 후기 섹션 */}
      <VideoBackground
        videoSrc="/videos/testimonials-background.mp4"
        fallbackGradient="bg-gradient-to-br from-vero-primary/5 via-white to-vero-gold/5"
        overlay={true}
        blur={true}
        className="section-padding py-20"
        blurTransition={true}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Testimonials />
        </motion.div>
      </VideoBackground>

      {/* 전문가 CTA 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <ExpertCTA />
      </motion.div>

      {/* 소상공인 특별 혜택 섹션 */}
      <motion.section 
        className="section-padding bg-vero-offwhite section-blur-transition py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionHeader
              title={t('home.smallbusiness.title')}
              subtitle={t('home.smallbusiness.subtitle')}
            />
          </motion.div>
          <motion.div 
            className="mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <SmallBusinessCard />
          </motion.div>
        </div>
      </motion.section>

      {/* 신뢰 포인트 섹션 */}
      <motion.section 
        className="section-padding bg-white section-blur-transition py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionHeader
              title={t('home.trust.title')}
              subtitle={t('home.trust.subtitle')}
            />
          </motion.div>
          
          <motion.div 
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={staggerItem}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <h3 className="mb-4 text-xl font-semibold">{t('home.trust.communication.title')}</h3>
                  <p className="text-gray-600">
                    {t('home.trust.communication.desc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <h3 className="mb-4 text-xl font-semibold">{t('home.trust.checklist.title')}</h3>
                  <p className="text-gray-600">
                    {t('home.trust.checklist.desc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <h3 className="mb-4 text-xl font-semibold">{t('home.trust.guarantee.title')}</h3>
                  <p className="text-gray-600">
                    {t('home.trust.guarantee.desc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA 섹션 */}
      <VideoBackground
        videoSrc="/videos/footer-background.mp4"
        fallbackGradient="bg-gradient-to-br from-vero-charcoal via-vero-primary/10 to-vero-charcoal"
        overlay={true}
        blur={false}
        className="section-padding py-20"
        blurTransition={true}
      >
        <motion.section 
          className="relative text-white"
          style={{ backgroundColor: 'transparent' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold sm:text-4xl text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {t('home.cta.title')}
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {t('home.cta.subtitle')}
            </motion.p>
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-vero-gold px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-vero-gold/90"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {t('home.cta.button')}
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
      </VideoBackground>
    </>
  )
}