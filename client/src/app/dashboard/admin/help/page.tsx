export const metadata = { title: "Help Center | QuickHire Admin" };

const FAQS = [
  {
    q: "How do I post a new job?",
    a: "Navigate to Job Listing in the sidebar, then click 'Post New Job'. Fill in the job details and submit.",
  },
  {
    q: "How can I view applicants for a specific job?",
    a: "Go to All Applicants in the sidebar to see all incoming applications across all your job listings.",
  },
  {
    q: "How do I delete a job listing?",
    a: "From the Dashboard or Job Listing page, click the Delete button next to the job you want to remove.",
  },
  {
    q: "How does the forgot password flow work?",
    a: "On the login page, click 'Forgot password?' and enter your email. You will receive a reset link valid for 10 minutes.",
  },
  {
    q: "Is the admin panel protected?",
    a: "Yes. You must be signed in to access any /admin routes. Unauthenticated visitors are redirected to the login page.",
  },
];

export default function HelpPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Help Center</h1>
        <p className="text-text-body text-sm mt-1">Answers to common questions about QuickHire Admin.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <p className="font-semibold text-text-dark text-sm">{faq.q}</p>
            <p className="text-text-body text-sm mt-2 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
        <p className="font-semibold text-text-dark text-sm mb-1">Still need help?</p>
        <p className="text-text-body text-sm">
          Reach us at{" "}
          <a href="mailto:support@quickhire.app" className="text-primary hover:underline">
            support@quickhire.app
          </a>
        </p>
      </div>
    </div>
  );
}
