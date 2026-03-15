import Container from "@/components/shared/Container";
import Link from "next/link";

type Job = {
  id: number;
  company: string;
  companyColor: string;
  companyInitial: string;
  title: string;
  location: string;
  salary: string;
  type: "Full Time" | "Part Time" | "Remote";
  tags: string[];
  description: string;
};

const featuredJobs: Job[] = [
  {
    id: 1,
    company: "Revolut",
    companyColor: "#191C1F",
    companyInitial: "R",
    title: "Email Marketing",
    location: "Madrid, Spain",
    salary: "$180k–$220k",
    type: "Full Time",
    tags: ["Marketing", "Design"],
    description: "Revolut is looking for Email Marketing to help team me...",
  },
  {
    id: 2,
    company: "Dropbox",
    companyColor: "#0061FF",
    companyInitial: "D",
    title: "Brand Designer",
    location: "San Francisco, US",
    salary: "$120k–$150k",
    type: "Full Time",
    tags: ["Design", "Business"],
    description: "Dropbox is looking for Brand Designer to help the team t...",
  },
  {
    id: 3,
    company: "Pitch",
    companyColor: "#FF5C35",
    companyInitial: "P",
    title: "Email Marketing",
    location: "Berlin, Germany",
    salary: "$140k–$180k",
    type: "Full Time",
    tags: ["Marketing"],
    description: "Pitch is looking for Customer Manager to join marketing t...",
  },
  {
    id: 4,
    company: "Blinklist",
    companyColor: "#E4002B",
    companyInitial: "B",
    title: "Visual Designer",
    location: "Granada, Spain",
    salary: "$110k–$140k",
    type: "Full Time",
    tags: ["Design"],
    description: "Blinklist is looking for Visual Designer to help team desi...",
  },
  {
    id: 5,
    company: "ClassPass",
    companyColor: "#FF6B35",
    companyInitial: "C",
    title: "Product Designer",
    location: "Manchester, UK",
    salary: "$130k–$170k",
    type: "Full Time",
    tags: ["Marketing", "Design"],
    description: "ClassPass is looking for Product Designer to help us...",
  },
  {
    id: 6,
    company: "Canva",
    companyColor: "#00C4CC",
    companyInitial: "C",
    title: "Lead Engineer",
    location: "Ontario, Canada",
    salary: "$150k–$200k",
    type: "Full Time",
    tags: ["Design", "Business"],
    description: "Canva is looking for Lead Engineer to help develop n...",
  },
  {
    id: 7,
    company: "GoDaddy",
    companyColor: "#1BDBDB",
    companyInitial: "G",
    title: "Brand Strategist",
    location: "Marseille, France",
    salary: "$100k–$130k",
    type: "Full Time",
    tags: ["Marketing"],
    description: "GoDaddy is looking for Brand Strategist to join the team...",
  },
  {
    id: 8,
    company: "Twitter",
    companyColor: "#1DA1F2",
    companyInitial: "T",
    title: "Data Analyst",
    location: "San Diego, US",
    salary: "$120k–$150k",
    type: "Full Time",
    tags: ["Technology"],
    description: "Twitter is looking for Data Analyst to help team desi...",
  },
];

const tagColor: Record<string, string> = {
  Marketing: "bg-orange-100 text-orange-600",
  Design: "bg-indigo-100 text-indigo-600",
  Business: "bg-green-100 text-green-700",
  Technology: "bg-blue-100 text-blue-700",
};

const JobCard = ({ job }: { job: Job }) => (
  <Link href={`/find-jobs/${job.id}`}>
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group">
      {/* Top row: logo + badge */}
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ backgroundColor: job.companyColor }}
        >
          {job.companyInitial}
        </div>
        <span className="text-[11px] font-semibold text-primary border border-primary px-2.5 py-0.5">
          {job.type}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-sm text-gray-800 group-hover:text-indigo-600 transition-colors mb-0.5">
        {job.title}
      </h3>

      {/* Company · Location */}
      <p className="text-xs text-gray-400 mb-2">
        {job.company} · {job.location}
      </p>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
              tagColor[tag] ?? "bg-gray-100 text-gray-500"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </Link>
);

const FeaturedJobs = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <Container>
        {/* Section Header */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4'>
          <h2 className='text-4xl font-bold text-text-dark'>
            Featured <span className='text-blue-light'>jobs</span>
          </h2>
          <Link
            href='/find-jobs'
            className='text-base text-primary font-semibold flex items-center gap-1 group'>
            Show all jobs
            <span className='group-hover:translate-x-1 transition-transform'>
              →
            </span>
          </Link>
        </div>

        {/* Grid — 4 columns, 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedJobs;