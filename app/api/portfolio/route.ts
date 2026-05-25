import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const status = searchParams.get('status')

    let sql = `
      SELECT 
        id, title, slug, description, content, thumbnail_url, 
        technologies, client_name, project_url, github_url,
        start_date, end_date, status, featured, order_index, created_at, updated_at
      FROM portfolio 
      WHERE 1=1
    `
    
    const params: any[] = []
    let paramCount = 0

    if (featured === 'true') {
      paramCount++
      sql += ` AND featured = $${paramCount}`
      params.push(true)
    }

    if (status) {
      paramCount++
      sql += ` AND status = $${paramCount}`
      params.push(status)
    }

    sql += ` ORDER BY order_index ASC, created_at DESC`

    if (limit) {
      paramCount++
      sql += ` LIMIT $${paramCount}`
      params.push(parseInt(limit))
    }

    const result = await query(sql, params)

    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rowCount
    })

  } catch (error) {
    console.error('포트폴리오 조회 오류:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: '포트폴리오 조회 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// 포트폴리오 생성 (관리자용)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      title,
      slug,
      description,
      content,
      thumbnail_url,
      technologies,
      client_name,
      project_url,
      github_url,
      start_date,
      end_date,
      status = 'completed',
      featured = false,
      order_index = 0
    } = body

    const result = await query(
      `INSERT INTO portfolio (title, slug, description, content, thumbnail_url, technologies, 
       client_name, project_url, github_url, start_date, end_date, status, featured, order_index)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [
        title, slug, description, content, thumbnail_url, technologies,
        client_name, project_url, github_url, start_date, end_date,
        status, featured, order_index
      ]
    )

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: '포트폴리오가 성공적으로 생성되었습니다'
    })

  } catch (error) {
    console.error('포트폴리오 생성 오류:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: '포트폴리오 생성 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
