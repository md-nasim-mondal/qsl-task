"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function JobSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Derive initial state from URL — no useEffect needed
  const [searchTerm, setSearchTerm] = useState(
    () => searchParams?.get("searchTerm") ?? ""
  );
  const [location, setLocation] = useState(
    () => searchParams?.get("location") ?? ""
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (searchTerm) {
      params.set("searchTerm", searchTerm);
    } else {
      params.delete("searchTerm");
    }
    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }
    router.push(`/find-jobs?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-4xl bg-white p-3 rounded-lg shadow-sm flex flex-col md:flex-row gap-3"
    >
      <input
        type="text"
        placeholder="Job title or keyword"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-4 py-3 outline-none border-b md:border-b-0 md:border-r border-gray-100 text-text-body"
      />
      <input
        type="text"
        placeholder="Location (e.g. Remote, USA)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 px-4 py-3 outline-none text-text-body"
      />
      <button
        type="submit"
        className="bg-primary text-white px-8 py-3 font-bold hover:bg-primary-hover transition-colors"
      >
        Search my job
      </button>
    </form>
  );
}
