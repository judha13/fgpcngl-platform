'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import useBlurFadeIn from '../hooks/useBlurFadeIn';
import type { NavigationOptions } from 'swiper/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface VideoCarouselProps {
  title: string;
  videoIds: string[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ title, videoIds }) => {
  // Create refs for buttons
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  useBlurFadeIn();
  return (
    <section className="py-4 bg-white font-poppins">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title + Arrows */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-medium font-poppins text-[#222831] mb-4 text-start blur_fade_in_up">
            {title}
          </h2>

          {/* Navigation Arrows */}
          <div className="flex space-x-3 mb-2 blur_fade_in_up">
            <button
              ref={prevRef}
              className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 text-lg"
            >
              &lt;
            </button>
            <button
              ref={nextRef}
              className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 text-lg"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          onBeforeInit={(swiper) => {
            if (prevRef.current && nextRef.current) {
              const navigation = swiper.params.navigation as NavigationOptions | undefined;

              swiper.params.navigation = {
                ...(navigation ?? {}),
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              };
            }
          }}
          breakpoints={{
            300: { slidesPerView: 2.2 },
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
            1280: { slidesPerView: 4.2 },
          }}
        >
          {videoIds.map((id, index) => (
            <SwiperSlide key={index}>
              <a
                href={`https://www.youtube.com/watch?v=${id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                  alt="Video Thumbnail"
                  className="w-full rounded-lg shadow-md hover:opacity-90 transition"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default VideoCarousel;
