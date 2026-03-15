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

/**
 * Reads the auth token directly from cookies.
 * Use this in fetch calls instead of relying on React state (`accessToken` from useAuth),
 * which may be null on the first render before the useEffect has run.
 */
export function getAuthToken(): string | null {
  if (typeof document === "undefined") return null; // SSR guard
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("qh_token=") || row.startsWith("accessToken="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

/**
 * Returns an Authorization header object if a token exists, empty object otherwise.
 */
export function authHeaders(): Record<string, string> {
  const token = getAuthToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}
