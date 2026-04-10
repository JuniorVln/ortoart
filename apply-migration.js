const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const dbPath = path.resolve(__dirname, "ortoart.db");
const sqlPath = path.resolve(__dirname, "src", "db", "migrations", "0000_awesome_baron_zemo.sql");

const sql = fs.readFileSync(sqlPath, "utf-8");
const db = new Database(dbPath);

try {
  db.exec(sql);
  console.log("Migration applied successfully!");
  
  // Create initial admin user
  const crypto = require("crypto");
  const userId = crypto.randomUUID();
  // Default password: admin123 (client should change this)
  const passwordHash = crypto.scryptSync("admin123", "salt-ortoart-cms", 64).toString("hex");
  
  db.prepare(`
    INSERT INTO users (id, email, password_hash, name)
    VALUES (?, ?, ?, ?)
  `).run(userId, "admin@ortoart.com.br", passwordHash, "Administrador");
  
  console.log("Admin user created: admin@ortoart.com.br / admin123");
} catch (err) {
  console.error("Error applying migration:", err.message);
} finally {
  db.close();
}
