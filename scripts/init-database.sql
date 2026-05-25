-- VERO 웹사이트 데이터베이스 스키마 초기화 스크립트

-- 데이터베이스 생성 (필요한 경우)
-- CREATE DATABASE vero;

-- 사용자 생성 (필요한 경우)
-- CREATE USER postgres WITH PASSWORD '1234';
-- GRANT ALL PRIVILEGES ON DATABASE vero TO postgres;

-- 연결 확인
SELECT '데이터베이스 연결 성공!' as status;

-- 포트폴리오 테이블
CREATE TABLE IF NOT EXISTS portfolio (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    content TEXT,
    thumbnail_url VARCHAR(500),
    images TEXT[], -- 이미지 URL 배열
    technologies TEXT[], -- 사용 기술 배열
    client_name VARCHAR(255),
    project_url VARCHAR(500),
    github_url VARCHAR(500),
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'completed', -- completed, in_progress, planned
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 뉴스/공지사항 테이블
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    thumbnail_url VARCHAR(500),
    author VARCHAR(100),
    category VARCHAR(50) DEFAULT 'news', -- news, notice, update
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 문의 테이블
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    budget VARCHAR(50), -- 100만원 미만, 100-500만원, 500-1000만원, 1000만원 이상
    timeline VARCHAR(50), -- 1개월 이내, 1-3개월, 3-6개월, 6개월 이상
    status VARCHAR(50) DEFAULT 'new', -- new, contacted, in_progress, completed, closed
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 회사 정보 테이블
CREATE TABLE IF NOT EXISTS company_info (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user', -- user, admin
    email_verified BOOLEAN DEFAULT FALSE,
    avatar_url VARCHAR(500),
    phone VARCHAR(20),
    company VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 팀 멤버 테이블
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(500),
    email VARCHAR(255),
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 서비스 테이블
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    content TEXT,
    icon VARCHAR(100),
    price_min INTEGER,
    price_max INTEGER,
    duration VARCHAR(50),
    features TEXT[],
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON portfolio(status);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_team_members_active ON team_members(active);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);

-- 기본 데이터 삽입
INSERT INTO company_info (key, value, description) VALUES
('company_name', '베로(VERO)', '회사명'),
('tagline', '진정성으로 신뢰를 설계합니다', '회사 슬로건'),
('description', '진정성으로 신뢰를 쌓는 웹 에이전시', '회사 설명'),
('address', '서울특별시 강남구 테헤란로 123', '회사 주소'),
('phone', '02-1234-5678', '대표 전화번호'),
('email', 'contact@vero.co.kr', '대표 이메일'),
('business_number', '123-45-67890', '사업자등록번호'),
('ceo_name', '홍길동', '대표자명')
ON CONFLICT (key) DO NOTHING;

-- 기본 서비스 데이터
INSERT INTO services (title, slug, description, content, icon, price_min, price_max, duration, features, order_index) VALUES
('웹사이트 제작', 'website-development', '브랜드에 맞는 맞춤형 웹사이트를 제작합니다', '반응형 웹사이트, 관리자 페이지, SEO 최적화를 포함한 완전한 웹사이트 솔루션을 제공합니다.', 'globe', 500000, 2000000, '2-4주', ARRAY['반응형 디자인', 'SEO 최적화', '관리자 페이지', '호스팅 설정'], 1),
('브랜드 아이덴티티', 'brand-identity', '브랜드의 정체성을 시각적으로 표현합니다', '로고, 컬러 팔레트, 타이포그래피 등 브랜드의 핵심 요소들을 설계합니다.', 'palette', 300000, 1000000, '1-2주', ARRAY['로고 디자인', '컬러 가이드', '타이포그래피', '브랜드 가이드라인'], 2),
('디지털 마케팅', 'digital-marketing', '온라인에서 고객을 찾고 연결합니다', 'SEO, SNS 마케팅, 광고 운영을 통해 브랜드의 온라인 존재감을 강화합니다.', 'trending-up', 200000, 1500000, '1-3개월', ARRAY['SEO 최적화', 'SNS 관리', '광고 운영', '성과 분석'], 3)
ON CONFLICT (slug) DO NOTHING;

-- 기본 포트폴리오 데이터
INSERT INTO portfolio (title, slug, description, content, thumbnail_url, technologies, client_name, project_url, featured, status) VALUES
('스타트업 브랜딩 프로젝트', 'startup-branding-project', '혁신적인 스타트업의 브랜드 아이덴티티와 웹사이트를 제작했습니다', '기존의 전통적인 접근 방식을 벗어나 젊고 역동적인 브랜드 이미지를 구축했습니다.', 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Startup+Project', ARRAY['React', 'Next.js', 'Tailwind CSS', 'Figma'], '테크스타트업', 'https://example.com', true, 'completed'),
('이커머스 플랫폼', 'ecommerce-platform', '대규모 이커머스 플랫폼의 프론트엔드를 개발했습니다', '사용자 경험을 최우선으로 한 직관적인 인터페이스와 빠른 로딩 속도를 구현했습니다.', 'https://via.placeholder.com/600x400/059669/FFFFFF?text=E-commerce+Platform', ARRAY['Vue.js', 'Nuxt.js', 'TypeScript', 'Stripe'], '이커머스 회사', 'https://example.com', true, 'completed'),
('기업 홈페이지 리뉴얼', 'corporate-website-renewal', '기존 기업 홈페이지를 현대적이고 사용자 친화적으로 리뉴얼했습니다', '기존의 복잡한 구조를 단순화하고 모바일 최적화를 통해 접근성을 크게 향상시켰습니다.', 'https://via.placeholder.com/600x400/DC2626/FFFFFF?text=Corporate+Renewal', ARRAY['WordPress', 'PHP', 'MySQL', 'jQuery'], '제조업체', 'https://example.com', false, 'completed')
ON CONFLICT (slug) DO NOTHING;

-- 기본 뉴스 데이터
INSERT INTO news (title, slug, content, excerpt, author, category, published, published_at) VALUES
('VERO 웹사이트 오픈', 'vero-website-launch', '베로(VERO) 공식 웹사이트가 오픈되었습니다. 앞으로 더 나은 서비스로 고객 여러분께 다가가겠습니다.', '베로(VERO) 공식 웹사이트가 오픈되었습니다.', '베로팀', 'notice', true, CURRENT_TIMESTAMP),
('새로운 서비스 런칭', 'new-service-launch', '고객의 요구사항에 맞춘 새로운 서비스를 런칭했습니다. 자세한 내용은 서비스 페이지에서 확인하실 수 있습니다.', '고객의 요구사항에 맞춘 새로운 서비스를 런칭했습니다.', '베로팀', 'news', true, CURRENT_TIMESTAMP - INTERVAL '1 day'),
('업데이트 안내', 'update-notice', '시스템 업데이트로 인한 일시적인 서비스 중단이 있을 예정입니다. 양해 부탁드립니다.', '시스템 업데이트로 인한 일시적인 서비스 중단 안내입니다.', '베로팀', 'notice', true, CURRENT_TIMESTAMP - INTERVAL '2 days')
ON CONFLICT (slug) DO NOTHING;

-- 업데이트 트리거 함수 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 업데이트 트리거 생성
CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON portfolio FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_company_info_updated_at BEFORE UPDATE ON company_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 완료 메시지
SELECT '데이터베이스 스키마 초기화 완료!' as status;
