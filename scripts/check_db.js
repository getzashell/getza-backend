const dotenv = require('dotenv');
const { Pool } = require('pg');
const fs = require('fs');

dotenv.config();
if (fs.existsSync('.env.local')) dotenv.config({ path: '.env.local' });
// Also check parent directory for a repo-level .env.local
const parentEnv = '../.env.local';
if (fs.existsSync(parentEnv)) dotenv.config({ path: parentEnv });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('No DATABASE_URL found in environment. Aborting.');
  process.exit(2);
}

(async () => {
  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  try {
    const r = await pool.query("SELECT count(*) as cnt FROM information_schema.tables WHERE table_name='products';");
    const exists = r.rows[0].cnt !== '0';
    if (!exists) {
      console.log('products table: NOT FOUND');
      process.exit(0);
    }
    const res = await pool.query('SELECT count(*) as cnt FROM products');
    console.log('products row count:', res.rows[0].cnt);
  } catch (err) {
    console.error('DB check error:', err.message || err);
    process.exit(3);
  } finally {
    await pool.end();
  }
})();
