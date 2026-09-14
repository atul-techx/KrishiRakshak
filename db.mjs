import pg from 'pg';
const { Pool } = pg;

let pool = null;

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== '');
}

export function getPool() {
  if (!isDbConfigured()) return null;
  if (!pool) {
    const connectionString = process.env.DATABASE_URL.trim();
    const isLocalhost = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');

    pool = new Pool({
      connectionString,
      ssl: isLocalhost ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000
    });

    pool.on('error', (err) => {
      console.error('Unexpected PostgreSQL client error:', err.message);
    });
  }
  return pool;
}

export async function query(text, params = []) {
  const p = getPool();
  if (!p) throw new Error('DATABASE_NOT_CONFIGURED');
  return p.query(text, params);
}

export async function initDb() {
  if (!isDbConfigured()) {
    return { ok: false, message: 'DATABASE_URL is not set in environment.' };
  }

  const schema = `
    -- Users table
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      password_hash VARCHAR(255),
      role VARCHAR(50) DEFAULT 'farmer',
      location VARCHAR(255),
      crop VARCHAR(255),
      land_size NUMERIC,
      language VARCHAR(10) DEFAULT 'en',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Scans table
    CREATE TABLE IF NOT EXISTS scans (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
      crop VARCHAR(255),
      finding TEXT,
      confidence NUMERIC,
      severity VARCHAR(50),
      details JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Index for faster scan lookup by user
    CREATE INDEX IF NOT EXISTS idx_scans_user_id ON scans(user_id);

    -- Crops table
    CREATE TABLE IF NOT EXISTS crops (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      variety VARCHAR(255),
      area NUMERIC,
      sowing_date DATE,
      stage VARCHAR(100),
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Machinery rental listings
    CREATE TABLE IF NOT EXISTS machinery (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255),
      title VARCHAR(255) NOT NULL,
      type VARCHAR(100),
      rate NUMERIC,
      location VARCHAR(255),
      contact VARCHAR(50),
      available BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Sentinel audit & observation records
    CREATE TABLE IF NOT EXISTS sentinel_records (
      user_id VARCHAR(255) PRIMARY KEY,
      data JSONB NOT NULL DEFAULT '{"observations":[],"actions":[],"audit":[]}'::jsonb,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  try {
    await query(schema);
    console.log('PostgreSQL database tables initialized successfully.');
    return { ok: true, message: 'Tables initialized successfully.' };
  } catch (err) {
    console.error('Failed to initialize database schema:', err.message);
    throw err;
  }
}
