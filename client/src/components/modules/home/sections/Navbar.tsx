"use client";
import logo from "../../../../../public/assets/logo/frame_3.png";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Container from "@/components/shared/Container";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      label: "Find Jobs",
      path: "find-jobs",
    },
    {
      label: "Browse Companies",
      path: "browse-companies",
    },
  ];

  return (
    <nav className='w-full bg-[#F8F8FD]'>
      <Container>
        <div className='flex items-center justify-between py-6'>
          {/* Logo */}
          <div className='flex items-center gap-12'>
            <div className='flex items-center gap-2'>
              <Image src={logo} alt='Logo' width={32} height={32} />
              <span className='text-[#25324B] font-bold text-xl sm:text-lg md:text-2xl tracking-tight'>
                QuickHire
              </span>
            </div>

            {/* Desktop Nav */}
            <div className='hidden md:flex items-center gap-8'>
              {navLinks?.map((link, index) => (
                <Link
                  key={link?.path + index}
                  href={link?.path}
                  className='text-[#515B6F] font-medium text-base'>
                  {link?.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className='hidden md:flex items-center gap-4'>
            <button className='text-base text-[#4640DE] font-bold transition-colors px-6 py-3'>
              Login
            </button>
            <button className='text-base text-white bg-[#4640DE] font-bold  px-6 py-3 flex justify-center items-center gap-2.5'>
              Sign Up
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className='md:hidden flex flex-col gap-1.5 p-2'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Toggle menu'>
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-72 border-t border-gray-100" : "max-h-0"}`}>
        <div className='px-4 py-3 flex flex-col gap-3 bg-white'>
          {navLinks?.map((link, index) => (
            <Link
              key={link?.path + index}
              href={link?.path}
              className='text-[#515B6F] font-medium text-base'>
              {link?.label}
            </Link>
          ))}
          <div className='flex gap-3 pt-2 border-t border-gray-100'>
            <button className='flex-1 text-sm border border-[[#4640DE]] text-[[#4640DE]] rounded-md py-2 font-bold'>
              Login
            </button>
            <button className='flex-1 text-sm bg-[[#4640DE]] text-white rounded-md py-2 font-bold'>
              Sign Up
            </button>
          </div>
        </div>
      </div>
      </Container>

    </nav>
  );
};

export default Navbar;
