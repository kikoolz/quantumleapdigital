## Quantum Leap Digital Website

A modern marketing website for Quantum Leap Digital built with Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion. The site showcases services, team, and contact workflows with performant, accessible UI components.

### Tech Stack

- Next.js 15 (App Router)
- React 19, TypeScript
- Tailwind CSS v4
- Framer Motion
- Resend (email)
- Neon Postgres (`@neondatabase/serverless`)

### Prerequisites

- Node.js 18+ (recommended: LTS)
- npm (or yarn/pnpm/bun)
- Neon Postgres database (or compatible PostgreSQL database)

### Environment Variables

Create a `.env.local` at the project root:

```env
# Neon Postgres Database
DATABASE_URL=your-neon-postgres-connection-string

# Resend (email service)
RESEND_API_KEY=your-resend-api-key
SENDER_EMAIL=onboarding@resend.dev
```

### Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

Lint:

```bash
npm run lint
```

### Scripts

- `dev`: Start Next.js in development mode (Turbopack enabled)
- `build`: Create an optimized production build
- `start`: Start the production server
- `lint`: Run ESLint

### Project Structure (high level)

```
app/                # App Router pages, routes and layout
components/         # UI and feature components
lib/                # Client libraries, data, utils
public/             # Static assets (e.g., images)
```

### Styling Notes

- Tailwind CSS v4 canonical class names are used (e.g., `bg-linear-to-r`, `bg-white/3`).
- Class suggestions can be tuned via workspace setting: `tailwindCSS.lint.suggestCanonicalClasses`.

### Newsletter API

- Endpoint: `POST /api/newsletter` with JSON `{ email: string }`.
- Stores subscribers in Postgres table `subscribers` and sends a welcome email via Resend.

### Database Setup

1. Create a Neon Postgres database at [neon.tech](https://neon.tech)
2. Copy your connection string and add it to `.env.local` as `DATABASE_URL`
3. Run the migration SQL in your Neon SQL Editor:

```bash
# Copy and paste the contents of migrations/001_create_subscribers_table.sql
# into your Neon SQL Editor and execute it
```

Alternatively, you can use any PostgreSQL client (like `psql`) with your connection string:

```bash
psql "your-neon-connection-string" -f migrations/001_create_subscribers_table.sql
```

### Database Schema

The `subscribers` table structure:

```sql
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

See `migrations/001_create_subscribers_table.sql` for the complete migration with indexes.

### Resend Setup

1. **Create a Resend account**: Go to [resend.com](https://resend.com) and sign up (free tier: 3,000 emails/month)
2. **Get your API key**:
   - After signing up, go to **API Keys** in the dashboard
   - Click **Create API Key**
   - Give it a name (e.g., "Quantum Leap Newsletter")
   - Copy the API key (starts with `re_`)
3. **Set sender email**:
   - For testing: Use `onboarding@resend.dev` (works immediately)
   - For production: Verify your domain in Resend dashboard for better deliverability
4. **Add to environment variables**:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   SENDER_EMAIL=onboarding@resend.dev  # or your verified domain email
   ```

### Deployment

- Any Node-compatible hosting works (Vercel recommended for Next.js).
- Ensure `.env` variables are configured in your hosting provider.

### License

Proprietary — All rights reserved. Contact Quantum Leap Digital for usage inquiries.
