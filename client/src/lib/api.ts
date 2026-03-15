/**
 * Centralised API base URL utility.
 * All fetch calls in the app should import getApiUrl() instead of
 * hardcoding "http://localhost:5000/api/v1".
 *
 * Set NEXT_PUBLIC_API_URL in .env.local for local development.
 * Set it in your hosting provider's env vars for production.
 */
export const getApiUrl = (): string =>
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";
