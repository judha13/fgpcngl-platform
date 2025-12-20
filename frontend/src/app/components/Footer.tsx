'use client'

import Image from 'next/image';
import Link from "next/link";
import useBlurFadeIn from '../hooks/useBlurFadeIn';

const socialLinks = [
    { href: "https://www.facebook.com/fgpcnagercoil", icon: "facebook" },
    { href: "https://www.instagram.com/fgpcnagercoil", icon: "instagram" },
    { href: "https://www.youtube.com/@fgpcngl", icon: "youtube" },
];
export default function Footer() {
    useBlurFadeIn();
    return (
        <footer className="font-poppins">
            {/* Top Footer Section */}
            <div className="bg-[#3E3E3E] text-[#DEDEDE] py-14 px-4 md:px-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_0.8fr_1.1fr_1fr] gap-8">
                    {/* Logo + About */}
                    <div className="text-center flex flex-col items-center">
                        <Link href="/home">
                                <Image
                                    src="/header/fgpc_nagercoil_logo.jpg"
                                    alt="FGPC Logo" width={80} height={80}
                                    className="rounded-[10px] mb-4 blur_fade_in_up"
                                />
                        </Link>
                        <div className="flex space-x-4 mt-2 blur_fade_in_up">
                            {socialLinks.map(({ href, icon }) => (
                                <a
                                    key={icon}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white text-3xl"
                                >
                                    <i className={`fab fa-${icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 font-montserrat text-white blur_fade_in_up">QUICK LINKS</h3>
                        <ul className="space-y-2 text-base font-poppins blur_fade_in_up">
                            <li><Link href="/aboutus" className="hover:text-white">About Us</Link></li>
                            <li><Link href="/ministries" className="hover:text-white">Ministries</Link></li>
                            <li><Link href="/sermons" className="hover:text-white">Sermons</Link></li>
                            <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
                            <li><Link href="/contactus" className="hover:text-white">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 font-montserrat text-white blur_fade_in_up">ADDRESS</h3>
                        <p className="text-base font-poppins leading-relaxed blur_fade_in_up">
                            Full Gospel Pentecostal Church,<br />
                            174, Church Street,<br />
                            Vettoornimadam, Nagercoil-629 003,<br />
                            Kanyakumari District,<br />
                            Tamilnadu, India.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 font-montserrat text-white blur_fade_in_up">CONTACT US</h3>
                        <p className="text-base font-poppins flex items-center gap-3 blur_fade_in_up">
                            <i className="fas fa-envelope"></i>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=fgpcngl@gmail.com" className="hover:text-white">fgpcngl@gmail.com</a>
                        </p>
                        <p className="text-base font-poppins mt-2 flex items-center gap-3 blur_fade_in_up">
                            <i className="fas fa-phone-alt rotate-90"></i>
                            <a href="tel:+914652229379" className="hover:text-white">04652 229379</a>
                        </p>
                        <p className="text-base font-poppins mt-2 flex items-center gap-3 blur_fade_in_up">
                            <i className="fas fa-mobile-alt"></i>
                            <a href="tel:+919488484745" className="hover:text-white">+91 94884 84745</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="bg-[#DEDEDE] text-[#222831] py-4 px-4 md:px-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-[16px] font-normal">
                    <p className="mb-2 md:mb-0 blur_fade_in_up">
                        © {new Date().getFullYear()} FGPC Nagercoil. All Rights Reserved.
                    </p>
                    <div className="space-x-4 blur_fade_in_up">
                        <a href="#" className="hover:text-[#3E3E3E]">Privacy Policy</a>
                        <span>|</span>
                        <a href="#" className="hover:text-[#3E3E3E]">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
