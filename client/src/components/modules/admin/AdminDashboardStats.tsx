"use client";

interface Props {
  jobCount: number;
  applicationCount: number;
}

const StatCard = ({
  label,
  value,
  sub,
  icon,
  accent,
}: {
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ReactNode;
  accent: string;
}) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-5">
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${accent}`}>
      {icon}
    </div>
    <div>
      <p className="text-3xl font-bold text-text-dark">{value}</p>
      <p className="text-sm font-medium text-text-body mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

export default function AdminDashboardStats({ jobCount, applicationCount }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <StatCard
        label="Jobs Open"
        value={jobCount}
        sub="Active listings"
        accent="bg-primary/10 text-primary"
        icon={
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
      />
      <StatCard
        label="Total Applications"
        value={applicationCount}
        sub="Candidates to review"
        accent="bg-orange-100 text-orange-600"
        icon={
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
      />
      <StatCard
        label="Schedule for Today"
        value={3}
        sub="Interviews lined up"
        accent="bg-green-100 text-green-600"
        icon={
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
      />
    </div>
  );
}
