'use client'

import VideoCarousel from '../../components/VideoCarousel';
import Image from 'next/image'

export default function JohnsamJoysonPage() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative h-[70vh] w-full bg-cover bg-center text-white flex items-end justify-center mt-[-100px]"
        style={{
          backgroundImage: "url('https://img.youtube.com/vi/A76WsWUWsa4/maxresdefault.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-10"></div>
      </section>

      {/* Upcoming Section */}
      <section className="pt-20 pb-10 bg-white font-poppins">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className='flex justify-between'>
            <h2 className="text-4xl font-bold text-start font-montserrat text-[#222831] mb-8 blur_fade_in_up">
              Upcoming
            </h2>
            <h5 className="hidden sm:block text-xl font-semibold border border-[#222831] p-1 rounded-[10px] text-end font-montserrat text-[#222831] mb-8 blur_fade_in_up">
              Recent Songs
            </h5>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-1 md:gap-10">
            {/* LEFT COLUMN - 40% */}
            <div className="w-full lg:w-[40%] flex justify-center md:justify-start">
              <Image
                src="/songs/johnsam/um-nithiyai-solla-latest.jpg"
                alt="Johnsam Joyson"
                width={384}
                height={512}
                quality={100}
                className="rounded-2xl object-cover cursor-pointer"
              />
            </div>

            {/* RIGHT COLUMN - 60% */}
            <div className="w-full lg:w-[60%] space-y-4 mx-auto mt-8 md:mt-0">

              {/* Song Card 1 */}
              <div className="bg-[#ECECEC5E] border border-[#DEDEDE] rounded-[10px] shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col sm:flex-row overflow-hidden blur_fade_in_up">

                {/* LEFT: Thumbnail */}
                <div className="w-full sm:w-[40%] aspect-video relative overflow-hidden">
                  <a
                    href="https://youtu.be/CwjJXGy0nkQ?si=RkfOTHqAQQTao2FM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <Image
                      src="https://img.youtube.com/vi/CwjJXGy0nkQ/maxresdefault.jpg"
                      alt="Song Thumbnail"
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </a>
                </div>

                {/* RIGHT: Song Info */}
                <div className="w-full sm:w-[60%] flex flex-col justify-center p-4">
                  <h5
                    className="truncate max-w-full sm:max-w-[200px] bg-[#84373D] text-sm font-normal px-3 py-2 text-center rounded-[10px] font-montserrat text-white mb-2"
                    title="உம் நீதியை சொல்ல"
                  >
                    உம் நீதியை சொல்ல
                  </h5>
                  <p className="text-base font-normal text-[#222831] leading-snug">
                    {`"UM NEETHIYAI"`} was released on August 17th, 2025.{' '}
                    <a
                      href="https://youtu.be/CwjJXGy0nkQ?si=RkfOTHqAQQTao2FM"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#84373D] underline hover:text-[#a95058]"
                    >
                      Listen Now &gt;&gt;
                    </a>
                  </p>
                </div>
              </div>

              {/* Song Card 2 */}
              <div className="bg-[#ECECEC5E] border border-[#DEDEDE] rounded-[10px] shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col sm:flex-row overflow-hidden blur_fade_in_up">

                {/* LEFT: Thumbnail */}
                <div className="w-full sm:w-[40%] aspect-video relative overflow-hidden">
                  <a
                    href="https://youtu.be/A76WsWUWsa4?si=h2FoE9_G3LPrliVn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <Image
                      src="https://img.youtube.com/vi/A76WsWUWsa4/maxresdefault.jpg"
                      alt="Song Thumbnail"
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </a>
                </div>

                {/* RIGHT: Song Info */}
                <div className="w-full sm:w-[60%] flex flex-col justify-center p-4">
                  <h5
                    className="truncate max-w-full sm:max-w-[200px] bg-[#84373D] text-sm font-normal px-3 py-2 text-center rounded-[10px] font-montserrat text-white mb-2"
                    title="ஊற்றுத் தண்ணீரே"
                  >
                    ஊற்றுத் தண்ணீரே
                  </h5>
                  <p className="text-base font-normal text-[#222831] leading-snug">
                    {`"OOTRU THANNEERAE"`} was released on July 20th, 2025.{' '}
                    <a
                      href="https://youtu.be/A76WsWUWsa4?si=h2FoE9_G3LPrliVn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#84373D] underline hover:text-[#a95058]"
                    >
                      Listen Now &gt;&gt;
                    </a>
                  </p>
                </div>
              </div>

              {/* Song Card 3 */}
              <div className="bg-[#ECECEC5E] border border-[#DEDEDE] rounded-[10px] shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col sm:flex-row overflow-hidden blur_fade_in_up">

                {/* LEFT: Thumbnail */}
                <div className="w-full sm:w-[40%] aspect-video relative overflow-hidden">
                  <a
                    href="https://youtu.be/70b4BGn49pY?si=xaIzMfN1nCChrerZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <Image
                      src="https://img.youtube.com/vi/70b4BGn49pY/maxresdefault.jpg"
                      alt="Song Thumbnail"
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </a>
                </div>

                {/* RIGHT: Song Info */}
                <div className="w-full sm:w-[60%] flex flex-col justify-center p-4">
                  <h5
                    className="truncate max-w-full sm:max-w-[200px] bg-[#84373D] text-sm font-normal px-3 py-2 text-center rounded-[10px] font-montserrat text-white mb-2"
                    title="நானோ கார்த்தாவே"
                  >
                    நானோ கார்த்தாவே
                  </h5>
                  <p className="text-base font-normal text-[#222831] leading-snug">
                    {`"NAANO KAARTHAVAE"`} was released on February 28th, 2025.{' '}
                    <a
                      href="https://youtu.be/70b4BGn49pY?si=xaIzMfN1nCChrerZ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#84373D] underline hover:text-[#a95058]"
                    >
                      Listen Now &gt;&gt;
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Karunaiyin Pravaagam */}
      <VideoCarousel
        title="Karunaiyin Pravaagam"
        videoIds={[
          'vxumNV9Nh7k',
          'rG1pfJvFTkI',
          'RwO4wU0ezPg',
          'yQcQxr-s2dg',
        ]}
      />
      {/* Popular Hits Section */}
      <VideoCarousel
        title="Popular Hits"
        videoIds={[
          'CaN80mKV3DY',
          't2hZ93ZrbLM',
          '1lRfwHi9l8c',
          '1qI6vzK4iIg',
          'tTefyFZfr9o',
          '6tTt_I-y2B0',
          'xUSErIyMsDM',
          'nvBqFKgGrcw',
          '57xfvUyVtJc',
          'R3W6wnvVcG4',
        ]}
      />
      {/* Latest Hits Section */}
      <VideoCarousel
        title="Latest Hits"
        videoIds={[
          'CwjJXGy0nkQ',
          'A76WsWUWsa4',
          '70b4BGn49pY',
          'FpLUts44-uA',
          'xd92aDQ9Ia4',
          '57xfvUyVtJc',
          'vHKF6UFFaOo',
          'fJmLLbrpbG0',
          'tTefyFZfr9o',
          'URM9otV9lAo',
          'WLcCliUJcP8',
          'xUSErIyMsDM',
        ]}
      />
      {/* Oldest Hits Section */}
      <VideoCarousel
        title="Oldest Hits"
        videoIds={[
          'cSrBC3muE_Y',
          'CaN80mKV3DY',
          '6tTt_I-y2B0',
          'iVX518rP0V0',
          'yQcQxr-s2dg',
          'mhd-Yz8fk50',
          'v0GDXQxS3RA',
          't2hZ93ZrbLM',
          'd4bGlqGP-SQ',
          '1qI6vzK4iIg'
        ]}
      />
      <div className='bg-white pb-20'></div>
    </main >
  );
}
