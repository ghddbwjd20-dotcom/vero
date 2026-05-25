import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'
import { query } from './database'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    // 구글 로그인
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
    // 카카오 로그인
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || 'c040a3fd0c122b597929213d4655468e',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || 'yNonvJfoZ9DKtRZEjtDnV5LfY6ciyhUr',
    }),
    
    // 네이버 로그인
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    
    // 이메일/아이디 로그인
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        login: { label: '아이디 또는 이메일', type: 'text' },
        password: { label: '비밀번호', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) {
          return null
        }

        try {
          // 사용자 조회 (아이디 또는 이메일로 로그인)
          const result = await query(
            'SELECT id, user_id, email, password, name, role FROM users WHERE (user_id = $1 OR email = $1) AND status = $2',
            [credentials.login, 'active']
          )

          if (result.rows.length === 0) {
            return null
          }

          const user = result.rows[0]

          // 비밀번호 확인
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            return null
          }

          // 마지막 로그인 시간 업데이트
          await query(
            'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1',
            [user.id]
          )

          return {
            id: user.id.toString(),
            userId: user.user_id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        } catch (error) {
          console.error('인증 오류:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // 소셜 로그인인 경우
      if (account?.provider && account.provider !== 'credentials') {
        try {
          // 기존 사용자 확인 (이메일 또는 provider_id로)
          const userEmail = user.email || `${(user.email?.split('@')[0] || user.name || 'user')}_${account.provider}@${account.provider}.local`
          const existingUser = await query(
            'SELECT id, user_id, email, name, role, birth_date, gender, phone, company FROM users WHERE email = $1 OR (provider = $2 AND provider_id = $3)',
            [userEmail, account.provider, account.providerAccountId]
          )

          if (existingUser.rows.length === 0) {
            // 새 사용자 생성 (기본 정보만)
            const userId = (user.email?.split('@')[0] || user.name || 'user') + '_' + account.provider
            const newUserEmail = user.email || `${userId}@${account.provider}.local`
            const result = await query(
              `INSERT INTO users (user_id, name, email, password, role, email_verified, provider, provider_id, created_at, updated_at)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
               RETURNING id, user_id, name, email, role`,
              [
                userId,
                user.name || profile?.name || '사용자',
                newUserEmail,
                '', // 소셜 로그인은 비밀번호 없음
                'user',
                !!user.email, // 이메일이 있으면 인증됨, 없으면 미인증
                account.provider,
                account.providerAccountId
              ]
            )
            
            const newUser = result.rows[0]
            user.id = newUser.id.toString()
            user.userId = newUser.user_id
            user.role = newUser.role
            user.needsProfileSetup = true // 프로필 설정 필요 플래그
          } else {
            // 기존 사용자 정보 업데이트
            const existingUserData = existingUser.rows[0]
            user.id = existingUserData.id.toString()
            user.userId = existingUserData.user_id
            user.role = existingUserData.role
            
            // 필수 정보가 있는지 확인
            const hasRequiredInfo = existingUserData.birth_date && 
                                  existingUserData.gender && 
                                  existingUserData.phone
            user.needsProfileSetup = !hasRequiredInfo
          }
        } catch (error) {
          console.error('소셜 로그인 사용자 저장 오류:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.userId = user.userId
        token.needsProfileSetup = user.needsProfileSetup
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.userId = token.userId as string
        session.user.needsProfileSetup = token.needsProfileSetup as boolean
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // 카카오 로그인 후 리다이렉트 처리
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET || 'vero-website-nextauth-secret-key-2024-very-secure',
}