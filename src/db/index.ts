import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import path from "path";
import * as schema from "./schema";

const DB_PATH = path.resolve(process.env.DB_PATH ?? "ortoart.db");

let _db: BetterSQLite3Database<typeof schema> | null = null;

export function getDb() {
  if (_db) return _db;

  const sqlite = new Database(DB_PATH, {
    readonly: false,
    fileMustExist: false,
  });

  _db = drizzle(sqlite, { schema });
  return _db;
}

export type Db = BetterSQLite3Database<typeof schema>;
