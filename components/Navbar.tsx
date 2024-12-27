"use client";
import { useState } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="bg-black">
        <div className="text-white flex justify-between items-center py-4 px-6 lg:px-12">
          <h1>Logo</h1>
          <ul className="hidden md:flex space-x-6">
            <Link href="/">
              <li className="p-2 hover:bg-slate-700 rounded-md cursor-pointer">
                Home
              </li>
            </Link>
            <Link href="/about">
              <li className="p-2 hover:bg-slate-700 rounded-md cursor-pointer">
                About
              </li>
            </Link>
          </ul>
          <button
            className="p-2 border-2 border-white rounded-md cursor-pointer hover:bg-slate-700 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaAlignJustify />
          </button>
        </div>
        {isOpen && (
          <div className="fixed inset-0 z-40">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="fixed top-0 right-0 h-screen w-4/5 z-50 bg-black text-white">
              <button
                className="p-1 m-4 rounded-md border-2 border-white"
                onClick={() => setIsOpen(false)}
              >
                <IoClose className="text-2xl" />
              </button>
              <ul className="flex flex-col items-center mt-16">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <li className="p-4 hover:bg-slate-700 w-full text-center">
                    Home
                  </li>
                </Link>
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  <li className="p-4 hover:bg-slate-700 w-full text-center">
                    About
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
