import Hero from '@/components/hero'
import SectionHeader from '@/components/section-header'
import PortfolioCard from '@/components/portfolio-card'
import VideoBackground from '@/components/video-background'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Filter, Calendar } from 'lucide-react'

// 포트폴리오 데이터 타입 정의
interface PortfolioItem {
  id: number
  title: string
  slug: string
  description: string
  content?: string
  thumbnail_url?: string
  technologies?: string[]
  client_name?: string
  project_url?: string
  github_url?: string
  start_date?: string
  end_date?: string
  status: string
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

// 포트폴리오 데이터 가져오기
async function getPortfolioData(): Promise<PortfolioItem[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/portfolio?published=true`, {
      cache: 'no-store' // 실시간 데이터를 위해 캐시 비활성화
    })
    
    if (!response.ok) {
      throw new Error('포트폴리오 데이터를 가져올 수 없습니다')
    }
    
    const data = await response.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error('포트폴리오 데이터 로딩 오류:', error)
    return []
  }
}

export const metadata = {
  title: '포트폴리오',
  description: '베로(VERO)의 프로젝트 포트폴리오를 확인하세요. 결과로 증명하는 진정성입니다.',
}

export default async function PortfolioPage() {
  const portfolioData = await getPortfolioData()

  return (
    <>
      {/* Hero Section */}
      <VideoBackground
        videoSrc="/videos/process-background.mp4"
        fallbackGradient="bg-gradient-to-br from-vero-offwhite via-vero-gold/5 to-vero-primary/5"
        overlay={true}
        blur={false}
        className="relative"
        blurTransition={true}
      >
        <Hero
          title="결과로 증명하는 진정성"
          subtitle="문제에 깊이 공감하고, 본질에 집중해 해결합니다. 베로의 프로젝트를 확인해보세요."
          ctaText="프로젝트 문의"
          ctaHref="/contact"
        />
      </VideoBackground>

      {/* 필터 섹션 */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold">프로젝트</h2>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                필터
              </Button>
              <Button variant="outline" size="sm">
                <Search className="mr-2 h-4 w-4" />
                검색
              </Button>
            </div>
          </div>

          {/* 카테고리 필터 */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Badge variant="default">전체</Badge>
            <Badge variant="outline">브랜딩</Badge>
            <Badge variant="outline">커머스</Badge>
            <Badge variant="outline">B2B</Badge>
            <Badge variant="outline">모바일</Badge>
          </div>

          {/* 연도 필터 */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Badge variant="outline">전체</Badge>
            <Badge variant="outline">2024</Badge>
            <Badge variant="outline">2023</Badge>
            <Badge variant="outline">2022</Badge>
          </div>

          {/* 포트폴리오 그리드 */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {portfolioData.length > 0 ? (
              portfolioData.map((portfolio, index) => (
                <PortfolioCard
                  key={portfolio.id}
                  portfolio={{
                    _id: portfolio.id.toString(),
                    title: portfolio.title,
                    slug: { current: portfolio.slug },
                    description: portfolio.description,
                    category: portfolio.client_name || '프로젝트',
                    tags: portfolio.technologies || [],
                    year: new Date(portfolio.created_at).getFullYear(),
                    thumbnail: {
                      asset: { _ref: portfolio.thumbnail_url || '', _type: 'reference' },
                      alt: portfolio.title
                    },
                    problem: portfolio.description,
                    solution: portfolio.content || portfolio.description,
                    results: '프로젝트 완료',
                    techStack: portfolio.technologies || [],
                    role: '프로젝트 개발',
                    liveUrl: portfolio.project_url || '',
                    githubUrl: portfolio.github_url || '',
                    publishedAt: portfolio.created_at
                  }}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">아직 등록된 프로젝트가 없습니다.</p>
              </div>
            )}
          </div>

          {/* 더보기 버튼 */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              더 많은 프로젝트 보기
            </Button>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <VideoBackground
        videoSrc="/videos/footer-background.mp4"
        fallbackGradient="bg-gradient-to-br from-vero-charcoal via-vero-primary/10 to-vero-charcoal"
        overlay={true}
        blur={false}
        className="section-padding py-20"
        blurTransition={true}
      >
        <section className="relative text-white" style={{ backgroundColor: 'transparent' }}>
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold sm:text-4xl text-white">
              당신의 프로젝트도 베로와 함께
            </h2>
            <p className="mt-4 text-lg text-gray-200">
              아이디어부터 런칭까지, 진정성으로 함께 만들어가겠습니다.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-vero-gold px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-vero-gold/90"
              >
                프로젝트 문의하기
              </a>
            </div>
          </div>
        </section>
      </VideoBackground>
    </>
  )
}
