import { NextResponse } from 'next/server'

export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_APP_URL || 'https://vero.co.kr'}/sitemap.xml`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}


