import Container from "@/components/shared/Container";
import Link from "next/link";
import ApplyModal from "@/components/modules/find-jobs/ApplyModal";
import { notFound } from "next/navigation";
import { getApiUrl } from "@/lib/api";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
}

async function fetchJob(id: string): Promise<Job | null> {
  try {
    const res = await fetch(`${getApiUrl()}/jobs/${id}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await fetchJob(id);
  return {
    title: job ? `${job.title} at ${job.company} | QuickHire` : "Job Not Found | QuickHire",
    description: job ? job.description.slice(0, 160) : "",
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await fetchJob(id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Job header ── */}
      <div className="bg-bg-light py-12 border-b border-gray-100">
        <Container>
          {/* Breadcrumb */}
          <nav className="text-sm text-text-body mb-6">
            <Link
              href="/find-jobs"
              className="hover:text-primary transition-colors"
            >
              Find Jobs
            </Link>
            {" / "}
            <span className="text-text-dark font-medium">{job.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              {/* Company logo placeholder */}
              <div className="w-20 h-20 bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100 rounded-lg">
                <span className="text-3xl font-bold text-gray-300">
                  {job.company?.charAt(0)?.toUpperCase() ?? "C"}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-dark mb-2">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-text-body text-base">
                  <span className="font-medium">{job.company}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  <span>{job.location}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  <span className="px-2 py-0.5 bg-success/10 text-success text-sm rounded-full border border-success">
                    {job.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Apply button + modal — client interactive */}
            <ApplyModal job={{ _id: job._id, title: job.title }} />
          </div>
        </Container>
      </div>

      {/* ── Job description ── */}
      <Container className="py-16">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-text-dark mb-6">
            Job Description
          </h2>
          <div className="prose max-w-none text-text-body leading-relaxed mb-10 whitespace-pre-wrap text-base">
            {job.description}
          </div>

          <div className="border-t border-gray-100 pt-8">
            <Link
              href="/find-jobs"
              className="text-primary hover:underline font-medium"
            >
              ← Back to all jobs
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
