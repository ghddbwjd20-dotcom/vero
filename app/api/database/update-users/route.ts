import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    // users 테이블에 새로운 필드 추가
    const alterTableSQL = `
      ALTER TABLE users ADD COLUMN IF NOT EXISTS birth_date DATE;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS gender VARCHAR(20);
      ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
      ALTER TABLE users ADD COLUMN IF NOT EXISTS company VARCHAR(255);
      ALTER TABLE users ADD COLUMN IF NOT EXISTS user_id VARCHAR(50) UNIQUE;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255);
    `

    await query(alterTableSQL)

    // 인덱스 추가
    const createIndexesSQL = `
      CREATE INDEX IF NOT EXISTS idx_users_user_id ON users(user_id);
      CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
      CREATE INDEX IF NOT EXISTS idx_users_birth_date ON users(birth_date);
    `

    await query(createIndexesSQL)

    return NextResponse.json({
      success: true,
      message: 'users 테이블이 업데이트되었습니다',
      data: {
        addedFields: ['birth_date', 'gender', 'phone', 'company', 'user_id', 'password'],
        indexes: ['user_id', 'phone', 'birth_date']
      }
    })

  } catch (error) {
    console.error('users 테이블 업데이트 오류:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'users 테이블 업데이트 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

