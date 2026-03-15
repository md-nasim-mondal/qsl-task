"use client";

import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import Link from "next/link";

export default function AdminHeader() {
  const { user } = useAuth();
  const { toggleSidebar } = useDashboard();

  return (
    <header className='bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        {/* Menu Toggle */}
        <button
          onClick={toggleSidebar}
          className='p-2 md:hidden text-gray-500 hover:bg-gray-50 rounded-lg transition-colors'>
          <svg
            className='w-6 h-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        <div className='hidden sm:block'>
          <p className='text-xs text-text-body'>
            Good morning, {user?.name || "Admin"}! 👋
          </p>
          <p className='text-xs text-gray-400'>
            Here are your updates for today.
          </p>
        </div>
      </div>
      <div className='flex items-center gap-2 md:gap-3'>
        <button className='w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors'>
          <svg
            className='w-5 h-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
        <Link
          href='/dashboard/admin/jobs/new'
          className='bg-primary text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-1.5'>
          <span className='hidden xs:inline'>+ Post a Job</span>
          <span className='xs:hidden'>+ Post</span>
        </Link>
      </div>
    </header>
  );
}
