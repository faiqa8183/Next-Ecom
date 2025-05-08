// components/HomePageContent.jsx

import React from "react";
import { Truck, ShieldCheck, Star } from 'lucide-react';


import HeroBanner from '@/components/HeroBanner'; // Import the HeroBanner component

const HomePageContent = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section - Updated with HeroBanner */}
      <HeroBanner />

      <p className="text-center text-[#8B5E3C] text-2xl font-semibold mt-16 mb-2">
  What we Offer at QuickCart?
</p>

      {/* Other Content Sections */}
      <section className="py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
  <div className="bg-[#8B5E3C] shadow-lg p-6 rounded-md">
    <Truck size={50} color="white" className="mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">Fast Delivery</h3>
    <p className="text-white">We deliver your order within 2-3 business days.</p>
  </div>
  <div className="bg-[#8B5E3C] shadow-lg p-6 rounded-md">
    <ShieldCheck size={50} color="white" className="mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">Secure Checkout</h3>
    <p className="text-white">Your payment info is safe with our encrypted system.</p>
  </div>
  <div className="bg-[#8B5E3C] shadow-lg p-6 rounded-md">
    <Star size={50} color="white" className="mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">Quality Products</h3>
    <p className="text-white">Only the best products curated for your needs.</p>
  </div>
</section>


      <section className="py-12 bg-gray-50 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Top Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 text-center">
              <div className="h-40 bg-pink-100 mb-4 rounded-lg" />
              <h4 className="font-semibold">Product {index + 1}</h4>
              <p className="text-sm text-gray-600">$99.00</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">About YourStore</h2>
        <p className="max-w-2xl mx-auto text-lg">
          We’re passionate about bringing fashion to your fingertips. Whether you’re into streetwear or classy looks, we’ve got it covered.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center">
        <p>&copy; 2025 YourStore. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-pink-400">Instagram</a>
          <a href="#" className="hover:text-pink-400">Facebook</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePageContent;
