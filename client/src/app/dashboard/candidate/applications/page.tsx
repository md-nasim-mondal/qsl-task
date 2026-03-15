import { getApiUrl } from "@/lib/api";
import { cookies } from "next/headers";
import Link from "next/link";

interface Application {
  _id: string;
  createdAt: string;
  status?: string;
  job?: { _id: string; title: string; company: string; location: string };
}

async function fetchMyApplications(): Promise<Application[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || cookieStore.get("qh_token")?.value;
    const res = await fetch(`${getApiUrl()}/applications/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export const metadata = { title: "My Applications | QuickHire" };

export default async function CandidateApplicationsPage() {
  const applications = await fetchMyApplications();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">My Applications</h1>
        <p className="text-text-body text-sm mt-1">Track the status of your submitted job applications.</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-16 text-center">
          <p className="text-text-body">You haven&apos;t applied to any jobs yet.</p>
          <Link href="/find-jobs" className="inline-block text-primary font-semibold hover:underline mt-2">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg-light border-b border-gray-100 text-sm text-text-body">
                <th className="py-3 px-5 font-semibold">Job Title</th>
                <th className="py-3 px-5 font-semibold">Company</th>
                <th className="py-3 px-5 font-semibold hidden md:table-cell">Applied Date</th>
                <th className="py-3 px-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5">
                    <p className="font-semibold text-text-dark text-sm">
                      {typeof app.job === "object" ? app.job?.title : "—"}
                    </p>
                    <p className="text-xs text-text-body mt-0.5">
                      {typeof app.job === "object" ? app.job?.location : ""}
                    </p>
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-text-dark">
                    {typeof app.job === "object" ? app.job?.company : "—"}
                  </td>
                  <td className="py-4 px-5 text-text-body text-sm hidden md:table-cell">
                    {new Date(app.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-5">
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                      Under Review
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
