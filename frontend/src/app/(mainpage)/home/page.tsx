'use client'

import Image from 'next/image'
import Link from "next/link";
import ImageSlider from '../../components/ImageSlider';
import UpcomingSlider from '../../components/UpcomingSlider';
import useBlurFadeIn from '../../hooks/useBlurFadeIn';

export default function HomePage() {
  useBlurFadeIn();
  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-screen bg-cover bg-top text-white flex items-end justify-center mt-[-92px]"
        style={{
          backgroundImage: "url('/header/fgpc_nagercoil.png')", // fallback image
        }}
      >
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/home/fgpc_nagercoil_intro.jpg"
        >
          <source src="/home/fgpc_nagercoil_intro(33mb).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,_#000000CF_0%,_#00000066_100%)] opacity-[0.68] backdrop-blur-[2px] z-10"></div>

        {/* Foreground Content */}
        <div className="relative z-20 p-6 font-poppins">
          <div className="text-center md:mb-12 mb-14 blur-down">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white font-montserrat leading-snug">
              Full Gospel Pentecostal Church, Nagercoil
            </h1>

            {/* Description */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white font-normal px-2 sm:px-0">
              Together, we build the Kingdom of God through love, service, and faith, creating a community rooted in His grace
            </p>

            {/* Buttons - Always in Single Row */}
            <div className="mt-4 sm:mt-6 flex flex-row justify-center gap-3 sm:gap-4 text-sm sm:text-base flex-wrap">
              <a
                href="tel:+919488484745"
                className="px-3 sm:px-4 py-2 sm:py-3 bg-[#84373D] text-white rounded-[10px] shadow-md hover:bg-[#692A2F] transition duration-300 text-center"
              >
                <i className="fas fa-phone-alt rotate-90 mr-2"></i>
                9488484745
              </a>
              <a
                href="mailto:fgpcngl@gmail.com"
                className="px-3 sm:px-4 py-2 sm:py-3 bg-white text-[#84373D] rounded-[10px] hover:bg-[#EEEEEEFC] transition duration-300 text-center"
              >
                <i className="fas fa-envelope mr-2"></i>
                fgpcngl@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overlapping Welcome Container */}
      <div className="relative z-30 px-6 bg-white">
        <div className="-translate-y-12">
          <ImageSlider />
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 bg-white font-poppins text-[#222831]">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-20 items-center">

          {/* Left Column - Content (60%) */}
          <div className="order-2 md:order-1 md:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat leading-snug">
              <span className="text-[#84373d]">Full Gospel</span> Pentecostal Church
            </h2>

            <p className="text-[#212121] mt-4 text-base leading-relaxed text-justify">
              The ministry began in 1979 under Pastor Kristhudas Samuel. In 1987,
              Pastor Joyson took charge, leading the ministry with strong faith,
              commitment, and God’s vision. Over the years, the ministry has grown
              into a blessing for countless lives.
              <Link href="/aboutus">
                <span className="text-[#84373d] cursor-pointer"> Know More</span>
              </Link>
            </p>

            {/* Social Links */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: "fab fa-youtube", label: "fgpcngl", link: "https://www.youtube.com/@fgpcngl" },
                  { icon: "fab fa-instagram", label: "fgpcnagercoil", link: "https://www.instagram.com/fgpcnagercoil" },
                  { icon: "fab fa-facebook", label: "fgpcnagercoil", link: "https://www.facebook.com/fgpcnagercoil" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row items-center justify-center gap-2 p-2 
                   bg-[#F5F5F5] rounded-lg shadow hover:bg-[#84373D] hover:text-white 
                   cursor-pointer transition-colors duration-300 ease-in-out 
                   min-w-[120px]"
                  >
                    <i className={`${item.icon} text-xl`}></i>
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="p-5 border rounded-xl shadow-sm bg-[#ebebeb]">
                <h3 className="text-lg font-bold text-[#413b3b]">Started At</h3>
                <p className="text-sm mt-2 text-[#333]">
                  Ministry founded in 1979 by Pastor Kristhudas Samuel.
                </p>
              </div>

              <div className="p-5 border rounded-xl shadow-sm bg-[#413b3b] text-white">
                <h3 className="text-lg font-bold">Location</h3>
                <p className="text-sm mt-2">
                  174, Church Street, Vettoornimadam, Nagercoil-629003.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Pastor Image (40%) */}
          <div className="flex justify-center md:justify-end order-1 md:order-2 md:col-span-2">
            <Link href="/aboutus" className="relative group block">
              <Image
                src="/aboutus/about_1(pr.joyson).jpg"
                alt="Pastor Joyson"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl object-cover w-full max-w-md"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Pastor Johnsam Joyson Section */}
      <section className="py-20 bg-[#F5F5F5] font-poppins text-[#222831]">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-20 items-center">

          {/* Left Column - Pastor Image (40%) */}
          <div className="flex justify-center md:justify-center order-1 md:col-span-2">
            <Link href="/johnsamjoyson" className="relative group block">
              <Image
                src="/home/pr-johnsam_joyson.jpg"
                alt="Johnsam Joyson"
                width={384}
                height={512}
                quality={100}
                className="rounded-2xl cursor-pointer mx-auto block blur_fade_in_up"
              />
            </Link>
          </div>

          {/* Right Column - Content (60%) */}
          <div className="order-2 md:col-span-3">
            <h2 className="text-4xl font-bold font-montserrat mb-4 blur_fade_in_up">
              <span className="text-[#84373D]">Johnsam</span> Joyson
            </h2>
            <p className="text-[#212121] text-base leading-relaxed mb-6 text-justify blur_fade_in_up">
              Pr. Johnsam Joyson serves as the pastor of FGPC Church in Nagercoil.
              He began his ministry in <span className="text-[#84373D]">2007</span>. The Lord has given him many songs, and through these songs, he has been a blessing to many people.
              To know more about these songs, click the image below.
            </p>
            {/* Songs or Images Section */}
            <div className="flex gap-2 mb-6 overflow-x-auto blur_fade_in_up">
              {[
                {
                  src: "/songs/johnsam/johnsam_lyrical_thumbnail.jpg",
                  alt: "Song 1",
                  text: "Explore most popular songs",
                },
                {
                  src: "/songs/johnsam/johnsam_album_thumbnail.jpg",
                  alt: "Song 2",
                  text: "Explore greatest albums",
                },
                {
                  src: "/songs/johnsam/johnsam_recent_thumbnail.jpg",
                  alt: "Song 3",
                  text: "Discover latest hits",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative h-32 w-56 transition-all duration-300 ease-in-out hover:w-60 cursor-pointer group"
                >
                  <Link href="/Johnsamsamjoyson">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      quality={100}
                      unoptimized={item.alt === "Song 2"}
                      className="h-full w-full rounded-lg shadow-md object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 px-2 text-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg grid place-items-center">
                      <p>
                        {item.text}
                        <span className="underline decoration-red-800 ml-1">clicking here</span>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="mt-6">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-nowrap blur_fade_in_up">
                {[
                  { icon: "fab fa-youtube", label: "YouTube", link: "https://www.youtube.com/@johnsamjoyson" },
                  { icon: "fab fa-instagram", label: "Instagram", link: "https://www.instagram.com/johnsamjoyson_official" },
                  { icon: "fas fa-envelope", label: "Email", link: "https://mail.google.com/mail/?view=cm&fs=1&to=johnsam@gmail.com" },
                  { icon: "fab fa-facebook", label: "Facebook", link: "https://www.facebook.com/jjohnsam" },
                  { icon: "fab fa-spotify", label: "Spotify", link: "https://open.spotify.com/artist/6o64MUmOWLYUJkUTxpotPG" },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row items-center justify-center gap-2 p-2 bg-white rounded-lg shadow 
      hover:bg-[#84373D] hover:text-white cursor-pointer transition-colors duration-300 ease-in-out min-w-[120px] flex-shrink-0"
                  >
                    <i className={`${item.icon} text-xl`}></i>
                    <span className="text-xs font-medium">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Pastor Davidsam Joyson Section */}
      <section className="py-20 bg-[#FFFFFF] font-poppins text-[#222831]">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-20 items-center">

          {/* Left Column - Content (60%) */}
          <div className="order-2 md:order-1 md:col-span-3">
            <h2 className="text-4xl font-bold font-montserrat mb-4 blur_fade_in_up">
              <span className="text-[#84373D]">Davidsam</span> Joyson
            </h2>
            <p className="text-[#212121] text-base leading-relaxed mb-6 text-justify blur_fade_in_up">
              Pr. Davidsam Joyson serves as the pastor of FGPC Church in Nagercoil.
              He began his ministry in <span className="text-[#84373D]">2013</span>. The Lord has given him many songs, and through these songs, he has been a blessing to many people.
              To know more about these songs, click the image below.
            </p>

            {/* Songs or Images Section */}
            <div className="flex gap-2 mb-6 overflow-x-auto blur_fade_in_up">
              {[
                {
                  src: "/songs/davidsam/davidsam_famous.jpg",
                  alt: "Song 1",
                  text: "Explore most popular songs",
                },
                {
                  src: "/songs/davidsam/davidsam_jukebox.jpg",
                  alt: "Song 2",
                  text: "Explore greatest albums",
                },
                {
                  src: "/songs/davidsam/davidsam_recent.jpg",
                  alt: "Song 3",
                  text: "Discover latest hits",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative h-32 w-56 transition-all duration-300 ease-in-out hover:w-60 cursor-pointer group"
                >
                  <Link href="/davidsamjoyson">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      quality={100}
                      className="h-full w-full rounded-lg shadow-md object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 px-2 text-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg grid place-items-center">
                      <p>
                        {item.text}
                        <span className="underline decoration-red-700 ml-1">clicking here</span>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="mt-6">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-nowrap blur_fade_in_up">
                {[
                  { icon: "fab fa-youtube", label: "YouTube", link: "https://www.youtube.com/@davidsamjoyson1" },
                  { icon: "fab fa-instagram", label: "Instagram", link: "https://www.instagram.com/davidsam_joyson" },
                  { icon: "fas fa-envelope", label: "Email", link: "https://mail.google.com/mail/?view=cm&fs=1&to=davidsamjoyson@gmail.com" },
                  { icon: "fab fa-facebook", label: "Facebook", link: "https://www.facebook.com/jdavidsam.joyson" },
                  { icon: "fab fa-spotify", label: "Spotify", link: "https://open.spotify.com/artist/00b8jKD6HWIqU7xeEGgoev" },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row items-center justify-center gap-2 p-2 bg-[#F5F5F5] rounded-lg shadow 
                  hover:bg-[#84373D] hover:text-white cursor-pointer transition-colors duration-300 ease-in-out min-w-[120px] flex-shrink-0">
                    <i className={`${item.icon} text-xl`}></i>
                    <span className="text-xs font-medium blur_fade_in_up">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Pastor Image (40%) */}
          <div className="flex justify-center md:justify-end order-1 md:order-2 md:col-span-2">
            <Link href="/davidsamjoyson" className="relative group block">
              <Image
                src="/home/pr-davidsam_joyson.jpg"
                alt="Davidsam Joyson" width={384}
                height={512} quality={100} unoptimized={true}
                className="rounded-2xl object-cover cursor-pointer blur_fade_in_up"
              />
            </Link>
          </div>

        </div>
      </section>

      {/* Our Service Section */}
      <section
        className="relative py-24 bg-cover bg-center bg-fixed font-poppins"
        style={{ backgroundImage: "url('/home/background_blur.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Central Box Wrapper (Relative for positioning) */}
          <div className="relative max-w-3xl mx-auto">
            {/* Central Box */}
            <div className="bg-[#FFFFFFA8] backdrop-blur-md shadow-2xl p-6 text-center rounded-[10px] blur_fade_in_up">
              <div className="p-6 border-2 border-black rounded-[10px]">
                <h2
                  className="relative text-4xl md:text-7xl text-black drop-shadow-md mb-1 font-bold font-montserrat blur_fade_in_up"
                  style={{
                    WebkitTextFillColor: 'black', // Text fill
                    WebkitTextStrokeWidth: '25px',   // Stroke width
                    WebkitTextStrokeColor: '#0000000D', // Stroke color (light black)
                    position: 'relative',
                  }}
                >
                  Our Services
                </h2>
                {/* <div className="w-24 md:w-56 mx-auto mb-6" style={{ height: '2.8px', backgroundColor: '#84373D' }}></div> */}
                <div className="flex items-center justify-center mb-6 space-x-2 px-24 md:px-56">

                  {/* Solid line part */}
                  <div className="w-2" style={{ height: '2.8px', backgroundColor: '#84373D' }}></div>
                  <div className="w-2" style={{ height: '2.8px', backgroundColor: '#84373D' }}></div>
                  <div className="flex-1" style={{ height: '2.8px', backgroundColor: '#84373D' }}></div>
                </div>

                <p className="md:text-base text-black mb-3 blur_fade_in_up">
                  <strong>Sunday 1st Service:</strong> 6:00AM - 8:30AM
                </p>
                <p className="md:text-base text-black mb-3 blur_fade_in_up">
                  <strong>Sunday 2nd Service:</strong> 10:00AM - 12:30PM
                </p>
                <p className="md:text-base text-black mb-3 blur_fade_in_up">
                  <strong>Monday Bible Study:</strong> 7:00PM - 8:30PM
                </p>
                <p className="md:text-base text-black mb-3 blur_fade_in_up">
                  <strong>Friday Fasting Prayer:</strong> 10:00AM - 1:00PM
                </p>
                <p className="md:text-base text-black blur_fade_in_up">
                  <strong>Saturday Night Worship:</strong> 7:00PM - 8:30PM
                </p>
                <p className='text-black pt-4 blur_fade_in_up'>
                  Know More About the Other Services
                  <Link href="/ministries" className="relative group text-[#84373D] font-bold inline-block hover:underline pl-2">
                    CLICK HERE &gt;&gt;
                  </Link>
                </p>
              </div>
            </div>

            {/* Floating Images aligned to the edges */}
            {/* Sunday Service */}
            <div className="absolute md:-top-8 -top-12 -left-2 md:-left-16 w-40 md:w-56 rounded-xl border-3 border-white p-1 overflow-visible transform hover:scale-105 transition duration-300 animate-move bg-white">
              <Link href="/ministries">
                <Image
                  src="/home/sunday_service.jpg"
                  alt="Sunday Service"
                  width={800}
                  height={500} quality={100}
                  className="rounded-lg blur_fade_in_up"
                  style={{ boxShadow: '5px 11px 15px 1px rgba(0,0,0,0.3)' }}
                />
              </Link>
            </div>

            {/* Fasting Prayer */}
            <div className="absolute md:-top-8 -top-12 -right-2 md:-right-16 w-40 md:w-56 rounded-xl border-3 border-white p-1 overflow-visible transform hover:scale-105 transition duration-300 animate-move bg-white">
              <Link href="/ministries">
                <Image
                  src="/home/fasting_prayer.jpg"
                  alt="Fasting Prayer" width={800}
                  height={500} quality={100}
                  className="rounded-lg blur_fade_in_up"
                  style={{ boxShadow: '5px 11px 15px 1px rgba(0,0,0,0.3)' }}
                />
              </Link>
            </div>

            {/* Bible Study */}
            <div className="absolute md:-bottom-8 -bottom-12 -left-2 md:-left-16 w-40 md:w-56 rounded-xl border-3 border-white p-1 overflow-visible transform hover:scale-105 transition duration-300 animate-move bg-white">
              <Link href="/ministries">
                <Image
                  src="/home/bible_study.jpg"
                  alt="Bible Study" width={800}
                  height={500} quality={100}
                  className="rounded-lg blur_fade_in_up"
                  style={{ boxShadow: '5px 11px 15px 1px rgba(0,0,0,0.3)' }}
                />
              </Link>
            </div>

            {/* Saturday Worship */}
            <div className="absolute md:-bottom-8 -bottom-12 -right-2 md:-right-16 w-40 md:w-56 rounded-xl border-3 border-white p-1 overflow-visible transform hover:scale-105 transition duration-300 animate-move bg-white">
              <Link href="/ministries">
                <Image
                  src="/home/saturday_worship.jpg"
                  alt="Saturday Worship" width={800}
                  height={500} quality={100}
                  className="rounded-lg blur_fade_in_up"
                  style={{ boxShadow: '5px 11px 15px 1px rgba(0,0,0,0.3)' }}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-center font-montserrat text-gray-900 blur_fade_in_up">
            Next <span className="text-[#84373D]">Upcoming</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center blur_fade_in_up">
            {/* LEFT COLUMN */}
            <UpcomingSlider />

            {/* RIGHT COLUMN - Event & Song Details */}
            <div className="space-y-4 max-w-xl mx-auto mt-8 md:mt-0">
              {/* Event Card */}
              <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-4 flex gap-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <Image
                  src="/ministries/upcoming-holy-spirit-meeting.jpg"
                  alt="Event Thumbnail" width={112}
                  height={112} quality={100}
                  className="w-28 md:w-20 h-full rounded-xl object-cover flex-shrink-0 shadow-sm blur_fade_in_up"
                />
                <div className="flex-1 flex flex-col justify-center blur_fade_in_up">
                  <h3 className="text-2xl md:text-xl font-semibold text-gray-900 mb-2 leading-snug">
                    Holy Spirit Meeting 2025
                  </h3>
                  <p className="text-gray-700 text-base md:text-sm mb-1">
                    <span className="font-semibold text-gray-900">Place:</span> FGP Church, Nagercoil
                  </p>
                  <p className="text-gray-700 text-base md:text-sm mb-1">
                    <span className="font-semibold text-gray-900">Date & Time:</span> Aug 25th - Aug 29th, 10.00 Am
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Live Stream:</span>{' '}
                    <a
                      href="https://www.youtube.com/watch?v=EYXvcpGSfsk&list=PLJQgwS6Zt5q_f1qjrGwiQ0zczT2AHhqkS"
                      className="text-[#84373D] underline hover:text-[#a95058] transition-colors duration-300"
                      aria-label="Watch Live Stream"
                    >
                      Watch Here
                    </a>
                  </p>
                </div>
              </div>

              {/* Song Card 1 */}
              <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-4 flex gap-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <Image
                  src="/songs/johnsam/um-nithiyai-solla-latest.jpg"
                  alt="Johnsam Joyson Song" width={112}
                  height={112} quality={100}
                  className="w-28 md:w-20 h-full rounded-xl object-cover flex-shrink-0 shadow-sm blur_fade_in_up"
                />
                <div className="flex-1 flex flex-col justify-center blur_fade_in_up">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-snug">Song Release {`"UM NEETHIYAI"`}</h3>
                  <p className="text-gray-700 text-base md:text-sm mb-1">
                    <span className="font-semibold text-gray-900">Sung By:</span> Johnsam Joyson
                  </p>
                  <p className="text-gray-700 text-base md:text-sm mb-1">
                    <span className="font-semibold text-gray-900">Released On:</span> August 17th, 2025, 6:00 PM
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Listen Soon:</span>{' '}
                    <a
                      href="https://youtu.be/CwjJXGy0nkQ?si=RkfOTHqAQQTao2FM"
                      target="_blank"
                      rel="noopener noreferrer">
                      <span className="text-[#84373D] font-semibold">Watch Here</span>
                    </a>
                  </p>
                </div>
              </div>

              {/* Song Card 2 */}
              <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-4 flex gap-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <Image
                  src="/songs/davidsam/neer-indri-latest.webp"
                  alt="Davidsam Joyson Song" width={112}
                  height={112} quality={100}
                  className="w-28 md:w-20 h-full rounded-xl object-cover flex-shrink-0 shadow-sm blur_fade_in_up"
                />
                <div className="flex-1 flex flex-col justify-center blur_fade_in_up">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-snug">Song Release {`"NEERINDRI"`}</h3>
                  <p className="text-gray-700 text-base md:text-sm mb-1">
                    <span className="font-semibold text-gray-900">Sung By:</span> Davidsam Joyson
                  </p>
                  <p className="text-gray-700 text-base md:text-sm mb-1">
                    <span className="font-semibold text-gray-900">Released On:</span> Jun 28th, 2025, 6:30 PM
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Listen Soon:</span>{' '}
                    <a href="https://youtu.be/3OtDemZ68bA?si=CfVkPZiT-azowRx4"
                      target="_blank"
                      rel="noopener noreferrer">
                      <span className="text-[#84373D] font-semibold">Watch Here</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-6 font-poppins">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">

            {/* Left Column - Sermons */}
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-montserrat font-bold text-gray-800 mb-6 blur_fade_in_up">Sermons</h2>
              <div className="relative flex items-center justify-center mb-6 image_card blur_fade_in_up">
                {/* Left Side Image */}
                <div className="absolute -left-6 sm:-left-10 md:-left-16">
                  <Image
                    src="/home/bible_study.jpg"
                    alt="Sermon Left"
                    width={224}
                    height={256} quality={100}
                    className="w-32 h-40 sm:w-40 sm:h-48 md:w-56 md:h-64 rounded-xl side-card object-cover rotate_image_left"
                  />
                </div>

                {/* Main Image */}
                <div className="z-10">
                  <Image
                    src="/home/kingdom-sermon.jpg"
                    alt="Main Sermon"
                    width={320}
                    height={320} quality={100}
                    className="w-48 h-56 sm:w-64 sm:h-72 md:w-80 md:h-80 rounded-2xl main-card object-right object-cover image_zoom_out"
                  />
                </div>

                {/* Right Side Image */}
                <div className="absolute -right-6 sm:-right-10 md:-right-16">
                  <Image
                    src="/home/saturday_worship.jpg"
                    alt="Sermon Right"
                    width={224}
                    height={256} quality={100}
                    className="w-32 h-40 sm:w-40 sm:h-48 md:w-56 md:h-64 rounded-xl side-card object-cover rotate_image_right"
                  />
                </div>
              </div>

              <p className="text-gray-700 text-base blur_fade_in_up">
                Explore a collection of life-changing sermons that uplift, guide your faith, and strengthen
                spiritual growth. Start watching now{" "}
                <Link href="/sermons" className="text-[#84373D] font-semibold hover:underline">
                  CLICK HERE &gt;&gt;
                </Link>
              </p>
            </div>

            {/* Right Column - Gallery */}
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-bold font-montserrat text-gray-800 mb-6 blur_fade_in_up">Gallery</h2>
              <div className="relative flex items-center justify-center mb-6 image_card blur_fade_in_up">
                {/* Left Side Image */}
                <div className="absolute -left-6 sm:-left-10 md:-left-16">
                  <Image
                    src="/home/kids_fest.jpg"
                    alt="Gallery Left"
                    width={224}
                    height={256} quality={100}
                    className="w-32 h-40 sm:w-40 sm:h-48 md:w-56 md:h-64 rounded-xl side-card object-cover object-right rotate_image_left"
                  />
                </div>

                {/* Main Image */}
                <div className="z-10">
                  <Image
                    src="/home/august_fasting_prayer.jpg"
                    alt="Main Gallery"
                    width={320}
                    height={320} quality={100}
                    className="w-48 h-56 sm:w-64 sm:h-72 md:w-80 md:h-80 rounded-2xl main-card object-cover image_zoom_out"
                  />
                </div>

                {/* Right Side Image */}
                <div className="absolute -right-6 sm:-right-10 md:-right-16">
                  <Image
                    src="/home/Fr. Berchmans.jpg"
                    alt="Gallery Right"
                    width={224}
                    height={256} quality={100}
                    className="w-32 h-40 sm:w-40 sm:h-48 md:w-56 md:h-64 rounded-xl side-card object-cover object-left rotate_image_right"
                  />
                </div>
              </div>

              <p className="text-gray-700 text-base blur_fade_in_up">
                Get a glimpse of the highlights from our special meetings captured in photos. Explore the
                gallery now{" "}
                <Link href="/gallery" className="text-[#84373D] font-semibold hover:underline">
                  CLICK HERE &gt;&gt;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}