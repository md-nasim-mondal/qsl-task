import { getApiUrl } from "@/lib/api";

interface Application {
  _id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
  createdAt: string;
  job?: { title: string; company: string };
}

async function fetchApplications(): Promise<Application[]> {
  try {
    const res = await fetch(`${getApiUrl()}/applications`, { cache: "no-store" });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export const metadata = { title: "All Applicants | QuickHire Admin" };

export default async function ApplicantsPage() {
  const applications = await fetchApplications();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">All Applicants</h1>
        <p className="text-text-body text-sm mt-1">
          {applications.length} application{applications.length !== 1 ? "s" : ""} received
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-16 text-center">
          <p className="text-text-body">No applications have been submitted yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg-light border-b border-gray-100 text-sm text-text-body">
                <th className="py-3 px-5 font-semibold">Applicant</th>
                <th className="py-3 px-5 font-semibold hidden md:table-cell">Job Applied For</th>
                <th className="py-3 px-5 font-semibold">Email</th>
                <th className="py-3 px-5 font-semibold hidden lg:table-cell">Resume</th>
                <th className="py-3 px-5 font-semibold hidden lg:table-cell">Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {app.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-text-dark text-sm">{app.name}</p>
                        {app.cover_note && (
                          <p className="text-xs text-text-body truncate max-w-xs">{app.cover_note.slice(0, 60)}…</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 hidden md:table-cell">
                    <span className="text-sm text-text-body">
                      {typeof app.job === "object" ? app.job?.title : "—"}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-text-body text-sm">{app.email}</td>
                  <td className="py-4 px-5 hidden lg:table-cell">
                    <a
                      href={app.resume_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline"
                    >
                      View Resume ↗
                    </a>
                  </td>
                  <td className="py-4 px-5 text-text-body text-sm hidden lg:table-cell">
                    {new Date(app.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
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
