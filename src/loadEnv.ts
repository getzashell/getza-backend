import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const root = path.resolve(__dirname, '../../');
const fallbackRoot = path.resolve(process.cwd(), '../backend');
const envRoot = fs.existsSync(path.resolve(root, '.env')) ? root : fallbackRoot;

dotenv.config({ path: path.resolve(envRoot, '.env') });
dotenv.config({ path: path.resolve(envRoot, '.env.local') });

if (!process.env.DATABASE_URL) {
  console.warn('[loadEnv] DATABASE_URL was not loaded from', envRoot);
}
