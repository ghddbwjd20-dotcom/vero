'use client'

import { useState, useEffect } from 'react'

interface VideoBackgroundProps {
  videoSrc: string
  fallbackGradient?: string
  overlay?: boolean
  blur?: boolean
  className?: string
  children?: React.ReactNode
  blurTransition?: boolean
}

export default function VideoBackground({
  videoSrc,
  fallbackGradient = 'bg-gradient-to-br from-vero-offwhite via-white to-vero-offwhite',
  overlay = true,
  blur = false,
  className = '',
  children,
  blurTransition = false
}: VideoBackgroundProps) {
  const [hasVideo, setHasVideo] = useState(false)
  const [videoError, setVideoError] = useState(false)

  // 동영상 파일 존재 여부 확인
  useEffect(() => {
    const checkVideo = async () => {
      try {
        const response = await fetch(videoSrc, { method: 'HEAD' })
        if (response.ok) {
          setHasVideo(true)
        } else {
          setHasVideo(false)
        }
      } catch (error) {
        setHasVideo(false)
      }
    }
    checkVideo()
  }, [videoSrc])

  return (
    <div className={`relative overflow-hidden ${className} ${blurTransition ? 'video-section-blur' : ''}`} style={{ backgroundColor: 'transparent' }}>
      {/* 동영상 배경 또는 애니메이션 배경 */}
      <div className="absolute inset-0" style={{ zIndex: -10 }}>
        {hasVideo && !videoError ? (
          <>
            {/* 실제 동영상 배경 */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className={`w-full h-full object-cover ${blur ? 'blur-sm' : ''}`}
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={() => setVideoError(true)}
            >
              <source src={videoSrc} type="video/mp4" />
              <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
            </video>
            {/* 동영상 오버레이 */}
            {overlay && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-vero-gold/20 via-vero-primary/10 to-vero-gold/20" />
                <div className="absolute inset-0 bg-black/20" />
              </>
            )}
          </>
                    ) : (
                      <>
                        {/* CSS 애니메이션 배경 (동영상 효과) */}
                        <div className={`w-full h-full ${fallbackGradient}`} />

                        {/* 애니메이션 그라데이션 레이어 */}
                        <div 
                          className={`absolute inset-0 ${blur ? 'blur-sm' : ''} animate-gradient`}
                          style={{
                            background: 'linear-gradient(45deg, rgba(199,164,106,0.1) 0%, rgba(45,55,72,0.1) 50%, rgba(199,164,106,0.1) 100%)',
                            animation: 'gradientShift 8s ease-in-out infinite'
                          }}
                        />

                        {/* 애니메이션 파티클 효과 */}
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-vero-gold/20 to-vero-primary/20 rounded-full blur-3xl animate-float" 
                             style={{ animationDelay: '0s', animationDuration: '6s' }} />
                        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-l from-vero-primary/15 to-vero-gold/15 rounded-full blur-2xl animate-drift" 
                             style={{ animationDelay: '1s', animationDuration: '10s' }} />
                        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-vero-gold/25 to-vero-primary/25 rounded-full blur-xl animate-float" 
                             style={{ animationDelay: '2s', animationDuration: '8s' }} />
                        
                        {/* 추가 애니메이션 요소 */}
                        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-tr from-vero-gold/10 to-vero-primary/10 rounded-full blur-2xl animate-drift" 
                             style={{ animationDelay: '3s', animationDuration: '12s' }} />
                        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-bl from-vero-primary/10 to-vero-gold/10 rounded-full blur-3xl animate-float" 
                             style={{ animationDelay: '1.5s', animationDuration: '9s' }} />
                        
                        {/* 미묘한 움직임을 위한 추가 요소들 */}
                        <div className="absolute top-1/6 left-1/2 w-20 h-20 bg-gradient-to-br from-vero-gold/5 to-vero-primary/5 rounded-full blur-2xl animate-pulse" 
                             style={{ animationDelay: '4s', animationDuration: '7s' }} />
                        <div className="absolute bottom-1/6 right-1/2 w-28 h-28 bg-gradient-to-tl from-vero-primary/8 to-vero-gold/8 rounded-full blur-xl animate-drift" 
                             style={{ animationDelay: '2.5s', animationDuration: '11s' }} />

                        {/* 애니메이션 오버레이 */}
                        {overlay && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-br from-vero-gold/20 via-vero-primary/10 to-vero-gold/20 animate-pulse" 
                                 style={{ animationDuration: '10s' }} />
                            <div className="absolute inset-0 bg-black/20" />
                          </>
                        )}
                      </>
                    )}
      </div>

      {/* 콘텐츠 */}
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
