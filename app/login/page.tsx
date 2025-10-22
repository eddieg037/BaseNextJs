"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  MOCK_ADMIN_CREDENTIALS,
  mockLogin,
} from "@/helpers/auth/mockAuthService";

type LoginStatus = "idle" | "loading" | "success" | "error";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<LoginStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLoading = status === "loading";
  const isSuccessful = status === "success";
  const shouldDisableSubmit = isLoading || isSuccessful;

  useEffect(() => {
    if (!isSuccessful) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      router.push("/dashboard");
    }, 800);

    return () => window.clearTimeout(timeoutId);
  }, [isSuccessful, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setErrorMessage(null);

    try {
      await mockLogin({ username, password });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Unable to sign in right now. Please try again.");
      }
    }
  }

  function resetStatusFeedback() {
    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage(null);
    }
  }

  return (
    <section className="flex min-h-screen flex-1 items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-300">
            Sign in with the mock administrator credentials below.
          </p>
        </header>

        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-200"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                resetStatusFeedback();
              }}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={MOCK_ADMIN_CREDENTIALS.username}
              required
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                resetStatusFeedback();
              }}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={MOCK_ADMIN_CREDENTIALS.password}
              required
            />
          </div>

          <button
            type="submit"
            aria-busy={isLoading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={shouldDisableSubmit}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          Mock credentials: <span className="font-semibold">admin / admin</span>
        </p>

        <div aria-live="polite" className="mt-4 space-y-2" role="status">
          {isSuccessful ? (
            <p className="rounded-md border border-emerald-500 bg-emerald-900/50 p-3 text-sm text-emerald-200">
              Login successful! Redirecting to your dashboard...
            </p>
          ) : null}
          {errorMessage ? (
            <p className="rounded-md border border-red-500 bg-red-900/50 p-3 text-sm text-red-200">
              {errorMessage}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
