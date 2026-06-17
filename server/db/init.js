import db from './database.js';

// Creates every table with its schema.

function initSchema() {
  //serialize to execute in order the queries
  db.serialize(() => {
    
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      best_score INTEGER NOT NULL DEFAULT 0
    )`);

    // Lines table
    db.run(`CREATE TABLE IF NOT EXISTS lines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      color TEXT NOT NULL
    )`);

    // Network stations table
    db.run(`CREATE TABLE IF NOT EXISTS stations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )`);

    // Segments table : a direct connection between two stations on a specific line
    db.run(`CREATE TABLE IF NOT EXISTS segments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      line_id INTEGER NOT NULL,
      from_station INTEGER NOT NULL,
      to_station INTEGER NOT NULL,
      FOREIGN KEY (line_id) REFERENCES lines(id),
      FOREIGN KEY (from_station) REFERENCES stations(id),
      FOREIGN KEY (to_station) REFERENCES stations(id),
      UNIQUE (line_id, from_station, to_station)
    )`);

    // Random events applied per segment, coin change bounded to [-4, 4]
    db.run(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      coin_change INTEGER NOT NULL CHECK (coin_change BETWEEN -4 AND 4)
    )`);

    // One row per completed game; score clamped to 0 if negative.
    db.run(`CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      start_station INTEGER NOT NULL,
      dest_station INTEGER NOT NULL,
      score INTEGER NOT NULL,
      date_played TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (start_station) REFERENCES stations(id),
      FOREIGN KEY (dest_station) REFERENCES stations(id)
    )`);
  });
}

export { initSchema };