"use client";

import { CategoriesIcon } from "@/components/Icons/CategoriesIcon";
import Link from "next/link";
import { useState } from "react";

interface Category {
  icon: (highlighted: boolean) => React.ReactNode;
  title: string;
  count: string;
}

const categories: Category[] = [
  { icon: CategoriesIcon.design, title: "Design", count: "235 jobs available" },
  { icon: CategoriesIcon.sales, title: "Sales", count: "756 jobs available" },
  {
    icon: CategoriesIcon.marketing,
    title: "Marketing",
    count: "140 jobs available",
  },
  {
    icon: CategoriesIcon.finance,
    title: "Finance",
    count: "325 jobs available",
  },
  {
    icon: CategoriesIcon.technology,
    title: "Technology",
    count: "436 jobs available",
  },
  {
    icon: CategoriesIcon.engineering,
    title: "Engineering",
    count: "542 jobs available",
  },
  {
    icon: CategoriesIcon.design,
    title: "Business",
    count: "211 jobs available",
  },
  {
    icon: CategoriesIcon.humanResources,
    title: "Human Resource",
    count: "345 jobs available",
  },
];

const Categories = () => {
  const [highlighted, setHighlighted] = useState<string>("");

  return (
    <section className='w-full py-12 md:py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-3xl md:text-5xl font-semibold text-[#25324B]'>
            Explore by <span className='text-[#26A4FF]'>category</span>
          </h2>

          <Link
            href='#'
            className='text-base text-[#4640DE] font-semibold flex items-center gap-1'>
            Show all jobs →
          </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8'>
          {categories.map((cat) => {
            const isHighlighted = highlighted === cat.title;

            return (
              <div
                key={cat.title}
                onMouseEnter={() => setHighlighted(cat.title)}
                onMouseLeave={() => setHighlighted("")}
                className={`group rounded-xl p-5 md:p-8 flex flex-col gap-5 md:gap-8 cursor-pointer transition-all duration-200 border hover:shadow-md
                ${
                  isHighlighted
                    ? "bg-[#4640DE] border-[#4640DE] text-white shadow-md shadow-indigo-200"
                    : "bg-white border-gray-100 hover:border-indigo-200"
                }`}>
                <span>{cat.icon(isHighlighted)}</span>

                <div>
                  <h3
                    className={`font-semibold text-sm md:text-base ${
                      isHighlighted ? "text-white" : "text-gray-800"
                    }`}>
                    {cat.title}
                  </h3>

                  <p
                    className={`text-xs mt-0.5 ${
                      isHighlighted ? "text-indigo-200" : "text-gray-400"
                    }`}>
                    {cat.count}
                    <span className="ml-1 text-lg">→</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
