"use client";

import { useState } from "react";
import { getApiUrl, authHeaders } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface Job {
  _id: string;
  title: string;
}

interface Props {
  job: Job;
}

export default function ApplyModal({ job }: Props) {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    resume_link: "",
    cover_note: "",
  });

  const [applyStatus, setApplyStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setApplyStatus({ loading: false, success: false, error: "Please login to apply." });
      return;
    }
    setApplyStatus({ loading: true, success: false, error: "" });

    try {
      const res = await fetch(`${getApiUrl()}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ job: job._id, ...formData }),
      });
      const data = await res.json();

      if (data.success) {
        setApplyStatus({ loading: false, success: true, error: "" });
        setFormData({ name: user.name, email: user.email, resume_link: "", cover_note: "" });
        setTimeout(() => setShowModal(false), 2200);
      } else {
        setApplyStatus({
          loading: false,
          success: false,
          error: data.message ?? "Failed to submit application.",
        });
      }
    } catch {
      setApplyStatus({
        loading: false,
        success: false,
        error: "Network error occurred.",
      });
    }
  };

  return (
    <>
      {/* ── CTA Button ── */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-primary text-white px-10 py-4 font-bold hover:bg-primary-hover transition-colors w-full md:w-auto text-lg"
      >
        Apply Now
      </button>

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-text-dark">
                Apply for {job.title}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Success state */}
            {applyStatus.success ? (
              <div className="bg-green-50 text-green-700 p-6 rounded-lg text-center border border-green-200">
                <h3 className="text-xl font-bold mb-2">
                  Application Submitted! 🎉
                </h3>
                <p>
                  Thank you for applying. We&apos;ll review your application
                  soon.
                </p>
              </div>
            ) : !user ? (
              <div className="bg-primary/5 border border-primary/10 p-8 rounded-xl text-center">
                <svg
                  className="w-16 h-16 text-primary/40 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-text-dark mb-2">
                  Login Required
                </h3>
                <p className="text-text-body mb-6 max-w-sm mx-auto">
                  Please login as a candidate to apply for this position and track
                  your application status.
                </p>
                <button
                  onClick={() => {
                    setShowModal(false);
                    window.location.href = "/login";
                  }}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors inline-block"
                >
                  Login to Apply
                </button>
              </div>
            ) : user.role !== "candidate" ? (
              <div className="bg-orange-50 border border-orange-100 p-8 rounded-xl text-center">
                <svg
                  className="w-16 h-16 text-orange-400 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-text-dark mb-2">
                  Candidates Only
                </h3>
                <p className="text-text-body mb-2 max-w-sm mx-auto">
                  Only candidate accounts can apply for job positions.
                </p>
                <p className="text-sm text-text-body/70">
                  Your current role is: <span className="font-bold capitalize">{user.role}</span>
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-6 text-primary font-semibold hover:underline"
                >
                  Close
                </button>
              </div>
            ) : (
              <form key={user?._id || "guest"} onSubmit={handleApply} className="space-y-5">
                {applyStatus.error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                    {applyStatus.error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    readOnly
                    placeholder="John Doe"
                    className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    readOnly
                    placeholder="john@example.com"
                    className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-1">
                    Resume / Portfolio Link *
                  </label>
                  <input
                    type="url"
                    name="resume_link"
                    required
                    value={formData.resume_link}
                    onChange={handleChange}
                    placeholder="https://your-portfolio.com"
                    className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-1">
                    Cover Note *
                  </label>
                  <textarea
                    name="cover_note"
                    required
                    rows={5}
                    value={formData.cover_note}
                    onChange={handleChange}
                    placeholder="Tell us why you're a great fit for this role..."
                    className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-y"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-gray-50">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 font-medium text-text-body hover:text-text-dark transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={applyStatus.loading}
                    className={`bg-primary text-white px-8 py-3 font-bold hover:bg-primary-hover transition-colors rounded-md ${
                      applyStatus.loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {applyStatus.loading ? "Submitting…" : "Submit Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
