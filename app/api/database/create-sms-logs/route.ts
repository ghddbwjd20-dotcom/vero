import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    // SMS 로그 테이블 생성
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS sms_logs (
        id SERIAL PRIMARY KEY,
        inquiry_id INTEGER REFERENCES contacts(id) ON DELETE SET NULL,
        phone_number VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        service VARCHAR(20) NOT NULL,
        message_id VARCHAR(100),
        status VARCHAR(20) NOT NULL,
        error_message TEXT,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    await query(createTableSQL)

    // 인덱스 생성
    const createIndexesSQL = `
      CREATE INDEX IF NOT EXISTS idx_sms_logs_inquiry_id ON sms_logs(inquiry_id);
      CREATE INDEX IF NOT EXISTS idx_sms_logs_phone_number ON sms_logs(phone_number);
      CREATE INDEX IF NOT EXISTS idx_sms_logs_status ON sms_logs(status);
      CREATE INDEX IF NOT EXISTS idx_sms_logs_sent_at ON sms_logs(sent_at);
    `

    await query(createIndexesSQL)

    return NextResponse.json({
      success: true,
      message: 'SMS 로그 테이블이 생성되었습니다',
      data: {
        table: 'sms_logs',
        indexes: ['inquiry_id', 'phone_number', 'status', 'sent_at']
      }
    })

  } catch (error) {
    console.error('SMS 로그 테이블 생성 오류:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'SMS 로그 테이블 생성 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

