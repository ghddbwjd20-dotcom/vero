import { Pool, type PoolConfig } from 'pg'

const poolDefaults = {
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
} as const

function createPoolConfig(): PoolConfig {
  const databaseUrl = process.env.DATABASE_URL?.trim()
  if (databaseUrl) {
    return {
      ...poolDefaults,
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: true },
    }
  }

  return {
    ...poolDefaults,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'vero',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
  }
}

// PostgreSQL 연결 풀 생성 (DATABASE_URL 우선, 없으면 DB_HOST 등 개별 변수)
const pool = new Pool(createPoolConfig())

// 연결 풀 이벤트 리스너
pool.on('connect', () => {
})

pool.on('error', (err) => {
  console.error('❌ PostgreSQL 연결 오류:', err)
})

// 데이터베이스 쿼리 실행 함수
export async function query(text: string, params?: any[]) {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    return res
  } catch (error) {
    console.error('❌ 쿼리 오류:', error)
    throw error
  }
}

// 연결 풀 종료 함수
export async function closePool() {
  await pool.end()
}

// 데이터베이스 연결 테스트 함수
export async function testConnection() {
  try {
    const result = await query('SELECT NOW() as current_time')
    return true
  } catch (error) {
    console.error('❌ 데이터베이스 연결 테스트 실패:', error)
    return false
  }
}

export default pool
