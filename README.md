# Aerobill - Restaurant Management System

A comprehensive restaurant management system built with Next.js 14+, Prisma ORM, and PostgreSQL.

## Features

- 🍽️ **Customer Interface** - QR code-based table ordering
- 🍳 **Kitchen Display** - Real-time order management with auto-refresh
- 📊 **Admin Dashboard** - Stats, menu CRUD, inventory, tables, billing
- 🧾 **Thermal Receipt Printing** - 80mm format for billing

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma 6.x
- **Auth:** NextAuth.js
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (we recommend [Neon](https://neon.tech))

### Installation

```bash
# Clone the repository
git clone https://github.com/Pritam-Pattanaik/aerobill.git
cd aerobill

# Install dependencies
npm install

# Set up environment variables
cp lib/env-template.ts .env
# Edit .env with your values

# Push database schema
npm run db:push

# Seed sample data
npm run db:seed

# Start development server
npm run dev
```

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
NEXTAUTH_SECRET=your-secret-key-at-least-32-characters
NEXTAUTH_URL=http://localhost:3000
```

## Vercel Deployment

### Step 1: Import Repository
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository

### Step 2: Set Environment Variables (REQUIRED!)
In Vercel project settings, add these environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Neon PostgreSQL connection string |
| `NEXTAUTH_SECRET` | A random 32+ character string |
| `NEXTAUTH_URL` | Your Vercel domain (e.g., `https://aerobill.in`) |

> ⚠️ **Important:** Without these environment variables, the app will show "Server error"!

### Step 3: Deploy
Click "Deploy" and wait for the build to complete.

### Step 4: Seed Database
After deployment, run the seed script locally to populate data:
```bash
npm run db:seed
```

## Login Credentials (After Seeding)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@aerobill.com | admin123 |
| Kitchen | kitchen@aerobill.com | kitchen123 |

## Project Structure

```
aerobill/
├── app/
│   ├── admin/          # Admin panel pages
│   ├── kitchen/        # Kitchen display
│   ├── login/          # Staff login
│   ├── table/[tableId] # Customer menu
│   ├── actions/        # Server actions
│   └── api/auth/       # NextAuth API
├── lib/                # Utilities
├── prisma/             # Database schema & seed
└── types/              # TypeScript types
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed sample data |
| `npm run db:studio` | Open Prisma Studio |

## License

MIT
