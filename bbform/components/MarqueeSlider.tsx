"use client";
import React, { useEffect } from 'react';
import $ from 'jquery';

interface Image {
  src: string;
  alt: string;
}

interface MarqueeSliderProps {
  images: Image[];
}

const MarqueeSlider: React.FC<MarqueeSliderProps> = ({ images }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = "/assets/marqueeSlider.js"; // If the plugin is in an external file, include it here
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        // Initialize the marqueeSlider jQuery plugin
        $('.marquee-slider').marqueeSlider({
          sensitivity: 0.1,  // Optional settings
          repeatItems: true,
        });
      };

      return () => {
        // Cleanup the script when the component is unmounted
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="overflow-hidden mb-8">
      <div className="marquee-slider marquee-slider1 fade-up" id="fade-up-element3">
        <div className="marquee-slider__list">
          {images.map((image, index) => (
            <div
              key={index}
              className="marquee-slider__list--item max-w-[315px] lg:max-w-[501px] max-h-[200px] lg:max-h-[318px]"
            >
              <a href={image.src} data-lightbox="image-gallery">
                <img src={image.src} alt={image.alt} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeSlider;
