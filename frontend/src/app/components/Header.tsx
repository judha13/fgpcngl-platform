'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-[#222222CC] text-[#DEDEDE] py-2 md:py-2 top-4 z-50 shadow sticky max-w-4xl mx-4 md:mx-auto mt-3 rounded-lg">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-3 font-poppins">
                {/* Logo */}
                <div className="flex items-center flex-shrink-0 bg-[#3E3E3E] rounded-[10px] p-[0px] md:p-[6px]">
                    <Link href="/home">
                        <Image
                            src="/header/fgpc_nagercoil_logo.jpg"
                            alt="Scott School logo"
                            className="w-10 h-10 rounded-[10px]"
                            width={40}
                            height={40}
                        />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden bg-[#3E3E3E] px-3 py-2 rounded-[10px] md:flex space-x-2 mx-auto">
                    {["Home", "About Us", "Ministries", "Sermons", "Songs", "Gallery", "Contact Us"].map((item) => {
                        if (item === "Songs") {
                            return (
                                <div key="Songs" className="relative group">
                                    <button className="bg-[#3E3E3E] border border-[#4E4E4E] hover:border-white px-3 py-2 rounded-[10px] text-[14px] font-normal">
                                        Songs ▾
                                    </button>
                                    <div className="absolute left-0 top-full mt-2 ml-[-20px] w-60 bg-[#3E3E3E] text-[#DEDEDE] rounded-[10px] border border-[#4E4E4E] shadow-lg z-50
                      opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible
                      transition-all duration-300 ease-in-out px-2 py-2">
                                        <Link href="/johnsamjoyson" className="block px-4 py-1 hover:text-white">Johnsam Joyson</Link>
                                        <Link href="/davidsamjoyson" className="block px-4 py-1 hover:text-white">Davidsam Joyson</Link>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase().replace(/\s/g, "")}`}
                                className="bg-[#3E3E3E] border border-[#4E4E4E] hover:border-white px-3 py-2 rounded-[10px] text-[14px] font-normal"
                            >
                                {item}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right side */}
                <div className="flex items-center bg-[#3E3E3E] px-2 py-1 rounded-[10px]">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-[#DEDEDE] focus:outline-none"
                    >
                        {isMenuOpen ? (
                            // Close Icon
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger Icon
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>

                    {/* Register Button */}
                    <Link
                        href="/home"
                        className="hidden md:flex bg-[#3E3E3E] border border-[#4E4E4E] hover:border-white px-3 py-2 rounded-[10px] text-[14px] font-normal"
                    >
                        Kid&apos;s Fest
                    </Link>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <nav
                    className="fixed top-[75px] left-25 right-3 bg-[#2C2C2C] rounded-[10px] shadow-2xl z-50 md:hidden transform scale-100 opacity-100 transition-all duration-300 ease-in-out"
                >
                    <div className="flex flex-col divide-y divide-[#4E4E4E]/50">
                        {[
                            { label: "Home", href: "/home" },
                            { label: "About Us", href: "/aboutus" },
                            { label: "Ministries", href: "/ministries" },
                            { label: "Johnsam Joyson Songs", href: "/johnsamjoyson" },
                            { label: "Davidsam Joyson Songs", href: "/davidsamjoyson" },
                            { label: "Sermons", href: "/sermons" },
                            { label: "Gallery", href: "/gallery" },
                            { label: "Contact Us", href: "/contactus" },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="px-5 py-3 text-[#DEDEDE] text-[15px] tracking-wide hover:bg-[#3A3A3A] transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}
