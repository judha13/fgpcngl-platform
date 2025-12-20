'use client'

import Image from 'next/image';
import useBlurFadeIn from '../../hooks/useBlurFadeIn';

export default function SermonsPage() {
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
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10"></div>
        <div className="relative z-20 p-10">
          <h1 className="font-montserrat mb-48 md:mb-24 text-6xl font-semibold text-white">
            Sermons
          </h1>
        </div>
      </section>

      {/* Playlist Section */}
      <section className="py-16 bg-white font-poppins">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-semibold mb-10 font-montserrat text-[#222831] blur_fade_in_up">Playlists</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              {
                title: "கிருபையும் சத்தியமும் - DAILY MANNA",
                url: "https://www.youtube.com/watch?v=apjIeXpfZ3A&list=PLJQgwS6Zt5q8dZtSNywJ9wfmpVPVRkG3F",
                img: "https://img.youtube.com/vi/apjIeXpfZ3A/maxresdefault.jpg",
              },
              {
                title: "MESSAGE - JOHNSAM JOYSON",
                url: "https://www.youtube.com/watch?v=2wQJjQ51xsE&list=PLJQgwS6Zt5q8uCMQYyUt0wHF6zaG7sUho",
                img: "https://img.youtube.com/vi/_RTCmkYcnko/maxresdefault.jpg",
              },
              {
                title: "MESSAGE - DAVIDSAM JOYSON",
                url: "https://www.youtube.com/watch?v=HQXhSBMjqec&list=PLJQgwS6Zt5q9V6_E7V2qL70QhBaS6zbJM",
                img: "https://img.youtube.com/vi/F99g9l_87wU/maxresdefault.jpg",
              },
              {
                title: "MONTHLY PROMISE WORD - 2025",
                url: "https://www.youtube.com/watch?v=3jo1q-tNBmM&list=PLJQgwS6Zt5q8turWt1NMBe7fYfveM_yW7",
                img: "https://img.youtube.com/vi/3jo1q-tNBmM/maxresdefault.jpg",
              },
              {
                title: "MESSAGE - JOHNSAM JOYSON - 2025",
                url: "https://www.youtube.com/watch?v=3wXpak0uEEA&list=PLJQgwS6Zt5q_jZMn8EcvZ0XP3izHfeunr",
                img: "https://img.youtube.com/vi/S4saj1LheNY/maxresdefault.jpg",
              },
              {
                title: "MESSAGE - DAVIDSAM JOYSON - 2025",
                url: "https://www.youtube.com/watch?v=pZqvg2PMet0&list=PLJQgwS6Zt5q_pihyJCPCTSAd_58CW1J3i",
                img: "https://img.youtube.com/vi/bhTgI8GTZdU/maxresdefault.jpg",
              },
              {
                title: "AUGUST PRAYER MESSAGE - 2024 (ஜெயம்)",
                url: "https://www.youtube.com/watch?v=iWAdvDNTcW0&list=PLJQgwS6Zt5q__Xj0zPYqZ2jofA_fGfoGZ",
                img: "https://img.youtube.com/vi/1LY3fqt6HJk/maxresdefault.jpg",
              },
              {
                title: "MONTHLY PROMISE WORD - 2024",
                url: "https://www.youtube.com/watch?v=i5ozVEM4jHw&list=PLJQgwS6Zt5q8ajMD7V0WbQH0bLprdXxHm",
                img: "https://img.youtube.com/vi/i5ozVEM4jHw/maxresdefault.jpg",
              },
              {
                title: "BIBLE STUDY - 2024 (கிறிஸ்துவின் சாயல்)",
                url: "https://www.youtube.com/watch?v=1-nbsgFlxS0&list=PLJQgwS6Zt5q-xh5pa1iG_g13bPj4tXr2z",
                img: "https://img.youtube.com/vi/1-nbsgFlxS0/maxresdefault.jpg",
              },
              {
                title: "MONTHLY PROMISE WORD - 2023",
                url: "https://www.youtube.com/watch?v=CI8mVYot-j0&list=PLJQgwS6Zt5q_9Hsau-_NCmLJ202Jk55xk",
                img: "https://img.youtube.com/vi/4Q7Iwi5Dejg/maxresdefault.jpg",
              },
              {
                title: "AUGUST PRAYER MESSAGE - 2023 (வாக்குத்தத்தம்)",
                url: "https://www.youtube.com/watch?v=ZeQ8-3jR8ps&list=PLJQgwS6Zt5q-5jBEYE5ne4Ry-wJg088Uk",
                img: "https://img.youtube.com/vi/K-tleyKM9lQ/maxresdefault.jpg",
              },
              {
                title: "AUGUST PRAISE AND WORSHIP - 2023",
                url: "https://www.youtube.com/watch?v=KtTEvata6Ik&list=PLJQgwS6Zt5q9Xi1cYkcfcC0qSncnDUBC7",
                img: "https://img.youtube.com/vi/KtTEvata6Ik/maxresdefault.jpg",
              },
              {
                title: "BIBLE STUDY - 2023 (இயேசுவிடம் கற்றுக்கொள்ளுங்கள்)",
                url: "https://www.youtube.com/watch?v=lXERuqaavXs&list=PLJQgwS6Zt5q9j3UeceiV7D3KdOeBTQb9g",
                img: "https://img.youtube.com/vi/lXERuqaavXs/maxresdefault.jpg",
              },
              {
                title: "MONTHLY PROMISE WORD - 2022",
                url: "https://www.youtube.com/watch?v=LYLWNWAblZs&list=PLJQgwS6Zt5q950vYNeYLGPHj29IpPcUwo",
                img: "https://img.youtube.com/vi/OG6CetWFmPs/maxresdefault.jpg",
              },
              {
                title: "AUGUST PRAYER MESSAGE - 2022  (ஜெபம்)",
                url: "https://www.youtube.com/watch?v=MtD7HMiv8E4&list=PLJQgwS6Zt5q-LU6eICHYaY-rkqJUo0smK",
                img: "https://img.youtube.com/vi/MtD7HMiv8E4/maxresdefault.jpg",
              },
              {
                title: "BIBLE STUDY - 2022 (இயேசுவிடம் கற்றுக்கொள்ளுங்கள்)",
                url: "https://www.youtube.com/watch?v=bOY0zYtg_kY&list=PLJQgwS6Zt5q_zrMeVjMD6rJ1QxucltVNW",
                img: "https://img.youtube.com/vi/6lHnFsTNp9Q/maxresdefault.jpg",
              },
              {
                title: "MONTHLY PROMISE WORD - 2021",
                url: "https://www.youtube.com/watch?v=6l8_OfeeSfg&list=PLJQgwS6Zt5q84Kj_JybaTuCkHr6RzKMzi",
                img: "https://img.youtube.com/vi/6l8_OfeeSfg/maxresdefault.jpg",
              },
              {
                title: "AUGUST MESSAGE - 2021 (இயேசு கிறிஸ்துவின் அற்புதங்கள்)",
                url: "https://www.youtube.com/watch?v=vMNmLvd1Vk0&list=PLJQgwS6Zt5q-8iHQkqZfG-TxEKPSdhMiM",
                img: "https://img.youtube.com/vi/vMNmLvd1Vk0/maxresdefault.jpg",
              },
              {
                title: "BIBLE STUDY - 2021",
                url: "https://www.youtube.com/watch?v=lG72pttxwTk&list=PLJQgwS6Zt5q8BmSQwCbWVbPpTSEiVBjCS",
                img: "https://img.youtube.com/vi/lG72pttxwTk/maxresdefault.jpg",
              },
              {
                title: "MESSAGE - ஆசாரிய வஸ்திரம்",
                url: "https://www.youtube.com/watch?v=H9V2CG0xuvg&list=PLJQgwS6Zt5q8rGNXDEBHI_sydWUQ_7QlK",
                img: "https://img.youtube.com/vi/H9V2CG0xuvg/maxresdefault.jpg",
              },
            ].map((playlist, i) => (
              <a
                key={i}
                href={playlist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#F7F7F7] border border-[#DEDEDE] rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition pt-2 blur_fade_in_up"
              >
                {/* First blurred section */}
                <div className="flex justify-center">
                  <div className="w-[75%] rounded-t-lg overflow-hidden">
                    <div className="relative h-2 rounded-t-lg overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${playlist.img})` }}
                      />
                      <div className="absolute inset-0 backdrop-blur-md bg-black/20 rounded-t-lg" />
                    </div>
                  </div>
                </div>

                {/* Second blurred section (rotated 180°) */}
                <div className="flex justify-center">
                  <div className="w-[85%] rounded-t-lg overflow-hidden">
                    <div className="relative h-8 rounded-t-lg overflow-hidden transform rotate-180">
                      <div
                        className="absolute inset-0 bg-cover bg-center bottom-0"
                        style={{ backgroundImage: `url(${playlist.img})` }}
                      />
                      <div className="absolute inset-0 backdrop-blur-md border-t-[1px] border-white bg-black/30 rotate-180 rounded-t-lg" />
                    </div>
                  </div>
                </div>

                {/* Clear Thumbnail Image */}
                <div className="w-full h-64 md:h-40 p-2 -mt-8 relative z-10 rounded-lg overflow-hidden">
                  <Image
                    src={playlist.img}
                    alt={playlist.title} width={400}
                    height={250}
                    className="w-full h-full object-cover rounded-lg shadow-md border-t-[1px] border-white"
                  />
                </div>
                {/* Text Content */}
                <div className="px-4 pb-4 pt-2">
                  <h3 className="text-base font-semibold text-gray-800  leading-snug mb-2">
                    {playlist.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 hover:text-[#84373D] transition">
                    View full playlist
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
