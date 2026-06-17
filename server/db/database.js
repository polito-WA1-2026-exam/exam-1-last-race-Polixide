import sqlite from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, 'lastrace.sqlite');

const db = new sqlite.Database(dbPath, (err) => {
  if (err) {
    throw err;
  }
  // Foreign keys are off by default per-connection in SQLite: enable them.
  db.run('PRAGMA foreign_keys = ON');
  console.log('db connected!');
});

export default db;