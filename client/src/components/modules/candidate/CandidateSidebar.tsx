"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const logoUrl = "/assets/logo/frame_3.png";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard/candidate",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "My Applications",
    href: "/dashboard/candidate/applications",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "My Profile",
    href: "/dashboard/candidate/profile",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export default function CandidateSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const isActive = (href: string) =>
    href === "/dashboard/candidate" ? pathname === "/dashboard/candidate" : pathname?.startsWith(href);

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      <div className="px-6 py-5 border-b border-gray-50">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src={logoUrl} alt="QuickHire" width={32} height={32} />
          <span className="font-bold text-text-dark text-lg">QuickHire</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-0.5">
        <div className="pt-2 pb-2">
          <p className="text-xs font-semibold text-gray-400 px-3 uppercase tracking-wider mb-2">
            Candidate Panel
          </p>
        </div>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
              isActive(item.href)
                ? "bg-primary/10 text-primary"
                : "text-text-body hover:bg-gray-50 hover:text-text-dark"
            }`}
          >
            <span
              className={`${
                isActive(item.href) ? "text-primary" : "text-gray-400 group-hover:text-gray-600"
              }`}
            >
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
            {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-dark truncate">
              {user?.name ?? "Candidate"}
            </p>
            <p className="text-xs text-text-body truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-left text-xs text-red-500 hover:text-red-700 font-medium py-1 transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
