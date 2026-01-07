import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function setup() {
  const db = await open({
    filename: "database.db",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      verified INTEGER DEFAULT 0,
      verification_token TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      bmi REAL,
      category TEXT,
      date TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  console.log("Tables créées !");
}

setup();
