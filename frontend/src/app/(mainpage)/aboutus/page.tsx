'use client'

import Image from 'next/image';
import useBlurFadeIn from '../../hooks/useBlurFadeIn';

export default function AboutPage() {
  useBlurFadeIn();
  return (
    <main>
      {/* Hero Section */}
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
          <h1 className="font-montserrat mb-48 md:mb-24 text-6xl font-semibold text-white">
            About Us
          </h1>
        </div>
      </section>

      {/* Section 1 - Text Columns */}
      <section className="py-20 bg-white text-[#222831] font-poppins">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold mb-8 md:mb-4 w-full md:w-3/4 font-montserrat blur_fade_in_up">
            The Early Struggles and Faithful Journey of <span className="text-[#84373d]">FGP Church Nagercoil</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 leading-relaxed text-justify">
            <p className='blur_fade_in_up'>
              In the year 1979, <span className="text-[#84373d]">Pastor Kristhudas Samuel </span> start this ministry.
              In the early days of this ministry, there were trials, struggles, and many weaknesses.
              During this time, Pastor Kristhudas Samuel went to the Dharmapuri ministry.
              God wants the ministry to keep going smoothly, without any stops.
              The ministry belongs to the Lord — no one can stop what He intends to do.
            </p>
            <p className='blur_fade_in_up'>
              On July 17, 1987, <span className="text-[#84373d]">Pastor Joyson </span> came to Nagercoil with his family and took responsibility for the ministry.
              At that time, the ministry consisted of a small church with floors cleaned using cow dung, only two families, and many health problems within the families.
              During these tough times, God gave him a vision. After that, he continued his ministry with strong faith and hope
            </p>
          </div>
        </div>

        <div className="container mt-16 mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Column - Video */}
          <div className="overflow-hidden shadow-lg rounded-2xl blur_fade_in_up">
            <div className="aspect-video w-full rounded-2xl">
              <iframe
                className="w-full h-full rounded-2xl"
                src="https://www.youtube.com/embed/Vr_VyqHqlqY"
                title="FGPC Nagercoil Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Right Column - Text */}
          <div>
            <h2 className="text-2xl font-bold mb-6 font-montserrat blur_fade_in_up">
              <span className="text-[#84373d]">Vision and Guidance: </span> The Journey of Our New Church
            </h2>
            <p className="mb-4 text-justify blur_fade_in_up">
              In this video, the pastor shares the vision for the new church, highlights God&apos;s guidance throughout the journey, and reflects on the blessings experienced during the church&apos;s development.
            </p>
            <blockquote className="w-full block border-l-4 border-[#84373d] pl-6 py-2 italic text-gray-700 font-semibold text-justify blur_fade_in_up">
              &quot;நம்முடைய தாழ்வில் நம்மை நினைத்தவரைத் துதியுங்கள்; அவர் கிருபை என்றுமுள்ளது.&quot; - சங்கீதம் : 136:23
            </blockquote>

          </div>
        </div>
      </section>

      {/* Section - About with Images */}
      <section className="py-20 bg-[#f0f0f0] text-[#222831] font-poppins">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">

          {/* Left Column */}
          <div>
            <h2 className="text-4xl font-bold font-montserrat blur_fade_in_up">
              <span className="text-[#84373d]">GOD&apos;S</span> Unchanging Purpose Through All Time
            </h2>
          </div>

          {/* Right Column */}
          <div>
            <p className="text-lg leading-relaxed blur_fade_in_up text-justify">
              This ministry, carried forward with strong faith and hope, grew steadily under God&apos;s guidance.
              On November 21, 2016, Pastor Joyson&apos;s earthly journey came to an end. While his tenure ended, God&apos;s purpose remained steadfast; He entrusted the ministry to his sons, Johnsam and Davidsam.
              Under their leadership, the ministry is thriving and blessing many people.
            </p>
          </div>
        </div>

        {/* Image Row */}
        <div className="container mx-auto px-6 max-w-6xl mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Image
            src="/aboutus/about_1(pr.joyson).jpg"
            alt="About 1"
            width={300}
            height={200}
            sizes="(max-width: 768px) 100vw, 300px"
            className="rounded-xl shadow-md object-cover w-full h-auto transform transition-transform duration-200 hover:scale-105"

          />
          <Image
            src="/aboutus/aboutus_2.jpg"
            alt="About 2"
            width={300}
            height={200}
            sizes="(max-width: 768px) 100vw, 300px"
            className="rounded-xl shadow-md object-cover w-full h-auto transform transition-transform duration-200 hover:scale-105"

          />
          <Image
            src="/aboutus/aboutus_3.jpg"
            alt="About 3"
            width={300}
            height={200}
            sizes="(max-width: 768px) 100vw, 300px"
            className="rounded-xl shadow-md object-cover w-full h-auto transform transition-transform duration-200 hover:scale-105"

          />
          <Image
            src="/aboutus/aboutus_4.jpg"
            alt="About 4"
            width={300}
            height={200}
            sizes="(max-width: 768px) 100vw, 300px"
            className="rounded-xl shadow-md object-cover w-full h-auto transform transition-transform duration-200 hover:scale-105"

          />
        </div>
      </section>

      {/* Professional Timeline Section (Compact Desktop) */}
      <section className="py-14 md:py-20 bg-gray-50 font-poppins relative">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#222831] font-montserrat blur_fade_in_up">
            Milestones of Faith: <span className="text-[#84373d]"> Our Church Journey</span>
          </h2>
          <p className="text-center max-w-2xl mx-auto mb-12 md:mb-14 text-gray-600 leading-relaxed text-sm md:text-base blur_fade_in_up">
            Do not despise small beginnings, for the Lord rejoices to see the work begin. (Zechariah 4:10)
          </p>

          {/* Timeline Wrapper */}
          <div className="relative">
            {/* Vertical Gradient Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-[#84373d] to-gray-300"></div>

            {/* Timeline Item 1 */}
            <div className="mb-12 flex flex-col md:flex-row items-center md:justify-between relative">
              {/* Left Text Card */}
              <div className="md:w-5/12 text-right pr-4 md:pr-8 blur_fade_in_up">
                <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300">
                  <h3 className="text-2xl font-semibold text-[#84373d] mb-1">1987</h3>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                    In 1987, the church began in a humble shed. The ministry started with just two families, facing many challenges, but continued by faith and God&apos;s grace.
                  </p>
                </div>
              </div>

              {/* Center Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#84373d] border-4 border-white rounded-full shadow-md z-10"></div>

              {/* Right Image */}
              <div className="md:w-5/12 mt-4 md:mt-0 blur_fade_in_up">
                <Image
                  src="/aboutus/fgpc-nagercoil-1987.jpg"
                  alt="Timeline 2025" width={800}
                  height={256}
                  className="object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="mb-12 flex flex-col md:flex-row items-center md:justify-between relative">
              {/* Left Image */}
              <div className="md:w-5/12 md:order-1 order-2 mt-4 md:mt-0 blur_fade_in_up">
                <Image
                  src="/aboutus/fgpc-nagercoil-1994.jpg"
                  alt="Timeline 2015" width={800}
                  height={256}
                  className="object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Center Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#84373d] border-4 border-white rounded-full shadow-md z-10"></div>

              {/* Right Text Card */}
              <div className="md:w-5/12 md:order-2 order-1 text-left pl-4 md:pl-8 blur_fade_in_up">
                <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300">
                  <h3 className="text-2xl font-semibold text-[#84373d] mb-1">1994</h3>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                    In 1994, by God&apos;s grace, church walls were built with the help of believers who made the bricks themselves in faith.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="mb-12 flex flex-col md:flex-row items-center md:justify-between relative">
              {/* Left Text Card */}
              <div className="md:w-5/12 text-right pr-4 md:pr-8 blur_fade_in_up">
                <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300">
                  <h3 className="text-2xl font-semibold text-[#84373d] mb-1">2010</h3>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                    Through God&apos;s blessing on the ministry, a new and spacious church was built in 2010 to accommodate over 500 people.
                  </p>
                </div>
              </div>

              {/* Center Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#84373d] border-4 border-white rounded-full shadow-md z-10"></div>

              {/* Right Image */}
              <div className="md:w-5/12 mt-4 md:mt-0 blur_fade_in_up">
                <Image
                  src="/aboutus/fgpc-nagercoil-2010.jpg"
                  alt="Timeline 2005" width={800}
                  height={256}
                  className="object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="mb-12 flex flex-col md:flex-row items-center md:justify-between relative">
              {/* Left Image */}
              <div className="md:w-5/12 md:order-1 order-2 mt-4 md:mt-0 blur_fade_in_up">
                <Image
                  src="/aboutus/fgpc-nagercoil-2017.jpg"
                  alt="Timeline 2015" width={800}
                  height={256}
                  className="object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Center Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#84373d] border-4 border-white rounded-full shadow-md z-10"></div>

              {/* Right Text Card */}
              <div className="md:w-5/12 md:order-2 order-1 text-left pl-4 md:pl-8 blur_fade_in_up">
                <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300">
                  <h3 className="text-2xl font-semibold text-[#84373d] mb-1">2017</h3>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify">
                    According to God&apos;s vision and guidance, the current church was built and inaugurated in 2017.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
