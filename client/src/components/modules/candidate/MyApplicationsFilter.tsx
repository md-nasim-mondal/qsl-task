/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import LimitSelector from "@/components/shared/LimitSelector";

interface Props {
  total: number;
  page: number;
  limit: number;
}

export default function MyApplicationsFilter({ total, page, limit }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(searchParams?.get("searchTerm") ?? "");

  const updateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams?.toString());
    
    // Reset to page 1 on filter/search change
    params.set("page", "1");

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ searchTerm });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <form onSubmit={handleSearch} className="relative w-full md:w-96">
        <input
          type="text"
          placeholder="Search by company or note..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm"
        />
        <svg
          className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </form>

      <div className="flex items-center gap-6">
        <LimitSelector limit={limit} />
        <p className="text-sm text-text-body ml-2">
            Showing <span className="font-bold text-text-dark">{total > 0 ? (page - 1) * limit + 1 : 0}</span> - <span className="font-bold text-text-dark">{Math.min(page * limit, total)}</span> of <span className="font-bold text-text-dark">{total}</span>
        </p>
      </div>
    </div>
  );
}
