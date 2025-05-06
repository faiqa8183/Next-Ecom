// components/HomePageContent.jsx

import React from "react";

const HomePageContent = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-400 to-pink-200 py-20 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to YourStore</h1>
        <p className="text-xl mb-6">Discover your style with the best deals!</p>
        <a
          href="/products/index"
          className="bg-white text-pink-500 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-pink-100 transition"
        >
          Shop Now
        </a>
      </section>

      {/* Highlights Section */}
      <section className="py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p>We deliver your order within 2-3 business days.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Secure Checkout</h3>
          <p>Your payment info is safe with our encrypted system.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
          <p>Only the best products curated for your needs.</p>
        </div>
      </section>

      {/* Product Preview Section */}
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

      {/* About Section */}
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
