import Link from "next/link";
import AdminJobsTable from "@/components/modules/admin/AdminJobsTable";
import AdminDashboardStats from "@/components/modules/admin/AdminDashboardStats";
import { getApiUrl } from "@/lib/api";
import { cookies } from "next/headers";

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
}

interface Application {
  _id: string;
  name: string;
  email: string;
  job: string;
  createdAt: string;
}

async function fetchRecentJobs(): Promise<{ jobs: Job[], meta: Meta }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("qh_token")?.value;
  try {
    const res = await fetch(`${getApiUrl()}/jobs?limit=5&sort=-createdAt`, { 
      cache: "no-store",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    return {
      jobs: data.success ? data.data : [],
      meta: data.meta || { total: 0, page: 1, limit: 5, totalPage: 1 }
    };
  } catch {
    return { jobs: [], meta: { total: 0, page: 1, limit: 5, totalPage: 1 } };
  }
}

async function fetchApplications(): Promise<{ applications: Application[], meta: Meta }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("qh_token")?.value;
  try {
    const res = await fetch(`${getApiUrl()}/applications?limit=10&sort=-createdAt`, { 
      cache: "no-store",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    return {
      applications: data.success ? data.data : [],
      meta: data.meta || { total: 0, page: 1, limit: 10, totalPage: 1 }
    };
  } catch {
    return { applications: [], meta: { total: 0, page: 1, limit: 10, totalPage: 1 } };
  }
}

export const metadata = {
  title: "Admin Dashboard | QuickHire",
};

export default async function AdminDashboard() {
  const [jobsData, appsData] = await Promise.all([
    fetchRecentJobs(), 
    fetchApplications()
  ]);

  const { jobs, meta: jobMeta } = jobsData;
  const { applications, meta: appMeta } = appsData;

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <AdminDashboardStats jobCount={jobMeta.total} applicationCount={appMeta.total} />

      {/* Jobs table */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text-dark">Recent Job Listings</h2>
          <Link
            href="/dashboard/admin/jobs"
            className="text-primary font-semibold hover:underline flex items-center gap-1 text-sm"
          >
            View All Jobs →
          </Link>
        </div>
        <AdminJobsTable initialJobs={jobs} />
      </div>

      {/* Recent applications */}
      <div>
        <h2 className="text-xl font-bold text-text-dark mb-4">
          Recent Applications
          <span className="ml-2 text-sm font-normal text-text-body">
            ({appMeta.total} total)
          </span>
        </h2>
        {applications.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-text-body">
            No applications yet.
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bg-light border-b border-gray-100 text-sm text-text-body">
                  <th className="py-3 px-5 font-semibold">Applicant</th>
                  <th className="py-3 px-5 font-semibold">Email</th>
                  <th className="py-3 px-5 font-semibold hidden md:table-cell">Applied</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 10).map((app) => (
                  <tr key={app._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {app.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <span className="font-medium text-text-dark text-sm">{app.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-text-body text-sm">{app.email}</td>
                    <td className="py-3 px-5 text-text-body text-sm hidden md:table-cell">
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
