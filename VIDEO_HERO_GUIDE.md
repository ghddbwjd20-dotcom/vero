# Hero 섹션 동영상 배경 가이드

## 🎬 구현된 기능

### 1. **동영상 배경 지원**
- **실제 동영상**: MP4, WebM 형식 지원
- **폴백 애니메이션**: 동영상이 없을 때 CSS 애니메이션으로 대체
- **자동 감지**: 동영상 파일 존재 여부를 자동으로 확인

### 2. **성능 최적화**
- **자동 재생**: `autoPlay`, `muted`, `loop` 속성으로 자동 재생
- **모바일 최적화**: `playsInline` 속성으로 모바일에서도 정상 재생
- **에러 처리**: 동영상 로드 실패 시 자동으로 애니메이션으로 전환

### 3. **반응형 디자인**
- **텍스트 가독성**: 흰색 텍스트와 그림자 효과로 가독성 향상
- **버튼 스타일**: 동영상 배경에 맞는 반투명 버튼 디자인
- **카드 투명도**: Bento Grid 카드들의 투명도 조정

## 📁 파일 구조

```
public/
└── videos/
    ├── hero-background.mp4    # 메인 동영상 파일 (MP4)
    ├── hero-background.webm   # WebM 형식 (선택사항)
    └── hero-poster.jpg        # 포스터 이미지 (선택사항)
```

## 🎥 동영상 파일 추가 방법

### 1. **동영상 파일 준비**
- **형식**: MP4 (H.264 코덱 권장)
- **해상도**: 1920x1080 (Full HD) 이상
- **길이**: 10-30초 (루프 재생용)
- **크기**: 10MB 이하 (로딩 속도 고려)

### 2. **파일 업로드**
```bash
# public/videos 폴더에 동영상 파일 복사
cp your-video.mp4 public/videos/hero-background.mp4
```

### 3. **WebM 변환 (선택사항)**
```bash
# FFmpeg를 사용한 WebM 변환
ffmpeg -i hero-background.mp4 -c:v libvpx-vp9 -c:a libvorbis hero-background.webm
```

## 🎨 스타일 커스터마이징

### 1. **오버레이 색상 조정**
```tsx
// 동영상 오버레이 색상
<div className="absolute inset-0 bg-gradient-to-br from-vero-gold/20 via-vero-primary/10 to-vero-gold/20" />
<div className="absolute inset-0 bg-black/20" />
```

### 2. **텍스트 스타일**
```tsx
// 제목 스타일
className="text-white drop-shadow-lg"

// 부제목 스타일  
className="text-white/90 drop-shadow-md"
```

### 3. **버튼 스타일**
```tsx
// 메인 버튼
className="bg-vero-gold hover:bg-vero-gold/90 text-white shadow-lg backdrop-blur-sm"

// 보조 버튼
className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
```

## 🔧 기술적 구현

### 1. **동영상 감지 로직**
```tsx
const [hasVideo, setHasVideo] = useState(false)
const [videoError, setVideoError] = useState(false)

useEffect(() => {
  const checkVideo = async () => {
    try {
      const response = await fetch('/videos/hero-background.mp4', { method: 'HEAD' })
      setHasVideo(response.ok)
    } catch (error) {
      setHasVideo(false)
    }
  }
  checkVideo()
}, [])
```

### 2. **조건부 렌더링**
```tsx
{hasVideo && !videoError ? (
  // 실제 동영상 배경
  <video autoPlay muted loop playsInline>
    <source src="/videos/hero-background.mp4" type="video/mp4" />
    <source src="/videos/hero-background.webm" type="video/webm" />
  </video>
) : (
  // CSS 애니메이션 배경
  <motion.div animate={{...}} />
)}
```

### 3. **CSS 애니메이션 폴백**
- **그라데이션 애니메이션**: 20초 주기로 배경 그라데이션 변화
- **파티클 효과**: 3개의 움직이는 원형 요소
- **블러 효과**: `blur-3xl`, `blur-2xl`, `blur-xl`로 깊이감 연출

## 📱 모바일 최적화

### 1. **성능 고려사항**
- **자동 재생**: `muted` 속성으로 모바일에서도 자동 재생
- **인라인 재생**: `playsInline` 속성으로 전체화면 방지
- **에러 처리**: 동영상 로드 실패 시 즉시 애니메이션으로 전환

### 2. **데이터 사용량**
- **파일 크기**: 10MB 이하 권장
- **압축**: H.264 코덱으로 최적화
- **폴백**: 동영상 없이도 완전한 경험 제공

## 🎯 사용자 경험

### 1. **로딩 상태**
- **즉시 표시**: CSS 애니메이션으로 즉시 배경 표시
- **점진적 향상**: 동영상 로드 후 자동 전환
- **에러 복구**: 동영상 실패 시 자동으로 애니메이션으로 전환

### 2. **접근성**
- **자동 재생**: 사용자 상호작용 없이도 재생
- **음소거**: `muted` 속성으로 소리 없이 재생
- **키보드 접근**: 모든 버튼이 키보드로 접근 가능

## 🚀 배포 시 고려사항

### 1. **CDN 사용**
- **동영상 CDN**: Cloudflare, AWS CloudFront 등 사용
- **캐싱**: 적절한 캐시 헤더 설정
- **압축**: Gzip/Brotli 압축 적용

### 2. **성능 모니터링**
- **로딩 시간**: 동영상 로딩 시간 모니터링
- **에러율**: 동영상 로드 실패율 추적
- **사용자 경험**: 실제 사용자 피드백 수집

## 🔍 문제 해결

### 1. **동영상이 재생되지 않는 경우**
- 파일 경로 확인: `/videos/hero-background.mp4`
- 파일 형식 확인: MP4 (H.264) 권장
- 브라우저 호환성: 최신 브라우저에서 테스트

### 2. **성능 문제**
- 파일 크기 줄이기: 10MB 이하로 압축
- 해상도 조정: 1920x1080에서 1280x720으로 축소
- WebM 형식 추가: 더 나은 압축률

### 3. **모바일 문제**
- `playsInline` 속성 확인
- `muted` 속성 확인
- 터치 이벤트 처리 확인

## 📊 성능 지표

### 1. **목표 지표**
- **로딩 시간**: 3초 이내
- **파일 크기**: 10MB 이하
- **에러율**: 1% 이하
- **사용자 만족도**: 90% 이상

### 2. **모니터링 도구**
- **Google PageSpeed Insights**: 성능 점수 확인
- **WebPageTest**: 로딩 시간 측정
- **Real User Monitoring**: 실제 사용자 경험 추적

이제 Hero 섹션에 동영상 배경이 완벽하게 구현되었습니다! 🎉

