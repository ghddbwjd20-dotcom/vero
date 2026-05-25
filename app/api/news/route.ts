import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')

    let sql = `
      SELECT 
        id, title, slug, content, excerpt, thumbnail_url,
        author, category, published, published_at, order_index, created_at, updated_at
      FROM news 
      WHERE 1=1
    `
    
    const params: any[] = []
    let paramCount = 0

    if (published === 'true') {
      paramCount++
      sql += ` AND published = $${paramCount}`
      params.push(true)
    }

    if (category) {
      paramCount++
      sql += ` AND category = $${paramCount}`
      params.push(category)
    }

    sql += ` ORDER BY order_index ASC, published_at DESC, created_at DESC`

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
    console.error('뉴스 조회 오류:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: '뉴스 조회 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// 뉴스 생성 (관리자용)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      title,
      slug,
      content,
      excerpt,
      thumbnail_url,
      author,
      category = 'news',
      published = false,
      order_index = 0
    } = body

    const result = await query(
      `INSERT INTO news (title, slug, content, excerpt, thumbnail_url, author, category, published, order_index)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [title, slug, content, excerpt, thumbnail_url, author, category, published, order_index]
    )

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: '뉴스가 성공적으로 생성되었습니다'
    })

  } catch (error) {
    console.error('뉴스 생성 오류:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: '뉴스 생성 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
