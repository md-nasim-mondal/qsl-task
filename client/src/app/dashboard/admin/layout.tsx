import AdminSidebar from "@/components/modules/admin/AdminSidebar";
import AdminHeader from "@/components/modules/admin/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg-light">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
