import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CardSwiper = () => {
  const cards = [
    {
      id: 'Communaholic',
      number: '01',
      title: 'Communaholic',
      imgSrc: 'images/cards/card1.png',
      altText: 'Communaholic card',
      description: `Юу байна даа? Би бол Communaholic! Би шинэ хүмүүстэй уулзаж өөр, өөр хүрээлэлтэй танилцах дуртай.
        Өө нээрээ би одоо нэг эвент рүү явах гэж байна. Хамт явах уу? Би чамайг санаа нийлэх хүмүүс, сонирхолтой
        арга хэмжээнүүд рүү хөтлөх болно. Цоо шинэ аялалд гарахад бэлэн биз.`,
    },
    {
      id: 'Realistic',
      number: '02',
      title: 'Realistic',
      imgSrc: 'images/cards/card2.png',
      altText: 'Realistic card',
      description: `Намайг Realistic гэдэг. Би хувийн болон ажлын асуудлыг байж болох хамгийн практик байдлаар
        шийдвэрлэхийг зорьдог. Чухал шийдвэрүүд гаргахдаа сэтгэл хөдлөлөө дарж аль болох объектив хандахыг хичээдэг.
        Ирээдүйдээ ухаалаг хөрөнгө оруулалт хийж санхүүгийн зорилгодоо хүрэхэд чинь би тусалъя!`,
    },
    {
      id: 'UndefinedID',
      number: '03',
      title: 'Undefined ID',
      imgSrc: 'images/cards/card3.png',
      altText: 'Undefined ID card',
      description: `Би бол санхүүгийн ертөнц дэх чиний ер бусын хамтрагч Undefined ID. Чи бид хоёрыг хараагүй,
        дуулаагүй, хийж үзээгүй маш олон адал явдлууд хүлээж байна. Аялалдаа бэлдье гэж үү? Надтай хамт байхад
        юуг нь бэлдэх юм бэ? Зүгээр л надаас чанга атга!`,
    },
    {
      id: 'Dialoguer',
      number: '04',
      title: 'Dialoguer',
      imgSrc: 'images/cards/card4.png',
      altText: 'Dialoguer card',
      description: `Сайн уу, Dialoguer байна. Бидний амьдралдаа хийсэн алхам бүр утга учиртай гэдэгт би итгэдэг.
        Дотны зөвлөх чинь байж хэрэгтэй зүйл рүү чинь хөтлөх болсондоо баяртай байна. Надтай хамт худалдан
        авсан бүхэн чинь утга учиртай байж хүсэл, сонирхол, зорилго руу чинь алхам алхмаар ойртуулах болно оо.`,
    },
  ];

  return (
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
              <div className="h-[630px] border-[#ECECEC] border rounded-[15px] py-4 px-5 hover:bg-FED900 hover:border-FED900 transition-all duration-300 group relative mb-10">
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
                    href="#zahialah"
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
  );
};

export default CardSwiper;
