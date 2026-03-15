"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { getApiUrl } from "@/lib/api";
import Cookies from "js-cookie";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize synchronously so accessToken is never null after mount —
  // prevents "Bearer null" being sent before useEffect runs.
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = Cookies.get("qh_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    try {
      return Cookies.get("qh_token") || Cookies.get("accessToken") || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${getApiUrl()}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message ?? "Login failed");
    }
    const { user: u, accessToken: token } = data.data;
    setUser(u);
    setAccessToken(token);
    Cookies.set("qh_user", JSON.stringify(u), { expires: 7 });
    Cookies.set("qh_token", token, { expires: 7 });
    return u;
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(`${getApiUrl()}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      /* ignore network errors */
    } finally {
      setUser(null);
      setAccessToken(null);
      Cookies.remove("qh_user");
      Cookies.remove("qh_token");
      Cookies.remove("accessToken");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
