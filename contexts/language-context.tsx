'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'ko' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  ko: {
    'navigation.services': '서비스',
    'navigation.process': '프로세스',
    'navigation.portfolio': '포트폴리오',
    'navigation.pricing': '견적',
    'navigation.faq': 'FAQ',
    'navigation.contact': '문의',
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
    'footer.services': '서비스',
    'footer.portfolio': '포트폴리오',
    'footer.about': '회사 소개',
    'footer.contact': '문의하기',
    'footer.legal': '법적 고지',
    'footer.privacy': '개인정보처리방침',
    'footer.terms': '이용약관',
    'footer.cookies': '쿠키 정책',
    'footer.rights': '© 2024 VERO. 모든 권리 보유.',
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
  },
  en: {
    'navigation.services': 'Services',
    'navigation.process': 'Process',
    'navigation.portfolio': 'Portfolio',
    'navigation.pricing': 'Pricing',
    'navigation.faq': 'FAQ',
    'navigation.contact': 'Contact',
    'hero.title': 'Designing Trust with Authenticity',
    'hero.subtitle': 'We build lasting trust rather than momentary glamour. VERO proposes clean yet sophisticated web design focused on essence.',
    'hero.cta1': 'Start Project',
    'hero.cta2': 'View Portfolio',
    'bento.professionalism.title': 'Professionalism',
    'bento.professionalism.description': 'We transparently explain and take responsibility for the entire process from planning to security.',
    'bento.transparency.title': 'Transparent Communication',
    'bento.transparency.description': 'We share progress through weekly reports.',
    'bento.quality.title': 'Quality Assurance',
    'bento.quality.description': 'We provide 30 days of free quality assurance.',
    'footer.services': 'Services',
    'footer.portfolio': 'Portfolio',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.rights': '© 2024 VERO. All rights reserved.',
    'home.philosophy.title': 'Our Philosophy',
    'home.philosophy.subtitle': 'We value relationships over numbers, completion over speed',
    'home.philosophy.authenticity.title': 'Authenticity',
    'home.philosophy.authenticity.desc': 'VERO\'s standard is \'what\'s truly necessary\'.',
    'home.philosophy.trust.title': 'Trust',
    'home.philosophy.trust.desc': 'We build trust through transparent communication.',
    'home.philosophy.quality.title': 'Quality',
    'home.philosophy.quality.desc': 'We perfectly implement performance, accessibility, and security.',
    'home.philosophy.innovation.title': 'Innovation',
    'home.philosophy.innovation.desc': 'We prepare for the future with cutting-edge technology.',
    'home.process.title': 'Our Process',
    'home.process.subtitle': 'Systematic and transparent project execution process',
    'home.process.step1.title': 'Discovery',
    'home.process.step1.desc': 'Deeply understand the problem and set goals',
    'home.process.step2.title': 'Design',
    'home.process.step2.desc': 'Design user-centered information architecture',
    'home.process.step3.title': 'Interface',
    'home.process.step3.desc': 'Create interfaces that connect brands and users',
    'home.process.step4.title': 'Development',
    'home.process.step4.desc': 'Implement with robust and scalable code',
    'home.process.step5.title': 'Growth',
    'home.process.step5.desc': 'Support continuous improvement and growth after launch',
    'home.smallbusiness.title': 'Special Services for Small Businesses',
    'home.smallbusiness.subtitle': 'Customized solutions for busy business owners',
    'home.trust.title': 'Trust Points',
    'home.trust.subtitle': 'Why work with VERO',
    'home.trust.communication.title': 'Transparent Communication',
    'home.trust.communication.desc': 'We transparently share project progress through weekly reports.',
    'home.trust.checklist.title': 'Quality Checklist',
    'home.trust.checklist.desc': 'We guarantee quality by publishing performance, accessibility, and security checklists.',
    'home.trust.guarantee.title': '30-Day Quality Guarantee',
    'home.trust.guarantee.desc': 'We provide free bug hotfixes for 30 days after launch.',
    'home.cta.title': 'Start with VERO now',
    'home.cta.subtitle': 'It\'s okay to start from the idea stage. We\'ll design together with authenticity.',
    'home.cta.button': 'Inquire about Project',
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko')

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
