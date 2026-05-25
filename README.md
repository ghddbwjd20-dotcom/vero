# 베로(VERO) 웹 에이전시 소개 사이트

진정성으로 신뢰를 쌓는 웹 에이전시 베로(VERO)의 공식 소개 사이트입니다.

## 🚀 프로젝트 개요

- **브랜드**: 베로(VERO) - "진정성으로 신뢰를 쌓는 웹 에이전시"
- **목표**: 브랜드 신뢰감 전달 및 포트폴리오·공지·문의로 이어지는 전환 극대화
- **특징**: 미니멀 디자인 + 생동감 있는 모션, 완전한 접근성 및 보안 구현

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animation**: Framer Motion
- **Icons**: Lucide React

### Backend & Database
- **Database**: PostgreSQL
- **API**: Next.js API Routes
- **CMS**: Sanity (Headless CMS) - Optional

### Forms & Validation
- **Forms**: React Hook Form
- **Validation**: Zod
- **Spam Protection**: hCaptcha

### Authentication
- **Auth**: NextAuth.js
- **Social Login**: Google, Kakao, Naver
- **Password**: bcryptjs (해시화)

### SEO & Performance
- **SEO**: next-seo, next-sitemap
- **Analytics**: Plausible Analytics
- **Monitoring**: Sentry
- **Images**: next/image (AVIF/WebP)

### Security
- **Headers**: Security headers (CSP, HSTS, etc.)
- **Validation**: Server-side validation
- **Rate Limiting**: API rate limiting
- **CSRF Protection**: CSRF tokens

## 📁 프로젝트 구조

```
vero-website/
├── app/                    # Next.js App Router
│   ├── about/             # 회사 소개 페이지
│   ├── portfolio/         # 포트폴리오 페이지
│   ├── news/              # 공지사항 페이지
│   ├── contact/           # 문의 페이지
│   ├── privacy/           # 개인정보처리방침
│   ├── terms/             # 이용약관
│   ├── cookies/           # 쿠키 정책
│   ├── api/               # API 라우트
│   │   ├── contact/       # 문의 폼 API
│   │   ├── sitemap/       # 사이트맵 API
│   │   └── robots.txt/    # robots.txt API
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── header.tsx        # 헤더 컴포넌트
│   ├── footer.tsx        # 푸터 컴포넌트
│   ├── hero.tsx          # 히어로 섹션
│   ├── portfolio-card.tsx # 포트폴리오 카드
│   ├── news-item.tsx     # 공지사항 아이템
│   └── contact-form.tsx  # 문의 폼
├── lib/                  # 유틸리티 함수
│   ├── utils.ts          # 공통 유틸리티
│   └── sanity.ts         # Sanity 클라이언트
├── types/                # TypeScript 타입 정의
│   └── index.ts
├── styles/               # 스타일 파일
│   └── globals.css       # 글로벌 스타일
└── content/              # 정적 콘텐츠
```

## 🚀 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/vero-website.git
cd vero-website
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vero
DB_USER=postgres
DB_PASSWORD=1234

# 기타 환경 변수는 env.example 참조
```

### 4. PostgreSQL 데이터베이스 설정

#### 4.1 PostgreSQL 설치 및 실행
- PostgreSQL 12+ 버전 설치
- 데이터베이스 서버 실행 (포트 5432)

#### 4.2 데이터베이스 및 사용자 생성
```sql
-- 데이터베이스 생성
CREATE DATABASE vero;

