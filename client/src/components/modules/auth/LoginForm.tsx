"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDemoClick = (email: string) => {
    setFormData({ email, password: "password123" });
    setShowDemo(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const u = await login(formData.email, formData.password);
      const redirectUrl =
        u.role === "admin" || u.role === "super_admin"
          ? "/dashboard/admin"
          : "/dashboard/candidate";
      
      router.push(redirectUrl);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-text-dark placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-semibold text-text-dark">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-text-dark placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setShowDemo(true)}
          className="text-sm border border-primary text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
        >
          View Demo Credentials
        </button>
      </div>

      <p className="text-center text-sm text-text-body mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary font-semibold hover:underline">
          Create one
        </Link>
      </p>

      {/* Demo Credentials Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 relative">
            <h3 className="text-lg font-bold text-text-dark mb-4">Demo Credentials</h3>
            <button 
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>
            
            <div className="space-y-4">
              <div 
                className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors bg-gray-50"
                onClick={() => handleDemoClick("admin@demo.com")}
              >
                <div className="font-semibold text-primary mb-1">Admin Account</div>
                <div className="text-sm text-text-dark font-medium">Email: <span className="font-normal text-text-body select-all">admin@demo.com</span></div>
                <div className="text-sm text-text-dark font-medium">Password: <span className="font-normal text-text-body select-all">password123</span></div>
                <div className="text-xs text-text-body mt-2 font-medium">Click to use →</div>
              </div>

              <div 
                className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors bg-gray-50"
                onClick={() => handleDemoClick("user@demo.com")}
              >
                <div className="font-semibold text-green-600 mb-1">Candidate Account</div>
                <div className="text-sm text-text-dark font-medium">Email: <span className="font-normal text-text-body select-all">user@demo.com</span></div>
                <div className="text-sm text-text-dark font-medium">Password: <span className="font-normal text-text-body select-all">password123</span></div>
                <div className="text-xs text-text-body mt-2 font-medium">Click to use →</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
