"use client";

import { useAuth } from "@/context/AuthContext";
import { getApiUrl, authHeaders } from "@/lib/api";
import { useState } from "react";

export default function CompanyProfilePage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    company: "",
    location: "",
    website: "",
    about: "",
  });
  const [status, setStatus] = useState({ saving: false, saved: false, error: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ saving: true, saved: false, error: "" });
    try {
      const res = await fetch(`${getApiUrl()}/user/${user?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ name: formData.name }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus({ saving: false, saved: true, error: "" });
      setTimeout(() => setStatus((s) => ({ ...s, saved: false })), 3000);
    } catch (err: unknown) {
      setStatus({ saving: false, saved: false, error: err instanceof Error ? err.message : "Save failed" });
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Company Profile</h1>
        <p className="text-text-body text-sm mt-1">Manage your company information and presence.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-text-dark">{user?.name}</p>
            <p className="text-sm text-text-body">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-1.5">Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-text-dark" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-1.5">Email</label>
            <input name="email" value={formData.email} disabled
              className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-gray-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-1.5">Company Name</label>
            <input name="company" value={formData.company} onChange={handleChange} placeholder="Acme Corp"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-text-dark" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-1.5">Location</label>
            <input name="location" value={formData.location} onChange={handleChange} placeholder="New York, USA"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-text-dark" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-dark mb-1.5">Website</label>
            <input name="website" value={formData.website} onChange={handleChange} placeholder="https://acmecorp.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-text-dark" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-dark mb-1.5">About</label>
            <textarea name="about" value={formData.about} onChange={handleChange} rows={4} placeholder="Tell candidates about your company…"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-text-dark resize-none" />
          </div>
        </div>

        {status.error && (
          <p className="text-red-500 text-sm">{status.error}</p>
        )}
        {status.saved && (
          <p className="text-green-600 text-sm font-medium">✓ Changes saved</p>
        )}

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={status.saving}
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:opacity-70">
            {status.saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
