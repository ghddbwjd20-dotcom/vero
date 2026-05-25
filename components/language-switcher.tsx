'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Globe, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('ko')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]
  
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]
  
  const changeLanguage = (locale: 'ko' | 'en') => {
    setCurrentLang(locale)
    setIsOpen(false)
    // 언어 변경 로직은 나중에 구현
  }

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-2 py-1 h-8 min-w-0"
      >
        <span className="text-sm">{currentLanguage.flag}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-50"
          >
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code as 'ko' | 'en')}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 transition-colors duration-150 ${
                    currentLang === language.code ? 'bg-vero-gold/10 text-vero-primary font-medium' : 'text-gray-700'
                  }`}
                >
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
