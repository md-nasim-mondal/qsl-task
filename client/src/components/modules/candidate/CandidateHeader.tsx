"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function CandidateHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-text-body">Good morning, {user?.name || "Candidate"}! 👋</p>
        <p className="text-xs text-gray-400">Keep up the great work on your job search.</p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/find-jobs"
          className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
        >
          Browse Jobs
        </Link>
      </div>
    </header>
  );
}
