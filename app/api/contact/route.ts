import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { query } from '@/lib/database'
import { createSMSService, createInquiryNotificationSMS, getAdminPhoneNumbers } from '@/lib/sms'

// 문의 조회 (관리자용)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    let sql = `
      SELECT 
        id, name, email, company, phone, subject, message, budget, timeline,
        status, ip_address, user_agent, created_at, updated_at
      FROM contacts 
      WHERE 1=1
    `
    
    const params: any[] = []
    let paramCount = 0

    if (status) {
      paramCount++
      sql += ` AND status = $${paramCount}`
      params.push(status)
    }

    sql += ` ORDER BY created_at DESC`

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

    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rowCount
    })

  } catch (error) {
    console.error('문의 조회 오류:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: '문의 조회 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

const contactSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  company: z.string().optional(),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, '메시지를 10자 이상 입력해주세요'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, '이용약관에 동의해주세요'),
  agreeToPrivacy: z.boolean().refine((val) => val === true, '개인정보처리방침에 동의해주세요'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 데이터 유효성 검사
    const validatedData = contactSchema.parse(body)
    
    // Rate limiting (간단한 구현)
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    // 데이터베이스에 문의 저장
    const insertResult = await query(`
      INSERT INTO contacts (name, email, company, phone, subject, message, budget, timeline, ip_address, user_agent, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, created_at
    `, [
      validatedData.name,
      validatedData.email,
      validatedData.company || null,
      validatedData.phone || null,
      validatedData.subject || null,
      validatedData.message,
      validatedData.budget || null,
      validatedData.timeline || null,
      ip,
      userAgent,
      'new' // 새 문의 상태
    ])
    
    
    // SMS 알림 전송
    try {
      const smsService = createSMSService()
      const adminNumbers = getAdminPhoneNumbers()
      
      if (adminNumbers.length > 0) {
        const smsMessage = createInquiryNotificationSMS({
          name: validatedData.name,
          email: validatedData.email,
          company: validatedData.company,
          subject: validatedData.subject,
          message: validatedData.message,
          phone: validatedData.phone
        })
        
        // 모든 관리자에게 SMS 전송
        const smsPromises = adminNumbers.map(phoneNumber => 
          smsService.sendSMS({
            to: phoneNumber,
            message: smsMessage
          }, insertResult.rows[0].id)
        )
        
        const smsResults = await Promise.allSettled(smsPromises)
        
        // SMS 전송 결과 로깅
        smsResults.forEach((result, index) => {
          if (result.status === 'fulfilled') {
          } else {
            console.error(`SMS 전송 실패 (${adminNumbers[index]}):`, result.reason)
          }
        })
      }
    } catch (smsError) {
      console.error('SMS 전송 중 오류 발생:', smsError)
      // SMS 전송 실패해도 문의 처리는 계속 진행
    }
    
    // hCaptcha 검증 (실제 구현 시)
    // const hcaptchaResponse = body.hcaptchaResponse
    // if (!hcaptchaResponse) {
    //   return NextResponse.json({ error: 'hCaptcha 검증이 필요합니다' }, { status: 400 })
    // }
    
    // Slack 웹훅으로 알림 전송
    if (process.env.CONTACT_WEBHOOK_URL) {
      const slackMessage = {
        text: '새로운 문의가 접수되었습니다',
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '새로운 문의 접수'
            }
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*이름:* ${validatedData.name}`
              },
              {
                type: 'mrkdwn',
                text: `*회사:* ${validatedData.company || '미입력'}`
              },
              {
                type: 'mrkdwn',
                text: `*이메일:* ${validatedData.email}`
              },
              {
                type: 'mrkdwn',
                text: `*전화:* ${validatedData.phone || '미입력'}`
              },
              {
                type: 'mrkdwn',
                text: `*예산:* ${validatedData.budget}`
              },
              {
                type: 'mrkdwn',
                text: `*일정:* ${validatedData.timeline}`
              }
            ]
          },
          {
            type: 'section',
            text:               {
                type: 'mrkdwn',
                text: `*메시지:*\n${validatedData.message}`
              }
          }
        ]
      }
      
      await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slackMessage),
      })
    }
    
    // 이메일 발송 (실제 구현 시)
    // await sendEmail({
    //   to: process.env.TO_EMAIL,
    //   subject: `새로운 문의: ${validatedData.name}`,
    //   html: generateEmailTemplate(validatedData)
    // })
    
    // 고객 확인 이메일 발송
    // await sendEmail({
    //   to: validatedData.email,
    //   subject: '문의 접수 확인 - 베로(VERO)',
    //   html: generateCustomerEmailTemplate(validatedData)
    // })
    
    return NextResponse.json({ 
      success: true, 
      message: '문의가 성공적으로 접수되었습니다' 
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: '문의 전송에 실패했습니다. 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}

// OPTIONS 메서드 지원 (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

