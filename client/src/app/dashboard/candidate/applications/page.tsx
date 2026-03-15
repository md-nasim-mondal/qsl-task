import { getApiUrl } from "@/lib/api";
import { cookies } from "next/headers";
import Link from "next/link";
import Pagination from "@/components/shared/Pagination";
import MyApplicationsFilter from "@/components/modules/candidate/MyApplicationsFilter";

interface Application {
  _id: string;
  createdAt: string;
  status?: string;
  job?: { _id: string; title: string; company: string; location: string } | string;
}

interface PageProps {
  searchParams: Promise<{
    searchTerm?: string;
    page?: string;
    limit?: string;
  }>;
}

interface FetchResponse {
  applications: Application[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

async function fetchMyApplications(params: Record<string, string | undefined>): Promise<FetchResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qh_token")?.value || cookieStore.get("accessToken")?.value;
    
    if (!token) {
        return {
            applications: [],
            meta: { page: 1, limit: 10, total: 0, totalPage: 1 }
        };
    }
    const query = new URLSearchParams();
    if (params.searchTerm) query.set("searchTerm", params.searchTerm);
    if (params.page) query.set("page", params.page);
    if (params.limit) query.set("limit", params.limit);

    const res = await fetch(`${getApiUrl()}/applications/me?${query.toString()}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    });
    const data = await res.json();
    return {
        applications: data.success ? data.data : [],
        meta: data.meta || { page: 1, limit: 10, total: 0, totalPage: 1 }
    };
  } catch {
    return {
        applications: [],
        meta: { page: 1, limit: 10, total: 0, totalPage: 1 }
    };
  }
}

export const metadata = { title: "My Applications | QuickHire" };

export default async function CandidateApplicationsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { applications, meta } = await fetchMyApplications(params);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">My Applications</h1>
        <p className="text-text-body text-sm mt-1">Track the status of your submitted job applications.</p>
      </div>

      <MyApplicationsFilter total={meta.total} page={meta.page} limit={meta.limit} />

      {applications.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-16 text-center">
          <p className="text-text-body">No applications found matching your search.</p>
          <Link href="/find-jobs" className="inline-block text-primary font-semibold hover:underline mt-2">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-125 md:min-w-0">
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
        </div>
          
          <div className="flex justify-center mt-4">
            <Pagination page={meta.page} totalPages={meta.totalPage} />
          </div>
        </>
      )}
    </div>
  );
}
