"use client"
import React, {useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MyForm } from './MyForm';
const CardSwiper = () => {
    const [order, setOrder] = useState(false)
  const cards = [
    {
      id: 'Communaholic',
      number: '01',
      title: 'Miya-Moonlight Archer',
      imgSrc: 'images/cards/1.png',
      altText: 'Communaholic card',
      description: `Чимээгүй бөгөөд нарийвчлалтай, Мияагийн сарны гэрэлт сумнууд нь дайснуудыг хормын дотор чимээгүйгээр маш нарийвчлалтайгаар харвана.`,
    },
    {
      id: 'Realistic',
      number: '02',
      title: 'Nana-Clockwork Maid',
      imgSrc: 'images/cards/5.png',
      altText: 'Realistic card',
      description: `Сэтгэл татам Механик цаг, Nana-ийн 'Clockwork Maid' skin нь өвөрмөц стиль болон эрч хүчтэй  энергитэй ба түүний соронзон ид шидийн чадваруудад шинэ эргэлт авчирдаг`,
    },
    {
      id: 'UndefinedID',
      number: '03',
      title: 'Gusion-Holy Blade',
      imgSrc: 'images/cards/3.png',
      altText: 'Undefined ID card',
      description: `Дэгжин бөгөөд Аюултай, Gusion-ийн 'Holy Blade' skin нь бурханлаг энергийг цацруулдаг. Түүний ариун илд нь дайснууддаа айдас төрүүлж, нарийвчлалаар довтолно!`,
    },
    {
      id: 'Dialoguer',
      number: '04',
      title: 'Gusion-Soul Revelation',
      imgSrc: 'images/cards/4.png',
      altText: 'Dialoguer card',
      description: `Тэнгэрлэг дэгжин байдлыг шингээсэн Gusion-ийн Soul Revelation skin нь гэрэл ба хүчийг нэгдэл юм. Түүний мөнхийн илд нь тэнгэрийн хүчээр тулааны талбарыг эзэрхэнэ.`,
    },
    {
        id: 'Dialoguer',
        number: '05',
        title: 'Nana-Slumber Party',
        imgSrc: 'images/cards/2.png',
        altText: 'Dialoguer card',
        description: `Nana-ийн 'Slumber Party' skin нь түүний ид шидтэй сэтгэл татам байдлыг тухтай, пажаматай төрхөөр амилуулдаг. Түүний хөөрхөн, сонирхолтой стиль тулааны талбарт баяр баясгалан авчирна.`,
      },
      {
        id: 'Dialoguer',
        number: '06',
        title: 'Miya-Doom Catalyst',
        imgSrc: 'images/cards/6.png',
        altText: 'Dialoguer card',
        description: `Хүчтэй бөгөөд Ширүүн, Miya-ийн 'Doom Catalyst' skin нь түүнийг аймшигт, шийдэмгий төрхтэй үхлийн харваач болгон хувиргадаг. Сүйрэл учруулах сум, таслан зогсоохын аргагүй нарийвчлалтайгаар тэрээр дайснууддаа сүйрлийг авчирдаг!`,
      },
  ];

  return (
    <div>

    <div className="container mx-auto">
      <div className="swiper cardSwiper px-4 lg:px-6 my-12">
        <Swiper
          spaceBetween={16}
          slidesPerView={3.2}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 16,
            },
          }}
        >
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="h-[500px] border-[#ECECEC] border rounded-[15px] py-4 px-5 hover:bg-FED900 hover:border-FED900 transition-all duration-300 group relative mb-10">
                <div className="text-FA6913 text-sm font-medium">{card.number}</div>
                <div className="text-center text-2xl font-bold">{card.title}</div>
                <img    
                  src={card.imgSrc}
                  alt={card.altText}
                  className="group-hover:shadowed mt-3 mb-8 transition-all duration-300 w-full"
                />
                <div className="text-[#1f1f1f] text-base mb-10 leading-5">{card.description}</div>
                <div className="text-center absolute inset-x-0 -bottom-6 h-[50px]">
                  <a
                    href="/zahialah"
                    onClick={(e) => {
                        e.preventDefault();
                        setOrder(true);
                      }}
                    className="text-white text-sm font-medium text-center bg-231F20 rounded-full py-4 px-10 transition-all duration-300 mx-auto relative inline-block"
                  >
                    Захиалах
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    {order && (
        <MyForm/>
    )}
    </div>
  );
};

export default CardSwiper;
