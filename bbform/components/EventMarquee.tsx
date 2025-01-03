import { useEffect, useState } from 'react';  // Import useState and useEffect for client-side rendering
import Marquee from 'react-marquee-slider';  // Import the marquee component
import Image from 'next/image';  // Import Next.js Image component for optimized images

const EventMarquee = () => {
  const [isClient, setIsClient] = useState(false);  // State to track if it's client-side

  useEffect(() => {
    // Set state to true once the component is mounted on the client
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;  // Return nothing during SSR to avoid errors
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="container mx-auto px-6 md:px-0 mb-16 fade-up" id="fade-up-element4">
        <div className="text-[#161616] font-bold my-3 text-3xl lg:text-4xl mb-4">
          Эвентийн календар
        </div>
        <div className="text-[#7B7B7C] my-3 text-base lg:text-lg max-w-6xl mb-6">
          Compass Card эзэмшигчид сар бүр санхүү, боловсрол, амьдралын хэв маяг, нийгмийн хариуцлага зэрэг сонирхолтой
          сэдвүүдийн хүрээнд арга хэмжээнд урилгаар оролцох бөгөөд улирал бүрийн төгсгөлд бүүр олуулаа цугларах болно.
        </div>

        <div className="my-6 w-full relative inline-block">
          <Marquee velocity={50} minScale={0.8}>
            {/* Loop through each month */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
              <div key={month} className="relative py-4 flex-none w-[300px] mx-4">
                <div className="absolute bg-[#FA6913] right-5 -top-2 py-3 px-3 text-center text-white font-bold">
                  <div className="text-2xl leading-none">{month}</div>
                  <div className="text-base leading-none">сар</div>
                </div>
                <div className="h-[470px] border border-[#D9D9D9] rounded-[20px] overflow-hidden hover:shadow-md transition-all duration-300">
                  <Image 
                    src={`/images/e/${month}.jpg`} 
                    alt={`Event ${month}`} 
                    width={300} 
                    height={470} 
                    className="w-full aspect-[1.42] object-cover"
                  />
                  <div className="p-5 relative">
                    <div className="absolute bg-FED900 rounded-full px-4 py-1 text-xs -top-2.5 right-4 font-medium">
                      Finance
                    </div>
                    <div className="text-[#33333D] font-bold text-lg">
                      Event Title {month}
                    </div>
                    <div className="text-232324 text-opacity-80 font-medium my-2 text-sm">
                      Description for event {month}.
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default EventMarquee;
