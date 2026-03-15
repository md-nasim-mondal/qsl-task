import Link from "next/link";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
}

interface Props {
  jobs: Job[];
}

export default function JobList({ jobs }: Props) {
  if (jobs.length === 0) {
    return (
      <div className="bg-white p-12 text-center border border-gray-100 rounded-lg">
        <h3 className="text-text-dark text-xl font-bold mb-2">No jobs found</h3>
        <p className="text-text-body">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {jobs.map((job) => (
        <Link href={`/find-jobs/${job._id}`} key={job._id}>
          <div className="bg-white p-6 border border-gray-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start gap-4 group">
            {/* Company logo placeholder */}
            <div className="w-16 h-16 bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
              <span className="text-2xl font-bold text-gray-300">
                {job.company?.charAt(0)?.toUpperCase() ?? "C"}
              </span>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-dark mb-1 group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-text-body text-base mb-4">
                <span>{job.company}</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full" />
                <span>{job.location}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-sm font-semibold">
                <span className="px-3 py-1 bg-success/10 text-success rounded-full border border-success">
                  {job.category}
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              View details →
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
