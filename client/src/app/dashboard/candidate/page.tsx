import Link from "next/link";
import CandidateDashboardStats from "@/components/modules/candidate/CandidateDashboardStats";

export const metadata = { title: "Candidate Dashboard | QuickHire" };

export default function CandidateDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Dashboard</h1>
        <p className="text-text-body text-sm mt-1">Overview of your job search progress.</p>
      </div>

      <CandidateDashboardStats />

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
        <h2 className="text-lg font-bold text-text-dark mb-2">Ready for your next opportunity?</h2>
        <p className="text-text-body text-sm mb-4">Explore our latest job postings and find your dream role today.</p>
        <Link href="/find-jobs" className="inline-block bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-hover transition-colors">
          Browse All Jobs
        </Link>
      </div>
    </div>
  );
}
