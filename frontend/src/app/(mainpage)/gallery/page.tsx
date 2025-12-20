'use client'

import Image from 'next/image';
import useBlurFadeIn from '../../hooks/useBlurFadeIn';

export default function GalleryPage() {
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
          <h1 className="font-montserrat mb-48 md:mb-24 text-6xl font-semibold text-white">Gallery</h1>
        </div>
      </section>

      <section className="py-20 bg-[#E0E0E0] text-[#222831] font-poppins">
        <div className="container mx-auto px-6 max-w-6xl mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { src: '/gallery/gallery_thumbnails/new_year_thumbnail.jpg', alt: 'Gallery 9' },
            { src: '/gallery/gallery_thumbnails/youth_fest.jpg', alt: 'Gallery 1' },
            { src: '/gallery/gallery_thumbnails/vbs_thumbnail.jpg', alt: 'Gallery 2' },
            { src: '/gallery/gallery_thumbnails/fasting_prayer.jpg', alt: 'Gallery 3' },
            { src: '/gallery/gallery_thumbnails/holy_spirit_thumbnail.jpg', alt: 'Gallery 4' },
            { src: '/gallery/gallery_thumbnails/kids_fest.jpg', alt: 'Gallery 5' },
            { src: '/gallery/gallery_thumbnails/special_worship.jpg', alt: 'Gallery 6' },
            { src: '/gallery/gallery_thumbnails/Fr.Berchmans.jpg', alt: 'Gallery 7' },
            { src: '/gallery/gallery_thumbnails/sunday_school_aniversary.jpg', alt: 'Gallery 8' },
          ].map((img, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.02]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={300}
                height={200}
                className="w-full h-full object-cover blur_fade_in_up"
              />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}