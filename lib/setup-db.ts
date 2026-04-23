import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function setupDatabase() {
  try {
    console.log("Setting up database...");

    // Create subscribers table
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("✓ Created subscribers table");

    // Create index on email
    await sql`
      CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email)
    `;

    console.log("✓ Created index on email");

    // Create index on status
    await sql`
      CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status)
    `;

    console.log("✓ Created index on status");
    console.log("\n✅ Database setup complete!");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  }
}

setupDatabase();
