/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 정적 사이트 생성
  images: {
    unoptimized: true, // 정적 내보내기에서는 이미지 최적화 불가
    domains: ['cdn.sanity.io'],
    formats: ['image/avif', 'image/webp'],
  },
  // headers와 rewrites는 정적 내보내기에서 작동하지 않음
  // async headers() { ... } 제거 필요
  // async rewrites() { ... } 제거 필요
};

module.exports = nextConfig;
