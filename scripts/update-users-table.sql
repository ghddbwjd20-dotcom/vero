-- users 테이블에 새로운 필드 추가
ALTER TABLE users ADD COLUMN IF NOT EXISTS birth_date DATE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS gender VARCHAR(20);
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
ALTER TABLE users ADD COLUMN IF NOT EXISTS company VARCHAR(255);

-- 기존 필드가 없다면 추가
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_id VARCHAR(50) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255);

-- 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_users_user_id ON users(user_id);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_birth_date ON users(birth_date);

-- 완료 메시지
SELECT 'users 테이블 업데이트 완료!' as status;
SELECT '추가된 필드: birth_date, gender, phone, company, user_id, password' as added_fields;

