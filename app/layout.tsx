import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import MobileBottomNav from '@/components/mobile-bottom-nav'
import NoticeModal from '@/components/notice-modal'
import { Toaster } from 'react-hot-toast'
import { AuthSessionProvider } from '@/components/providers/session-provider'
// import { LanguageProvider } from '@/contexts/language-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: '베로(VERO) - 진정성으로 신뢰를 쌓는 웹 에이전시',
    template: '%s | 베로(VERO)',
  },
  description: '한 번의 멋짐보다 오래가는 신뢰를 만듭니다. 담백하지만 세련된, 본질에 집중한 웹을 제안하는 베로(VERO) 웹 에이전시입니다.',
  keywords: ['웹 에이전시', '웹 개발', 'UI/UX', '브랜딩', '디자인', '베로', 'VERO'],
  authors: [{ name: '베로(VERO)' }],
  creator: '베로(VERO)',
  publisher: '베로(VERO)',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://vero.co.kr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    title: '베로(VERO) - 진정성으로 신뢰를 쌓는 웹 에이전시',
    description: '한 번의 멋짐보다 오래가는 신뢰를 만듭니다. 담백하지만 세련된, 본질에 집중한 웹을 제안하는 베로(VERO) 웹 에이전시입니다.',
    siteName: '베로(VERO)',
  },
  twitter: {
    card: 'summary_large_image',
    title: '베로(VERO) - 진정성으로 신뢰를 쌓는 웹 에이전시',
    description: '한 번의 멋짐보다 오래가는 신뢰를 만듭니다. 담백하지만 세련된, 본질에 집중한 웹을 제안하는 베로(VERO) 웹 에이전시입니다.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={inter.className}>
        <AuthSessionProvider>
          <Header />
          <main className="pt-0">{children}</main>
          <Footer />
          <MobileBottomNav />
          <NoticeModal />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </AuthSessionProvider>
      </body>
    </html>
  )
}
