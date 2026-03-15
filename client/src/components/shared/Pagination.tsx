"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    if (onPageChange) {
      onPageChange(newPage);
    } else {
      const params = new URLSearchParams(searchParams?.toString());
      params.set("page", newPage.toString());
      router.push(`?${params.toString()}`);
    }
  };

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pb-8">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-lg border border-gray-200 text-text-dark hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-sm font-semibold transition-all hover:bg-gray-50 text-text-dark"
          >
            1
          </button>
          {start > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
            page === p
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "border border-gray-200 text-text-dark hover:bg-gray-50"
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-gray-400">...</span>}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-sm font-semibold transition-all hover:bg-gray-50 text-text-dark"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-lg border border-gray-200 text-text-dark hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
