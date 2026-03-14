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
};

const featuredJobs: Job[] = [
  {
    id: 1,
    company: "Dropbox",
    companyColor: "#0061FF",
    companyInitial: "D",
    title: "Email Marketing",
    location: "Remote · USA",
    salary: "$180k–$220k",
    type: "Full Time",
    tags: ["Figma", "Sketch"],
  },
  {
    id: 2,
    company: "Twitter",
    companyColor: "#1DA1F2",
    companyInitial: "T",
    title: "Brand Designer",
    location: "Remote · UK",
    salary: "$120k–$150k",
    type: "Part Time",
    tags: ["Figma", "Illustrator"],
  },
  {
    id: 3,
    company: "Meta",
    companyColor: "#0866FF",
    companyInitial: "M",
    title: "Data Marketing",
    location: "Hybrid · CA",
    salary: "$140k–$180k",
    type: "Full Time",
    tags: ["Analytics", "Excel"],
  },
  {
    id: 4,
    company: "Notion",
    companyColor: "#000000",
    companyInitial: "N",
    title: "React Designer",
    location: "Remote · NYC",
    salary: "$110k–$140k",
    type: "Full Time",
    tags: ["React", "Figma"],
  },
  {
    id: 5,
    company: "Figma",
    companyColor: "#A259FF",
    companyInitial: "F",
    title: "Frontend Engineer",
    location: "Remote · Global",
    salary: "$130k–$170k",
    type: "Full Time",
    tags: ["React", "TypeScript"],
  },
  {
    id: 6,
    company: "Spotify",
    companyColor: "#1DB954",
    companyInitial: "S",
    title: "Lead Engineer",
    location: "Stockholm",
    salary: "$150k–$200k",
    type: "Full Time",
    tags: ["Backend", "Node"],
  },
  {
    id: 7,
    company: "Slack",
    companyColor: "#4A154B",
    companyInitial: "S",
    title: "Brand Manager",
    location: "Remote · US",
    salary: "$100k–$130k",
    type: "Remote",
    tags: ["Marketing", "CRM"],
  },
  {
    id: 8,
    company: "Twitter",
    companyColor: "#1DA1F2",
    companyInitial: "T",
    title: "Data Analyst",
    location: "San Francisco",
    salary: "$120k–$150k",
    type: "Full Time",
    tags: ["SQL", "Python"],
  },
];

const typeBadgeColor: Record<string, string> = {
  "Full Time": "bg-green-100 text-green-700",
  "Part Time": "bg-orange-100 text-orange-700",
  Remote: "bg-indigo-100 text-indigo-700",
};

const JobCard = ({ job }: { job: Job }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-indigo-100 transition-all duration-200 group cursor-pointer">
    <div className="flex items-start justify-between mb-3">
      {/* Company avatar */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
        style={{ backgroundColor: job.companyColor }}
      >
        {job.companyInitial}
      </div>
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${typeBadgeColor[job.type]}`}>
        {job.type}
      </span>
    </div>
    <h3 className="font-semibold text-sm text-gray-800 group-hover:text-indigo-600 transition-colors">
      {job.title}
    </h3>
    <p className="text-xs text-gray-400 mt-0.5 mb-3">{job.company} · {job.location}</p>
    <p className="text-xs font-semibold text-indigo-600 mb-3">{job.salary}</p>
    <div className="flex flex-wrap gap-1.5 mb-4">
      {job.tags.map((tag) => (
        <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
          {tag}
        </span>
      ))}
    </div>
    <button className="w-full text-xs font-semibold text-indigo-600 border border-indigo-200 rounded-lg py-1.5 hover:bg-indigo-600 hover:text-white transition-colors">
      Apply Now
    </button>
  </div>
);

const FeaturedJobs = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Featured <span className="text-indigo-500">jobs</span>
          </h2>
          <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 transition-colors">
            Show all jobs →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
