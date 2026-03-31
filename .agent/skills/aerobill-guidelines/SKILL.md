---
name: Aerobill Development, Optimization, and Monitoring
description: Comprehensive guidelines and required skills for developing, optimizing, and monitoring the Aerobill Next.js application.
---

# Aerobill Development Guidelines

This skill provides the comprehensive best practices, technical guidelines, and commands required to build, optimize, and monitor the Aerobill Restaurant Management System.

## 1. Development Standards

### 1.1 Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Database:** PostgreSQL (hosted on Neon)
- **ORM:** Prisma 6.x
- **Authentication:** NextAuth.js (v4)
- **Styling:** Tailwind CSS & Shadcn UI (if applicable)
- **Language:** TypeScript (Strict mode)

### 1.2 Next.js App Router Best Practices
- **Server Components (RSC) by Default:** Keep components as Server Components unless they need state (`useState`), lifecycle effects (`useEffect`), or browser-only APIs.
- **Client Components:** Use the `"use client"` directive strictly at the top of the file for interactivity. Push `"use client"` down the component tree as far as possible to maximize server rendering.
- **Server Actions:** Use Server Actions (in `app/actions/`) for data mutations instead of API routes where possible. Ensure proper validation and authorization checks inside each action.
```typescript
// Example Server Action
"use server"
import { getServerSession } from "next-auth"

export async function createOrder(data: OrderData) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")
  // Prisma logic...
}
```

### 1.3 Prisma Database Guidelines
- **Schema Management:** All changes must be made in `prisma/schema.prisma`.
- **Database Migrations/Syncs:** Use `npm run db:push` for development syncing and prototyping instead of formal migrations, unless the project moves to a formal migration (`prisma migrate dev`) flow.
- **Connection Management:** Because we use serverless/edge environments (like Vercel), ensure Prisma client instance is cached in development to prevent exhausting database connections (using `globalThis.prisma`).

## 2. Optimization Methods

### 2.1 Caching & Revalidation
- **Data Caching:** Next.js aggressively caches fetch requests. Use `revalidatePath` or `revalidateTag` inside Server Actions after executing mutations (e.g., updating menu items or orders) to clear the cached views.
```typescript
import { revalidatePath } from 'next/cache';

export async function updateMenu() {
  // DB update
  revalidatePath('/admin/menu');
}
```

### 2.2 Performance Optimizations
- **Next/Image:** Use the `next/image` component for all images. Configure external domains in `next.config.mjs` (e.g., Cloudinary) if accepting external URLs.
- **Dynamic Imports:** Use `next/dynamic` for heavy client-side components that are not immediately visible (like modals or large charting libraries).
- **Prisma Queries:** Avoid `N+1` query problems. Use `include` selectively. Fetch only required fields using `select` when querying large tables.

## 3. Monitoring & Error Handling

### 3.1 Error Handling
- **Global Error Boundaries:** Use `app/error.tsx` to catch unexpected UI errors locally for client components.
- **Action Error Handling:** Always wrap Server Actions in `try/catch` and return standardized `{ success: boolean, message: string, data?: any }` objects to properly display toast notifications to the admin/user.
- **Database Errors:** Use `PrismaClientKnownRequestError` to catch expected Prisma errors (like unique constraint violations) and present user-friendly error messages.

### 3.2 Security Monitoring
- **Authentication Verification:** Ensure every secured page layout or server action checks for `getServerSession()`.
- **Access Roles:** Explicitly check user roles (e.g., `role === 'ADMIN'`) to prevent privilege escalation.
- **Environment Auditing:** Ensure `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` are consistently monitored and verified.

### 3.3 Logs and Analytics
- **Vercel Analytics:** If deployed on Vercel, the application benefits from built-in Web Vitals tracking. Ensure `@vercel/analytics` and `@vercel/speed-insights` are installed and added to the root layout if tracking is requested.
- **Console Tracking:** Avoid excessive `console.log()` in production components. Focus on logging actionable server errors in `try/catch` blocks.
