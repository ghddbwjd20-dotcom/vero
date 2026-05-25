import { Pool, type PoolConfig, type QueryResult } from 'pg'

/** DB 사용 시 .env에 DATABASE_ENABLED=true 설정 */
export function isDatabaseEnabled(): boolean {
  return process.env.DATABASE_ENABLED === 'true'
}

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

const pool = isDatabaseEnabled() ? new Pool(createPoolConfig()) : null

if (pool) {
  pool.on('error', (err) => {
    console.error('❌ PostgreSQL 연결 오류:', err)
  })
}

function emptyResult(text: string): QueryResult {
  const sql = text.trim().toLowerCase()
  if (sql.startsWith('insert') && sql.includes('returning')) {
    return {
      rows: [{ id: 0, created_at: new Date().toISOString() }],
      rowCount: 1,
      command: 'INSERT',
      oid: 0,
      fields: [],
    }
  }
  return { rows: [], rowCount: 0, command: 'SELECT', oid: 0, fields: [] }
}

export async function query(text: string, params?: any[]): Promise<QueryResult> {
  if (!pool) {
    return emptyResult(text)
  }

  try {
    return await pool.query(text, params)
  } catch (error) {
    console.error('❌ 쿼리 오류:', error)
    throw error
  }
}

export async function closePool() {
  if (pool) {
    await pool.end()
  }
}

export async function testConnection() {
  if (!pool) {
    return false
  }

  try {
    await query('SELECT NOW() as current_time')
    return true
  } catch (error) {
    console.error('❌ 데이터베이스 연결 테스트 실패:', error)
    return false
  }
}

export default pool
