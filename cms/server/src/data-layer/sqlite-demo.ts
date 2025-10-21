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
    role TEXT,
    createdAt TEXT
  );
`).run();

const existingUsers = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };

if (existingUsers.count === 0) {
  const insert = db.prepare(`
    INSERT INTO users (id, first_name, last_name, email, password, avatar, colorPref, country, programme, role, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const now = new Date().toISOString().replace('Z', '+00:00');

  const sampleUsers = [
    [1, "Demo", "Admin", "demo@demo.com", "123456", "panda", "dark", "New Zealand", "Master of Civil Engineering", "admin", now],
    [2, "Alice", "Smith", "alice@example.com", "123456", "default", "light", "Australia", "Master of Civil Engineering", "user", now],
    [3, "Bob", "Johnson", "bob@example.com", "123456", "fox", "dark", "Canada", "Master of Engineering Project Management", "user", now],
    [4, "Charlie", "Lee", "charlie@example.com", "123456", "dog", "light", "Singapore", "Master of Civil Engineering", "user", now],
    [5, "Eva", "Wang", "eva@example.com", "123456", "koala", "dark", "China", "Master of Engineering Project Management", "user", now],
  ];

  const insertMany = db.transaction((users) => {
    for (const user of users) insert.run(...user);
  });

  insertMany(sampleUsers);
  console.log("✅ Inserted 5 demo users into SQLite database.");
}

export function verifyUser(email: string, password: string) {
  return db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);
}

export default db;