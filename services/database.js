import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("checkin.db");

export function initDatabase() {
  db.execSync(`drop table if exists itens;`);
  db.execSync(`
    CREATE TABLE IF NOT EXISTS itens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quantidade INTEGER,
    conferencia TEXT,
      produto TEXT,
      foto TEXT,
      sincronizado INTEGER DEFAULT 0
    );
  `);
}

export { db };
