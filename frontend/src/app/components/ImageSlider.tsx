'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function ImageSlider() {
  const images = [
    'new_year(2025)-1', 'new_year(2025)-2', 'new_year(2025)-3',
    'new_year(2025)-4', 'new_year(2025)-5', 'new_year(2025)-6',
    'new_year(2025)-7', 'new_year(2025)-8', 'new_year(2025)-9',
    'new_year(2025)-10'
  ]

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    if (previewImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [previewImage])

  const PreviewModal = () =>
    createPortal(
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
        onClick={() => setPreviewImage(null)}
      >
        <div
          className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={previewImage!}
            alt="Preview"
              width={400}
              height={320} quality={100}  
            className="rounded-xl shadow-lg object-contain"
          />
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-2 right-2 text-white text-3xl hover:text-[#EEEEEEFC] transition"
          >
            <i className="fas fa-times-circle"></i>
          </button>

        </div>
      </div>,
      document.getElementById('modal-root') as HTMLElement
    )

  return (
    <>
      <div className="bg-white p-4 md:p-5 rounded-xl shadow-[0px_1px_10px_0px_rgba(0,0,0,0.26)] backdrop-blur-sm max-w-6xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={6.5}
          spaceBetween={5}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1000}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 2.5, spaceBetween: 10 },      // Mobile: 2 slides
            640: { slidesPerView: 4.5, spaceBetween: 10 }, // Small tablets: ~3.5 slides
            1024: { slidesPerView: 6.5, spaceBetween: 5 }, // Desktop: default
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-24 md:h-32 rounded overflow-hidden cursor-pointer">
                <Image
                  src={`/gallery/2025/${img}.jpg`}
                  alt={`Slide ${index + 1}`}
                  fill quality={100}
                  className="object-cover"
                  onClick={() => setPreviewImage(`/gallery/2025/${img}.jpg`)}
                />
              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {previewImage && <PreviewModal />}
    </>
  )
}
