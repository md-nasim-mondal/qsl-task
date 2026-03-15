"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Modal from "./Modal";

interface Props {
  limit: number;
}

const LIMITS = ["5", "10", "20", "50"];

export default function LimitSelector({ limit }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLimitChange = (newLimit: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("limit", newLimit);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-text-body font-medium">Show</span>
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-text-dark shadow-sm active:scale-95 transition-all"
      >
        {limit}
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <span className="text-sm text-text-body font-medium whitespace-nowrap">per page</span>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Items Per Page"
        maxWidth="max-w-xs"
      >
        <div className="grid grid-cols-1 gap-2">
          {LIMITS.map((val) => (
            <button
              key={val}
              onClick={() => handleLimitChange(val)}
              className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                limit.toString() === val
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-gray-50 text-text-dark hover:bg-gray-100"
              }`}
            >
              {val} Items
              {limit.toString() === val && (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
