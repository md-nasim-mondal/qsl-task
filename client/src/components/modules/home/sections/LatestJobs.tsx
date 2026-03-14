type LatestJob = {
  id: number;
  title: string;
  company: string;
  companyColor: string;
  companyInitial: string;
  location: string;
  salary: string;
  postedAgo: string;
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
    salary: "$35k–$45k",
    postedAgo: "2 days ago",
    tags: ["Marketing", "Design"],
  },
  {
    id: 2,
    title: "Social Media Assistant",
    company: "Figma",
    companyColor: "#A259FF",
    companyInitial: "F",
    location: "Berlin, Germany",
    salary: "$40k–$50k",
    postedAgo: "3 days ago",
    tags: ["Marketing", "Design"],
  },
  {
    id: 3,
    title: "Brand Designer",
    company: "Dropbox",
    companyColor: "#0061FF",
    companyInitial: "D",
    location: "Remote · Worldwide",
    salary: "$55k–$70k",
    postedAgo: "1 day ago",
    tags: ["Design", "Figma"],
  },
  {
    id: 4,
    title: "Brand Designer",
    company: "Maze",
    companyColor: "#FF4D4D",
    companyInitial: "M",
    location: "Barcelona",
    salary: "$50k–$65k",
    postedAgo: "5 days ago",
    tags: ["Design", "Sketch"],
  },
  {
    id: 5,
    title: "Interactive Developer",
    company: "Intercom",
    companyColor: "#F59E0B",
    companyInitial: "I",
    location: "Dublin, Ireland",
    salary: "$65k–$85k",
    postedAgo: "1 week ago",
    tags: ["Coding", "Design"],
  },
  {
    id: 6,
    title: "Interactive Developer",
    company: "Intercom",
    companyColor: "#F59E0B",
    companyInitial: "I",
    location: "London, UK",
    salary: "$70k–$90k",
    postedAgo: "1 week ago",
    tags: ["Coding", "Design"],
  },
  {
    id: 7,
    title: "HR Manager",
    company: "Canva",
    companyColor: "#7C3AED",
    companyInitial: "C",
    location: "Sydney, Australia",
    salary: "$50k–$70k",
    postedAgo: "2 weeks ago",
    tags: ["Human Resource"],
  },
  {
    id: 8,
    title: "HR Manager",
    company: "Pitch",
    companyColor: "#2563EB",
    companyInitial: "P",
    location: "Hamburg, Germany",
    salary: "$55k–$75k",
    postedAgo: "2 weeks ago",
    tags: ["Human Resource"],
  },
];

const LatestJobRow = ({ job }: { job: LatestJob }) => (
  <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-indigo-100 transition-all duration-200 cursor-pointer group">
    {/* Company avatar */}
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
      style={{ backgroundColor: job.companyColor }}
    >
      {job.companyInitial}
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-sm text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
        {job.title}
      </h3>
      <p className="text-xs text-gray-400 truncate">{job.company} · {job.location}</p>
    </div>

    {/* Tags - hidden on mobile */}
    <div className="hidden sm:flex gap-1.5 shrink-0">
      {job.tags.map((tag) => (
        <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
          {tag}
        </span>
      ))}
    </div>

    {/* Salary & date */}
    <div className="text-right shrink-0">
      <p className="text-xs font-semibold text-indigo-600">{job.salary}</p>
      <p className="text-xs text-gray-400 mt-0.5">{job.postedAgo}</p>
    </div>
  </div>
);

const LatestJobs = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Latest <span className="text-indigo-500">jobs open</span>
          </h2>
          <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 transition-colors">
            Show all jobs →
          </a>
        </div>

        {/* Two column grid for large screens, single column for small */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {latestJobs.map((job) => (
            <LatestJobRow key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
