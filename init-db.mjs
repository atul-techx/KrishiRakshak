import { loadEnvironment } from './runtime-config.mjs';
loadEnvironment();

import { initDb, isDbConfigured } from './db.mjs';

async function main() {
  console.log('Checking PostgreSQL connection...');
  if (!isDbConfigured()) {
    console.error('Error: DATABASE_URL is not configured in .env');
    console.log('Example: DATABASE_URL=postgresql://user:password@ep-xyz.neon.tech/neondb?sslmode=require');
    process.exit(1);
  }

  try {
    const result = await initDb();
    console.log('Success:', result.message);
    process.exit(0);
  } catch (err) {
    console.error('Database initialization failed:', err.message);
    process.exit(1);
  }
}

main();
