"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  limit: number;
}

export default function LimitSelector({ limit }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLimitChange = (newLimit: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("limit", newLimit);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-text-body font-medium">Show</span>
      <select
        value={limit.toString()}
        onChange={(e) => handleLimitChange(e.target.value)}
        className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm transition-all hover:border-primary/30"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <span className="text-sm text-text-body font-medium whitespace-nowrap">per page</span>
    </div>
  );
}
