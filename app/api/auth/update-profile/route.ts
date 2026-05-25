import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { query } from '@/lib/database'
import { z } from 'zod'

const updateProfileSchema = z.object({
  birthDate: z.string().min(1, '생년월일을 입력해주세요'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say'], {
    errorMap: () => ({ message: '성별을 선택해주세요' })
  }),
  phone: z.string().min(1, '전화번호를 입력해주세요').regex(/^010-\d{4}-\d{4}$/, '전화번호는 010-1234-5678 형식으로 입력해주세요'),
  company: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '인증이 필요합니다' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = updateProfileSchema.parse(body)

    // 전화번호 중복 확인
    const existingPhone = await query(
      'SELECT id FROM users WHERE phone = $1 AND id != $2',
      [validatedData.phone, session.user.id]
    )

    if (existingPhone.rows.length > 0) {
      return NextResponse.json(
        { error: '이미 사용 중인 전화번호입니다' },
        { status: 400 }
      )
    }

    // 사용자 프로필 업데이트
    const result = await query(
      `UPDATE users 
       SET birth_date = $1, gender = $2, phone = $3, company = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING id, user_id, name, email, role`,
      [
        validatedData.birthDate,
        validatedData.gender,
        validatedData.phone,
        validatedData.company || null,
        session.user.id
      ]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: '프로필이 성공적으로 업데이트되었습니다',
      user: result.rows[0]
    })

  } catch (error) {
    console.error('프로필 업데이트 오류:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '프로필 업데이트 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

