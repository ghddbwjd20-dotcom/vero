import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      userId: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: string
      needsProfileSetup?: boolean
    }
  }

  interface User {
    id: string
    userId: string
    name?: string | null
    email?: string | null
    image?: string | null
    role: string
    needsProfileSetup?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    userId: string
    needsProfileSetup?: boolean
  }
}

