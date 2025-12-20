'use client'

import VideoCarousel from '../../components/VideoCarousel';
import Image from 'next/image';
import useBlurFadeIn from '../../hooks/useBlurFadeIn';

export default function DavidsamJoysonPage() {
  useBlurFadeIn();
  return (
    <main>
      <section
        className="relative h-[70vh] w-full bg-cover bg-center text-white flex items-end justify-center mt-[-100px]"
        style={{
          backgroundImage: "url('https://img.youtube.com/vi/IBeV4VmJeSY/maxresdefault.jpg')",
        }}
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-10"></div>
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
                src="/songs/davidsam/neer-indri-latest.webp"
                alt="Davidsam Joyson"
                width={384}
                height={512}
                quality={100}
                className="rounded-2xl object-cover cursor-pointer blur_fade_in_up"
              />
            </div>

            {/* RIGHT COLUMN - 60% */}
            <div className="w-full lg:w-[60%] space-y-4 mx-auto mt-8 md:mt-0">

              {/* Song Card 1 */}
              <div className="bg-[#ECECEC5E] border border-[#DEDEDE] rounded-[10px] shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col sm:flex-row overflow-hidden blur_fade_in_up">

                {/* LEFT: Thumbnail */}
                <div className="w-full sm:w-[40%] aspect-video relative overflow-hidden">
                  <a
                    href="https://youtu.be/3OtDemZ68bA?si=CfVkPZiT-azowRx4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <Image
                      src="https://img.youtube.com/vi/3OtDemZ68bA/maxresdefault.jpg"
                      alt="NEERINDRI Thumbnail"
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </a>
                </div>

                {/* RIGHT: Info */}
                <div className="w-full sm:w-[60%] flex flex-col justify-center p-4">
                  <h5
                    className="truncate max-w-full sm:max-w-[200px] bg-[#84373D] text-sm font-normal px-3 py-2 text-center rounded-[10px] font-montserrat text-white mb-2"
                    title="நீரின்றி நான் உயிர் வாழ"
                  >
                    நீரின்றி நான் உயிர் வாழ
                  </h5>
                  <p className="text-base font-normal text-[#222831] leading-snug">
                    {`"NEERINDRI"`} was released on June 28th, 2025.{' '}
                    <a
                      href="https://youtu.be/3OtDemZ68bA?si=CfVkPZiT-azowRx4"
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
                    href="https://youtu.be/xK2iVLP7PN4?si=cUEgWiQ8ax6F7_iN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <Image
                      src="https://img.youtube.com/vi/xK2iVLP7PN4/maxresdefault.jpg"
                      alt="UMMAI POLA Thumbnail"
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </a>
                </div>

                {/* RIGHT: Info */}
                <div className="w-full sm:w-[60%] flex flex-col justify-center p-4">
                  <h5
                    className="truncate max-w-full sm:max-w-[200px] bg-[#84373D] text-sm font-normal px-3 py-2 text-center rounded-[10px] font-montserrat text-white mb-2"
                    title="உம்மை போல யாரும் இல்லையே"
                  >
                    உம்மை போல யாரும் இல்லையே
                  </h5>
                  <p className="text-base font-normal text-[#222831] leading-snug">
                    {`"UMMAI POLA YARUMILLAYE"`} was released on April 13th, 2025.{' '}
                    <a
                      href="https://youtu.be/xK2iVLP7PN4?si=cUEgWiQ8ax6F7_iN"
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
                    href="https://youtu.be/IBeV4VmJeSY?si=yaUYMocQLnaj9GzL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <Image
                      src="https://img.youtube.com/vi/IBeV4VmJeSY/maxresdefault.jpg"
                      alt="ENNIL UNDANA Thumbnail"
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </a>
                </div>

                {/* RIGHT: Info */}
                <div className="w-full sm:w-[60%] flex flex-col justify-center p-4">
                  <h5
                    className="truncate max-w-full sm:max-w-[200px] bg-[#84373D] text-sm font-normal px-3 py-2 text-center rounded-[10px] font-montserrat text-white mb-2"
                    title="என்னில் உண்டான நன்மை"
                  >
                    என்னில் உண்டான நன்மை
                  </h5>
                  <p className="text-base font-normal text-[#222831] leading-snug">
                    {`"ENNIL UNDANA"`} was released on March 1st, 2025.{' '}
                    <a
                      href="https://youtu.be/IBeV4VmJeSY?si=yaUYMocQLnaj9GzL"
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

      {/* Popular Hits Section */}
      <VideoCarousel
        title="Popular Hits"
        videoIds={[
          "7x3-0nQ5IQo",
          "Yl59Sv-SxHQ",
          "rq6C58TUIN0",
          "JjRdQKJI0_k",
          "O8Of7NmLzU0",
          "dDy27Hna-qc",
          "xfRniJVF6ms",
          "DAYWOcP-rpo",
          "KXaqACJfwZ4",
          "hJqbY471JAE"
        ]}
      />
      {/* Latest Hits Section */}
      <VideoCarousel
        title="Latest Hits"
        videoIds={[
          "xK2iVLP7PN4",
          "3OtDemZ68bA",
          "5bULZLA_DUM",
          "IBeV4VmJeSY",
          "DdMrp5hobXY",
          "fjgdeTSQtgE",
          "XTuvsf6J4K8",
          "hJqbY471JAE",
          "iqOw2XiM76Y",
          "oymrUlDGOzE",
          "R53rpp7oSvA",
          "Ryul0JlwofE"
        ]}
      />
      {/* Oldest Hits Section */}
      <VideoCarousel
        title="Oldest Hits"
        videoIds={[
          "war437D-xOM",
          "w__DfdSpqlw",
          "ptw9m0TkwL4",
          "7x3-0nQ5IQo",
          "rq6C58TUIN0",
          "DAYWOcP-rpo",
          "mCdMsP6jkX8",
          "JjRdQKJI0_k",
          "hgYMJaXuqSo",
          "mbjTCvz9hNc",
          "rUoiaAc9VyE"
        ]}
      />
      <div className='bg-white pb-20'></div>
    </main>
  );
}