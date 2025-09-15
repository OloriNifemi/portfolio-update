import React, { useState, useEffect } from "react";
import { TbAlignRight } from "react-icons/tb";
import { HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const toggleHamburger = () => setIsSideBarOpen(!isSideBarOpen);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return ( 
<header
  className={`fixed top-0 left-0 w-full z-50 h-[80px] flex items-center justify-between gap-3 
    md:px-[50px] max-sm:px-[30px] text-gray-200 transition-all duration-500 ease-in-out
    ${scrolled 
      ? "bg-black/60 backdrop-blur-md border-b border-gray-700 shadow-md" 
      : "bg-transparent"}`}
    >
      {/* Logo */}
      <div className="flex justify-center items-center gap-[12px]">
        <div className="size-[25px] rounded-full flex justify-center items-center bg-[#01DBC6] text-black">
          <p className="font-akira text-[15px] font-bold">A</p>
        </div>
        <p className="font-akira lg:text-[20px] text-[16px] text-gray-200 ">ayomipo</p>
      </div>

      {/* Navigation */}
      <div className="lg:flex justify-center items-center gap-[50px] hidden">
        <div className="flex gap-7">
          {[
            { href: "#home", label: "Home" },
            { href: "#about", label: "About" },
            { href: "#project", label: "Project" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[18px] font-medium font-sans transition-all ease-in-out duration-500 hover:text-[#01DBC6] text-gray-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Button */}
        <button className="shadow-lg shadow-[#01dbc650] px-5 py-3 transition-all ease-in-out duration-500 hover:shadow-2xl border-2 border-[#01DBC6] hover:bg-[#01DBC6] rounded-full text-[14px] font-medium text-gray-200 hover:text-black">
          Contact me
        </button>
      </div>

      {/* Sidebar (mobile) */}
      <div
        className={`
          lg:hidden flex flex-col py-6 shadow-lg z-20 
          absolute top-[70px] right-0 
          w-2/3 max-sm:w-[80%] rounded-lg backdrop-blur-md 
          bg-black/70 text-mutedMint transition-transform duration-500
          ${isSideBarOpen ? "md:translate-x-80 translate-x-20" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col pl-10 gap-7">
          {[
            { href: "#home", label: "Home" },
            { href: "#about", label: "About" },
            { href: "#project", label: "Project" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[18px] font-medium font-sans transition-all ease-in-out duration-500 hover:text-[#01DBC6] text-gray-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Hamburger button */}
      <button onClick={toggleHamburger} className="lg:hidden z-30">
        {isSideBarOpen ? (
          <HiX className="md:size-6 size-[16px] text-primaryDeepWine" />
        ) : (
          <TbAlignRight className="md:size-6 size-[16px] text-primaryDeepWine" />
        )}
      </button>
    </header>
  );
}
