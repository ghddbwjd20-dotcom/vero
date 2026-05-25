import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { query } from '@/lib/database'

const registerSchema = z.object({
  userId: z.string().min(3, '아이디를 3자 이상 입력해주세요').max(50, '아이디는 50자 이하로 입력해주세요'),
  name: z.string().min(2, '이름을 2자 이상 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호를 6자 이상 입력해주세요'),
  confirmPassword: z.string(),
  birthDate: z.string().min(1, '생년월일을 입력해주세요'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say'], {
    errorMap: () => ({ message: '성별을 선택해주세요' })
  }),
  phone: z.string().min(1, '전화번호를 입력해주세요').regex(/^010-\d{4}-\d{4}$/, '전화번호는 010-1234-5678 형식으로 입력해주세요'),
  company: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, '이용약관에 동의해주세요'),
  agreeToPrivacy: z.boolean().refine((val) => val === true, '개인정보처리방침에 동의해주세요'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 데이터 유효성 검사
    const validatedData = registerSchema.parse(body)
    
    // 아이디 중복 확인
    const existingUserId = await query(
      'SELECT id FROM users WHERE user_id = $1',
      [validatedData.userId]
    )
    
    if (existingUserId.rows.length > 0) {
      return NextResponse.json(
        { error: '이미 사용 중인 아이디입니다' },
        { status: 400 }
      )
    }
    
    // 이메일 중복 확인
    const existingEmail = await query(
      'SELECT id FROM users WHERE email = $1',
      [validatedData.email]
    )
    
    if (existingEmail.rows.length > 0) {
      return NextResponse.json(
        { error: '이미 사용 중인 이메일입니다' },
        { status: 400 }
      )
    }
    
    // 전화번호 중복 확인
    const existingPhone = await query(
      'SELECT id FROM users WHERE phone = $1',
      [validatedData.phone]
    )
    
    if (existingPhone.rows.length > 0) {
      return NextResponse.json(
        { error: '이미 사용 중인 전화번호입니다' },
        { status: 400 }
      )
    }
    
    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)
    
    // 사용자 생성
    const result = await query(
      `INSERT INTO users (user_id, name, email, password, birth_date, gender, phone, company, role, email_verified, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING id, user_id, name, email, role`,
      [
        validatedData.userId,
        validatedData.name,
        validatedData.email,
        hashedPassword,
        validatedData.birthDate || null,
        validatedData.gender || null,
        validatedData.phone || null,
        validatedData.company || null,
        'user', // 기본 역할
        false, // 이메일 미인증
      ]
    )
    
    const user = result.rows[0]
    
    return NextResponse.json({
      success: true,
      message: '회원가입이 완료되었습니다',
      user: {
        id: user.id,
        userId: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
    
  } catch (error) {
    console.error('회원가입 오류:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: '회원가입에 실패했습니다. 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}
