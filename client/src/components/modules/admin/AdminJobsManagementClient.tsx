"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import Modal from "@/components/shared/Modal";
import PostJobForm from "./PostJobForm";
import LimitSelector from "@/components/shared/LimitSelector";

interface Props {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

const CATEGORIES = [
  "Design",
  "Sales",
  "Marketing",
  "Business",
  "Human Resource",
  "Finance",
  "Engineering",
  "Technology",
];

export default function AdminJobsManagementClient({ meta }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState(
    searchParams?.get("searchTerm") ?? "",
  );
  const [category, setCategory] = useState(searchParams?.get("category") ?? "");
  const [location, setLocation] = useState(searchParams?.get("location") ?? "");

  const updateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams?.toString());

    // Reset to page 1 on filter change
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
    updateFilters({ searchTerm, category, location });
  };

  return (
    <div className='space-y-6 mb-6'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2'>
        <div>
          <h1 className='text-2xl font-bold text-text-dark'>Job Management</h1>
          <p className='text-text-body text-sm mt-1'>
            Manage and monitor all your job postings.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className='bg-primary text-white px-6 py-2.5 font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center gap-2'>
          <svg
            className='w-5 h-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 4v16m8-8H4'
            />
          </svg>
          Post New Job
        </button>
      </div>

      <form
        onSubmit={handleSearch}
        className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search jobs...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm'
            />
            <svg
              className='w-5 h-5 absolute left-3 top-2.5 text-gray-400'
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
          </div>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              updateFilters({ category: e.target.value });
            }}
            className='w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm appearance-none cursor-pointer'>
            <option value=''>All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type='text'
            placeholder='Location...'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm'
          />

          <button
            type='submit'
            className='w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary-hover transition-all shadow-lg shadow-primary/10 active:scale-95 flex items-center justify-center gap-2'>
            {isPending ? "Searching..." : "Apply Filters"}
          </button>
        </div>
      </form>

      <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        <LimitSelector limit={meta.limit} />

        <p className='text-sm text-text-body text-center sm:text-right'>
          Showing{" "}
          <span className='font-bold text-text-dark'>
            {(meta.page - 1) * meta.limit + 1}
          </span>{" "}
          -{" "}
          <span className='font-bold text-text-dark'>
            {Math.min(meta.page * meta.limit, meta.total)}
          </span>{" "}
          of <span className='font-bold text-text-dark'>{meta.total}</span> jobs
        </p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Post a New Job'>
        <PostJobForm
          onSuccess={() => {
            setIsModalOpen(false);
            router.refresh();
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
