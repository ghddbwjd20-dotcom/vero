# 카카오 로그인 설정 가이드

## 🔑 카카오 개발자 콘솔 설정

### 1. 카카오 개발자 콘솔 접속
- [카카오 개발자 콘솔](https://developers.kakao.com/) 접속
- 카카오 계정으로 로그인

### 2. 애플리케이션 생성
1. **내 애플리케이션** → **애플리케이션 추가하기**
2. **앱 이름**: VeroSite (또는 원하는 이름)
3. **사업자명**: 개인 또는 회사명
4. **카테고리**: 기타 선택

### 3. 플랫폼 설정
1. **앱 설정** → **플랫폼** 탭
2. **Web 플랫폼 등록**
   - **사이트 도메인**: `http://localhost:3000`
   - **Redirect URI**: `http://localhost:3000/callback`

### 4. 제품 설정
1. **제품 설정** → **카카오 로그인** 활성화
2. **Redirect URI** 추가: `http://localhost:3000/callback`

### 5. 동의항목 설정
1. **제품 설정** → **카카오 로그인** → **동의항목**
2. **필수 동의항목**:
   - 닉네임
   - 카카오계정(이메일)
3. **선택 동의항목** (필요시):
   - 프로필 사진
   - 연령대

## 🔧 환경변수 설정

### .env.local 파일에 추가
```bash
# 카카오 로그인 설정
KAKAO_CLIENT_ID=c040a3fd0c122b597929213d4655468e
KAKAO_CLIENT_SECRET=your_kakao_client_secret_here
KAKAO_REDIRECT_URI=http://localhost:3000/callback
```

### 필요한 값들
- **KAKAO_CLIENT_ID**: 카카오 개발자 콘솔의 **앱 키** → **REST API 키**
- **KAKAO_CLIENT_SECRET**: 카카오 개발자 콘솔의 **보안** → **Client Secret**
- **KAKAO_REDIRECT_URI**: `http://localhost:3000/callback`

## 🚀 배포 시 설정 변경

### 프로덕션 환경
```bash
# 프로덕션 환경변수
KAKAO_CLIENT_ID=your_production_client_id
KAKAO_CLIENT_SECRET=your_production_client_secret
KAKAO_REDIRECT_URI=https://yourdomain.com/api/auth/callback/kakao
```

### 카카오 개발자 콘솔에서 추가 설정
1. **Web 플랫폼** 추가:
   - **사이트 도메인**: `https://yourdomain.com`
   - **Redirect URI**: `https://yourdomain.com/api/auth/callback/kakao`

## 🔍 테스트 방법

### 1. 로컬 테스트
1. 개발 서버 실행: `npm run dev`
2. `http://localhost:3000/auth/signin` 접속
3. **카카오로 로그인** 버튼 클릭
4. 카카오 로그인 페이지에서 로그인
5. 자동으로 대시보드로 리다이렉트

### 2. 로그 확인
- 브라우저 개발자 도구 콘솔에서 오류 확인
- 서버 로그에서 인증 과정 확인

## ⚠️ 주의사항

### 보안
- **Client Secret**은 절대 공개하지 마세요
- `.env.local` 파일을 `.gitignore`에 추가했는지 확인
- 프로덕션에서는 HTTPS 사용 필수

### 개발 단계
- 카카오 개발자 콘솔에서 **개발용**과 **운영용** 앱을 분리 권장
- 테스트용 계정으로만 개발 단계에서 테스트

### 오류 해결
- **redirect_uri_mismatch**: 카카오 개발자 콘솔의 Redirect URI와 일치하는지 확인
- **invalid_client**: Client ID와 Client Secret이 올바른지 확인
- **access_denied**: 사용자가 로그인을 취소한 경우

## 📱 모바일 지원

### 모바일 앱에서 웹뷰 사용 시
```bash
# 모바일 앱용 Redirect URI
KAKAO_REDIRECT_URI=your-app-scheme://oauth
```

### 카카오톡 앱에서 로그인
- 카카오톡 앱이 설치된 경우 자동으로 앱으로 이동
- 앱이 없는 경우 웹 브라우저에서 로그인

## 🔄 로그아웃 처리

### 카카오 로그아웃
```javascript
// 카카오 로그아웃 (선택사항)
const handleKakaoLogout = () => {
  if (window.Kakao) {
    window.Kakao.Auth.logout(() => {
      signOut({ callbackUrl: '/' })
    })
  } else {
    signOut({ callbackUrl: '/' })
  }
}
```

## 📊 사용자 정보 매핑

### 카카오에서 받는 정보
- **id**: 카카오 고유 ID
- **email**: 카카오 계정 이메일
- **name**: 카카오 닉네임
- **image**: 프로필 이미지 URL

### 데이터베이스 저장
- **user_id**: `{email}@kakao`
- **email**: 카카오 이메일
- **name**: 카카오 닉네임
- **provider**: `kakao`
- **provider_id**: 카카오 고유 ID
