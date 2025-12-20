'use client'

import Image from 'next/image';
import { useState } from 'react';
import useBlurFadeIn from '../../hooks/useBlurFadeIn';

const meetings = [
  {
    title: "September Month Promise",
    description:
      "The service held on September 1st, 2025, is now available online",
    link: "https://www.youtube.com/live/yEJYNUhVevc?si=H6XVYhTwwEurc-dP",
    thumbnail: "https://img.youtube.com/vi/yEJYNUhVevc/maxresdefault.jpg",
  },
  {
    title: "Holy Spirit Meeting",
    description: "Watch the 5-Day Holy Spirit Meeting through this playlist",
    link: "https://www.youtube.com/live/EYXvcpGSfsk?si=26s8S9Gy44B8ztAo",
    thumbnail: "https://img.youtube.com/vi/EYXvcpGSfsk/maxresdefault.jpg",
  },
  {
    title: "August Fasting Prayer",
    description:
      "Watch all the August Month Fasting Prayer Services in this playlist",
    link: "https://www.youtube.com/watch?v=j_3BXGGcrSs&list=PLJQgwS6Zt5q_WUa5bRwiPw2HeoCqcJKVd",
    thumbnail: "https://img.youtube.com/vi/AZ0I52C_A9s/maxresdefault.jpg",
  },
];

const services = [
  {
    title: "Sunday Service",
    img: "/home/sunday_service.jpg",
    desc: "Join us every Sunday for worship and teaching.",
    firstService: "6 AM - 8:30 AM",
    secondService: "10 AM - 12.30 PM",
    place: "FGP Church Nagercoil",
    liveLinks: {
      "2023 - Live playlist": "https://www.youtube.com/watch?v=fLwnpVFqdLs&list=PLJQgwS6Zt5q-m-7-DFNwL7o6P6hL4_ykO",
      "2024 - Live playlist": "https://www.youtube.com/watch?v=fLwnpVFqdLs&list=PLJQgwS6Zt5q-m-7-DFNwL7o6P6hL4_ykO",
      "2025 - Live playlist": "https://www.youtube.com/watch?v=WZRHS3tYy60&list=PLJQgwS6Zt5q-JXmcDj29HRGYOwxvJYIdt",
    },
  },
  {
    title: "Fasting Prayer",
    img: "/home/fasting_prayer.jpg",
    desc: "Join us every Friday at 10 AM for worship and prayer.",
    time: "10 AM - 1 PM",
    place: "FGP Church Nagercoil",
    liveLinks: {
      "2025 - Live playlist": "https://www.youtube.com/watch?v=P6srFGNlzfs&list=PLJQgwS6Zt5q8uDD8Vwzief-uKodYrAULf",
      "2024 - Live playlist": "https://www.youtube.com/watch?v=GpGaJ2YSQq0&list=PLJQgwS6Zt5q9zTi7TbgTb7w6of0ehoG6W",
      "2023 - Live playlist": "https://www.youtube.com/watch?v=GpGaJ2YSQq0&list=PLJQgwS6Zt5q9zTi7TbgTb7w6of0ehoG6W",
    },
  },
  {
    title: "Saturday Worship",
    img: "/home/saturday_worship.jpg",
    desc: "Join us every Saturday at 7 PM for worship.",
    time: "7 PM - 8:30 PM",
    place: "FGP Church Nagercoil",
    liveLinks: {
      "2023 - Live playlist": "https://www.youtube.com/watch?v=Mm9VQNiHn4Y&list=PLJQgwS6Zt5q8uTL1X03kuEGfNhKIU21xM",
      "2024 - Live playlist": "https://www.youtube.com/watch?v=blTswarZn3Y&list=PLJQgwS6Zt5q8DoTzc-EYM0IRVK6Nw1M1F",
      "2025 - Live playlist": "https://www.youtube.com/watch?v=ummQqaUOjW8&list=PLJQgwS6Zt5q9PFL0tZ1C2BR1yzPYABJ27",
    },
  },
  {
    title: "Bible Study",
    img: "/home/bible_study.jpg",
    desc: "Join us every Monday at 7 PM for teaching.",
    time: "7 PM - 8:30 PM",
    place: "FGP Church Nagercoil",
    liveLinks: {
      "2024 - கிறிஸ்துவின் சாயல்": "https://www.youtube.com/watch?v=1-nbsgFlxS0&list=PLJQgwS6Zt5q-xh5pa1iG_g13bPj4tXr2z",
      "2023 - இயேசுவிடம் கற்றுக்கொள்ளுங்கள்": "https://www.youtube.com/watch?v=lXERuqaavXs&list=PLJQgwS6Zt5q9j3UeceiV7D3KdOeBTQb9g",
      "2022 - இயேசுவிடம் கற்றுக்கொள்ளுங்கள்": "https://www.youtube.com/watch?v=bOY0zYtg_kY&list=PLJQgwS6Zt5q_zrMeVjMD6rJ1QxucltVNW",
    },
  },
];

