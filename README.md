## Quantum Leap Digital Website

A modern marketing website for Quantum Leap Digital built with Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion. The site showcases services, team, and contact workflows with performant, accessible UI components.

### Tech Stack

- Next.js 15 (App Router)
- React 19, TypeScript
- Tailwind CSS v4
- Framer Motion
- SendGrid (email)
- Supabase (newsletter subscribers)

### Prerequisites

- Node.js 18+ (recommended: LTS)
- npm (or yarn/pnpm/bun)

### Environment Variables

Create a `.env.local` at the project root:

```env
# Supabase (public keys for client usage)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# SendGrid (server)
SENDGRID_API_KEY=your-sendgrid-api-key
SENDER_EMAIL=no-reply@yourdomain.com
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
- Stores subscribers in Supabase table `subscribers` and sends a welcome email via SendGrid.

### Deployment

- Any Node-compatible hosting works (Vercel recommended for Next.js).
- Ensure `.env` variables are configured in your hosting provider.

### License

Proprietary — All rights reserved. Contact Quantum Leap Digital for usage inquiries.
