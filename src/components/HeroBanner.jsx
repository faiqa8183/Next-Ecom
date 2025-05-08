// components/HeroBanner.jsx
'use client';

import { useEffect, useState } from 'react';

const images = [
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner3.jpg',
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`banner-${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* CTA Button */}
      <div className="absolute left-10 top-[40%] z-10">
  <a
    href="/products/index"
    className="hover:bg-white hover:text-[#8B5E3C] border-2 border-[#8B5E3C] px-8 py-3 font-semibold bg-[#8B5E3C] text-white transition duration-300"
  >
    Shop Now
  </a>
</div>


    </div>
  );
};

export default HeroBanner;
