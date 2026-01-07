/**
 * Environment Variables Template
 * Copy this content to a new .env file and replace the placeholder values
 * 
 * DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
 * NEXTAUTH_SECRET="your-secret-key-generate-with-openssl-rand-base64-32"
 * NEXTAUTH_URL="http://localhost:3000"
 */

export const ENV_TEMPLATE = {
  DATABASE_URL: "postgresql://user:password@host/database?sslmode=require",
  NEXTAUTH_SECRET: "Generate with: openssl rand -base64 32",
  NEXTAUTH_URL: "http://localhost:3000"
};
