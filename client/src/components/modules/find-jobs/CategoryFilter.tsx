"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Derive initial state from URL — no useEffect needed
  const [category, setCategory] = useState(
    () => searchParams?.get("category") ?? ""
  );

  const handleCategory = (cat: string) => {
    const next = category === cat ? "" : cat;
    setCategory(next);
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (next) {
      params.set("category", next);
    } else {
      params.delete("category");
    }
    router.push(`/find-jobs?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="text-text-dark font-bold text-lg mb-4">Category</h3>
      <div className="space-y-3 flex flex-col items-start">
        {CATEGORIES.map((cat) => (
          <label key={cat} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={category === cat}
              onChange={() => handleCategory(cat)}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-text-body text-base">{cat}</span>
          </label>
        ))}
        {category && (
          <button
            onClick={() => handleCategory(category)}
            className="text-sm text-primary underline mt-2"
          >
            Clear filter
          </button>
        )}
      </div>
    </div>
  );
}
