"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // lucide-react icons use kar raha hoon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-[#111827] fixed top-0 w-full z-50 shadow-md">
      <div className="w-[90%] mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          <img
            className="h-10 w-auto mr-3"
            src="https://cdn-icons-png.flaticon.com/512/6014/6014401.png"
            alt="logo"
          />
          Crave Bot
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-lg items-center">
          <a href="#" className="hover:text-[#15803D]">
            Home
          </a>
          <a href="/about" className="hover:text-[#15803D]">
            About
          </a>
          <a href="/contact" className="hover:text-[#15803D]">
            Contact
          </a>

          <button className="border-2 border-solid px-4 py-1 rounded-md text-black font-bold cursor-pointer">
            <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent font-semibold">
              Try AI Search
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col space-y-4 p-4 text-lg">
            <a
              href="#"
              className="hover:text-[#15803D]"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="/about"
              className="hover:text-[#15803D]"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="/contact"
              className="hover:text-[#15803D]"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <button className="border-2 border-solid px-4 py-2 rounded-md text-black font-bold cursor-pointer">
              <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent font-semibold">
                Try AI Search
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
