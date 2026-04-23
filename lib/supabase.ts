import { neon } from "@neondatabase/serverless";
import "@/lib/env";

let sql: ReturnType<typeof neon> | null = null;

function getDatabase() {
  if (sql) {
    return sql;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("DATABASE_URL is not configured - database operations will fail");
      throw new Error("DATABASE_URL is not configured");
    }
    throw new Error("Missing env.DATABASE_URL");
  }

  sql = neon(databaseUrl);
  return sql;
}

export function db(...args: Parameters<ReturnType<typeof neon>>) {
  return getDatabase()(...args);
}

// For backward compatibility, export as supabase
export const supabase = db;
