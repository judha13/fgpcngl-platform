'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const images = [
    {
        src: '/ministries/upcoming-holy-spirit-meeting.jpg',
        label: 'Holy Spirit Meeting',
    },
    {
        src: '/songs/johnsam/um-nithiyai-solla-latest.jpg',
        label: 'Upcoming Johnsam Joyson Song',
    },
    {
        src: '/songs/davidsam/neer-indri-latest.webp',
        label: 'Upcoming Davidsam Joyson Song',
    },
]

export default function UpcomingSlider() {
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    useEffect(() => {
        document.body.style.overflow = previewImage ? 'hidden' : ''
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
            <div className="p-0 md:p-6">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{ clickable: true }}
                >
                    {images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="flex flex-col items-center justify-center space-y-8 m-10">
                                <Image
                                    src={img.src}
                                    alt={img.label} width={600}
                                    height={400} quality={100}
                                    className="rounded-xl object-cover cursor-pointer"
                                    onClick={() => setPreviewImage(img.src)}
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
