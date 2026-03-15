"use client";

import { useState } from "react";
import { getApiUrl } from "@/lib/api";

interface Job {
  _id: string;
  title: string;
}

interface Props {
  job: Job;
}

export default function ApplyModal({ job }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    setApplyStatus({ loading: true, success: false, error: "" });

    try {
      const res = await fetch(`${getApiUrl()}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job: job._id, ...formData }),
      });
      const data = await res.json();

      if (data.success) {
        setApplyStatus({ loading: false, success: true, error: "" });
        setFormData({ name: "", email: "", resume_link: "", cover_note: "" });
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
            ) : (
              <form onSubmit={handleApply} className="space-y-5">
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
