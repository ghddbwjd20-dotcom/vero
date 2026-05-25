# 소셜 로그인 설정 가이드

베로(VERO) 웹사이트에서 카카오, 네이버, 구글 소셜 로그인을 설정하는 방법을 안내합니다.

## 🔧 설정된 소셜 로그인

- **구글 (Google)**
- **카카오 (Kakao)**
- **네이버 (Naver)**

## 📋 1. 구글 로그인 설정

### 1.1 Google Cloud Console 설정

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **API 및 서비스** > **사용자 인증 정보** 이동
4. **사용자 인증 정보 만들기** > **OAuth 클라이언트 ID** 선택
5. 애플리케이션 유형: **웹 애플리케이션**
6. 승인된 자바스크립트 원본: `http://localhost:3000` (개발), `https://vero.co.kr` (운영)
7. 승인된 리디렉션 URI: `http://localhost:3000/api/auth/callback/google` (개발), `https://vero.co.kr/api/auth/callback/google` (운영)

### 1.2 환경 변수 설정

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 📋 2. 카카오 로그인 설정

### 2.1 Kakao Developers 설정

1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 애플리케이션 등록
3. **제품 설정** > **카카오 로그인** 활성화
4. **카카오 로그인** > **Redirect URI** 설정:
   - 개발: `http://localhost:3000/api/auth/callback/kakao`
   - 운영: `https://vero.co.kr/api/auth/callback/kakao`
5. **제품 설정** > **카카오 로그인** > **동의항목** 설정:
   - 필수: 닉네임, 이메일
   - 선택: 프로필 사진, 성별, 연령대

### 2.2 환경 변수 설정

```env
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
```

## 📋 3. 네이버 로그인 설정

### 3.1 Naver Developers 설정

1. [Naver Developers](https://developers.naver.com/) 접속
2. 애플리케이션 등록
3. **API 설정** > **네이버 아이디로 로그인** 활성화
4. **네이버 아이디로 로그인** > **서비스 URL** 설정:
   - 개발: `http://localhost:3000`
   - 운영: `https://vero.co.kr`
5. **네이버 아이디로 로그인** > **Callback URL** 설정:
   - 개발: `http://localhost:3000/api/auth/callback/naver`
   - 운영: `https://vero.co.kr/api/auth/callback/naver`

### 3.2 환경 변수 설정

```env
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret
```

## 🗄️ 4. 데이터베이스 설정

### 4.1 사용자 테이블 업데이트

소셜 로그인을 위해 사용자 테이블에 다음 필드가 추가되었습니다:

```sql
-- 소셜 로그인 관련 필드
provider VARCHAR(50),                          -- 로그인 제공자 (google, kakao, naver, credentials)
provider_id VARCHAR(255),                      -- 소셜 로그인 제공자 ID
```

### 4.2 테이블 업데이트 실행

```bash
# SQL 스크립트 실행
psql -h localhost -p 5432 -U postgres -d vero -f scripts/create-users-table.sql
```

## 🚀 5. 개발 환경 테스트

### 5.1 환경 변수 설정

`.env.local` 파일에 소셜 로그인 키를 추가하세요:

```env
# Social Login
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret
```

### 5.2 개발 서버 실행

```bash
npm run dev
```

### 5.3 테스트

1. `http://localhost:3000/auth/signin` 접속
2. 소셜 로그인 버튼 클릭
3. 각 플랫폼에서 로그인 진행
4. 대시보드로 리디렉션 확인

## 🔒 6. 보안 고려사항

### 6.1 환경 변수 보안

- 소셜 로그인 키는 절대 공개 저장소에 커밋하지 마세요
- `.env.local` 파일은 `.gitignore`에 포함되어 있습니다
- 운영 환경에서는 환경 변수로 안전하게 관리하세요

### 6.2 도메인 설정

- 개발 환경: `http://localhost:3000`
- 운영 환경: `https://vero.co.kr`
- 각 소셜 로그인 플랫폼에서 정확한 도메인을 설정해야 합니다

## 🐛 7. 문제 해결

### 7.1 일반적인 오류

**"Invalid redirect URI" 오류:**
- 각 플랫폼의 콘솔에서 리디렉션 URI가 정확히 설정되었는지 확인
- 개발/운영 환경의 URL이 일치하는지 확인

**"Invalid client" 오류:**
- 클라이언트 ID와 시크릿이 올바른지 확인
- 환경 변수가 제대로 로드되었는지 확인

**데이터베이스 오류:**
- 사용자 테이블이 업데이트되었는지 확인
- 소셜 로그인 필드가 추가되었는지 확인

### 7.2 로그 확인

```bash
# 개발 서버 로그에서 오류 메시지 확인
npm run dev
```

## 📞 8. 지원

소셜 로그인 설정에 문제가 있으시면 다음을 확인해주세요:

1. 각 플랫폼의 개발자 콘솔 설정
2. 환경 변수 설정
3. 데이터베이스 테이블 구조
4. 네트워크 연결 상태

---

**참고:** 이 가이드는 개발 환경 기준으로 작성되었습니다. 운영 환경에서는 HTTPS를 사용하고 적절한 보안 설정을 적용해주세요.

