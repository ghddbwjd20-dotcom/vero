import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    // SQL 파일 읽기
    const sqlPath = path.join(process.cwd(), 'scripts', 'create-users-table.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf8')
    
    // SQL 실행
    await query(sqlContent)
    
    return NextResponse.json({
      success: true,
      message: '사용자 테이블이 성공적으로 생성되었습니다',
      data: {
        tables: ['users', 'user_profiles', 'user_activity_logs']
      }
    })
  } catch (error) {
    console.error('사용자 테이블 생성 오류:', error)
    return NextResponse.json({
      success: false,
      message: '사용자 테이블 생성 중 오류가 발생했습니다',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 })
  }
}

