import Hero from '@/components/hero'
import NewsItem from '@/components/news-item'
import VideoBackground from '@/components/video-background'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'
import { isDatabaseEnabled, query } from '@/lib/database'

// 뉴스 데이터 타입 정의
interface NewsItem {
  id: number
  title: string
  slug: string
  content?: string
  excerpt?: string
  thumbnail_url?: string
  author?: string
  category: string
  published: boolean
  published_at?: string
  order_index: number
  created_at: string
  updated_at: string
}

// 뉴스 데이터 가져오기 (DB 비활성 시 빈 목록, 활성 시 직접 쿼리)
async function getNewsData(): Promise<NewsItem[]> {
  if (!isDatabaseEnabled()) {
    return []
  }

  try {
    const result = await query(
      `SELECT id, title, slug, content, excerpt, thumbnail_url,
              author, category, published, published_at, order_index, created_at, updated_at
       FROM news
       WHERE published = $1
       ORDER BY order_index ASC, published_at DESC, created_at DESC`,
      [true]
    )
    return result.rows as NewsItem[]
  } catch (error) {
    console.error('뉴스 데이터 로딩 오류:', error)
    return []
  }
}

export const metadata = {
  title: '공지사항',
  description: '베로(VERO)의 소식과 업데이트를 한 곳에서 확인하세요.',
}

export default async function NewsPage() {
  const newsData = await getNewsData()

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
          title="베로의 소식과 업데이트"
          subtitle="베로의 소식과 업데이트를 한 곳에서 확인하세요."
          ctaText="문의하기"
          ctaHref="/contact"
        />
      </VideoBackground>

      {/* 필터 섹션 */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold">공지사항</h2>
            
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
            <Badge variant="outline">업데이트</Badge>
            <Badge variant="outline">프로젝트</Badge>
            <Badge variant="outline">채용</Badge>
            <Badge variant="outline">인사이트</Badge>
            <Badge variant="outline">케이스 스터디</Badge>
            <Badge variant="outline">공지</Badge>
          </div>

          {/* 공지사항 리스트 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsData.length > 0 ? (
              newsData.map((news, index) => (
                <NewsItem
                  key={news.id}
                  news={{
                    _id: news.id.toString(),
                    title: news.title,
                    slug: { current: news.slug },
                    content: news.content,
                    category: news.category,
                    tags: [news.category],
                    thumbnail: {
                      asset: { _ref: news.thumbnail_url || '', _type: 'reference' },
                      alt: news.title
                    },
                    publishedAt: news.published_at || news.created_at,
                    updatedAt: news.updated_at
                  }}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">아직 등록된 공지사항이 없습니다.</p>
              </div>
            )}
          </div>

          {/* 페이지네이션 */}
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                이전
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                다음
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="section-padding bg-vero-charcoal text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            베로와 함께하세요
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            최신 소식과 인사이트를 놓치지 마세요.
          </p>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-vero-gold px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-vero-gold/90"
            >
              문의하기
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

