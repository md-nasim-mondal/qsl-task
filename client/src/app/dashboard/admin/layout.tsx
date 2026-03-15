import AdminSidebar from "@/components/modules/admin/AdminSidebar";
import AdminHeader from "@/components/modules/admin/AdminHeader";
import { DashboardProvider } from "@/context/DashboardContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-bg-light relative overflow-x-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </DashboardProvider>
  );
}
