import Link from "next/link";
import AdminJobsTable from "@/components/modules/admin/AdminJobsTable";
import AdminDashboardStats from "@/components/modules/admin/AdminDashboardStats";
import { getApiUrl } from "@/lib/api";
import { cookies } from "next/headers";

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

async function fetchJobs(): Promise<Job[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("qh_token")?.value;
  try {
    const res = await fetch(`${getApiUrl()}/jobs`, { 
      cache: "no-store",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

async function fetchApplications(): Promise<Application[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("qh_token")?.value;
  try {
    const res = await fetch(`${getApiUrl()}/applications`, { 
      cache: "no-store",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Admin Dashboard | QuickHire",
};

export default async function AdminDashboard() {
  const [jobs, applications] = await Promise.all([fetchJobs(), fetchApplications()]);

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <AdminDashboardStats jobCount={jobs.length} applicationCount={applications.length} />

      {/* Jobs table */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Link href="/dashboard/admin/jobs/new" className="text-xl font-bold text-text-dark hover:underline">Job Listings</Link>
          <Link
            href="/dashboard/admin/jobs/new"
            className="bg-primary text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors"
          >
            + Post New Job
          </Link>
        </div>
        <AdminJobsTable initialJobs={jobs} />
      </div>

      {/* Recent applications */}
      <div>
        <h2 className="text-xl font-bold text-text-dark mb-4">
          Recent Applications
          <span className="ml-2 text-sm font-normal text-text-body">
            ({applications.length} total)
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
