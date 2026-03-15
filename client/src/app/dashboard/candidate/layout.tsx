import CandidateSidebar from "@/components/modules/candidate/CandidateSidebar";
import CandidateHeader from "@/components/modules/candidate/CandidateHeader";
import { DashboardProvider } from "@/context/DashboardContext";

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-bg-light relative overflow-x-hidden">
        <CandidateSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <CandidateHeader />
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </DashboardProvider>
  );
}
