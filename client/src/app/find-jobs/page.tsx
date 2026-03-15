import { Suspense } from "react";
import Container from "@/components/shared/Container";
import JobSearchBar from "@/components/modules/find-jobs/FindJobsClient";
import CategoryFilter from "@/components/modules/find-jobs/CategoryFilter";
import JobList from "@/components/modules/find-jobs/JobList";
import { getApiUrl } from "@/lib/api";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
}

interface PageProps {
  searchParams: Promise<{
    searchTerm?: string;
    category?: string;
    location?: string;
  }>;
}

async function fetchJobs(params: {
  searchTerm?: string;
  category?: string;
  location?: string;
}): Promise<Job[]> {
  const query = new URLSearchParams();
  if (params.searchTerm) query.set("searchTerm", params.searchTerm);
  if (params.category) query.set("category", params.category);
  if (params.location) query.set("location", params.location);

  try {
    const res = await fetch(`${getApiUrl()}/jobs?${query.toString()}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Find Jobs | QuickHire",
  description: "Browse and search thousands of job listings.",
};

export default async function FindJobsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const jobs = await fetchJobs(params);

  return (
    <div className="min-h-screen bg-bg-light">
      {/* ── Hero header (server rendered) ── */}
      <div className="bg-bg-light py-12 border-b border-gray-100">
        <Container>
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark">
              Find your <span className="text-blue-light">dream job</span>
            </h1>
            <p className="text-text-body text-lg max-w-2xl">
              Find your next career at companies like HubSpot, Nike, and Dropbox
            </p>
            <Suspense
              fallback={
                <div className="h-14 w-full max-w-4xl bg-white rounded-lg shadow-sm animate-pulse" />
              }
            >
              <JobSearchBar />
            </Suspense>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <Suspense fallback={null}>
              <CategoryFilter />
            </Suspense>
          </aside>

          <main className="w-full md:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-text-dark text-3xl font-bold">All Jobs</h2>
              <p className="text-text-body">
                Showing {jobs.length} result{jobs.length !== 1 ? "s" : ""}
              </p>
            </div>
            <JobList jobs={jobs} />
          </main>
        </div>
      </Container>
    </div>
  );
}
