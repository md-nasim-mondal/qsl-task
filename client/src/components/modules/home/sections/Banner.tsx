"use client";
import Container from "@/components/shared/Container";
import vectorIcon from "../../../../../public/assets/icons/vector.png";
import bannerImg from "../../../../../public/assets/images/qslBannerImg.png";
import patternImg from "../../../../../public/assets/pattern/pattern.svg";
import Image from "next/image";
import { useState } from "react";
import Navbar from "./Navbar";

const Banner = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className='mx-auto relative w-full bg-[#F8F8FD] overflow-y-hidden'>
      <Navbar />
      <Container>
        <div className='flex flex-col md:flex-row items-center gap-8 md:gap-0'>
          {/* Left Content */}
          <div className='flex-1'>
            <h1 className='text-4xl md:text-5xl lg:text-7xl font-semibold text-[#25324B] leading-tight'>
              Discover <br className='hidden md:block' />
              more than <br className='hidden md:block' />
              <span className='text-[#26A4FF]'>5000+ Jobs</span>
            </h1>
            <Image src={vectorIcon} alt='vector-icon' />
            <p className='text-[#515B6F] text-lg md:text-xl max-w-lg leading-relaxed py-6'>
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            {/* Search Bar */}
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white p-4 border border-gray-100 absolute z-30'>
              <div className='flex items-center gap-4 flex-1 px-3 py-1'>
                <svg
                  className='w-6 h-6 text-gray-400 shrink-0'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
                <input
                  type='text'
                  placeholder='Job title or keyword'
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className='flex-1 text-base text-gray-700 outline-none bg-transparent placeholder-gray-400 border-b border-[#D6DDEB] w-58'
                />
              </div>
              <div className='flex items-center gap-4 flex-1 px-3 py-1'>
                <svg
                  className='w-6 h-6 text-gray-400 shrink-0'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
                <input
                  type='text'
                  placeholder='Your location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className='flex-1 text-base text-gray-700 outline-none bg-transparent placeholder-gray-400 border-b border-[#D6DDEB] w-58'
                />
              </div>
              <button className='bg-[#4640DE] text-white text-lg font-bold px-7 py-3.5 transition-colors whitespace-nowrap'>
                Search My Job
              </button>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap items-center gap-2 mt-28'>
              <span className='text-base text-[#202430]'>Popular:</span>
              {[
                "UI Designer",
                "UX Researcher",
                "JavaScript",
                "Data Analyst",
              ].map((tag, index) => (
                <span key={tag} className='text-base text-[#202430]'>
                  {tag}
                  {index == 3 ? "" : ","}
                </span>
              ))}
            </div>
          </div>

          {/* Right Image / Illustration */}
          <div className='flex-1'>
            <div className='w-full h-full flex justify-end'>
              <Image
                className='w-125 h-155 hidden md:block mt-12 z-20'
                src={bannerImg}
                alt='banner man Img'
              />
            </div>
          </div>
        </div>
      </Container>
      <Image
        className='w-215 h-198.5 z-10 absolute top-0 right-60'
        src={patternImg}
        alt='bg pattern'
      />
    </section>
  );
};

export default Banner;
