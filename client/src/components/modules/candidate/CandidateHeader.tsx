"use client";

import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import Link from "next/link";

export default function CandidateHeader() {
  const { user } = useAuth();
  const { toggleSidebar } = useDashboard();

  return (
    <header className="bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Menu Toggle */}
        <button
          onClick={toggleSidebar}
          className="p-2 md:hidden text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="hidden sm:block">
          <p className="text-xs text-text-body">Good morning, {user?.name || "Candidate"}! 👋</p>
          <p className="text-xs text-gray-400">Keep up the great work on your job search.</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/find-jobs"
          className="bg-primary text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors whitespace-nowrap"
        >
          Browse Jobs
        </Link>
      </div>
    </header>
  );
}
