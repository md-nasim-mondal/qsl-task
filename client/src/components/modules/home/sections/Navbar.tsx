"use client";
import logo from "../../../../../public/assets/logo/frame_3.png";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/shared/Container";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Find Jobs", href: "/find-jobs" },
  { label: "Browse Companies", href: "/companies" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <nav className="w-full bg-bg-light">
      <Container>
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logo} alt="QuickHire Logo" width={32} height={32} />
              <span className="text-text-dark font-bold text-xl sm:text-lg md:text-2xl tracking-tight">
                QuickHire
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-body font-medium text-base hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

        {/* Desktop Buttons & User Profile */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-base text-primary font-bold px-6 py-3 hover:bg-primary/5 rounded-md transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-base text-white bg-primary font-bold px-6 py-3 flex justify-center items-center gap-2.5 hover:bg-primary-hover transition-colors rounded-md"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative group">
              <button className="flex items-center gap-2 focus:outline-none">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                  {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                </div>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden transform origin-top-right">
                <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
                  <p className="text-sm font-semibold text-text-dark truncate">{user.name}</p>
                  <p className="text-xs text-text-body truncate mt-0.5">{user.email}</p>
                </div>
<div className="p-2 border-b border-gray-100">
                  <Link
                    href={user.role === 'admin' || user.role === 'super_admin' ? '/dashboard/admin' : '/dashboard/candidate'}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-dark hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Go to Dashboard
                  </Link>
                </div>
                <div className="p-2">
                  <button
                    onClick={async () => {
                      await logout();
                      // Optional: force reload or navigate home
                      window.location.href = "/";
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-100 border-t border-gray-100" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-4 bg-white shadow-inner">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-body font-semibold text-base py-2 hover:text-primary transition-colors border-b border-gray-50 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {!user ? (
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center text-sm border border-primary text-primary rounded-lg py-2.5 font-bold hover:bg-primary/5 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center text-sm bg-primary text-white rounded-lg py-2.5 font-bold hover:bg-primary-hover transition-colors"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-dark">{user.name}</p>
                  <p className="text-xs text-text-body">{user.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Link
                  href={user.role === "admin" || user.role === "super_admin" ? "/dashboard/admin" : "/dashboard/candidate"}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 w-full text-sm font-semibold text-text-dark bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Go to Dashboard
                </Link>
                <button
                  onClick={async () => {
                    await logout();
                    setMenuOpen(false);
                    window.location.href = "/";
                  }}
                  className="flex items-center gap-3 w-full text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-3 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </Container>
    </nav>
  );
};

export default Navbar;
