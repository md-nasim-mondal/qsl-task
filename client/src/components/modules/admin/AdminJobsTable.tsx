"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { getApiUrl, authHeaders } from "@/lib/api";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
}

interface Props {
  initialJobs: Job[];
}

export default function AdminJobsTable({ initialJobs }: Props) {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    setDeletingId(id);

    try {
      const res = await fetch(`${getApiUrl()}/jobs/${id}`, {
        method: "DELETE",
        headers: {
          ...authHeaders(),
        },
      });
      const data = await res.json();

      if (data.success) {
        setJobs((prev) => prev.filter((j) => j._id !== id));
        // Revalidate so a hard refresh also shows the updated list
        router.refresh();
      } else {
        alert(data.message ?? "Failed to delete job.");
      }
    } catch {
      alert("Network error occurred.");
    } finally {
      setDeletingId(null);
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="bg-white p-10 text-center border border-gray-100 rounded-lg shadow-sm">
        <p className="text-text-body mb-4">No jobs posted yet.</p>
        <Link
          href="/dashboard/admin/jobs/new"
          className="text-primary font-medium hover:underline"
        >
          Post your first job →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-bg-light border-b border-gray-200 text-sm text-text-body">
            <th className="py-3 px-6 font-semibold">Job Title</th>
            <th className="py-3 px-6 font-semibold">Company</th>
            <th className="py-3 px-6 font-semibold hidden md:table-cell">Location</th>
            <th className="py-3 px-6 font-semibold hidden lg:table-cell">Category</th>
            <th className="py-3 px-6 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job._id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 px-6">
                <div className="font-medium text-text-dark">{job.title}</div>
                <div className="text-xs text-text-body md:hidden">
                  {job.location}
                </div>
              </td>
              <td className="py-4 px-6 text-text-dark">{job.company}</td>
              <td className="py-4 px-6 text-text-body hidden md:table-cell">
                {job.location}
              </td>
              <td className="py-4 px-6 text-text-body hidden lg:table-cell">
                {job.category}
              </td>
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => handleDelete(job._id)}
                  disabled={deletingId === job._id}
                  className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors text-sm font-medium disabled:opacity-50"
                  title="Delete Job"
                >
                  {deletingId === job._id ? "Deleting…" : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
