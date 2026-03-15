import { cookies } from "next/headers";
import { getApiUrl } from "@/lib/api";
import AdminJobsTable from "@/components/modules/admin/AdminJobsTable";
import AdminJobsManagementClient from "@/components/modules/admin/AdminJobsManagementClient";
import Pagination from "@/components/shared/Pagination";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
}

interface PageProps {
  searchParams: Promise<{
    searchTerm?: string;
    category?: string;
    location?: string;
    page?: string;
    limit?: string;
  }>;
}

interface FetchJobsResponse {
  jobs: Job[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

async function fetchJobs(params: Record<string, string | undefined>): Promise<FetchJobsResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("qh_token")?.value;
  
  const query = new URLSearchParams();
  if (params.searchTerm) query.set("searchTerm", params.searchTerm);
  if (params.category) query.set("category", params.category);
  if (params.location) query.set("location", params.location);
  if (params.page) query.set("page", params.page);
  if (params.limit) query.set("limit", params.limit);

  try {
    const res = await fetch(`${getApiUrl()}/jobs?${query.toString()}`, { 
      cache: "no-store",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    return {
      jobs: data.success ? data.data : [],
      meta: data.meta || { page: 1, limit: 10, total: 0, totalPage: 1 },
    };
  } catch {
    return {
      jobs: [],
      meta: { page: 1, limit: 10, total: 0, totalPage: 1 },
    };
  }
}

export const metadata = {
  title: "Job Management | QuickHire Admin",
};

export default async function AdminJobsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { jobs, meta } = await fetchJobs(params);

  return (
    <div className="space-y-6">

      <AdminJobsManagementClient meta={meta} />

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <AdminJobsTable initialJobs={jobs} />
      </div>

      <div className="flex justify-center mt-2">
        <Pagination page={meta.page} totalPages={meta.totalPage} />
      </div>
    </div>
  );
}
