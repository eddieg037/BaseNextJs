"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { MockLoginSuccess } from "@/helpers/auth/mockAuthService";

type AuthContextValue = {
  session: MockLoginSuccess | null;
  isAuthenticated: boolean;
  login: (session: MockLoginSuccess) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<MockLoginSuccess | null>(null);

  const login = useCallback((nextSession: MockLoginSuccess) => {
    setSession(nextSession);
  }, []);

  const logout = useCallback(() => {
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      login,
      logout,
    }),
    [login, logout, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
