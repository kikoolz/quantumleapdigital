import { neon } from "@neondatabase/serverless";

let sql: ReturnType<typeof neon> | null = null;

function getDatabase() {
  if (sql) {
    return sql;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("Missing env.DATABASE_URL");
  }

  sql = neon(databaseUrl);
  return sql;
}

export const db = new Proxy({} as ReturnType<typeof neon>, {
  get(_target, prop) {
    return getDatabase()[prop as keyof ReturnType<typeof neon>];
  },
});

// For backward compatibility, export as supabase
export const supabase = db;
