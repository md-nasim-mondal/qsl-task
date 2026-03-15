import Container from "@/components/shared/Container";
import Link from "next/link";

export const metadata = {
  title: "Browse Companies | QuickHire"
};

export default function CompaniesPage() {
  return (
    <Container className="min-h-[70vh] py-16">
      <div className="flex flex-col items-center justify-center text-center h-full space-y-6">
        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-dark">Browse Companies</h1>
          <p className="text-text-body mt-2 max-w-lg mx-auto">
            Discover top companies hiring right now. This feature is currently under active development. Check back soon!
          </p>
        </div>
        <Link 
          href="/find-jobs"
          className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors mt-4 inline-block"
        >
          Explore Open Jobs
        </Link>
      </div>
    </Container>
  );
}
