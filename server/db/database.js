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

// Promisified helpers — avoid callback nesting in DAOs and services
export const dbGet = (sql, params = []) =>
    new Promise((resolve, reject) =>
        db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)))
    );

export const dbAll = (sql, params = []) =>
    new Promise((resolve, reject) =>
        db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)))
    );

// db.run needs "this" for lastID/changes, so we cannot use util.promisify
export const dbRun = (sql, params = []) =>
    new Promise((resolve, reject) =>
        db.run(sql, params, function (err) {
            err ? reject(err) : resolve({ lastID: this.lastID, changes: this.changes });
        })
    );