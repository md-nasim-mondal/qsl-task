"use client";

import { useAuth } from "@/context/AuthContext";
import { getApiUrl, authHeaders } from "@/lib/api";
import { useState } from "react";

export default function CandidateProfilePage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    address: "",
  });
  const [status, setStatus] = useState({ saving: false, saved: false, error: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        body: JSON.stringify({ name: formData.name, phone: formData.phone, address: formData.address }),
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
        <h1 className="text-2xl font-bold text-text-dark">My Profile</h1>
        <p className="text-text-body text-sm mt-1">Manage your personal information.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-5">
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
            <label className="block text-sm font-semibold text-text-dark mb-1.5">Email (Read Only)</label>
            <input name="email" value={formData.email} disabled
              className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-gray-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-1.5">Phone Number</label>
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-text-dark" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-1.5">Address / Location</label>
            <input name="address" value={formData.address} onChange={handleChange} placeholder="New York, USA"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-text-dark" />
          </div>
        </div>

        {status.error && <p className="text-red-500 text-sm">{status.error}</p>}
        {status.saved && <p className="text-green-600 text-sm font-medium">✓ Profile updated</p>}

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={status.saving}
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:opacity-70">
            {status.saving ? "Saving…" : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
