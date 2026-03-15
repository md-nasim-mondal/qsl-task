import CandidateSidebar from "@/components/modules/candidate/CandidateSidebar";
import CandidateHeader from "@/components/modules/candidate/CandidateHeader";

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg-light">
      <CandidateSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <CandidateHeader />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
