'use client'

import Image from 'next/image';
import useBlurFadeIn from '../../hooks/useBlurFadeIn';

export default function ContactUsPage() {
  useBlurFadeIn();
  return (
    <main>
      <section
        className="relative h-[70vh] w-full bg-cover bg-center text-white flex items-end justify-center mt-[-100px]"
        style={{
          backgroundImage: "url('/header/fgpc_nagercoil.png')",
        }}
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10"></div>

        {/* Foreground Content */}
        <div className="relative z-20 p-10">
          <h1 className="font-montserrat mb-48 md:mb-24 text-6xl font-semibold text-white">Contact Us</h1>
        </div>
      </section>

      <section className="bg-white px-6 py-20 font-poppins text-[#222831]">
        <div className="container max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-semibold mb-6 font-montserrat blur_fade_in_up"><span className="text-[#84373D]">Connect</span> With Our Team</h2>
          <p className="mb-6 text-gray-700 blur_fade_in_up">
            We&apos;re here to assist you! Please contact us using the details below for any questions, prayer requests, feedback, or further information. We look forward to connecting with you soon!
          </p>
        </div>
        <div className="container max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div className="bg-[#f8f8f8] border border-[#DEDEDE] rounded-xl p-6 shadow-md max-w-xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 font-montserrat text-center blur_fade_in_up">Get in Touch with Us</h2>
            <form className="space-y-5 blur_fade_in_up">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-[#DEDEDE] rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#222831] custom-placeholder"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-[#DEDEDE] rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#222831] custom-placeholder"
              />

              <input
                type="tel"
                placeholder="Mobile No"
                className="w-full px-4 py-3 border border-[#DEDEDE] rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#222831] custom-placeholder"
              />

              <input
                type="text"
                placeholder="Address"
                className="w-full px-4 py-3 border border-[#DEDEDE] rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#222831] custom-placeholder"
              />

              <textarea
                placeholder="Prayer Request or Testimony (Text)"
                className="w-full px-4 py-3 border border-[#DEDEDE] rounded-[10px] h-32 resize-none focus:outline-none focus:ring-1 focus:ring-[#222831] custom-placeholder"
              ></textarea>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/3 bg-[#3E3E3E] text-[#DEDEDE] py-3 rounded-[10px] font-semibold hover:bg-[#313131] transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Contact Details */}
          <div className="font-poppins">
            <h2 className="text-3xl font-semibold mb-6 font-montserrat blur_fade_in_up">Contact Details</h2>
            <p className="mb-6 text-gray-700 blur_fade_in_up">
              For inquiries, support, or prayers, connect with us through the details below anytime for assistance
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Mobile */}
              <a href="tel:+919488484745" className="block hover:no-underline">
                <div className="flex items-center bg-white border rounded-[10px] p-4 shadow-sm hover:shadow-md transition duration-300 blur_fade_in_up">
                  <div className="bg-[#3E3E3E] text-[#DEDEDE] px-4 py-3 rounded-[10px] mr-4 hover:bg-[#84373D] transition duration-300">
                    <i className="fas fa-phone-alt text-lg transform rotate-90 cursor-pointer"></i>
                  </div>
                  <div>
                    <p className="font-medium text-lg">Mobile</p>
                    <p className="text-md text-[#555]">+91 9488484745</p>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=fgpcngl@gmail.com" className="block hover:no-underline">
                <div className="flex items-center bg-white border rounded-[10px] p-4 shadow-sm hover:shadow-md transition duration-300 blur_fade_in_up">
                  <div className="bg-[#3E3E3E] text-[#DEDEDE] px-4 py-3 rounded-[10px] mr-4 hover:bg-[#84373D] transition duration-300">
                    <i className="fas fa-envelope text-lg cursor-pointer"></i>
                  </div>
                  <div>
                    <p className="font-medium text-lg">Email</p>
                    <p className="text-md text-[#555]">fgpcngl@gmail.com</p>
                  </div>
                </div>
              </a>
            </div>

            {/* Address */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Full+Gospel+Pentecostal+Church+Nagercoil"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:no-underline"
            >
              <div className="flex bg-white border rounded-[10px] p-4 shadow-sm hover:shadow-md transition duration-300 mb-6 blur_fade_in_up">
                <div className="bg-[#3E3E3E] text-[#DEDEDE] px-4 py-3 h-14 rounded-[10px] mr-4 hover:bg-[#84373D] transition duration-300 flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-lg cursor-pointer inline-block"></i>

                </div>
                <div>
                  <p className="font-medium text-lg">Address</p>
                  <p className="text-md text-[#555] leading-relaxed">
                    Full Gospel Pentecostal Church,<br />
                    174, Church Street,<br />
                    Vettoornimadam, Nagercoil - 629 003,<br />
                    Kanyakumari District,<br />
                    Tamilnadu, India.
                  </p>
                </div>
              </div>
            </a>

            {/* Social Media Icons */}
            <div className="mt-6">
              <hr className="mb-4" />
              <div className="flex items-center justify-between blur_fade_in_up">
                <p className="font-semibold mb-0">Social Media:</p>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/fgpcnagercoil" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-[#3E3E3E] text-white rounded-[10px] hover:bg-[#84373D] transition duration-300">
                    <i className="fab fa-facebook-f text-md"></i>
                  </a>
                  <a href="https://www.instagram.com/fgpcnagercoil" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-[#3E3E3E] text-white rounded-[10px] hover:bg-[#84373D] transition duration-300">
                    <i className="fab fa-instagram text-md"></i>
                  </a>
                  <a href="https://www.youtube.com/@fgpcngl" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-[#3E3E3E] text-white rounded-[10px] hover:bg-[#84373D] transition duration-300">
                    <i className="fab fa-youtube text-md"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] px-6 py-20 font-poppins text-[#222831]">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-4xl font-montserrat font-extrabold mb-6 text-center blur_fade_in_up">
            Full Gospel Pentecostal Church <span className="text-[#84373d]">Nagercoil</span>
          </h2>

          <p className="mb-8 text-gray-700 max-w-4xl mx-auto leading-relaxed text-center blur_fade_in_up">
            Our location at <strong>174, Church Street, Vettoonimadam, Nagercoil - 629 003</strong>...
          </p>

          {/* Map and Distance side-by-side */}
          <div className="flex flex-col md:flex-row items-center max-5w-xl mx-auto mb-8 gap-8">
            {/* Map */}
            <div className="flex-shrink-0 w-full md:w-1/2 rounded-[10px] overflow-hidden shadow-lg blur_fade_in_up">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.1040276247836!2d77.4344110143367!3d8.18214379412862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0411763082506f%3A0x7bdc5a57e93a64e3!2sFull%20Gospel%20Pentecostal%20Church!5e0!3m2!1sen!2sin!4v1668432434976!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-[10px]"
              ></iframe>
            </div>

            {/* Distance Info */}
            <div className="w-full md:w-1/2 text-gray-800 text-base leading-relaxed">
              <ul className="space-y-6">
                <li className="flex items-center justify-between blur_fade_in_up">
                  <div className="flex items-center">
                    <i className="fas fa-bus text-[#84373d] mr-3 w-6 text-lg"></i>
                    2 km from Nagercoil Main Bus Stand
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&origin=Nagercoil+Main+Bus+Stand&destination=174+Church+Street+Vettoonimadam+Nagercoil+629003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#84373D] hover:bg-[#84373D] text-white text-sm px-3 py-1 rounded transition"
                  >
                    Directions
                  </a>
                </li>

                <li className="flex items-center justify-between blur_fade_in_up">
                  <div className="flex items-center">
                    <i className="fas fa-train text-[#84373d] mr-3 w-6 text-lg"></i>
                    2 km from Nagercoil Town Railway Station
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&origin=Nagercoil+Town+Railway+Station&destination=174+Church+Street+Vettoonimadam+Nagercoil+629003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#84373D] hover:bg-[#84373D] text-white text-sm px-3 py-1 rounded transition"
                  >
                    Directions
                  </a>
                </li>

                <li className="flex items-center justify-between blur_fade_in_up">
                  <div className="flex items-center">
                    <i className="fas fa-train text-[#84373d] mr-3 w-6 text-lg"></i>
                    5 km from Nagercoil Main Railway Station
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&origin=Nagercoil+Main+Railway+Station&destination=174+Church+Street+Vettoonimadam+Nagercoil+629003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#84373D] hover:bg-[#84373D] text-white text-sm px-3 py-1 rounded transition"
                  >
                    Directions
                  </a>
                </li>

                <li className="flex items-center justify-between blur_fade_in_up">
                  <div className="flex items-center">
                    <i className="fas fa-train text-[#84373d] mr-3 w-6 text-lg"></i>
                    20 km from Kanyakumari Railway Station
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&origin=Kanyakumari+Railway+Station&destination=174+Church+Street+Vettoonimadam+Nagercoil+629003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#84373D] hover:bg-[#84373D] text-white text-sm px-3 py-1 rounded transition"
                  >
                    Directions
                  </a>
                </li>

                <li className="flex items-center justify-between blur_fade_in_up">
                  <div className="flex items-center">
                    <i className="fas fa-plane text-[#84373d] mr-3 w-6 text-lg"></i>
                    70 km from Thiruvananthapuram Airport
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&origin=Thiruvananthapuram+Airport&destination=174+Church+Street+Vettoonimadam+Nagercoil+629003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#84373D] hover:bg-[#84373D] text-white text-sm px-3 py-1 rounded transition"
                  >
                    Directions
                  </a>
                </li>

                <li className="flex items-center justify-between blur_fade_in_up">
                  <div className="flex items-center">
                    <i className="fas fa-plane text-[#84373d] mr-3 w-6 text-lg"></i>
                    115 km from Tuticorin Airport
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&origin=Tuticorin+Airport&destination=174+Church+Street+Vettoonimadam+Nagercoil+629003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#84373D] hover:bg-[#84373D] text-white text-sm px-3 py-1 rounded transition"
                  >
                    Directions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Full+Gospel+Pentecostal+Church+Nagercoil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#84373D] text-white px-6 py-2 rounded-[10px] text-md font-semibold hover:bg-[#84373D] transition blur_fade_in_up"
            >
              Get Church Directions
            </a>
          </div>
        </div>
      </section>

    </main >
  );
}