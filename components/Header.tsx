"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#F7E1D7] shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-gray-800 flex items-center gap-2"
        >
          <span className="font-serif text-3xl text-rose-600">Crave</span>
          <span className="text-indigo-600">Bots</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center font-medium text-gray-700">
          <Link href="/" className="hover:text-rose-600 transition">Home</Link>
          <Link href="/menu" className="hover:text-rose-600 transition">Menu</Link>
          <Link href="/about" className="hover:text-rose-600 transition">About</Link>
          <Link
            href="/#search"
            className="bg-gradient-to-r from-rose-500 to-indigo-500 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition"
          >
            Try AI Search
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6 text-gray-800" /> : <Menu className="h-6 w-6 text-gray-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 font-medium text-gray-800 bg-[#F7E1D7] backdrop-blur">
          <Link href="/" onClick={() => setIsOpen(false)} className="block">Home</Link>
          <Link href="/menu" onClick={() => setIsOpen(false)} className="block">Menu</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block">About</Link>
          <Link
            href="/#search"
            onClick={() => setIsOpen(false)}
            className="inline-block bg-gradient-to-r from-rose-500 to-indigo-500 text-white px-4 py-2 rounded-xl shadow-md"
          >
            Try AI Search
          </Link>
        </div>
      )}
    </header>
  );
}
