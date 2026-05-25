import { NextRequest, NextResponse } from 'next/server'
import { testConnection, query } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    // 데이터베이스 연결 테스트
    const isConnected = await testConnection()
    
    if (!isConnected) {
      return NextResponse.json(
        { 
          success: false, 
          message: '데이터베이스 연결 실패',
          error: 'Connection failed'
        },
        { status: 500 }
      )
    }

    // 기본 테이블 존재 확인
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `)

    // 각 테이블의 레코드 수 확인
    const tableCounts = await Promise.all(
      tables.rows.map(async (table: any) => {
        const count = await query(`SELECT COUNT(*) as count FROM ${table.table_name}`)
        return {
          table: table.table_name,
          count: parseInt(count.rows[0].count)
        }
      })
    )

    return NextResponse.json({
      success: true,
      message: '데이터베이스 연결 성공',
      data: {
        connected: true,
        tables: tableCounts,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('데이터베이스 테스트 오류:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: '데이터베이스 테스트 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

