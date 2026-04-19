"use client";

import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { CamperImage } from "@/lib/types";

export function GalleryCarousel({ images, camperName }: { images: CamperImage[]; camperName: string }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const sortedImages = [...images].sort((firstImage, secondImage) => firstImage.order - secondImage.order);

  return (
    <div className="gallery">
      <Swiper
        modules={[Thumbs]}
        loop={false}
        spaceBetween={27}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="gallery__main"
      >
        {sortedImages.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div className="gallery__main-frame">
              <Image
                src={image.original}
                alt={`${camperName} photo ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 638px"
                className="gallery__image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbsSwiper}
        watchSlidesProgress
        freeMode
        spaceBetween={32}
        slidesPerView={4}
        className="gallery__thumbs"
      >
        {sortedImages.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div className="gallery__thumb-frame">
              <Image
                src={image.thumb}
                alt={`${camperName} thumbnail ${index + 1}`}
                fill
                sizes="160px"
                className="gallery__image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
