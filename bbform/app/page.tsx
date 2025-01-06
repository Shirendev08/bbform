"use client"
import { MyForm } from "@/components/MyForm";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import RewardsSection from "@/components/RewardSections";
import CardSwiper from "@/components/CardSwiper";
import MarqueeSlider from "@/components/MarqueeSlider";
import EventMarquee from "@/components/EventMarquee";

export default function Home() {
  const images = [
    { src: 'images/events/1.jpg', alt: 'Event 1' },
    { src: 'images/events/2.jpg', alt: 'Event 2' },
    { src: 'images/events/3.jpg', alt: 'Event 3' },
    { src: 'images/events/4.jpg', alt: 'Event 4' },
    { src: 'images/events/5.jpg', alt: 'Event 5' },
    { src: 'images/events/6.jpg', alt: 'Event 6' },
    { src: 'images/events/7.jpg', alt: 'Event 7' },
    { src: 'images/events/8.jpg', alt: 'Event 8' },
    { src: 'images/events/9.jpg', alt: 'Event 9' },
    { src: 'images/events/10.jpg', alt: 'Event 10' },
  ];
  return (
   
   <div className="font-golos max-w-100vw overflow-x-hidden">
      <div className="relative w-full bg-black">
    <div className="absolute inset-0 bg-green-300  hidden lg:block">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover" poster="images/poster.jpg">
        <source src="assets/intro/intro/miya.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="container mx-auto px-6 lg:px-12 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="mx-auto lg:mx-0 order-1 lg:order-0">
          <img src="assets/logo.svg" alt="top logo" className="mt-12 lg:mt-32 mb-[-330px]" />
          {/* <img src="images/top-logos.svg" alt="top logo" className="mt-12 lg:mt-32 mb-14" /> */}
          <div className="inline-block relative">
            {/* <img src="images/compass.svg" alt="compass" className="max-w-full" /> */}
            <p className="text-7xl text-white font-bold">Mobile Legends Card</p>
            {/* <img src="images/a.svg" alt="a" className="absolute -top-4 right-1/4 compass-rotate" /> */}
          </div>
          <div className="font-golos max-w-sm text-white font-medium py-6">
            Залуус өөрсдийн тодорхойлсон зорилгынхоо төлөө хөдөлмөрлөж байгаа
            энэ үед өдөр тутмын амьдралд нь, боловсролд нь, хүрээлэлд нь хөтөч
            болох <span className="font-semibold">Compass Community Card</span>
          </div>
          <div className="my-16 inline-block">
            <a href="#cards">
              <div
                className="w-72 max-w-md h-16 bg-FED900 text-[#15002B] text-center font-golos font-semibold flex place-content-between place-items-center rounded-full group">
                <span></span>
                <span className="text-xl"> Онлайн захиалга</span>
                <img src="images/arrow.svg" alt="arrow"
                  className="mr-6 group-hover:rotate-45 transition-transform duration-200" />
              </div>
            </a>
            <div className="flex text-white/50 text-opacity-50 text-xs my-5 gap-2 place-content-center">
              <a href="#">by Mobile Legend Bang Bang & Bogd Bank</a>
              <span>/</span>
              <a href="#">Карт захиалах</a>
            </div>
          </div>
        </div>
        <div className="order-0 lg:order-1">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover block lg:hidden"
            poster="/images/poster_sm.jpg">
            <source src="/assets/intro/intro/miya.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
      </div>
      <div className="w-full overflow-hidden">

    <CardSwiper/>
    <div className="container mx-auto px-6 mb-20 lg:mb-16">
      <svg className="mb-6" width="60" height="59" viewBox="0 0 60 59" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M47 5.1V3C47 1.3 45.7 0 44 0C42.3 0 41 1.3 41 3V5H19V3C19 1.3 17.7 0 16 0C14.3 0 13 1.3 13 3V5.1C5.7 6 0 12.3 0 19.8V44.1C0 52.3 6.7 59 14.8 59H45.1C53.3 59 60 52.3 60 44.2V19.8C60 12.3 54.3 6 47 5.1ZM54 44.2C54 49.1 50 53 45.2 53H14.8C10 53 6 49 6 44.2V19.8C6 15.6 9 12 13 11.2V12.6C13 14.3 14.3 15.6 16 15.6C17.7 15.6 19 14.3 19 12.6V11H41V12.6C41 14.3 42.3 15.6 44 15.6C45.7 15.6 47 14.3 47 12.6V11.2C51 12.1 54 15.6 54 19.8V44.2Z"
          fill="#FA6913" />
        <path
          d="M45.8996 20H14.0996C12.3996 20 11.0996 21.3 11.0996 23C11.0996 24.7 12.3996 26 14.0996 26H45.7996C47.4996 26 48.7996 24.7 48.7996 23C48.7996 21.3 47.4996 20 45.8996 20Z"
          fill="#FA6913" />
      </svg>

      <div className="text-FA6913 text-4xl lg:text-6xl font-black">
        Картын онцлог, давуу тал
      </div>
      <div className="text-[#232324] text-opacity-60 font-medium my-3">
        Сар бүр танд зориулсан онцгой урамшуулал, буцаан олголт, бэлгүүдийг бэлдсэн байгаа.
      </div>

      <div className="w-16 h-2 bg-FA6913 my-8"></div>

      <div className="text-[#7B7B7C] text-xl font-semibold">
        Сар бүрийн нэгэн хэвийн бус
      </div>
      <div className="text-[#231F20] text-4xl font-bold">
        Тогтмол эвентүүд
      </div>

      <div className="text-[#7B7B7C] font-medium my-3">
        Өдөр тутмын ажлаасаа түрхэн хугацаанд салж, ур чадвар, танилын хүрээллээ тэлж, салбартаа мэргэшиж яваа залуус,
        экспертүүдтэй танилцах боломжтой.
      </div>

    </div>
      {/* <MarqueeSlider images={images}/>
      <EventMarquee/> */}
      </div>
    
   </div>
  );
}
