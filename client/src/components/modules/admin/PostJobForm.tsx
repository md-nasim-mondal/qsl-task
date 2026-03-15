"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getApiUrl, authHeaders } from "@/lib/api";


const CATEGORIES = [
  "Design",
  "Sales",
  "Marketing",
  "Business",
  "Human Resource",
  "Finance",
  "Engineering",
  "Technology",
];

export default function PostJobForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    description: "",
  });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const res = await fetch(`${getApiUrl()}/jobs`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/dashboard/admin");
        router.refresh();
      } else {
        setStatus({
          loading: false,
          error: data.message ?? "Failed to post job.",
        });
      }
    } catch {
      setStatus({ loading: false, error: "Network error occurred." });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/admin"
          className="text-text-body hover:text-primary flex items-center gap-2 transition-colors font-medium w-fit"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-text-dark mb-6">
          Post a New Job
        </h2>

        {status.error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-200 text-sm">
            {status.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-text-dark mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Developer"
                className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-dark mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Acme Corp"
                className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-dark mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote, US"
                className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-dark mb-2">
                Category *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-dark mb-2">
              Job Description *
            </label>
            <textarea
              name="description"
              required
              rows={8}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, and requirements…"
              className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-50">
            <Link
              href="/dashboard/admin"
              className="px-6 py-3 font-medium text-text-body hover:text-text-dark transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={status.loading}
              className={`bg-primary text-white px-8 py-3 font-bold hover:bg-primary-hover transition-colors rounded-md ${
                status.loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {status.loading ? "Posting…" : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
