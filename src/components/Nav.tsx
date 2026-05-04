"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/menu", label: "Menu" },
    { href: "/story", label: "Our Story" },
    { href: "/visit", label: "Visit" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[#f6f1ea]/95 border-b border-[#2d1f1a]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="serif text-xl sm:text-2xl font-semibold tracking-tight text-[#2d1f1a]">
          Brew<span className="text-[#a67040]">&</span>Bean
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative transition-colors ${
                  isActive(link.href) ? 'text-[#a67040]' : 'text-[#2d1f1a] hover:text-[#a67040]'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#a67040] transition-all ${isActive(link.href) ? 'w-full' : 'w-0'}`} />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/visit"
          className="hidden md:inline-block bg-[#2d1f1a] text-[#f6f1ea] px-5 py-2.5 rounded-full text-sm whitespace-nowrap hover:bg-[#a67040] transition-colors"
        >
          Reserve a Table
        </Link>

        {/* Mobile Menu Button */}
        <button
          id="menuBtn"
          className="md:hidden text-[#2d1f1a] p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobileMenu"
        className={`${isOpen ? "block" : "hidden"} md:hidden border-t border-[#2d1f1a]/10 px-4 py-4 bg-[#f6f1ea]`}
      >
        <ul className="flex flex-col gap-4 text-base font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block py-2 ${isActive(link.href) ? 'text-[#a67040]' : 'text-[#2d1f1a]'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/visit"
              className="inline-block bg-[#2d1f1a] text-[#f6f1ea] px-6 py-3 rounded-full text-sm"
              onClick={() => setIsOpen(false)}
            >
              Reserve a Table
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}