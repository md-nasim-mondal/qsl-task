"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { getApiUrl } from "@/lib/api";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token") ?? "";
  const id = searchParams?.get("id") ?? "";

  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${getApiUrl()}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, newPassword: formData.newPassword }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message ?? "Reset failed");
      setStatus("success");
      setTimeout(() => router.push("/login"), 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Reset failed");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (!token || !id) {
    return (
      <div className="text-center">
        <p className="text-red-600 font-medium mb-4">Invalid or expired reset link.</p>
        <Link href="/forgot-password" className="text-primary hover:underline text-sm">
          Request a new link
        </Link>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-text-dark mb-2">Password Reset!</h2>
        <p className="text-text-body text-sm">Redirecting you to login…</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-text-dark mb-1">Reset Password</h1>
      <p className="text-text-body text-sm mb-6">Enter your new password below.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-text-dark mb-1.5">New Password</label>
          <input
            type="password"
            required
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            placeholder="Min 6 characters"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-dark mb-1.5">Confirm Password</label>
          <input
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Re-enter password"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? "Resetting…" : "Reset Password"}
        </button>
      </form>
    </>
  );
}
