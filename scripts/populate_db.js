const dotenv = require('dotenv');
const { Pool } = require('pg');
const fs = require('fs');

// Load env files if present
dotenv.config();
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
}
// also attempt to load repo-level .env.local from parent dir
const parentEnvPath = '../.env.local';
if (fs.existsSync(parentEnvPath)) {
  dotenv.config({ path: parentEnvPath });
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('No DATABASE_URL found in environment. Aborting.');
  process.exit(2);
}

(async () => {
  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        price NUMERIC NOT NULL,
        category TEXT,
        description TEXT
      );
    `);

    const products = [
      ['template_1', 'Basic Contract', 5, 'Legal', 'A short contract template.'],
      ['template_2', 'Job Offer Letter', 3, 'Career', 'Offer letter template.']
    ];

    for (const p of products) {
      await pool.query(
        `INSERT INTO products (id, title, price, category, description) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO NOTHING`,
        p
      );
    }

    console.log('Products table created/updated and sample data inserted.');
  } catch (err) {
    console.error('Error populating DB:', err.message || err);
    process.exit(3);
  } finally {
    await pool.end();
  }
})();
