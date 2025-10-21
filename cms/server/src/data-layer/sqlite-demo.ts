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

db.prepare(`
  CREATE TABLE IF NOT EXISTS newmodules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    iconKey TEXT,
    sortOrder INTEGER,
    createdAt TEXT,
    updatedAt TEXT
  );
`).run();

// --- Subsections ---
db.prepare(`
  CREATE TABLE IF NOT EXISTS subsections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    module_id INTEGER,
    title TEXT,
    body TEXT,
    createdAt TEXT,
    updatedAt TEXT,
    FOREIGN KEY (module_id) REFERENCES newmodules(id)
  );
`).run();

// --- Links ---
db.prepare(`
  CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    module_id INTEGER,
    title TEXT,
    link TEXT,
    createdAt TEXT,
    updatedAt TEXT,
    FOREIGN KEY (module_id) REFERENCES newmodules(id)
  );
`).run();

// --- Quizzes ---
db.prepare(`
  CREATE TABLE IF NOT EXISTS quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    module_id INTEGER,
    title TEXT,
    description TEXT,
    createdAt TEXT,
    updatedAt TEXT,
    FOREIGN KEY (module_id) REFERENCES newmodules(id)
  );
`).run();

// --- Questions ---
db.prepare(`
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_id INTEGER,
    question TEXT,
    optionA TEXT,
    optionB TEXT,
    optionC TEXT,
    optionD TEXT,
    correctAnswer TEXT,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
  );
`).run();


const existingUsers = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
const existingModules = db.prepare("SELECT COUNT(*) as count FROM newmodules").get() as { count: number };
const now = new Date().toISOString().replace('Z', '+00:00');

if (existingUsers.count === 0) {
  const insert = db.prepare(`
    INSERT INTO users (id, first_name, last_name, email, password, avatar, colorPref, country, programme, role, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
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


if (existingModules.count === 0) {
  // insert module
  const insertModule = db.prepare(`
    INSERT INTO newmodules (id, title, description, iconKey, sortOrder, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // insert subsection
  const insertSubsection = db.prepare(`
    INSERT INTO subsections (module_id, title, body, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?)
  `);

  // insert link
  const insertLink = db.prepare(`
    INSERT INTO links (module_id, title, link, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?)
  `);

  // insert quiz
  const insertQuiz = db.prepare(`
    INSERT INTO quizzes (id, module_id, title, description, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  // insert question
  const insertQuestion = db.prepare(`
    INSERT INTO questions (quiz_id, question, optionA, optionB, optionC, optionD, correctAnswer)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // modules definitions
  const module1 = {
    id: 1,
    title: "Get Set Up For Success",
    description:
      "Start your course strong by learning how to use Canvas, understanding academic integrity, and following online conduct guidelines.",
    iconKey: "MaterialIcons#star-border-purple500",
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
  };

  const insertAll = db.transaction(() => {
    // modules
    insertModule.run(
      module1.id,
      module1.title,
      module1.description,
      module1.iconKey,
      module1.sortOrder,
      module1.createdAt,
      module1.updatedAt
    );

    // Subsections
    insertSubsection.run(
      module1.id,
      "Getting Started with Canvas",
      "Learn how to navigate and manage your course materials.",
      now,
      now
    );
    insertSubsection.run(
      module1.id,
      "Academic Integrity",
      "Understand the importance of honesty and original work in assessments.",
      now,
      now
    );
    insertSubsection.run(
      module1.id,
      "Online Conduct",
      "Follow proper communication and etiquette in online discussions.",
      now,
      now
    );

    // Links
    insertLink.run(
      module1.id,
      "Canvas Learning Portal",
      "https://canvas.auckland.ac.nz",
      now,
      now
    );
    insertLink.run(
      module1.id,
      "Academic Integrity Policy",
      "https://www.auckland.ac.nz/en/about/academic-integrity.html",
      now,
      now
    );
    insertLink.run(
      module1.id,
      "Online Learning Help Centre",
      "https://elearn.auckland.ac.nz",
      now,
      now
    );

    // Quizzes
    insertQuiz.run(
      1,
      module1.id,
      "Module 1 Quiz: Online Learning Basics",
      "A short quiz to check your understanding of online learning tools.",
      now,
      now
    );

    // Questions
    insertQuestion.run(
      1,
      "Which platform is used for online learning at the University of Auckland?",
      "Moodle",
      "Blackboard",
      "Canvas",
      "Edmodo",
      "Canvas"
    );
    insertQuestion.run(
      1,
      "What does academic integrity mean?",
      "Copying other students' work",
      "Submitting your own original work",
      "Using ChatGPT for all answers",
      "Skipping plagiarism checks",
      "Submitting your own original work"
    );
    insertQuestion.run(
      1,
      "Which of the following is good online conduct?",
      "Ignoring other students' questions",
      "Using ALL CAPS to emphasize everything",
      "Respectful and polite communication",
      "Sharing exam answers",
      "Respectful and polite communication"
    );
  });

  insertAll();
  console.log("✅ Inserted 1 demo module with subsections, links, quiz, and questions.");
}


export function verifyUser(email: string, password: string) {
  return db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);
}

export default db;