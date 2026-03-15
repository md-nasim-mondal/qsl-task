import Link from "next/link";

export const metadata = { title: "Candidate Dashboard | QuickHire" };

export default function CandidateDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Dashboard</h1>
        <p className="text-text-body text-sm mt-1">Overview of your job search progress.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-bold text-text-dark">3</p>
            <p className="text-sm font-medium text-text-body mt-0.5">Jobs Applied</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-orange-100 text-orange-600">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-bold text-text-dark">1</p>
            <p className="text-sm font-medium text-text-body mt-0.5">Interviews Scheduled</p>
          </div>
        </div>
      </div>

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
