import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    const inquiryId = searchParams.get('inquiry_id')

    let sql = `
      SELECT 
        sl.id, sl.inquiry_id, sl.phone_number, sl.message, sl.service, 
        sl.message_id, sl.status, sl.error_message, sl.sent_at, sl.created_at,
        c.name as inquiry_name, c.email as inquiry_email
      FROM sms_logs sl
      LEFT JOIN contacts c ON sl.inquiry_id = c.id
      WHERE 1=1
    `
    
    const params: any[] = []
    let paramCount = 0

    if (status) {
      paramCount++
      sql += ` AND sl.status = $${paramCount}`
      params.push(status)
    }

    if (inquiryId) {
      paramCount++
      sql += ` AND sl.inquiry_id = $${paramCount}`
      params.push(parseInt(inquiryId))
    }

    sql += ` ORDER BY sl.sent_at DESC`

    if (limit) {
      paramCount++
      sql += ` LIMIT $${paramCount}`
      params.push(parseInt(limit))
    }

    if (offset) {
      paramCount++
      sql += ` OFFSET $${paramCount}`
      params.push(parseInt(offset))
    }

    const result = await query(sql, params)

    // 통계 정보도 함께 반환
    const statsResult = await query(`
      SELECT 
        status,
        COUNT(*) as count
      FROM sms_logs 
      GROUP BY status
    `)

    const stats = statsResult.rows.reduce((acc: any, row: any) => {
      acc[row.status] = parseInt(row.count)
      return acc
    }, {})

    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rowCount,
      stats: stats
    })

  } catch (error) {
    console.error('SMS 로그 조회 오류:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'SMS 로그 조회 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

