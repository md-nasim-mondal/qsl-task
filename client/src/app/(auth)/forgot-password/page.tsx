"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getApiUrl } from "@/lib/api";
import logo from "../../../../public/assets/logo/frame_3.png";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${getApiUrl()}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message ?? "Failed to send email");
      setStatus("success");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Image src={logo} alt="QuickHire" width={36} height={36} />
          <span className="text-2xl font-bold text-text-dark">QuickHire</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {status === "success" ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text-dark mb-2">Check your email</h2>
              <p className="text-text-body text-sm mb-6">
                We&apos;ve sent a password reset link to <strong>{email}</strong>. The link expires in 10 minutes.
              </p>
              <Link href="/login" className="text-primary font-semibold hover:underline text-sm">
                ← Back to login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-text-dark mb-1">Forgot Password?</h1>
              <p className="text-text-body text-sm mb-6">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-text-dark placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Sending…" : "Send Reset Link"}
                </button>
              </form>

              <p className="text-center text-sm text-text-body mt-6">
                Remembered?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
