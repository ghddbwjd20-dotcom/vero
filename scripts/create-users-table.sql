-- VERO 웹사이트 사용자 테이블 생성 스크립트
-- 생년월일, 성별, 이름, 아이디, 이메일, 비밀번호, 역할, 전화번호 포함

-- 기존 users 테이블이 있다면 삭제 (주의: 데이터가 모두 삭제됩니다)
-- DROP TABLE IF EXISTS users CASCADE;

-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    -- 기본 키
    id SERIAL PRIMARY KEY,
    
    -- 개인 정보
    user_id VARCHAR(50) UNIQUE NOT NULL,           -- 사용자 아이디 (로그인용)
    name VARCHAR(100) NOT NULL,                    -- 실명
    email VARCHAR(255) UNIQUE NOT NULL,            -- 이메일 (로그인용)
    password VARCHAR(255) NOT NULL,                -- 비밀번호 (해시화됨)
    
    -- 추가 개인 정보
    birth_date DATE,                               -- 생년월일
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')), -- 성별
    phone VARCHAR(20),                             -- 전화번호
    company VARCHAR(255),                          -- 회사명
    avatar_url VARCHAR(500),                       -- 프로필 이미지 URL
    
    -- 계정 설정
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')), -- 역할
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'pending')), -- 계정 상태
    email_verified BOOLEAN DEFAULT FALSE,          -- 이메일 인증 여부
    phone_verified BOOLEAN DEFAULT FALSE,          -- 전화번호 인증 여부
    
    -- 소셜 로그인 관련
    provider VARCHAR(50),                          -- 로그인 제공자 (google, kakao, naver, credentials)
    provider_id VARCHAR(255),                      -- 소셜 로그인 제공자 ID
    
    -- 보안 관련
    last_login_at TIMESTAMP,                       -- 마지막 로그인 시간
    login_attempts INTEGER DEFAULT 0,              -- 로그인 시도 횟수
    locked_until TIMESTAMP,                        -- 계정 잠금 해제 시간
    reset_password_token VARCHAR(255),             -- 비밀번호 재설정 토큰
    reset_password_expires TIMESTAMP,              -- 비밀번호 재설정 토큰 만료 시간
    email_verification_token VARCHAR(255),         -- 이메일 인증 토큰
    email_verification_expires TIMESTAMP,          -- 이메일 인증 토큰 만료 시간
    
    -- 메타데이터
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(id),       -- 생성자 (관리자가 생성한 경우)
    updated_by INTEGER REFERENCES users(id)        -- 수정자
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_user_id ON users(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login_at);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider);
CREATE INDEX IF NOT EXISTS idx_users_provider_id ON users(provider_id);

-- 업데이트 트리거 함수 (이미 존재하는 경우 무시)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 업데이트 트리거 생성
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 기본 관리자 계정 생성 (비밀번호: admin123)
-- 실제 운영 시에는 더 강력한 비밀번호를 사용하세요
INSERT INTO users (
    user_id, 
    name, 
    email, 
    password, 
    role, 
    status, 
    email_verified,
    birth_date,
    gender,
    phone
) VALUES (
    'admin',
    '관리자',
    'admin@vero.co.kr',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J7v8QzK2a', -- admin123
    'admin',
    'active',
    true,
    '1990-01-01',
    'male',
    '010-0000-0000'
) ON CONFLICT (user_id) DO NOTHING;

-- 테스트 사용자 계정 생성 (비밀번호: test123)
INSERT INTO users (
    user_id, 
    name, 
    email, 
    password, 
    role, 
    status, 
    email_verified,
    birth_date,
    gender,
    phone
) VALUES (
    'testuser',
    '테스트사용자',
    'test@example.com',
    '$2a$12$8K1p/a0dL3L2KQjK8vQeCOYz6TtxMQJqhN8/LewdBPj4J7v8QzK2a', -- test123
    'user',
    'active',
    true,
    '1995-05-15',
    'female',
    '010-1234-5678'
) ON CONFLICT (user_id) DO NOTHING;

-- 사용자 프로필 확장 테이블 (선택사항)
CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- 추가 프로필 정보
    bio TEXT,                                    -- 자기소개
    website VARCHAR(255),                        -- 개인 웹사이트
    location VARCHAR(100),                       -- 거주지
    timezone VARCHAR(50) DEFAULT 'Asia/Seoul',   -- 시간대
    
    -- 소셜 미디어
    linkedin_url VARCHAR(255),                   -- LinkedIn
    github_url VARCHAR(255),                     -- GitHub
    twitter_url VARCHAR(255),                    -- Twitter
    instagram_url VARCHAR(255),                  -- Instagram
    
    -- 설정
    language VARCHAR(10) DEFAULT 'ko',           -- 선호 언어
    theme VARCHAR(20) DEFAULT 'light',           -- 테마 설정
    notifications_email BOOLEAN DEFAULT TRUE,    -- 이메일 알림
    notifications_sms BOOLEAN DEFAULT FALSE,     -- SMS 알림
    
    -- 메타데이터
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 사용자 프로필 업데이트 트리거
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 사용자 활동 로그 테이블
CREATE TABLE IF NOT EXISTS user_activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,                -- 수행한 액션
    description TEXT,                            -- 액션 설명
    ip_address INET,                             -- IP 주소
    user_agent TEXT,                             -- User Agent
    metadata JSONB,                              -- 추가 메타데이터
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 활동 로그 인덱스
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON user_activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON user_activity_logs(action);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON user_activity_logs(created_at);

-- 완료 메시지
SELECT '사용자 테이블 생성 완료!' as status;
SELECT '생성된 테이블: users, user_profiles, user_activity_logs' as tables;
SELECT '기본 계정: admin/admin123, testuser/test123' as accounts;