export default function MinistriesPage() {
  const [openModal, setOpenModal] = useState<null | number>(null);
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
            Ministries
          </h1>
        </div>
      </section>

      {/* Upcoming Section */}
      <section className="py-20 bg-white font-poppins">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className='flex justify-between'>
            <h2 className="text-4xl font-bold text-start font-montserrat text-[#222831] mb-8 blur_fade_in_up">
              Upcoming
            </h2>
            <h5 className="hidden sm:block text-xl font-semibold border border-[#222831] p-1 rounded-[10px] text-end font-montserrat text-[#222831] mb-8 blur_fade_in_up">
              Recent Live
            </h5>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-1 md:gap-10">
            {/* LEFT COLUMN - 40% */}
            <div className="w-full lg:w-[40%] flex justify-center md:justify-start">
              <Image
                src="/ministries/upcoming-holy-spirit-meeting.jpg"
                alt="Upcoming Meeting"
                width={384}
                height={512}
                quality={100}
                className="rounded-2xl object-cover cursor-pointer"
              />
            </div>

            {/* RIGHT COLUMN - 60% */}
            <div className="w-full lg:w-[60%] space-y-4 mx-auto mt-8 md:mt-0">
              {meetings.map((meeting, index) => (
                <div
                  key={index}
                  className="bg-[#ECECEC5E] border border-[#DEDEDE] rounded-[10px] shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col sm:flex-row overflow-hidden blur_fade_in_up"
                >
                  {/* LEFT: Thumbnail */}
                  <div className="w-full sm:w-[40%] aspect-video relative overflow-hidden">
                    <a
                      href={meeting.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                      <Image
                        src={meeting.thumbnail}
                        alt={meeting.title}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                    </a>
                  </div>

                  {/* RIGHT: Info */}
                  <div className="w-full sm:w-[60%] flex flex-col justify-center p-4">
                    <h5
                      className="truncate max-w-full sm:max-w-[200px] bg-[#84373D] text-sm font-normal px-3 py-2 text-center rounded-[10px] font-montserrat text-white mb-2"
                      title={meeting.title}
                    >
                      {meeting.title}
                    </h5>
                    <p className="text-base font-normal text-[#222831] leading-snug">
                      {meeting.description}{" "}
                      <a
                        href={meeting.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#84373D] underline hover:text-[#a95058]"
                      >
                        Watch Now &gt;&gt;
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F9F9F9] font-poppins">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <h2 className="text-5xl font-semibold text-center font-montserrat text-[#222831] mb-12 blur_fade_in_up">
            Our Services
          </h2>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative group rounded-[15px] overflow-hidden shadow-md hover:shadow-xl transition duration-300 blur_fade_in_up"
              >
                {/* Background Image */}
                <div className="relative w-full h-60">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-transform duration-300 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm mb-4">{service.desc}</p>
                  <button
                    onClick={() => setOpenModal(index)}
                    className="inline-block px-4 py-2 bg-[#84373D] text-white text-sm font-semibold rounded-lg shadow hover:bg-[#a95058] hover:scale-105 transition-transform duration-300"
                  >
                    More Details — Click Here
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {openModal !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 relative flex flex-col md:flex-row gap-4">
              {/* Close Button */}
              <button
                className="z-10 text-2xl absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={() => setOpenModal(null)}
              >
                ×
              </button>

              {/* Left Column: Image */}
              <div className="w-full md:w-1/2 h-64 relative rounded-lg overflow-hidden">
                <Image
                  src={services[openModal].img}
                  alt={services[openModal].title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Right Column: Info */}
              <div className="w-full md:w-1/2 flex flex-col justify-center p-4 text-[#222831]">
                <h3 className="text-2xl font-semibold mb-2">
                  {services[openModal].title}
                </h3>

                {/* Service Times */}
                {services[openModal].firstService && services[openModal].secondService ? (
                  <>
                    <p className="mb-2">
                      <span className="font-semibold">1st Service:</span> {services[openModal].firstService}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">2nd Service:</span> {services[openModal].secondService}
                    </p>
                  </>
                ) : (
                  <p className="mb-2">
                    <span className="font-semibold">Time:</span> {services[openModal].time}
                  </p>
                )}

                {/* Optional Place */}
                {services[openModal].place && (
                  <p className="mb-4">
                    <span className="font-semibold">Place:</span> {services[openModal].place}
                  </p>
                )}

                {/* Description */}
                <p className="mb-4">{services[openModal].desc}</p>

                {/* Live Video Links */}
                <div className="flex flex-wrap gap-2">
                  {Object.entries(services[openModal].liveLinks).map(([year, link]) => (
                    <a
                      key={year}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#84373D] text-white rounded hover:bg-[#a95058] text-sm font-semibold"
                    >
                      {year}
                    </a>
                  ))}
                </div>

              </div>
            </div>
          </div>
        )}
      </section>

      <section className="py-20 bg-white font-poppins">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-semibold text-center font-montserrat text-[#222831] mb-12 blur_fade_in_up">
            Weekly Ministries
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Daily Worship & Prayer",
                subtitle: "(All)",
                time: "Every Sunday - Friday\n6.00 PM - 7.00 PM"
              },
              {
                title: "Sunday School",
                subtitle: "(Below 21 years)",
                time: "Every Sunday\n8.30 AM - 10 AM"
              },
              {
                title: "Kid's Meeting",
                subtitle: "(School Kids)",
                time: "3rd Sunday\n4 PM - 5:30 PM"
              },
              {
                title: "Youth Meeting",
                subtitle: "(Boys)",
                time: "1st & 3rd Sunday\n7 PM - 8.30 PM"
              },
              {
                title: "Youth Meeting",
                subtitle: "(Girls)",
                time: "2nd & 4th Sunday\n12.30 PM - 2 PM"
              },
              {
                title: "National Prayer",
                subtitle: "(All)",
                time: "Every Wednesday\n7 PM - 8.30 PM"
              },
              {
                title: "Men's Prayer",
                subtitle: "(All Men)",
                time: "Every Friday\n9 PM - 10 PM"
              },
              {
                title: "Women's Prayer",
                subtitle: "(All Women)",
                time: "Every Saturday\n10 AM - 1 PM"
              },
              {
                title: "Nehemiah Ministries",
                subtitle: "(Men)",
                time: "Every Sunday\n3 PM - 6 PM"
              }
            ].map((ministry, index) => (
              <div
                key={index}
                className="bg-[#ebebeb] rounded-[10px] shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between border border-gray-200 blur_fade_in_up"
              >
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-[#222831]">{ministry.title}</h3>
                  <p className="text-sm text-gray-500">{ministry.subtitle}</p>
                </div>
                <div className="bg-[#413b3b] text-white text-center py-4 rounded-b-[10px]">
                  {ministry.time.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}