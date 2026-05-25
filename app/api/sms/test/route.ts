import { NextRequest, NextResponse } from 'next/server'
import { createSMSService, getAdminPhoneNumbers } from '@/lib/sms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumber, message } = body

    if (!phoneNumber || !message) {
      return NextResponse.json(
        { 
          success: false, 
          message: '전화번호와 메시지를 입력해주세요' 
        },
        { status: 400 }
      )
    }

    const smsService = createSMSService()
    
    const result = await smsService.sendSMS({
      to: phoneNumber,
      message: message
    })

    return NextResponse.json({
      success: result.success,
      message: result.success ? 'SMS 전송 성공' : 'SMS 전송 실패',
      data: {
        service: result.service,
        messageId: result.messageId,
        error: result.error
      }
    })

  } catch (error) {
    console.error('SMS 테스트 오류:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'SMS 테스트 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// SMS 설정 상태 확인
export async function GET(request: NextRequest) {
  try {
    const smsService = createSMSService()
    const adminNumbers = getAdminPhoneNumbers()
    
    return NextResponse.json({
      success: true,
      data: {
        service: process.env.SMS_SERVICE || 'none',
        adminNumbers: adminNumbers,
        twilioConfigured: !!process.env.TWILIO_ACCOUNT_SID,
        naverConfigured: !!process.env.NAVER_ACCESS_KEY,
        awsConfigured: !!process.env.AWS_ACCESS_KEY_ID
      }
    })

  } catch (error) {
    console.error('SMS 설정 확인 오류:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'SMS 설정 확인 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

