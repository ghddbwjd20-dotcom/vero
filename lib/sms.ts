import twilio from 'twilio'
import { query } from '@/lib/database'

// SMS 서비스 타입 정의
export type SMSServiceType = 'twilio' | 'naver' | 'aws' | 'none'

// SMS 설정 인터페이스
interface SMSConfig {
  service: SMSServiceType
  twilio?: {
    accountSid: string
    authToken: string
    fromNumber: string
  }
  naver?: {
    accessKey: string
    secretKey: string
    serviceId: string
    fromNumber: string
  }
  aws?: {
    accessKeyId: string
    secretAccessKey: string
    region: string
  }
}

// SMS 메시지 인터페이스
interface SMSMessage {
  to: string
  message: string
  from?: string
}

// SMS 전송 결과 인터페이스
interface SMSResult {
  success: boolean
  messageId?: string
  error?: string
  service: SMSServiceType
}

// SMS 로그 저장 인터페이스
interface SMSLogData {
  inquiryId?: number
  phoneNumber: string
  message: string
  service: SMSServiceType
  messageId?: string
  status: 'success' | 'failed' | 'pending'
  errorMessage?: string
}

// SMS 서비스 클래스
export class SMSService {
  private config: SMSConfig

  constructor(config: SMSConfig) {
    this.config = config
  }

  // Twilio SMS 전송
  private async sendTwilioSMS(message: SMSMessage): Promise<SMSResult> {
    try {
      if (!this.config.twilio) {
        throw new Error('Twilio 설정이 없습니다')
      }

      const client = twilio(this.config.twilio.accountSid, this.config.twilio.authToken)
      
      const result = await client.messages.create({
        body: message.message,
        from: this.config.twilio.fromNumber,
        to: message.to
      })

      return {
        success: true,
        messageId: result.sid,
        service: 'twilio'
      }
    } catch (error) {
      console.error('Twilio SMS 전송 오류:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        service: 'twilio'
      }
    }
  }

  // 네이버 클라우드 플랫폼 SMS 전송
  private async sendNaverSMS(message: SMSMessage): Promise<SMSResult> {
    try {
      if (!this.config.naver) {
        throw new Error('네이버 클라우드 플랫폼 설정이 없습니다')
      }

      const { accessKey, secretKey, serviceId, fromNumber } = this.config.naver
      
      // 네이버 클라우드 플랫폼 SMS API 호출
      const response = await fetch(`https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-NCP-APIGW-API-KEY-ID': accessKey,
          'X-NCP-APIGW-API-KEY': secretKey,
        },
        body: JSON.stringify({
          type: 'SMS',
          from: fromNumber,
          to: [message.to],
          content: message.message
        })
      })

      if (!response.ok) {
        throw new Error(`네이버 SMS API 오류: ${response.status}`)
      }

      const result = await response.json()

      return {
        success: true,
        messageId: result.requestId,
        service: 'naver'
      }
    } catch (error) {
      console.error('네이버 SMS 전송 오류:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        service: 'naver'
      }
    }
  }

  // AWS SNS SMS 전송
  private async sendAWSSMS(message: SMSMessage): Promise<SMSResult> {
    try {
      if (!this.config.aws) {
        throw new Error('AWS 설정이 없습니다')
      }

      // AWS SNS는 별도 구현이 필요합니다
      // 여기서는 기본 구조만 제공합니다
      throw new Error('AWS SNS SMS는 별도 구현이 필요합니다')
    } catch (error) {
      console.error('AWS SMS 전송 오류:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        service: 'aws'
      }
    }
  }

  // SMS 로그 저장
  private async saveSMSLog(logData: SMSLogData): Promise<void> {
    try {
      await query(
        `INSERT INTO sms_logs (inquiry_id, phone_number, message, service, message_id, status, error_message)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          logData.inquiryId || null,
          logData.phoneNumber,
          logData.message,
          logData.service,
          logData.messageId || null,
          logData.status,
          logData.errorMessage || null
        ]
      )
    } catch (error) {
      console.error('SMS 로그 저장 오류:', error)
      // 로그 저장 실패해도 SMS 전송은 계속 진행
    }
  }

  // SMS 전송 메인 메서드
  async sendSMS(message: SMSMessage, inquiryId?: number): Promise<SMSResult> {
    let result: SMSResult

    switch (this.config.service) {
      case 'twilio':
        result = await this.sendTwilioSMS(message)
        break
      case 'naver':
        result = await this.sendNaverSMS(message)
        break
      case 'aws':
        result = await this.sendAWSSMS(message)
        break
      case 'none':
        result = {
          success: true,
          messageId: 'disabled',
          service: 'none'
        }
        break
      default:
        result = {
          success: false,
          error: '지원하지 않는 SMS 서비스입니다',
          service: this.config.service
        }
    }

    // SMS 로그 저장
    await this.saveSMSLog({
      inquiryId,
      phoneNumber: message.to,
      message: message.message,
      service: result.service,
      messageId: result.messageId,
      status: result.success ? 'success' : 'failed',
      errorMessage: result.error
    })

    return result
  }
}

// SMS 서비스 인스턴스 생성
export function createSMSService(): SMSService {
  const config: SMSConfig = {
    service: (process.env.SMS_SERVICE as SMSServiceType) || 'none',
    twilio: process.env.TWILIO_ACCOUNT_SID ? {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN!,
      fromNumber: process.env.TWILIO_FROM_NUMBER!
    } : undefined,
    naver: process.env.NAVER_ACCESS_KEY ? {
      accessKey: process.env.NAVER_ACCESS_KEY,
      secretKey: process.env.NAVER_SECRET_KEY!,
      serviceId: process.env.NAVER_SERVICE_ID!,
      fromNumber: process.env.NAVER_FROM_NUMBER!
    } : undefined,
    aws: process.env.AWS_ACCESS_KEY_ID ? {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      region: process.env.AWS_REGION || 'ap-northeast-2'
    } : undefined
  }

  return new SMSService(config)
}

// 문의 알림 SMS 메시지 생성
export function createInquiryNotificationSMS(inquiryData: {
  name: string
  email: string
  company?: string
  subject?: string
  message: string
  phone?: string
}): string {
  const { name, email, company, subject, message, phone } = inquiryData
  
  let smsMessage = `[베로] 새로운 문의가 접수되었습니다\n\n`
  smsMessage += `이름: ${name}\n`
  smsMessage += `이메일: ${email}\n`
  
  if (company) {
    smsMessage += `회사: ${company}\n`
  }
  
  if (phone) {
    smsMessage += `전화: ${phone}\n`
  }
  
  if (subject) {
    smsMessage += `제목: ${subject}\n`
  }
  
  smsMessage += `\n문의내용:\n${message.substring(0, 100)}${message.length > 100 ? '...' : ''}\n\n`
  smsMessage += `관리자 페이지에서 확인하세요.`
  
  return smsMessage
}

// 관리자 전화번호 목록 (환경변수에서 가져오기)
export function getAdminPhoneNumbers(): string[] {
  const adminNumbers = process.env.ADMIN_PHONE_NUMBERS
  if (!adminNumbers) {
    return []
  }
  
  return adminNumbers.split(',').map(num => num.trim()).filter(num => num.length > 0)
}
