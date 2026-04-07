const sqlite3 = require('sqlite3').verbose();

// Create DB file
const db = new sqlite3.Database('./inventory.db');

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      city TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      supplier_id INTEGER,
      product_name TEXT,
      quantity INTEGER,
      price REAL,
      FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
    )
  `);
});

module.exports = db;