-- 사용자 생성 (필요한 경우)
CREATE USER postgres WITH PASSWORD '1234';
GRANT ALL PRIVILEGES ON DATABASE vero TO postgres;
```

#### 4.3 스키마 초기화
```bash
# 스키마 및 기본 데이터 생성
npm run db:init
```

또는 수동으로:
```bash
psql -h localhost -p 5432 -U postgres -d vero -f scripts/init-database.sql
```

### 5. 개발 서버 실행

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Contact Form
CONTACT_WEBHOOK_URL=your_slack_webhook_url
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
FROM_EMAIL=noreply@vero.co.kr
TO_EMAIL=contact@vero.co.kr

# Security
HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
HCAPTCHA_SECRET_KEY=your_hcaptcha_secret_key
NEXTAUTH_SECRET=your_nextauth_secret

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=vero.co.kr

# Sentry
SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project

# App Config
NEXT_PUBLIC_APP_URL=https://vero.co.kr
NEXT_PUBLIC_APP_NAME=베로(VERO)
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📝 사용 가능한 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린팅
npm run lint

# 린팅 자동 수정
npm run lint:fix

# 타입 체크
npm run type-check

# 코드 포맷팅
npm run format

# 포맷팅 체크
npm run format:check

# 테스트 실행
npm run test

# E2E 테스트 실행
npm run test:e2e
```

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary Gold**: #C7A46A
- **Ink Blue**: #2B3A67
- **Charcoal**: #1C1C1E
- **Off White**: #F7F7F5
- **Dark**: #0E0E10

### 타이포그래피
- **Font Family**: Pretendard, Inter, system-ui
- **Headings**: 500-700 weight
- **Body**: 300-400 weight

### 컴포넌트
- **Cards**: rounded-2xl, soft shadows
- **Buttons**: Primary (Gold), Secondary (Outline)
- **Forms**: Clean inputs with focus states
- **Animations**: Subtle, meaningful micro-interactions

## 🔧 주요 기능

### 1. 반응형 디자인
- 모바일, 태블릿, 데스크톱 완벽 지원
- 12-column grid system
- Fluid typography and spacing

### 2. 접근성 (WCAG 2.2 AA)
- 키보드 네비게이션 완전 지원
- 스크린 리더 호환
- 명암비 준수
- 포커스 링 명확화

### 3. 성능 최적화
- Core Web Vitals 최적화
- 이미지 최적화 (AVIF/WebP)
- 코드 스플리팅
- 폰트 최적화

### 4. SEO 최적화
- 메타데이터 최적화
- 구조화된 데이터
- 사이트맵 자동 생성
- Open Graph/Twitter Cards

### 5. 보안
- HTTPS 강제
- 보안 헤더 설정
- CSRF 보호
- Rate limiting
- 입력 검증

## 📱 페이지 구성

### 1. 홈페이지 (/)
- 히어로 섹션
- 철학 소개
- 프로세스 설명
- 신뢰 포인트

### 2. 회사 소개 (/about)
- 브랜드 철학
- 전문성 소개
- 프로세스 상세
- 신뢰 포인트

### 3. 포트폴리오 (/portfolio)
- 프로젝트 카드 그리드
- 필터링 기능
- 상세 케이스 스터디

### 4. 공지사항 (/news)
- 뉴스 리스트
- 카테고리 필터
- 상세 페이지

### 5. 문의 (/contact)
- 문의 폼
- 연락처 정보
- FAQ 섹션

## 🔒 보안 고려사항

### 1. 입력 검증
- 클라이언트 및 서버 양쪽 검증
- Zod 스키마 기반 검증
- XSS 방지

### 2. CSRF 보호
- CSRF 토큰 사용
- SameSite 쿠키 설정

### 3. Rate Limiting
- API 엔드포인트별 제한
- IP 기반 제한

### 4. 보안 헤더
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- HSTS

## 📊 성능 목표

- **LCP**: < 2.5초
- **CLS**: < 0.1
- **INP**: < 200ms
- **Lighthouse Score**: 90+ (모든 카테고리)

## 🚀 배포

### Vercel 배포 (권장)

1. Vercel 계정에 GitHub 저장소 연결
2. 환경 변수 설정
3. 자동 배포 설정

### 수동 배포

```bash
npm run build
npm run start
```

## 📈 모니터링

### 1. 에러 추적
- Sentry를 통한 에러 모니터링
- 성능 모니터링

### 2. 분석
- Plausible Analytics
- 사용자 행동 분석

### 3. 로깅
- 구조화된 로깅
- 에러 로그 수집

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

- **이메일**: contact@vero.co.kr
- **전화**: 02-1234-5678
- **웹사이트**: https://vero.co.kr

---

**베로(VERO)** - 진정성으로 신뢰를 쌓는 웹 에이전시

