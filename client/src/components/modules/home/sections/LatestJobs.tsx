import Container from "@/components/shared/Container";
import Link from "next/link";

type LatestJob = {
  id: number;
  title: string;
  company: string;
  companyColor: string;
  companyInitial: string;
  location: string;
  type: "Full Time" | "Part Time" | "Remote";
  tags: string[];
};

const latestJobs: LatestJob[] = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    companyColor: "#10B981",
    companyInitial: "N",
    location: "Paris, France",
    type: "Full Time",
    tags: ["Marketing", "Design"],
  },
  {
    id: 2,
    title: "Social Media Assistant",
    company: "Netlify",
    companyColor: "#05BDBA",
    companyInitial: "N",
    location: "Paris, France",
    type: "Full Time",
    tags: ["Marketing", "Design"],
  },
  {
    id: 3,
    title: "Brand Designer",
    company: "Dropbox",
    companyColor: "#0061FF",
    companyInitial: "D",
    location: "San Francisco, USA",
    type: "Full Time",
    tags: ["Marketing", "Design"],
  },
  {
    id: 4,
    title: "Brand Designer",
    company: "Maze",
    companyColor: "#FF4D4D",
    companyInitial: "M",
    location: "San Francisco, USA",
    type: "Full Time",
    tags: ["Marketing", "Design"],
  },
  {
    id: 5,
    title: "Interactive Developer",
    company: "Terraform",
    companyColor: "#7B3FE4",
    companyInitial: "T",
    location: "Hamburg, Germany",
    type: "Full Time",
    tags: ["Marketing", "Design"],
  },
  {
    id: 6,
    title: "Interactive Developer",
    company: "Udacity",
    companyColor: "#02B3E4",
    companyInitial: "U",
    location: "Hamburg, Germany",
    type: "Full Time",
    tags: ["Marketing", "Design"],
  },
  {
    id: 7,
    title: "HR Manager",
    company: "Packer",
    companyColor: "#1563FF",
    companyInitial: "P",
    location: "Lucern, Switzerland",
    type: "Full Time",
    tags: ["Marketing", "Design"],
  },
  {
    id: 8,
    title: "HR Manager",
    company: "Webflow",
    companyColor: "#4353FF",
    companyInitial: "W",
    location: "Lucern, Switzerland",
    type: "Full Time",
    tags: ["Marketing", "Design"],
  },
];

const tagColor: Record<string, string> = {
  Marketing: "bg-orange-50 text-orange-400",
  Design: "bg-indigo-50 text-indigo-400",
  Business: "bg-green-50 text-green-400",
  Technology: "bg-blue-50 text-blue-400",
  "Human Resource": "bg-yellow-50 text-yellow-400",
  Coding: "bg-pink-50 text-pink-400",
};

const typeBadgeColor: Record<string, string> = {
  "Full Time": "bg-green-50 text-green-400",
  "Part Time": "bg-orange-50 text-orange-400",
  Remote: "bg-indigo-50 text-indigo-400",
};

const LatestJobRow = ({ job }: { job: LatestJob }) => (
  <Link href={`/find-jobs?searchTerm=${encodeURIComponent(job.title)}`}>
    <div className='flex items-center gap-4 md:gap-6 bg-white border border-gray-100 rounded-2xl px-5 py-4 hover:shadow-sm hover:border-indigo-100 transition-all duration-200 cursor-pointer group'>
      {/* Company avatar */}
      <div
        className='w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0'
        style={{ backgroundColor: job.companyColor }}>
        {job.companyInitial}
      </div>

      <div className='flex-1 w-full'>
        {/* Title + company·location */}
        <div className='flex-1 min-w-0'>
          <h3 className='font-bold text-sm text-gray-800 truncate group-hover:text-indigo-600 transition-colors'>
            {job.title}
          </h3>
          <p className='text-xs text-gray-400 truncate mt-0.5'>
            {job.company} · {job.location}
          </p>
        </div>

        {/* Type badge + tags */}
        <div className='hidden sm:flex items-center gap-1.5 shrink-0 mt-2'>
          <span
            className={`text-[11px] bg-opacity-70 font-extralight px-2.5 py-0.5 rounded-full ${typeBadgeColor[job.type]}`}>
            {job.type}
          </span>
          {job.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                tagColor[tag] ?? "bg-gray-100 text-gray-500"
              }`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Link>
);

const LatestJobs = () => {
  return (
    <section className='w-full py-12 md:py-16  bg-gray-50'>
      <Container>
        {/* Section header */}
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-4xl font-bold text-text-dark'>
            Latest <span className='text-blue-light'>jobs open</span>
          </h2>
          <Link
            href='/find-jobs'
            className='text-base text-primary font-semibold flex items-center gap-1'>
            Show all jobs →
          </Link>
        </div>

        {/* Two-column grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8'>
          {latestJobs.map((job) => (
            <LatestJobRow key={job.id} job={job} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LatestJobs;
