# 메인 페이지 스크롤 애니메이션 가이드

## 🎬 구현된 기능

### 1. **부드러운 스크롤 애니메이션**
- **Framer Motion**: 고성능 애니메이션 라이브러리 사용
- **Intersection Observer**: 스크롤 위치 감지로 성능 최적화
- **커스텀 훅**: 재사용 가능한 애니메이션 로직

### 2. **섹션별 애니메이션 효과**
- **PricingBanner**: 상단에서 슬라이드 다운
- **BentoHero**: 동영상 배경과 함께 등장
- **철학 섹션**: 카드들이 순차적으로 나타남
- **프로세스 섹션**: 단계별 아이콘이 회전하며 등장
- **고객 후기**: 부드럽게 페이드 인
- **신뢰 포인트**: 카드들이 스태거 애니메이션으로 등장
- **CTA 섹션**: 버튼 호버 효과와 함께 등장

### 3. **인터랙티브 효과**
- **호버 애니메이션**: 카드와 버튼에 마우스 오버 효과
- **스케일 효과**: 아이콘과 버튼의 크기 변화
- **회전 효과**: 아이콘의 미묘한 회전 애니메이션
- **그림자 효과**: 호버 시 그림자 강화

## 🛠️ 기술적 구현

### 1. **커스텀 훅 (`useScrollAnimation`)**
```typescript
export const useScrollAnimation = (threshold = 0.1, triggerOnce = true) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else if (!triggerOnce) {
      controls.start('hidden')
    }
  }, [controls, inView, triggerOnce])

  return { ref, controls, inView }
}
```

### 2. **애니메이션 변형 (Variants)**
```typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}
```

### 3. **섹션 애니메이션 구조**
```tsx
<motion.section 
  className="section-padding bg-white"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true, amount: 0.3 }}
>
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <SectionHeader />
  </motion.div>
  
  <motion.div 
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* 카드들 */}
  </motion.div>
</motion.section>
```

## 🎨 애니메이션 효과

### 1. **페이드 인 애니메이션**
- **방향**: 아래에서 위로 (fadeInUp)
- **지연**: 0.2초씩 순차적 등장
- **지속시간**: 0.6초
- **이징**: easeOut (자연스러운 감속)

### 2. **스태거 애니메이션**
- **카드 그룹**: 0.1초 간격으로 순차 등장
- **아이콘**: 호버 시 1.1배 확대 + 5도 회전
- **카드**: 호버 시 위로 5px 이동 + 그림자 강화

### 3. **호버 효과**
```tsx
<motion.div
  whileHover={{ scale: 1.1, rotate: 5 }}
  transition={{ duration: 0.2 }}
>
  <Icon />
</motion.div>
```

### 4. **버튼 애니메이션**
```tsx
<motion.a
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  버튼 텍스트
</motion.a>
```

## 📱 반응형 대응

### 1. **모바일 최적화**
- **애니메이션 감소**: 모바일에서 과도한 애니메이션 방지
- **터치 최적화**: 터치 이벤트에 맞는 애니메이션
- **성능 고려**: 저사양 기기에서도 부드러운 동작

### 2. **접근성 고려**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## ⚡ 성능 최적화

### 1. **GPU 가속**
- **transform3d**: 하드웨어 가속 활용
- **will-change**: 브라우저 최적화 힌트
- **backface-visibility**: 3D 변환 최적화

### 2. **메모리 관리**
- **triggerOnce**: 한 번만 실행되는 애니메이션
- **viewport threshold**: 적절한 트리거 지점
- **cleanup**: 컴포넌트 언마운트 시 정리

### 3. **렌더링 최적화**
```css
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
```

## 🎯 사용자 경험

### 1. **시각적 피드백**
- **로딩 상태**: 즉시 보이는 콘텐츠
- **진행 표시**: 스크롤에 따른 자연스러운 등장
- **인터랙션**: 명확한 호버/클릭 피드백

### 2. **스토리텔링**
- **순서**: 논리적인 정보 전달 순서
- **강조**: 중요한 요소에 집중
- **흐름**: 자연스러운 스크롤 경험

### 3. **감정적 연결**
- **부드러움**: 급작스럽지 않은 전환
- **일관성**: 통일된 애니메이션 스타일
- **세련됨**: 브랜드에 맞는 고급스러운 효과

## 🔧 커스터마이징

### 1. **애니메이션 속도 조정**
```typescript
// 빠른 애니메이션
transition={{ duration: 0.3 }}

// 느린 애니메이션
transition={{ duration: 1.0 }}

// 지연 추가
transition={{ duration: 0.6, delay: 0.4 }}
```

### 2. **트리거 지점 조정**
```typescript
// 30% 보일 때 트리거
viewport={{ once: true, amount: 0.3 }}

// 50% 보일 때 트리거
viewport={{ once: true, amount: 0.5 }}
```

### 3. **애니메이션 방향 변경**
```typescript
// 왼쪽에서 오른쪽으로
initial={{ opacity: 0, x: -60 }}
animate={{ opacity: 1, x: 0 }}

// 오른쪽에서 왼쪽으로
initial={{ opacity: 0, x: 60 }}
animate={{ opacity: 1, x: 0 }}
```

## 📊 성능 지표

### 1. **목표 지표**
- **FPS**: 60fps 유지
- **로딩 시간**: 3초 이내
- **애니메이션 지연**: 100ms 이내
- **메모리 사용량**: 최소화

### 2. **모니터링 도구**
- **Chrome DevTools**: Performance 탭
- **Lighthouse**: 애니메이션 성능 점수
- **WebPageTest**: 실제 사용자 경험 측정

## 🚀 향후 개선사항

### 1. **고급 애니메이션**
- **패럴랙스 효과**: 스크롤 속도에 따른 배경 움직임
- **3D 변환**: 카드의 3D 회전 효과
- **물리 엔진**: 자연스러운 바운스 효과

### 2. **인터랙티브 요소**
- **스크롤 진행바**: 현재 위치 표시
- **섹션 네비게이션**: 빠른 이동 버튼
- **애니메이션 제어**: 사용자 설정 옵션

### 3. **성능 향상**
- **Web Workers**: 애니메이션 계산 분리
- **Virtual Scrolling**: 대용량 콘텐츠 최적화
- **Lazy Loading**: 필요시에만 애니메이션 로드

## 🎉 완성된 기능

- ✅ **부드러운 스크롤 애니메이션**
- ✅ **섹션별 맞춤 애니메이션**
- ✅ **인터랙티브 호버 효과**
- ✅ **반응형 대응**
- ✅ **접근성 고려**
- ✅ **성능 최적화**
- ✅ **커스텀 훅 시스템**
- ✅ **재사용 가능한 컴포넌트**

이제 메인 페이지의 모든 섹션이 부드럽게 이어지며, 사용자에게 매력적이고 전문적인 경험을 제공합니다! 🎬✨

