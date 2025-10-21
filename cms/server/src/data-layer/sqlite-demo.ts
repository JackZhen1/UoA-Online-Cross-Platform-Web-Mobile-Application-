import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "demo.db");
const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    avatar TEXT,
    colorPref TEXT,
    country TEXT,
    programme TEXT,
    role TEXT
  );
`).run();

const existing = db.prepare("SELECT * FROM users WHERE email = ?").get("demo@demo.com");
if (!existing) {
  db.prepare("INSERT INTO users (first_name, last_name, email, password, avatar, colorPref, country, programme, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").run( 
  "demo",
  "A",
  "demo@demo.com",
  "123456",      
  "panda",
  "dark",
  "New Zealand",
  "Master of Civil Engineering",
  "admin");
}

export function verifyUser(email: string, password: string) {
  return db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);
}

export default db;